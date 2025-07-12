// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Quests is AccessControl, ReentrancyGuard, Pausable, ERC721Enumerable {
    bytes32 public constant SPORTS_CLUB_ROLE = keccak256("SPORTS_CLUB_ROLE");
    bytes32 public constant ATHLETE_ROLE = keccak256("ATHLETE_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    enum Difficulty { BEGINNER, INTERMEDIATE, EXPERT }
    enum Category { CARDIO, STRENGTH, FLEXIBILITY, NUTRITION, ENDURANCE, TEAM_SPORT }
    enum VerificationType { MANUAL, FITNESS_APP, PHOTO_VIDEO, PEER_VERIFICATION }
    enum PoolStatus { VOTING, ACTIVE, COMPLETED, CANCELLED }
    enum ChallengeStatus { PROPOSED, SELECTED, ACTIVE, COMPLETED, CANCELLED }
    enum ParticipationStatus { REGISTERED, IN_PROGRESS, SUBMITTED, VERIFIED, REJECTED }

    struct ChallengeOption {
        uint256 id;
        string title;
        string description;
        string requirements;
        Category category;
        Difficulty difficulty;
        VerificationType verificationType;
        uint256 duration;
        uint256 maxParticipants;
        uint256 rewardAmount;
        uint256 pointsReward;
        uint256 bonusMultiplier;
        bool isTeamChallenge;
        uint256 minTeamSize;
        string[] requiredData;
        uint256 votes;
        mapping(address => bool) hasVoted;
        mapping(address => uint256) voterTokens;
    }

    struct ChallengePool {
        uint256 id;
        string poolName;
        string description;
        address creator;
        address fanToken;
        uint256 minTokensToVote;
        uint256 minTokensToParticipate;
        PoolStatus status;
        uint256 votingStartTime;
        uint256 votingEndTime;
        uint256 challengeStartTime;
        uint256 challengeEndTime;
        uint256[] challengeOptions;
        uint256 selectedChallengeId;
        uint256 totalVotes;
        uint256 totalVoters;
        mapping(address => bool) hasVotedInPool;
        mapping(address => uint256) voterTokensLocked;
    }

    struct ActiveChallenge {
        uint256 poolId;
        uint256 challengeOptionId;
        ChallengeStatus status;
        uint256 startTime;
        uint256 endTime;
        uint256 currentParticipants;
        uint256 verificationDeadline;
        mapping(address => bool) participants;
        address[] participantList;
    }

    struct Participation {
        uint256 poolId;
        uint256 challengeId;
        address participant;
        ParticipationStatus status;
        uint256 submissionTime;
        string submissionData;
        uint256 verificationCount;
        uint256 requiredVerifications;
        mapping(address => bool) verifiedBy;
        uint256 teamId;
        uint256 scoreAchieved;
    }

    struct Team {
        uint256 id;
        string name;
        address[] members;
        uint256 poolId;
        uint256 totalScore;
        address captain;
    }

    struct ClubRewardItem {
        uint256 id;
        address clubOrAthlete;
        string name;
        string description;
        string imageURI;
        uint256 pointsCost;
        uint256 maxSupply;
        uint256 currentSupply;
        bool isActive;
        string category;
    }

    struct RewardNFT {
        uint256 tokenId;
        uint256 rewardItemId;
        address owner;
        address clubOrAthlete;
        string name;
        string description;
        string imageURI;
        uint256 redeemedAt;
    }

    struct UserProfile {
        string username;
        uint256 totalChallengesCompleted;
        uint256 totalRewardsEarned;
        uint256 currentStreak;
        uint256 longestStreak;
        mapping(Category => uint256) categoryCompletions;
        mapping(address => uint256) tokenBalances;
        uint256[] completedChallenges;
        uint256 reputationScore;
        mapping(address => uint256) fanTokensOwned;
        uint256 totalVotesCast;
        bool isVerifier;
        mapping(address => uint256) clubPoints;
        uint256[] ownedRewardNFTs;
    }

    mapping(uint256 => ChallengePool) public challengePools;
    mapping(uint256 => mapping(uint256 => ChallengeOption)) public challengeOptions;
    mapping(uint256 => ActiveChallenge) public activeChallenges;
    mapping(uint256 => mapping(address => Participation)) public participations;
    mapping(uint256 => Team) public teams;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public supportedFanTokens;
    mapping(uint256 => uint256[]) public poolTeams;
    
    mapping(uint256 => ClubRewardItem) public clubRewardItems;
    mapping(uint256 => RewardNFT) public rewardNFTs;
    mapping(address => uint256[]) public clubRewardItemIds;
    
    uint256 public poolCounter;
    uint256 public challengeOptionCounter;
    uint256 public teamCounter;
    uint256 public rewardItemCounter;
    uint256 public rewardNFTCounter;
    uint256 public constant MIN_VERIFICATIONS = 3;
    uint256 public constant VERIFICATION_REWARD = 10;
    uint256 public verificationTimeLimit = 7 days;
    uint256 public constant MIN_VOTING_DURATION = 3 days;
    uint256 public constant MAX_VOTING_DURATION = 14 days;

    constructor() ERC721("ChilizFit Reward NFTs", "CFR") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    function createChallengePool(
        string memory _poolName,
        string memory _description,
        address _fanToken,
        uint256 _minTokensToVote,
        uint256 _minTokensToParticipate,
        uint256 _votingDuration,
        uint256 _challengeDuration
    ) external whenNotPaused {
        require(
            hasRole(SPORTS_CLUB_ROLE, msg.sender) || 
            hasRole(ATHLETE_ROLE, msg.sender) || 
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Not authorized to create challenge pools"
        );
        require(supportedFanTokens[_fanToken], "Fan token not supported");
        require(_votingDuration >= MIN_VOTING_DURATION && _votingDuration <= MAX_VOTING_DURATION, "Invalid voting duration");
        require(_minTokensToVote > 0, "Min tokens to vote must be > 0");
        require(_minTokensToParticipate > 0, "Min tokens to participate must be > 0");

        poolCounter++;
        
        ChallengePool storage newPool = challengePools[poolCounter];
        newPool.id = poolCounter;
        newPool.poolName = _poolName;
        newPool.description = _description;
        newPool.creator = msg.sender;
        newPool.fanToken = _fanToken;
        newPool.minTokensToVote = _minTokensToVote;
        newPool.minTokensToParticipate = _minTokensToParticipate;
        newPool.status = PoolStatus.VOTING;
        newPool.votingStartTime = block.timestamp;
        newPool.votingEndTime = block.timestamp + _votingDuration;
        newPool.challengeStartTime = block.timestamp + _votingDuration + 1 hours;
        newPool.challengeEndTime = newPool.challengeStartTime + _challengeDuration;
    }

    function addChallengeOption(
        uint256 _poolId,
        string memory _title,
        string memory _description,
        string memory _requirements,
        Category _category,
        Difficulty _difficulty,
        VerificationType _verificationType,
        uint256 _maxParticipants,
        uint256 _rewardAmount,
        uint256 _pointsReward,
        uint256 _bonusMultiplier,
        bool _isTeamChallenge,
        uint256 _minTeamSize,
        string[] memory _requiredData
    ) external whenNotPaused {
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        require(pool.creator == msg.sender, "Not pool creator");
        require(pool.status == PoolStatus.VOTING, "Pool not in voting phase");
        require(block.timestamp < pool.votingEndTime, "Voting period ended");
        require(_pointsReward > 0, "Points reward must be > 0");

        challengeOptionCounter++;
        
        ChallengeOption storage newOption = challengeOptions[_poolId][challengeOptionCounter];
        newOption.id = challengeOptionCounter;
        newOption.title = _title;
        newOption.description = _description;
        newOption.requirements = _requirements;
        newOption.category = _category;
        newOption.difficulty = _difficulty;
        newOption.verificationType = _verificationType;
        newOption.maxParticipants = _maxParticipants;
        newOption.rewardAmount = _rewardAmount;
        newOption.pointsReward = _pointsReward;
        newOption.bonusMultiplier = _bonusMultiplier;
        newOption.isTeamChallenge = _isTeamChallenge;
        newOption.minTeamSize = _minTeamSize;
        newOption.requiredData = _requiredData;

        pool.challengeOptions.push(challengeOptionCounter);
    }

    function createRewardItem(
        string memory _name,
        string memory _description,
        string memory _imageURI,
        uint256 _pointsCost,
        uint256 _maxSupply,
        string memory _category
    ) external whenNotPaused {
        require(
            hasRole(SPORTS_CLUB_ROLE, msg.sender) || 
            hasRole(ATHLETE_ROLE, msg.sender) || 
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Not authorized to create rewards"
        );
        require(_pointsCost > 0, "Points cost must be > 0");
        require(_maxSupply > 0, "Max supply must be > 0");

        rewardItemCounter++;
        
        ClubRewardItem storage newItem = clubRewardItems[rewardItemCounter];
        newItem.id = rewardItemCounter;
        newItem.clubOrAthlete = msg.sender;
        newItem.name = _name;
        newItem.description = _description;
        newItem.imageURI = _imageURI;
        newItem.pointsCost = _pointsCost;
        newItem.maxSupply = _maxSupply;
        newItem.currentSupply = 0;
        newItem.isActive = true;
        newItem.category = _category;
        
        clubRewardItemIds[msg.sender].push(rewardItemCounter);
    }

    function claimRewardItem(uint256 _itemId) external whenNotPaused {
        ClubRewardItem storage item = clubRewardItems[_itemId];
        require(item.id != 0, "Reward item does not exist");
        require(item.isActive, "Reward item not active");
        require(item.currentSupply < item.maxSupply, "Reward item sold out");
        
        UserProfile storage profile = userProfiles[msg.sender];
        require(profile.clubPoints[item.clubOrAthlete] >= item.pointsCost, "Insufficient club points");
        
        profile.clubPoints[item.clubOrAthlete] -= item.pointsCost;
        
        rewardNFTCounter++;
        _safeMint(msg.sender, rewardNFTCounter);
        
        RewardNFT storage rewardNFT = rewardNFTs[rewardNFTCounter];
        rewardNFT.tokenId = rewardNFTCounter;
        rewardNFT.rewardItemId = _itemId;
        rewardNFT.owner = msg.sender;
        rewardNFT.clubOrAthlete = item.clubOrAthlete;
        rewardNFT.name = item.name;
        rewardNFT.description = item.description;
        rewardNFT.imageURI = item.imageURI;
        rewardNFT.redeemedAt = block.timestamp;
        
        item.currentSupply++;
        profile.ownedRewardNFTs.push(rewardNFTCounter);
    }

    function voteForChallenge(
        uint256 _poolId,
        uint256 _optionId,
        uint256 _tokenAmount
    ) external whenNotPaused {
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        require(pool.status == PoolStatus.VOTING, "Pool not in voting phase");
        require(block.timestamp >= pool.votingStartTime, "Voting not started");
        require(block.timestamp <= pool.votingEndTime, "Voting period ended");
        require(_tokenAmount >= pool.minTokensToVote, "Insufficient tokens to vote");

        bool optionExists = false;
        for (uint256 i = 0; i < pool.challengeOptions.length; i++) {
            if (pool.challengeOptions[i] == _optionId) {
                optionExists = true;
                break;
            }
        }
        require(optionExists, "Option not in this pool");

        IERC20 fanToken = IERC20(pool.fanToken);
        require(fanToken.balanceOf(msg.sender) >= _tokenAmount, "Insufficient fan tokens");

        ChallengeOption storage option = challengeOptions[_poolId][_optionId];
        require(!option.hasVoted[msg.sender], "Already voted for this option");

        fanToken.transferFrom(msg.sender, address(this), _tokenAmount);

        option.hasVoted[msg.sender] = true;
        option.voterTokens[msg.sender] = _tokenAmount;
        option.votes += _tokenAmount;

        if (!pool.hasVotedInPool[msg.sender]) {
            pool.hasVotedInPool[msg.sender] = true;
            pool.totalVoters++;
        }
        pool.voterTokensLocked[msg.sender] += _tokenAmount;
        pool.totalVotes += _tokenAmount;

        userProfiles[msg.sender].totalVotesCast++;
        userProfiles[msg.sender].fanTokensOwned[pool.fanToken] += _tokenAmount;
    }

    function finalizeVoting(uint256 _poolId) external whenNotPaused {
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        require(pool.status == PoolStatus.VOTING, "Pool not in voting phase");
        require(block.timestamp > pool.votingEndTime, "Voting period not ended");
        require(pool.challengeOptions.length > 0, "No challenge options");

        uint256 winningOptionId = 0;
        uint256 maxVotes = 0;
        
        for (uint256 i = 0; i < pool.challengeOptions.length; i++) {
            uint256 optionId = pool.challengeOptions[i];
            ChallengeOption storage option = challengeOptions[_poolId][optionId];
            if (option.votes > maxVotes) {
                maxVotes = option.votes;
                winningOptionId = optionId;
            }
        }

        require(winningOptionId != 0, "No votes cast");

        pool.selectedChallengeId = winningOptionId;
        pool.status = PoolStatus.ACTIVE;

        ActiveChallenge storage activeChallenge = activeChallenges[_poolId];
        activeChallenge.poolId = _poolId;
        activeChallenge.challengeOptionId = winningOptionId;
        activeChallenge.status = ChallengeStatus.ACTIVE;
        activeChallenge.startTime = pool.challengeStartTime;
        activeChallenge.endTime = pool.challengeEndTime;
        activeChallenge.verificationDeadline = pool.challengeEndTime + verificationTimeLimit;
    }

    function registerForChallenge(
        uint256 _poolId,
        uint256 _teamId
    ) external whenNotPaused {
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        require(pool.status == PoolStatus.ACTIVE, "Pool not active");
        
        ActiveChallenge storage challenge = activeChallenges[_poolId];
        require(challenge.status == ChallengeStatus.ACTIVE, "Challenge not active");
        require(block.timestamp >= challenge.startTime, "Challenge not started");
        require(block.timestamp <= challenge.endTime, "Challenge ended");
        require(!challenge.participants[msg.sender], "Already registered");

        IERC20 fanToken = IERC20(pool.fanToken);
        require(fanToken.balanceOf(msg.sender) >= pool.minTokensToParticipate, "Insufficient fan tokens to participate");

        ChallengeOption storage option = challengeOptions[_poolId][pool.selectedChallengeId];
        require(challenge.currentParticipants < option.maxParticipants, "Challenge full");

        if (option.isTeamChallenge) {
            require(_teamId != 0, "Team ID required for team challenges");
            Team storage team = teams[_teamId];
            require(team.poolId == _poolId, "Team not for this pool");
            require(team.members.length < option.minTeamSize * 2, "Team full");
            
            team.members.push(msg.sender);
        }

        Participation storage participation = participations[_poolId][msg.sender];
        participation.poolId = _poolId;
        participation.challengeId = pool.selectedChallengeId;
        participation.participant = msg.sender;
        participation.status = ParticipationStatus.REGISTERED;
        participation.requiredVerifications = MIN_VERIFICATIONS;
        participation.teamId = _teamId;
        
        challenge.participants[msg.sender] = true;
        challenge.participantList.push(msg.sender);
        challenge.currentParticipants++;
    }

    function createTeam(
        uint256 _poolId,
        string memory _teamName
    ) external whenNotPaused returns (uint256) {
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        require(pool.status == PoolStatus.ACTIVE, "Pool not active");
        
        ChallengeOption storage option = challengeOptions[_poolId][pool.selectedChallengeId];
        require(option.isTeamChallenge, "Not a team challenge");
        
        IERC20 fanToken = IERC20(pool.fanToken);
        require(fanToken.balanceOf(msg.sender) >= pool.minTokensToParticipate, "Insufficient fan tokens");
        
        teamCounter++;
        
        Team storage newTeam = teams[teamCounter];
        newTeam.id = teamCounter;
        newTeam.name = _teamName;
        newTeam.poolId = _poolId;
        newTeam.captain = msg.sender;
        newTeam.members.push(msg.sender);
        
        poolTeams[_poolId].push(teamCounter);
        
        return teamCounter;
    }

    function submitChallenge(
        uint256 _poolId,
        string memory _submissionData,
        uint256 _scoreAchieved
    ) external whenNotPaused {
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        
        ActiveChallenge storage challenge = activeChallenges[_poolId];
        require(block.timestamp <= challenge.endTime, "Challenge ended");
        require(challenge.participants[msg.sender], "Not registered");
        
        Participation storage participation = participations[_poolId][msg.sender];
        require(participation.status == ParticipationStatus.REGISTERED, "Not registered");
        
        participation.status = ParticipationStatus.SUBMITTED;
        participation.submissionTime = block.timestamp;
        participation.submissionData = _submissionData;
        participation.scoreAchieved = _scoreAchieved;
    }

    function verifySubmission(
        uint256 _poolId,
        address _participant,
        bool _approved
    ) external whenNotPaused {
        require(
            hasRole(VERIFIER_ROLE, msg.sender) || 
            hasRole(ORACLE_ROLE, msg.sender),
            "Not authorized to verify"
        );
        
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        
        ActiveChallenge storage challenge = activeChallenges[_poolId];
        require(block.timestamp <= challenge.verificationDeadline, "Verification deadline passed");
        
        Participation storage participation = participations[_poolId][_participant];
        require(participation.status == ParticipationStatus.SUBMITTED, "No submission to verify");
        require(!participation.verifiedBy[msg.sender], "Already verified by this address");
        
        participation.verifiedBy[msg.sender] = true;
        participation.verificationCount++;
        
        if (_approved && participation.verificationCount >= participation.requiredVerifications) {
            participation.status = ParticipationStatus.VERIFIED;
            _distributeReward(_poolId, _participant);
        } else if (!_approved && participation.verificationCount >= participation.requiredVerifications) {
            participation.status = ParticipationStatus.REJECTED;
        }
        
        userProfiles[msg.sender].reputationScore += VERIFICATION_REWARD;
    }

    function returnVotingTokens(uint256 _poolId) external whenNotPaused {
        ChallengePool storage pool = challengePools[_poolId];
        require(pool.id != 0, "Pool does not exist");
        require(pool.status == PoolStatus.COMPLETED, "Pool not completed");
        require(pool.voterTokensLocked[msg.sender] > 0, "No tokens to return");

        uint256 tokensToReturn = pool.voterTokensLocked[msg.sender];
        pool.voterTokensLocked[msg.sender] = 0;

        IERC20(pool.fanToken).transfer(msg.sender, tokensToReturn);
    }

    function _distributeReward(uint256 _poolId, address _participant) internal {
        ChallengePool storage pool = challengePools[_poolId];
        ChallengeOption storage option = challengeOptions[_poolId][pool.selectedChallengeId];
        UserProfile storage profile = userProfiles[_participant];
        
        uint256 baseReward = option.rewardAmount;
        uint256 bonusReward = 0;
        
        if (profile.currentStreak > 0) {
            bonusReward = (baseReward * option.bonusMultiplier * profile.currentStreak) / 100;
        }
        
        uint256 difficultyMultiplier = uint256(option.difficulty) + 1;
        uint256 totalTokenReward = (baseReward + bonusReward) * difficultyMultiplier;
        
        uint256 basePoints = option.pointsReward;
        uint256 bonusPoints = 0;
        
        if (profile.currentStreak > 0) {
            bonusPoints = (basePoints * option.bonusMultiplier * profile.currentStreak) / 100;
        }
        
        uint256 totalClubPoints = (basePoints + bonusPoints) * difficultyMultiplier;
        
        if (totalTokenReward > 0) {
            IERC20(pool.fanToken).transfer(_participant, totalTokenReward);
        }
        
        profile.clubPoints[pool.creator] += totalClubPoints;
        
        profile.totalChallengesCompleted++;
        profile.totalRewardsEarned += totalTokenReward;
        profile.currentStreak++;
        profile.categoryCompletions[option.category]++;
        profile.tokenBalances[pool.fanToken] += totalTokenReward;
        profile.completedChallenges.push(_poolId);
        
        if (profile.currentStreak > profile.longestStreak) {
            profile.longestStreak = profile.currentStreak;
        }
    }

    function getChallengePool(uint256 _poolId) external view returns (
        uint256 id,
        string memory poolName,
        string memory description,
        address creator,
        address fanToken,
        uint256 minTokensToVote,
        uint256 minTokensToParticipate,
        PoolStatus status,
        uint256 votingEndTime,
        uint256 challengeStartTime,
        uint256 challengeEndTime,
        uint256 selectedChallengeId,
        uint256 totalVotes,
        uint256 totalVoters
    ) {
        ChallengePool storage pool = challengePools[_poolId];
        return (
            pool.id,
            pool.poolName,
            pool.description,
            pool.creator,
            pool.fanToken,
            pool.minTokensToVote,
            pool.minTokensToParticipate,
            pool.status,
            pool.votingEndTime,
            pool.challengeStartTime,
            pool.challengeEndTime,
            pool.selectedChallengeId,
            pool.totalVotes,
            pool.totalVoters
        );
    }

    function getChallengeOption(uint256 _poolId, uint256 _optionId) external view returns (
        uint256 id,
        string memory title,
        string memory description,
        Category category,
        Difficulty difficulty,
        uint256 maxParticipants,
        uint256 rewardAmount,
        uint256 pointsReward,
        bool isTeamChallenge,
        uint256 votes
    ) {
        ChallengeOption storage option = challengeOptions[_poolId][_optionId];
        return (
            option.id,
            option.title,
            option.description,
            option.category,
            option.difficulty,
            option.maxParticipants,
            option.rewardAmount,
            option.pointsReward,
            option.isTeamChallenge,
            option.votes
        );
    }

    function getRewardItem(uint256 _itemId) external view returns (
        uint256 id,
        address clubOrAthlete,
        string memory name,
        string memory description,
        string memory imageURI,
        uint256 pointsCost,
        uint256 maxSupply,
        uint256 currentSupply,
        bool isActive,
        string memory category
    ) {
        ClubRewardItem storage item = clubRewardItems[_itemId];
        return (
            item.id,
            item.clubOrAthlete,
            item.name,
            item.description,
            item.imageURI,
            item.pointsCost,
            item.maxSupply,
            item.currentSupply,
            item.isActive,
            item.category
        );
    }

    function getRewardNFT(uint256 _tokenId) external view returns (
        uint256 tokenId,
        uint256 rewardItemId,
        address owner,
        address clubOrAthlete,
        string memory name,
        string memory description,
        string memory imageURI,
        uint256 redeemedAt
    ) {
        require(_exists(_tokenId), "Token does not exist");
        RewardNFT storage nft = rewardNFTs[_tokenId];
        return (
            nft.tokenId,
            nft.rewardItemId,
            nft.owner,
            nft.clubOrAthlete,
            nft.name,
            nft.description,
            nft.imageURI,
            nft.redeemedAt
        );
    }

    function getPoolChallengeOptions(uint256 _poolId) external view returns (uint256[] memory) {
        return challengePools[_poolId].challengeOptions;
    }

    function getActiveChallenge(uint256 _poolId) external view returns (
        uint256 poolId,
        uint256 challengeOptionId,
        ChallengeStatus status,
        uint256 startTime,
        uint256 endTime,
        uint256 currentParticipants,
        address[] memory participantList
    ) {
        ActiveChallenge storage challenge = activeChallenges[_poolId];
        return (
            challenge.poolId,
            challenge.challengeOptionId,
            challenge.status,
            challenge.startTime,
            challenge.endTime,
            challenge.currentParticipants,
            challenge.participantList
        );
    }

    function getUserProfile(address _user) external view returns (
        string memory username,
        uint256 totalChallengesCompleted,
        uint256 totalRewardsEarned,
        uint256 currentStreak,
        uint256 longestStreak,
        uint256 reputationScore,
        uint256 totalVotesCast
    ) {
        UserProfile storage profile = userProfiles[_user];
        return (
            profile.username,
            profile.totalChallengesCompleted,
            profile.totalRewardsEarned,
            profile.currentStreak,
            profile.longestStreak,
            profile.reputationScore,
            profile.totalVotesCast
        );
    }

    function getUserClubPoints(address _user, address _clubOrAthlete) external view returns (uint256) {
        return userProfiles[_user].clubPoints[_clubOrAthlete];
    }

    function getUserRewardNFTs(address _user) external view returns (uint256[] memory) {
        return userProfiles[_user].ownedRewardNFTs;
    }

    function getClubRewardItems(address _clubOrAthlete) external view returns (uint256[] memory) {
        return clubRewardItemIds[_clubOrAthlete];
    }

    function hasUserVotedInPool(uint256 _poolId, address _user) external view returns (bool) {
        return challengePools[_poolId].hasVotedInPool[_user];
    }

    function getUserFanTokenBalance(address _user, address _fanToken) external view returns (uint256) {
        return IERC20(_fanToken).balanceOf(_user);
    }

    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        require(_exists(_tokenId), "Token does not exist");
        
        RewardNFT storage nft = rewardNFTs[_tokenId];
        
        return string(abi.encodePacked(
            '{"name":"', nft.name, '",',
            '"description":"', nft.description, '",',
            '"image":"', nft.imageURI, '",',
            '"attributes":[',
            '{"trait_type":"Club/Athlete","value":"', _addressToString(nft.clubOrAthlete), '"},',
            '{"trait_type":"Redeemed At","value":', _toString(nft.redeemedAt), '}',
            ']}'
        ));
    }

    function _addressToString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(42);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    function addSupportedFanToken(address _fanToken) external onlyRole(DEFAULT_ADMIN_ROLE) {
        supportedFanTokens[_fanToken] = true;
    }

    function removeSupportedFanToken(address _fanToken) external onlyRole(DEFAULT_ADMIN_ROLE) {
        supportedFanTokens[_fanToken] = false;
    }

    function completePool(uint256 _poolId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        challengePools[_poolId].status = PoolStatus.COMPLETED;
    }

    function setVerificationTimeLimit(uint256 _newLimit) external onlyRole(DEFAULT_ADMIN_ROLE) {
        verificationTimeLimit = _newLimit;
    }

    function deactivateRewardItem(uint256 _itemId) external {
        ClubRewardItem storage item = clubRewardItems[_itemId];
        require(item.clubOrAthlete == msg.sender || hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Not authorized");
        item.isActive = false;
    }

    function emergencyWithdraw(address _token, uint256 _amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        IERC20(_token).transfer(msg.sender, _amount);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    receive() external payable {}
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Quests is AccessControl, ReentrancyGuard, Pausable {
    bytes32 public constant SPORTS_CLUB_ROLE = keccak256("SPORTS_CLUB_ROLE");
    bytes32 public constant ATHLETE_ROLE = keccak256("ATHLETE_ROLE");
    bytes32 public constant VERIFIER_ROLE = keccak256("VERIFIER_ROLE");
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    enum Difficulty { BEGINNER, INTERMEDIATE, EXPERT }
    enum Category { CARDIO, STRENGTH, FLEXIBILITY, NUTRITION, ENDURANCE, TEAM_SPORT }
    enum VerificationType { MANUAL, FITNESS_APP, PHOTO_VIDEO, PEER_VERIFICATION }
    enum ChallengeStatus { ACTIVE, PAUSED, COMPLETED, CANCELLED }
    enum ParticipationStatus { REGISTERED, IN_PROGRESS, SUBMITTED, VERIFIED, REJECTED }

    struct Challenge {
        uint256 id;
        string title;
        string description;
        string requirements;
        address creator;
        Category category;
        Difficulty difficulty;
        VerificationType verificationType;
        ChallengeStatus status;
        uint256 startTime;
        uint256 endTime;
        uint256 maxParticipants;
        uint256 currentParticipants;
        address rewardToken;
        uint256 rewardAmount;
        uint256 bonusMultiplier;
        bool isTeamChallenge;
        uint256 minTeamSize;
        uint256 verificationDeadline;
        string[] requiredData;
    }

    struct Participation {
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
        uint256 challengeId;
        uint256 totalScore;
        address captain;
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
        bool isVerifier;
    }

    mapping(uint256 => Challenge) public challenges;
    mapping(uint256 => mapping(address => Participation)) public participations;
    mapping(uint256 => Team) public teams;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => bool) public supportedTokens;
    mapping(uint256 => address[]) public challengeParticipants;
    mapping(uint256 => uint256[]) public challengeTeams;
    
    uint256 public challengeCounter;
    uint256 public teamCounter;
    uint256 public constant MIN_VERIFICATIONS = 3;
    uint256 public constant VERIFICATION_REWARD = 10;
    uint256 public verificationTimeLimit = 7 days;

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(VERIFIER_ROLE, msg.sender);
    }

    function createChallenge(
        string memory _title,
        string memory _description,
        string memory _requirements,
        Category _category,
        Difficulty _difficulty,
        VerificationType _verificationType,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _maxParticipants,
        address _rewardToken,
        uint256 _rewardAmount,
        uint256 _bonusMultiplier,
        bool _isTeamChallenge,
        uint256 _minTeamSize,
        string[] memory _requiredData
    ) external whenNotPaused {
        require(
            hasRole(SPORTS_CLUB_ROLE, msg.sender) || 
            hasRole(ATHLETE_ROLE, msg.sender) || 
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Not authorized to create challenges"
        );
        require(_startTime > block.timestamp, "Start time must be in future");
        require(_endTime > _startTime, "End time must be after start time");
        require(_maxParticipants > 0, "Max participants must be > 0");
        require(supportedTokens[_rewardToken], "Token not supported");
        require(_rewardAmount > 0, "Reward amount must be > 0");
        
        if (_isTeamChallenge) {
            require(_minTeamSize >= 2, "Team size must be at least 2");
        }

        challengeCounter++;
        
        Challenge storage newChallenge = challenges[challengeCounter];
        newChallenge.id = challengeCounter;
        newChallenge.title = _title;
        newChallenge.description = _description;
        newChallenge.requirements = _requirements;
        newChallenge.creator = msg.sender;
        newChallenge.category = _category;
        newChallenge.difficulty = _difficulty;
        newChallenge.verificationType = _verificationType;
        newChallenge.status = ChallengeStatus.ACTIVE;
        newChallenge.startTime = _startTime;
        newChallenge.endTime = _endTime;
        newChallenge.maxParticipants = _maxParticipants;
        newChallenge.rewardToken = _rewardToken;
        newChallenge.rewardAmount = _rewardAmount;
        newChallenge.bonusMultiplier = _bonusMultiplier;
        newChallenge.isTeamChallenge = _isTeamChallenge;
        newChallenge.minTeamSize = _minTeamSize;
        newChallenge.verificationDeadline = _endTime + verificationTimeLimit;
        newChallenge.requiredData = _requiredData;
    }

    function registerForChallenge(
        uint256 _challengeId,
        uint256 _teamId
    ) external whenNotPaused {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(challenge.status == ChallengeStatus.ACTIVE, "Challenge not active");
        require(block.timestamp >= challenge.startTime, "Challenge not started");
        require(block.timestamp <= challenge.endTime, "Challenge ended");
        require(challenge.currentParticipants < challenge.maxParticipants, "Challenge full");
        
        Participation storage participation = participations[_challengeId][msg.sender];
        require(participation.status == ParticipationStatus(0), "Already registered");

        if (challenge.isTeamChallenge) {
            require(_teamId != 0, "Team ID required for team challenges");
            Team storage team = teams[_teamId];
            require(team.challengeId == _challengeId, "Team not for this challenge");
            require(team.members.length < challenge.minTeamSize * 2, "Team full");
            
            team.members.push(msg.sender);
            participation.teamId = _teamId;
        }

        participation.challengeId = _challengeId;
        participation.participant = msg.sender;
        participation.status = ParticipationStatus.REGISTERED;
        participation.requiredVerifications = MIN_VERIFICATIONS;
        
        challengeParticipants[_challengeId].push(msg.sender);
        challenge.currentParticipants++;
    }

    function createTeam(
        uint256 _challengeId,
        string memory _teamName
    ) external whenNotPaused returns (uint256) {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(challenge.isTeamChallenge, "Not a team challenge");
        require(challenge.status == ChallengeStatus.ACTIVE, "Challenge not active");
        
        teamCounter++;
        
        Team storage newTeam = teams[teamCounter];
        newTeam.id = teamCounter;
        newTeam.name = _teamName;
        newTeam.challengeId = _challengeId;
        newTeam.captain = msg.sender;
        newTeam.members.push(msg.sender);
        
        challengeTeams[_challengeId].push(teamCounter);
        
        return teamCounter;
    }

    function submitChallenge(
        uint256 _challengeId,
        string memory _submissionData,
        uint256 _scoreAchieved
    ) external whenNotPaused {
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(block.timestamp <= challenge.endTime, "Challenge ended");
        
        Participation storage participation = participations[_challengeId][msg.sender];
        require(participation.status == ParticipationStatus.REGISTERED, "Not registered");
        
        participation.status = ParticipationStatus.SUBMITTED;
        participation.submissionTime = block.timestamp;
        participation.submissionData = _submissionData;
        participation.scoreAchieved = _scoreAchieved;
    }

    function verifySubmission(
        uint256 _challengeId,
        address _participant,
        bool _approved
    ) external whenNotPaused {
        require(
            hasRole(VERIFIER_ROLE, msg.sender) || 
            hasRole(ORACLE_ROLE, msg.sender),
            "Not authorized to verify"
        );
        
        Challenge storage challenge = challenges[_challengeId];
        require(challenge.id != 0, "Challenge does not exist");
        require(block.timestamp <= challenge.verificationDeadline, "Verification deadline passed");
        
        Participation storage participation = participations[_challengeId][_participant];
        require(participation.status == ParticipationStatus.SUBMITTED, "No submission to verify");
        require(!participation.verifiedBy[msg.sender], "Already verified by this address");
        
        participation.verifiedBy[msg.sender] = true;
        participation.verificationCount++;
        
        if (_approved && participation.verificationCount >= participation.requiredVerifications) {
            participation.status = ParticipationStatus.VERIFIED;
            _distributeReward(_challengeId, _participant);
        } else if (!_approved && participation.verificationCount >= participation.requiredVerifications) {
            participation.status = ParticipationStatus.REJECTED;
        }
        
        userProfiles[msg.sender].reputationScore += VERIFICATION_REWARD;
    }

    function _distributeReward(uint256 _challengeId, address _participant) internal {
        Challenge storage challenge = challenges[_challengeId];
        UserProfile storage profile = userProfiles[_participant];
        
        uint256 baseReward = challenge.rewardAmount;
        uint256 bonusReward = 0;
        
        if (profile.currentStreak > 0) {
            bonusReward = (baseReward * challenge.bonusMultiplier * profile.currentStreak) / 100;
        }
        
        uint256 difficultyMultiplier = uint256(challenge.difficulty) + 1;
        uint256 totalReward = (baseReward + bonusReward) * difficultyMultiplier;
        
        IERC20(challenge.rewardToken).transfer(_participant, totalReward);
        
        profile.totalChallengesCompleted++;
        profile.totalRewardsEarned += totalReward;
        profile.currentStreak++;
        profile.categoryCompletions[challenge.category]++;
        profile.tokenBalances[challenge.rewardToken] += totalReward;
        profile.completedChallenges.push(_challengeId);
        
        if (profile.currentStreak > profile.longestStreak) {
            profile.longestStreak = profile.currentStreak;
        }
    }

    function getChallenge(uint256 _challengeId) external view returns (
        uint256 id,
        string memory title,
        string memory description,
        address creator,
        Category category,
        Difficulty difficulty,
        ChallengeStatus status,
        uint256 startTime,
        uint256 endTime,
        uint256 currentParticipants,
        uint256 maxParticipants,
        address rewardToken,
        uint256 rewardAmount,
        bool isTeamChallenge
    ) {
        Challenge storage challenge = challenges[_challengeId];
        return (
            challenge.id,
            challenge.title,
            challenge.description,
            challenge.creator,
            challenge.category,
            challenge.difficulty,
            challenge.status,
            challenge.startTime,
            challenge.endTime,
            challenge.currentParticipants,
            challenge.maxParticipants,
            challenge.rewardToken,
            challenge.rewardAmount,
            challenge.isTeamChallenge
        );
    }

    function getUserProfile(address _user) external view returns (
        string memory username,
        uint256 totalChallengesCompleted,
        uint256 totalRewardsEarned,
        uint256 currentStreak,
        uint256 longestStreak,
        uint256 reputationScore
    ) {
        UserProfile storage profile = userProfiles[_user];
        return (
            profile.username,
            profile.totalChallengesCompleted,
            profile.totalRewardsEarned,
            profile.currentStreak,
            profile.longestStreak,
            profile.reputationScore
        );
    }

    function getChallengeParticipants(uint256 _challengeId) external view returns (address[] memory) {
        return challengeParticipants[_challengeId];
    }

    function getTeam(uint256 _teamId) external view returns (
        uint256 id,
        string memory name,
        address[] memory members,
        uint256 challengeId,
        uint256 totalScore,
        address captain
    ) {
        Team storage team = teams[_teamId];
        return (
            team.id,
            team.name,
            team.members,
            team.challengeId,
            team.totalScore,
            team.captain
        );
    }

    function addSupportedToken(address _token) external onlyRole(DEFAULT_ADMIN_ROLE) {
        supportedTokens[_token] = true;
    }

    function removeSupportedToken(address _token) external onlyRole(DEFAULT_ADMIN_ROLE) {
        supportedTokens[_token] = false;
    }

    function pauseChallenge(uint256 _challengeId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        challenges[_challengeId].status = ChallengeStatus.PAUSED;
    }

    function unpauseChallenge(uint256 _challengeId) external onlyRole(DEFAULT_ADMIN_ROLE) {
        challenges[_challengeId].status = ChallengeStatus.ACTIVE;
    }

    function setVerificationTimeLimit(uint256 _newLimit) external onlyRole(DEFAULT_ADMIN_ROLE) {
        verificationTimeLimit = _newLimit;
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
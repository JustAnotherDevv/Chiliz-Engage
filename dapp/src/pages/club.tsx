import React, { useState, useRef } from "react";
import {
  ArrowRight,
  Play,
  Shield,
  Users,
  Trophy,
  Star,
  Lock,
  Twitter,
  Coins,
  Gift,
  TrendingUp,
  Heart,
  Zap,
  Bell,
  Menu,
  Search,
  Plus,
  Filter,
  ChevronDown,
  Eye,
  Globe,
  Calendar,
  MapPin,
  Award,
  Settings,
  LogOut,
  User,
  Target,
  Flame,
  Crown,
  ChevronUp,
  MessageCircle,
  Share2,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Upload,
  DollarSign,
  Percent,
  Link,
  Image,
  X,
} from "lucide-react";

interface User {
  name: string;
  avatar: string;
  points: number;
  level: number;
  rank: string;
  completedChallenges: number;
}

interface ClubStats {
  totalMembers: number;
  fanTokens: {
    totalSupply: number;
    currentPrice: number;
    marketCap: number;
    priceChange24h: number;
  };
  achievements: number;
  founded: string;
  location: string;
}

interface UserTokens {
  owned: number;
  staked: number;
  stakingTier: "bronze" | "silver" | "gold" | "platinum" | null;
  stakingRewards: number;
  canWithdraw: boolean;
}

interface Post {
  id: string;
  type: "exclusive" | "user";
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
    isClub?: boolean;
  };
  content: string;
  image?: string;
  link?: string;
  timestamp: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  tierRequired?: "bronze" | "silver" | "gold" | "platinum";
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  image: string;
  requiredTokens: number;
  participants: number;
  maxParticipants: number;
  endDate: string;
  rewards: string[];
  difficulty: "easy" | "medium" | "hard";
  status: "active" | "upcoming" | "completed";
  isJoined: boolean;
}

const ClubHeroCard = ({ club }: { club: any }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="max-w-[95vw] mx-auto mb-24 mt-16">
      <div
        ref={cardRef}
        className="relative w-full h-[650px] cursor-pointer group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ overflow: "visible" }}
      >
        <div
          className={`
            relative w-full h-full transform-gpu transition-all duration-700 ease-out
            ${isHovered ? "scale-[1.02]" : "scale-100"}
          `}
          style={{ overflow: "visible" }}
        >
          {/* Background Image - extending above the card */}
          <div
            className="absolute -top-24 -right-96 w-full bg-contain bg-center bg-no-repeat z-10 transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url(/person7.png)`,
              height: "calc(100% + 48px)",
              transform: isHovered ? "scale(125%)" : "scale(120%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-30"></div>

          {/* Main Card */}
          <div
            className={`
              relative w-full h-full rounded-3xl overflow-hidden flex
              border transition-all duration-700 bg-black/40 backdrop-blur-sm shadow-2xl
              ${
                isHovered
                  ? "shadow-blue-500/20 shadow-4xl border-blue-500/30"
                  : "border-gray-600/40"
              }
            `}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 rounded-3xl opacity-70"></div>

            {/* Dynamic shine effect */}
            <div
              className={`
                absolute inset-0 opacity-0 transition-all duration-500
                ${isHovered ? "opacity-20" : "opacity-0"}
              `}
              style={{
                background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 20%, rgba(59,130,246,0.1) 40%, transparent 70%)`,
              }}
            />

            {/* Left side - Text Content */}
            <div className="w-1/2 flex items-center justify-start p-16 pr-32 relative z-40">
              <div className="max-w-lg">
                {/* Club Logo with enhanced styling */}
                <div
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-2xl backdrop-blur-md mb-8 transition-all duration-500 border
                    ${isHovered ? "scale-110 shadow-blue-500/30" : "scale-100"}
                  `}
                  style={{
                    background: `linear-gradient(135deg, ${club.primaryColor}50, ${club.secondaryColor}50)`,
                    border: `2px solid ${club.primaryColor}70`,
                  }}
                >
                  {club.logo}
                </div>

                {/* Enhanced category badge */}
                <div className="mb-6 inline-flex items-center">
                  <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-blue-400/30">
                    <span className="text-blue-300 tracking-widest text-sm font-medium uppercase flex items-center">
                      <Zap size={16} className="mr-2" />
                      {club.category} CLUB
                      <Zap size={16} className="ml-2" />
                    </span>
                  </div>
                </div>

                {/* Enhanced club name */}
                <h1 className="text-6xl md:text-7xl font-extralight tracking-wider leading-tight mb-8">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                    {club.name}
                  </span>
                </h1>

                {/* Enhanced description */}
                <p className="text-xl text-gray-200 mb-10 font-light leading-relaxed opacity-90">
                  {club.description}
                </p>

                {/* Enhanced stats grid */}
                <div className="grid grid-cols-3 gap-8 text-sm">
                  <div className="text-center group">
                    <div className="text-white font-light text-2xl mb-2 transition-all duration-300 group-hover:scale-110">
                      {club.members}
                    </div>
                    <div className="text-gray-300 font-light uppercase tracking-wider text-xs">
                      Members
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="text-white font-light text-2xl mb-2 transition-all duration-300 group-hover:scale-110">
                      {club.founded}
                    </div>
                    <div className="text-gray-300 font-light uppercase tracking-wider text-xs">
                      Founded
                    </div>
                  </div>
                  <div className="text-center group">
                    <div className="text-white font-light text-2xl mb-2 transition-all duration-300 group-hover:scale-110">
                      {club.achievements}
                    </div>
                    <div className="text-gray-300 font-light uppercase tracking-wider text-xs">
                      Achievements
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - enhanced with subtle pattern */}
            <div className="w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-l from-black/30 to-transparent" />
              <div
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  gradient,
  change,
}: {
  title: string;
  value: string;
  subtitle?: string;
  icon: any;
  gradient: string;
  change?: number;
}) => (
  <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 p-8 hover:border-gray-500/60 hover:bg-black/50 transition-all duration-500 group">
    <div
      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} p-3 mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}
    >
      <Icon className="w-full h-full text-white" />
    </div>
    <div className="text-3xl font-extralight text-white mb-3 tracking-wide group-hover:text-blue-100 transition-colors">
      {value}
    </div>
    {subtitle && (
      <div className="text-sm text-gray-300 font-light tracking-wide mb-3">
        {subtitle}
      </div>
    )}
    <div className="text-sm text-gray-400 font-light tracking-widest uppercase">
      {title}
    </div>
    {change !== undefined && (
      <div
        className={`text-xs mt-3 flex items-center font-medium ${
          change > 0
            ? "text-green-400"
            : change < 0
            ? "text-red-400"
            : "text-gray-400"
        }`}
      >
        {change > 0 ? (
          <TrendingUp size={12} className="mr-1" />
        ) : change < 0 ? (
          <ChevronDown size={12} className="mr-1" />
        ) : null}
        {change > 0 ? "+" : ""}
        {change}%
      </div>
    )}
  </div>
);

const TokenStakingCard = ({
  userTokens,
  onStake,
  onWithdraw,
}: {
  userTokens: UserTokens;
  onStake: (amount: number, tier: string) => void;
  onWithdraw: () => void;
}) => {
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(100);
  const [selectedTier, setSelectedTier] = useState("bronze");

  const stakingTiers = [
    {
      name: "bronze",
      required: 100,
      color: "from-orange-600 to-orange-400",
      benefits: ["Basic Access", "Weekly Updates"],
    },
    {
      name: "silver",
      required: 500,
      color: "from-gray-400 to-gray-200",
      benefits: ["Premium Content", "Monthly Calls"],
    },
    {
      name: "gold",
      required: 1000,
      color: "from-yellow-500 to-yellow-300",
      benefits: ["VIP Access", "Direct Messaging"],
    },
    {
      name: "platinum",
      required: 2500,
      color: "from-purple-500 to-pink-400",
      benefits: ["Exclusive Events", "Training Sessions"],
    },
  ];

  const currentTier = stakingTiers.find(
    (tier) => tier.name === userTokens.stakingTier
  );

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 p-8 hover:border-gray-500/60 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-extralight tracking-wide text-white">
          Your Fan Tokens
        </h3>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
          <Coins className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center p-4 bg-gray-800/30 rounded-xl">
          <div className="text-3xl font-extralight text-white mb-2">
            {userTokens.owned}
          </div>
          <div className="text-sm text-gray-400 font-light uppercase tracking-wide">
            Available
          </div>
        </div>
        <div className="text-center p-4 bg-gray-800/30 rounded-xl">
          <div className="text-3xl font-extralight text-white mb-2">
            {userTokens.staked}
          </div>
          <div className="text-sm text-gray-400 font-light uppercase tracking-wide">
            Staked
          </div>
        </div>
      </div>

      {currentTier && (
        <div className="mb-8">
          <div
            className={`bg-gradient-to-r ${currentTier.color} p-5 rounded-xl mb-4 shadow-lg`}
          >
            <div className="flex items-center justify-between text-black">
              <span className="font-semibold uppercase tracking-wider">
                {currentTier.name} Member
              </span>
              <Crown size={24} />
            </div>
          </div>
          <div className="text-sm text-gray-300 mb-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            Weekly Rewards:{" "}
            <span className="text-green-400 font-medium">
              {userTokens.stakingRewards} tokens
            </span>
          </div>
        </div>
      )}

      <div className="flex space-x-4">
        <button
          onClick={() => setShowStakeModal(true)}
          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-blue-500/25"
        >
          <Upload size={18} />
          <span>Stake Tokens</span>
        </button>

        {userTokens.canWithdraw && (
          <button
            onClick={onWithdraw}
            className="flex-1 bg-gray-700/50 border border-gray-600/50 px-6 py-4 rounded-xl font-medium hover:bg-gray-700/70 transition-all flex items-center justify-center space-x-2 text-white"
          >
            <Download size={18} />
            <span>Withdraw</span>
          </button>
        )}
      </div>

      {/* Enhanced Staking Modal */}
      {showStakeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-extralight tracking-wide text-white">
                Stake Fan Tokens
              </h3>
              <button
                onClick={() => setShowStakeModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-8">
              <label className="block text-sm text-gray-400 font-light mb-3">
                Amount to Stake
              </label>
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(Number(e.target.value))}
                className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-4 text-white font-light text-lg focus:border-blue-500/50 focus:outline-none transition-colors"
                min="1"
                max={userTokens.owned}
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm text-gray-400 font-light mb-4">
                Select Tier
              </label>
              <div className="space-y-3">
                {stakingTiers.map((tier) => (
                  <button
                    key={tier.name}
                    onClick={() => setSelectedTier(tier.name)}
                    disabled={stakeAmount < tier.required}
                    className={`w-full p-5 rounded-xl border transition-all ${
                      selectedTier === tier.name
                        ? "border-blue-500/50 bg-blue-500/15"
                        : "border-gray-700/50 bg-gray-800/40"
                    } ${
                      stakeAmount < tier.required
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:border-gray-600/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-white font-semibold uppercase tracking-wider mb-1">
                          {tier.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {tier.required} tokens required
                        </div>
                      </div>
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-r ${tier.color} shadow-lg`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowStakeModal(false)}
                className="flex-1 bg-gray-700/50 border border-gray-600/50 px-6 py-4 rounded-xl font-medium hover:bg-gray-700/70 transition-all text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onStake(stakeAmount, selectedTier);
                  setShowStakeModal(false);
                }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg"
              >
                Stake Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CreatePostModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string, link: string) => void;
}) => {
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    onSubmit(content, link);
    setContent("");
    setLink("");
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-extralight tracking-wide text-white">
            Share with Community
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 font-light mb-3">
              What's on your mind?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, achievements, or training updates..."
              className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl px-4 py-4 text-white font-light resize-none focus:border-blue-500/50 focus:outline-none transition-colors"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 font-light mb-3">
              Share a link (optional)
            </label>
            <div className="relative">
              <Link
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="w-full bg-gray-800/60 border border-gray-700/50 rounded-xl pl-12 pr-4 py-4 text-white font-light focus:border-blue-500/50 focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-4 text-gray-400">
              <button
                type="button"
                className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
              >
                <Image size={20} />
                <span className="text-sm">Add Image</span>
              </button>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl font-medium hover:bg-gray-700/70 transition-all text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!content.trim() || isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Share2 size={18} />
                )}
                <span>{isLoading ? "Posting..." : "Share Post"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const PostCard = ({
  post,
  userTokens,
}: {
  post: Post;
  userTokens: UserTokens;
}) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const hasAccess =
    post.type === "user" ||
    (post.tierRequired &&
      userTokens.stakingTier &&
      ["bronze", "silver", "gold", "platinum"].indexOf(
        userTokens.stakingTier
      ) >= ["bronze", "silver", "gold", "platinum"].indexOf(post.tierRequired));

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 p-6 hover:border-gray-500/60 transition-all duration-300">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-lg font-medium shadow-lg">
            {post.author.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">{post.author.name}</span>
              {post.author.verified && (
                <CheckCircle size={16} className="text-blue-400" />
              )}
              {post.author.isClub && (
                <Crown size={16} className="text-yellow-400" />
              )}
            </div>
            <span className="text-gray-400 text-sm font-light">
              {post.timestamp}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {post.type === "exclusive" && post.tierRequired && (
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-lg ${
                post.tierRequired === "bronze"
                  ? "bg-gradient-to-r from-orange-500/20 to-orange-400/20 text-orange-300 border border-orange-500/30"
                  : post.tierRequired === "silver"
                  ? "bg-gradient-to-r from-gray-500/20 to-gray-400/20 text-gray-300 border border-gray-500/30"
                  : post.tierRequired === "gold"
                  ? "bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 text-yellow-300 border border-yellow-500/30"
                  : "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30"
              }`}
            >
              {post.tierRequired}
            </div>
          )}
          <button className="text-gray-400 hover:text-white transition-colors p-1">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Enhanced Content */}
      {hasAccess ? (
        <>
          <p className="text-gray-200 font-light leading-relaxed mb-6 text-lg">
            {post.content}
          </p>

          {post.link && (
            <div className="mb-6 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Link size={20} className="text-blue-400" />
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors font-medium truncate"
                >
                  {post.link}
                </a>
              </div>
            </div>
          )}

          {post.image && (
            <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
              <img
                src={post.image}
                alt="Post content"
                className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Enhanced Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700/40">
            <div className="flex items-center space-x-8">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-all hover:scale-110 ${
                  isLiked ? "text-red-400" : "text-gray-400 hover:text-red-400"
                }`}
              >
                <Heart size={20} className={isLiked ? "fill-current" : ""} />
                <span className="font-medium">{likes}</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-all hover:scale-110">
                <MessageCircle size={20} />
                <span className="font-medium">{post.comments}</span>
              </button>

              <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-all hover:scale-110">
                <Share2 size={20} />
                <span className="font-medium">Share</span>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-700/50 flex items-center justify-center">
            <Lock size={24} className="text-gray-500" />
          </div>
          <h4 className="text-gray-300 font-medium mb-3 text-lg">
            Exclusive Content
          </h4>
          <p className="text-gray-500 text-sm font-light">
            Stake {post.tierRequired} tier tokens to unlock this content
          </p>
        </div>
      )}
    </div>
  );
};

const ChallengeCard = ({
  challenge,
  userTokens,
  onJoin,
}: {
  challenge: Challenge;
  userTokens: UserTokens;
  onJoin: (challengeId: string) => void;
}) => {
  const canAfford = userTokens.owned >= challenge.requiredTokens;
  const difficultyColors = {
    easy: "from-green-500 to-emerald-500",
    medium: "from-yellow-500 to-orange-500",
    hard: "from-red-500 to-pink-500",
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 overflow-hidden hover:border-gray-500/60 hover:scale-105 transition-all duration-300 group">
      {/* Enhanced Challenge Image */}
      <div className="h-52 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <img
          src={challenge.image}
          alt={challenge.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

        {/* Enhanced Difficulty Badge */}
        <div
          className={`absolute top-4 left-4 px-4 py-2 rounded-full bg-gradient-to-r ${
            difficultyColors[challenge.difficulty]
          } text-white text-xs font-bold uppercase tracking-wider shadow-lg`}
        >
          {challenge.difficulty}
        </div>

        {/* Enhanced Status Badge */}
        <div
          className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg ${
            challenge.status === "active"
              ? "bg-green-500/30 text-green-200 border border-green-400/50"
              : challenge.status === "upcoming"
              ? "bg-blue-500/30 text-blue-200 border border-blue-400/50"
              : "bg-gray-500/30 text-gray-200 border border-gray-400/50"
          }`}
        >
          {challenge.status}
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Title and Description */}
        <h3 className="text-xl font-medium tracking-wide text-white mb-4">
          {challenge.title}
        </h3>
        <p className="text-gray-300 font-light leading-relaxed mb-6 line-clamp-3">
          {challenge.description}
        </p>

        {/* Enhanced Challenge Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-800/40 rounded-xl">
            <div className="text-2xl font-light text-white mb-2">
              {challenge.requiredTokens}
            </div>
            <div className="text-sm text-gray-400 font-light uppercase tracking-wide">
              Entry Fee
            </div>
          </div>
          <div className="text-center p-4 bg-gray-800/40 rounded-xl">
            <div className="text-2xl font-light text-white mb-2">
              {challenge.participants}/{challenge.maxParticipants}
            </div>
            <div className="text-sm text-gray-400 font-light uppercase tracking-wide">
              Participants
            </div>
          </div>
        </div>

        {/* Enhanced End Date */}
        <div className="flex items-center space-x-3 mb-6 text-gray-400 p-3 bg-gray-800/30 rounded-lg">
          <Clock size={18} />
          <span className="text-sm font-medium">Ends {challenge.endDate}</span>
        </div>

        {/* Enhanced Rewards */}
        <div className="mb-6">
          <h4 className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-3">
            Rewards
          </h4>
          <div className="flex flex-wrap gap-2">
            {challenge.rewards.map((reward, index) => (
              <span
                key={index}
                className="px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-lg text-xs font-medium border border-purple-500/30"
              >
                {reward}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Action Button */}
        <button
          onClick={() => onJoin(challenge.id)}
          disabled={
            !canAfford || challenge.isJoined || challenge.status !== "active"
          }
          className={`w-full py-4 px-6 rounded-xl font-medium tracking-wide transition-all flex items-center justify-center space-x-2 shadow-lg ${
            challenge.isJoined
              ? "bg-green-500/20 border border-green-400/50 text-green-300 cursor-not-allowed"
              : !canAfford || challenge.status !== "active"
              ? "bg-gray-600/50 border border-gray-500/50 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105"
          }`}
        >
          {challenge.isJoined ? (
            <>
              <CheckCircle size={18} />
              <span>Joined</span>
            </>
          ) : !canAfford ? (
            <>
              <XCircle size={18} />
              <span>Insufficient Tokens</span>
            </>
          ) : challenge.status !== "active" ? (
            <>
              <Clock size={18} />
              <span>
                {challenge.status === "upcoming" ? "Coming Soon" : "Completed"}
              </span>
            </>
          ) : (
            <>
              <Target size={18} />
              <span>Join Challenge</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const SportsClubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("exclusive");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const currentUser: User = {
    name: "Alex Johnson",
    avatar: "👨‍💻",
    points: 12750,
    level: 8,
    rank: "Pro Athlete",
    completedChallenges: 23,
  };

  const club = {
    id: "fc-thunder",
    name: "FC Thunder",
    logo: "⚽",
    description:
      "Elite football club focused on developing world-class players through innovative training methods and cutting-edge technology. Join our community of passionate athletes.",
    members: 1247,
    founded: "2015",
    location: "London, UK",
    category: "Football",
    achievements: 15,
    rating: 5,
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    gifUrl: "https://media.giphy.com/media/l2SpMUEMRJkkqYcta/giphy.gif",
  };

  const clubStats: ClubStats = {
    totalMembers: 1247,
    fanTokens: {
      totalSupply: 1000000,
      currentPrice: 2.45,
      marketCap: 2450000,
      priceChange24h: 5.2,
    },
    achievements: 15,
    founded: "2015",
    location: "London, UK",
  };

  const [userTokens, setUserTokens] = useState<UserTokens>({
    owned: 750,
    staked: 500,
    stakingTier: "silver",
    stakingRewards: 25,
    canWithdraw: true,
  });

  const exclusivePosts: Post[] = [
    {
      id: "1",
      type: "exclusive",
      author: {
        name: "FC Thunder",
        avatar: "⚽",
        verified: true,
        isClub: true,
      },
      content:
        "🔥 EXCLUSIVE: Behind-the-scenes footage from today's training session! Watch our new tactical formations in action. This is premium content only for our token holders.",
      image: "/training-session.jpg",
      timestamp: "2 hours ago",
      likes: 156,
      comments: 23,
      isLiked: false,
      tierRequired: "bronze",
    },
    {
      id: "2",
      type: "exclusive",
      author: {
        name: "Coach Martinez",
        avatar: "👨‍🏫",
        verified: true,
        isClub: false,
      },
      content:
        "Personal training tips for our Gold tier members! Here's my secret warm-up routine that helped our team win the championship. Follow these 5 steps every morning...",
      timestamp: "5 hours ago",
      likes: 89,
      comments: 15,
      isLiked: true,
      tierRequired: "gold",
    },
    {
      id: "3",
      type: "exclusive",
      author: {
        name: "FC Thunder",
        avatar: "⚽",
        verified: true,
        isClub: true,
      },
      content:
        "🏆 PLATINUM EXCLUSIVE: Next week's match strategy revealed! Our captain shares insider knowledge about the upcoming derby. This intel could change everything...",
      timestamp: "1 day ago",
      likes: 234,
      comments: 67,
      isLiked: false,
      tierRequired: "platinum",
    },
  ];

  const [userPosts, setUserPosts] = useState<Post[]>([
    {
      id: "4",
      type: "user",
      author: {
        name: "Sarah Chen",
        avatar: "👩‍🦱",
        verified: false,
        isClub: false,
      },
      content:
        "Just finished the morning training session! The new drills are intense but I can already feel the improvement. Love being part of this community! 💪",
      image: "/user-training.jpg",
      timestamp: "30 minutes ago",
      likes: 42,
      comments: 8,
      isLiked: true,
    },
    {
      id: "5",
      type: "user",
      author: {
        name: "Mike Rodriguez",
        avatar: "👨‍🦲",
        verified: false,
        isClub: false,
      },
      content:
        "Shoutout to the coaching staff for the amazing session yesterday! My ball control has improved so much since joining FC Thunder. Best investment ever! ⚽",
      timestamp: "3 hours ago",
      likes: 67,
      comments: 12,
      isLiked: false,
    },
    {
      id: "6",
      type: "user",
      author: {
        name: "Emma Wilson",
        avatar: "👩‍🏫",
        verified: false,
        isClub: false,
      },
      content:
        "Watching the team dominate in today's match! So proud to be supporting FC Thunder. The tactical improvements are clearly showing on the pitch! 🔥",
      link: "https://youtube.com/watch?v=sample",
      timestamp: "6 hours ago",
      likes: 91,
      comments: 19,
      isLiked: true,
    },
  ]);

  const challenges: Challenge[] = [
    {
      id: "1",
      title: "Sprint Master Challenge",
      description:
        "Complete 10 sprint sessions in 7 days. Track your times and compete with other members for the fastest improvement rate.",
      image: "/sprint-challenge.jpg",
      requiredTokens: 100,
      participants: 47,
      maxParticipants: 100,
      endDate: "July 20, 2025",
      rewards: ["500 Bonus Tokens", "Training Gear", "1-on-1 Session"],
      difficulty: "medium",
      status: "active",
      isJoined: false,
    },
    {
      id: "2",
      title: "Tactical Knowledge Quiz",
      description:
        "Test your football IQ with our comprehensive tactical quiz. Answer questions about formations, strategies, and match analysis.",
      image: "/quiz-challenge.jpg",
      requiredTokens: 50,
      participants: 156,
      maxParticipants: 200,
      endDate: "July 18, 2025",
      rewards: ["200 Bonus Tokens", "Digital Certificate"],
      difficulty: "easy",
      status: "active",
      isJoined: true,
    },
    {
      id: "3",
      title: "Endurance Championship",
      description:
        "The ultimate test of stamina and determination. Complete a series of endurance challenges over 14 days.",
      image: "/endurance-challenge.jpg",
      requiredTokens: 250,
      participants: 23,
      maxParticipants: 50,
      endDate: "July 25, 2025",
      rewards: [
        "1000 Bonus Tokens",
        "Championship Badge",
        "Training Camp Access",
      ],
      difficulty: "hard",
      status: "active",
      isJoined: false,
    },
    {
      id: "4",
      title: "Community Skills Workshop",
      description:
        "Upcoming skills workshop focusing on ball control and passing techniques. Limited spots available.",
      image: "/workshop-challenge.jpg",
      requiredTokens: 75,
      participants: 0,
      maxParticipants: 30,
      endDate: "July 30, 2025",
      rewards: ["Workshop Access", "Skill Certificate"],
      difficulty: "easy",
      status: "upcoming",
      isJoined: false,
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "FC Thunder posted exclusive content for Silver tier members!",
      type: "success",
      time: "5m ago",
    },
    {
      id: 2,
      message: "Sprint Master Challenge ending in 2 days - join now!",
      type: "info",
      time: "1h ago",
    },
    {
      id: 3,
      message: "You've earned 25 staking rewards tokens!",
      type: "reward",
      time: "3h ago",
    },
  ];

  const handleStake = (amount: number, tier: string) => {
    setUserTokens((prev) => ({
      ...prev,
      owned: prev.owned - amount,
      staked: prev.staked + amount,
      stakingTier: tier as any,
    }));
  };

  const handleWithdraw = () => {
    setUserTokens((prev) => ({
      ...prev,
      owned: prev.owned + prev.staked,
      staked: 0,
      stakingTier: null,
      stakingRewards: 0,
      canWithdraw: false,
    }));
  };

  const handleJoinChallenge = (challengeId: string) => {
    console.log(`Joining challenge ${challengeId}`);
  };

  const handleCreatePost = (content: string, link: string) => {
    const newPost: Post = {
      id: `user-${Date.now()}`,
      type: "user",
      author: {
        name: currentUser.name,
        avatar: currentUser.avatar,
        verified: false,
        isClub: false,
      },
      content,
      link: link || undefined,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setUserPosts((prev) => [newPost, ...prev]);
  };

  return (
    <div className="min-h-screen relative w-screen">
      {/* Enhanced Fixed Background Layer */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(/memphis-mini-dark.webp)`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
        }}
      />

      {/* Enhanced dark overlay with subtle gradient */}
      <div className="fixed inset-0 z-1 bg-gradient-to-br from-black/30 via-black/20 to-black/40" />

      {/* All content above background */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Club Hero Section */}
          <ClubHeroCard club={club} />

          {/* Enhanced Token Staking Section */}
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            <div className="lg:col-span-1">
              <TokenStakingCard
                userTokens={userTokens}
                onStake={handleStake}
                onWithdraw={handleWithdraw}
              />
            </div>

            {/* Enhanced Quick Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-6">
              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 p-6 hover:border-green-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium tracking-wide text-white">
                    Staking APY
                  </h4>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Percent className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-extralight text-white mb-2 group-hover:text-green-100 transition-colors">
                  12.5%
                </div>
                <div className="text-sm text-gray-400 font-light">
                  Annual Percentage Yield
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 p-6 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium tracking-wide text-white">
                    Your Tier
                  </h4>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-extralight text-white mb-2 capitalize group-hover:text-yellow-100 transition-colors">
                  {userTokens.stakingTier || "None"}
                </div>
                <div className="text-sm text-gray-400 font-light">
                  Membership Level
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 p-6 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium tracking-wide text-white">
                    Weekly Rewards
                  </h4>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-extralight text-white mb-2 group-hover:text-purple-100 transition-colors">
                  {userTokens.stakingRewards}
                </div>
                <div className="text-sm text-gray-400 font-light">
                  Tokens Earned
                </div>
              </div>

              <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-gray-600/40 p-6 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium tracking-wide text-white">
                    Total Staked
                  </h4>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-extralight text-white mb-2 group-hover:text-blue-100 transition-colors">
                  $
                  {(
                    userTokens.staked * clubStats.fanTokens.currentPrice
                  ).toFixed(0)}
                </div>
                <div className="text-sm text-gray-400 font-light">
                  USD Value
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Feed */}
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {/* Main Feed */}
            <div className="lg:col-span-2">
              {/* Enhanced Feed Header */}
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl font-extralight tracking-wide text-white">
                  Club Feed
                </h2>
                <div className="flex items-center space-x-4">
                  {/* Enhanced Create Post Button */}
                  {activeTab === "community" && (
                    <button
                      onClick={() => setShowCreatePost(true)}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:scale-105"
                    >
                      <Plus size={18} />
                      <span>Create Post</span>
                    </button>
                  )}

                  {/* Enhanced Tab Selector */}
                  <div className="flex bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-xl p-1 shadow-lg">
                    <button
                      onClick={() => setActiveTab("exclusive")}
                      className={`px-6 py-3 rounded-lg font-medium tracking-wide transition-all ${
                        activeTab === "exclusive"
                          ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                      }`}
                    >
                      Exclusive
                    </button>
                    <button
                      onClick={() => setActiveTab("community")}
                      className={`px-6 py-3 rounded-lg font-medium tracking-wide transition-all ${
                        activeTab === "community"
                          ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-blue-200 shadow-lg"
                          : "text-gray-400 hover:text-white hover:bg-gray-800/30"
                      }`}
                    >
                      Community
                    </button>
                  </div>
                </div>
              </div>

              {/* Posts */}
              <div className="space-y-8">
                {activeTab === "exclusive"
                  ? exclusivePosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        userTokens={userTokens}
                      />
                    ))
                  : userPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        userTokens={userTokens}
                      />
                    ))}
              </div>
            </div>

            {/* Enhanced Sidebar - Challenges */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-2xl font-extralight tracking-wide text-white mb-8">
                  Active Challenges
                </h3>
                <div className="space-y-6">
                  {challenges.slice(0, 2).map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      userTokens={userTokens}
                      onJoin={handleJoinChallenge}
                    />
                  ))}
                </div>
                <button className="w-full mt-6 bg-gray-800/50 border border-gray-700/50 px-6 py-4 rounded-xl font-medium hover:bg-gray-800/70 transition-all text-white">
                  View All Challenges
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Create Post Modal */}
        <CreatePostModal
          isOpen={showCreatePost}
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />

        {/* Enhanced Notifications Popup */}
        {showNotifications && (
          <div className="fixed top-20 right-6 w-96 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-50">
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-white font-medium tracking-wide text-lg">
                Notifications
              </h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-6 border-b border-gray-700/50 hover:bg-gray-800/30 transition-colors"
                >
                  <p className="text-gray-300 text-sm font-light tracking-wide mb-2">
                    {notification.message}
                  </p>
                  <span className="text-gray-500 text-xs font-light tracking-wider uppercase">
                    {notification.time}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-4 text-center">
              <button className="text-blue-400 hover:text-blue-300 text-sm font-medium tracking-wide transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        .shadow-4xl {
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default SportsClubPage;

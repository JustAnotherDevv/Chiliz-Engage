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
} from "lucide-react";

// Custom Icons matching your style
const Crown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3l4 6 5-7 5 7 4-6v18H5V3z"
    />
  </svg>
);

// Sports Card Component matching your existing style
interface Player {
  name: string;
  position: string;
  team: string;
  stats: {
    [key: string]: string | number;
  };
  imageUrl: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface SportsCardProps {
  player: Player;
  className?: string;
  showTrophy?: boolean;
}

const SportsCard: React.FC<SportsCardProps> = ({
  player,
  className = "",
  showTrophy = false,
}) => {
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

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "from-yellow-400 to-orange-500";
      case "epic":
        return "from-purple-500 to-pink-500";
      case "rare":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative w-72 h-80 cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <div
        className="relative w-full h-full transform-gpu transition-all duration-300 ease-out"
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${Math.max(
                -15,
                Math.min(15, (mousePosition.y - 160) * 0.03)
              )}deg) rotateY(${Math.max(
                -15,
                Math.min(15, (mousePosition.x - 144) * 0.03)
              )}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        }}
      >
        {showTrophy && (
          <div className="absolute -top-12 -right-12 w-40 h-40 z-50 opacity-100">
            <img
              src="/trophy_no_bg.png"
              alt=""
              className="w-full h-full object-contain transform rotate-12"
            />
          </div>
        )}

        <div
          className={`
          relative w-full h-full rounded-lg overflow-hidden border border-gray-600/50
          shadow-lg ${isHovered ? "shadow-xl border-gray-500/70" : ""}
          transition-all duration-300 bg-black/30 backdrop-blur-sm
        `}
        >
          {/* Rarity gradient border */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getRarityColor(
              player.rarity
            )} opacity-20 rounded-lg`}
          ></div>

          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(/bg-2.jpg)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-gray-400/5 opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          <div
            className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
              isHovered ? "opacity-10" : ""
            }`}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)`,
            }}
          />

          <div className="relative z-10 p-6 h-full flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-xl font-light tracking-wide text-white mb-2">
                {player.name}
              </h2>
              <p className="text-gray-400 text-sm uppercase tracking-widest font-light">
                {player.position} • {player.team}
              </p>
            </div>
            <div className="flex-1" />
            <div className="grid grid-cols-2 gap-3 bg-black/30 backdrop-blur-sm rounded-lg p-4">
              {Object.entries(player.stats).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg font-light text-white">{value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-light">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FanTokenExplorePage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Featured clubs data
  const featuredClubs = [
    {
      name: "Manchester United",
      position: "PREMIER",
      team: "League",
      stats: {
        Members: "2.8M",
        "Token Price": "$4.20",
        "24h Change": "+12.5%",
        "Market Cap": "$127M",
      },
      imageUrl: "",
      rarity: "legendary" as const,
    },
    {
      name: "Los Angeles Lakers",
      position: "NBA",
      team: "Basketball",
      stats: {
        Members: "3.2M",
        "Token Price": "$8.90",
        "24h Change": "+8.2%",
        "Market Cap": "$234M",
      },
      imageUrl: "",
      rarity: "legendary" as const,
    },
    {
      name: "FC Barcelona",
      position: "LA LIGA",
      team: "Football",
      stats: {
        Members: "2.1M",
        "Token Price": "$3.75",
        "24h Change": "-2.1%",
        "Market Cap": "$89M",
      },
      imageUrl: "",
      rarity: "epic" as const,
    },
    {
      name: "Golden State Warriors",
      position: "NBA",
      team: "Basketball",
      stats: {
        Members: "1.9M",
        "Token Price": "$6.45",
        "24h Change": "+15.3%",
        "Market Cap": "$156M",
      },
      imageUrl: "",
      rarity: "epic" as const,
    },
    {
      name: "Real Madrid",
      position: "LA LIGA",
      team: "Football",
      stats: {
        Members: "3.5M",
        "Token Price": "$5.20",
        "24h Change": "+5.7%",
        "Market Cap": "$198M",
      },
      imageUrl: "",
      rarity: "legendary" as const,
    },
    {
      name: "Boston Celtics",
      position: "NBA",
      team: "Basketball",
      stats: {
        Members: "1.4M",
        "Token Price": "$4.80",
        "24h Change": "+7.9%",
        "Market Cap": "$98M",
      },
      imageUrl: "",
      rarity: "epic" as const,
    },
  ];

  // Market stats
  const marketStats = [
    {
      label: "Total Market Cap",
      value: "$2.4B",
      change: "+12.5%",
      positive: true,
    },
    { label: "Active Communities", value: "247", change: "+8", positive: true },
    {
      label: "Total Volume (24h)",
      value: "$45.2M",
      change: "-3.2%",
      positive: false,
    },
    {
      label: "Active Traders",
      value: "127K",
      change: "+15.7%",
      positive: true,
    },
  ];

  // Trending challenges
  const trendingChallenges = [
    {
      title: "Champions League Predictor",
      reward: "50,000 tokens",
      participants: "45.2K",
      timeLeft: "2 days",
    },
    {
      title: "NBA Finals Fantasy",
      reward: "Limited NFT",
      participants: "28.7K",
      timeLeft: "5 days",
    },
    {
      title: "Premier League Weekly",
      reward: "25,000 tokens",
      participants: "67.1K",
      timeLeft: "4 days",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Image - same as landing page */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url(/memphis-mini-dark.webp)`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />

      {/* Header Navigation */}
      <nav className="relative z-50 border-b border-gray-800/50 bg-black/30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <div className="flex items-center space-x-3">
                <Zap className="w-8 h-8 text-blue-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  FanConnect
                </span>
              </div>
              <div className="hidden lg:flex items-center space-x-8">
                <a
                  href="#"
                  className="text-white font-light tracking-wide hover:text-blue-400 transition-colors"
                >
                  Explore
                </a>
                <a
                  href="#"
                  className="text-gray-400 font-light tracking-wide hover:text-white transition-colors"
                >
                  Portfolio
                </a>
                <a
                  href="#"
                  className="text-gray-400 font-light tracking-wide hover:text-white transition-colors"
                >
                  Challenges
                </a>
                <a
                  href="#"
                  className="text-gray-400 font-light tracking-wide hover:text-white transition-colors"
                >
                  Rewards
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clubs, athletes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-blue-500/50 w-80 font-light tracking-wide"
                />
              </div>
              <button className="relative p-3 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-6 text-blue-400 tracking-widest text-sm font-light italic">
            ⚡ DISCOVER & ENGAGE ⚡
          </div>
          <h1 className="text-6xl md:text-8xl font-extralight tracking-wider leading-tight mb-8">
            <span className="opacity-90 font-thin bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              EXPLORE
            </span>
            <br />
            <span className="opacity-90 font-thin bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              COMMUNITIES
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light max-w-4xl mx-auto leading-relaxed">
            Discover thriving fan communities, join exclusive clubs, and unlock
            rewards through active participation in the sports you love.
          </p>
        </div>

        {/* Market Overview */}
        <div className="mb-20">
          <div className="grid md:grid-cols-4 gap-6">
            {marketStats.map((stat, index) => (
              <div
                key={index}
                className="bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-8 hover:border-gray-500/50 transition-all duration-300"
              >
                <div className="text-3xl font-extralight text-white mb-2 tracking-wide">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-light tracking-widest uppercase mb-3">
                  {stat.label}
                </div>
                <div
                  className={`text-sm font-light ${
                    stat.positive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center space-x-6">
            <h2 className="text-3xl font-extralight tracking-wide text-white">
              Featured Communities
            </h2>
            <div className="text-sm text-gray-400 font-light">
              {featuredClubs.length} communities available
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-4 py-2 text-gray-300 hover:text-white hover:border-gray-600/50 transition-all font-light"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showFilters && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-xl p-4 shadow-2xl">
                  <div className="space-y-2">
                    {[
                      "All",
                      "Football",
                      "Basketball",
                      "Baseball",
                      "Hockey",
                    ].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setSelectedFilter(filter.toLowerCase());
                          setShowFilters(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg font-light transition-all ${
                          selectedFilter === filter.toLowerCase()
                            ? "bg-blue-500/20 text-blue-300"
                            : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-1">
              <button className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-md font-light">
                Grid
              </button>
              <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors font-light">
                List
              </button>
            </div>
          </div>
        </div>

        {/* Featured Clubs Grid */}
        <div className="grid md:grid-cols-3 gap-8 justify-items-center mb-20">
          {featuredClubs.map((club, index) => (
            <div key={index} className="group">
              <SportsCard
                player={club}
                showTrophy={index === 0 || index === 1 || index === 4}
              />
              <div className="mt-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-2 rounded-lg font-light tracking-wide hover:bg-white/20 transition-all text-white">
                  Join Community
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trending Challenges Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="mb-3 text-purple-400 tracking-widest text-sm font-light italic">
              ✧ TRENDING CHALLENGES ✧
            </div>
            <h2 className="text-5xl font-extralight tracking-wider leading-tight mb-6 text-white">
              <span className="opacity-50 font-thin">ACTIVE COMPETITIONS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trendingChallenges.map((challenge, index) => (
              <div
                key={index}
                className="bg-black/40 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-8 hover:border-purple-500/50 transition-all duration-500 group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <Trophy className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-xs text-gray-400 font-light tracking-widest uppercase">
                    Challenge
                  </span>
                </div>
                <h3 className="text-xl font-light tracking-wide text-white mb-4">
                  {challenge.title}
                </h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm font-light">
                      Reward
                    </span>
                    <span className="text-purple-400 font-medium">
                      {challenge.reward}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm font-light">
                      Participants
                    </span>
                    <span className="text-white">{challenge.participants}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm font-light">
                      Time Left
                    </span>
                    <span className="text-orange-400">
                      {challenge.timeLeft}
                    </span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 py-3 rounded-lg font-light tracking-wide hover:from-purple-500/30 hover:to-pink-500/30 transition-all text-purple-300 hover:text-purple-200">
                  Join Challenge
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-3 text-gray-500 tracking-widest text-sm font-light italic">
            ✧ START YOUR JOURNEY ✧
          </div>
          <h2 className="text-5xl md:text-7xl font-extralight tracking-wider leading-tight mb-6">
            <span className="opacity-50 font-thin">READY TO</span>
            <br />
            <span className="opacity-50 font-thin">ENGAGE</span>
          </h2>
          <p className="text-lg text-gray-400 mb-12 font-light tracking-wide max-w-2xl mx-auto">
            Join millions of fans already earning rewards and connecting with
            their favorite teams.
          </p>
          <button className="group bg-gradient-to-r from-blue-500 to-purple-500 px-12 py-5 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-3 text-white shadow-2xl mx-auto text-lg">
            <span>Connect Wallet</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FanTokenExplorePage;

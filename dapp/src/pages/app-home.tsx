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
} from "lucide-react";

interface Team {
  id: string;
  name: string;
  logo: string;
  description: string;
  members: number;
  founded: string;
  location: string;
  category: string;
  isActive: boolean;
  isJoined?: boolean;
  hasAccess?: boolean;
  achievements: number;
  rating: number;
  primaryColor: string;
  secondaryColor: string;
  gifUrl: string;
  staticImageUrl: string;
}

interface User {
  name: string;
  avatar: string;
  points: number;
  level: number;
  rank: string;
  completedChallenges: number;
}

// Enhanced Team Card matching your landing page style
const TeamCard: React.FC<{
  team: Team;
  onJoin: (id: string) => void;
}> = ({ team, onJoin }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showGif, setShowGif] = useState(false);
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
    setTimeout(() => setShowGif(true), 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowGif(false);
  };

  const getRarityGradient = (rating: number) => {
    if (rating === 5) return "from-yellow-400 to-orange-500";
    if (rating >= 4) return "from-purple-500 to-pink-500";
    return "from-blue-500 to-cyan-500";
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-sm cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        className={`
          relative w-full h-96 transform-gpu transition-all duration-500 ease-out
          ${isHovered ? "scale-105" : "scale-100"}
        `}
        style={{
          transform: isHovered
            ? `perspective(800px) rotateX(${Math.max(
                -15,
                Math.min(15, (mousePosition.y - 192) * 0.03)
              )}deg) rotateY(${Math.max(
                -15,
                Math.min(15, (mousePosition.x - 192) * 0.03)
              )}deg) scale3d(1.02, 1.02, 1.02)`
            : "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        }}
      >
        {/* Main Card */}
        <div
          className={`
            relative w-full h-full rounded-2xl overflow-hidden
            border border-gray-600/50
            shadow-2xl ${isHovered ? "shadow-3xl border-gray-500/70" : ""}
            transition-all duration-500 bg-black/40 backdrop-blur-sm 
          `}
        >
          {/* Rarity border effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getRarityGradient(
              team.rating
            )} rounded-2xl`}
            // className={`absolute inset-0 bg-gradient-to-br ${getRarityGradient(
            //     team.rating
            //   )} opacity-20 rounded-2xl`}
          ></div>

          {/* Background Image/GIF */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            {(!isHovered || !showGif) && (
              <div
                className="absolute inset-0 w-full h-full bg-black"
                // className="absolute inset-0 w-full h-full bg-cover bg-center opacity-30"
                // style={{ backgroundImage: `url(/bg-2.jpg)` }}
              />
            )}
            {isHovered && showGif && (
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 opacity-40"
                style={{ backgroundImage: `url(${team.gifUrl})` }}
              />
            )}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          {/* Shine effect */}
          <div
            className={`
              absolute inset-0 opacity-0 transition-opacity duration-300
              ${isHovered ? "opacity-10" : ""}
            `}
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 30%, transparent 70%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            {/* Header with logo and rating */}
            <div className="flex items-center justify-between mb-6">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg backdrop-blur-sm"
                style={{
                  background: `linear-gradient(135deg, ${team.primaryColor}40, ${team.secondaryColor}40)`,
                  border: `1px solid ${team.primaryColor}60`,
                }}
              >
                {team.logo}
              </div>
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < team.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="mb-2 text-gray-400 tracking-widest text-xs font-light italic uppercase">
              {team.category}
            </div>

            {/* Team Name */}
            <h2 className="text-2xl md:text-3xl font-extralight tracking-wider leading-tight mb-4 text-white">
              <span className="opacity-90 font-thin">{team.name}</span>
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-sm font-light tracking-wide leading-relaxed mb-6 flex-grow line-clamp-3">
              {team.description}
            </p>

            {/* Action Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onJoin(team.id);
              }}
              className={`
                group w-full py-3 px-6 rounded-xl font-light tracking-wide transition-all duration-300 
                flex items-center justify-center space-x-2 text-white backdrop-blur-sm
                ${
                  team.isJoined
                    ? "bg-gray-600/40 border border-gray-500/50 hover:bg-gray-600/60"
                    : team.hasAccess
                    ? "bg-white/15 border border-white/30 hover:bg-white/25"
                    : "bg-red-500/20 border border-red-400/40 hover:bg-red-500/30 text-red-300"
                }
              `}
            >
              {!team.hasAccess && !team.isJoined && <Lock size={16} />}
              <span>
                {team.isJoined
                  ? "View Team"
                  : !team.hasAccess
                  ? "Buy Fan Tokens"
                  : "Join Team"}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`max-w-[95vw] mx-auto mb-20 ${className}`}>
      {/* Wide Card Container - with overflow visible */}
      <div
        className="relative w-full h-[600px] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ overflow: "visible" }} // Allow overflow
      >
        <div
          className={`
                relative w-full h-full transform-gpu transition-all duration-500 ease-out
                ${isHovered ? "scale-105" : "scale-100"}
              `}
          style={{ overflow: "visible" }} // Allow overflow on transform container too
        >
          {/* Background Image - extending above the card on left side */}
          <div
            className="absolute -top-12 -left-32 w-3/4 bg-cover bg-center bg-no-repeat z-10 scale-100"
            style={{
              backgroundImage: `url(/person4.png)`,
              height: "calc(100% + 48px)", // Extend 48px above (3rem = 12 * 4px)
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-30"></div>

          {/* Main Card */}
          <div
            className={`
                  relative w-full h-full rounded-2xl overflow-hidden flex
                  border border-gray-600/50
                  shadow-2xl ${isHovered ? "shadow-3xl border-gray-500/70" : ""}
                  transition-all duration-500 bg-black/40 backdrop-blur-sm
                `}
          >
            {/* Left side - space for image */}
            <div className="w-1/2 relative">
              {/* Subtle overlay for left side */}
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Right side - Text Content inside card */}
            <div className="w-1/2 flex items-center justify-center p-12 pl-32">
              <div className="max-w-lg">
                <div className="mb-6 text-blue-400 tracking-widest text-sm font-light italic">
                  ⚡ YOUR SPORTS JOURNEY ⚡
                </div>

                <h1 className="text-4xl md:text-5xl font-extralight tracking-wider leading-tight mb-8">
                  <span className="opacity-90 font-thin bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    DISCOVER
                  </span>
                  <br />
                  <span className="opacity-90 font-thin bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    YOUR TEAMS
                  </span>
                </h1>

                {/* <p className="text-lg md:text-xl text-gray-300 mb-12 font-light leading-relaxed">
                  Join elite sports communities, compete in challenges, and earn
                  exclusive rewards while connecting with athletes who share
                  your passion.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ElegantSportsHome: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const currentUser: User = {
    name: "Alex Johnson",
    avatar: "👨‍💻",
    points: 12750,
    level: 8,
    rank: "Pro Athlete",
    completedChallenges: 23,
  };

  const sampleTeams: Team[] = [
    {
      id: "fc-thunder",
      name: "FC Thunder",
      logo: "⚽",
      description:
        "Elite football club focused on developing world-class players through innovative training methods and cutting-edge technology.",
      members: 1247,
      founded: "2015",
      location: "London, UK",
      category: "Football",
      isActive: true,
      isJoined: true,
      hasAccess: true,
      achievements: 15,
      rating: 5,
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
      gifUrl: "https://media.giphy.com/media/l2SpMUEMRJkkqYcta/giphy.gif",
      staticImageUrl:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGVxc3dvdGh4OGg4dG1xYzVjemoyMnhwd2ZqNzNtYWNuY2o5eWl1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2SpMUEMRJkkqYcta/giphy_s.gif",
    },
    {
      id: "lightning-athletics",
      name: "Lightning Athletics",
      logo: "🏃",
      description:
        "Premier track and field club specializing in sprint events and endurance training for athletes of all levels.",
      members: 892,
      founded: "2018",
      location: "California, USA",
      category: "Track & Field",
      isActive: true,
      isJoined: false,
      hasAccess: false,
      achievements: 12,
      rating: 4,
      primaryColor: "#F59E0B",
      secondaryColor: "#D97706",
      gifUrl: "https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif",
      staticImageUrl:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdG1xYzVjemoyMnhwd2ZqNzNtYWNuY2o5eWl1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMt1VVNkHV2PaE/giphy_s.gif",
    },
    {
      id: "storm-ballers",
      name: "Storm Ballers",
      logo: "🏀",
      description:
        "Dynamic basketball team known for fast-paced gameplay and exceptional teamwork on and off the court.",
      members: 456,
      founded: "2017",
      location: "New York, USA",
      category: "Basketball",
      isActive: true,
      isJoined: false,
      hasAccess: true,
      achievements: 8,
      rating: 4,
      primaryColor: "#EF4444",
      secondaryColor: "#DC2626",
      gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      staticImageUrl:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGVxc3dvdGh4OGg4dG1xYzVjemoyMnhwd2ZqNzNtYWNuY2o5eWl1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy_s.gif",
    },
    {
      id: "velocity-riders",
      name: "Velocity Riders",
      logo: "🚴",
      description:
        "Cycling club dedicated to road racing, mountain biking, and promoting sustainable transportation.",
      members: 634,
      founded: "2016",
      location: "Amsterdam, Netherlands",
      category: "Cycling",
      isActive: true,
      isJoined: true,
      hasAccess: true,
      achievements: 10,
      rating: 4,
      primaryColor: "#10B981",
      secondaryColor: "#059669",
      gifUrl: "https://media.giphy.com/media/l0HlPtbGpcnqa0fja/giphy.gif",
      staticImageUrl:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGVxc3dvdGh4OGg4dG1xYzVjemoyMnhwd2ZqNzNtYWNuY2o5eWl1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlPtbGpcnqa0fja/giphy_s.gif",
    },
    {
      id: "ace-academy",
      name: "Ace Academy",
      logo: "🎾",
      description:
        "Tennis academy providing professional coaching and competitive opportunities for players at every skill level.",
      members: 287,
      founded: "2019",
      location: "Melbourne, Australia",
      category: "Tennis",
      isActive: true,
      isJoined: false,
      hasAccess: false,
      achievements: 6,
      rating: 5,
      primaryColor: "#8B5CF6",
      secondaryColor: "#7C3AED",
      gifUrl: "https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif",
      staticImageUrl:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGVxc3dvdGh4OGg4dG1xYzVjemoyMnhwd2ZqNzNtYWNuY2o5eWl1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlHFRbmaZtBRhXG/giphy_s.gif",
    },
    {
      id: "aqua-sharks",
      name: "Aqua Sharks",
      logo: "🏊",
      description:
        "Swimming club with state-of-the-art facilities and expert coaching for competitive and recreational swimmers.",
      members: 445,
      founded: "2014",
      location: "Sydney, Australia",
      category: "Swimming",
      isActive: true,
      isJoined: false,
      hasAccess: true,
      achievements: 18,
      rating: 5,
      primaryColor: "#06B6D4",
      secondaryColor: "#0891B2",
      gifUrl: "https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif",
      staticImageUrl:
        "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGVxc3dvdGh4OGc4dG1xYzVjemoyMnhwd2ZqNzNtYWNuY2o5eWl1ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0HlBO7eyXzSZkJri/giphy_s.gif",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "FC Thunder invited you to join their training session!",
      type: "success",
      time: "2m ago",
    },
    {
      id: 2,
      message: "New team 'Phoenix Runners' is looking for members",
      type: "info",
      time: "1h ago",
    },
    {
      id: 3,
      message: "You've earned team leadership badge!",
      type: "reward",
      time: "3h ago",
    },
  ];

  const handleJoinTeam = (teamId: string) => {
    console.log(`Joining team ${teamId}`);
  };

  const filteredTeams = sampleTeams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" || (activeTab === "joined" && team.isJoined);
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen relative">
      {/* Fixed Background Layer - Behind everything */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(/memphis-mini-dark.webp)`,
          //   backgroundImage: `url(/hills.png)`,
          backgroundSize: "auto",
          backgroundRepeat: "repeat",
          backgroundPosition: "0 0",
        }}
      />

      {/* Dark overlay to make content readable */}
      <div className="fixed inset-0 z-1 bg-black/20" />

      {/* All content above background */}
      <div className="relative z-10 min-h-screen text-white">
        {/* Header Navigation */}
        <nav className="border-b border-gray-800/50 bg-black/30 backdrop-blur-xl">
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
                    Teams
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
                    Leaderboard
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
                    placeholder="Search teams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-12 pr-6 py-3 text-sm focus:outline-none focus:border-blue-500/50 w-80 font-light tracking-wide"
                  />
                </div>

                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium">A</span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-white text-sm font-light tracking-wide">
                        {currentUser.name}
                      </p>
                      <p className="text-gray-400 text-xs font-light">
                        {currentUser.points.toLocaleString()} points
                      </p>
                    </div>
                    <ChevronDown size={16} className="text-gray-400" />
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-50">
                      <div className="p-6 border-b border-gray-700/50">
                        <p className="text-white font-light tracking-wide">
                          {currentUser.name}
                        </p>
                        <p className="text-gray-400 text-sm font-light">
                          Level {currentUser.level} • {currentUser.rank}
                        </p>
                      </div>
                      <div className="p-3">
                        <button className="w-full text-left p-3 text-gray-300 hover:bg-gray-800/50 rounded-xl flex items-center space-x-3 font-light tracking-wide transition-colors">
                          <User size={16} />
                          <span>Profile</span>
                        </button>
                        <button className="w-full text-left p-3 text-gray-300 hover:bg-gray-800/50 rounded-xl flex items-center space-x-3 font-light tracking-wide transition-colors">
                          <Settings size={16} />
                          <span>Settings</span>
                        </button>
                        <button className="w-full text-left p-3 text-gray-300 hover:bg-gray-800/50 rounded-xl flex items-center space-x-3 font-light tracking-wide transition-colors">
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Hero Section */}
          <HeroSection />

          {/* User Stats Dashboard */}
          {/* <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              {
                label: "Total Points",
                value: currentUser.points.toLocaleString(),
                icon: Coins,
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Current Level",
                value: currentUser.level.toString(),
                icon: Star,
                color: "from-purple-500 to-pink-500",
              },
              {
                label: "Teams Joined",
                value: sampleTeams.filter((t) => t.isJoined).length.toString(),
                icon: Shield,
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "Achievements",
                value: currentUser.completedChallenges.toString(),
                icon: Trophy,
                color: "from-orange-500 to-red-500",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-600/30 p-8 hover:border-gray-500/50 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} p-3 mb-4`}
                  >
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  <div className="text-3xl font-extralight text-white mb-2 tracking-wide">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 font-light tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div> */}

          {/* Filters and Controls */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-6">
              <h2 className="text-3xl font-extralight tracking-wide text-white">
                Available Teams
              </h2>
              <div className="text-sm text-gray-400 font-light">
                {filteredTeams.length} teams found
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-1">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-6 py-2 rounded-lg font-light tracking-wide transition-all ${
                    activeTab === "all"
                      ? "bg-blue-500/20 text-blue-300"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  All Teams
                </button>
                <button
                  onClick={() => setActiveTab("joined")}
                  className={`px-6 py-2 rounded-lg font-light tracking-wide transition-all ${
                    activeTab === "joined"
                      ? "bg-blue-500/20 text-blue-300"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  My Teams
                </button>
              </div>

              <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Team</span>
              </button>
            </div>
          </div>

          {/* Teams Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-20">
            {filteredTeams.map((team, index) => (
              <div
                key={team.id}
                className="opacity-0 animate-fade-in-up"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "forwards",
                }}
              >
                <TeamCard team={team} onJoin={handleJoinTeam} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredTeams.length === 0 && (
            <div className="text-center py-20">
              <Shield size={64} className="mx-auto text-gray-600 mb-6" />
              <h3 className="text-3xl font-extralight tracking-wide text-gray-400 mb-4">
                No Teams Found
              </h3>
              <p className="text-gray-500 font-light tracking-wide">
                Try adjusting your search or explore different categories
              </p>
            </div>
          )}

          {/* Call to Action */}
          {/* <div className="text-center">
            <div className="mb-3 text-gray-500 tracking-widest text-sm font-light italic">
              ✧ START YOUR JOURNEY ✧
            </div>
            <h2 className="text-5xl md:text-7xl font-extralight tracking-wider leading-tight mb-6">
              <span className="opacity-50 font-thin">READY TO</span>
              <br />
              <span className="opacity-50 font-thin">COMPETE</span>
            </h2>
            <p className="text-lg text-gray-400 mb-12 font-light tracking-wide max-w-2xl mx-auto">
              Join thousands of athletes already competing, earning rewards, and
              building their sports legacy.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center space-x-3 text-white shadow-2xl">
                <span>Explore Teams</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="group border border-gray-500 px-10 py-4 rounded-xl font-light tracking-wide hover:border-gray-400 hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-3 text-gray-300 hover:text-white">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div> */}
        </div>

        {/* Notifications Popup */}
        {showNotifications && (
          <div className="fixed top-20 right-6 w-96 bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-50">
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-white font-light tracking-wide text-lg">
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
              <button className="text-blue-400 hover:text-blue-300 text-sm font-light tracking-wide transition-colors">
                View All Notifications
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
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

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ElegantSportsHome;

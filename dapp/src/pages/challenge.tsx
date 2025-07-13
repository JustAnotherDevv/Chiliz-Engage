import React, { useState, useRef, useEffect } from "react";
import {
  Trophy,
  Users,
  Star,
  Zap,
  Target,
  Gift,
  ArrowRight,
  Play,
  Bell,
  User,
  Settings,
  LogOut,
  Search,
  Filter,
  Clock,
  TrendingUp,
  Award,
  Coins,
  Menu,
  X,
  Home,
  Calendar,
  ChevronDown,
  Plus,
  Share2,
  Heart,
  MessageCircle,
  ArrowLeft,
  Upload,
  Camera,
  Check,
  AlertCircle,
  Medal,
  Flag,
  MapPin,
  ThumbsUp,
  ThumbsDown,
  Send,
  MoreHorizontal,
  Download,
  Activity,
  Smartphone,
  Video,
  Image,
  CheckCircle,
  XCircle,
} from "lucide-react";

interface Challenge {
  id: string;
  title: string;
  club: string;
  clubLogo: string;
  description: string;
  longDescription: string;
  points: number;
  participants: number;
  timeLeft: string;
  difficulty: "easy" | "medium" | "hard";
  category: string;
  isActive: boolean;
  progress?: number;
  isJoined?: boolean;
  requirements: string[];
  rewards: string[];
  instructions: string[];
  endDate: string;
  startDate: string;
}

interface Submission {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  type: "photo" | "video" | "data";
  content: string;
  description: string;
  timestamp: string;
  likes: number;
  comments: number;
  isVerified: boolean;
  status: "pending" | "approved" | "rejected";
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface Participant {
  id: string;
  name: string;
  avatar: string;
  progress: number;
  rank: number;
  points: number;
  completedTasks: number;
}

const ChallengePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    "photo" | "video" | "data"
  >("photo");
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [newComment, setNewComment] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentUser = {
    name: "Alex Johnson",
    avatar: "👨‍💻",
    points: 12750,
    level: 8,
    rank: "Pro Athlete",
    completedChallenges: 23,
  };

  const challenge: Challenge = {
    id: "1",
    title: "Score 10 Goals in Training",
    club: "FC Thunder",
    clubLogo: "⚽",
    description:
      "Complete our intensive shooting drill by scoring 10 goals in 5 minutes using our AR training system.",
    longDescription:
      "This challenge is designed to improve your shooting accuracy and speed under pressure. Using our advanced AR technology, you'll face virtual goalkeepers and defenders while attempting to score 10 goals within a 5-minute time limit. The challenge tracks your shooting accuracy, power, and placement to provide detailed feedback on your performance.",
    points: 500,
    participants: 1247,
    timeLeft: "2d 14h",
    difficulty: "medium",
    category: "Training",
    isActive: true,
    isJoined: true,
    progress: 65,
    requirements: [
      "Smartphone with SportsDApp installed",
      "Access to a football/soccer goal",
      "Minimum 10 footballs",
      "Clear lighting for video recording",
    ],
    rewards: [
      "500 SportsDApp Points",
      "FC Thunder Training Jersey (Digital)",
      "Shooting Accuracy Badge",
      "Access to Advanced Training Challenges",
    ],
    instructions: [
      "Set up your smartphone to record the goal area",
      "Launch the AR shooting trainer in the app",
      "Position yourself at the penalty spot (11 meters from goal)",
      "Complete 10 successful shots within 5 minutes",
      "Submit your video recording for verification",
    ],
    startDate: "2025-07-10",
    endDate: "2025-07-15",
  };

  const submissions: Submission[] = [
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Martinez",
      userAvatar: "👩‍🦰",
      type: "video",
      content: "https://example.com/video1.mp4",
      description:
        "Just completed the challenge! 10 goals in 4:32. The AR goalkeeper was tough!",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      isVerified: true,
      status: "approved",
    },
    {
      id: "2",
      userId: "user2",
      userName: "Mike Chen",
      userAvatar: "👨‍💼",
      type: "photo",
      content: "https://example.com/photo1.jpg",
      description: "My setup for the challenge. Ready to score some goals! 🥅",
      timestamp: "4 hours ago",
      likes: 12,
      comments: 3,
      isVerified: false,
      status: "pending",
    },
    {
      id: "3",
      userId: "user3",
      userName: "Emma Wilson",
      userAvatar: "👩‍🎓",
      type: "video",
      content: "https://example.com/video2.mp4",
      description:
        "Third attempt and finally got all 10! The accuracy tracking really helped improve my technique.",
      timestamp: "6 hours ago",
      likes: 31,
      comments: 12,
      isVerified: true,
      status: "approved",
    },
  ];

  const participants: Participant[] = [
    {
      id: "1",
      name: "Emma Wilson",
      avatar: "👩‍🎓",
      progress: 100,
      rank: 1,
      points: 500,
      completedTasks: 5,
    },
    {
      id: "2",
      name: "Sarah Martinez",
      avatar: "👩‍🦰",
      progress: 100,
      rank: 2,
      points: 500,
      completedTasks: 5,
    },
    {
      id: "3",
      name: "Alex Johnson",
      avatar: "👨‍💻",
      progress: 65,
      rank: 3,
      points: 325,
      completedTasks: 3,
    },
    {
      id: "4",
      name: "Mike Chen",
      avatar: "👨‍💼",
      progress: 40,
      rank: 4,
      points: 200,
      completedTasks: 2,
    },
    {
      id: "5",
      name: "Lisa Park",
      avatar: "👩‍💻",
      progress: 20,
      rank: 5,
      points: 100,
      completedTasks: 1,
    },
  ];

  const comments: Comment[] = [
    {
      id: "1",
      userId: "user4",
      userName: "David Kim",
      userAvatar: "👨‍🎨",
      content:
        "Great technique! How did you manage to get such consistent accuracy?",
      timestamp: "1 hour ago",
      likes: 5,
    },
    {
      id: "2",
      userId: "user5",
      userName: "Anna Rodriguez",
      userAvatar: "👩‍🔬",
      content:
        "The AR system really does make a difference. Much better than traditional training!",
      timestamp: "3 hours ago",
      likes: 8,
    },
  ];

  const handleSubmitEvidence = () => {
    // In a real app, this would upload the evidence and make an API call
    console.log("Submitting evidence:", {
      type: submissionType,
      description: submissionDescription,
    });
    setShowSubmissionModal(false);
    setSubmissionDescription("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "hard":
        return "text-red-400 bg-red-500/10 border-red-500/20";
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/20";
      default:
        return "text-green-400 bg-green-500/10 border-green-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 w-screen">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
              </button>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                SportsDApp
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-sm">
                    {currentUser.avatar}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-white text-sm font-medium">
                      {currentUser.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {currentUser.points.toLocaleString()} points
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Challenge Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-8 mb-8 border border-gray-700">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl">
                  {challenge.clubLogo}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {challenge.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>by {challenge.club}</span>
                    <span
                      className={`px-2 py-1 rounded-full border ${getDifficultyColor(
                        challenge.difficulty
                      )}`}
                    >
                      {challenge.difficulty.toUpperCase()}
                    </span>
                    <span>{challenge.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 text-lg mb-6">
                {challenge.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {challenge.points}
                  </div>
                  <div className="text-sm text-gray-400">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {challenge.participants.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    {challenge.timeLeft}
                  </div>
                  <div className="text-sm text-gray-400">Time Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {challenge.progress}%
                  </div>
                  <div className="text-sm text-gray-400">Progress</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 w-full lg:w-auto">
              <button
                onClick={() => setShowSubmissionModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <Upload size={18} />
                <span>Submit Evidence</span>
              </button>
              <button className="px-6 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center space-x-2">
                <Share2 size={18} />
                <span>Share Challenge</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {challenge.isJoined && (
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Your Progress</span>
                <span>{challenge.progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${challenge.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-800/50 backdrop-blur-sm rounded-lg p-1 mb-8 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: Target },
            { id: "leaderboard", label: "Leaderboard", icon: Trophy },
            { id: "submissions", label: "Submissions", icon: Image },
            { id: "discussion", label: "Discussion", icon: MessageCircle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  About This Challenge
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {challenge.longDescription}
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  How to Complete
                </h3>
                <ol className="space-y-3">
                  {challenge.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="space-y-6">
              {/* Requirements */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {challenge.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-gray-300 text-sm">
                        {requirement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rewards */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Rewards
                </h3>
                <ul className="space-y-2">
                  {challenge.rewards.map((reward, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Gift size={16} className="text-yellow-400" />
                      <span className="text-gray-300 text-sm">{reward}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Challenge Stats */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Challenge Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Start Date</span>
                    <span className="text-white">{challenge.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">End Date</span>
                    <span className="text-white">{challenge.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-green-400">73%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Avg Completion Time</span>
                    <span className="text-white">4m 32s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">
                Challenge Leaderboard
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                Top performers in this challenge
              </p>
            </div>
            <div className="divide-y divide-gray-700">
              {participants.map((participant, index) => (
                <div
                  key={participant.id}
                  className="p-4 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-black"
                            : index === 1
                            ? "bg-gray-400 text-black"
                            : index === 2
                            ? "bg-orange-600 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {participant.rank}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        {participant.avatar}
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {participant.name}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {participant.completedTasks}/5 tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {participant.points} pts
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${participant.progress}%` }}
                          />
                        </div>
                        <span className="text-gray-400 text-sm">
                          {participant.progress}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "submissions" && (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      {submission.userAvatar}
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {submission.userName}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {submission.timestamp}
                      </p>
                    </div>
                    {submission.isVerified && (
                      <CheckCircle size={16} className="text-green-400" />
                    )}
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      submission.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : submission.status === "rejected"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {submission.status}
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{submission.description}</p>

                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center h-32 text-gray-400">
                    {submission.type === "video" ? (
                      <div className="text-center">
                        <Video size={32} className="mx-auto mb-2" />
                        <p className="text-sm">Video Submission</p>
                      </div>
                    ) : submission.type === "photo" ? (
                      <div className="text-center">
                        <Image size={32} className="mx-auto mb-2" />
                        <p className="text-sm">Photo Submission</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Activity size={32} className="mx-auto mb-2" />
                        <p className="text-sm">Data Submission</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                      <ThumbsUp size={16} />
                      <span>{submission.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                      <MessageCircle size={16} />
                      <span>{submission.comments}</span>
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "discussion" && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Discussion
              </h3>
              <div className="flex space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  {currentUser.avatar}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts or ask for help..."
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
                      <Send size={16} />
                      <span>Post</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    {comment.userAvatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <p className="text-white font-medium">
                        {comment.userName}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {comment.timestamp}
                      </p>
                    </div>
                    <p className="text-gray-300 mb-3">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 text-gray-400 hover:text-white">
                        <ThumbsUp size={14} />
                        <span className="text-sm">{comment.likes}</span>
                      </button>
                      <button className="text-gray-400 hover:text-white text-sm">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">
                Submit Evidence
              </h3>
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Submission Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { type: "photo" as const, icon: Camera, label: "Photo" },
                    { type: "video" as const, icon: Video, label: "Video" },
                    {
                      type: "data" as const,
                      icon: Smartphone,
                      label: "App Data",
                    },
                  ].map((option) => (
                    <button
                      key={option.type}
                      onClick={() => setSubmissionType(option.type)}
                      className={`p-3 rounded-lg border transition-all ${
                        submissionType === option.type
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-600 hover:border-gray-500"
                      }`}
                    >
                      <option.icon
                        size={20}
                        className="mx-auto mb-1 text-gray-300"
                      />
                      <p className="text-sm text-gray-300">{option.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-gray-500 transition-colors cursor-pointer">
                  <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-300 mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-gray-500 text-sm">
                    {submissionType === "photo"
                      ? "PNG, JPG up to 10MB"
                      : submissionType === "video"
                      ? "MP4, MOV up to 100MB"
                      : "App will automatically capture data"}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={submissionDescription}
                  onChange={(e) => setSubmissionDescription(e.target.value)}
                  placeholder="Describe your submission and any challenges you faced..."
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <AlertCircle size={16} className="text-blue-400" />
                <p className="text-blue-300 text-sm">
                  Your submission will be reviewed by our AI system and
                  community moderators.
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowSubmissionModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitEvidence}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                >
                  Submit Evidence
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePage;

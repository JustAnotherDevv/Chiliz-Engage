import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Trophy, 
  Users, 
  Clock, 
  Target, 
  Calendar,
  Award,
  Share2,
  Heart,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';

export function ChallengeDetail() {
  const { id } = useParams();

  const challenge = {
    id: 1,
    title: "30-Day Running Challenge",
    description: "Transform your running endurance with this comprehensive 30-day challenge. Run 5km daily and track your progress as you build consistency and improve your cardiovascular fitness.",
    category: "Running",
    participants: 2847,
    reward: "500 CHILL",
    difficulty: "Medium",
    timeLeft: "5 days",
    duration: "30 days",
    creator: "Nike Running Club",
    creatorAvatar: "NC",
    image: "https://images.pexels.com/photos/2402813/pexels-photo-2402813.jpeg?auto=compress&cs=tinysrgb&w=800",
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-02-14",
    rules: [
      "Run at least 5km daily",
      "Upload proof of each run",
      "Track your time and distance",
      "Complete at least 25 out of 30 days"
    ],
    requirements: [
      "Basic running experience",
      "Smartphone with GPS",
      "Running shoes and appropriate gear"
    ],
    milestones: [
      { day: 7, reward: "50 CHILL", description: "First week completed" },
      { day: 14, reward: "100 CHILL", description: "Two weeks milestone" },
      { day: 21, reward: "150 CHILL", description: "Three weeks achievement" },
      { day: 30, reward: "200 CHILL", description: "Challenge completed" }
    ]
  };

  const topParticipants = [
    { name: "Sarah Johnson", progress: 95, avatar: "SJ", days: 28 },
    { name: "Mike Chen", progress: 87, avatar: "MC", days: 26 },
    { name: "Emma Davis", progress: 82, avatar: "ED", days: 24 },
    { name: "Alex Rodriguez", progress: 78, avatar: "AR", days: 23 },
    { name: "Lisa Wang", progress: 75, avatar: "LW", days: 22 }
  ];

  const recentActivity = [
    { user: "John Doe", action: "completed day 15", time: "2 hours ago" },
    { user: "Jane Smith", action: "joined the challenge", time: "4 hours ago" },
    { user: "Bob Wilson", action: "completed day 12", time: "6 hours ago" },
    { user: "Alice Brown", action: "reached 1 week milestone", time: "8 hours ago" }
  ];

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link to="/challenges">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Challenges
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="h-64 md:h-80 relative">
          <img
            src={challenge.image}
            alt={challenge.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-purple-600">{challenge.category}</Badge>
              <Badge className="bg-yellow-500/20 text-yellow-400">{challenge.difficulty}</Badge>
              <Badge className="bg-green-500/20 text-green-400">
                <Clock className="h-3 w-3 mr-1" />
                {challenge.timeLeft} left
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{challenge.title}</h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{challenge.participants.toLocaleString()} participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>{challenge.reward}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">About This Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 mb-6">{challenge.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Challenge Rules</h3>
                    <ul className="space-y-2">
                      {challenge.rules.map((rule, index) => (
                        <li key={index} className="flex items-start space-x-2 text-slate-300">
                          <Target className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {challenge.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-2 text-slate-300">
                          <Award className="h-4 w-4 mt-0.5 text-green-400 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Milestones & Rewards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenge.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {milestone.day}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{milestone.description}</div>
                          <div className="text-sm text-slate-400">Day {milestone.day}</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500/20 text-green-400">
                        {milestone.reward}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Participants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topParticipants.map((participant, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold text-purple-400">#{index + 1}</div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-purple-600 text-white">
                            {participant.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-white">{participant.name}</div>
                          <div className="text-sm text-slate-400">{participant.days} days completed</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-white">{participant.progress}%</div>
                        <Progress value={participant.progress} className="w-20 h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join Challenge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-400 mb-2">{challenge.reward}</div>
                  <div className="text-slate-400">Total Reward</div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mb-4">
                  Join Challenge
                </Button>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Challenge Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Challenge Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">Duration</span>
                    </div>
                    <span className="text-white">{challenge.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">Difficulty</span>
                    </div>
                    <Badge className="bg-yellow-500/20 text-yellow-400">{challenge.difficulty}</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">Participants</span>
                    </div>
                    <span className="text-white">{challenge.participants.toLocaleString()}</span>
                  </div>
                  
                  <Separator className="bg-slate-700" />
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-600 text-white text-sm">
                          {challenge.creatorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-white">{challenge.creator}</div>
                        <div className="text-sm text-slate-400">Challenge Creator</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="text-sm">
                      <div className="text-white font-medium">{activity.user}</div>
                      <div className="text-slate-400">{activity.action}</div>
                      <div className="text-slate-500 text-xs">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
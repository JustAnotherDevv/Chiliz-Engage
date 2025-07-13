import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Award, 
  TrendingUp, 
  Activity, 
  Edit, 
  Settings,
  Medal,
  Flame,
  Zap
} from 'lucide-react';

export function Profile() {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = {
    name: "Alex Johnson",
    username: "@alexfit",
    level: 12,
    totalPoints: 8547,
    completedChallenges: 23,
    activeStreaks: 15,
    totalEarned: "3,250 CHILL",
    joinDate: "January 2024",
    avatar: "AJ"
  };

  const recentChallenges = [
    {
      id: 1,
      title: "30-Day Running Challenge",
      status: "completed",
      progress: 100,
      reward: "500 CHILL",
      completedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Yoga Flexibility Master",
      status: "active",
      progress: 65,
      reward: "300 CHILL",
      daysLeft: 7
    },
    {
      id: 3,
      title: "Strength Training Beast",
      status: "active",
      progress: 40,
      reward: "750 CHILL",
      daysLeft: 12
    }
  ];

  const achievements = [
    { name: "First Challenge", description: "Complete your first challenge", earned: true, date: "Jan 5, 2024" },
    { name: "Streak Master", description: "Maintain a 7-day streak", earned: true, date: "Jan 12, 2024" },
    { name: "Community Hero", description: "Help 10 other members", earned: true, date: "Jan 18, 2024" },
    { name: "Challenge Creator", description: "Create your first challenge", earned: false, date: null },
    { name: "Marathon Runner", description: "Complete 5 running challenges", earned: false, date: null },
    { name: "Fitness Guru", description: "Reach level 20", earned: false, date: null }
  ];

  const activityData = [
    { date: "2024-01-20", activity: "Completed day 15 of Running Challenge", points: 50 },
    { date: "2024-01-19", activity: "Joined Yoga Flexibility Master", points: 0 },
    { date: "2024-01-18", activity: "Earned Community Hero achievement", points: 100 },
    { date: "2024-01-17", activity: "Completed day 14 of Running Challenge", points: 50 },
    { date: "2024-01-16", activity: "Reached 7-day streak milestone", points: 150 }
  ];

  const weeklyProgress = [
    { day: "Mon", workouts: 2, points: 150 },
    { day: "Tue", workouts: 1, points: 75 },
    { day: "Wed", workouts: 3, points: 225 },
    { day: "Thu", workouts: 2, points: 150 },
    { day: "Fri", workouts: 1, points: 75 },
    { day: "Sat", workouts: 4, points: 300 },
    { day: "Sun", workouts: 2, points: 150 }
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 border-0">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-white/20">
                <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                  {userStats.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{userStats.name}</h1>
                <p className="text-white/80 mb-4">{userStats.username}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Medal className="h-5 w-5 text-yellow-300" />
                    <span className="text-white">Level {userStats.level}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-yellow-300" />
                    <span className="text-white">{userStats.totalPoints} Points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="h-5 w-5 text-orange-300" />
                    <span className="text-white">{userStats.activeStreaks} Day Streak</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto md:mx-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userStats.completedChallenges}</div>
                    <div className="text-sm text-white/80">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userStats.totalEarned}</div>
                    <div className="text-sm text-white/80">Earned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{userStats.joinDate}</div>
                    <div className="text-sm text-white/80">Member Since</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="secondary" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Weekly Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Weekly Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {weeklyProgress.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 text-slate-400">{day.day}</div>
                          <div className="flex items-center space-x-1">
                            <Activity className="h-4 w-4 text-purple-400" />
                            <span className="text-white">{day.workouts}</span>
                          </div>
                        </div>
                        <div className="text-green-400 font-semibold">{day.points}pts</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Current Level Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Level Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">Level {userStats.level}</div>
                      <div className="text-slate-400">Next level in 1,453 points</div>
                    </div>
                    
                    <Progress value={65} className="h-3" />
                    
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>8,547 pts</span>
                      <span>10,000 pts</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Quick Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">This Week</span>
                      <span className="text-white font-semibold">15 workouts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">This Month</span>
                      <span className="text-white font-semibold">64 workouts</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Best Streak</span>
                      <span className="text-white font-semibold">23 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Favorite Sport</span>
                      <span className="text-white font-semibold">Running</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {recentChallenges.map((challenge, index) => (
              <Card key={challenge.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                    <Badge 
                      className={
                        challenge.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }
                    >
                      {challenge.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Progress</span>
                        <span className="text-white">{challenge.progress}%</span>
                      </div>
                      <Progress value={challenge.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Reward</span>
                      <span className="text-green-400 font-semibold">{challenge.reward}</span>
                    </div>
                    
                    {challenge.status === 'active' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Days Left</span>
                        <span className="text-white">{challenge.daysLeft}</span>
                      </div>
                    )}
                    
                    {challenge.status === 'completed' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Completed</span>
                        <span className="text-white">{challenge.completedDate}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {achievements.map((achievement, index) => (
              <Card 
                key={index} 
                className={`bg-slate-800/50 border-slate-700 ${
                  achievement.earned ? 'ring-2 ring-yellow-500/20' : 'opacity-60'
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      achievement.earned ? 'bg-yellow-500/20' : 'bg-slate-700/50'
                    }`}>
                      <Award className={`h-6 w-6 ${
                        achievement.earned ? 'text-yellow-400' : 'text-slate-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{achievement.name}</h3>
                      <p className="text-sm text-slate-400 mb-3">{achievement.description}</p>
                      {achievement.earned && (
                        <div className="text-xs text-green-400">
                          Earned on {achievement.date}
                        </div>
                      )}
                      {!achievement.earned && (
                        <div className="text-xs text-slate-500">
                          Not earned yet
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityData.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full" />
                        <div>
                          <div className="text-white font-medium">{activity.activity}</div>
                          <div className="text-sm text-slate-400">{activity.date}</div>
                        </div>
                      </div>
                      {activity.points > 0 && (
                        <Badge className="bg-green-500/20 text-green-400">
                          +{activity.points} pts
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
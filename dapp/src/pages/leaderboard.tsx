import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Medal, Crown, TrendingUp, Flame, Target } from 'lucide-react';

export function Leaderboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('all-time');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const globalLeaderboard = [
    { rank: 1, name: "Sarah Johnson", points: 15847, avatar: "SJ", streak: 45, challenges: 67, badge: "Legend" },
    { rank: 2, name: "Mike Chen", points: 14523, avatar: "MC", streak: 38, challenges: 52, badge: "Master" },
    { rank: 3, name: "Emma Davis", points: 13901, avatar: "ED", streak: 42, challenges: 48, badge: "Master" },
    { rank: 4, name: "Alex Rodriguez", points: 12756, avatar: "AR", streak: 28, challenges: 44, badge: "Expert" },
    { rank: 5, name: "Lisa Wang", points: 11892, avatar: "LW", streak: 35, challenges: 41, badge: "Expert" },
    { rank: 6, name: "David Kim", points: 10987, avatar: "DK", streak: 22, challenges: 38, badge: "Advanced" },
    { rank: 7, name: "Rachel Green", points: 10543, avatar: "RG", streak: 31, challenges: 35, badge: "Advanced" },
    { rank: 8, name: "Tom Wilson", points: 9876, avatar: "TW", streak: 19, challenges: 33, badge: "Advanced" },
    { rank: 9, name: "Amy Foster", points: 9234, avatar: "AF", streak: 26, challenges: 29, badge: "Intermediate" },
    { rank: 10, name: "James Brown", points: 8765, avatar: "JB", streak: 17, challenges: 27, badge: "Intermediate" },
  ];

  const weeklyLeaderboard = [
    { rank: 1, name: "Emma Davis", points: 1250, avatar: "ED", change: "+2" },
    { rank: 2, name: "Mike Chen", points: 1180, avatar: "MC", change: "0" },
    { rank: 3, name: "Sarah Johnson", points: 1150, avatar: "SJ", change: "-2" },
    { rank: 4, name: "Alex Rodriguez", points: 980, avatar: "AR", change: "+3" },
    { rank: 5, name: "Lisa Wang", points: 920, avatar: "LW", change: "-1" },
  ];

  const categoryLeaderboard = [
    { rank: 1, name: "Sarah Johnson", points: 8547, avatar: "SJ", category: "Running" },
    { rank: 2, name: "Mike Chen", points: 7892, avatar: "MC", category: "Cycling" },
    { rank: 3, name: "Emma Davis", points: 6543, avatar: "ED", category: "Swimming" },
    { rank: 4, name: "Alex Rodriguez", points: 5987, avatar: "AR", category: "Strength" },
    { rank: 5, name: "Lisa Wang", points: 5432, avatar: "LW", category: "Yoga" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Medal className="h-6 w-6 text-amber-600" />;
      default: return <div className="w-6 h-6 flex items-center justify-center text-slate-400 font-bold">#{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      case 2: return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3: return 'from-amber-600/20 to-amber-700/20 border-amber-600/30';
      default: return 'from-slate-700/20 to-slate-800/20 border-slate-600/30';
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Legend': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
      case 'Master': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'Expert': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'Advanced': return 'bg-gradient-to-r from-orange-500 to-red-500 text-white';
      case 'Intermediate': return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
        <p className="text-slate-400">Compete with athletes worldwide and climb the ranks</p>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
      >
        {/* Second Place */}
        <div className="md:order-1 flex flex-col items-center">
          <Card className="bg-gradient-to-b from-gray-400/20 to-gray-500/20 border-gray-400/30 w-full">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Avatar className="h-16 w-16 mx-auto border-4 border-gray-400">
                  <AvatarFallback className="bg-gray-400 text-white text-lg font-bold">
                    {globalLeaderboard[1].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2">
                  <Medal className="h-8 w-8 text-gray-400" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{globalLeaderboard[1].name}</h3>
              <p className="text-2xl font-bold text-gray-400 mb-2">{globalLeaderboard[1].points.toLocaleString()}</p>
              <Badge className={getBadgeColor(globalLeaderboard[1].badge)}>
                {globalLeaderboard[1].badge}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* First Place */}
        <div className="md:order-2 flex flex-col items-center">
          <Card className="bg-gradient-to-b from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 w-full transform md:scale-110">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Avatar className="h-20 w-20 mx-auto border-4 border-yellow-500">
                  <AvatarFallback className="bg-yellow-500 text-white text-xl font-bold">
                    {globalLeaderboard[0].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-3 -right-3">
                  <Crown className="h-10 w-10 text-yellow-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{globalLeaderboard[0].name}</h3>
              <p className="text-3xl font-bold text-yellow-500 mb-2">{globalLeaderboard[0].points.toLocaleString()}</p>
              <Badge className={getBadgeColor(globalLeaderboard[0].badge)}>
                {globalLeaderboard[0].badge}
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Third Place */}
        <div className="md:order-3 flex flex-col items-center">
          <Card className="bg-gradient-to-b from-amber-600/20 to-amber-700/20 border-amber-600/30 w-full">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Avatar className="h-16 w-16 mx-auto border-4 border-amber-600">
                  <AvatarFallback className="bg-amber-600 text-white text-lg font-bold">
                    {globalLeaderboard[2].avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2">
                  <Medal className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{globalLeaderboard[2].name}</h3>
              <p className="text-2xl font-bold text-amber-600 mb-2">{globalLeaderboard[2].points.toLocaleString()}</p>
              <Badge className={getBadgeColor(globalLeaderboard[2].badge)}>
                {globalLeaderboard[2].badge}
              </Badge>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Leaderboard Tables */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="global">Global</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="category">By Category</TabsTrigger>
          </TabsList>
          
          <TabsContent value="global" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-time">All Time</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {globalLeaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      className={`flex items-center justify-between p-4 ${
                        index < 3 ? `bg-gradient-to-r ${getRankColor(user.rank)}` : 'hover:bg-slate-700/50'
                      } ${index === 0 ? 'rounded-t-lg' : ''} ${index === globalLeaderboard.length - 1 ? 'rounded-b-lg' : ''}`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(user.rank)}
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-600 text-white">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{user.name}</div>
                          <div className="text-sm text-slate-400">
                            {user.challenges} challenges • {user.streak} day streak
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={getBadgeColor(user.badge)}>
                          {user.badge}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{user.points.toLocaleString()}</div>
                          <div className="text-sm text-slate-400">points</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weekly" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>This Week's Top Performers</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyLeaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(user.rank)}
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-600 text-white">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{user.name}</div>
                          <div className="text-sm text-slate-400">This week's progress</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className={
                          user.change.startsWith('+') ? 'bg-green-500/20 text-green-400' :
                          user.change.startsWith('-') ? 'bg-red-500/20 text-red-400' :
                          'bg-slate-500/20 text-slate-400'
                        }>
                          {user.change !== '0' ? user.change : 'No change'}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{user.points.toLocaleString()}</div>
                          <div className="text-sm text-slate-400">points</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="category" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Category Champions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryLeaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          {getRankIcon(user.rank)}
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-600 text-white">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{user.name}</div>
                          <div className="text-sm text-slate-400">Champion in {user.category}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-purple-500/20 text-purple-400">
                          {user.category}
                        </Badge>
                        <div className="text-right">
                          <div className="text-lg font-bold text-white">{user.points.toLocaleString()}</div>
                          <div className="text-sm text-slate-400">points</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
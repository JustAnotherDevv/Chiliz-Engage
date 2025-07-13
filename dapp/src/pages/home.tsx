import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Users, TrendingUp, Award, Clock, MapPin } from 'lucide-react';

export function Home() {
  const featuredChallenges = [
    {
      id: 1,
      title: "30-Day Running Challenge",
      description: "Run 5km daily for 30 days",
      category: "Running",
      participants: 2847,
      reward: "500 CHILL",
      difficulty: "Medium",
      timeLeft: "5 days",
      image: "https://images.pexels.com/photos/2402813/pexels-photo-2402813.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      title: "Yoga Flexibility Master",
      description: "Complete 20 yoga sessions",
      category: "Yoga",
      participants: 1523,
      reward: "300 CHILL",
      difficulty: "Easy",
      timeLeft: "12 days",
      image: "https://images.pexels.com/photos/3822142/pexels-photo-3822142.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      title: "Strength Training Beast",
      description: "Build muscle with 15 workouts",
      category: "Strength",
      participants: 3421,
      reward: "750 CHILL",
      difficulty: "Hard",
      timeLeft: "8 days",
      image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Users", value: "127K", change: "+12%" },
    { icon: Target, label: "Challenges", value: "2,847", change: "+25%" },
    { icon: Trophy, label: "Completed", value: "45,231", change: "+8%" },
    { icon: Award, label: "Rewards Earned", value: "1.2M CHILL", change: "+15%" }
  ];

  const topAthletes = [
    { name: "Sarah Johnson", points: 12543, avatar: "SJ", sport: "Running" },
    { name: "Mike Chen", points: 11892, avatar: "MC", sport: "Cycling" },
    { name: "Emma Davis", points: 10987, avatar: "ED", sport: "Swimming" }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-8 text-white"
      >
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Get Fit, Get Rewarded, Get Connected
          </h1>
          <p className="text-xl mb-6 text-white/90">
            Join thousands of athletes in blockchain-powered fitness challenges
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/challenges">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                Explore Challenges
              </Button>
            </Link>
            <Link to="/create-challenge">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Create Challenge
              </Button>
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-transparent" />
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-5 w-5 text-purple-400" />
                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Featured Challenges */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Featured Challenges</h2>
            <Link to="/challenges">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {featuredChallenges.map((challenge) => (
              <Card key={challenge.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={challenge.image}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600">{challenge.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-slate-900/80">
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{challenge.title}</h3>
                  <p className="text-slate-400 mb-4">{challenge.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{challenge.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{challenge.timeLeft}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-green-400 font-semibold">{challenge.reward}</div>
                    <Link to={`/challenges/${challenge.id}`}>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Join Challenge
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Top Athletes */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Top Athletes</h2>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="space-y-4">
                {topAthletes.map((athlete, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <div className="text-lg font-bold text-purple-400">#{index + 1}</div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-purple-600 text-white">
                            {athlete.avatar}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{athlete.name}</div>
                        <div className="text-sm text-slate-400">{athlete.sport}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">{athlete.points.toLocaleString()}</div>
                      <div className="text-sm text-slate-400">points</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <Link to="/leaderboard">
                  <Button variant="outline" size="sm" className="w-full">
                    View Full Leaderboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Your Progress */}
          <Card className="bg-slate-800/50 border-slate-700 mt-6">
            <CardHeader>
              <CardTitle className="text-white">Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Weekly Goal</span>
                    <span className="text-white">7/10 workouts</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Total CHILL Earned</span>
                    <span className="text-green-400">2,450 CHILL</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Challenges Completed</span>
                    <span className="text-white">23</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
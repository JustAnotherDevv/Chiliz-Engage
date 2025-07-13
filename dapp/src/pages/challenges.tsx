import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Users, Clock, Trophy, Target } from 'lucide-react';

export function Challenges() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const challenges = [
    {
      id: 1,
      title: "30-Day Running Challenge",
      description: "Run 5km daily for 30 days and build endurance",
      category: "Running",
      participants: 2847,
      reward: "500 CHILL",
      difficulty: "Medium",
      timeLeft: "5 days",
      duration: "30 days",
      creator: "Nike Running Club",
      image: "https://images.pexels.com/photos/2402813/pexels-photo-2402813.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active"
    },
    {
      id: 2,
      title: "Yoga Flexibility Master",
      description: "Complete 20 yoga sessions to improve flexibility",
      category: "Yoga",
      participants: 1523,
      reward: "300 CHILL",
      difficulty: "Easy",
      timeLeft: "12 days",
      duration: "21 days",
      creator: "Zen Yoga Studio",
      image: "https://images.pexels.com/photos/3822142/pexels-photo-3822142.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active"
    },
    {
      id: 3,
      title: "Strength Training Beast",
      description: "Build muscle with 15 intense workouts",
      category: "Strength",
      participants: 3421,
      reward: "750 CHILL",
      difficulty: "Hard",
      timeLeft: "8 days",
      duration: "4 weeks",
      creator: "Iron Gym",
      image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active"
    },
    {
      id: 4,
      title: "Swimming Endurance Pro",
      description: "Swim 2km three times a week",
      category: "Swimming",
      participants: 892,
      reward: "400 CHILL",
      difficulty: "Medium",
      timeLeft: "15 days",
      duration: "6 weeks",
      creator: "AquaFit Center",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active"
    },
    {
      id: 5,
      title: "Cycling Adventure",
      description: "Cycle 100km in scenic routes",
      category: "Cycling",
      participants: 2156,
      reward: "600 CHILL",
      difficulty: "Medium",
      timeLeft: "3 days",
      duration: "2 weeks",
      creator: "CycleMax Club",
      image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active"
    },
    {
      id: 6,
      title: "Martial Arts Mastery",
      description: "Learn and practice 10 martial arts forms",
      category: "Martial Arts",
      participants: 1847,
      reward: "550 CHILL",
      difficulty: "Hard",
      timeLeft: "20 days",
      duration: "8 weeks",
      creator: "Dragon Dojo",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
      status: "active"
    }
  ];

  const categories = ['all', 'Running', 'Yoga', 'Strength', 'Swimming', 'Cycling', 'Martial Arts'];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'Hard': return 'bg-red-500/20 text-red-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Challenges</h1>
          <p className="text-slate-400">Find and join fitness challenges that match your goals</p>
        </div>
        <Link to="/create-challenge">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
            Create Challenge
          </Button>
        </Link>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-700">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full md:w-48 bg-slate-800/50 border-slate-700">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {difficulties.map(difficulty => (
              <SelectItem key={difficulty} value={difficulty}>
                {difficulty === 'all' ? 'All Difficulties' : difficulty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
          <TabsTrigger value="all">All Challenges</TabsTrigger>
          <TabsTrigger value="joined">Joined</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-purple-600">{challenge.category}</Badge>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <Badge variant="secondary" className="bg-slate-900/80">
                        <Clock className="h-3 w-3 mr-1" />
                        {challenge.timeLeft}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{challenge.title}</h3>
                    <p className="text-slate-400 mb-4 text-sm">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4" />
                        <span>{challenge.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="text-slate-400">Created by</div>
                      <div className="text-white font-medium">{challenge.creator}</div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4 text-yellow-400" />
                        <span className="text-green-400 font-semibold">{challenge.reward}</span>
                      </div>
                      <Link to={`/challenges/${challenge.id}`}>
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="joined" className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-slate-400 mb-4">No joined challenges yet</div>
            <Link to="/challenges">
              <Button variant="outline">Browse Challenges</Button>
            </Link>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-slate-400 mb-4">No completed challenges yet</div>
            <Link to="/challenges">
              <Button variant="outline">Start Your First Challenge</Button>
            </Link>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
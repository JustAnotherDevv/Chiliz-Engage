import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Search, 
  Filter,
  Plus,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';

export function Community() {
  const [searchTerm, setSearchTerm] = useState('');

  const communityPosts = [
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "SJ",
      timestamp: "2 hours ago",
      content: "Just completed my first 10K run! 🏃‍♀️ The FitChilliz community motivation kept me going through the tough miles. Thank you everyone for the support!",
      image: "https://images.pexels.com/photos/2402813/pexels-photo-2402813.jpeg?auto=compress&cs=tinysrgb&w=400",
      likes: 247,
      comments: 18,
      shares: 5,
      challenge: "30-Day Running Challenge",
      tags: ["running", "milestone", "10k"]
    },
    {
      id: 2,
      author: "Mike Chen",
      avatar: "MC",
      timestamp: "4 hours ago",
      content: "Anyone else joining the yoga flexibility challenge? Looking for accountability partners! Let's support each other 🧘‍♂️",
      likes: 89,
      comments: 12,
      shares: 3,
      challenge: "Yoga Flexibility Master",
      tags: ["yoga", "flexibility", "accountability"]
    },
    {
      id: 3,
      author: "Emma Davis",
      avatar: "ED",
      timestamp: "6 hours ago",
      content: "Week 2 of strength training complete! 💪 Feeling stronger every day. The blockchain rewards system is such a great motivator!",
      image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=400",
      likes: 156,
      comments: 9,
      shares: 7,
      challenge: "Strength Training Beast",
      tags: ["strength", "progress", "motivation"]
    },
    {
      id: 4,
      author: "Alex Rodriguez",
      avatar: "AR",
      timestamp: "8 hours ago",
      content: "Swimming challenge update: Just hit my personal best 🏊‍♂️ The community leaderboard is so motivating! Keep pushing everyone!",
      likes: 203,
      comments: 15,
      shares: 4,
      challenge: "Swimming Endurance Pro",
      tags: ["swimming", "personal-best", "motivation"]
    }
  ];

  const groups = [
    {
      id: 1,
      name: "Running Enthusiasts",
      description: "For all things running - from 5K to marathons",
      members: 2847,
      posts: 1256,
      category: "Running",
      image: "https://images.pexels.com/photos/2402813/pexels-photo-2402813.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 2,
      name: "Yoga & Mindfulness",
      description: "Find your inner peace through yoga and meditation",
      members: 1523,
      posts: 892,
      category: "Yoga",
      image: "https://images.pexels.com/photos/3822142/pexels-photo-3822142.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 3,
      name: "Strength Warriors",
      description: "Building strength and muscle together",
      members: 1847,
      posts: 1034,
      category: "Strength",
      image: "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=300"
    },
    {
      id: 4,
      name: "Swimming Squad",
      description: "Dive into fitness with fellow swimmers",
      members: 892,
      posts: 567,
      category: "Swimming",
      image: "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=300"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Virtual 5K Challenge",
      date: "2024-01-25",
      time: "09:00 AM",
      participants: 234,
      location: "Virtual",
      description: "Join runners worldwide for a virtual 5K challenge",
      category: "Running"
    },
    {
      id: 2,
      title: "Yoga Flow Workshop",
      date: "2024-01-27",
      time: "07:00 PM",
      participants: 89,
      location: "Online",
      description: "Learn advanced yoga flows with certified instructors",
      category: "Yoga"
    },
    {
      id: 3,
      title: "Strength Training Bootcamp",
      date: "2024-01-28",
      time: "06:00 PM",
      participants: 156,
      location: "Virtual",
      description: "High-intensity strength training session",
      category: "Strength"
    }
  ];

  const topContributors = [
    { name: "Sarah Johnson", points: 8547, avatar: "SJ", contributions: 127 },
    { name: "Mike Chen", points: 7892, avatar: "MC", contributions: 95 },
    { name: "Emma Davis", points: 6543, avatar: "ED", contributions: 89 },
    { name: "Alex Rodriguez", points: 5987, avatar: "AR", contributions: 76 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Community</h1>
        <p className="text-slate-400">Connect, share, and motivate each other on your fitness journey</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search posts, groups, or events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </motion.div>

      {/* Main Content */}
      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="contributors">Contributors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Posts Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Create Post */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-purple-600 text-white">
                          YU
                        </AvatarFallback>
                      </Avatar>
                      <Input
                        placeholder="Share your fitness journey..."
                        className="bg-slate-900/50 border-slate-700"
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-1" />
                          Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location
                        </Button>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Posts */}
              {communityPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-600 text-white">
                              {post.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-white">{post.author}</div>
                            <div className="text-sm text-slate-400">{post.timestamp}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Challenge Badge */}
                      {post.challenge && (
                        <Badge className="bg-purple-600 mb-3">
                          {post.challenge}
                        </Badge>
                      )}

                      {/* Post Content */}
                      <p className="text-slate-300 mb-4">{post.content}</p>

                      {/* Post Image */}
                      {post.image && (
                        <div className="mb-4">
                          <img
                            src={post.image}
                            alt="Post image"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="bg-slate-700 text-slate-300">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                        <div className="flex items-center space-x-4">
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-red-400">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-blue-400">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-green-400">
                            <Share2 className="h-4 w-4 mr-1" />
                            {post.shares}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Trending Topics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['#30dayrunning', '#yogaflow', '#strengthtraining', '#swimchallenge', '#fitnessmotivation'].map((tag, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-purple-400 font-medium">{tag}</span>
                          <span className="text-slate-400 text-sm">{Math.floor(Math.random() * 500) + 100} posts</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Active Members</span>
                        <span className="text-white font-semibold">127,543</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Posts Today</span>
                        <span className="text-white font-semibold">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Challenges Active</span>
                        <span className="text-white font-semibold">2,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Total Groups</span>
                        <span className="text-white font-semibold">156</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="groups" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {groups.map((group, index) => (
              <Card key={group.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <div className="relative h-32 overflow-hidden rounded-t-lg">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-purple-600">{group.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{group.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{group.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{group.members.toLocaleString()} members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{group.posts} posts</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {events.map((event, index) => (
              <Card key={event.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-purple-600">{event.category}</Badge>
                    <div className="text-sm text-slate-400">{event.participants} going</div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{event.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                      Join Event
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </TabsContent>
        
        <TabsContent value="contributors" className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Top Community Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <div className="text-lg font-bold text-purple-400">#{index + 1}</div>
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-600 text-white">
                              {contributor.avatar}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{contributor.name}</div>
                          <div className="text-sm text-slate-400">{contributor.contributions} contributions</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-white font-semibold">{contributor.points.toLocaleString()}</span>
                      </div>
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
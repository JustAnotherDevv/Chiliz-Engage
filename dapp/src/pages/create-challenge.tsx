import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { CalendarIcon, Plus, X, Target, Trophy, Users, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function CreateChallenge() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    difficulty: '',
    duration: '',
    reward: '',
    requiresProof: true,
    isPublic: true,
    maxParticipants: '',
    startDate: new Date(),
    endDate: new Date()
  });

  const [rules, setRules] = useState(['']);
  const [requirements, setRequirements] = useState(['']);
  const [milestones, setMilestones] = useState([{ day: '', reward: '', description: '' }]);

  const categories = [
    'Running', 'Cycling', 'Swimming', 'Yoga', 'Strength Training', 
    'Martial Arts', 'Team Sports', 'Outdoor Activities', 'Dance', 'Other'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.category || !formData.difficulty) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create challenge logic would go here
    toast.success('Challenge created successfully!');
    navigate('/challenges');
  };

  const addRule = () => {
    setRules([...rules, '']);
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addMilestone = () => {
    setMilestones([...milestones, { day: '', reward: '', description: '' }]);
  };

  const removeMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const updateMilestone = (index: number, field: string, value: string) => {
    const newMilestones = [...milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    setMilestones(newMilestones);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Create New Challenge</h1>
        <p className="text-slate-400">Design an engaging fitness challenge for the community</p>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Challenge Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="30-Day Running Challenge"
                    className="bg-slate-900/50 border-slate-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-white">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your challenge in detail..."
                  className="bg-slate-900/50 border-slate-700 min-h-24"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty" className="text-white">Difficulty *</Label>
                  <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {difficulties.map(difficulty => (
                        <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="30 days"
                    className="bg-slate-900/50 border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reward" className="text-white">Total Reward</Label>
                  <Input
                    id="reward"
                    value={formData.reward}
                    onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
                    placeholder="500 CHILL"
                    className="bg-slate-900/50 border-slate-700"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rules and Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Rules & Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Rules */}
              <div className="space-y-3">
                <Label className="text-white">Challenge Rules</Label>
                {rules.map((rule, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={rule}
                      onChange={(e) => updateRule(index, e.target.value)}
                      placeholder="Enter a rule..."
                      className="bg-slate-900/50 border-slate-700"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRule(index)}
                      className="px-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRule}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Rule
                </Button>
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <Label className="text-white">Requirements</Label>
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={requirement}
                      onChange={(e) => updateRequirement(index, e.target.value)}
                      placeholder="Enter a requirement..."
                      className="bg-slate-900/50 border-slate-700"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeRequirement(index)}
                      className="px-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addRequirement}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Requirement
                </Button>
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
              <CardTitle className="text-white flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Milestones & Rewards</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-900/50 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-white text-sm">Day</Label>
                    <Input
                      value={milestone.day}
                      onChange={(e) => updateMilestone(index, 'day', e.target.value)}
                      placeholder="7"
                      className="bg-slate-800/50 border-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white text-sm">Reward</Label>
                    <Input
                      value={milestone.reward}
                      onChange={(e) => updateMilestone(index, 'reward', e.target.value)}
                      placeholder="50 CHILL"
                      className="bg-slate-800/50 border-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-white text-sm">Description</Label>
                    <Input
                      value={milestone.description}
                      onChange={(e) => updateMilestone(index, 'description', e.target.value)}
                      placeholder="First week completed"
                      className="bg-slate-800/50 border-slate-700"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeMilestone(index)}
                      className="w-full"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addMilestone}
                className="mt-2"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Milestone
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Challenge Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-white">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                    placeholder="Unlimited"
                    className="bg-slate-900/50 border-slate-700"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Requires Proof</Label>
                  <p className="text-sm text-slate-400">Participants must upload proof of completion</p>
                </div>
                <Switch
                  checked={formData.requiresProof}
                  onCheckedChange={(checked) => setFormData({ ...formData, requiresProof: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-white">Public Challenge</Label>
                  <p className="text-sm text-slate-400">Anyone can join this challenge</p>
                </div>
                <Switch
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex justify-center space-x-4"
        >
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/challenges')}
            className="px-8"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Create Challenge
          </Button>
        </motion.div>
      </form>
    </div>
  );
}
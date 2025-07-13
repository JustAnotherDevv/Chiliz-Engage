import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Home, Trophy, Users, Target, User, Plus } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/challenges', icon: Target, label: 'Challenges' },
    { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { href: '/community', icon: Users, label: 'Community' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Trophy className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              FitChilliz
            </span>
          </Link>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={location.pathname === item.href ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'flex items-center space-x-2',
                    location.pathname === item.href
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              </Link>
            ))}
            <Link to="/create-challenge">
              <Button size="sm" className="ml-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                <Plus className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Create</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
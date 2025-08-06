import React from 'react';
import { cn } from '@/lib/utils';
import { 
  User, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Home, 
  Trophy, 
  CreditCard, 
  Settings, 
  LogOut, 
  Play, 
  Pause, 
  ArrowLeft, 
  ArrowRight,
  Menu,
  X,
  Check,
  AlertCircle,
  Info,
  Loader2,
  Star,
  Heart,
  Diamond,
  Club,
  Spade,
  Clock,
  Coins,
  Lightbulb
} from 'lucide-react';

const iconMap = {
  user: User,
  lock: Lock,
  mail: Mail,
  eye: Eye,
  eyeOff: EyeOff,
  home: Home,
  trophy: Trophy,
  creditCard: CreditCard,
  settings: Settings,
  logOut: LogOut,
  play: Play,
  pause: Pause,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  menu: Menu,
  x: X,
  check: Check,
  alertCircle: AlertCircle,
  info: Info,
  loader: Loader2,
  star: Star,
  heart: Heart,
  diamond: Diamond,
  club: Club,
  spade: Spade,
  clock: Clock,
  coins: Coins,
  lightbulb: Lightbulb
};

const Icon = ({ 
  name, 
  size = 24, 
  className, 
  color = 'currentColor',
  ...props 
}) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={cn('inline-block', className)}
      {...props}
    />
  );
};

export default Icon;


const colorStyles = {
  cyan: 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/50',
  pink: 'bg-neon-pink/20 text-neon-pink border-neon-pink/50',
  yellow: 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50',
  green: 'bg-neon-green/20 text-neon-green border-neon-green/50',
  orange: 'bg-neon-orange/20 text-neon-orange border-neon-orange/50',
  red: 'bg-neon-red/20 text-neon-red border-neon-red/50',
  gray: 'bg-dark-500/50 text-white/70 border-dark-400',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export default function Badge({
  children,
  color = 'cyan',
  size = 'md',
  className = '',
  icon,
}) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        font-body font-medium
        border rounded-full
        ${colorStyles[color]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}

// Preset difficulty badges
export function DifficultyBadge({ difficulty }) {
  const colors = {
    beginner: 'green',
    intermediate: 'yellow',
    advanced: 'red',
  };

  const labels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <Badge color={colors[difficulty]} size="sm">
      {labels[difficulty]}
    </Badge>
  );
}

// Category badge with icon
export function CategoryBadge({ category, icon }) {
  const colors = {
    'video-systems': 'cyan',
    'motors': 'pink',
    'propellers': 'yellow',
    'betaflight': 'green',
    'build-theory': 'orange',
    'configuration': 'red',
  };

  return (
    <Badge color={colors[category] || 'gray'} size="sm" icon={icon}>
      {category.replace('-', ' ')}
    </Badge>
  );
}

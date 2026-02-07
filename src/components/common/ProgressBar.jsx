import { motion } from 'framer-motion';

const colorStyles = {
  cyan: 'from-neon-cyan to-neon-cyan/70',
  pink: 'from-neon-pink to-neon-pink/70',
  gradient: 'from-neon-cyan via-neon-pink to-neon-yellow',
  green: 'from-neon-green to-neon-green/70',
  yellow: 'from-neon-yellow to-neon-yellow/70',
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'gradient',
  size = 'md',
  showLabel = false,
  animated = true,
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1 text-sm font-body">
          <span className="text-white/70">Progress</span>
          <span className="text-neon-cyan">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={`
          w-full ${heights[size]}
          bg-dark-600 rounded-full overflow-hidden
          border border-dark-500
        `}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`
            h-full rounded-full
            bg-gradient-to-r ${colorStyles[color]}
            ${animated ? 'progress-bar-animated' : ''}
          `}
        />
      </div>
    </div>
  );
}

// Circular progress variant
export function CircularProgress({
  value = 0,
  max = 100,
  size = 80,
  strokeWidth = 6,
  color = 'cyan',
  showValue = true,
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    cyan: '#00fff7',
    pink: '#ff00ff',
    green: '#39ff14',
    yellow: '#ffd700',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#353545"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 6px ${colors[color]}80)`,
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display font-bold"
            style={{ color: colors[color], fontSize: size * 0.25 }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
}

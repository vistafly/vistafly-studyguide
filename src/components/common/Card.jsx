import { motion } from 'framer-motion';

const glowColors = {
  cyan: 'hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,247,0.2)]',
  pink: 'hover:border-neon-pink hover:shadow-[0_0_30px_rgba(255,0,255,0.2)]',
  yellow: 'hover:border-neon-yellow hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]',
  green: 'hover:border-neon-green hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]',
  orange: 'hover:border-neon-orange hover:shadow-[0_0_30px_rgba(255,107,0,0.2)]',
  red: 'hover:border-neon-red hover:shadow-[0_0_30px_rgba(255,49,49,0.2)]',
};

export default function Card({
  children,
  className = '',
  glowColor = 'cyan',
  hoverable = true,
  onClick,
  padding = 'p-6',
}) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={hoverable ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={`
        bg-gradient-to-br from-dark-800 to-dark-700
        border border-dark-500 rounded-xl
        ${hoverable ? glowColors[glowColor] : ''}
        transition-all duration-300
        ${padding}
        ${onClick ? 'cursor-pointer text-left w-full' : ''}
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

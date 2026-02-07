import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan hover:bg-neon-cyan/30 hover:shadow-[0_0_20px_rgba(228,216,196,0.4)]',
  secondary: 'bg-neon-pink/20 border-neon-pink text-neon-pink hover:bg-neon-pink/30 hover:shadow-[0_0_20px_rgba(184,169,154,0.4)]',
  success: 'bg-neon-green/20 border-neon-green text-neon-green hover:bg-neon-green/30 hover:shadow-[0_0_20px_rgba(200,186,170,0.4)]',
  warning: 'bg-neon-orange/20 border-neon-orange text-neon-orange hover:bg-neon-orange/30 hover:shadow-[0_0_20px_rgba(228,216,196,0.4)]',
  danger: 'bg-neon-red/20 border-neon-red text-neon-red hover:bg-neon-red/30 hover:shadow-[0_0_20px_rgba(168,149,133,0.4)]',
  ghost: 'bg-transparent border-dark-500 text-white/70 hover:border-neon-cyan hover:text-neon-cyan',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  icon,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        inline-flex items-center justify-center gap-2
        font-body font-semibold
        border-2 rounded-lg
        transition-all duration-300
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}

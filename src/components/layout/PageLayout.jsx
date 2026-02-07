import { motion } from 'framer-motion';
import Header from './Header';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function PageLayout({ children, className = '' }) {
  return (
    <div className="min-h-screen bg-dark-900 grid-bg">
      <Header />
      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ duration: 0.3 }}
        className={`max-w-7xl mx-auto px-4 py-8 ${className}`}
      >
        {children}
      </motion.main>
    </div>
  );
}

// Page header component for consistent page titles
export function PageHeader({ title, subtitle, icon, action }) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {icon && (
            <div className="text-4xl">{icon}</div>
          )}
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white text-glow-cyan">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-1 font-body text-lg text-white/60">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

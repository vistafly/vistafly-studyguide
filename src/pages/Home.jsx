import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CreditCard,
  HelpCircle,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Wrench,
  Flame,
  GraduationCap,
  Rocket,
  TrendingUp,
} from 'lucide-react';
import { PageLayout } from '../components/layout';
import { Card, Button, ProgressBar, CircularProgress } from '../components/common';
import { useProgress } from '../context/ProgressContext';
import { CATEGORIES, FPV_TOPICS } from '../data/topics';

const studyModes = [
  {
    title: 'Topics',
    description: 'Deep dive into FPV concepts',
    icon: BookOpen,
    path: '/topics',
    color: 'cyan',
  },
  {
    title: 'Flashcards',
    description: 'Quick review with flip cards',
    icon: CreditCard,
    path: '/flashcards',
    color: 'pink',
  },
  {
    title: 'Quiz',
    description: 'Test your knowledge',
    icon: HelpCircle,
    path: '/quiz',
    color: 'yellow',
  },
  {
    title: 'Build Simulator',
    description: 'Optimize drone hover time',
    icon: Wrench,
    path: '/simulator',
    color: 'orange',
  },
];

const statItems = [
  {
    icon: Flame,
    getValue: (stats) => stats.studyStreak,
    label: 'Day Streak',
    color: 'orange',
    glowColor: 'orange',
  },
  {
    icon: GraduationCap,
    getValue: (stats) => `${stats.topicsMastered}/${stats.totalTopics}`,
    label: 'Topics Mastered',
    color: 'cyan',
    glowColor: 'cyan',
  },
  {
    icon: Target,
    getValue: (stats) => `${stats.averageQuizScore}%`,
    label: 'Avg Quiz Score',
    color: 'green',
    glowColor: 'green',
  },
  {
    icon: Clock,
    getValue: (stats) => `${Math.round(stats.totalTimeStudied / 60)}h`,
    label: 'Time Studied',
    color: 'pink',
    glowColor: 'pink',
  },
];

const neonColors = {
  cyan: '#E4D8C4',
  pink: '#B8A99A',
  yellow: '#D4C5B2',
  green: '#C8BAAA',
  orange: '#E4D8C4',
  red: '#A89585',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const { getOverallStats, progress } = useProgress();
  const stats = getOverallStats();

  // Get recently viewed topics
  const recentTopics = FPV_TOPICS
    .filter(topic => progress.topics[topic.id]?.viewed)
    .sort((a, b) => {
      const aTime = progress.topics[a.id]?.lastViewed || 0;
      const bTime = progress.topics[b.id]?.lastViewed || 0;
      return new Date(bTime) - new Date(aTime);
    })
    .slice(0, 3);

  return (
    <PageLayout>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center mb-16 pt-4"
      >
        {/* Decorative top line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />

        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 mb-6 backdrop-blur-sm">
          <Zap className="w-3.5 h-3.5 text-neon-cyan" />
          <span className="font-body text-neon-cyan text-xs tracking-widest uppercase">Technical Interview Prep</span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight">
          Welcome back, <span className="text-glow-cyan text-neon-cyan">Ron</span>
        </h1>
        <p className="font-body text-base text-white/40 max-w-xl mx-auto leading-relaxed">
          Master FPV drone technical knowledge for your upcoming interview.
          Your journey to expertise continues here.
        </p>

        {/* Decorative bottom line */}
        <div className="mt-8 mx-auto w-64 h-px bg-gradient-to-r from-transparent via-dark-500 to-transparent" />
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14"
      >
        {statItems.map(({ icon: Icon, getValue, label, color, glowColor }) => (
          <motion.div key={label} variants={itemVariants}>
            <Card className="text-center" glowColor={glowColor}>
              <div
                className="w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center border"
                style={{
                  backgroundColor: `${neonColors[color]}0d`,
                  borderColor: `${neonColors[color]}33`,
                }}
              >
                <Icon className="w-5 h-5" style={{ color: neonColors[color] }} />
              </div>
              <div
                className="font-display font-bold text-2xl mb-1"
                style={{ color: neonColors[color] }}
              >
                {getValue(stats)}
              </div>
              <div className="font-body text-xs text-white/40 uppercase tracking-wider">{label}</div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-14"
      >
        <Card padding="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <CircularProgress
              value={stats.topicsMastered}
              max={stats.totalTopics}
              size={120}
              strokeWidth={8}
              color="cyan"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display font-bold text-2xl text-white mb-2 tracking-tight">
                Overall Mastery
              </h2>
              <p className="font-body text-white/50 mb-4 leading-relaxed">
                You've mastered {stats.topicsMastered} of {stats.totalTopics} topics.
                {stats.topicsMastered < stats.totalTopics
                  ? ` Keep going! ${stats.totalTopics - stats.topicsMastered} more to complete your preparation.`
                  : ' Excellent work! You\'re ready for your interview!'}
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="inline-flex items-center gap-1.5 text-sm text-neon-green">
                  <Target className="w-4 h-4" />
                  {stats.flashcardsKnown} flashcards mastered
                </span>
                <span className="inline-flex items-center gap-1.5 text-sm text-neon-cyan">
                  <TrendingUp className="w-4 h-4" />
                  {stats.quizzesTaken} quizzes completed
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Study Modes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-14"
      >
        <h2 className="font-display font-bold text-2xl text-white mb-6 tracking-tight">Study Modes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studyModes.map(({ title, description, icon: Icon, path, color }) => (
            <Link key={path} to={path}>
              <Card
                glowColor={color}
                className="h-full flex flex-col items-center text-center"
              >
                <div
                  className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center border"
                  style={{
                    backgroundColor: `${neonColors[color]}0d`,
                    borderColor: `${neonColors[color]}33`,
                  }}
                >
                  <Icon
                    className="w-7 h-7"
                    style={{ color: neonColors[color] }}
                  />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-1">{title}</h3>
                <p className="font-body text-sm text-white/40">{description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Categories Quick Access */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-14"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-white tracking-tight">Categories</h2>
          <Link to="/topics">
            <Button variant="ghost" size="sm">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((category) => {
            const categoryTopics = FPV_TOPICS.filter(t => t.category === category.id);
            const masteredCount = categoryTopics.filter(
              t => progress.topics[t.id]?.mastered
            ).length;

            return (
              <Link key={category.id} to={`/topics?category=${category.id}`}>
                <Card
                  glowColor={category.color}
                  padding="p-4"
                  className="text-center"
                >
                  <div
                    className="w-10 h-10 mx-auto mb-2 rounded-lg flex items-center justify-center text-lg border"
                    style={{
                      backgroundColor: `${neonColors[category.color] || neonColors.cyan}0d`,
                      borderColor: `${neonColors[category.color] || neonColors.cyan}33`,
                    }}
                  >
                    {category.icon}
                  </div>
                  <h3 className="font-body font-semibold text-white text-sm mb-1">
                    {category.name}
                  </h3>
                  <div className="text-xs text-white/40">
                    {masteredCount}/{categoryTopics.length} mastered
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Recent Activity */}
      {recentTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-display font-bold text-2xl text-white mb-6 tracking-tight">
            Continue Learning
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recentTopics.map((topic) => {
              const topicProgress = progress.topics[topic.id] || {};
              const category = CATEGORIES.find(c => c.id === topic.category);

              return (
                <Link key={topic.id} to={`/topics/${topic.id}`}>
                  <Card glowColor={category?.color || 'cyan'} className="h-full">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-base border shrink-0"
                        style={{
                          backgroundColor: `${neonColors[category?.color] || neonColors.cyan}0d`,
                          borderColor: `${neonColors[category?.color] || neonColors.cyan}33`,
                        }}
                      >
                        {topic.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-white truncate">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-white/40">{category?.name}</p>
                      </div>
                    </div>
                    <ProgressBar
                      value={topicProgress.mastered ? 100 : topicProgress.viewed ? 50 : 0}
                      max={100}
                      color={category?.color || 'cyan'}
                      size="sm"
                    />
                    <p className="mt-2 text-xs text-white/30">
                      {topicProgress.mastered ? 'Mastered' : 'In Progress'}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Empty State for New Users */}
      {recentTopics.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center py-16"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center bg-neon-cyan/10 border border-neon-cyan/20">
            <Rocket className="w-8 h-8 text-neon-cyan" />
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-2 tracking-tight">
            Ready to Start?
          </h2>
          <p className="font-body text-white/40 mb-8 max-w-sm mx-auto">
            Begin your FPV mastery journey by exploring the topics.
          </p>
          <Link to="/topics">
            <Button variant="primary" size="lg">
              <BookOpen className="w-5 h-5" /> Explore Topics
            </Button>
          </Link>
        </motion.div>
      )}
    </PageLayout>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BookOpen,
  CreditCard,
  HelpCircle,
  Trophy,
  Clock,
  Target,
  Zap,
  ChevronRight,
  Wrench,
} from 'lucide-react';
import { PageLayout, PageHeader } from '../components/layout';
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
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-4">
          <Zap className="w-4 h-4 text-neon-cyan" />
          <span className="font-body text-neon-cyan text-sm">Technical Interview Prep</span>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          Welcome back, <span className="text-glow-cyan text-neon-cyan">Ron</span>
        </h1>
        <p className="font-body text-lg text-white/60 max-w-2xl mx-auto">
          Master FPV drone technical knowledge for your upcoming interview.
          Your journey to expertise continues here.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="cyan">
            <div className="text-3xl mb-2">🔥</div>
            <div className="font-display font-bold text-2xl text-neon-orange">
              {stats.studyStreak}
            </div>
            <div className="font-body text-sm text-white/60">Day Streak</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="pink">
            <div className="text-3xl mb-2">📚</div>
            <div className="font-display font-bold text-2xl text-neon-cyan">
              {stats.topicsMastered}/{stats.totalTopics}
            </div>
            <div className="font-body text-sm text-white/60">Topics Mastered</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="yellow">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-display font-bold text-2xl text-neon-green">
              {stats.averageQuizScore}%
            </div>
            <div className="font-body text-sm text-white/60">Avg Quiz Score</div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="green">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="font-display font-bold text-2xl text-neon-pink">
              {Math.round(stats.totalTimeStudied / 60)}h
            </div>
            <div className="font-body text-sm text-white/60">Time Studied</div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <Card padding="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <CircularProgress
              value={stats.topicsMastered}
              max={stats.totalTopics}
              size={120}
              strokeWidth={10}
              color="cyan"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display font-bold text-2xl text-white mb-2">
                Overall Mastery
              </h2>
              <p className="font-body text-white/60 mb-4">
                You've mastered {stats.topicsMastered} of {stats.totalTopics} topics.
                {stats.topicsMastered < stats.totalTopics
                  ? ` Keep going! ${stats.totalTopics - stats.topicsMastered} more to complete your preparation.`
                  : ' Excellent work! You\'re ready for your interview!'}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 text-sm text-neon-green">
                  <Target className="w-4 h-4" />
                  {stats.flashcardsKnown} flashcards mastered
                </span>
                <span className="inline-flex items-center gap-1 text-sm text-neon-orange">
                  <Clock className="w-4 h-4" />
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
        className="mb-12"
      >
        <h2 className="font-display font-bold text-2xl text-white mb-6">Study Modes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studyModes.map(({ title, description, icon: Icon, path, color }) => (
            <Link key={path} to={path}>
              <Card
                glowColor={color}
                className="h-full flex flex-col items-center text-center"
              >
                <div
                  className={`
                    w-16 h-16 rounded-xl mb-4
                    flex items-center justify-center
                    bg-neon-${color}/20 border border-neon-${color}/50
                  `}
                  style={{
                    backgroundColor: `var(--color-neon-${color})1a`,
                    borderColor: `var(--color-neon-${color})80`,
                  }}
                >
                  <Icon
                    className="w-8 h-8"
                    style={{ color: `var(--color-neon-${color})` }}
                  />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
                <p className="font-body text-white/60">{description}</p>
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
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-2xl text-white">Categories</h2>
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
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h3 className="font-body font-semibold text-white text-sm mb-1">
                    {category.name}
                  </h3>
                  <div className="text-xs text-white/50">
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
          <h2 className="font-display font-bold text-2xl text-white mb-6">
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
                      <span className="text-2xl">{topic.icon}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-semibold text-white truncate">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-white/50">{category?.name}</p>
                      </div>
                    </div>
                    <ProgressBar
                      value={topicProgress.mastered ? 100 : topicProgress.viewed ? 50 : 0}
                      max={100}
                      color={category?.color || 'cyan'}
                      size="sm"
                    />
                    <p className="mt-2 text-xs text-white/40">
                      {topicProgress.mastered ? '✓ Mastered' : 'In Progress'}
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
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">
            Ready to Start?
          </h2>
          <p className="font-body text-white/60 mb-6">
            Begin your FPV mastery journey by exploring the topics.
          </p>
          <Link to="/topics">
            <Button variant="primary" size="lg" icon="📚">
              Explore Topics
            </Button>
          </Link>
        </motion.div>
      )}
    </PageLayout>
  );
}

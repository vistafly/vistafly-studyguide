import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Clock,
  Target,
  BookOpen,
  CreditCard,
  HelpCircle,
  TrendingUp,
  RotateCcw,
} from 'lucide-react';
import { PageLayout, PageHeader } from '../components/layout';
import { Card, Button, ProgressBar, CircularProgress, Badge } from '../components/common';
import { useProgress } from '../context/ProgressContext';
import { FPV_TOPICS, CATEGORIES } from '../data/topics';

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

export default function Progress() {
  const { getOverallStats, progress, resetProgress } = useProgress();
  const stats = getOverallStats();

  // Calculate category progress
  const categoryProgress = CATEGORIES.map((cat) => {
    const categoryTopics = FPV_TOPICS.filter((t) => t.category === cat.id);
    const mastered = categoryTopics.filter((t) => progress.topics[t.id]?.mastered).length;
    const viewed = categoryTopics.filter((t) => progress.topics[t.id]?.viewed).length;

    return {
      ...cat,
      total: categoryTopics.length,
      mastered,
      viewed,
      percentage: Math.round((mastered / categoryTopics.length) * 100),
    };
  });

  // Recent quiz history
  const recentQuizzes = progress.quizHistory.slice(-5).reverse();

  return (
    <PageLayout>
      <PageHeader
        title="Your Progress"
        subtitle="Track your FPV mastery journey"
        icon="📊"
        action={
          <Button variant="ghost" size="sm" onClick={resetProgress}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        }
      />

      {/* Overview Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="cyan">
            <Flame className="w-8 h-8 text-neon-orange mx-auto mb-2" />
            <div className="font-display font-bold text-3xl text-neon-orange">
              {stats.studyStreak}
            </div>
            <div className="font-body text-sm text-white/60">Day Streak</div>
            <div className="font-body text-xs text-white/40 mt-1">
              Best: {stats.longestStreak} days
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="pink">
            <BookOpen className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
            <div className="font-display font-bold text-3xl text-neon-cyan">
              {stats.topicsMastered}
            </div>
            <div className="font-body text-sm text-white/60">Topics Mastered</div>
            <div className="font-body text-xs text-white/40 mt-1">
              of {stats.totalTopics} total
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="yellow">
            <Target className="w-8 h-8 text-neon-green mx-auto mb-2" />
            <div className="font-display font-bold text-3xl text-neon-green">
              {stats.averageQuizScore}%
            </div>
            <div className="font-body text-sm text-white/60">Avg Quiz Score</div>
            <div className="font-body text-xs text-white/40 mt-1">
              {stats.quizzesTaken} quizzes taken
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="text-center" glowColor="green">
            <Clock className="w-8 h-8 text-neon-pink mx-auto mb-2" />
            <div className="font-display font-bold text-3xl text-neon-pink">
              {Math.floor(stats.totalTimeStudied / 60)}h {stats.totalTimeStudied % 60}m
            </div>
            <div className="font-body text-sm text-white/60">Time Studied</div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Overall Mastery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-neon-yellow" />
          Overall Mastery
        </h2>
        <Card padding="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <CircularProgress
              value={stats.topicsMastered}
              max={stats.totalTopics}
              size={150}
              strokeWidth={12}
              color={stats.topicsMastered === stats.totalTopics ? 'green' : 'cyan'}
            />
            <div className="flex-1">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-body text-white/60">Topics Mastered</span>
                  <span className="font-display font-semibold text-neon-cyan">
                    {stats.topicsMastered} / {stats.totalTopics}
                  </span>
                </div>
                <ProgressBar
                  value={stats.topicsMastered}
                  max={stats.totalTopics}
                  color="cyan"
                />
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-body text-white/60">Flashcards Known</span>
                  <span className="font-display font-semibold text-neon-green">
                    {stats.flashcardsKnown} / {stats.totalTopics}
                  </span>
                </div>
                <ProgressBar
                  value={stats.flashcardsKnown}
                  max={stats.totalTopics}
                  color="green"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-body text-white/60">Need Practice</span>
                  <span className="font-display font-semibold text-neon-orange">
                    {stats.flashcardsNeedPractice}
                  </span>
                </div>
                <ProgressBar
                  value={stats.flashcardsNeedPractice}
                  max={stats.totalTopics}
                  color="pink"
                />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Category Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <h2 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-neon-cyan" />
          Category Progress
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryProgress.map((cat) => (
            <Link key={cat.id} to={`/topics?category=${cat.id}`}>
              <Card glowColor={cat.color} className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className="font-display font-semibold text-white">{cat.name}</h3>
                    <p className="font-body text-sm text-white/60">
                      {cat.mastered} of {cat.total} mastered
                    </p>
                  </div>
                </div>
                <ProgressBar
                  value={cat.mastered}
                  max={cat.total}
                  color={cat.color}
                  size="sm"
                />
                <div className="flex justify-between mt-2 text-xs text-white/40">
                  <span>{cat.viewed} viewed</span>
                  <span>{cat.percentage}%</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Quizzes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-12"
      >
        <h2 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-neon-pink" />
          Recent Quizzes
        </h2>
        {recentQuizzes.length > 0 ? (
          <div className="space-y-3">
            {recentQuizzes.map((quiz, index) => {
              const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100);
              const category = CATEGORIES.find((c) => c.id === quiz.category);

              return (
                <Card key={index} padding="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                          w-12 h-12 rounded-lg flex items-center justify-center
                          ${percentage >= 80 ? 'bg-neon-green/20' : percentage >= 60 ? 'bg-neon-yellow/20' : 'bg-neon-red/20'}
                        `}
                      >
                        <span
                          className={`font-display font-bold ${
                            percentage >= 80 ? 'text-neon-green' : percentage >= 60 ? 'text-neon-yellow' : 'text-neon-red'
                          }`}
                        >
                          {percentage}%
                        </span>
                      </div>
                      <div>
                        <div className="font-body font-semibold text-white">
                          {quiz.score} / {quiz.totalQuestions} correct
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Badge color={category?.color || 'gray'} size="sm">
                            {category?.name || 'All Topics'}
                          </Badge>
                          <span>•</span>
                          <span>{new Date(quiz.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="text-center py-8">
            <p className="font-body text-white/60 mb-4">No quizzes taken yet</p>
            <Link to="/quiz">
              <Button variant="primary">Take Your First Quiz</Button>
            </Link>
          </Card>
        )}
      </motion.div>

      {/* Study Suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="font-display font-bold text-2xl text-white mb-6 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-neon-yellow" />
          Suggested Actions
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {stats.flashcardsNeedPractice > 0 && (
            <Link to="/flashcards">
              <Card glowColor="orange" className="h-full">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-neon-orange/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-neon-orange" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">
                      Practice Flashcards
                    </h3>
                    <p className="font-body text-sm text-white/60">
                      {stats.flashcardsNeedPractice} cards need review
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          {stats.topicsMastered < stats.totalTopics && (
            <Link to="/topics">
              <Card glowColor="cyan" className="h-full">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-neon-cyan" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-white">
                      Study Topics
                    </h3>
                    <p className="font-body text-sm text-white/60">
                      {stats.totalTopics - stats.topicsMastered} topics remaining
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          )}

          <Link to="/quiz">
            <Card glowColor="pink" className="h-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-neon-pink/20 flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white">
                    Take a Quiz
                  </h3>
                  <p className="font-body text-sm text-white/60">
                    Test your knowledge
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </motion.div>
    </PageLayout>
  );
}

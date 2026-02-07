import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, CheckCircle } from 'lucide-react';
import { PageLayout, PageHeader } from '../components/layout';
import { Card, Button, Badge, DifficultyBadge, ProgressBar } from '../components/common';
import { useProgress } from '../context/ProgressContext';
import { FPV_TOPICS, CATEGORIES, DIFFICULTY_LEVELS } from '../data/topics';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Topics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const { progress } = useProgress();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedDifficulty = searchParams.get('difficulty') || 'all';

  const filteredTopics = useMemo(() => {
    return FPV_TOPICS.filter((topic) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !topic.title.toLowerCase().includes(query) &&
          !topic.shortAnswer.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false;
      }

      // Difficulty filter
      if (selectedDifficulty !== 'all' && topic.difficulty !== selectedDifficulty) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleDifficultyChange = (difficulty) => {
    if (difficulty === 'all') {
      searchParams.delete('difficulty');
    } else {
      searchParams.set('difficulty', difficulty);
    }
    setSearchParams(searchParams);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Topics"
        subtitle="Deep dive into FPV drone technical knowledge"
        icon="📚"
      />

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-500 rounded-xl
                       font-body text-white placeholder-white/40
                       focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50
                       transition-all duration-200"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/60 font-body text-sm flex items-center gap-1">
              <Filter className="w-4 h-4" /> Category:
            </span>
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1 rounded-full text-sm font-body transition-all
                ${selectedCategory === 'all'
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                  : 'bg-dark-700 text-white/60 border border-dark-500 hover:border-dark-400'
                }`}
            >
              All
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3 py-1 rounded-full text-sm font-body transition-all flex items-center gap-1
                  ${selectedCategory === cat.id
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                    : 'bg-dark-700 text-white/60 border border-dark-500 hover:border-dark-400'
                  }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-white/60 font-body text-sm">Difficulty:</span>
            <button
              onClick={() => handleDifficultyChange('all')}
              className={`px-3 py-1 rounded-full text-sm font-body transition-all
                ${selectedDifficulty === 'all'
                  ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                  : 'bg-dark-700 text-white/60 border border-dark-500 hover:border-dark-400'
                }`}
            >
              All
            </button>
            {DIFFICULTY_LEVELS.map((diff) => (
              <button
                key={diff.id}
                onClick={() => handleDifficultyChange(diff.id)}
                className={`px-3 py-1 rounded-full text-sm font-body transition-all
                  ${selectedDifficulty === diff.id
                    ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/50'
                    : 'bg-dark-700 text-white/60 border border-dark-500 hover:border-dark-400'
                  }`}
              >
                {diff.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 font-body text-white/60">
        Showing {filteredTopics.length} of {FPV_TOPICS.length} topics
      </div>

      {/* Topics Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredTopics.map((topic) => {
          const category = CATEGORIES.find((c) => c.id === topic.category);
          const topicProgress = progress.topics[topic.id] || {};

          return (
            <motion.div key={topic.id} variants={itemVariants}>
              <Link to={`/topics/${topic.id}`}>
                <Card glowColor={category?.color || 'cyan'} className="h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{topic.icon}</span>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-white">
                          {topic.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge color={category?.color || 'gray'} size="sm">
                            {category?.name}
                          </Badge>
                          <DifficultyBadge difficulty={topic.difficulty} />
                        </div>
                      </div>
                    </div>
                    {topicProgress.mastered && (
                      <CheckCircle className="w-6 h-6 text-neon-green flex-shrink-0" />
                    )}
                  </div>

                  {/* Short Answer Preview */}
                  <p className="font-body text-sm text-white/60 mb-4 line-clamp-3">
                    {topic.shortAnswer}
                  </p>

                  {/* Progress */}
                  <div className="mt-auto">
                    <ProgressBar
                      value={topicProgress.mastered ? 100 : topicProgress.viewed ? 50 : 0}
                      max={100}
                      color={category?.color || 'cyan'}
                      size="sm"
                    />
                    <div className="flex justify-between mt-2 text-xs text-white/40">
                      <span>
                        {topicProgress.mastered
                          ? '✓ Mastered'
                          : topicProgress.viewed
                          ? 'In Progress'
                          : 'Not Started'}
                      </span>
                      <span>{topic.content.practiceQuestions.length} questions</span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* No Results */}
      {filteredTopics.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-display font-bold text-xl text-white mb-2">No topics found</h3>
          <p className="font-body text-white/60 mb-6">
            Try adjusting your search or filters
          </p>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchQuery('');
              setSearchParams({});
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </PageLayout>
  );
}

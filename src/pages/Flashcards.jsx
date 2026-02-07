import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Shuffle,
  Filter,
  Flag,
} from 'lucide-react';
import { PageLayout, PageHeader } from '../components/layout';
import { Card, Button, Badge, ProgressBar } from '../components/common';
import { useProgress } from '../context/ProgressContext';
import { FPV_TOPICS, CATEGORIES } from '../data/topics';

export default function Flashcards() {
  const { category } = useParams();
  const { progress, setFlashcardConfidence, getTopicProgress, toggleFlagTopic, isTopicFlagged } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [showNeedPracticeOnly, setShowNeedPracticeOnly] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);

  // Filter and optionally shuffle cards
  const cards = useMemo(() => {
    let filtered = [...FPV_TOPICS];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((t) => t.category === selectedCategory);
    }

    // Filter by "need practice" only
    if (showNeedPracticeOnly) {
      filtered = filtered.filter((t) => {
        const topicProgress = progress.topics[t.id];
        return !topicProgress?.flashcardConfidence || topicProgress.flashcardConfidence === 'practice';
      });
    }

    // Shuffle if enabled
    if (isShuffled) {
      filtered = filtered.sort(() => Math.random() - 0.5);
    }

    return filtered;
  }, [selectedCategory, showNeedPracticeOnly, isShuffled, progress.topics]);

  // Reset index when filters change
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory, showNeedPracticeOnly, isShuffled]);

  const currentCard = cards[currentIndex];
  const cardCategory = currentCard
    ? CATEGORIES.find((c) => c.id === currentCard.category)
    : null;

  const goToNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleConfidence = (confidence) => {
    if (currentCard) {
      setFlashcardConfidence(currentCard.id, confidence);
      goToNext();
    }
  };

  const shuffleCards = () => {
    setIsShuffled(!isShuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const resetProgress = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Stats
  const stats = useMemo(() => {
    const total = cards.length;
    const known = cards.filter((c) => progress.topics[c.id]?.flashcardConfidence === 'know').length;
    const needPractice = cards.filter(
      (c) => progress.topics[c.id]?.flashcardConfidence === 'practice'
    ).length;
    const notReviewed = total - known - needPractice;

    return { total, known, needPractice, notReviewed };
  }, [cards, progress.topics]);

  if (cards.length === 0) {
    return (
      <PageLayout>
        <PageHeader
          title="Flashcards"
          subtitle="Quick review with flip cards"
          icon="🎴"
        />
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">No Cards Found</h2>
          <p className="font-body text-white/60 mb-6">
            {showNeedPracticeOnly
              ? "Great job! You've mastered all the flashcards."
              : 'Try adjusting your filters.'}
          </p>
          <Button
            variant="primary"
            onClick={() => {
              setSelectedCategory('all');
              setShowNeedPracticeOnly(false);
            }}
          >
            Show All Cards
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader
        title="Flashcards"
        subtitle="Quick review with flip cards"
        icon="🎴"
      />

      {/* Filters and Controls */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/60" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-dark-700 border border-dark-500 rounded-lg px-3 py-2 font-body text-white
                       focus:outline-none focus:border-neon-cyan"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Need Practice Filter */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showNeedPracticeOnly}
            onChange={(e) => setShowNeedPracticeOnly(e.target.checked)}
            className="w-4 h-4 rounded border-dark-500 bg-dark-700 text-neon-cyan
                       focus:ring-neon-cyan focus:ring-offset-dark-900"
          />
          <span className="font-body text-white/70">Need Practice Only</span>
        </label>

        {/* Shuffle Button */}
        <Button
          variant={isShuffled ? 'primary' : 'ghost'}
          size="sm"
          onClick={shuffleCards}
          icon={<Shuffle className="w-4 h-4" />}
        >
          Shuffle
        </Button>

        {/* Reset Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={resetProgress}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Reset
        </Button>
      </div>

      {/* Progress Stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <Card padding="p-4" className="text-center">
          <div className="font-display font-bold text-2xl text-neon-green">{stats.known}</div>
          <div className="font-body text-sm text-white/60">Know It</div>
        </Card>
        <Card padding="p-4" className="text-center">
          <div className="font-display font-bold text-2xl text-neon-orange">{stats.needPractice}</div>
          <div className="font-body text-sm text-white/60">Need Practice</div>
        </Card>
        <Card padding="p-4" className="text-center">
          <div className="font-display font-bold text-2xl text-white/40">{stats.notReviewed}</div>
          <div className="font-body text-sm text-white/60">Not Reviewed</div>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2 text-sm font-body">
          <span className="text-white/60">Card {currentIndex + 1} of {cards.length}</span>
          <span className="text-neon-cyan">{Math.round(((currentIndex + 1) / cards.length) * 100)}%</span>
        </div>
        <ProgressBar value={currentIndex + 1} max={cards.length} color="gradient" />
      </div>

      {/* Flashcard */}
      <div className="flex justify-center mb-8">
        <div
          className="flip-card w-full max-w-2xl h-80 cursor-pointer perspective-1000"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front (Question) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <Card
                className="h-full flex flex-col items-center justify-center text-center relative"
                glowColor={cardCategory?.color || 'cyan'}
              >
                {/* Flag Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlagTopic(currentCard.id);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
                    isTopicFlagged(currentCard.id)
                      ? 'bg-neon-orange/20 text-neon-orange'
                      : 'bg-dark-700/50 text-white/40 hover:text-neon-orange'
                  }`}
                  title={isTopicFlagged(currentCard.id) ? 'Remove flag' : 'Flag for review'}
                >
                  <Flag className="w-5 h-5" />
                </button>
                <span className="text-5xl mb-4">{currentCard.icon}</span>
                <Badge color={cardCategory?.color || 'gray'} size="sm" className="mb-4">
                  {cardCategory?.name}
                </Badge>
                <h2 className="font-display font-bold text-2xl text-white mb-4">
                  {currentCard.title}
                </h2>
                <p className="font-body text-white/40 text-sm">
                  Click to reveal answer
                </p>
              </Card>
            </div>

            {/* Back (Answer) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <Card
                className="h-full flex flex-col items-center justify-center text-center overflow-y-auto relative"
                glowColor="green"
                padding="p-8"
              >
                {/* Flag Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlagTopic(currentCard.id);
                  }}
                  className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${
                    isTopicFlagged(currentCard.id)
                      ? 'bg-neon-orange/20 text-neon-orange'
                      : 'bg-dark-700/50 text-white/40 hover:text-neon-orange'
                  }`}
                  title={isTopicFlagged(currentCard.id) ? 'Remove flag' : 'Flag for review'}
                >
                  <Flag className="w-5 h-5" />
                </button>
                <p className="font-body text-lg text-white/90 leading-relaxed">
                  {currentCard.shortAnswer}
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Navigation and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={goToPrev}
            disabled={currentIndex === 0}
            icon={<ChevronLeft className="w-5 h-5" />}
          >
            Previous
          </Button>

          <Button
            variant="ghost"
            onClick={goToNext}
            disabled={currentIndex === cards.length - 1}
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {isFlipped && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <Button
              variant="danger"
              onClick={() => handleConfidence('practice')}
              icon={<ThumbsDown className="w-5 h-5" />}
            >
              Need Practice
            </Button>
            <Button
              variant="success"
              onClick={() => handleConfidence('know')}
              icon={<ThumbsUp className="w-5 h-5" />}
            >
              Know It!
            </Button>
          </motion.div>
        )}
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-12 text-center">
        <p className="font-body text-sm text-white/40">
          Tip: Click the card to flip it. Use the buttons to mark your confidence.
        </p>
      </div>

      {/* Link to Topic Detail */}
      {currentCard && (
        <div className="mt-8 text-center">
          <Link to={`/topics/${currentCard.id}`}>
            <Button variant="ghost" size="sm">
              View Full Topic →
            </Button>
          </Link>
        </div>
      )}
    </PageLayout>
  );
}

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flag,
  Play,
  Trash2,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';
import { PageLayout, PageHeader } from '../components/layout';
import { Card, Button, Badge, ProgressBar } from '../components/common';
import { useProgress } from '../context/ProgressContext';
import { FPV_TOPICS, CATEGORIES } from '../data/topics';

export default function FlaggedQuestions() {
  const {
    progress,
    toggleFlagQuestion,
    getFlaggedCounts,
    clearAllFlags,
  } = useProgress();

  const [practiceMode, setPracticeMode] = useState(false);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Get flagged questions (for quiz/mastery)
  const flaggedQuestions = useMemo(() => {
    return progress.flaggedItems.questions.map(questionId => {
      const [topicId, questionIndex] = questionId.split('_');
      const topic = FPV_TOPICS.find(t => t.id === topicId);
      if (!topic) return null;

      const question = topic.content.practiceQuestions[parseInt(questionIndex)];
      if (!question) return null;

      return {
        id: questionId,
        topicId,
        questionIndex: parseInt(questionIndex),
        topicTitle: topic.title,
        topicIcon: topic.icon,
        category: topic.category,
        question: question.q,
        answer: question.a,
      };
    }).filter(Boolean);
  }, [progress.flaggedItems.questions]);

  const counts = getFlaggedCounts();

  // Practice mode handlers
  const startPractice = () => {
    setPracticeMode(true);
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
  };

  const nextPracticeItem = () => {
    if (currentPracticeIndex < flaggedQuestions.length - 1) {
      setCurrentPracticeIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setPracticeMode(false);
    }
  };

  const removeFlagAndContinue = () => {
    const item = flaggedQuestions[currentPracticeIndex];
    toggleFlagQuestion(item.topicId, item.questionIndex);
    // Move to next, but account for the removed item
    if (currentPracticeIndex >= flaggedQuestions.length - 1) {
      setPracticeMode(false);
    } else {
      setShowAnswer(false);
    }
  };

  // Practice Mode UI
  if (practiceMode && flaggedQuestions.length > 0) {
    const currentItem = flaggedQuestions[currentPracticeIndex];
    const category = CATEGORIES.find(c => c.id === currentItem.category);

    return (
      <PageLayout>
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-white/60">
              {currentPracticeIndex + 1} of {flaggedQuestions.length} flagged items
            </span>
            <Button variant="ghost" size="sm" onClick={() => setPracticeMode(false)}>
              Exit Practice
            </Button>
          </div>
          <ProgressBar
            value={currentPracticeIndex + 1}
            max={flaggedQuestions.length}
            color="orange"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            {/* Item Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dark-500">
              <span className="text-3xl">{currentItem.topicIcon}</span>
              <div>
                <p className="font-body text-sm text-white/60">
                  {currentItem.topicTitle}
                </p>
                <Badge color={category?.color || 'gray'} size="sm">
                  {category?.name}
                </Badge>
              </div>
              <Flag className="w-5 h-5 text-neon-orange ml-auto" />
            </div>

            {/* Question */}
            <h2 className="font-display font-bold text-xl text-white mb-6">
              {currentItem.question}
            </h2>

            {/* Answer (shown when revealed) */}
            {showAnswer ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/30">
                  <p className="font-body text-sm text-white/80 leading-relaxed">
                    {currentItem.answer}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="success"
                    onClick={removeFlagAndContinue}
                    icon={<CheckCircle className="w-5 h-5" />}
                  >
                    Got It - Remove Flag
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={nextPracticeItem}
                  >
                    Keep Flagged & Continue
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={() => setShowAnswer(true)}
                >
                  Reveal Answer
                </Button>
              </div>
            )}
          </Card>
        </div>
      </PageLayout>
    );
  }

  // Empty State
  if (counts.total === 0) {
    return (
      <PageLayout>
        <PageHeader
          title="Flagged Questions"
          subtitle="Review items you've marked for practice"
          icon="🚩"
        />
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="font-display font-bold text-2xl text-white mb-2">
            No Flagged Items
          </h2>
          <p className="font-body text-white/60 mb-6 max-w-md mx-auto">
            Flag questions during Quiz or MasteryCheck to review them here.
            Questions you answer incorrectly are automatically flagged.
          </p>
          <Link to="/quiz">
            <Button variant="primary" icon={<HelpCircle className="w-5 h-5" />}>
              Take a Quiz
            </Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  // Main List View
  return (
    <PageLayout>
      <PageHeader
        title="Flagged Questions"
        subtitle={`${counts.total} items flagged for review`}
        icon="🚩"
      />

      {/* Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Button
          variant="primary"
          onClick={startPractice}
          icon={<Play className="w-4 h-4" />}
        >
          Practice All
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            if (window.confirm('Clear all flagged items?')) {
              clearAllFlags();
            }
          }}
          icon={<Trash2 className="w-4 h-4" />}
        >
          Clear All
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <Card padding="p-4" className="text-center inline-block">
          <div className="font-display font-bold text-2xl text-neon-orange">
            {counts.total}
          </div>
          <div className="font-body text-sm text-white/60">Flagged Questions</div>
        </Card>
      </div>

      {/* Flagged Items List */}
      <div className="space-y-3">
        {flaggedQuestions.map((item, index) => {
          const category = CATEGORIES.find(c => c.id === item.category);

          return (
            <motion.div
              key={`question-${item.topicId}_${item.questionIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card padding="p-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">
                    {item.topicIcon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge color={category?.color || 'gray'} size="sm">
                        {category?.name}
                      </Badge>
                    </div>
                    <p className="font-body text-white/90 line-clamp-2">
                      {item.question}
                    </p>
                    <p className="font-body text-sm text-white/40 mt-1">
                      From: {item.topicTitle}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFlagQuestion(item.topicId, item.questionIndex)}
                    className="p-2 rounded-lg bg-neon-orange/20 text-neon-orange
                               hover:bg-neon-orange/30 transition-all flex-shrink-0"
                    title="Remove flag"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </PageLayout>
  );
}

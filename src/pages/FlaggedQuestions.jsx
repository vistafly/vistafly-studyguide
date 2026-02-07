import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flag,
  Play,
  Trash2,
  ChevronRight,
  BookOpen,
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
    toggleFlagTopic,
    toggleFlagQuestion,
    isTopicFlagged,
    isQuestionFlagged,
    getFlaggedCounts,
    clearAllFlags,
  } = useProgress();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'topics', 'questions'
  const [practiceMode, setPracticeMode] = useState(false);
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Get flagged topics (for flashcards)
  const flaggedTopics = useMemo(() => {
    return FPV_TOPICS.filter(topic =>
      progress.flaggedItems.topics.includes(topic.id)
    );
  }, [progress.flaggedItems.topics]);

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

  // Combine all items for practice mode
  const allPracticeItems = useMemo(() => {
    const items = [];

    // Add topics as flashcard-style items
    flaggedTopics.forEach(topic => {
      items.push({
        type: 'topic',
        id: topic.id,
        topicId: topic.id,
        title: topic.title,
        icon: topic.icon,
        category: topic.category,
        question: topic.title,
        answer: topic.shortAnswer,
      });
    });

    // Add questions
    flaggedQuestions.forEach(q => {
      items.push({
        type: 'question',
        ...q,
      });
    });

    return items;
  }, [flaggedTopics, flaggedQuestions]);

  const filteredItems = useMemo(() => {
    if (activeTab === 'topics') return flaggedTopics.map(t => ({ type: 'topic', id: t.id, ...t }));
    if (activeTab === 'questions') return flaggedQuestions.map(q => ({ type: 'question', ...q }));
    return allPracticeItems;
  }, [activeTab, flaggedTopics, flaggedQuestions, allPracticeItems]);

  // Practice mode handlers
  const startPractice = () => {
    setPracticeMode(true);
    setCurrentPracticeIndex(0);
    setShowAnswer(false);
  };

  const nextPracticeItem = () => {
    if (currentPracticeIndex < allPracticeItems.length - 1) {
      setCurrentPracticeIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setPracticeMode(false);
    }
  };

  const removeFlagAndContinue = () => {
    const item = allPracticeItems[currentPracticeIndex];
    if (item.type === 'topic') {
      toggleFlagTopic(item.id);
    } else {
      toggleFlagQuestion(item.topicId, item.questionIndex);
    }
    // Move to next, but account for the removed item
    if (currentPracticeIndex >= allPracticeItems.length - 1) {
      setPracticeMode(false);
    } else {
      setShowAnswer(false);
    }
  };

  // Practice Mode UI
  if (practiceMode && allPracticeItems.length > 0) {
    const currentItem = allPracticeItems[currentPracticeIndex];
    const category = CATEGORIES.find(c => c.id === currentItem.category);

    return (
      <PageLayout>
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-white/60">
              {currentPracticeIndex + 1} of {allPracticeItems.length} flagged items
            </span>
            <Button variant="ghost" size="sm" onClick={() => setPracticeMode(false)}>
              Exit Practice
            </Button>
          </div>
          <ProgressBar
            value={currentPracticeIndex + 1}
            max={allPracticeItems.length}
            color="orange"
          />
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="mb-6">
            {/* Item Header */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-dark-500">
              <span className="text-3xl">{currentItem.icon || currentItem.topicIcon}</span>
              <div>
                <p className="font-body text-sm text-white/60">
                  {currentItem.type === 'topic' ? 'Flashcard' : currentItem.topicTitle}
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
            Flag questions during Quiz or MasteryCheck, or flag flashcards to review them here.
            Questions you answer incorrectly are automatically flagged.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/quiz">
              <Button variant="primary" icon={<HelpCircle className="w-5 h-5" />}>
                Take a Quiz
              </Button>
            </Link>
            <Link to="/flashcards">
              <Button variant="ghost" icon={<BookOpen className="w-5 h-5" />}>
                Study Flashcards
              </Button>
            </Link>
          </div>
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

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { id: 'all', label: `All (${counts.total})` },
          { id: 'topics', label: `Flashcards (${counts.topics})` },
          { id: 'questions', label: `Questions (${counts.questions})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-body font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-neon-orange/20 text-neon-orange border border-neon-orange'
                : 'bg-dark-700 text-white/60 border border-dark-500 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card padding="p-4" className="text-center">
          <div className="font-display font-bold text-2xl text-neon-orange">
            {counts.total}
          </div>
          <div className="font-body text-sm text-white/60">Total Flagged</div>
        </Card>
        <Card padding="p-4" className="text-center">
          <div className="font-display font-bold text-2xl text-neon-cyan">
            {counts.topics}
          </div>
          <div className="font-body text-sm text-white/60">Flashcards</div>
        </Card>
        <Card padding="p-4" className="text-center">
          <div className="font-display font-bold text-2xl text-neon-pink">
            {counts.questions}
          </div>
          <div className="font-body text-sm text-white/60">Questions</div>
        </Card>
      </div>

      {/* Flagged Items List */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => {
          const category = CATEGORIES.find(c => c.id === item.category);

          return (
            <motion.div
              key={item.type === 'topic' ? `topic-${item.id}` : `question-${item.topicId}_${item.questionIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card padding="p-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0">
                    {item.icon || item.topicIcon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge
                        color={item.type === 'topic' ? 'cyan' : 'pink'}
                        size="sm"
                      >
                        {item.type === 'topic' ? 'Flashcard' : 'Question'}
                      </Badge>
                      <Badge color={category?.color || 'gray'} size="sm">
                        {category?.name}
                      </Badge>
                    </div>
                    <p className="font-body text-white/90 line-clamp-2">
                      {item.question || item.title}
                    </p>
                    {item.type === 'question' && (
                      <p className="font-body text-sm text-white/40 mt-1">
                        From: {item.topicTitle}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (item.type === 'topic') {
                        toggleFlagTopic(item.id);
                      } else {
                        toggleFlagQuestion(item.topicId, item.questionIndex);
                      }
                    }}
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

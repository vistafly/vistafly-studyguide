import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronsDownUp,
  ChevronsUpDown,
  Lightbulb,
  MessageSquare,
  Target,
  BookOpen,
} from 'lucide-react';
import { PageLayout } from '../components/layout';
import { Card, Button, Badge, DifficultyBadge } from '../components/common';
import MasteryCheck from '../components/MasteryCheck';
import { useProgress } from '../context/ProgressContext';
import { FPV_TOPICS, CATEGORIES, getTopicById } from '../data/topics';

export default function TopicDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { markTopicViewed, markTopicMastered, getTopicProgress } = useProgress();

  const topic = getTopicById(id);
  const topicProgress = getTopicProgress(id);
  const category = topic ? CATEGORIES.find((c) => c.id === topic.category) : null;

  const [expandedSections, setExpandedSections] = useState({});
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const [showMasteryCheck, setShowMasteryCheck] = useState(false);

  // Mark as viewed when component mounts
  useEffect(() => {
    if (topic) {
      markTopicViewed(id);
    }
  }, [id, topic]);

  // Find next and previous topics
  const currentIndex = FPV_TOPICS.findIndex((t) => t.id === id);
  const prevTopic = currentIndex > 0 ? FPV_TOPICS[currentIndex - 1] : null;
  const nextTopic = currentIndex < FPV_TOPICS.length - 1 ? FPV_TOPICS[currentIndex + 1] : null;

  if (!topic) {
    return (
      <PageLayout>
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="font-display font-bold text-2xl text-white mb-4">Topic Not Found</h1>
          <Link to="/topics">
            <Button variant="primary">Back to Topics</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleQuestion = (index) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Check if all sections are expanded (default state is expanded, so undefined means expanded)
  const allSectionsExpanded = topic?.content?.sections?.every(
    (_, index) => expandedSections[index] !== false
  );

  // Check if all questions are expanded
  const allQuestionsExpanded = topic?.content?.practiceQuestions?.every(
    (_, index) => expandedQuestions[index] === true
  );

  // Collapse all sections and questions
  const collapseAll = () => {
    const collapsedSections = {};
    topic.content.sections.forEach((_, index) => {
      collapsedSections[index] = false;
    });
    setExpandedSections(collapsedSections);

    const collapsedQuestions = {};
    topic.content.practiceQuestions.forEach((_, index) => {
      collapsedQuestions[index] = false;
    });
    setExpandedQuestions(collapsedQuestions);
  };

  // Expand all sections and questions
  const expandAll = () => {
    const expandedSectionsState = {};
    topic.content.sections.forEach((_, index) => {
      expandedSectionsState[index] = true;
    });
    setExpandedSections(expandedSectionsState);

    const expandedQuestionsState = {};
    topic.content.practiceQuestions.forEach((_, index) => {
      expandedQuestionsState[index] = true;
    });
    setExpandedQuestions(expandedQuestionsState);
  };

  const isAllExpanded = allSectionsExpanded && allQuestionsExpanded;

  // Handle mastery check pass
  const handleMasteryPass = () => {
    markTopicMastered(id, true);
    setShowMasteryCheck(false);
  };

  const renderContent = (content) => {
    // Simple markdown-like rendering
    return content.split('\n').map((line, i) => {
      // Headers
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={i} className="font-display font-semibold text-neon-cyan mt-4 mb-2">
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      }

      // Bold text within line
      if (line.includes('**')) {
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="mb-2">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={j} className="text-neon-cyan">
                    {part.replace(/\*\*/g, '')}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      }

      // List items
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return (
          <li key={i} className="ml-4 mb-1 list-disc list-inside text-white/80">
            {line.substring(2)}
          </li>
        );
      }

      // Table rows (simple detection)
      if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').filter(Boolean).map((c) => c.trim());
        const isHeader = cells.every(c => c.includes('---')) || i === 0;

        if (cells.every(c => c.includes('---'))) return null;

        return (
          <tr key={i} className={isHeader ? 'bg-dark-600' : ''}>
            {cells.map((cell, j) => (
              <td
                key={j}
                className={`border border-dark-500 px-3 py-2 ${
                  isHeader ? 'font-semibold text-neon-cyan' : 'text-white/80'
                }`}
              >
                {cell}
              </td>
            ))}
          </tr>
        );
      }

      // Code block marker
      if (line.trim() === '') {
        return <div key={i} className="h-2" />;
      }

      // Regular paragraph
      return (
        <p key={i} className="mb-2 text-white/80">
          {line}
        </p>
      );
    });
  };

  return (
    <PageLayout>
      {/* Breadcrumb and Navigation */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <Link
          to="/topics"
          className="inline-flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body">Back to Topics</span>
        </Link>

        <div className="flex items-center gap-2">
          {prevTopic && (
            <Link to={`/topics/${prevTopic.id}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
            </Link>
          )}
          {nextTopic && (
            <Link to={`/topics/${nextTopic.id}`}>
              <Button variant="ghost" size="sm">
                Next
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{topic.icon}</span>
          <div className="flex-1">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-3">
              {topic.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <Badge color={category?.color || 'gray'} icon={category?.icon}>
                {category?.name}
              </Badge>
              <DifficultyBadge difficulty={topic.difficulty} />
              {topicProgress.mastered && (
                <Badge color="green" icon={<CheckCircle className="w-3 h-3" />}>
                  Mastered
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Quick Answer */}
        <Card glowColor={category?.color || 'cyan'} className="bg-dark-700/50">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-neon-yellow flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-display font-semibold text-neon-yellow text-sm mb-1">
                Quick Answer
              </h3>
              <p className="font-body text-white/90">{topic.shortAnswer}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview */}
          <Card>
            <h2 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-neon-cyan" />
              Overview
            </h2>
            <p className="font-body text-white/80 leading-relaxed">
              {topic.content.overview}
            </p>
          </Card>

          {/* Collapse/Expand All Button */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={isAllExpanded ? collapseAll : expandAll}
              icon={isAllExpanded ? <ChevronsDownUp className="w-4 h-4" /> : <ChevronsUpDown className="w-4 h-4" />}
            >
              {isAllExpanded ? 'Collapse All' : 'Expand All'}
            </Button>
          </div>

          {/* Sections */}
          {topic.content.sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h2 className="font-display font-bold text-xl text-white">
                    {section.title}
                  </h2>
                  <motion.div
                    animate={{ rotate: expandedSections[index] ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-6 h-6 text-neon-cyan" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedSections[index] !== false && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 font-body">
                        {renderContent(section.content)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}

          {/* Practice Questions */}
          <Card>
            <h2 className="font-display font-bold text-xl text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-neon-pink" />
              Practice Questions
            </h2>
            <div className="space-y-4">
              {topic.content.practiceQuestions.map((qa, index) => (
                <div key={index} className="border border-dark-500 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full p-4 flex items-start justify-between text-left bg-dark-700/50 hover:bg-dark-600/50 transition-colors"
                  >
                    <span className="font-body font-medium text-white pr-4">
                      Q: {qa.q}
                    </span>
                    <motion.div
                      animate={{ rotate: expandedQuestions[index] ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronRight className="w-5 h-5 text-neon-cyan" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedQuestions[index] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 bg-neon-green/5 border-t border-neon-green/20">
                          <p className="font-body text-white/80">
                            <span className="text-neon-green font-semibold">A: </span>
                            {qa.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Points */}
          <Card glowColor="green">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-neon-green" />
              Key Points to Remember
            </h3>
            <ul className="space-y-3">
              {topic.content.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-neon-green mt-1">•</span>
                  <span className="font-body text-sm text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Interview Tips */}
          <Card glowColor="yellow">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-neon-yellow" />
              Interview Tips
            </h3>
            <ul className="space-y-3">
              {topic.content.interviewTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-neon-yellow mt-1">💡</span>
                  <span className="font-body text-sm text-white/80">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Actions */}
          <Card>
            <h3 className="font-display font-bold text-lg text-white mb-4">
              Actions
            </h3>
            <div className="space-y-3">
              {topicProgress.mastered ? (
                <Button
                  variant="success"
                  className="w-full"
                  icon={<CheckCircle className="w-4 h-4" />}
                  disabled
                >
                  Mastered!
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => setShowMasteryCheck(true)}
                >
                  Take Mastery Check
                </Button>
              )}

              <Link to="/flashcards" className="block">
                <Button variant="secondary" className="w-full">
                  Practice Flashcards
                </Button>
              </Link>

              <Link to="/quiz" className="block">
                <Button variant="ghost" className="w-full">
                  Take a Quiz
                </Button>
              </Link>
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            {prevTopic && (
              <Link to={`/topics/${prevTopic.id}`}>
                <Card padding="p-3" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-white/40" />
                  <div className="min-w-0">
                    <p className="text-xs text-white/40">Previous</p>
                    <p className="font-body text-sm text-white truncate">{prevTopic.title}</p>
                  </div>
                </Card>
              </Link>
            )}
            {nextTopic && (
              <Link to={`/topics/${nextTopic.id}`}>
                <Card padding="p-3" className="flex items-center gap-2 justify-end text-right">
                  <div className="min-w-0">
                    <p className="text-xs text-white/40">Next</p>
                    <p className="font-body text-sm text-white truncate">{nextTopic.title}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </Card>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mastery Check Modal */}
      {showMasteryCheck && (
        <MasteryCheck
          topic={topic}
          onPass={handleMasteryPass}
          onClose={() => setShowMasteryCheck(false)}
        />
      )}
    </PageLayout>
  );
}

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  Trophy,
  RotateCcw,
  X,
  Brain,
  Target,
  Flag,
} from 'lucide-react';
import { Card, Button, Badge, ProgressBar } from './common';
import { FPV_TOPICS } from '../data/topics';
import { useProgress } from '../context/ProgressContext';

const PASSING_SCORE = 80; // Must get 80% to pass
const MAX_ANSWER_LENGTH = 400; // Truncate answers to this length for display

// Shuffle array helper
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Normalize answer length so correct answer doesn't stand out
function normalizeAnswer(answer) {
  if (answer.length <= MAX_ANSWER_LENGTH) {
    return answer;
  }
  // Find a good break point (end of sentence or phrase)
  let truncated = answer.substring(0, MAX_ANSWER_LENGTH);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastComma = truncated.lastIndexOf(',');
  const lastSpace = truncated.lastIndexOf(' ');

  // Prefer ending at a sentence, then comma, then space
  if (lastPeriod > MAX_ANSWER_LENGTH * 0.6) {
    truncated = truncated.substring(0, lastPeriod + 1);
  } else if (lastComma > MAX_ANSWER_LENGTH * 0.6) {
    truncated = truncated.substring(0, lastComma);
  } else if (lastSpace > MAX_ANSWER_LENGTH * 0.7) {
    truncated = truncated.substring(0, lastSpace) + '...';
  } else {
    truncated = truncated + '...';
  }

  return truncated;
}

// Get wrong answers - prioritize SAME TOPIC first, then same category
function getDistractors(correctAnswer, currentTopicId, currentTopicCategory, allQAPairs, count = 3) {
  const correctLength = correctAnswer.length;

  // First, try to get distractors from the SAME TOPIC (most relevant)
  const sameTopicAnswers = allQAPairs
    .filter((qa) => qa.topicId === currentTopicId && qa.answer !== correctAnswer)
    .map((qa) => qa.answer);

  // If we have enough from same topic, use those (shuffled)
  if (sameTopicAnswers.length >= count) {
    return shuffleArray(sameTopicAnswers).slice(0, count);
  }

  // Otherwise, we need to fill in with answers from same category
  const sameCategoryAnswers = allQAPairs
    .filter((qa) =>
      qa.category === currentTopicCategory &&
      qa.topicId !== currentTopicId &&
      qa.answer !== correctAnswer
    )
    .map((qa) => {
      const answerLength = qa.answer.length;
      // Score by length similarity
      const lengthRatio = Math.min(answerLength, correctLength) / Math.max(answerLength, correctLength);
      return { answer: qa.answer, score: lengthRatio + Math.random() * 0.3 };
    })
    .sort((a, b) => b.score - a.score)
    .map((qa) => qa.answer);

  // Combine: all same-topic answers first, then fill with same-category
  const combined = [...sameTopicAnswers];
  for (const answer of sameCategoryAnswers) {
    if (combined.length >= count) break;
    if (!combined.includes(answer)) {
      combined.push(answer);
    }
  }

  // If still not enough, pull from any topic (last resort)
  if (combined.length < count) {
    const otherAnswers = allQAPairs
      .filter((qa) =>
        qa.answer !== correctAnswer &&
        !combined.includes(qa.answer)
      )
      .map((qa) => {
        const answerLength = qa.answer.length;
        const lengthRatio = Math.min(answerLength, correctLength) / Math.max(answerLength, correctLength);
        return { answer: qa.answer, score: lengthRatio + Math.random() * 0.3 };
      })
      .sort((a, b) => b.score - a.score)
      .map((qa) => qa.answer);

    for (const answer of otherAnswers) {
      if (combined.length >= count) break;
      combined.push(answer);
    }
  }

  return shuffleArray(combined).slice(0, count);
}

export default function MasteryCheck({ topic, onPass, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const { toggleFlagQuestion, autoFlagQuestion, isQuestionFlagged } = useProgress();

  // Collect all Q&A pairs from all topics with metadata
  const allQAPairs = useMemo(() => {
    const pairs = [];
    FPV_TOPICS.forEach((t) => {
      t.content.practiceQuestions.forEach((qa) => {
        pairs.push({
          question: qa.q,
          answer: qa.a,
          category: t.category,
          topicId: t.id,
        });
      });
    });
    return pairs;
  }, []);

  // Generate quiz questions with multiple choice options
  const questions = useMemo(() => {
    return topic.content.practiceQuestions.map((qa, index) => {
      const distractors = getDistractors(qa.a, topic.id, topic.category, allQAPairs, 3);

      // Normalize all answers to similar length so correct one doesn't stand out
      const normalizedCorrect = normalizeAnswer(qa.a);
      const normalizedDistractors = distractors.map(normalizeAnswer);

      const options = shuffleArray([normalizedCorrect, ...normalizedDistractors]);

      return {
        id: index,
        question: qa.q,
        correctAnswer: normalizedCorrect,
        fullAnswer: qa.a, // Keep full answer for review
        options: options,
      };
    });
  }, [topic, allQAPairs]);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (answer) => {
    if (hasAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Auto-flag incorrect answers
    if (!isCorrect) {
      autoFlagQuestion(topic.id, currentQuestion.id);
    }

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selected: selectedAnswer,
        correct: currentQuestion.correctAnswer,
        isCorrect,
      },
    }));
    setHasAnswered(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setQuizComplete(true);
    }
  };

  const restartCheck = () => {
    setCurrentIndex(0);
    setAnswers({});
    setSelectedAnswer(null);
    setHasAnswered(false);
    setQuizComplete(false);
  };

  // Calculate results
  const results = useMemo(() => {
    if (!quizComplete) return null;

    const correct = Object.values(answers).filter((a) => a.isCorrect).length;
    const incorrect = Object.values(answers).filter((a) => !a.isCorrect).length;
    const total = questions.length;
    const score = Math.round((correct / total) * 100);
    const passed = score >= PASSING_SCORE;

    return { correct, incorrect, total, score, passed };
  }, [answers, questions.length, quizComplete]);

  // Results Screen
  if (quizComplete && results) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-dark-900/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-lg"
        >
          <Card className="relative">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center py-4">
              {/* Result Icon */}
              <div className="text-6xl mb-4">
                {results.passed ? '🏆' : '📚'}
              </div>

              <h2 className="font-display font-bold text-2xl text-white mb-2">
                {results.passed ? 'Mastery Achieved!' : 'Keep Studying'}
              </h2>

              <p className="font-body text-white/60 mb-6">
                {results.passed
                  ? "Excellent! You've demonstrated understanding of this topic."
                  : `You need ${PASSING_SCORE}% to master this topic. Review the material and try again.`}
              </p>

              {/* Score Display */}
              <div className="mb-6">
                <div
                  className={`
                    inline-flex items-center justify-center w-24 h-24 rounded-full
                    ${results.passed ? 'bg-neon-green/20 border-2 border-neon-green' : 'bg-neon-orange/20 border-2 border-neon-orange'}
                  `}
                >
                  <span
                    className={`font-display font-bold text-3xl ${results.passed ? 'text-neon-green' : 'text-neon-orange'}`}
                  >
                    {results.score}%
                  </span>
                </div>
              </div>

              {/* Results Breakdown */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-dark-700 rounded-lg p-4">
                  <div className="font-display font-bold text-2xl text-neon-green">
                    {results.correct}
                  </div>
                  <div className="font-body text-sm text-white/60">Correct</div>
                </div>
                <div className="bg-dark-700 rounded-lg p-4">
                  <div className="font-display font-bold text-2xl text-neon-red">
                    {results.incorrect}
                  </div>
                  <div className="font-body text-sm text-white/60">Incorrect</div>
                </div>
              </div>

              {/* Passing threshold info */}
              <div className="mb-6 p-3 bg-dark-700 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Passing Score</span>
                  <span className="text-neon-cyan font-semibold">{PASSING_SCORE}%</span>
                </div>
                <ProgressBar
                  value={results.score}
                  max={100}
                  color={results.passed ? 'green' : 'orange'}
                  className="mt-2"
                />
              </div>

              {/* Missed Questions Review */}
              {results.incorrect > 0 && (
                <div className="mb-6 text-left">
                  <h3 className="font-display font-semibold text-white mb-3">
                    Review These:
                  </h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {Object.entries(answers)
                      .filter(([_, a]) => !a.isCorrect)
                      .map(([idx, _]) => (
                        <div
                          key={idx}
                          className="bg-neon-red/10 border border-neon-red/20 rounded-lg p-2"
                        >
                          <p className="font-body text-sm text-white/80">
                            {questions[parseInt(idx)].question}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3">
                {results.passed ? (
                  <Button
                    variant="success"
                    className="w-full"
                    onClick={() => onPass()}
                    icon={<Trophy className="w-5 h-5" />}
                  >
                    Claim Mastery Badge
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={restartCheck}
                    icon={<RotateCcw className="w-5 h-5" />}
                  >
                    Try Again
                  </Button>
                )}
                <Button variant="ghost" className="w-full" onClick={onClose}>
                  {results.passed ? 'Close' : 'Review Material First'}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    );
  }

  // Quiz Screen
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-dark-900/95 z-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-3xl my-8"
      >
        <Card className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-neon-cyan/20 flex items-center justify-center">
                <Brain className="w-5 h-5 text-neon-cyan" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg text-white">
                  Mastery Check
                </h2>
                <p className="font-body text-sm text-white/60">
                  Score {PASSING_SCORE}%+ to master this topic
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/60">
                Question {currentIndex + 1} of {questions.length}
              </span>
              <Badge color="cyan" size="sm">
                {topic.title}
              </Badge>
            </div>
            <ProgressBar
              value={currentIndex + 1}
              max={questions.length}
              color="gradient"
            />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-6">
                  <Target className="w-5 h-5 text-neon-pink flex-shrink-0 mt-1" />
                  <h3 className="font-display font-semibold text-lg text-white flex-1">
                    {currentQuestion.question}
                  </h3>
                  {/* Flag Button */}
                  <button
                    onClick={() => toggleFlagQuestion(topic.id, currentQuestion.id)}
                    className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                      isQuestionFlagged(topic.id, currentQuestion.id)
                        ? 'bg-neon-orange/20 text-neon-orange'
                        : 'bg-dark-700 text-white/40 hover:text-neon-orange'
                    }`}
                    title={isQuestionFlagged(topic.id, currentQuestion.id)
                      ? 'Remove flag'
                      : 'Flag for review'}
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentQuestion.correctAnswer;

                    let optionStyle = 'border-dark-500 hover:border-neon-cyan/50';
                    let iconElement = null;

                    if (hasAnswered) {
                      if (isCorrect) {
                        optionStyle = 'border-neon-green bg-neon-green/10';
                        iconElement = <CheckCircle className="w-5 h-5 text-neon-green flex-shrink-0" />;
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-neon-red bg-neon-red/10';
                        iconElement = <XCircle className="w-5 h-5 text-neon-red flex-shrink-0" />;
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-neon-cyan bg-neon-cyan/10';
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectAnswer(option)}
                        disabled={hasAnswered}
                        className={`
                          w-full p-4 rounded-lg border-2 text-left transition-all
                          ${optionStyle}
                          ${!hasAnswered && !isSelected ? 'hover:bg-dark-600/50' : ''}
                          ${hasAnswered ? 'cursor-default' : 'cursor-pointer'}
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`
                              w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5
                              ${isSelected && !hasAnswered ? 'border-neon-cyan bg-neon-cyan' : 'border-dark-400'}
                              ${hasAnswered && isCorrect ? 'border-neon-green bg-neon-green' : ''}
                              ${hasAnswered && isSelected && !isCorrect ? 'border-neon-red bg-neon-red' : ''}
                            `}
                          >
                            {(isSelected && !hasAnswered) && (
                              <div className="w-2 h-2 rounded-full bg-dark-900" />
                            )}
                            {hasAnswered && isCorrect && (
                              <CheckCircle className="w-4 h-4 text-dark-900" />
                            )}
                            {hasAnswered && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-dark-900" />
                            )}
                          </div>
                          <span
                            className={`
                              font-body text-sm leading-relaxed
                              ${hasAnswered && isCorrect ? 'text-neon-green' : ''}
                              ${hasAnswered && isSelected && !isCorrect ? 'text-neon-red' : ''}
                              ${!hasAnswered ? 'text-white/80' : 'text-white/60'}
                            `}
                          >
                            {option}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Submit / Next Button */}
                <div className="mt-6">
                  {!hasAnswered ? (
                    <div className="flex justify-center">
                      <Button
                        variant="primary"
                        onClick={handleSubmitAnswer}
                        disabled={!selectedAnswer}
                      >
                        Submit Answer
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-4">
                        {answers[currentIndex]?.isCorrect ? (
                          <Badge color="green" size="lg">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Correct!
                          </Badge>
                        ) : (
                          <Badge color="red" size="lg">
                            <XCircle className="w-4 h-4 mr-1" />
                            Incorrect
                          </Badge>
                        )}
                      </div>

                      {/* Show full explanation */}
                      <div className="bg-dark-700/50 border border-dark-500 rounded-lg p-4 mb-4">
                        <p className="font-body text-xs text-neon-cyan mb-2 uppercase tracking-wide">
                          Full Explanation:
                        </p>
                        <p className="font-body text-sm text-white/80 leading-relaxed">
                          {currentQuestion.fullAnswer}
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <Button
                          variant="primary"
                          onClick={nextQuestion}
                          icon={<ChevronRight className="w-5 h-5" />}
                        >
                          {currentIndex < questions.length - 1
                            ? 'Next Question'
                            : 'See Results'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 pt-4 border-t border-dark-500">
            {questions.map((_, index) => {
              const answer = answers[index];
              let dotColor = 'bg-dark-500';
              if (answer) {
                dotColor = answer.isCorrect ? 'bg-neon-green' : 'bg-neon-red';
              } else if (index === currentIndex) {
                dotColor = 'bg-neon-cyan';
              }

              return (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${dotColor}`}
                />
              );
            })}
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

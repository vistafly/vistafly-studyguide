import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, RotateCcw, Check, X, AlertTriangle } from 'lucide-react';
import { Card, Button } from '../common';
import { formatHoverTime } from '../../utils/hoverTimeEstimator';
import {
  getGrade,
  GRADE_COLORS,
  GRADE_MESSAGES,
} from '../../data/interviewQuestions';
import { getDroneSize } from '../../data/droneSizes';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function InterviewResults({ results, questions, selectedSize, onTryAgain }) {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const { userEstimate, optimalEstimate, correctCount, totalQuestions, answers } =
    results;
  const grade = getGrade(correctCount, totalQuestions);
  const gradeColor = GRADE_COLORS[grade] || 'neon-cyan';
  const scorePct = Math.round((correctCount / totalQuestions) * 100);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="font-display font-bold text-2xl text-white mb-1">
          Interview Results
        </h1>
        <p className="font-body text-white/60">
          {selectedSize
            ? `${getDroneSize(selectedSize).name} hover build — here's how your physics knowledge stacks up`
            : "Here's how your physics knowledge stacks up"}
        </p>
      </motion.div>

      {/* Score Hero */}
      <motion.div variants={itemVariants}>
        <Card className="text-center mb-8" glowColor={gradeColor}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Grade */}
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className={`inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-${gradeColor} mb-2`}
              >
                <span
                  className={`font-display font-bold text-5xl text-${gradeColor}`}
                >
                  {grade}
                </span>
              </motion.div>
              <p className="font-body text-white/60">Grade</p>
            </div>

            {/* Hover Time Comparison */}
            <div>
              <div className="mb-3">
                <p className="font-body text-sm text-white/50 mb-1">
                  Your Build's Est. Hover
                </p>
                <span className="font-display font-bold text-3xl text-white">
                  {formatHoverTime(userEstimate.hoverTimeMinutes)}
                </span>
              </div>
              <div>
                <p className="font-body text-sm text-white/50 mb-1">
                  Optimal Hover Time
                </p>
                <span className="font-display font-bold text-3xl text-neon-green">
                  {formatHoverTime(optimalEstimate.hoverTimeMinutes)}
                </span>
              </div>
            </div>

            {/* Score */}
            <div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span
                  className={`font-display font-bold text-5xl text-${gradeColor}`}
                >
                  {correctCount}/{totalQuestions}
                </span>
              </motion.div>
              <p className="font-body text-white/60">Correct Answers</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-dark-500">
            <p className="font-body text-white/60">
              {GRADE_MESSAGES[grade]}
            </p>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
      >
        <StatCard
          label="Est. Weight"
          yours={`${userEstimate.totalWeight}g`}
          optimal={`${optimalEstimate.totalWeight}g`}
          isBetter={userEstimate.totalWeight <= optimalEstimate.totalWeight}
        />
        <StatCard
          label="Power Draw"
          yours={`${userEstimate.powerDraw}W`}
          optimal={`${optimalEstimate.powerDraw}W`}
          isBetter={userEstimate.powerDraw <= optimalEstimate.powerDraw}
        />
        <StatCard
          label="Efficiency"
          yours={`${userEstimate.efficiency}%`}
          optimal={`${optimalEstimate.efficiency}%`}
          isBetter={userEstimate.efficiency >= optimalEstimate.efficiency}
        />
        <StatCard
          label="Battery Energy"
          yours={`${userEstimate.batteryEnergy}Wh`}
          optimal={`${optimalEstimate.batteryEnergy}Wh`}
          isBetter={userEstimate.batteryEnergy >= optimalEstimate.batteryEnergy}
        />
      </motion.div>

      {/* Per-Question Review */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="font-display font-bold text-xl text-white mb-4">
          Question-by-Question Review
        </h2>

        <div className="space-y-3">
          {questions.map((question) => {
            const answer = answers[question.id];
            if (!answer) return null;

            const isExpanded = expandedQuestion === question.id;

            return (
              <QuestionReview
                key={question.id}
                question={question}
                answer={answer}
                isExpanded={isExpanded}
                onToggle={() =>
                  setExpandedQuestion(isExpanded ? null : question.id)
                }
              />
            );
          })}
        </div>
      </motion.div>

      {/* Try Again */}
      <motion.div variants={itemVariants} className="text-center">
        <Button
          variant="primary"
          size="lg"
          onClick={onTryAgain}
          icon={<RotateCcw className="w-5 h-5" />}
        >
          Try Again
        </Button>
      </motion.div>
    </motion.div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────

function StatCard({ label, yours, optimal, isBetter }) {
  return (
    <Card padding="p-3" className="text-center">
      <p className="font-body text-xs text-white/50 mb-2">{label}</p>
      <div className="mb-1">
        <span
          className={`font-mono text-sm ${
            isBetter ? 'text-neon-green' : 'text-neon-orange'
          }`}
        >
          {yours}
        </span>
      </div>
      <div className="text-xs text-white/40">
        optimal: <span className="text-white/60">{optimal}</span>
      </div>
    </Card>
  );
}

// ── Question Review Accordion ─────────────────────────────────────────────

function QuestionReview({ question, answer, isExpanded, onToggle }) {
  const correctOption = question.options.find(
    (o) => o.id === question.correctAnswer
  );
  const userOption = question.options.find(
    (o) => o.id === answer.selectedOption
  );

  // Three states: correct, partial (right option + weak reasoning), incorrect
  const isPartial = answer.optionCorrect && !answer.reasoningAdequate;

  const borderColor = answer.isCorrect
    ? 'border-neon-green/40 bg-neon-green/5'
    : isPartial
    ? 'border-neon-yellow/40 bg-neon-yellow/5'
    : 'border-neon-orange/40 bg-neon-orange/5';

  return (
    <div
      className={`rounded-xl border-2 overflow-hidden transition-all duration-300 ${borderColor}`}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              answer.isCorrect
                ? 'bg-neon-green/20'
                : isPartial
                ? 'bg-neon-yellow/20'
                : 'bg-neon-orange/20'
            }`}
          >
            {answer.isCorrect ? (
              <Check className="w-5 h-5 text-neon-green" />
            ) : isPartial ? (
              <AlertTriangle className="w-5 h-5 text-neon-yellow" />
            ) : (
              <X className="w-5 h-5 text-neon-orange" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span>{question.icon}</span>
              <span className="font-display font-semibold text-white">
                {question.category}
              </span>
            </div>
            <p className="font-body text-sm text-white/50">
              {userOption?.label || 'No answer'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {answer.isCorrect ? (
            <span className="font-body text-sm text-neon-green">Correct</span>
          ) : isPartial ? (
            <span className="font-body text-sm text-neon-yellow">
              Weak Reasoning
            </span>
          ) : (
            <span className="font-body text-sm text-neon-orange">
              Incorrect
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-white/50" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white/50" />
          )}
        </div>
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="px-4 pb-4"
        >
          <div className="border-t border-dark-500 pt-4">
            {/* Your Choice vs Correct */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div
                className={`p-3 rounded-lg ${
                  answer.optionCorrect
                    ? 'bg-neon-green/10 border border-neon-green/30'
                    : 'bg-dark-800 border border-dark-500'
                }`}
              >
                <p className="font-body text-xs text-white/50 mb-1">
                  Your Answer
                </p>
                <p className="font-display font-semibold text-white text-sm">
                  {userOption?.label}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neon-green/10 border border-neon-green/30">
                <p className="font-body text-xs text-neon-green/70 mb-1">
                  Correct Answer
                </p>
                <p className="font-display font-semibold text-neon-green text-sm">
                  {correctOption?.label}
                </p>
              </div>
            </div>

            {/* Your Reasoning */}
            {answer.reasoning && (
              <div className="p-3 bg-dark-800 rounded-lg border border-dark-500 mb-4">
                <p className="font-body text-xs text-white/40 mb-1">
                  Your Reasoning
                </p>
                <p className="font-body text-sm text-white/70 leading-relaxed italic">
                  "{answer.reasoning}"
                </p>
              </div>
            )}

            {/* Concept Coverage (for correct option selections) */}
            {answer.optionCorrect && answer.matchedConcepts && (
              <div className="p-3 bg-dark-800 rounded-lg border border-dark-500 mb-4">
                {/* Missed concepts — readable list with hints */}
                {answer.missedConcepts?.length > 0 && (
                  <div className="mb-3">
                    <p className="font-body text-sm text-neon-orange mb-2">
                      Should have mentioned:
                    </p>
                    <div className="space-y-2">
                      {answer.missedConcepts.map((concept) => (
                        <div
                          key={concept.name || concept}
                          className="flex items-start gap-2 p-2 rounded-lg bg-neon-orange/5 border border-neon-orange/20"
                        >
                          <X className="w-3.5 h-3.5 text-neon-orange flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-display font-semibold text-xs text-white">
                              {concept.name || concept}
                            </span>
                            {concept.hint && (
                              <p className="font-body text-xs text-white/50 mt-0.5">
                                {concept.hint}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched concepts — compact badges */}
                {answer.matchedConcepts.length > 0 && (
                  <div>
                    <p className="font-body text-xs text-white/40 mb-2">
                      Concepts covered:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {answer.matchedConcepts.map((concept) => (
                        <span
                          key={concept.name || concept}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-body bg-neon-green/10 text-neon-green border border-neon-green/30"
                        >
                          <Check className="w-3 h-3" />
                          {concept.name || concept}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Physics Explanation */}
            <div className="p-3 bg-dark-800 rounded-lg border border-neon-cyan/20">
              <p className="font-body text-xs text-neon-cyan/60 mb-1">
                The Physics
              </p>
              <p className="font-body text-sm text-white/80 leading-relaxed">
                {question.explanation}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import PageLayout, { PageHeader } from '../components/layout/PageLayout';
import { Button, Card, ProgressBar } from '../components/common';
import { QuestionCard, InterviewResults } from '../components/simulator';
import { getQuestionsForSize } from '../data/interviewQuestions';
import { DRONE_SIZE_LIST, getDroneSize } from '../data/droneSizes';
import {
  estimateHoverTime,
  getOptimalHoverTime,
} from '../utils/hoverTimeEstimator';

export default function BuildSimulator() {
  // State machine: 'intro' | 'interview' | 'results'
  const [phase, setPhase] = useState('intro');
  const [selectedSize, setSelectedSize] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});  // questionId → { selectedOption, reasoning, isCorrect, ... }
  const [results, setResults] = useState(null);

  const questions = selectedSize ? getQuestionsForSize(selectedSize) : [];
  const currentQuestion = questions[questionIndex];
  const totalQuestions = questions.length;

  // Handle answer submission for a single question
  const handleSubmitAnswer = useCallback((answerData) => {
    setAnswers((prev) => ({
      ...prev,
      [answerData.questionId]: answerData,
    }));
  }, []);

  // Move to next question or results
  const handleNextQuestion = useCallback(() => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      // All questions answered — calculate results
      const answerSelections = {};
      const allAnswers = { ...answers };
      for (const q of questions) {
        const ans = allAnswers[q.id];
        if (ans) answerSelections[q.id] = ans.selectedOption;
      }

      const userEstimate = estimateHoverTime(answerSelections, selectedSize);
      const optimalEstimate = getOptimalHoverTime(selectedSize);
      const correctCount = Object.values(allAnswers).filter(
        (a) => a.isCorrect
      ).length;

      setResults({
        userEstimate,
        optimalEstimate,
        correctCount,
        totalQuestions,
        answers: allAnswers,
      });
      setPhase('results');
    }
  }, [questionIndex, totalQuestions, answers, questions, selectedSize]);

  // Start interview with chosen size
  const handleStart = (sizeId) => {
    setSelectedSize(sizeId);
    setPhase('interview');
    setQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  // Return to intro (size selection)
  const handleTryAgain = () => {
    setPhase('intro');
    setSelectedSize(null);
    setQuestionIndex(0);
    setAnswers({});
    setResults(null);
  };

  // Progress: count answered questions
  const answeredCount = Object.keys(answers).length;

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <IntroScreen key="intro" onStart={handleStart} />
        )}

        {phase === 'interview' && currentQuestion && (
          <motion.div
            key={`interview-${questionIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-body text-sm text-white/50">
                  {getDroneSize(selectedSize).label} Build — Progress
                </span>
                <span className="font-display font-bold text-neon-cyan">
                  {answeredCount}/{totalQuestions}
                </span>
              </div>
              <ProgressBar
                progress={(answeredCount / totalQuestions) * 100}
                color="cyan"
              />
            </div>

            {/* Current Question */}
            <QuestionCard
              question={currentQuestion}
              questions={questions}
              questionIndex={questionIndex}
              totalQuestions={totalQuestions}
              onSubmitAnswer={handleSubmitAnswer}
              onNextQuestion={handleNextQuestion}
              isLastQuestion={questionIndex === totalQuestions - 1}
            />
          </motion.div>
        )}

        {phase === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <InterviewResults
              results={results}
              questions={questions}
              selectedSize={selectedSize}
              onTryAgain={handleTryAgain}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
}

// ── Intro Screen ──────────────────────────────────────────────────────────

function IntroScreen({ onStart }) {
  const [pickedSize, setPickedSize] = useState(null);

  const sizeConfig = pickedSize ? getDroneSize(pickedSize) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <PageHeader
        title="Build Simulator"
        subtitle="Interview prep — demonstrate your understanding of drone efficiency physics"
        icon="🛠️"
      />

      <Card className="text-center mb-8" glowColor="cyan">
        <div className="text-6xl mb-4">🚁</div>
        <h2 className="font-display font-bold text-2xl text-white mb-3">
          The Interview Question
        </h2>
        <p className="font-body text-lg text-white/80 max-w-2xl mx-auto mb-4 italic">
          {pickedSize
            ? `"Build a ${sizeConfig.inches}-inch drone for the longest hover possible. Walk me through your design decisions."`
            : '"Build a drone for the longest hover possible. Walk me through your design decisions."'}
        </p>
        <p className="font-body text-white/60 max-w-xl mx-auto">
          {pickedSize
            ? `You'll answer 9 physics-based design questions for a ${sizeConfig.label} build. Select your answer and explain why — just like defending your choices in the interview.`
            : 'First, pick your drone size below. Different sizes require different motor, stator, and pitch choices — the physics changes.'}
        </p>
      </Card>

      {/* Size Selection */}
      <div className="mb-8">
        <h3 className="font-display font-semibold text-lg text-white mb-4 text-center">
          Choose Your Drone Size
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DRONE_SIZE_LIST.map((size) => {
            const isSelected = pickedSize === size.id;
            return (
              <Card
                key={size.id}
                glowColor={isSelected ? 'cyan' : undefined}
                padding="p-4"
                onClick={() => setPickedSize(size.id)}
                className={
                  isSelected
                    ? 'ring-2 ring-neon-cyan shadow-[0_0_20px_rgba(0,255,247,0.2)]'
                    : ''
                }
              >
                <div className="text-3xl mb-2">{size.icon}</div>
                <h4 className="font-display font-semibold text-white mb-1">
                  {size.name}
                </h4>
                <p className="font-body text-xs text-white/50">
                  {size.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card glowColor="cyan" padding="p-4">
          <div className="text-2xl mb-2">📏</div>
          <h4 className="font-display font-semibold text-white mb-1">
            {sizeConfig ? `${sizeConfig.name} Hover Drone` : 'Size Matters'}
          </h4>
          <p className="font-body text-sm text-white/60">
            {sizeConfig
              ? `${sizeConfig.description} Every parameter choice affects hover endurance.`
              : 'Different sizes need different motors, stators, and pitch. The physics principles change.'}
          </p>
        </Card>

        <Card glowColor="pink" padding="p-4">
          <div className="text-2xl mb-2">🧠</div>
          <h4 className="font-display font-semibold text-white mb-1">
            Explain Your Reasoning
          </h4>
          <p className="font-body text-sm text-white/60">
            Don't just pick — articulate the physics. This is what
            interviewers actually evaluate.
          </p>
        </Card>

        <Card glowColor="green" padding="p-4">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-display font-semibold text-white mb-1">
            Learn From Feedback
          </h4>
          <p className="font-body text-sm text-white/60">
            After each answer, see the full physics explanation and compare
            it to your reasoning.
          </p>
        </Card>
      </div>

      <div className="text-center">
        <Button
          variant="primary"
          size="lg"
          icon={<Play className="w-5 h-5" />}
          onClick={() => onStart(pickedSize)}
          disabled={!pickedSize}
        >
          Start Interview
        </Button>
      </div>
    </motion.div>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Send, AlertTriangle } from 'lucide-react';
import { Card, Button } from '../common';
import { validateReasoning } from '../../data/interviewQuestions';

/**
 * QuestionCard — displays one interview question with:
 *  - Unanswered state: options + reasoning textarea + submit button
 *  - Revealed state: correct/incorrect badge, explanation, concept feedback
 */
export default function QuestionCard({
  question,
  questions,
  questionIndex,
  totalQuestions,
  onSubmitAnswer,
  onNextQuestion,
  isLastQuestion,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [reasoning, setReasoning] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [validationResult, setValidationResult] = useState(null);

  const optionCorrect = selectedOption === question.correctAnswer;
  const isCorrect = validationResult
    ? optionCorrect && validationResult.adequate
    : false;
  const canSubmit = selectedOption !== null && reasoning.trim().length > 0;

  const handleSubmit = () => {
    const result = validateReasoning(question.id, reasoning.trim(), questions);
    setValidationResult(result);
    setIsRevealed(true);
    onSubmitAnswer({
      questionId: question.id,
      selectedOption,
      reasoning: reasoning.trim(),
      isCorrect: optionCorrect && result.adequate,
      optionCorrect,
      reasoningAdequate: result.adequate,
      matchedConcepts: result.matchedConcepts,
      missedConcepts: result.missedConcepts,
    });
  };

  const correctOption = question.options.find(
    (o) => o.id === question.correctAnswer
  );

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3 }}
    >
      {/* Question Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{question.icon}</span>
          <span className="font-body text-sm text-white/40">
            Question {questionIndex + 1} of {totalQuestions}
          </span>
          <span className="font-body text-xs px-2 py-0.5 rounded-full bg-dark-600 text-white/50 border border-dark-500">
            {question.category}
          </span>
        </div>
        <h2 className="font-display font-bold text-xl md:text-2xl text-white">
          {question.question}
        </h2>
        <p className="font-body text-white/50 mt-2 text-sm leading-relaxed">
          {question.context}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((option) => {
          let optionStyle;
          if (isRevealed) {
            if (option.id === question.correctAnswer) {
              optionStyle =
                'border-neon-green bg-neon-green/10 shadow-[0_0_15px_rgba(57,255,20,0.15)]';
            } else if (
              option.id === selectedOption &&
              option.id !== question.correctAnswer
            ) {
              optionStyle =
                'border-neon-red/60 bg-neon-red/10';
            } else {
              optionStyle = 'border-dark-500 bg-dark-800 opacity-50';
            }
          } else if (option.id === selectedOption) {
            optionStyle =
              'border-neon-cyan bg-neon-cyan/10 shadow-[0_0_15px_rgba(0,255,247,0.15)]';
          } else {
            optionStyle =
              'border-dark-500 bg-gradient-to-r from-dark-800 to-dark-700 hover:border-dark-400';
          }

          return (
            <motion.button
              key={option.id}
              onClick={() => !isRevealed && setSelectedOption(option.id)}
              disabled={isRevealed}
              whileHover={!isRevealed ? { x: 4 } : {}}
              whileTap={!isRevealed ? { scale: 0.99 } : {}}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${optionStyle}`}
            >
              {/* Radio indicator */}
              <div
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isRevealed && option.id === question.correctAnswer
                    ? 'border-neon-green bg-neon-green/20'
                    : isRevealed &&
                      option.id === selectedOption &&
                      !optionCorrect
                    ? 'border-neon-red bg-neon-red/20'
                    : option.id === selectedOption
                    ? 'border-neon-cyan bg-neon-cyan/20'
                    : 'border-dark-400'
                }`}
              >
                {isRevealed && option.id === question.correctAnswer && (
                  <Check className="w-3 h-3 text-neon-green" />
                )}
                {isRevealed &&
                  option.id === selectedOption &&
                  !optionCorrect && (
                    <X className="w-3 h-3 text-neon-red" />
                  )}
                {!isRevealed && option.id === selectedOption && (
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                )}
              </div>

              <span
                className={`font-body font-medium ${
                  isRevealed && option.id === question.correctAnswer
                    ? 'text-neon-green'
                    : isRevealed &&
                      option.id === selectedOption &&
                      !optionCorrect
                    ? 'text-neon-red/80'
                    : option.id === selectedOption
                    ? 'text-neon-cyan'
                    : 'text-white/80'
                }`}
              >
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Reasoning Textarea */}
      <div className="mb-6">
        <label className="font-body text-sm text-white/60 block mb-2">
          {isRevealed ? 'Your reasoning:' : 'Explain your reasoning — why would this choice maximize hover time?'}
        </label>
        <textarea
          value={reasoning}
          onChange={(e) => setReasoning(e.target.value)}
          disabled={isRevealed}
          placeholder="Think like you're in the interview. Explain the physics behind your choice..."
          rows={4}
          className={`w-full bg-dark-800 border-2 rounded-xl p-4 font-body text-sm
            text-white/80 placeholder-white/30 resize-none
            focus:outline-none transition-all duration-200
            ${
              isRevealed
                ? 'border-dark-500 opacity-80'
                : 'border-dark-500 focus:border-neon-cyan/50'
            }`}
        />
      </div>

      {/* Revealed: Feedback */}
      <AnimatePresence>
        {isRevealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
          >
            {/* Correct/Incorrect/Partial Banner */}
            <div
              className={`flex items-center gap-3 p-4 rounded-xl mb-4 border-2 ${
                isCorrect
                  ? 'border-neon-green/40 bg-neon-green/10'
                  : optionCorrect && !validationResult?.adequate
                  ? 'border-neon-yellow/40 bg-neon-yellow/10'
                  : 'border-neon-orange/40 bg-neon-orange/10'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isCorrect
                    ? 'bg-neon-green/20'
                    : optionCorrect && !validationResult?.adequate
                    ? 'bg-neon-yellow/20'
                    : 'bg-neon-orange/20'
                }`}
              >
                {isCorrect ? (
                  <Check className="w-6 h-6 text-neon-green" />
                ) : optionCorrect && !validationResult?.adequate ? (
                  <AlertTriangle className="w-6 h-6 text-neon-yellow" />
                ) : (
                  <X className="w-6 h-6 text-neon-orange" />
                )}
              </div>
              <div>
                <p
                  className={`font-display font-bold ${
                    isCorrect
                      ? 'text-neon-green'
                      : optionCorrect && !validationResult?.adequate
                      ? 'text-neon-yellow'
                      : 'text-neon-orange'
                  }`}
                >
                  {isCorrect
                    ? 'Correct!'
                    : optionCorrect && !validationResult?.adequate
                    ? 'Right answer, weak reasoning.'
                    : 'Not quite.'}
                </p>
                {!optionCorrect && (
                  <p className="font-body text-sm text-white/60">
                    The optimal answer is{' '}
                    <span className="text-neon-green font-semibold">
                      {correctOption?.label}
                    </span>
                  </p>
                )}
                {optionCorrect && !validationResult?.adequate && (
                  <p className="font-body text-sm text-white/60">
                    You picked correctly but couldn't explain the physics. In an interview, you need to articulate <span className="text-neon-yellow font-semibold">why</span>.
                  </p>
                )}
              </div>
            </div>

            {/* Concept Coverage (shown when correct option selected) */}
            {optionCorrect && validationResult && (
              <div className="p-4 rounded-xl mb-4 bg-dark-800 border border-dark-500">
                {validationResult.tooShort && (
                  <p className="font-body text-sm text-neon-yellow mb-3">
                    Your reasoning was too brief. Aim for at least a few sentences explaining the physics.
                  </p>
                )}

                {/* Missed concepts — readable list with hints */}
                {validationResult.missedConcepts.length > 0 && (
                  <div className="mb-3">
                    <p className="font-body text-sm text-neon-orange mb-2">
                      Your answer should have mentioned:
                    </p>
                    <div className="space-y-2">
                      {validationResult.missedConcepts.map((concept) => (
                        <div
                          key={concept.name}
                          className="flex items-start gap-2 p-2 rounded-lg bg-neon-orange/5 border border-neon-orange/20"
                        >
                          <X className="w-4 h-4 text-neon-orange flex-shrink-0 mt-0.5" />
                          <div>
                            <span className="font-display font-semibold text-sm text-white">
                              {concept.name}
                            </span>
                            {concept.hint && (
                              <p className="font-body text-xs text-white/60 mt-0.5">
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
                {validationResult.matchedConcepts.length > 0 && (
                  <div>
                    <p className="font-body text-xs text-white/50 mb-2">
                      Concepts you covered:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {validationResult.matchedConcepts.map((concept) => (
                        <span
                          key={concept.name}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-body bg-neon-green/10 text-neon-green border border-neon-green/30"
                        >
                          <Check className="w-3 h-3" />
                          {concept.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Physics Explanation */}
            <Card className="mb-4" glowColor={isCorrect ? 'green' : 'orange'}>
              <h4 className="font-display font-semibold text-white mb-2">
                The Physics
              </h4>
              <p className="font-body text-sm text-white/80 leading-relaxed">
                {question.explanation}
              </p>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6">
        {!isRevealed ? (
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!canSubmit}
            icon={<Send className="w-4 h-4" />}
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onNextQuestion}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {isLastQuestion ? 'See Results' : 'Next Question'}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

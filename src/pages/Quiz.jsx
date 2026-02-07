import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play,
  RotateCcw,
  ChevronRight,
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  AlertCircle,
  Flag,
} from 'lucide-react';
import { PageLayout, PageHeader } from '../components/layout';
import { Card, Button, Badge, ProgressBar, CircularProgress } from '../components/common';
import { useProgress } from '../context/ProgressContext';
import { FPV_TOPICS, CATEGORIES } from '../data/topics';

// Distractor generator - creates plausible wrong answers with specific technical details
const DISTRACTOR_TEMPLATES = {
  // Latency-related distractors - specific numbers, plausible but wrong
  latency: [
    'DJI O3 achieves 12-18ms latency by using dedicated video processing ASICs, making it the lowest latency digital option and comparable to analog systems.',
    'Analog latency is actually 25-35ms when accounting for the full signal chain including camera processing, VTX modulation, and goggle demodulation.',
    'HDZero uses frame interpolation to achieve apparent latency of 8ms, though actual glass-to-glass is 40-50ms with the interpolation buffer.',
    'Walksnail Avatar achieves 10-15ms latency in Race mode by reducing resolution to 540p and disabling error correction.',
    'At speeds under 60mph, latency differences under 50ms are imperceptible to pilots, making digital systems suitable for all racing applications.',
  ],

  // Power/signal distractors - specific values, plausible but wrong
  power: [
    'DJI systems output up to 1.5W (1500mW) which exceeds most analog VTX options, giving digital the range advantage in long-range applications.',
    'Analog VTX are limited to 600mW by FCC regulations in all regions, while digital systems can legally output up to 1.2W due to spread spectrum exemptions.',
    'Power output has minimal effect on range beyond 400mW - antenna gain and receiver sensitivity account for 80% of range performance.',
    'HDZero Race V3 outputs 1.6W (1600mW), the highest of any FPV system, enabling 30km+ range with directional antennas.',
    'Signal penetration is determined by frequency band, not power - 5.8GHz digital penetrates 40% better than 5.8GHz analog at identical power levels.',
  ],

  // Stator size distractors - specific numbers, inverted or wrong relationships
  stator: [
    'The first two digits represent stator height in mm, last two represent diameter - so a 2207 motor has a 22mm tall, 7mm wide stator.',
    'Stator numbers indicate the motor\'s torque constant - 2306 produces 23.06 N⋅cm of torque per amp, while 2207 produces 22.07 N⋅cm per amp.',
    'Wider stators (higher first number) increase maximum RPM potential, while taller stators (higher second number) increase torque output.',
    'A 2207 motor has 38% more stator volume than a 2306 motor, making it more powerful despite the lower numbers.',
    'Motor stator designations are standardized by EASA - a 2207 from any manufacturer has identical dimensions of 22mm × 7mm ±0.5mm.',
  ],

  // Motor/ESC distractors - specific values, wrong physics
  motor: [
    'Lower KV motors (1400KV vs 2400KV) draw more current per gram of thrust because they require higher voltage to achieve the same RPM.',
    'Heat dissipation scales linearly with current (I×R), so a motor drawing 20A generates twice the heat of one drawing 10A at the same resistance.',
    'Motor efficiency peaks at 85-95% throttle where electromagnetic saturation is optimal, making full-throttle operation most efficient.',
    'A 2207 motor at 70% throttle is less efficient than a 1806 motor at 70% throttle because the larger stator has higher iron losses.',
    'KV tolerance of ±10% between motors causes yaw drift - motors should be matched within 2% KV for stable flight.',
  ],

  // Digital systems distractors - specific but wrong specs
  digital: [
    'DJI O3 uses H.265 compression with 18ms encoding latency, while HDZero uses uncompressed video transmission with only 4ms processing delay.',
    'Digital cliff effect occurs at -85dBm signal strength across all systems, giving approximately 200ms warning before complete signal loss.',
    'Walksnail Avatar HD outputs 1080p120 with 15ms latency in Performance mode, achieving the best quality-to-latency ratio of any digital system.',
    'HDZero achieves 720p60 with 30-35ms latency - higher than Walksnail but with better signal penetration due to OFDM modulation.',
    'All digital systems use 50Mbps video bitrate, so image quality differences are purely due to camera sensor quality, not transmission.',
  ],

  // Analog distractors - specific but wrong values
  analog: [
    'Analog VTX latency of 8-15ms includes 6-8ms of camera processing time - the actual RF transmission adds only 1-2ms of delay.',
    'Analog signal degradation begins at -75dBm and becomes unusable at -90dBm, giving pilots approximately 15dB (4x distance) of warning before signal loss.',
    'Modern analog cameras achieve 800TVL resolution which exceeds HDZero\'s effective resolution of 650TVL due to compression artifacts.',
    'Analog VTX efficiency is 40% (60% lost as heat) while digital achieves 65% efficiency, making digital better for battery life.',
    'Analog frequency bands (5.3-5.9GHz) offer 120 available channels, while digital is limited to 8 channels due to bandwidth requirements.',
  ],

  // General technical distractors - specific but wrong
  technical: [
    'Component tolerances of ±5% in manufacturing mean performance varies more between individual units than between different product lines.',
    'Temperature affects performance by approximately 2% per 10°C - a system running at 50°C performs 10% worse than at 25°C.',
    'Firmware updates can improve hardware performance by 15-20% through algorithm optimization, often eliminating need for hardware upgrades.',
    'Break-in period of 10-20 flights is required for motors and ESCs to reach optimal performance as bearings seat and capacitors form.',
    'Altitude affects motor efficiency by 3% per 1000m due to reduced air density, requiring prop and tune adjustments above 2000m.',
  ],

  // ESC distractors - specific but wrong
  esc: [
    'ESC current rating should be 1.5× the motor\'s maximum burst current - a motor drawing 40A burst needs a 60A ESC for reliable operation.',
    'BLHeli_32 achieves 48kHz PWM frequency while AM32 is limited to 24kHz, making BLHeli_32 more responsive for racing applications.',
    'Bidirectional DShot adds 2-3ms latency to the control loop due to the telemetry return path, which is why racers disable it.',
    'ESC timing should be set to 22.5° for 5" freestyle and 30° for racing - higher timing increases top-end RPM at the cost of efficiency.',
    'Motor pole count setting in Betaflight affects RPM filtering accuracy but has no effect if using standard gyro-based filtering.',
  ],

  // PID/tuning distractors - specific but wrong relationships
  tuning: [
    'You should lower gyro lowpass cutoffs from 150Hz to 80Hz because RPM filtering adds processing overhead that requires additional smoothing.',
    'D-term should be set to 1.2-1.5× P-term value for optimal damping - the common 0.5-0.7× ratio causes underdamped oscillation.',
    'I-term accumulation causes propwash oscillation - reducing I by 30-40% eliminates propwash without affecting hover stability.',
    'Feed-forward gain above 150 bypasses the PID controller, sending stick inputs directly to motors without gyro feedback correction.',
    'Dynamic notch filters should be completely disabled when using RPM filtering, as they compete for the same frequency bands.',
  ],

  // Servo distractors - specific but wrong
  servo: [
    'Servo PWM operates at 330Hz in Betaflight, synchronized with the PID loop for smooth operation - 50Hz is only for legacy servos.',
    'The smix command maps servo output directly to motor commands - "smix 0 0 5 100" means Servo 0 mirrors Motor 5 at 100% rate.',
    'Servos can draw up to 500mA from the FC\'s 5V rail safely - the brownout concern only applies to servos drawing over 1.5A.',
    'Digital servos require DShot protocol configuration in Betaflight, while analog servos use standard PWM output on remapped pins.',
    'Servo travel is controlled by pulse width: 500μs = 0°, 1500μs = 90°, 2500μs = 180° - the standard 1000-2000μs range limits movement to 90°.',
  ],

  // Protocol distractors - specific but wrong
  protocol: [
    'DShot300 has lower latency than DShot600 because fewer bits per frame means faster transmission - 300 completes in 26.7μs vs 53.3μs for 600.',
    'CRSF protocol adds 4-6ms latency compared to SBUS due to bidirectional telemetry overhead, which is why racers prefer SBUS.',
    'ExpressLRS at 500Hz provides 2ms packet interval, but the control loop only updates at 250Hz, making frequencies above 250Hz unnecessary.',
    'Crossfire and ELRS use identical CRSF protocol but different modulation - ELRS LoRa achieves 30% better range at the same power.',
    'PPM protocol actually achieves 8ms latency with proper receiver configuration, comparable to CRSF when using high-quality components.',
  ],

  // Defense/company distractors - Neros.tech specific
  defense: [
    'ITAR only applies to products sold directly to foreign governments - commercial sales to international customers are exempt from export controls.',
    'Defense drone companies can share technical data freely with NATO allies without export licenses due to mutual defense agreements.',
    'Fiber-optic control adds 15-20ms latency compared to RF due to the optical-to-electrical conversion at both ends of the fiber link.',
    'ARCHER FIBER uses standard single-mode fiber that can be spliced in the field, allowing range extension by connecting additional spools.',
    'Military drones require GPS for navigation - GPS-denied operation is achieved through pre-programmed waypoints, not real-time piloting.',
    'Neros.tech\'s Kyiv office handles manufacturing and assembly, while El Segundo focuses on R&D and design work.',
    'The CROSSBOW ground station uses the same RF frequencies as consumer FPV systems but with military-grade encryption overlay.',
    'ARCHER STRIKE is an autonomous system that operates without pilot input once target coordinates are programmed.',
    'Defense drones use the same Betaflight firmware as consumer drones but with classified PID presets optimized for combat maneuvers.',
    'ITAR registration is optional for companies with revenue under $50M - only large defense contractors require mandatory registration.',
  ],

  // Propeller distractors - specific but wrong
  propeller: [
    'Propeller pitch is measured in degrees of blade angle - a 4.5" pitch prop has blades angled at 4.5° relative to the rotation plane.',
    'Bi-blade props generate 25% less thrust than tri-blade at the same RPM, requiring higher throttle to achieve equivalent lift.',
    'Prop diameter affects only top speed while pitch affects only hover efficiency - they are independent performance variables.',
    'The "51466" naming convention indicates 51.4mm diameter and 66mm pitch, using metric measurements unlike American props.',
    'Four-blade props are more efficient than two-blade because the thrust is distributed across more surfaces, reducing induced drag per blade.',
    'Carbon fiber props are 30% more efficient than nylon due to the stiffer material maintaining optimal blade shape under load.',
    'Bullnose props generate more thrust at low RPM by concentrating lift near the hub where blade speed is lower.',
    'Prop pitch should match motor KV directly - a 2400KV motor pairs optimally with a 2.4" pitch prop for balanced performance.',
  ],

  // Efficiency/build distractors - specific but wrong
  efficiency: [
    'Li-ion cells provide higher energy density than LiPo, but their 3.0V nominal voltage requires 7S packs to match 6S LiPo voltage.',
    'Hover throttle of 50-60% is optimal because it positions the motors at peak efficiency while leaving headroom for maneuvering.',
    'Larger props are less efficient at hover because they create more tip vortex losses due to the longer blade span.',
    'Low-KV motors draw more current than high-KV motors at the same thrust output due to the increased back-EMF they must overcome.',
    'Flight time is maximized by flying at 80% throttle where prop efficiency peaks, not by cruising at lower throttle settings.',
    'The I²R heat formula shows that doubling current doubles heat loss - this linear relationship makes current management straightforward.',
    'Battery weight should be 40-50% of AUW for optimal efficiency - lighter batteries sacrifice flight time while heavier ones waste energy lifting themselves.',
    '21700 Li-ion cells are less energy-dense than 18650 cells but are preferred for their higher discharge rates in FPV applications.',
  ],

  // Betaflight configurator distractors - specific but wrong
  configurator: [
    'The Ports tab baud rate must match exactly between FC and peripheral - a 115200 receiver won\'t communicate with a UART set to 420000.',
    'Motor resource remapping in CLI changes the physical pin assignments, requiring resoldering if the original mapping was incorrect.',
    'The "diff all" command shows settings that differ from the previous firmware version, useful for identifying changes after updates.',
    'Arming disable flags are cleared automatically once the underlying issue is resolved - no manual reset is required.',
    'Blackbox logging at 2kHz captures every PID loop iteration since Betaflight runs at 2kHz internally regardless of gyro settings.',
    'The OSD font is stored in the goggles\' memory, not the FC - changing fonts requires updating both FC and goggle firmware.',
    'Accelerometer calibration must be performed after every firmware update because the calibration values are not preserved across flashes.',
    'The Motors tab RPM display requires the motor to be spinning - RPM telemetry is not available when motors are stationary.',
    'UART inversion is handled automatically by Betaflight 4.3+ for all protocols - manual inversion settings are deprecated.',
    'Rate profiles and PID profiles are linked - changing one automatically loads the corresponding other profile.',
  ],
};

// Generates contextually relevant wrong answers based on question content
function generateDistractors(question, correctAnswer) {
  const q = question.toLowerCase();
  const a = correctAnswer.toLowerCase();

  // Identify question type and select appropriate distractor pool
  let pools = [];

  // Defense/company questions - Neros.tech, ITAR, military, ARCHER
  if (q.includes('neros') || q.includes('itar') || q.includes('archer') || q.includes('defense') ||
      q.includes('military') || q.includes('fiber') || q.includes('crossbow') || q.includes('longbow') ||
      q.includes('kyiv') || q.includes('combat') || q.includes('jamming')) {
    pools.push('defense');
  }

  // Betaflight configurator questions
  if (q.includes('configurator') || q.includes('cli') || q.includes('setup tab') || q.includes('ports tab') ||
      q.includes('modes tab') || q.includes('motors tab') || q.includes('osd') || q.includes('blackbox') ||
      q.includes('uart') || q.includes('troubleshoot') || q.includes('arm') || q.includes('diff all') ||
      q.includes('resource')) {
    pools.push('configurator');
  }

  // Propeller questions
  if (q.includes('prop') || q.includes('pitch') || q.includes('blade') || q.includes('51466') ||
      q.includes('diameter') || q.includes('bi-blade') || q.includes('tri-blade') || q.includes('cinematic')) {
    pools.push('propeller');
  }

  // Efficiency/build questions
  if (q.includes('efficien') || q.includes('hover') || q.includes('li-ion') || q.includes('lipo') ||
      q.includes('flight time') || q.includes('battery') || q.includes('10"') || q.includes('10 inch') ||
      q.includes('throttle') || q.includes('i²r') || q.includes('heat')) {
    pools.push('efficiency');
  }

  // Latency questions
  if (q.includes('latency') || q.includes('delay') || q.includes('ms ')) {
    pools.push('latency');
  }

  // Power/signal questions
  if (q.includes('power') || q.includes('mw') || q.includes('watt') || q.includes('range') || q.includes('penetration')) {
    pools.push('power');
  }

  // Stator size questions
  if (q.includes('stator') || q.includes('2207') || q.includes('2306') || q.includes('2806') || q.includes('2812')) {
    pools.push('stator');
  }

  // Motor questions
  if (q.includes('motor') || q.includes('kv') || q.includes('torque') || q.includes('rpm')) {
    pools.push('motor');
  }

  // Digital system questions
  if (q.includes('digital') || q.includes('dji') || q.includes('hdzero') || q.includes('walksnail') || q.includes('cliff effect')) {
    pools.push('digital');
  }

  // Analog questions
  if (q.includes('analog') || q.includes('graceful') || q.includes('static') || q.includes('vtx')) {
    pools.push('analog');
  }

  // ESC questions
  if (q.includes('esc') || q.includes('dshot') || q.includes('blheli') || q.includes('am32') || q.includes('bidirectional')) {
    pools.push('esc');
  }

  // PID/tuning questions
  if (q.includes('pid') || q.includes('tune') || q.includes('filter') || q.includes('p-term') ||
      q.includes('d-term') || q.includes('i-term') || q.includes('feed forward') || q.includes('propwash')) {
    pools.push('tuning');
  }

  // Servo questions
  if (q.includes('servo') || q.includes('smix') || q.includes('pwm') || q.includes('pulse width')) {
    pools.push('servo');
  }

  // Protocol questions
  if (q.includes('crsf') || q.includes('elrs') || q.includes('sbus') || q.includes('ppm') || q.includes('receiver')) {
    pools.push('protocol');
  }

  // If no specific pools matched, try to infer from the correct answer
  if (pools.length === 0) {
    if (a.includes('itar') || a.includes('neros') || a.includes('archer') || a.includes('defense')) {
      pools.push('defense');
    }
    if (a.includes('betaflight') || a.includes('cli') || a.includes('configurator')) {
      pools.push('configurator');
    }
    if (a.includes('prop') || a.includes('pitch') || a.includes('blade')) {
      pools.push('propeller');
    }
    if (a.includes('efficien') || a.includes('hover') || a.includes('li-ion')) {
      pools.push('efficiency');
    }
  }

  // Last resort fallback - use technical pool only if nothing else matched
  if (pools.length === 0) {
    pools.push('technical');
  }

  // Collect all possible distractors from matched pools
  const allDistractors = [];
  pools.forEach(pool => {
    if (DISTRACTOR_TEMPLATES[pool]) {
      allDistractors.push(...DISTRACTOR_TEMPLATES[pool]);
    }
  });

  // Shuffle and pick 3 unique distractors that aren't too similar to the correct answer
  const shuffled = allDistractors
    .filter(d => {
      // Filter out distractors that are too similar to the correct answer
      const dLower = d.toLowerCase();
      return !a.includes(dLower.substring(0, 30)) && !dLower.includes(a.substring(0, 30));
    })
    .sort(() => Math.random() - 0.5);

  return shuffled.slice(0, 3);
}

// Creates a shortened version of the correct answer for multiple choice
function shortenAnswer(fullAnswer) {
  // Replace common abbreviations to avoid splitting on them
  const safeText = fullAnswer
    .replace(/e\.g\./gi, 'E_G_')
    .replace(/i\.e\./gi, 'I_E_')
    .replace(/vs\./gi, 'VS_')
    .replace(/etc\./gi, 'ETC_')
    .replace(/(\d+)\./g, '$1_DOT_'); // Protect numbers like "4.3" or "150Hz to 200Hz"

  // Split on actual sentence endings (period followed by space and capital, or end)
  const sentences = safeText.split(/(?<=[.!?])\s+(?=[A-Z])|(?<=[.!?])$/).filter(s => s.trim().length > 0);

  // Take first 1-2 sentences, up to 400 characters
  let result = '';
  for (const sentence of sentences) {
    const restored = sentence
      .replace(/E_G_/g, 'e.g.')
      .replace(/I_E_/g, 'i.e.')
      .replace(/VS_/g, 'vs.')
      .replace(/ETC_/g, 'etc.')
      .replace(/(\d+)_DOT_/g, '$1.');

    if (result.length + restored.length <= 400) {
      result += (result ? ' ' : '') + restored.trim();
    } else {
      break;
    }
  }

  // Ensure it ends properly
  if (result && !result.match(/[.!?]$/)) {
    result += '.';
  }

  // If still too long, truncate at word boundary
  if (result.length > 400) {
    result = result.substring(0, 397).replace(/\s+\S*$/, '') + '...';
  }

  return result || fullAnswer.substring(0, 350) + '...';
}

// Generate quiz questions from topics with multiple choice options
function generateQuestions(topics, count = 15) {
  const allQuestions = [];

  topics.forEach((topic) => {
    topic.content.practiceQuestions.forEach((qa, qaIndex) => {
      const shortCorrect = shortenAnswer(qa.a);

      // Use question-specific distractors if available, otherwise fall back to generated ones
      const distractors = qa.distractors && qa.distractors.length >= 3
        ? qa.distractors.slice(0, 3)
        : generateDistractors(qa.q, qa.a);

      // Create options array with correct answer and distractors
      const options = [
        { text: shortCorrect, isCorrect: true },
        ...distractors.map(d => ({ text: d, isCorrect: false }))
      ];

      // Shuffle options so correct answer isn't always first
      const shuffledOptions = options.sort(() => Math.random() - 0.5);

      allQuestions.push({
        topicId: topic.id,
        questionIndex: qaIndex,  // Track original index for flagging
        topicTitle: topic.title,
        topicIcon: topic.icon,
        category: topic.category,
        question: qa.q,
        fullAnswer: qa.a,
        options: shuffledOptions,
      });
    });
  });

  // Shuffle and pick questions
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export default function Quiz() {
  const { category } = useParams();
  const { addQuizScore, toggleFlagQuestion, autoFlagQuestion, isQuestionFlagged } = useProgress();

  const [selectedCategory, setSelectedCategory] = useState(category || 'all');
  const [quizState, setQuizState] = useState('setup'); // setup, active, review, complete
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Filter topics by category
  const filteredTopics = useMemo(() => {
    if (selectedCategory === 'all') return FPV_TOPICS;
    return FPV_TOPICS.filter((t) => t.category === selectedCategory);
  }, [selectedCategory]);

  const startQuiz = () => {
    const generatedQuestions = generateQuestions(filteredTopics, 15);
    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setHasSubmitted(false);
    setQuizState('active');
  };

  const handleOptionSelect = (index) => {
    if (!hasSubmitted) {
      setSelectedOption(index);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = currentQuestion.options[selectedOption].isCorrect;

    // Auto-flag incorrect answers
    if (!isCorrect) {
      autoFlagQuestion(currentQuestion.topicId, currentQuestion.questionIndex);
    }

    setHasSubmitted(true);
    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: {
        selectedIndex: selectedOption,
        isCorrect,
        question: currentQuestion,
      },
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
    } else {
      // Quiz complete
      const correctCount = Object.values(answers).filter((a) => a.isCorrect).length;
      addQuizScore(selectedCategory, correctCount, questions.length);
      setQuizState('complete');
    }
  };

  const restartQuiz = () => {
    setQuizState('setup');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  // Calculate results
  const results = useMemo(() => {
    if (quizState !== 'complete') return null;

    const correct = Object.values(answers).filter((a) => a.isCorrect).length;
    const incorrect = Object.values(answers).filter((a) => !a.isCorrect).length;
    const total = questions.length;
    const score = Math.round((correct / total) * 100);

    return { correct, incorrect, total, score };
  }, [answers, questions.length, quizState]);

  // Setup Screen
  if (quizState === 'setup') {
    return (
      <PageLayout>
        <PageHeader
          title="Quiz Mode"
          subtitle="Test your FPV knowledge"
          icon="📝"
        />

        <div className="max-w-2xl mx-auto">
          <Card className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="font-display font-bold text-2xl text-white mb-2">
              Ready to Test Your Knowledge?
            </h2>
            <p className="font-body text-white/60 mb-6">
              Multiple choice questions designed to challenge your understanding.
              No easy answers - you'll need to really know your stuff!
            </p>

            {/* Category Selection */}
            <div className="mb-6">
              <label className="block font-body text-sm text-white/60 mb-2">
                Select Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full max-w-xs bg-dark-700 border border-dark-500 rounded-lg px-4 py-2
                           font-body text-white text-center
                           focus:outline-none focus:border-neon-cyan"
              >
                <option value="all">All Categories ({FPV_TOPICS.length} topics)</option>
                {CATEGORIES.map((cat) => {
                  const topicCount = FPV_TOPICS.filter((t) => t.category === cat.id).length;
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name} ({topicCount} topics)
                    </option>
                  );
                })}
              </select>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={startQuiz}
              icon={<Play className="w-5 h-5" />}
            >
              Start Quiz
            </Button>
          </Card>

          {/* Quiz Info */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card padding="p-4" className="text-center">
              <Target className="w-8 h-8 text-neon-cyan mx-auto mb-2" />
              <h3 className="font-display font-semibold text-white">15 Questions</h3>
              <p className="font-body text-sm text-white/60">Per quiz session</p>
            </Card>
            <Card padding="p-4" className="text-center">
              <AlertCircle className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
              <h3 className="font-display font-semibold text-white">Challenging</h3>
              <p className="font-body text-sm text-white/60">Plausible distractors</p>
            </Card>
            <Card padding="p-4" className="text-center">
              <Trophy className="w-8 h-8 text-neon-green mx-auto mb-2" />
              <h3 className="font-display font-semibold text-white">Track Progress</h3>
              <p className="font-body text-sm text-white/60">See improvement</p>
            </Card>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Active Quiz Screen
  if (quizState === 'active' && questions.length > 0) {
    const currentQuestion = questions[currentIndex];
    const questionCategory = CATEGORIES.find((c) => c.id === currentQuestion.category);

    return (
      <PageLayout>
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-body text-white/60">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <Button variant="ghost" size="sm" onClick={restartQuiz}>
              Exit Quiz
            </Button>
          </div>
          <ProgressBar value={currentIndex + 1} max={questions.length} color="gradient" />
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Card className="mb-6">
              {/* Topic Info */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-dark-500">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{currentQuestion.topicIcon}</span>
                  <div>
                    <p className="font-body text-sm text-white/60">{currentQuestion.topicTitle}</p>
                    <Badge color={questionCategory?.color || 'gray'} size="sm">
                      {questionCategory?.name}
                    </Badge>
                  </div>
                </div>
                {/* Flag Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlagQuestion(currentQuestion.topicId, currentQuestion.questionIndex);
                  }}
                  className={`p-2 rounded-lg transition-all ${
                    isQuestionFlagged(currentQuestion.topicId, currentQuestion.questionIndex)
                      ? 'bg-neon-orange/20 text-neon-orange'
                      : 'bg-dark-700 text-white/40 hover:text-neon-orange'
                  }`}
                  title={isQuestionFlagged(currentQuestion.topicId, currentQuestion.questionIndex)
                    ? 'Remove flag'
                    : 'Flag for review'}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Question */}
              <h2 className="font-display font-bold text-xl text-white mb-6">
                {currentQuestion.question}
              </h2>

              {/* Multiple Choice Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const showResult = hasSubmitted;
                  const isCorrect = option.isCorrect;

                  let optionClasses = 'w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ';

                  if (showResult) {
                    if (isCorrect) {
                      optionClasses += 'border-neon-green bg-neon-green/10 ';
                    } else if (isSelected && !isCorrect) {
                      optionClasses += 'border-neon-red bg-neon-red/10 ';
                    } else {
                      optionClasses += 'border-dark-500 bg-dark-700/50 opacity-50 ';
                    }
                  } else {
                    if (isSelected) {
                      optionClasses += 'border-neon-cyan bg-neon-cyan/10 ';
                    } else {
                      optionClasses += 'border-dark-500 bg-dark-700 hover:border-dark-400 hover:bg-dark-600 cursor-pointer ';
                    }
                  }

                  return (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={hasSubmitted}
                      className={optionClasses}
                      whileHover={!hasSubmitted ? { scale: 1.01 } : {}}
                      whileTap={!hasSubmitted ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          showResult && isCorrect
                            ? 'bg-neon-green text-dark-900'
                            : showResult && isSelected && !isCorrect
                            ? 'bg-neon-red text-dark-900'
                            : isSelected
                            ? 'bg-neon-cyan text-dark-900'
                            : 'bg-dark-600 text-white/60'
                        }`}>
                          {showResult && isCorrect ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : showResult && isSelected && !isCorrect ? (
                            <XCircle className="w-5 h-5" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className={`font-body text-sm leading-relaxed ${
                          showResult && isCorrect
                            ? 'text-neon-green'
                            : showResult && isSelected && !isCorrect
                            ? 'text-neon-red'
                            : 'text-white/90'
                        }`}>
                          {option.text}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Submit / Next Button */}
              <div className="text-center">
                {!hasSubmitted ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    disabled={selectedOption === null}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Feedback */}
                    <div className={`p-4 rounded-lg ${
                      answers[currentIndex]?.isCorrect
                        ? 'bg-neon-green/10 border border-neon-green/30'
                        : 'bg-neon-red/10 border border-neon-red/30'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        {answers[currentIndex]?.isCorrect ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-neon-green" />
                            <span className="font-display font-bold text-neon-green">Correct!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-neon-red" />
                            <span className="font-display font-bold text-neon-red">Incorrect</span>
                          </>
                        )}
                      </div>
                      <p className="font-body text-sm text-white/80">
                        <strong>Full explanation:</strong> {currentQuestion.fullAnswer}
                      </p>
                    </div>

                    <Button
                      variant="primary"
                      onClick={nextQuestion}
                      icon={<ChevronRight className="w-5 h-5" />}
                    >
                      {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  // Results Screen
  if (quizState === 'complete' && results) {
    return (
      <PageLayout>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {/* Score Display */}
            <div className="mb-8">
              <div className="text-6xl mb-4">
                {results.score >= 80 ? '🏆' : results.score >= 60 ? '👍' : '💪'}
              </div>
              <h1 className="font-display font-bold text-3xl text-white mb-2">
                Quiz Complete!
              </h1>
              <p className="font-body text-white/60">
                {results.score >= 80
                  ? "Excellent work! You really know your stuff!"
                  : results.score >= 60
                  ? 'Good effort! Keep studying to improve.'
                  : "Keep studying - these are tough questions!"}
              </p>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-8">
              <CircularProgress
                value={results.score}
                max={100}
                size={150}
                strokeWidth={12}
                color={results.score >= 80 ? 'green' : results.score >= 60 ? 'yellow' : 'cyan'}
              />
            </div>

            {/* Results Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card padding="p-4">
                <div className="font-display font-bold text-2xl text-neon-green">
                  {results.correct}
                </div>
                <div className="font-body text-sm text-white/60">Correct</div>
              </Card>
              <Card padding="p-4">
                <div className="font-display font-bold text-2xl text-neon-red">
                  {results.incorrect}
                </div>
                <div className="font-body text-sm text-white/60">Incorrect</div>
              </Card>
            </div>

            {/* Review Missed Questions */}
            {results.incorrect > 0 && (
              <Card className="mb-8 text-left">
                <h3 className="font-display font-bold text-lg text-white mb-4">
                  Review These Topics:
                </h3>
                <div className="space-y-2">
                  {Object.values(answers)
                    .filter((a) => !a.isCorrect)
                    .map((a, i) => (
                      <Link
                        key={i}
                        to={`/topics/${a.question.topicId}`}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-600 transition-colors"
                      >
                        <span>{a.question.topicIcon}</span>
                        <span className="font-body text-white/80">{a.question.topicTitle}</span>
                        <ChevronRight className="w-4 h-4 text-white/40 ml-auto" />
                      </Link>
                    ))}
                </div>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                onClick={restartQuiz}
                icon={<RotateCcw className="w-5 h-5" />}
              >
                Take Another Quiz
              </Button>
              <Link to="/topics">
                <Button variant="ghost">Review Topics</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </PageLayout>
    );
  }

  // Fallback
  return (
    <PageLayout>
      <div className="text-center py-16">
        <p className="text-white/60">Loading...</p>
      </div>
    </PageLayout>
  );
}

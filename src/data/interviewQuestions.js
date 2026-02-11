/**
 * Interview Questions for Drone Build Simulator
 *
 * 9 physics-based design decisions for building a hover drone.
 * Each question tests understanding of a specific engineering principle.
 * No product names or specs shown — pure physics reasoning.
 *
 * The base questions are written for a 10" drone. Use `getQuestionsForSize()`
 * to get a version adapted for other sizes (5", 7", 13").
 *
 * Each question includes `keyConcepts` — groups of synonym terms that
 * represent the key physics ideas a correct explanation should cover.
 * The `validateReasoning()` function checks whether the user's written
 * reasoning mentions enough of these concepts.
 */

import { getDroneSize } from './droneSizes';

export const INTERVIEW_QUESTIONS = [
  // ── 1. Frame Material ──────────────────────────────────────────────────
  {
    id: 'frame-material',
    category: 'Frame',
    icon: '🛠️',
    question: 'What frame material would you choose for a 10" hover drone?',
    context:
      'The frame must be structurally rigid enough to support 4 motors, a flight controller, ESC, and a battery pack. Consider the tradeoff between material strength and total mass.',
    options: [
      { id: 'carbon-fiber', label: 'Carbon Fiber Composite' },
      { id: 'aluminum', label: 'Aluminum Alloy (6061-T6)' },
      { id: 'abs', label: 'ABS Plastic' },
      { id: 'glass-fiber', label: 'Glass Fiber Composite' },
    ],
    correctAnswer: 'carbon-fiber',
    explanation:
      'Carbon fiber is the strongest and lightest option — a 10" frame weighs only 150–200g while staying completely rigid. Every extra gram of frame weight forces the motors to work harder during hover, draining the battery faster. Aluminum is strong but 1.5–2× heavier. ABS is cheap but flexes under load, creating vibrations that waste energy. Glass fiber is a middle ground but still heavier than carbon. Lightest rigid frame = longest hover time.',
    keyConcepts: [
      { name: 'Weight consideration', terms: ['weight', 'light', 'heavy', 'mass', 'gram'], hint: 'Discuss how frame weight directly affects the power required to hover' },
      { name: 'Structural properties', terms: ['strength', 'rigid', 'stiff', 'structur', 'strong', 'flex'], hint: 'Explain the structural rigidity needed to avoid vibration-induced energy waste' },
      { name: 'Hover efficiency link', terms: ['power', 'efficien', 'hover', 'endur', 'energy', 'thrust'], hint: 'Connect material choice to overall hover power consumption' },
    ],
    minConcepts: 2,
    parameterValues: {
      'carbon-fiber': { frameWeightG: 180 },
      aluminum: { frameWeightG: 320 },
      abs: { frameWeightG: 250 },
      'glass-fiber': { frameWeightG: 220 },
    },
  },

  // ── 2. Frame Geometry ──────────────────────────────────────────────────
  {
    id: 'frame-geometry',
    category: 'Geometry',
    icon: '📐',
    question: 'What motor arm layout would you use?',
    context:
      'The geometry determines how the 4 motors are positioned relative to each other and the center of the airframe. This affects aerodynamic interaction between propellers.',
    options: [
      { id: 'true-x', label: 'True-X (symmetric motor spacing)' },
      { id: 'h-frame', label: 'H-Frame (parallel side plates)' },
      { id: 'stretch-x', label: 'Stretch-X (elongated pitch axis)' },
      { id: 'deadcat', label: 'Deadcat (rear motors wider than front)' },
      { id: 'plus', label: 'Plus (+) (arms at 0°/90°/180°/270°)' },
    ],
    correctAnswer: 'true-x',
    explanation:
      'True-X spaces all four motors equally from the center and each other. This means each motor carries exactly 25% of the load with no wasted energy on corrections. Equal spacing also means even prop wash — no motor works harder than the others. H-frame is close but has slight pitch/roll asymmetry the flight controller must compensate for. Stretch-X is optimized for forward flight, not hover. Deadcat\'s uneven layout forces constant PID corrections. Plus (+) puts motors only 90° apart, causing severe turbulence between props.',
    keyConcepts: [
      { name: 'Symmetry or equal spacing', terms: ['symmetr', 'equal', 'equidist', 'balanced', 'uniform', 'spacing'], hint: 'Explain why symmetric motor positioning ensures equal load distribution' },
      { name: 'Prop wash or interference', terms: ['prop wash', 'downwash', 'turbulen', 'interferen', 'wash', 'wake'], hint: 'Describe how motor spacing affects propeller downwash interaction' },
      { name: 'Thrust distribution', terms: ['thrust', 'load', 'efficien', 'pid', 'correction', 'compensat', 'moment'], hint: 'Discuss how geometry affects PID corrections and wasted energy' },
    ],
    minConcepts: 2,
    parameterValues: {
      'true-x': { geoEffMult: 1.02 },
      'h-frame': { geoEffMult: 1.0 },
      'stretch-x': { geoEffMult: 0.98 },
      deadcat: { geoEffMult: 0.96 },
      plus: { geoEffMult: 0.94 },
    },
  },

  // ── 3. Motor KV ────────────────────────────────────────────────────────
  {
    id: 'motor-kv',
    category: 'Motor KV',
    icon: '⚡',
    question: 'What KV range would you select for the motors?',
    context:
      'KV indicates how many RPM the motor spins per volt applied (unloaded). On a 6S battery (~22V), a 400KV motor spins at ~8,800 RPM max while a 1400KV motor spins at ~30,800 RPM max.',
    options: [
      { id: 'low-kv', label: 'Low KV (280–400)' },
      { id: 'mid-kv', label: 'Mid KV (580–700)' },
      { id: 'high-kv', label: 'High KV (900–1100)' },
      { id: 'very-high-kv', label: 'Very High KV (1400+)' },
    ],
    correctAnswer: 'low-kv',
    explanation:
      'Low KV motors produce more torque per amp, which is ideal for hover since you only need enough thrust to hold the drone\'s weight. A 400KV motor on 6S spins a 10" prop at ~3,000–4,000 RPM during hover — slow and efficient with minimal energy lost as heat. Higher KV motors spin faster, wasting more energy through heat in the windings (copper losses) and the motor core (iron losses). Low KV + large prop + slow spin = most thrust per watt.',
    keyConcepts: [
      { name: 'Torque advantage', terms: ['torque', 'force', 'turning force'], hint: 'Explain why lower KV produces more torque per amp drawn' },
      { name: 'Hover efficiency', terms: ['efficien', 'hover', 'low throttle', 'throttle', 'cruise'], hint: 'Discuss how KV relates to hover throttle percentage and motor efficiency' },
      { name: 'RPM or speed relationship', terms: ['rpm', 'spin', 'speed', 'slow', 'revolution', 'rotation'], hint: 'Connect KV to prop rotation speed and why slower is better for hover' },
    ],
    minConcepts: 2,
    parameterValues: {
      'low-kv': { motorEffAtHover: 0.88, motorWeightG: 68 },
      'mid-kv': { motorEffAtHover: 0.78, motorWeightG: 56 },
      'high-kv': { motorEffAtHover: 0.65, motorWeightG: 42 },
      'very-high-kv': { motorEffAtHover: 0.52, motorWeightG: 35 },
    },
  },

  // ── 4. Motor Stator Size ───────────────────────────────────────────────
  {
    id: 'motor-stator',
    category: 'Stator Size',
    icon: '🧲',
    question: 'What stator diameter would you choose for the motors?',
    context:
      'The stator is the stationary electromagnet core inside the motor. Stator size is expressed as DDMM (e.g., 2806 = 28mm diameter, 6mm height). Larger stators produce more torque but add weight.',
    options: [
      { id: 'small', label: 'Small (2205–2306)' },
      { id: 'medium', label: 'Medium (2806–3508)' },
      { id: 'large', label: 'Large (4004–4014)' },
      { id: 'very-large', label: 'Very Large (4114+)' },
    ],
    correctAnswer: 'large',
    explanation:
      'The stator is the electromagnet core inside the motor — its size sets how much torque the motor produces. A 10" prop needs the 4004–4014 range: enough torque to spin the prop without straining, but not so heavy it hurts hover time. Small 22xx stators lack the torque for 10" props and overheat trying. Medium 28xx–35xx can manage but run less efficiently. Very large 41xx+ weigh 150g+ per motor with no benefit. The 40xx sweet spot keeps hover throttle at 25–35% where efficiency peaks.',
    keyConcepts: [
      { name: 'Torque for prop size', terms: ['torque', '10 inch', '10"', 'prop size', 'large prop'], hint: 'Explain why the stator must match the prop\'s torque requirements' },
      { name: 'Weight tradeoff', terms: ['weight', 'heavy', 'mass', 'tradeoff', 'trade-off', 'balance', 'sweet spot'], hint: 'Discuss the balance between stator torque capacity and added motor mass' },
      { name: 'Efficiency at hover', terms: ['efficien', 'hover', 'throttle', 'current', 'power'], hint: 'Describe how correct stator size keeps hover throttle in the efficient zone' },
    ],
    minConcepts: 2,
    parameterValues: {
      small: { motorWeightOverride: 30, effPenalty: 0.82 },
      medium: { motorWeightOverride: 50, effPenalty: 0.92 },
      large: { motorWeightOverride: 68, effPenalty: 1.0 },
      'very-large': { motorWeightOverride: 140, effPenalty: 1.01 },
    },
  },

  // ── 5. Blade Count ─────────────────────────────────────────────────────
  {
    id: 'blade-count',
    category: 'Blade Count',
    icon: '🌀',
    question: 'How many propeller blades would you use?',
    context:
      'Each propeller can have 2, 3, 4, or more blades. More blades can produce more thrust in a given diameter, but there are aerodynamic tradeoffs.',
    options: [
      { id: '2-blade', label: '2-blade (bi-blade)' },
      { id: '3-blade', label: '3-blade (tri-blade)' },
      { id: '4-blade', label: '4-blade (quad-blade)' },
      { id: '5-blade', label: '5+ blade' },
    ],
    correctAnswer: '2-blade',
    explanation:
      'Two blades are most efficient because each blade leaves turbulent air behind it. More blades means each one flies through the disturbed air of the blade before it, producing less lift and more drag. With only 2 blades at 180° apart, each blade hits the cleanest air possible. Tri-blades make 10–15% more thrust but use 20–30% more power — a net efficiency loss. For hover, thrust per watt is what matters, and 2-blade wins clearly.',
    keyConcepts: [
      { name: 'Blade interference', terms: ['interferen', 'clean air', 'disturb', 'wake', 'turbulen', 'blade-to-blade'], hint: 'Explain how additional blades fly through disturbed air from preceding blades' },
      { name: 'Drag effects', terms: ['drag', 'friction', 'resist'], hint: 'Discuss how more blade surface area increases profile drag' },
      { name: 'Efficiency or thrust-to-power', terms: ['efficien', 'thrust per watt', 'gram per watt', 'g/w', 'power'], hint: 'Compare thrust gain vs power cost — more blades produce less thrust per watt' },
    ],
    minConcepts: 2,
    parameterValues: {
      '2-blade': { bladeEffMult: 1.15, bladeThrustMult: 0.88 },
      '3-blade': { bladeEffMult: 0.95, bladeThrustMult: 1.0 },
      '4-blade': { bladeEffMult: 0.82, bladeThrustMult: 1.08 },
      '5-blade': { bladeEffMult: 0.72, bladeThrustMult: 1.12 },
    },
  },

  // ── 6. Prop Pitch ──────────────────────────────────────────────────────
  {
    id: 'prop-pitch',
    category: 'Prop Pitch',
    icon: '📐',
    question: 'What propeller pitch would you select for a 10" prop?',
    context:
      'Pitch is the theoretical distance (in inches) the prop would advance through the air in one revolution, like a screw through wood. Higher pitch moves more air per revolution but requires more torque to spin.',
    options: [
      { id: 'low', label: 'Low pitch (3–4")' },
      { id: 'med-low', label: 'Medium-low pitch (4.5")' },
      { id: 'medium', label: 'Medium pitch (5")' },
      { id: 'high', label: 'High pitch (6"+)' },
    ],
    correctAnswer: 'med-low',
    explanation:
      'Pitch is how steeply the blade is angled. During hover, the prop just pushes air straight down — a gentler angle needs less torque, so the motor draws less current and wastes less heat. A 10×4.5 moves enough air per spin to hover while keeping the motor efficient. Too low (3–4") doesn\'t move enough air, forcing faster RPM. Too high (5–6"+) demands so much torque the motor overworks and wastes energy. 4.5" balances airflow against motor effort.',
    keyConcepts: [
      { name: 'Torque or current demand', terms: ['torque', 'current', 'amp', 'power draw', 'i²r', 'copper', 'loss'], hint: 'Explain how pitch angle affects motor torque demand and current draw' },
      { name: 'Air movement', terms: ['air', 'displace', 'angle', 'attack', 'move', 'push'], hint: 'Describe how pitch determines air displacement per revolution' },
      { name: 'Hover efficiency context', terms: ['hover', 'static', 'low speed', 'efficien', 'sweet spot', 'balance'], hint: 'Discuss why hover\'s static thrust scenario favors lower pitch' },
    ],
    minConcepts: 2,
    parameterValues: {
      low: { pitchEffMult: 0.95, pitchThrustMult: 0.80 },
      'med-low': { pitchEffMult: 1.08, pitchThrustMult: 0.90 },
      medium: { pitchEffMult: 1.0, pitchThrustMult: 1.0 },
      high: { pitchEffMult: 0.88, pitchThrustMult: 1.10 },
    },
  },

  // ── 7. Blade Profile ───────────────────────────────────────────────────
  {
    id: 'blade-profile',
    category: 'Blade Profile',
    icon: '✈️',
    question: 'What airfoil profile would you choose for the propeller blades?',
    context:
      'The cross-sectional shape of the blade determines how it generates lift and how much drag it produces. Different profiles are optimized for different flight regimes.',
    options: [
      { id: 'high-lift', label: 'High-lift cambered (thin, curved underside)' },
      { id: 'standard', label: 'Standard flat-bottom airfoil' },
      { id: 'scimitar', label: 'Scimitar (swept leading edge)' },
      { id: 'bullnose', label: 'Bullnose (wide, squared-off tips)' },
      { id: 'racing', label: 'Aggressive racing (steep angle of attack)' },
    ],
    correctAnswer: 'high-lift',
    explanation:
      'A cambered (curved) blade profile creates lift through a gentle pressure difference between its top and bottom surfaces. This gives the most lift per unit of drag at low speeds — exactly what hover is. At hover RPMs, airflow over the blade is slow, and cambered shapes are optimized for this. Flat-bottom airfoils work but aren\'t as efficient. Scimitar blades reduce tip losses but lose blade area. Bullnose tips add drag at the worst location (blade tips). Racing profiles stall at low RPM, wasting energy.',
    keyConcepts: [
      { name: 'Lift-to-drag ratio', terms: ['lift-to-drag', 'lift to drag', 'l/d', 'lift', 'drag'], hint: 'Explain how airfoil shape determines the ratio of useful lift to parasitic drag' },
      { name: 'Low airspeed context', terms: ['low airspeed', 'low speed', 'hover', 'slow', 'static', 'zero airspeed'], hint: 'Discuss why hover\'s low relative airspeed favors specific airfoil designs' },
      { name: 'Camber or pressure', terms: ['camber', 'curve', 'pressure', 'airfoil', 'profile', 'shape'], hint: 'Describe how blade curvature creates lift through pressure differential' },
    ],
    minConcepts: 2,
    parameterValues: {
      'high-lift': { profileEffMult: 1.08 },
      standard: { profileEffMult: 1.0 },
      scimitar: { profileEffMult: 1.04 },
      bullnose: { profileEffMult: 0.94 },
      racing: { profileEffMult: 0.90 },
    },
  },

  // ── 8. Prop Material ───────────────────────────────────────────────────
  {
    id: 'prop-material',
    category: 'Prop Material',
    icon: '🧱',
    question: 'What material would you choose for the propellers?',
    context:
      'Propeller material affects both weight and stiffness. Stiffer blades flex less under aerodynamic load, while heavier props add to the total weight the motors must lift.',
    options: [
      { id: 'carbon-fiber', label: 'Carbon fiber layup' },
      { id: 'carbon-pc', label: 'Carbon-infused polycarbonate' },
      { id: 'glass-nylon', label: 'Glass-filled nylon' },
      { id: 'polycarbonate', label: 'Standard polycarbonate' },
      { id: 'abs', label: 'ABS plastic' },
    ],
    correctAnswer: 'carbon-fiber',
    explanation:
      'Carbon fiber props are extremely stiff. When a blade flexes under air load, its angle changes and it produces less thrust with more drag. A stiff blade holds its shape, converting more motor energy into useful thrust. CF props weigh ~25% more than polycarbonate, but that\'s only ~4g per blade (16g total) — the ~10% efficiency gain from stiffness far outweighs this. ABS is lightest but bends too easily. Glass-nylon and carbon-PC are decent middle options, but full CF wins for hover endurance.',
    keyConcepts: [
      { name: 'Stiffness advantage', terms: ['stiff', 'rigid', 'flex', 'bend', 'deform', 'deflect', 'washout'], hint: 'Explain how blade flex under load changes effective pitch and wastes energy' },
      { name: 'Energy transfer to thrust', terms: ['energy', 'thrust', 'efficien', 'power', 'transfer'], hint: 'Discuss how rigid blades convert more motor energy into useful thrust' },
      { name: 'Weight vs performance', terms: ['weight', 'heavy', 'light', 'gram', 'tradeoff', 'trade-off', 'worth'], hint: 'Analyze whether the efficiency gain from stiffness outweighs the weight penalty' },
    ],
    minConcepts: 2,
    parameterValues: {
      'carbon-fiber': { matEffMult: 1.10, matWeightMult: 1.25 },
      'carbon-pc': { matEffMult: 1.06, matWeightMult: 1.02 },
      'glass-nylon': { matEffMult: 1.04, matWeightMult: 1.08 },
      polycarbonate: { matEffMult: 1.0, matWeightMult: 1.0 },
      abs: { matEffMult: 0.92, matWeightMult: 0.95 },
    },
  },

  // ── 9. Battery Chemistry ───────────────────────────────────────────────
  {
    id: 'battery-chemistry',
    category: 'Battery',
    icon: '🔋',
    question: 'What battery chemistry would you use?',
    context:
      'The battery must supply enough current for 4 motors at hover throttle (typically 5–15A total) and store as much energy as possible relative to its weight. Different chemistries have different energy densities and discharge capabilities.',
    options: [
      { id: 'li-ion', label: 'Li-ion (18650 / 21700 cells)' },
      { id: 'lipo', label: 'LiPo (lithium polymer)' },
      { id: 'lihv', label: 'LiHV (high-voltage lithium polymer)' },
      { id: 'lifepo4', label: 'LiFePO4 (lithium iron phosphate)' },
    ],
    correctAnswer: 'li-ion',
    explanation:
      'Li-ion cells (21700 format) store 230–260 Wh/kg vs LiPo\'s 130–160 Wh/kg — about 50% more energy per gram. For hover endurance, energy density is everything. Li-ion has lower burst capability (5–10C vs LiPo\'s 25–75C), but hover only draws 5–15A total, well within Li-ion limits. LiPo\'s high burst power is wasted at hover throttle, and you pay for it with much less energy per gram. LiHV offers a marginal voltage bump but similar density to LiPo. LiFePO4 is too heavy at 90–120 Wh/kg.',
    keyConcepts: [
      { name: 'Energy density', terms: ['energy density', 'wh/kg', 'watt-hour', 'watt hour', 'density', 'energy per'], hint: 'Explain why Wh/kg (energy per gram) is the critical battery metric for endurance' },
      { name: 'Hover discharge needs', terms: ['hover', 'low discharge', 'low current', 'c-rate', 'c rate', 'discharge', 'draw'], hint: 'Discuss why hover\'s low current draw makes high C-ratings unnecessary' },
      { name: 'Weight or endurance', terms: ['weight', 'heavy', 'light', 'endur', 'flight time', 'hover time', 'longer'], hint: 'Connect battery weight to hover power requirements and flight time' },
    ],
    minConcepts: 2,
    parameterValues: {
      'li-ion': { energyDensityWhKg: 245, batteryWeightG: 390 },
      lipo: { energyDensityWhKg: 155, batteryWeightG: 680 },
      lihv: { energyDensityWhKg: 165, batteryWeightG: 640 },
      lifepo4: { energyDensityWhKg: 105, batteryWeightG: 920 },
    },
  },
];

// ── Size-adapted question generator ──────────────────────────────────────

/**
 * Generate the 9 interview questions adapted for a specific drone size.
 *
 * - For size-independent questions, replaces "10" references in text.
 * - For size-dependent questions (motor-kv, motor-stator, prop-pitch) and
 *   weight-scaling questions (frame-material, battery-chemistry), merges
 *   overrides from the size config.
 *
 * @param {string} sizeId - One of '5', '7', '10', '13'
 * @returns {Array} The 9 questions, adapted for the given size
 */
export function getQuestionsForSize(sizeId) {
  const sizeConfig = getDroneSize(sizeId);
  const overrides = sizeConfig.questionOverrides || {};

  const sizeReplace = (text) => {
    if (!text || sizeId === '10') return text;
    return text
      .replace(/10"/g, `${sizeConfig.inches}"`)
      .replace(/10-inch/gi, `${sizeConfig.inches}-inch`)
      .replace(/10 inch/gi, `${sizeConfig.inches} inch`);
  };

  return INTERVIEW_QUESTIONS.map((baseQuestion) => {
    const override = overrides[baseQuestion.id];

    // Start with base question, text-replaced for size
    const adapted = {
      ...baseQuestion,
      question: sizeReplace(baseQuestion.question),
      context: sizeReplace(baseQuestion.context),
      explanation: sizeReplace(baseQuestion.explanation),
    };

    if (!override) return adapted;

    // Merge override on top (may replace full question or just parameterValues)
    return { ...adapted, ...override };
  });
}

// ── Grade thresholds ────────────────────────────────────────────────────

export const GRADE_THRESHOLDS = {
  S: 100,  // 9/9
  A: 89,   // 8/9
  B: 78,   // 7/9
  C: 56,   // 5-6/9
  D: 34,   // 3/9
  F: 0,    // <3/9
};

export function getGrade(correctCount, totalQuestions) {
  const pct = (correctCount / totalQuestions) * 100;
  if (pct >= GRADE_THRESHOLDS.S) return 'S';
  if (pct >= GRADE_THRESHOLDS.A) return 'A';
  if (pct >= GRADE_THRESHOLDS.B) return 'B';
  if (pct >= GRADE_THRESHOLDS.C) return 'C';
  if (pct >= GRADE_THRESHOLDS.D) return 'D';
  return 'F';
}

export const GRADE_COLORS = {
  S: 'neon-cyan',
  A: 'neon-green',
  B: 'neon-yellow',
  C: 'neon-orange',
  D: 'neon-red',
  F: 'neon-red',
};

export const GRADE_MESSAGES = {
  S: 'Flawless. You demonstrated complete mastery of drone efficiency physics.',
  A: 'Excellent. You understand the core principles — one choice was suboptimal.',
  B: 'Strong foundation. Review the missed questions to solidify your understanding.',
  C: 'Decent grasp of basics. Study the tradeoffs between weight, efficiency, and energy density.',
  D: 'Needs work. Focus on understanding why specific parameter ranges matter for hover.',
  F: 'Keep studying. Understanding motor efficiency, prop aerodynamics, and battery chemistry is essential.',
};

// ── Reasoning Validation ─────────────────────────────────────────────────

const MIN_WORD_COUNT = 8;

/**
 * Validate a user's reasoning text against a question's key physics concepts.
 *
 * Returns:
 *   adequate       – true if enough key concepts were mentioned
 *   matchedConcepts – names of concept groups the reasoning covered
 *   missedConcepts  – names of concept groups the reasoning missed
 *   tooShort        – true if the reasoning had fewer than MIN_WORD_COUNT words
 */
export function validateReasoning(questionId, reasoningText, questions = INTERVIEW_QUESTIONS) {
  const question = questions.find((q) => q.id === questionId);
  if (!question || !question.keyConcepts) {
    return { adequate: true, matchedConcepts: [], missedConcepts: [], tooShort: false };
  }

  const text = (reasoningText || '').toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount < MIN_WORD_COUNT) {
    return {
      adequate: false,
      matchedConcepts: [],
      missedConcepts: question.keyConcepts.map((c) => ({ name: c.name, hint: c.hint })),
      tooShort: true,
    };
  }

  const matchedConcepts = [];
  const missedConcepts = [];

  for (const concept of question.keyConcepts) {
    const found = concept.terms.some((term) => text.includes(term));
    if (found) {
      matchedConcepts.push({ name: concept.name, hint: concept.hint });
    } else {
      missedConcepts.push({ name: concept.name, hint: concept.hint });
    }
  }

  const required = question.minConcepts || 2;
  const adequate = matchedConcepts.length >= required;

  return { adequate, matchedConcepts, missedConcepts, tooShort: false };
}

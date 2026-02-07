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
      'Carbon fiber composite offers the highest strength-to-weight ratio of any common frame material. A 10" CF frame can weigh as little as 150–200g while maintaining excellent rigidity. Aluminum is strong but roughly 1.5–2× heavier for equivalent strength. ABS plastic is cheap and light by volume, but it flexes under load — vibrations waste motor energy and degrade flight stability, effectively requiring thicker (heavier) construction to achieve adequate stiffness. Glass fiber is a middle ground but still heavier than carbon for the same stiffness. For hover endurance, every gram of frame weight directly increases the power required to stay airborne, so the lightest structurally-sound option wins.',
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
      'True-X provides perfectly symmetric motor spacing — all four motors are equidistant from the center and from each other. This is optimal for hover because: (1) Equal moment arms mean each motor carries exactly 25% of the load with zero PID correction energy wasted on compensating for asymmetry. (2) Symmetric prop wash — every motor experiences the same downwash interaction from its neighbors, so no single motor is working harder than others. (3) Minimum frame material — four equal-length arms use less material than H-frame\'s parallel side plates, saving weight. H-frame is a close second but its parallel plate design creates slight asymmetry between the pitch and roll axes — the motors on each plate are closer together longitudinally than the plates are apart laterally. This means the FC must compensate differently in pitch vs roll, wasting small amounts of energy. Stretch-X elongates the pitch axis, optimized for forward flight not hover. Deadcat\'s asymmetric layout forces constant PID correction, burning energy. Plus (+) configuration causes the worst prop wash — adjacent motors at only 90° apart create severe downwash interference.',
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
      'Lower KV motors generate more torque per amp drawn from the battery. For hover, the drone only needs enough thrust to equal its weight — a small fraction of max thrust. This means hover throttle is low (typically 25–40%). Low-KV motors have their peak efficiency at these low throttle levels because they spin large props slowly with minimal current waste as heat. A 400KV motor on 6S spins a 10" prop at hover around 3,000–4,000 RPM — slow enough that motor copper losses and iron losses are both minimized. Higher KV motors would over-rev the prop, requiring electronic throttle limiting that wastes energy. The key physics: motor efficiency is I²R losses (copper) + eddy current losses (iron). Low KV at low throttle minimizes both.',
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
      'For a 10" propeller, the motor needs sufficient torque to spin the prop efficiently without straining. A 4004–4014 stator provides the right torque-to-weight balance. Torque scales with stator volume (diameter² × height), and a 10" prop has significant air resistance. Small 22xx stators are designed for 3–5" props — they lack the torque for 10" and would run at high current draw, overheating and losing efficiency. Medium 28xx–35xx stators are undersized for 10" props — they can spin them, but the motor runs harder (higher throttle for the same thrust), pushing into the less efficient part of the motor\'s power curve. Very large 41xx+ stators produce more torque than needed, adding unnecessary weight (150g+ per motor). The 40xx range hits the sweet spot: enough torque to keep hover throttle in the 25–35% range where motor efficiency peaks, without excessive mass.',
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
      'Bi-blade propellers are significantly more efficient for hover than any multi-blade design. The physics: each blade creates a downwash column and a tip vortex. When a second blade follows closely behind (as in tri/quad-blade props), it flies through the disturbed air left by the preceding blade — this is called blade-to-blade interference. The following blade generates less lift and more drag because it\'s working in turbulent, already-deflected air. With only 2 blades spaced 180° apart, each blade has maximum time to encounter relatively clean air before the next blade passes. Additionally, fewer blades mean less total blade area, which reduces profile drag (the drag from the blade surfaces moving through air). Tri-blade props produce about 10–15% more thrust than bi-blade at the same RPM, but they draw 20–30% more power — a net efficiency loss. For hover endurance, the thrust-to-power ratio (grams of thrust per watt consumed) is what matters, and bi-blade wins decisively.',
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
      'For hover, medium-low pitch (4.5") provides the best efficiency on a 10" diameter prop. The key insight is that hover is a static thrust scenario — the propeller is not moving forward through the air, so it\'s purely pushing air downward. Lower pitch means a gentler blade angle of attack, which requires less torque per revolution. Less torque = less current = less I²R copper loss in the motor windings. A 10×4.5 prop at hover RPM moves enough air to generate the required thrust while keeping the motor in its peak efficiency zone. Low pitch (3–4") doesn\'t move enough air per revolution, requiring higher RPM to generate adequate thrust — the motor spins faster, increasing iron (eddy current) losses. Medium (5") and high (6"+) pitch props demand significantly more torque, pushing the motor into a higher current draw where copper losses dominate. The sweet spot balances air displacement per revolution against the torque demand — 4.5" pitch on 10" diameter is that balance point.',
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
      'A high-lift cambered airfoil maximizes the lift-to-drag ratio (L/D) at low airspeeds. Hover is essentially zero forward airspeed — the prop blade\'s "airspeed" comes entirely from its rotational velocity. At the low RPMs used for efficient hover, the relative airspeed at each blade section is modest. A thin, cambered profile generates lift through gentle pressure differential rather than aggressive deflection. This means more thrust per unit of drag, which translates directly to more grams-of-lift per watt consumed. Standard flat-bottom airfoils are a reasonable default but lack the optimized camber for low-speed lift. Scimitar profiles reduce tip vortex losses (good) but their swept shape decreases effective blade area. Bullnose wide tips add blade area where tip speed is highest, dramatically increasing profile drag at the tips — the worst location for drag since it requires the most torque to overcome. Racing profiles use steep angles of attack designed to push maximum air at high RPM — they waste enormous energy at hover RPMs because the steep angle creates flow separation (turbulent drag) at low speeds.',
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
      'Carbon fiber propellers provide the highest stiffness-to-weight ratio. Stiffness matters because a propeller blade under aerodynamic load flexes — and flex changes the effective blade angle along its span. This "pitch washout" reduces thrust generation and increases induced drag. A stiffer blade maintains its designed pitch throughout the rotation, transferring more motor energy into useful thrust. Carbon fiber props are about 25% heavier than standard polycarbonate, but for a 10" prop this is only ~4g extra per prop (16g across 4 props). The efficiency gain from stiffness (roughly 10% better power-to-thrust conversion) saves far more energy than the 16g weight penalty costs. ABS is the lightest but so flexible that blade deformation at hover RPM wastes significant energy. Glass-filled nylon and carbon-infused PC are reasonable middle grounds, but full carbon layup remains the optimal choice when hover endurance is the sole objective.',
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
      'Li-ion cells (specifically 21700 format like Molicel P42A or Samsung 40T) offer the highest energy density at 230–260 Wh/kg, compared to LiPo\'s 130–160 Wh/kg. Energy density is the critical metric for hover endurance — it determines how many watt-hours of energy you carry per gram of battery weight. More Wh/kg means longer hover time for the same battery mass, or a lighter battery for the same flight time (lighter = less power needed = even longer hover). The tradeoff: Li-ion cells have lower C-ratings (typically 5–10C vs LiPo\'s 25–75C), meaning lower burst discharge. But hover only draws 5–15A total — well within Li-ion discharge limits. LiPo\'s high discharge capability is wasted at hover throttle, and you pay for it with 40–50% less energy per gram. LiHV has slightly higher voltage per cell (4.35V vs 4.2V) but similar energy density to LiPo — marginal gain. LiFePO4 is extremely safe and long-lasting but has the lowest energy density (~90–120 Wh/kg) — far too heavy for endurance.',
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

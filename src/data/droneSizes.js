/**
 * Drone Size Configurations
 *
 * Defines 4 drone sizes (5", 7", 10", 13") with:
 *  - Hover time estimator constants (prop weight, ESC weight, etc.)
 *  - Default parameter values for the estimator
 *  - Question overrides for the 3 size-dependent questions
 *    (motor-kv, motor-stator, prop-pitch) plus parameterValues-only
 *    overrides for frame-material and battery-chemistry weight scaling.
 */

// ── 5-Inch ──────────────────────────────────────────────────────────────────

const SIZE_5 = {
  id: '5',
  label: '5"',
  name: '5-Inch',
  inches: 5,
  description: 'Micro endurance. Smallest viable hover platform.',
  icon: '🐝',

  estimator: {
    basePropWeight: 5,
    fixedEscWeight: 12,
    fixedFcWeight: 8,
    baseGPerWatt: 7,
  },

  defaults: {
    frameWeightG: 100,
    geoEffMult: 1.02,
    motorEffAtHover: 0.88,
    motorWeightG: 32,
    statorEffPenalty: 1.0,
    bladeEffMult: 1.15,
    pitchEffMult: 1.08,
    profileEffMult: 1.08,
    matEffMult: 1.10,
    matWeightMult: 1.25,
    energyDensityWhKg: 245,
    batteryWeightG: 250,
  },

  questionOverrides: {
    'frame-material': {
      parameterValues: {
        'carbon-fiber': { frameWeightG: 100 },
        aluminum: { frameWeightG: 180 },
        abs: { frameWeightG: 140 },
        'glass-fiber': { frameWeightG: 120 },
      },
    },

    'motor-kv': {
      question: 'What KV range would you select for the motors?',
      context:
        'KV indicates how many RPM the motor spins per volt applied (unloaded). On a 6S battery (~22V), a 1500KV motor spins at ~33,000 RPM max while a 400KV motor spins at ~8,800 RPM max. A 5" prop has only 25% the disc area of a 10" prop.',
      options: [
        { id: 'low-kv', label: 'Low KV (580–700)' },
        { id: 'mid-kv', label: 'Mid KV (900–1200)' },
        { id: 'mid-high-kv', label: 'Mid-High KV (1400–1600)' },
        { id: 'very-high-kv', label: 'Very High KV (2300+)' },
      ],
      correctAnswer: 'mid-high-kv',
      explanation:
        'A 5" prop has only 25% the area of a 10", so it must spin much faster to push enough air. A 1500KV motor on 6S spins it at ~8,000–12,000 RPM during hover — just right. Lower KV (580–700) under-revs a small prop, forcing inefficient high throttle. Mid KV (900–1200) works but carries unnecessary torque/weight. Very high KV (2300+) over-revs and wastes energy as heat and turbulence. Match the KV to the prop size: small prop = higher KV.',
      keyConcepts: [
        { name: 'RPM for small prop', terms: ['rpm', 'spin', 'speed', 'fast', 'revolution', 'rotation'], hint: 'Explain why a 5" prop needs higher RPM to generate adequate thrust' },
        { name: 'Disc area compensation', terms: ['disc area', 'area', 'small', '5 inch', '5"', 'diameter', 'size'], hint: 'Discuss how small disc area requires faster spinning to move enough air' },
        { name: 'Hover efficiency', terms: ['efficien', 'hover', 'throttle', 'thrust', 'power'], hint: 'Describe how KV must match prop size to keep hover throttle efficient' },
      ],
      minConcepts: 2,
      parameterValues: {
        'low-kv': { motorEffAtHover: 0.65, motorWeightG: 42 },
        'mid-kv': { motorEffAtHover: 0.78, motorWeightG: 36 },
        'mid-high-kv': { motorEffAtHover: 0.88, motorWeightG: 32 },
        'very-high-kv': { motorEffAtHover: 0.55, motorWeightG: 24 },
      },
    },

    'motor-stator': {
      question: 'What stator diameter would you choose for the motors?',
      context:
        'The stator is the stationary electromagnet core inside the motor. Stator size is expressed as DDMM (e.g., 2205 = 22mm diameter, 5mm height). Larger stators produce more torque but add weight. A 5" prop is lightweight and requires minimal torque.',
      options: [
        { id: 'tiny', label: 'Tiny (1404–1507)' },
        { id: 'small', label: 'Small (2205–2306)' },
        { id: 'medium', label: 'Medium (2806–3115)' },
        { id: 'large', label: 'Large (4004+)' },
      ],
      correctAnswer: 'small',
      explanation:
        'A 5" prop is lightweight and needs minimal torque to spin. A 2205 stator (~30–32g) delivers enough torque to keep hover throttle in the efficient 25–35% range. Tiny 14xx stators overheat because they can\'t handle the current efficiently. Medium 28xx stators add 16–20g of unnecessary weight per motor (64–80g total). Large 40xx+ are built for 10"+ props and add 150g+ of dead weight. Match the stator to the prop — don\'t oversize it.',
      keyConcepts: [
        { name: 'Torque for prop size', terms: ['torque', '5 inch', '5"', 'prop size', 'small prop', 'lightweight'], hint: 'Explain why a lightweight 5" prop needs minimal torque from the motor' },
        { name: 'Weight tradeoff', terms: ['weight', 'heavy', 'mass', 'tradeoff', 'trade-off', 'balance', 'sweet spot'], hint: 'Discuss how oversized stators add unnecessary weight on a small build' },
        { name: 'Efficiency at hover', terms: ['efficien', 'hover', 'throttle', 'current', 'power'], hint: 'Describe how matching stator size to prop load keeps the motor efficient' },
      ],
      minConcepts: 2,
      parameterValues: {
        tiny: { motorWeightOverride: 18, effPenalty: 0.85 },
        small: { motorWeightOverride: 32, effPenalty: 1.0 },
        medium: { motorWeightOverride: 48, effPenalty: 0.93 },
        large: { motorWeightOverride: 68, effPenalty: 0.80 },
      },
    },

    'prop-pitch': {
      question: 'What propeller pitch would you select for a 5" prop?',
      context:
        'Pitch is the theoretical distance (in inches) the prop would advance through the air in one revolution, like a screw through wood. Higher pitch moves more air per revolution but requires more torque to spin.',
      options: [
        { id: 'low', label: 'Low pitch (2–2.5")' },
        { id: 'med-low', label: 'Medium-low pitch (3–3.5")' },
        { id: 'medium', label: 'Medium pitch (4–4.5")' },
        { id: 'high', label: 'High pitch (5"+)' },
      ],
      correctAnswer: 'med-low',
      explanation:
        'Pitch sets the blade angle — steeper moves more air per spin but demands more torque. A 5×3 or 5×3.5 pushes enough air to hover without straining the small 22xx motors. Lower pitch (2–2.5") doesn\'t move enough air, forcing higher RPM and wasted energy. Higher pitch (4"+) demands too much torque for the small motors, drawing excess current. The sweet spot balances airflow against motor effort.',
      keyConcepts: [
        { name: 'Torque or current demand', terms: ['torque', 'current', 'amp', 'power draw', 'i²r', 'copper', 'loss'], hint: 'Explain how pitch angle affects motor torque demand and current draw' },
        { name: 'Air movement', terms: ['air', 'displace', 'angle', 'attack', 'move', 'push'], hint: 'Describe how pitch determines air displacement per revolution' },
        { name: 'Hover efficiency context', terms: ['hover', 'static', 'low speed', 'efficien', 'sweet spot', 'balance'], hint: 'Discuss why the pitch-to-diameter ratio must balance airflow against torque' },
      ],
      minConcepts: 2,
      parameterValues: {
        low: { pitchEffMult: 0.92, pitchThrustMult: 0.78 },
        'med-low': { pitchEffMult: 1.08, pitchThrustMult: 0.90 },
        medium: { pitchEffMult: 0.98, pitchThrustMult: 1.0 },
        high: { pitchEffMult: 0.85, pitchThrustMult: 1.10 },
      },
    },

    'battery-chemistry': {
      parameterValues: {
        'li-ion': { energyDensityWhKg: 245, batteryWeightG: 250 },
        lipo: { energyDensityWhKg: 155, batteryWeightG: 440 },
        lihv: { energyDensityWhKg: 165, batteryWeightG: 410 },
        lifepo4: { energyDensityWhKg: 105, batteryWeightG: 600 },
      },
    },
  },
};

// ── 7-Inch ──────────────────────────────────────────────────────────────────

const SIZE_7 = {
  id: '7',
  label: '7"',
  name: '7-Inch',
  inches: 7,
  description: 'Mid-range cruiser. Balance of portability and flight time.',
  icon: '🕊️',

  estimator: {
    basePropWeight: 9,
    fixedEscWeight: 20,
    fixedFcWeight: 10,
    baseGPerWatt: 8.5,
  },

  defaults: {
    frameWeightG: 140,
    geoEffMult: 1.02,
    motorEffAtHover: 0.88,
    motorWeightG: 48,
    statorEffPenalty: 1.0,
    bladeEffMult: 1.15,
    pitchEffMult: 1.08,
    profileEffMult: 1.08,
    matEffMult: 1.10,
    matWeightMult: 1.25,
    energyDensityWhKg: 245,
    batteryWeightG: 320,
  },

  questionOverrides: {
    'frame-material': {
      parameterValues: {
        'carbon-fiber': { frameWeightG: 140 },
        aluminum: { frameWeightG: 250 },
        abs: { frameWeightG: 195 },
        'glass-fiber': { frameWeightG: 175 },
      },
    },

    'motor-kv': {
      question: 'What KV range would you select for the motors?',
      context:
        'KV indicates how many RPM the motor spins per volt applied (unloaded). On a 6S battery (~22V), a 1000KV motor spins at ~22,000 RPM max while a 400KV motor spins at ~8,800 RPM max. A 7" prop has about half the disc area of a 10" prop.',
      options: [
        { id: 'low-kv', label: 'Low KV (500–700)' },
        { id: 'mid-kv', label: 'Mid KV (900–1200)' },
        { id: 'mid-high-kv', label: 'Mid-High KV (1400–1600)' },
        { id: 'high-kv', label: 'High KV (1800+)' },
      ],
      correctAnswer: 'mid-kv',
      explanation:
        'A 7" prop has about half the area of a 10", so it needs moderately higher RPM. A 1000KV motor on 6S spins it at ~5,000–7,000 RPM during hover — efficient and adequate. Low KV (500–700) under-revs a 7" prop, requiring inefficient high throttle. Mid-high KV (1400–1600) over-revs it, creating turbulence and heat waste. The goal: match KV to prop size so hover throttle lands in the 25–35% peak efficiency zone.',
      keyConcepts: [
        { name: 'Torque advantage', terms: ['torque', 'force', 'turning force'], hint: 'Explain why the KV must match the 7" prop\'s moderate torque requirements' },
        { name: 'Hover efficiency', terms: ['efficien', 'hover', 'low throttle', 'throttle', 'cruise'], hint: 'Discuss how mid KV keeps hover throttle in the motor\'s peak efficiency zone' },
        { name: 'RPM or speed matching', terms: ['rpm', 'spin', 'speed', 'slow', 'revolution', 'rotation', 'match'], hint: 'Describe why RPM must match the 7" prop\'s disc area for efficient hover' },
      ],
      minConcepts: 2,
      parameterValues: {
        'low-kv': { motorEffAtHover: 0.72, motorWeightG: 56 },
        'mid-kv': { motorEffAtHover: 0.88, motorWeightG: 48 },
        'mid-high-kv': { motorEffAtHover: 0.76, motorWeightG: 36 },
        'high-kv': { motorEffAtHover: 0.58, motorWeightG: 30 },
      },
    },

    'motor-stator': {
      question: 'What stator diameter would you choose for the motors?',
      context:
        'The stator is the stationary electromagnet core inside the motor. Stator size is expressed as DDMM (e.g., 2806 = 28mm diameter, 6mm height). Larger stators produce more torque but add weight. A 7" prop needs moderate torque.',
      options: [
        { id: 'small', label: 'Small (2205–2306)' },
        { id: 'medium', label: 'Medium (2806–3115)' },
        { id: 'large', label: 'Large (4004–4014)' },
        { id: 'very-large', label: 'Very Large (4114+)' },
      ],
      correctAnswer: 'medium',
      explanation:
        'A 7" prop needs moderate torque — more than a 5" but less than a 10". A 2806 stator (~45–50g) delivers enough to keep hover throttle in the efficient 25–35% range. Small 22xx stators lack the torque, forcing the motor to run hotter. Large 40xx stators add ~20g of unnecessary weight per motor (80g total). Match the stator to the prop\'s needs — don\'t over- or under-size it.',
      keyConcepts: [
        { name: 'Torque for prop size', terms: ['torque', '7 inch', '7"', 'prop size'], hint: 'Explain why a 7" prop needs moderate torque — more than 5" but less than 10"' },
        { name: 'Weight tradeoff', terms: ['weight', 'heavy', 'mass', 'tradeoff', 'trade-off', 'balance', 'sweet spot'], hint: 'Discuss the balance between adequate torque and unnecessary motor mass' },
        { name: 'Efficiency at hover', terms: ['efficien', 'hover', 'throttle', 'current', 'power'], hint: 'Describe how correct stator size keeps hover throttle in the efficient zone' },
      ],
      minConcepts: 2,
      parameterValues: {
        small: { motorWeightOverride: 32, effPenalty: 0.84 },
        medium: { motorWeightOverride: 48, effPenalty: 1.0 },
        large: { motorWeightOverride: 68, effPenalty: 0.94 },
        'very-large': { motorWeightOverride: 120, effPenalty: 0.82 },
      },
    },

    'prop-pitch': {
      question: 'What propeller pitch would you select for a 7" prop?',
      context:
        'Pitch is the theoretical distance (in inches) the prop would advance through the air in one revolution, like a screw through wood. Higher pitch moves more air per revolution but requires more torque to spin.',
      options: [
        { id: 'low', label: 'Low pitch (2.5–3")' },
        { id: 'med-low', label: 'Medium-low pitch (3.5–4")' },
        { id: 'medium', label: 'Medium pitch (4.5–5")' },
        { id: 'high', label: 'High pitch (5.5"+)' },
      ],
      correctAnswer: 'med-low',
      explanation:
        'A 7" prop already sweeps decent air volume per spin, so it doesn\'t need a steep blade angle. A 7×3.5 or 7×4 moves enough air to hover without overworking the motor. Low pitch (2.5–3") doesn\'t move enough air, forcing higher RPM. Medium (4.5–5") and high (5.5"+) pitch demand more torque than the typical 2806 stators can deliver efficiently. The sweet spot: moderate RPM, low current draw, peak efficiency.',
      keyConcepts: [
        { name: 'Torque or current demand', terms: ['torque', 'current', 'amp', 'power draw', 'i²r', 'copper', 'loss'], hint: 'Explain how pitch angle affects torque demand for a 7" prop' },
        { name: 'Air movement', terms: ['air', 'displace', 'angle', 'attack', 'move', 'push'], hint: 'Describe how pitch determines air displacement per revolution' },
        { name: 'Hover efficiency context', terms: ['hover', 'static', 'low speed', 'efficien', 'sweet spot', 'balance'], hint: 'Discuss why the pitch-to-diameter ratio must balance airflow against torque' },
      ],
      minConcepts: 2,
      parameterValues: {
        low: { pitchEffMult: 0.94, pitchThrustMult: 0.78 },
        'med-low': { pitchEffMult: 1.08, pitchThrustMult: 0.90 },
        medium: { pitchEffMult: 0.99, pitchThrustMult: 1.0 },
        high: { pitchEffMult: 0.86, pitchThrustMult: 1.10 },
      },
    },

    'battery-chemistry': {
      parameterValues: {
        'li-ion': { energyDensityWhKg: 245, batteryWeightG: 320 },
        lipo: { energyDensityWhKg: 155, batteryWeightG: 560 },
        lihv: { energyDensityWhKg: 165, batteryWeightG: 530 },
        lifepo4: { energyDensityWhKg: 105, batteryWeightG: 760 },
      },
    },
  },
};

// ── 10-Inch (matches existing interviewQuestions.js) ────────────────────────

const SIZE_10 = {
  id: '10',
  label: '10"',
  name: '10-Inch',
  inches: 10,
  description: 'The classic. Standard long-range hover build.',
  icon: '🚁',

  estimator: {
    basePropWeight: 14,
    fixedEscWeight: 32,
    fixedFcWeight: 10,
    baseGPerWatt: 10,
  },

  defaults: {
    frameWeightG: 180,
    geoEffMult: 1.02,
    motorEffAtHover: 0.88,
    motorWeightG: 68,
    statorEffPenalty: 1.0,
    bladeEffMult: 1.15,
    pitchEffMult: 1.08,
    profileEffMult: 1.08,
    matEffMult: 1.10,
    matWeightMult: 1.25,
    energyDensityWhKg: 245,
    batteryWeightG: 390,
  },

  // No overrides — base interviewQuestions.js is already written for 10"
  questionOverrides: {},
};

// ── 13-Inch ─────────────────────────────────────────────────────────────────

const SIZE_13 = {
  id: '13',
  label: '13"',
  name: '13-Inch',
  inches: 13,
  description: 'Heavy lift endurance. Maximum hover time potential.',
  icon: '🦅',

  estimator: {
    basePropWeight: 22,
    fixedEscWeight: 45,
    fixedFcWeight: 12,
    baseGPerWatt: 12,
  },

  defaults: {
    frameWeightG: 300,
    geoEffMult: 1.02,
    motorEffAtHover: 0.88,
    motorWeightG: 120,
    statorEffPenalty: 1.0,
    bladeEffMult: 1.15,
    pitchEffMult: 1.08,
    profileEffMult: 1.08,
    matEffMult: 1.10,
    matWeightMult: 1.25,
    energyDensityWhKg: 245,
    batteryWeightG: 500,
  },

  questionOverrides: {
    'frame-material': {
      parameterValues: {
        'carbon-fiber': { frameWeightG: 300 },
        aluminum: { frameWeightG: 530 },
        abs: { frameWeightG: 420 },
        'glass-fiber': { frameWeightG: 360 },
      },
    },

    'motor-kv': {
      question: 'What KV range would you select for the motors?',
      context:
        'KV indicates how many RPM the motor spins per volt applied (unloaded). On a 6S battery (~22V), a 250KV motor spins at ~5,500 RPM max while a 900KV motor spins at ~19,800 RPM max. A 13" prop has 1.69× the disc area of a 10" prop.',
      options: [
        { id: 'very-low-kv', label: 'Very Low KV (150–280)' },
        { id: 'low-kv', label: 'Low KV (300–450)' },
        { id: 'mid-kv', label: 'Mid KV (500–700)' },
        { id: 'high-kv', label: 'High KV (900+)' },
      ],
      correctAnswer: 'very-low-kv',
      explanation:
        'A 13" prop has 1.69× the area of a 10", so each spin moves a massive air column — it barely needs to spin to generate enough thrust. A 200KV motor on 6S hovers at only ~2,000–3,000 RPM, extremely slow and efficient. Low KV (300–450) over-revs a 13" prop, creating tip turbulence. Mid and high KV would spin it dangerously fast with extreme drag and vibration. Huge prop = slow spin = lowest energy waste.',
      keyConcepts: [
        { name: 'Torque advantage', terms: ['torque', 'force', 'turning'], hint: 'Explain why the 13" prop\'s massive disc area requires very low RPM' },
        { name: 'Hover efficiency', terms: ['efficien', 'hover', 'low throttle', 'throttle', 'cruise'], hint: 'Discuss how very low KV maximizes efficiency with the large prop\'s air displacement' },
        { name: 'RPM or speed relationship', terms: ['rpm', 'spin', 'speed', 'slow', 'revolution', 'rotation'], hint: 'Describe why slower RPM reduces both copper and iron losses in the motor' },
      ],
      minConcepts: 2,
      parameterValues: {
        'very-low-kv': { motorEffAtHover: 0.88, motorWeightG: 120 },
        'low-kv': { motorEffAtHover: 0.78, motorWeightG: 80 },
        'mid-kv': { motorEffAtHover: 0.62, motorWeightG: 56 },
        'high-kv': { motorEffAtHover: 0.45, motorWeightG: 42 },
      },
    },

    'motor-stator': {
      question: 'What stator diameter would you choose for the motors?',
      context:
        'The stator is the stationary electromagnet core inside the motor. Stator size is expressed as DDMM (e.g., 4014 = 40mm diameter, 14mm height). Larger stators produce more torque but add weight. A 13" prop has high rotational inertia and air resistance.',
      options: [
        { id: 'medium', label: 'Medium (3508–4004)' },
        { id: 'large', label: 'Large (4004–4014)' },
        { id: 'very-large', label: 'Very Large (4014–5008)' },
        { id: 'massive', label: 'Massive (5010+)' },
      ],
      correctAnswer: 'very-large',
      explanation:
        'A 13" prop is heavy with high air resistance, so the motor needs serious torque. A 4014 (~100–120g) or 5008 (~150g) stator delivers enough torque for efficient low-RPM hover. Medium 35xx–4004 stators struggle under the load, overheating and drawing excess current. Massive 5010+ weigh 180g+ each (720g+ total in motors) — unnecessary weight that hurts hover time. The 4014–5008 range: enough torque at 25–35% throttle without excess mass.',
      keyConcepts: [
        { name: 'Torque for prop size', terms: ['torque', '13 inch', '13"', 'prop size', 'large prop', 'inertia'], hint: 'Explain why a 13" prop\'s high inertia and air resistance demand a large stator' },
        { name: 'Weight tradeoff', terms: ['weight', 'heavy', 'mass', 'tradeoff', 'trade-off', 'balance', 'sweet spot'], hint: 'Discuss the balance between sufficient torque capacity and excessive motor mass' },
        { name: 'Efficiency at hover', terms: ['efficien', 'hover', 'throttle', 'current', 'power'], hint: 'Describe how the right stator size keeps hover throttle low and efficient' },
      ],
      minConcepts: 2,
      parameterValues: {
        medium: { motorWeightOverride: 68, effPenalty: 0.82 },
        large: { motorWeightOverride: 100, effPenalty: 0.92 },
        'very-large': { motorWeightOverride: 120, effPenalty: 1.0 },
        massive: { motorWeightOverride: 180, effPenalty: 1.01 },
      },
    },

    'prop-pitch': {
      question: 'What propeller pitch would you select for a 13" prop?',
      context:
        'Pitch is the theoretical distance (in inches) the prop would advance through the air in one revolution, like a screw through wood. Higher pitch moves more air per revolution but requires more torque to spin.',
      options: [
        { id: 'low', label: 'Low pitch (3.5–4")' },
        { id: 'med-low', label: 'Medium-low pitch (4.5–5")' },
        { id: 'medium', label: 'Medium pitch (5.5–6")' },
        { id: 'high', label: 'High pitch (6.5"+)' },
      ],
      correctAnswer: 'med-low',
      explanation:
        'A 13" prop sweeps a massive air column each spin, so it doesn\'t need a steep blade angle. A 13×4.5 or 13×5 produces plenty of hover thrust at very low RPM (2,000–3,000). Lower pitch (3.5–4") doesn\'t move quite enough air, requiring slightly higher RPM. Higher pitch (5.5"+) demands far more torque, drawing heavy current and wasting energy. Let the big prop leverage its size with a gentle angle and minimal motor effort.',
      keyConcepts: [
        { name: 'Torque or current demand', terms: ['torque', 'current', 'amp', 'power draw', 'i²r', 'copper', 'loss'], hint: 'Explain how pitch angle affects torque demand on the large 13" prop' },
        { name: 'Air movement', terms: ['air', 'displace', 'angle', 'attack', 'move', 'push', 'sweep'], hint: 'Describe how the large disc area moves air efficiently at low pitch' },
        { name: 'Hover efficiency context', terms: ['hover', 'static', 'low speed', 'efficien', 'sweet spot', 'balance'], hint: 'Discuss why hover\'s static thrust scenario favors moderate pitch on large props' },
      ],
      minConcepts: 2,
      parameterValues: {
        low: { pitchEffMult: 0.96, pitchThrustMult: 0.82 },
        'med-low': { pitchEffMult: 1.08, pitchThrustMult: 0.90 },
        medium: { pitchEffMult: 1.0, pitchThrustMult: 1.0 },
        high: { pitchEffMult: 0.86, pitchThrustMult: 1.10 },
      },
    },

    'battery-chemistry': {
      parameterValues: {
        'li-ion': { energyDensityWhKg: 245, batteryWeightG: 500 },
        lipo: { energyDensityWhKg: 155, batteryWeightG: 870 },
        lihv: { energyDensityWhKg: 165, batteryWeightG: 820 },
        lifepo4: { energyDensityWhKg: 105, batteryWeightG: 1180 },
      },
    },
  },
};

// ── Exports ─────────────────────────────────────────────────────────────────

export const DRONE_SIZES = {
  '5': SIZE_5,
  '7': SIZE_7,
  '10': SIZE_10,
  '13': SIZE_13,
};

export const DRONE_SIZE_LIST = [SIZE_5, SIZE_7, SIZE_10, SIZE_13];

export function getDroneSize(sizeId) {
  return DRONE_SIZES[sizeId] || DRONE_SIZES['10'];
}

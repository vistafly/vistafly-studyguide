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
        'For a 5" prop on 6S, mid-high KV (1400–1600) is optimal. Small props have very low air resistance and need higher RPM to generate adequate thrust because their disc area is only 25% of a 10" prop\'s. A 1500KV motor on 6S spins a 5" prop at hover around 8,000–12,000 RPM — fast enough to move sufficient air volume. Lower KV motors (580–700) would under-rev the small prop, requiring aggressive throttle that pushes the motor into an inefficient operating region. Mid KV (900–1200) can work but leaves the motor over-torqued for the light prop — wasting the extra torque capacity as unnecessary weight. Very high KV (2300+) over-revs even at hover, creating excessive air turbulence and iron losses. The key physics: thrust scales with disc area × air velocity². A 5" prop must spin faster to compensate for its small area.',
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
        'For a 5" propeller, small stators (2205–2306) provide the ideal torque-to-weight balance. A 5" prop has very low air resistance, requiring minimal torque to spin efficiently. A 2205 stator at ~30–32g delivers more than enough torque to keep hover throttle in the efficient 25–35% range. Tiny 14xx stators (designed for 2–3" props) don\'t have enough copper windings to handle the current draw efficiently, leading to excessive heat and I²R losses. Medium 28xx stators produce far more torque than a 5" prop needs, adding 16–20g per motor of unnecessary weight — that\'s 64–80g total across 4 motors, directly reducing hover time. Large 40xx+ stators are designed for 10"+ props and would add 150+ grams of dead weight.',
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
        'For hover on a 5" diameter prop, medium-low pitch (3–3.5") is optimal. The pitch-to-diameter ratio of roughly 0.6–0.7 balances air displacement per revolution against torque demand. A 5×3 or 5×3.5 prop moves enough air per revolution at mid-high RPM to sustain hover, while keeping the blade angle gentle enough for efficient motor operation. Lower pitch (2–2.5") doesn\'t displace enough air per revolution, forcing even higher RPM which increases iron losses in the motor. Higher pitch (4"+) on such a small diameter creates excessive torque demand relative to the small 22xx stators used on 5" builds, pushing current draw into the inefficient zone. The sweet spot minimizes torque demand while maintaining adequate airflow.',
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
        'For a 7" prop on 6S, mid KV (900–1200) is the sweet spot. A 7" prop has about half the disc area of a 10" prop, so it needs moderately higher RPM than a 10" setup to generate the same thrust. A 1000KV motor on 6S spins a 7" prop at hover around 5,000–7,000 RPM — enough air displacement while keeping motor efficiency high. Low KV (500–700) is optimized for 10"+ props and would under-rev a 7" prop, requiring higher throttle that pushes into less efficient operating regions. Mid-high KV (1400–1600) is better suited for 5" props and would over-rev the 7" at hover, creating unnecessary turbulence and eddy current losses. The key: motor KV should match the prop diameter so hover throttle lands in the 25–35% range where motor efficiency peaks.',
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
        'For a 7" propeller, medium stators (2806–3115) provide the right torque-to-weight balance. A 7" prop has moderate air resistance — more than a 5" but significantly less than a 10". A 2806 stator at ~45–50g delivers enough torque to keep hover throttle in the 25–35% efficiency sweet spot. Small 22xx stators (designed for 5" props) lack sufficient torque for 7" — the motor would run at higher throttle, increasing I²R copper losses and generating excess heat. Large 40xx stators provide more torque than a 7" prop needs, adding ~20g per motor (80g total) of unnecessary weight. The right stator size matches the torque requirement of the prop while minimizing motor mass.',
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
        'For hover on a 7" diameter prop, medium-low pitch (3.5–4") is optimal. A 7×3.5 or 7×4 prop achieves a pitch-to-diameter ratio of 0.5–0.57, which balances air displacement per revolution against torque demand at this size. The larger disc area compared to 5" means each revolution already sweeps a substantial air column — moderate pitch moves enough air without excessive torque demand. Low pitch (2.5–3") doesn\'t move enough air per revolution, forcing higher RPM to compensate. Medium (4.5–5") and high (5.5"+) pitch on 7" requires more torque than the typical 2806 stator delivers efficiently, pushing current draw into the wasteful zone. The sweet spot keeps hover RPM moderate and motor current low.',
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
        'For a 13" prop on 6S, very low KV (150–280) is optimal. A 13" propeller has massive disc area (1.69× more than 10") and significant rotational inertia. It generates abundant thrust at low RPM — a 200KV motor on 6S spins a 13" prop at hover around 2,000–3,000 RPM, which is very slow and very efficient. At these low speeds, both copper losses (I²R) and iron losses (eddy currents) are minimized. Low KV (300–450) is better suited for 10" props and would over-rev a 13", creating unnecessary turbulence at the blade tips where drag is highest. Mid and high KV motors would spin the massive prop far too fast, creating extreme tip drag, excessive current draw, and dangerous vibrations from the prop inertia. The physics: larger disc area means each revolution moves a huge air column, so fewer revolutions per second are needed.',
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
        'For a 13" propeller, very large stators (4014–5008) provide the right torque-to-weight balance. A 13" prop has significantly more air resistance and rotational inertia than a 10" prop — torque scales with diameter cubed in propeller physics. A 4014 stator (~100–120g) or 5008 (~150g) delivers the high torque needed to keep the 13" prop in the efficient low-RPM hover zone. Medium 35xx–4004 stators would strain under the torque load of a 13" prop, running at higher current draw and overheating — the motor works harder, efficiency drops. Massive 5010+ stators produce more torque than needed and weigh 180g+ each, adding over 720g to the build just in motors. The 4014–5008 range is the sweet spot: enough torque to hover at 25–35% throttle without excessive motor mass.',
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
        'For hover on a 13" diameter prop, medium-low pitch (4.5–5") is optimal. The large disc area of a 13" prop means each revolution already sweeps a massive air column. A pitch-to-diameter ratio of 0.35–0.38 balances air displacement against torque demand at this size. A 13×4.5 or 13×5 prop generates ample hover thrust at very low RPM (2,000–3,000) with modest torque demand, keeping the motor in its peak efficiency zone. Lower pitch (3.5–4") doesn\'t displace enough air per revolution, requiring slightly higher RPM that reduces the efficiency advantage of the large diameter. Higher pitch (5.5"+) on 13" creates severe torque demand — the massive blade area at steep angles draws excessive current, and the large 40xx+ stators have to work much harder, generating heat and I²R losses. The sweet spot keeps torque low while leveraging the inherent air-moving advantage of the large diameter.',
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

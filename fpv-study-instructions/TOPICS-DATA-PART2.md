# FPV Topics Complete Data - Part 2

Append these topics to the `FPV_TOPICS` array in `src/data/topics.js`.

---

## TOPIC 6: RPM Filtering

```javascript
{
  id: 'rpm-filtering',
  title: 'RPM Filtering',
  icon: '📊',
  category: 'betaflight',
  difficulty: 'advanced',
  shortAnswer: 'Uses real-time ESC telemetry to place dynamic notch filters exactly where motor noise occurs, enabling less overall filtering with lower latency while better rejecting motor-induced vibration.',
  
  content: {
    overview: `RPM filtering is a breakthrough in flight controller filtering that uses bidirectional DShot to get real-time motor RPM data, then places notch filters precisely where motor noise occurs. This eliminates noise more effectively while reducing latency compared to static filtering approaches.`,
    
    sections: [
      {
        title: 'The Problem RPM Filtering Solves',
        content: `**Motor Noise is Variable:**
• At 30% throttle: motors spin at ~12,000 RPM → noise at ~200Hz
• At 70% throttle: motors spin at ~28,000 RPM → noise at ~467Hz
• Noise frequency changes constantly with throttle position

**Traditional Static Filtering Problem:**
Static filters must cover the ENTIRE frequency range where noise might occur. This means filtering from 150Hz to 500Hz+ to catch all throttle positions.

**Consequences of Over-Filtering:**
• Excessive latency (signal delay)
• Mushy, disconnected stick feel
• Reduced ability to use higher PID gains
• Removes wanted signal along with noise

**RPM Filtering Solution:**
Instead of filtering a wide range, place narrow filters EXACTLY where noise is occurring RIGHT NOW. As throttle changes, filters move to follow the noise.`
      },
      {
        title: 'Technical Implementation',
        content: `**Bidirectional DShot (Required):**

Standard DShot: FC → ESC (one-way commands)
Bidirectional: FC ↔ ESC (commands + telemetry)

The ESC reports electrical RPM (eRPM) back to the FC.

**Calculating Noise Frequency:**
eRPM → Actual RPM → Noise Frequency

For 14-pole motor:
Actual RPM = eRPM ÷ 7
Noise Hz = Actual RPM ÷ 60

**Example:**
eRPM reported: 210,000
Actual RPM: 210,000 ÷ 7 = 30,000 RPM
Fundamental noise: 30,000 ÷ 60 = 500 Hz
2nd harmonic: 1000 Hz
3rd harmonic: 1500 Hz

**Harmonics:**
Motors generate noise at multiples of the fundamental:
• 1× (fundamental) - strongest
• 2× (second harmonic) - significant
• 3× (third harmonic) - usually worth filtering

RPM filter can target all three simultaneously.`
      },
      {
        title: 'Setup and Configuration',
        content: `**Requirements:**
• ESC firmware with telemetry: BLHeli_32, AM32, or Bluejay
• Betaflight 4.0+ (4.3+ recommended)

**CLI Configuration:**

# Enable bidirectional DShot
set dshot_bidir = ON

# Set motor poles (check your motor specs)
set motor_poles = 14

# Configure RPM filter
set rpm_filter_harmonics = 3
set rpm_filter_q = 500

save

**Verify It's Working:**
1. Go to Motors tab in Configurator
2. Enable motor test (props OFF!)
3. Spin motors to ~20%
4. RPM values should appear for each motor

**Key Parameters:**

| Setting | Description | Typical Value |
|---------|-------------|---------------|
| rpm_filter_harmonics | How many harmonics (1-3) | 3 |
| rpm_filter_q | Filter width (higher=narrower) | 400-600 |
| rpm_filter_min_hz | Minimum frequency | 100 |

**Q Factor Trade-off:**
• Lower Q (350-450): Wider notch, catches more noise, more latency
• Higher Q (550-700): Narrow notch, less latency, may miss some noise`
      },
      {
        title: 'Benefits and Results',
        content: `**Measured Improvements:**
• 50-70% reduction in gyro noise at motor frequencies
• 1-3ms less filtering latency
• 20-40% reduction in propwash oscillation
• Cooler motors (less fighting noise)
• Can run higher P and D gains

**Before vs After (Blackbox):**
Before: Gyro trace shows noise spikes across 150-500Hz range
After: Clean gyro with narrow notches only at motor frequencies

**Allows Further Optimization:**
With RPM filtering handling motor noise, you can:
• Raise gyro lowpass cutoffs (less delay)
• Reduce dynamic notch aggressiveness
• Increase D-term for better propwash handling`
      }
    ],
    
    keyPoints: [
      'Uses bidirectional DShot for real-time motor RPM telemetry',
      'Places narrow notch filters exactly at motor noise frequencies',
      'Filters move dynamically as throttle/RPM changes',
      'Requires BLHeli_32, AM32, or Bluejay firmware',
      'Reduces latency while improving noise rejection vs static filters'
    ],
    
    interviewTips: [
      'Explain the core problem first: motor noise frequency changes with throttle',
      'Emphasize bidirectional DShot as the enabling technology',
      'Know that harmonics are 2× and 3× the fundamental frequency',
      'Understand Q factor trade-off: width vs precision',
      'Be able to list compatible ESC firmwares'
    ],
    
    practiceQuestions: [
      {
        q: 'What is RPM filtering and why is it better than static filtering?',
        a: 'RPM filtering uses real-time motor RPM from ESC telemetry to place notch filters exactly where motor noise occurs at any moment. Unlike static filters that must filter a wide frequency range (adding latency), RPM filters precisely target only actual noise as it moves with throttle changes. This provides better noise rejection with significantly less latency.'
      },
      {
        q: 'What are the hardware and firmware requirements?',
        a: 'ESCs must run firmware supporting telemetry: BLHeli_32 (native), AM32 (open-source), or Bluejay (free BLHeli_S replacement). Bidirectional DShot must be enabled in Betaflight. Motor pole count must be configured correctly (typically 14 for 22xx motors).'
      },
      {
        q: 'What are harmonics in RPM filtering?',
        a: 'Harmonics are integer multiples of the fundamental motor noise frequency. At 30,000 RPM, fundamental is 500Hz. Second harmonic is 1000Hz, third is 1500Hz. Motors generate noise at all these frequencies. RPM filtering typically targets the fundamental plus 2-3 harmonics for complete noise removal.'
      }
    ]
  }
}
```

---

## TOPIC 7: PID Tuning

```javascript
{
  id: 'pid-tuning',
  title: 'PID Tuning',
  icon: '⚖️',
  category: 'betaflight',
  difficulty: 'advanced',
  shortAnswer: 'P = correction strength proportional to error, I = accumulates error over time to eliminate drift, D = dampens/predicts to prevent overshoot. Feed Forward adds direct stick-to-motor response.',
  
  content: {
    overview: `PID (Proportional-Integral-Derivative) control is how your flight controller keeps the drone stable and responsive. Understanding each term allows you to tune for your specific flying style and build characteristics.`,
    
    sections: [
      {
        title: 'PID Fundamentals',
        content: `**The Control Loop:**
1. You command an angle/rate with your stick (setpoint)
2. Gyro measures actual drone orientation
3. Error = Setpoint - Actual
4. PID controller calculates motor output to minimize error
5. Repeat thousands of times per second

**The Three Terms:**
• **P (Proportional)**: Output proportional to current error
• **I (Integral)**: Output proportional to accumulated error over time
• **D (Derivative)**: Output proportional to rate of change of error

**Car Driving Analogy:**
• **P**: How hard you turn the wheel based on how far off-lane you are
• **I**: Extra correction to fight constant crosswind
• **D**: Easing off the turn as you approach correct position`
      },
      {
        title: 'P - Proportional Term',
        content: `**Formula:** P_output = P_gain × Error

The bigger the error, the bigger the correction.

**P Too Low:**
• Soft, mushy, floaty feel
• Slow response to stick inputs
• Poor angle hold in wind
• Drone feels disconnected

**P Too High:**
• Fast oscillations/vibrations
• Hot motors
• Visible shaking in video
• Worse propwash oscillation

**Tuning P:**
1. Start with defaults
2. Increase until oscillation appears
3. Back off 10-20%

**Typical Values:** Roll/Pitch: 40-70, Yaw: 30-50`
      },
      {
        title: 'I - Integral Term',
        content: `**Formula:** I_output = I_gain × Σ(Error over time)

Accumulates past errors. Even tiny constant errors build up correction.

**Purpose:** Eliminates steady-state error (drift)

**I Too Low:**
• Drifts in wind
• Doesn't hold angles precisely
• Throttle changes cause attitude changes

**I Too High:**
• Bounce-back after maneuvers
• Slow, sluggish feeling
• Low-frequency wobble

**I-Term Relax:**
Modern Betaflight reduces I accumulation during fast moves to prevent bounce-back.

**Typical Values:** Roll/Pitch: 80-120, Yaw: 80-120`
      },
      {
        title: 'D - Derivative Term',
        content: `**Formula:** D_output = D_gain × (Rate of change of Error)

Predicts where error is heading and counteracts.

**Purpose:** Dampens P response, prevents overshoot

**D Too Low:**
• Overshoot at end of moves
• Wobble after flips/rolls
• Propwash oscillation (P oscillates without damping)

**D Too High:**
• HOT MOTORS (D amplifies high-frequency noise)
• Jittery video
• Reduced responsiveness

**D and Filtering Relationship:**
D operates on error derivative - noise looks like rapid changes. More D requires better filtering (this is why RPM filtering helps).

**Typical Values:** Roll/Pitch: 25-45, Yaw: 0-15

**P:D Ratio:** D is typically 0.5× to 0.7× of P`
      },
      {
        title: 'Feed Forward (F)',
        content: `**What FF Does:**
Adds motor output DIRECTLY based on stick movement, without waiting for error.

**Stick moves → FF immediately commands motors**

No gyro feedback delay - instant response.

**FF Too Low:**
• Feels laggy
• Drone "behind" your sticks

**FF Too High:**
• Overshoot at end of moves
• Twitchy, hard to control

**FF by Flying Style:**
• Cinematic: 50-100 (smooth, predictable)
• Freestyle: 100-150 (balanced)
• Racing: 150-200+ (maximum response)

**Typical Values:** Roll/Pitch: 100-150, Yaw: 100-120`
      },
      {
        title: 'Tuning Process',
        content: `**Step-by-Step Method:**

**1. Start with Betaflight Defaults**
They're well-tested for most builds.

**2. Ensure Filtering is Proper**
• Enable RPM filtering if available
• Don't tune PIDs on a noisy gyro

**3. Use the Master Slider (BF 4.3+)**
• Adjusts all PIDs proportionally
• Find where oscillation starts
• Back off 10%

**4. Fine-Tune Individual Axes**
• Roll usually handles more P than pitch
• Yaw needs less than roll/pitch

**5. Adjust D for Propwash**
• More D helps propwash
• But watch motor temps

**6. Tune Feed Forward**
• Increase for snappier response
• Decrease if overshooting

**Golden Rules:**
• Change ONE thing at a time
• Use Blackbox for objective data
• Hot motors = too much D (or bad filtering)
• Oscillation = too much P

**Quick Diagnosis:**

| Symptom | Likely Fix |
|---------|------------|
| Slow response | ↑ P or ↑ FF |
| Fast oscillation | ↓ P |
| Overshoot | ↑ D or ↓ FF |
| Propwash wobble | ↑ D or better P:D ratio |
| Drift | ↑ I |
| Hot motors | ↓ D, improve filtering |`
      }
    ],
    
    keyPoints: [
      'P = immediate correction strength (error × P_gain)',
      'I = eliminates drift by accumulating error over time',
      'D = dampens P response, prevents overshoot (acts on rate of change)',
      'FF = direct stick-to-motor response without gyro feedback',
      'Start with defaults, change one thing at a time, use Blackbox'
    ],
    
    interviewTips: [
      'Explain each term\'s purpose clearly with the formula concept',
      'Know symptoms of too-high and too-low for each term',
      'Discuss D and filtering relationship',
      'Mention Feed Forward as modern addition to classic PID',
      'Emphasize systematic tuning: one change at a time'
    ],
    
    practiceQuestions: [
      {
        q: 'Explain what P, I, and D do in simple terms.',
        a: 'P provides correction proportional to current error - bigger error means bigger correction. I accumulates error over time to eliminate persistent drift, like correcting for constant wind. D looks at how fast error is changing and dampens the response to prevent overshoot - it\'s predictive braking.'
      },
      {
        q: 'Your motors are getting hot after tuning. What\'s likely wrong?',
        a: 'Most likely D-term is too high. D amplifies high-frequency signals including noise, causing constant small motor corrections. Solution: lower D value, improve filtering (especially RPM filtering), or check for mechanical vibration sources. Could also be P if accompanied by visible oscillation.'
      },
      {
        q: 'What causes propwash oscillation?',
        a: 'Propwash occurs when descending through turbulent air from your own props. P tries to correct the rapid attitude changes, but without enough D to dampen, it overshoots repeatedly. Fix: better P:D balance (often need more D), good filtering to allow adequate D, and D-Max settings to provide more damping during maneuvers.'
      },
      {
        q: 'What is Feed Forward and when would you increase it?',
        a: 'Feed Forward adds motor output directly from stick movement without waiting for gyro feedback - it\'s immediate response. Increase FF for snappier, more connected stick feel (good for racing). Decrease for smoother, more cinematic flying. Too much causes overshoot at the end of moves.'
      }
    ]
  }
}
```

---

## TOPIC 8: Motor Size and Efficiency

```javascript
{
  id: 'motor-efficiency',
  title: 'Motor Size and Efficiency',
  icon: '💡',
  category: 'motors',
  difficulty: 'intermediate',
  shortAnswer: 'Larger motors running at partial throttle are more efficient than smaller motors working hard. Heat = I²R, so lower current = exponentially less heat/waste. Target hover at 25-35% throttle.',
  
  content: {
    overview: `Motor efficiency is crucial for flight time and performance. The key insight is that motors are most efficient at partial load - a larger motor at 50% throttle beats a smaller motor at 80% throttle for the same thrust output.`,
    
    sections: [
      {
        title: 'Efficiency Fundamentals',
        content: `**Motor Efficiency Varies with Load:**

Efficiency = Mechanical Power Out ÷ Electrical Power In

**Where Power Goes:**
• Useful thrust (what we want)
• Heat in windings (I²R losses)
• Magnetic losses (eddy currents)
• Mechanical friction (bearings)

**The Efficiency Curve:**
• 0% throttle: 0% efficient (no useful work)
• 50-70% throttle: Peak efficiency (~75-85%)
• 100% throttle: Efficiency drops (heat losses dominate)

**Key Insight:**
Motors are MOST efficient at partial load, not full throttle.`
      },
      {
        title: 'Why Larger = More Efficient',
        content: `**For the Same Thrust Output:**

**Small Motor (2207 2400KV):**
• Operating at 70% throttle
• Drawing 15A
• Motor temp: Hot
• Efficiency: ~65%

**Large Motor (2806.5 1300KV):**
• Operating at 40% throttle
• Drawing 9A
• Motor temp: Cool
• Efficiency: ~78%

**Why the Difference?**

**1. Heat Loss is I²R (Current SQUARED):**
• 15A @ 0.1Ω = 22.5W heat
• 9A @ 0.1Ω = 8.1W heat
• The larger motor wastes 64% less energy as heat!

**2. Operating Point:**
• Small motor: Working hard, past efficiency peak
• Large motor: Cruising in efficiency sweet spot

**3. Thermal Management:**
• Larger motor = more surface area = better cooling
• Runs cooler = lasts longer`
      },
      {
        title: 'Motor Sizing Strategy',
        content: `**Design Goal: Hover at 25-35% Throttle**

This positions your motors in peak efficiency zone while leaving power headroom.

**Calculation Method:**

1. Estimate All-Up Weight (AUW)
2. Calculate thrust needed: AUW × 2.5 minimum for maneuverability
3. Choose motors where 30% throttle ≈ AUW

**Example:**

Build: 5" freestyle, AUW = 700g

Need: 700g × 2.5 = 1750g minimum total thrust

Motor Options:
• 2207 2400KV: 800g/motor = 3200g total, hover at ~22%  ✓
• 2207 1700KV: 600g/motor = 2400g total, hover at ~30%  ✓
• 1806 2400KV: 500g/motor = 2000g total, hover at ~35%  Borderline

**Trade-off:**
Larger motors = more efficient BUT heavier
Find the sweet spot where efficiency gains outweigh weight penalty.`
      },
      {
        title: 'KV and Efficiency',
        content: `**KV = RPM per Volt (unloaded)**

**Higher KV:**
• More RPM for same voltage
• Less torque per amp
• Better for smaller props
• Less efficient at partial throttle

**Lower KV:**
• More torque per amp
• Lower RPM, swings larger props
• More efficient at partial throttle
• Better for heavy/efficiency builds

**Why Lower KV = More Efficient:**

Torque constant ∝ 1/KV

Lower KV = more torque per amp = less current for same thrust = less heat

**Matching KV to Application:**

| Use Case | KV (6S) |
|----------|---------|
| Racing | 1900-2400 |
| Freestyle | 1700-2000 |
| Long Range | 1200-1500 |
| Efficiency | 900-1300 |`
      },
      {
        title: 'When to Choose Smaller Motors',
        content: `**Smaller Motors Make Sense When:**

**1. Weight is Critical:**
• Micro builds where every gram matters
• Weight-class racing
• Extreme agility needed

**2. Agility Over Efficiency:**
• Racing (response speed > flight time)
• Lower rotational inertia = faster direction changes

**3. Budget Constraints:**
• Smaller = cheaper
• Learning/crash-prone builds

**4. Space Constraints:**
• Ducted builds (cinewhoops)
• Compact frames

**The Racing Exception:**
Racers often sacrifice efficiency for:
• Faster throttle response
• Lower weight
• Quicker direction changes

2205 might be chosen over 2207 even though it's less efficient.`
      }
    ],
    
    keyPoints: [
      'Motors are most efficient at 50-70% load, not full throttle',
      'Heat loss = I²R (current squared) - lower current is exponentially better',
      'Larger motors at partial throttle beat smaller motors working hard',
      'Lower KV = more torque per amp = more efficient for heavy loads',
      'Target hover at 25-35% throttle for best efficiency'
    ],
    
    interviewTips: [
      'Lead with the I²R relationship - shows understanding of physics',
      'Explain the efficiency curve concept',
      'Give concrete examples with numbers',
      'Know when smaller motors make sense (racing, weight)',
      'Connect to KV selection and build goals'
    ],
    
    practiceQuestions: [
      {
        q: 'For efficiency, should you choose larger or smaller motors?',
        a: 'Larger motors (within reason). A motor running at 50% throttle to hover is significantly more efficient than a smaller motor at 80% throttle for the same thrust. Heat losses scale with current squared (I²R), so the larger motor drawing less current wastes exponentially less energy. Trade-off is the extra weight.'
      },
      {
        q: 'Why does lower KV mean more efficient for hover?',
        a: 'Lower KV motors produce more torque per amp drawn. For a given thrust requirement, they draw less current. Since heat loss = I²R, less current means exponentially less energy wasted as heat. Lower KV also means lower RPM, and larger props at lower RPM are aerodynamically more efficient than smaller props spinning fast.'
      },
      {
        q: 'What throttle percentage should you target for hover?',
        a: '25-35%. This positions hover in the motor\'s peak efficiency zone (50-70% of max is most efficient, but hover at 25-35% leaves headroom for maneuvering). If you hover at 50%+ throttle, your motors are working too hard and you should consider larger motors or lighter build.'
      }
    ]
  }
}
```

---

## Categories Export

```javascript
// src/data/categories.js

export const CATEGORIES = [
  {
    id: 'video-systems',
    name: 'Video Systems',
    icon: '📡',
    color: 'cyan',
    description: 'Analog vs digital, VTX, cameras, latency'
  },
  {
    id: 'motors',
    name: 'Motors',
    icon: '⚙️',
    color: 'pink',
    description: 'Stator sizes, KV ratings, efficiency'
  },
  {
    id: 'propellers',
    name: 'Propellers',
    icon: '🌀',
    color: 'yellow',
    description: 'Pitch, diameter, blade count, selection'
  },
  {
    id: 'betaflight',
    name: 'Betaflight',
    icon: '📊',
    color: 'green',
    description: 'PID tuning, filtering, configuration'
  },
  {
    id: 'build-theory',
    name: 'Build Theory',
    icon: '🔋',
    color: 'orange',
    description: 'Efficiency builds, component selection'
  },
  {
    id: 'configuration',
    name: 'Configuration',
    icon: '🔧',
    color: 'red',
    description: 'Servo setup, ESC configuration'
  }
];

export const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'green' },
  { id: 'intermediate', name: 'Intermediate', color: 'yellow' },
  { id: 'advanced', name: 'Advanced', color: 'red' }
];
```

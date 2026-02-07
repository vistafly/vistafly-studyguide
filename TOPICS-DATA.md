# FPV Topics Complete Data

This file contains ALL the technical content for the FPV study website. Copy this into `src/data/topics.js` as a JavaScript array.

---

## Data Format

```javascript
// src/data/topics.js
export const FPV_TOPICS = [
  // ... all topics below
];

export const CATEGORIES = [
  { id: 'video-systems', name: 'Video Systems', icon: '📡', color: 'cyan' },
  { id: 'motors', name: 'Motors', icon: '⚙️', color: 'pink' },
  { id: 'propellers', name: 'Propellers', icon: '🌀', color: 'yellow' },
  { id: 'betaflight', name: 'Betaflight', icon: '📊', color: 'green' },
  { id: 'build-theory', name: 'Build Theory', icon: '🔋', color: 'orange' },
  { id: 'configuration', name: 'Configuration', icon: '🔧', color: 'red' },
];
```

---

## TOPIC 1: Analog vs Digital Video Systems

```javascript
{
  id: 'analog-vs-digital',
  title: 'Analog vs Digital Video Systems',
  icon: '📡',
  category: 'video-systems',
  difficulty: 'intermediate',
  shortAnswer: 'Analog offers lower latency (8-15ms) with graceful signal degradation; Digital provides HD quality but with cliff effect signal loss and higher latency (15-40ms).',
  
  content: {
    overview: `The video transmission system is one of the most critical components in FPV flying, directly affecting your ability to pilot the drone safely and effectively. Understanding the fundamental differences between analog and digital systems is essential for making informed decisions about your build and flying style.`,
    
    sections: [
      {
        title: 'Analog Video Systems',
        content: `Analog FPV has been the standard for over a decade and remains relevant today, especially in racing applications.

**How Analog Works:**
Analog systems transmit video as a continuous radio wave signal. The camera captures footage, the VTX (video transmitter) modulates this into radio waves, and your goggles' receiver demodulates it back to video. This process is nearly instantaneous.

**Key Characteristics:**
• Latency: 8-15ms (virtually real-time)
• Resolution: ~480i effective (similar to old CRT TVs)
• Signal Behavior: Graceful degradation - you get static/snow as signal weakens, but maintain a usable image
• Weight: Typically lighter systems available
• Cost: Entry-level complete systems under $100

**Advantages:**
• Ultra-low latency makes it ideal for racing where every millisecond counts
• You can "fly through" interference - static doesn't mean total loss
• More frequency options (5.8GHz band has many channels)
• Easier to troubleshoot
• Cheaper to replace damaged components

**Disadvantages:**
• Lower image quality
• More susceptible to interference from other pilots
• No recording capability without separate DVR
• Image can be noisy even with good signal`
      },
      {
        title: 'Digital Video Systems',
        content: `Digital FPV represents the modern evolution, led by DJI in 2019, followed by HDZero and Walksnail Avatar.

**How Digital Works:**
Digital systems encode video into data packets, compress them, transmit digitally, then decode at the receiver. This allows for HD video but introduces processing delay.

**Major Digital Systems:**

**DJI FPV System (O3/O4):**
• Resolution: Up to 1080p/100fps
• Latency: 28-40ms (depending on mode)
• Best image quality
• Heaviest and most expensive
• Strong signal penetration

**HDZero:**
• Resolution: 720p/90fps (1080p in development)
• Latency: 15-25ms (closest to analog)
• Racing-focused digital
• Modular design
• Growing ecosystem

**Walksnail Avatar:**
• Resolution: 1080p/60fps
• Latency: 22-32ms
• Good balance of features
• Competitive pricing
• Recording built-in

**The "Cliff Effect":**
Unlike analog's gradual degradation, digital video either works or it doesn't. When signal weakens past a threshold, you experience complete video loss (failsafe). This requires different flying habits - you need more signal margin.`
      },
      {
        title: 'Latency Deep Dive',
        content: `Latency is the time between when something happens in front of your drone and when you see it in your goggles. This is CRITICAL for FPV.

**Latency Breakdown:**

| System | Glass-to-Glass Latency |
|--------|----------------------|
| Analog | 8-15ms |
| HDZero | 15-25ms |
| Walksnail | 22-32ms |
| DJI | 28-40ms |

**Why Does This Matter?**

At 100mph (common racing speed), your drone travels:
• In 10ms: 1.5 feet
• In 30ms: 4.4 feet
• In 50ms: 7.3 feet

For racing through gates, those extra feet of "blind flying" can mean hitting an obstacle.

**Human Perception:**
• Under 20ms: Feels instant
• 20-40ms: Perceptible but manageable
• 40-60ms: Noticeable delay
• Over 60ms: Difficult to fly precisely

**Recommendation by Use Case:**
• Racing: Analog or HDZero
• Freestyle: Any system works
• Cinematic/Long Range: DJI or Walksnail (HD matters more than latency)`
      },
      {
        title: 'Signal Penetration & Range',
        content: `**Analog:**
• Theoretical range: 1-30km (depending on power/antenna)
• Penetration: Good through foliage, moderate through walls
• Behavior: Signal quality decreases linearly with obstacles

**Digital:**
• DJI: Best penetration, 10-15km typical range
• HDZero: Similar range to good analog, slightly less penetration
• Walksnail: Good penetration, 5-10km typical

**Real-World Factors:**
• Antenna quality matters more than VTX power
• Antenna polarization (RHCP vs LHCP) for diversity
• Receiver sensitivity varies widely between goggles
• Environmental interference (WiFi, other pilots)`
      },
      {
        title: 'Choosing Your System',
        content: `**Choose Analog If:**
• You're primarily racing
• Budget is limited
• You want the lightest possible setup
• You fly with many other pilots (less interference issues)
• You need to "fly through" obstacles with some signal

**Choose DJI If:**
• Cinematic quality is priority
• You have the budget
• Flying alone or with digital pilots
• Long-range flying
• You want built-in recording

**Choose HDZero If:**
• Racing with HD quality
• Lowest digital latency needed
• You like modular, upgradeable systems
• Community-driven development matters

**Choose Walksnail If:**
• Balance of price and features
• Good image quality at lower cost than DJI
• Growing ecosystem is acceptable
• Primarily freestyle flying`
      }
    ],
    
    keyPoints: [
      'Analog latency: 8-15ms | Digital: 15-40ms',
      'Analog degrades gracefully with static | Digital has cliff effect (works or doesn\'t)',
      'DJI has best image quality but highest latency and weight',
      'HDZero is the racing-focused digital option with lowest digital latency',
      'Choose based on PRIMARY use case: racing vs freestyle vs cinematic'
    ],
    
    interviewTips: [
      'When asked, first explain the fundamental signal difference (continuous wave vs digital packets)',
      'Always mention specific latency numbers - shows you understand the technical specs',
      'Discuss cliff effect vs graceful degradation - this is the key differentiator',
      'Know the major digital systems and their specific trade-offs',
      'Be ready to recommend systems for specific use cases with reasoning'
    ],
    
    practiceQuestions: [
      {
        q: 'Why might a professional racer choose analog over digital?',
        a: 'Lower latency (8-15ms vs 25-40ms) for faster reaction times, graceful signal degradation allowing them to "fly through" interference, lighter weight for better performance, and more reliable operation in multi-pilot scenarios where digital systems might interfere with each other.'
      },
      {
        q: 'Explain the "cliff effect" in digital FPV.',
        a: 'Unlike analog where signal weakens gradually into static while maintaining a viewable image, digital systems either work perfectly or fail completely. When signal strength drops below the decode threshold, video cuts out entirely with no warning - there\'s no gradual degradation to alert the pilot.'
      },
      {
        q: 'What\'s the latency difference between the main systems and why does it matter?',
        a: 'Analog: 8-15ms, HDZero: 15-25ms, Walksnail: 22-32ms, DJI: 28-40ms. At high speeds, this delay means you\'re flying "blind" for longer distances. At 100mph, 30ms of latency means 4.4 feet of travel you haven\'t seen yet - critical when racing through gates.'
      },
      {
        q: 'Which digital system would you recommend for racing and why?',
        a: 'HDZero - it has the lowest latency of any digital system (15-25ms), approaching analog performance while delivering 720p video quality. It was specifically designed with racing in mind, uses a modular system that\'s easy to repair, and has growing industry support.'
      }
    ]
  }
}
```

---

## TOPIC 2: Motor Stator Sizes

```javascript
{
  id: 'stator-size',
  title: 'Motor Stator Sizes',
  icon: '⚙️',
  category: 'motors',
  difficulty: 'intermediate',
  shortAnswer: 'Stator size (e.g., 2207) = width × height in mm. First 2 digits = diameter, last 2 = height. Larger stators = more torque and power, smaller = lighter weight.',
  
  content: {
    overview: `Understanding motor stator sizing is fundamental to FPV drone building. The stator is the stationary electromagnetic core of the motor, and its dimensions directly determine the motor's torque, power output, efficiency, and weight characteristics.`,
    
    sections: [
      {
        title: 'Decoding Stator Numbers',
        content: `**The Four-Digit Code:**
Motor stator sizes are expressed as four digits: WWHH

• First two digits = Stator WIDTH (diameter) in mm
• Last two digits = Stator HEIGHT in mm

**Examples:**
• 2207 = 22mm wide × 7mm tall stator
• 2306 = 23mm wide × 6mm tall stator
• 1404 = 14mm wide × 4mm tall stator
• 2806.5 = 28mm wide × 6.5mm tall stator

**Why This Matters:**
The stator is where electromagnetic force is generated. Its dimensions determine:
• How much copper wire can be wound (more = more torque)
• The magnetic field strength
• Heat dissipation capability
• Overall motor weight`
      },
      {
        title: 'Width vs Height: What Each Does',
        content: `**Stator Width (Diameter):**

Wider stators = MORE TORQUE

• More surface area for magnetic interaction
• More copper wire can be wound
• Better for swinging heavy/large propellers
• Better for aggressive flying and punch-outs

Think of it like a wider arm on a lever - more leverage = more torque

**Stator Height:**

Taller stators = HIGHER RPM POTENTIAL

• More poles in the motor
• Faster magnetic field changes
• More aggressive throttle response
• Higher top-end RPM

Think of it like adding more cylinders to an engine - more cycles = more speed

**The Trade-off:**
Bigger stators = more power BUT also:
• More weight
• Higher current draw
• More heat generation
• Need beefier ESCs and batteries`
      },
      {
        title: 'Common Sizes by Application',
        content: `**Micro/Toothpick (2-3" props):**
• 1103, 1104, 1105 - Ultra-light indoor/outdoor
• 1204, 1206 - Slightly more power
• 1404, 1408 - Punchy 2.5-3" builds

**3" Builds:**
• 1404, 1406 - Efficient cruisers
• 1507, 1606 - More aggressive

**4" Builds:**
• 1606, 1806 - Light freestyle
• 2004, 2005 - Punchy performance

**5" Standard (Most Common):**
• 2205 - Lighter, efficient racing
• 2206 - Balance of weight and power
• 2207 - Standard freestyle/racing
• 2306 - High torque freestyle
• 2307 - Maximum aggression

**6" Builds:**
• 2207, 2208 - Light 6"
• 2407, 2506 - More appropriate torque

**7" Long Range:**
• 2506, 2507 - Good balance
• 2806.5 - Optimal efficiency

**10"+ Builds:**
• 2806.5, 2812 - Cruising efficiency
• 3110, 3115 - Heavy lift capable`
      },
      {
        title: 'Stator Size and KV Relationship',
        content: `**The Inverse Relationship:**
Stator size and KV (RPM per volt) are inversely related for optimal performance.

**Why?**
• Larger stators have more torque → can spin larger props effectively at lower RPM
• Smaller stators need higher RPM to compensate for lower torque

**Typical Combinations:**

| Size | Typical KV Range | Common Prop |
|------|------------------|-------------|
| 1404 | 3000-4500 KV | 3" |
| 2207 | 1700-2600 KV | 5" |
| 2806.5 | 1100-1700 KV | 7" |
| 2812 | 900-1400 KV | 10" |

**Example Calculation:**
A 2207 2400KV motor on 6S (25.2V) = 60,480 theoretical max RPM
A 2806.5 1300KV motor on 6S = 32,760 theoretical max RPM

The larger stator doesn't NEED the high RPM because it generates more torque at lower speeds.`
      },
      {
        title: 'Efficiency Considerations',
        content: `**The Efficiency Sweet Spot:**

Motors are most efficient when operating at 50-70% throttle. This is where the stator size decision becomes critical.

**Oversized Motor Advantage:**
A larger motor running at 50% throttle to achieve hover is more efficient than a smaller motor at 80% throttle achieving the same hover.

Why?
• Lower current draw per unit of thrust
• Less heat generation
• Longer motor lifespan
• Better battery efficiency

**Weight Penalty:**
However, the extra weight of larger motors means:
• Higher baseline power needed to hover
• Point of diminishing returns exists
• Frame must support extra weight

**The Rule:**
Slightly oversized motors running at partial throttle outperform undersized motors working hard.

**For Maximum Efficiency:**
1. Choose motor size that hovers at 25-35% throttle
2. Match prop size to torque capability
3. Use lower KV for efficiency-focused builds`
      }
    ],
    
    keyPoints: [
      'First 2 digits = stator width/diameter (mm), last 2 = height (mm)',
      'Wider stator = more torque for swinging heavy props',
      'Taller stator = higher RPM potential and faster response',
      'Match stator size to prop size and use case',
      'Larger motors at partial throttle = more efficient than small motors working hard'
    ],
    
    interviewTips: [
      'Immediately decode the number when asked (e.g., "2207 means 22mm wide, 7mm tall") - shows instant recognition',
      'Explain the width vs height trade-off clearly with the lever/engine analogies',
      'Give specific size examples for different build types (3", 5", 7", 10")',
      'Connect stator size to KV selection and prop sizing',
      'Mention efficiency benefits of properly sized motors'
    ],
    
    practiceQuestions: [
      {
        q: 'What does a 2306 motor designation mean?',
        a: 'The stator is 23mm in diameter (width) and 6mm tall (height). The wider 23mm stator provides more torque than a 22mm stator, making it excellent for aggressive freestyle flying with heavier props, though the shorter 6mm height trades some top-end RPM for better efficiency.'
      },
      {
        q: 'Why would you choose a 2806.5 motor over a 2207 for a 7" build?',
        a: 'The 2806.5 has significantly more stator volume (28mm wide × 6.5mm tall vs 22mm × 7mm), providing the torque needed to efficiently spin larger 7" props at lower RPM. A 2207 would technically work but would run hotter, draw more current, and be less efficient because it lacks the torque to swing larger props comfortably.'
      },
      {
        q: 'For efficiency, should you choose a larger or smaller stator motor?',
        a: 'Larger (within reason). A motor running at 50% throttle to hover is more efficient than a smaller motor at 80% throttle achieving the same hover. The larger motor draws less current per unit of thrust and runs cooler. The trade-off is additional weight, so there\'s a sweet spot where efficiency gains outweigh the weight penalty.'
      },
      {
        q: 'How does stator height affect motor performance?',
        a: 'Taller stators allow for more magnetic poles and faster magnetic field changes, resulting in higher potential RPM and more aggressive throttle response. They\'re better for quick acceleration and high-speed flying. However, taller stators also mean more weight and potentially more heat generation under load.'
      }
    ]
  }
}
```

---

## TOPIC 3: Servo Setup in Betaflight

```javascript
{
  id: 'servo-betaflight',
  title: 'Servo Setup in Betaflight',
  icon: '🔧',
  category: 'configuration',
  difficulty: 'advanced',
  shortAnswer: 'Connect servo to available motor pad, remap resources in CLI (resource MOTOR X NONE, resource SERVO 1 PIN), configure min/max pulse widths in Servos tab, assign to AUX channel via smix.',
  
  content: {
    overview: `Setting up servos in Betaflight allows you to control additional mechanisms like camera tilts, bomb drops, winches, or custom payloads. This requires understanding Betaflight's resource management system and PWM signal configuration.`,
    
    sections: [
      {
        title: 'Understanding Servo Signals',
        content: `**PWM Signal Basics:**

Servos are controlled by PWM (Pulse Width Modulation) signals, NOT the same as motor PWM.

**Servo PWM Characteristics:**
• Frequency: Typically 50Hz (some support up to 333Hz)
• Pulse width: 1000μs to 2000μs
• Center position: 1500μs
• Full range: ±90° (or 180° total)

**Signal Interpretation:**
• 1000μs = Minimum position (-90° or 0°)
• 1500μs = Center position (0° or 90°)
• 2000μs = Maximum position (+90° or 180°)

**Comparison to Motor PWM:**
Motors use DShot (digital) or much higher frequency PWM.
Servos use traditional 50Hz PWM - incompatible with motor protocols.

**Important:**
You CANNOT run a servo on a motor output that's actively using DShot - you must remap the resource first.`
      },
      {
        title: 'Hardware Connection',
        content: `**Step 1: Identify Available Pads**

Most flight controllers have motor outputs M1-M8. On a quad, M1-M4 are used for motors, leaving M5-M8 potentially free.

**Check Your FC Pinout:**
• Look for M5, M6, M7, M8 pads
• Some FCs have dedicated "SERVO" or "S1-S4" pads
• LED strip pads can sometimes be repurposed

**Wiring:**
• Signal (usually white/orange) → Motor pad signal
• Ground (black/brown) → Ground pad
• Power (red) → External BEC or FC 5V output

**CRITICAL - Power Considerations:**
• Servos can draw 500mA-2A+ under load
• FC 5V rail may not handle this current
• Use a dedicated BEC (5-7.4V depending on servo rating)
• Do NOT power high-torque servos from FC directly - it can brown out the FC

**Physical Connection Example:**
Servo Wire    →    Flight Controller
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Signal (Orange) →  M5 Signal Pad
Ground (Brown)  →  GND Pad
Power (Red)     →  External 5V BEC (NOT FC 5V for large servos)`
      },
      {
        title: 'Betaflight CLI Resource Mapping',
        content: `**Step 2: Remap Motor Resource to Servo**

In Betaflight Configurator, go to the CLI tab and check current resources:

resource list

This shows all pin assignments. Look for MOTOR 5, 6, 7, 8.

**Freeing the Motor Resource:**

resource MOTOR 5 NONE

This frees up the pin currently assigned to Motor 5.

**Finding the Pin Identifier:**
From your resource list output, note what pin MOTOR 5 was using (e.g., B06, A15, C08).

**Assigning to Servo:**

resource SERVO 1 B06

Replace B06 with your actual pin identifier.

**Complete Example:**

# Check current assignments
resource list

# Free Motor 5 (note its pin first!)
resource MOTOR 5 NONE

# Assign that pin to Servo 1
resource SERVO 1 B06

# Save and reboot
save

**After Saving:**
The FC will reboot. Verify with "resource list" that SERVO 1 is now assigned.

**Multiple Servos:**

resource MOTOR 5 NONE
resource MOTOR 6 NONE
resource SERVO 1 B06
resource SERVO 2 B07
save`
      },
      {
        title: 'Servo Configuration',
        content: `**Step 3: Configure Servo Parameters**

In Betaflight Configurator, go to the Servos tab (may need to enable in Configurator settings if hidden).

**Servo Settings:**

| Parameter | Description | Typical Value |
|-----------|-------------|---------------|
| Min | Minimum pulse width | 1000 |
| Max | Maximum pulse width | 2000 |
| Middle | Center position | 1500 |
| Rate | Movement rate/direction | 100 (or -100 for reverse) |

**Fine-Tuning:**
• If servo doesn't reach full range, adjust Min/Max (try 900/2100)
• If center is off, adjust Middle value
• If direction is wrong, use negative Rate (-100)

**CLI Alternative:**

servo 0 1000 2000 1500 100
# Format: servo [index] [min] [max] [middle] [rate]

**Testing:**
Use the Servos tab slider to test movement before connecting to a radio channel. This verifies your resource mapping and wiring are correct.`
      },
      {
        title: 'Channel Assignment',
        content: `**Step 4: Assign Servo to Radio Channel**

**Option A: Using Servo Mixer (CLI) - Most Flexible**

For custom mixing and channel assignment:

smix reset
smix 0 0 5 100 0 0 100 0
save

**smix Command Format:**
smix [rule] [target servo] [input] [rate] [speed] [min] [max] [box]

**Input Channel Numbers:**
• 0 = Roll (Aileron)
• 1 = Pitch (Elevator)
• 2 = Yaw (Rudder)
• 3 = Throttle
• 4 = AUX1 (Channel 5)
• 5 = AUX2 (Channel 6)
• 6 = AUX3 (Channel 7)
• etc.

**Example - Servo controlled by AUX2 (Channel 6):**

smix 0 0 5 100 0 0 100 0
save

**Option B: Camera Control Mode**

If using for FPV camera tilt:

set camera_control_mode = HARDWARE_PWM
set camera_control_key_delay = 180
set camera_control_internal_resistance = 470
save

Then assign camera control to a channel in Modes tab.

**Testing Complete Setup:**
1. Power up with props OFF
2. Move the assigned switch/stick on your radio
3. Verify servo responds correctly
4. Adjust rates and endpoints as needed on radio or in Betaflight`
      },
      {
        title: 'Troubleshooting',
        content: `**Common Issues and Solutions:**

**Servo doesn't move at all:**
• Check power supply - is BEC providing correct voltage?
• Verify resource mapping with "resource list"
• Ensure servo isn't damaged - test with a servo tester
• Check wiring - signal connected to correct pad?
• Verify smix rules are configured

**Servo jitters or twitches:**
• Electrical noise - add 100-470μF capacitor to servo power
• Insufficient power - use higher amp rated BEC
• Ground loop - ensure common ground with FC

**Servo moves opposite direction:**
• Set Rate to negative value (-100 instead of 100)
• Or swap min/max values in servo config

**Servo doesn't reach full travel:**
• Adjust Min/Max values beyond standard (try 900/2100)
• Some servos use extended range protocols
• Check for mechanical binding

**Servo overheats:**
• Mechanical binding causing constant load
• Servo working against physical stop
• Voltage too high for servo rating

**ESC/Motor Issues After Setup:**
• Verify you freed the correct motor resource
• Check that active motors (M1-M4) still have proper resources
• Recheck wiring if motors behave erratically

**CLI Quick Reference:**

resource list          # View all current resources
resource MOTOR 5 NONE  # Free motor 5 resource
resource SERVO 1 B06   # Assign pin B06 to servo 1
servo 0 1000 2000 1500 100  # Configure servo 0
smix reset             # Clear servo mixer rules
smix 0 0 5 100 0 0 100 0    # Add mixer rule
save                   # Save and reboot
`
      }
    ],
    
    keyPoints: [
      'Servos use 50Hz PWM (1000-2000μs pulse), completely different from DShot motor protocol',
      'Must remap motor resource to servo in CLI before it will work',
      'Power servos from dedicated BEC, not FC 5V rail (prevents brownouts)',
      'Use smix command for flexible channel assignment',
      'Always test with props off and verify direction/range before flying'
    ],
    
    interviewTips: [
      'Walk through the complete process step-by-step when explaining',
      'Mention the power requirements and BEC consideration - shows safety awareness',
      'Know the CLI commands from memory (resource, servo, smix)',
      'Understand WHY motor outputs need remapping (DShot vs servo PWM incompatibility)',
      'Be ready to troubleshoot common issues'
    ],
    
    practiceQuestions: [
      {
        q: 'Walk me through setting up a servo on the Motor 5 output.',
        a: '1) Wire servo signal to M5 pad, ground to GND, power to an external 5V BEC. 2) In CLI, check "resource list" to find M5\'s pin (e.g., B06). 3) Run "resource MOTOR 5 NONE" to free the pin. 4) Run "resource SERVO 1 B06" to assign it to servo. 5) Save and reboot. 6) In Servos tab, set min/max (1000/2000) and middle (1500). 7) Use "smix 0 0 5 100 0 0 100 0" to assign to AUX2. 8) Save and test with props off.'
      },
      {
        q: 'Why can\'t you just plug a servo into an active motor output?',
        a: 'Motor outputs typically run DShot protocol (digital, high frequency) or high-frequency PWM for motor control, while servos require traditional 50Hz PWM with 1000-2000μs pulses. The protocols are completely incompatible - a servo will not respond to DShot signals. You must remap the resource to output servo-compatible PWM signals instead.'
      },
      {
        q: 'What\'s the CLI command sequence to free Motor 5 and assign it as Servo 1?',
        a: '"resource MOTOR 5 NONE" frees the pin from motor duty. Then "resource SERVO 1 [pin_identifier]" assigns that pin to servo output. The pin identifier (like B06 or A15) can be found by checking "resource list" before freeing the motor. Finally, "save" to persist changes and reboot.'
      },
      {
        q: 'Why should you use an external BEC for servo power?',
        a: 'Servos can draw 500mA to 2A+ under load, which can exceed the FC\'s 5V regulator capacity. Drawing too much current from the FC can cause voltage drops (brownouts), potentially crashing the flight controller mid-flight. An external BEC isolates servo power consumption and provides stable voltage even under high servo load.'
      }
    ]
  }
}
```

---

## TOPIC 4: 10" Long Hover Time Build

```javascript
{
  id: '10inch-hover-build',
  title: '10" Maximum Hover Time Build',
  icon: '🔋',
  category: 'build-theory',
  difficulty: 'advanced',
  shortAnswer: 'Low KV motors (1100-1400KV), large stators (2806.5-2812), low-pitch bi-blade props (10x3.8), Li-ion battery pack (6S 4000-5000mAh), lightweight frame, target hover at 25-35% throttle.',
  
  content: {
    overview: `Building a 10" drone optimized for hover time requires understanding the physics of efficient lift, motor efficiency curves, propeller aerodynamics, and battery energy density. This is about maximizing flight time through smart component choices, not raw power.`,
    
    sections: [
      {
        title: 'The Physics of Efficient Hover',
        content: `**Understanding Disc Loading:**

Disc loading = Total weight ÷ Prop disc area

Lower disc loading = More efficient hover

For a 10" (254mm) prop:
• Disc area = π × (127mm)² = 50,670 mm² per prop
• Four motors × 50,670 = 202,680 mm² total disc area

**Why Larger Props Are More Efficient:**
• Move more air at lower velocity
• Lower air velocity = less energy wasted as turbulence
• Think: ceiling fan (efficient) vs hair dryer (inefficient)

**The Hover Efficiency Formula:**
Hover power ∝ (Weight)^(3/2) ÷ √(Disc Area)

This means:
• Doubling weight increases power need by 2.83×
• Doubling disc area reduces power need by 1.41×

**Key Insight:**
Larger, slower-spinning props are ALWAYS more efficient for hover than smaller, faster props moving the same amount of air. This is fundamental physics.`
      },
      {
        title: 'Motor Selection',
        content: `**Ideal Motor Specs for 10" Hover:**

**Stator Size: 2806.5 or 2812**
• 28mm diameter provides excellent torque
• 6.5-12mm height for smooth, efficient operation
• Can easily swing 10" props at low RPM without strain

**KV Rating: 1100-1400 KV**
• Lower KV = more torque per amp
• Lower RPM = more efficient thrust generation
• Matches well with 6S battery voltage

**Example Motor Calculation:**
2812 1200KV on 6S (25.2V fully charged):
• Max theoretical RPM: 30,240
• Efficient operating range: 15,000-20,000 RPM
• This is perfect for 10" low-pitch props

**Recommended Motors:**

| Motor | KV | Weight | Use Case |
|-------|-----|--------|----------|
| T-Motor U7 | 420KV | 165g | 12S ultra-efficiency |
| BrotherHobby 2812 | 900KV | 78g | 6S long range |
| Emax ECO II 2807 | 1300KV | 62g | 6S balanced |
| T-Motor F90 | 1300KV | 70g | Premium efficiency |

**Motor Efficiency Curves:**
Motors are most efficient at 50-70% throttle. 

**Target: Hover at 25-35% throttle**
This positions hover in the efficiency sweet spot while leaving power headroom for maneuvering.`
      },
      {
        title: 'Propeller Selection',
        content: `**Optimal Props for 10" Hover Build:**

**Recommended: 10x3.8 or 10x4.5 bi-blade**

**Size Breakdown:**
• 10 = 10-inch diameter (large disc area)
• 3.8/4.5 = pitch (inches traveled per rotation)

**Why Low Pitch for Hover:**
• Lower pitch = less aggressive blade angle
• More efficient at low throttle (where you'll hover)
• Generates lift with less power consumption
• Quieter operation

**Why Bi-Blade (2-blade):**
• Two blades = less drag than three
• Most efficient at steady-state hover
• Tri-blades are better for agility, but you don't need agility for hover time

**Prop Pitch Comparison for 10":**

| Pitch | Character | Best Use |
|-------|-----------|----------|
| 3.5" | Maximum efficiency | Ultra long hover |
| 3.8" | Very efficient | Long hover, slow cruise |
| 4.5" | Balanced | General long-range |
| 5.0"+ | Aggressive | Not recommended for hover builds |

**Material Considerations:**
• Carbon fiber: Stiff, efficient, expensive, fragile
• Reinforced nylon: Good balance, affordable, durable
• Avoid: Pure plastic (flex loses efficiency)

**Top Prop Recommendations:**
• HQProp 10x3.8 bi-blade
• Gemfan 1038-2
• T-Motor T10x3.8 (premium)
• APC 10x3.8 (classic efficiency prop)`
      },
      {
        title: 'Battery Selection - Li-ion vs LiPo',
        content: `**This is the BIGGEST decision for hover time:**

**Li-ion (18650/21700 cells):**
• Energy density: 200-270 Wh/kg
• Discharge rate: 5-15A continuous per cell
• Weight efficiency: MUCH better for cruising/hover
• Best for: Long flight time at moderate power

**LiPo:**
• Energy density: 150-200 Wh/kg
• Discharge rate: 30-100A+ per cell
• Weight efficiency: Better for high-power bursts
• Best for: Aggressive flying, racing, quick maneuvers

**For Maximum Hover Time: Choose Li-ion**

**Recommended Configuration:**
6S 21700 Li-ion pack (6 cells in series)

**Best Cells:**
• Samsung 40T: 4000mAh, 35A continuous
• Molicel P42A: 4200mAh, 45A continuous (preferred)
• Samsung 50E: 5000mAh, 10A (ultra efficiency, limited power)

**Pack Specs:**
• Configuration: 6S1P (6 cells series, 1 parallel)
• Capacity: 4000-4200mAh
• Weight: ~300-340g
• Voltage: 25.2V fully charged

**Direct Comparison:**

| Battery Type | Capacity | Weight | Energy | Wh/kg |
|--------------|----------|--------|--------|-------|
| 6S 1300mAh LiPo | 1300mAh | 230g | 28.9Wh | 126 |
| 6S 4000mAh Li-ion | 4000mAh | 340g | 88.8Wh | 261 |

**Li-ion provides 2-3× the flight time for similar weight increase!**

**Important Li-ion Considerations:**
• Lower discharge rate limits aggressive flying
• Voltage sag under sudden load (avoid punchy maneuvers)
• Best paired with efficient, low-current builds
• Need BMS or careful cell monitoring`
      },
      {
        title: 'Frame and Weight Optimization',
        content: `**Frame Selection:**

**Characteristics Needed:**
• Lightweight carbon fiber (not heavy aluminum)
• Long arms for 10" prop clearance
• Minimal material where possible
• Secure mounting for larger battery
• Typically 350-450mm motor-to-motor

**Recommended Frame Styles:**
• Dead cat geometry for camera clearance
• True-X for symmetric thrust efficiency
• Long-range specific designs (e.g., Mark4 LR, Chimera)

**Weight Targets (All-Up Weight):**

| Component | Target Weight |
|-----------|---------------|
| Frame | 80-150g |
| Motors (×4) | 250-320g |
| FC + ESC Stack | 25-40g |
| VTX + Antenna | 20-40g |
| Camera | 20-40g |
| Receiver | 5-15g |
| GPS (optional) | 10-20g |
| Wiring/Hardware | 20-40g |
| Battery | 300-400g |
| **Total AUW** | **750-1050g** |

**Weight Reduction Tips:**
• Use lightweight FC/ESC combo (AIO if possible)
• Minimal GPS if not needed for RTH
• Lightweight digital VTX (Walksnail Nano) or efficient analog
• Carbon fiber props save a few grams
• No unnecessary accessories or LEDs
• Trim excess wire lengths

**Every gram matters:**
• 10g extra = ~1% more hover power required
• 50g extra = ~5% reduction in flight time`
      },
      {
        title: 'Complete Build Specification',
        content: `**Optimized 10" Maximum Hover Build:**

**Frame:** 
iFlight Chimera7 Pro (modified for 10") or dedicated 10" LR frame
Weight: ~120g

**Motors:** 
2806.5 1300KV × 4 (e.g., BrotherHobby Tornado, Emax ECO II)
Weight: ~65g each = 260g total

**ESC:** 
4-in-1 35-45A with BLHeli_32 or AM32
Weight: ~12-15g

**Flight Controller:** 
F7 or H7 with Betaflight 4.4+
Weight: ~8-10g
(Or use FC/ESC AIO to save weight)

**Props:** 
10x3.8 bi-blade (HQProp or Gemfan)
Weight: ~12g each = 48g total

**Video System Options:**
• Budget: Caddx Ratel 2 + Rush Tank Mini (~35g)
• Mid: HDZero Whoop Lite + Nano antenna (~40g)
• Premium: Walksnail Avatar Nano Kit (~45g)

**Receiver:** 
ExpressLRS 2.4GHz EP1/EP2 (~2g)

**GPS (recommended):** 
BN-880 or M10 module (~12g)

**Battery:** 
6S 4200mAh 21700 Li-ion pack (Molicel P42A cells)
Weight: ~340g

**Total All-Up Weight:** ~880g

**Expected Performance:**
• Hover throttle: 28-32%
• Flight time (hover): 30-40 minutes
• Flight time (slow cruise): 25-35 minutes
• Cruise speed: 40-60 km/h optimal efficiency
• Max range: 10-20km with proper VTX/antenna setup`
      }
    ],
    
    keyPoints: [
      'Lower disc loading = more efficient hover (larger props, lighter weight)',
      'Low KV motors (1100-1400KV) paired with large stators (2806.5+) for 10" props',
      'Low pitch bi-blade props (10x3.8) maximize hover efficiency',
      'Li-ion batteries provide 2-3× flight time vs LiPo at similar weight',
      'Target hover at 25-35% throttle for optimal motor efficiency zone'
    ],
    
    interviewTips: [
      'Start with the physics explanation - shows deep understanding',
      'Know specific component recommendations with part numbers',
      'Explain why Li-ion over LiPo for this specific application',
      'Mention weight targets and optimization strategies',
      'Be ready to calculate or estimate hover throttle percentage'
    ],
    
    practiceQuestions: [
      {
        q: 'Why would you use Li-ion instead of LiPo for a hover-focused build?',
        a: 'Li-ion has significantly higher energy density (200-270 Wh/kg vs 150-200 Wh/kg for LiPo). For hover/cruise where current draw is moderate and consistent, Li-ion provides 2-3× the flight time per gram of battery weight. The lower discharge rate isn\'t a problem because efficient hover doesn\'t require high current bursts. Cells like Molicel P42A give 4200mAh at only 340g for a 6S pack.'
      },
      {
        q: 'What motor KV and stator size would you choose for a 10" efficiency build?',
        a: '2806.5 or 2812 stator with 1100-1400KV. The large stator (28mm diameter) provides the torque needed to efficiently spin 10" props at low RPM. The low KV generates more torque per amp and keeps RPM in an efficient range. On 6S, a 1200KV motor peaks at ~30,000 RPM, allowing efficient operation at 15,000-20,000 RPM where props and motors are most efficient.'
      },
      {
        q: 'Why use low pitch props (10x3.8) instead of higher pitch (10x5)?',
        a: 'Lower pitch means a gentler blade angle, which is more efficient at low throttle where you\'ll spend most time hovering. High pitch props are designed for speed - they require more power to overcome the steeper blade angle. For hover, you want to move large volumes of air slowly and smoothly, which low pitch achieves with minimal energy. The result is dramatically better efficiency at cruise/hover speeds.'
      },
      {
        q: 'What\'s the target hover throttle percentage and why?',
        a: '25-35% throttle. Motors operate most efficiently at 50-70% of their maximum power output. By sizing components so hover occurs at 25-35% throttle, we position the hover operating point in the motor\'s efficiency sweet spot while still leaving 65-75% of available power for maneuvering, climbing, or fighting wind. This is the key to maximizing flight time.'
      }
    ]
  }
}
```

---

## TOPIC 5: Propeller Pitch, Size, and Shape

```javascript
{
  id: 'propeller-specs',
  title: 'Propeller Pitch, Size, and Shape',
  icon: '🌀',
  category: 'propellers',
  difficulty: 'intermediate',
  shortAnswer: 'Size (diameter) = air volume moved, Pitch = aggressiveness/theoretical travel per rotation, Blade count = thrust vs efficiency trade-off, Shape = noise/efficiency/durability characteristics.',
  
  content: {
    overview: `Propellers are arguably the most important component affecting flight characteristics. Understanding propeller specifications allows you to tune your drone's performance for specific use cases - from efficient cruising to aggressive racing. Every aspect of the prop affects how your quad flies.`,
    
    sections: [
      {
        title: 'Propeller Size (Diameter)',
        content: `**What Diameter Means:**
The first number in a prop spec (e.g., 5 in 5x4.5) is the diameter in inches.

**Physics:**
• Larger diameter = More air displaced per rotation
• Disc area = π × r²
• A 6" prop has 44% more disc area than a 5" prop
• A 7" prop has 96% more disc area than a 5" prop

**Effects of Larger Diameter:**

| Aspect | Larger Diameter |
|--------|-----------------|
| Thrust at hover | More efficient (more air, lower velocity) |
| Current draw at hover | Lower per unit of thrust |
| Top speed | Lower (limited by max prop tip speed) |
| Responsiveness | Slower (more rotational inertia) |
| Motor requirement | More torque needed (larger stator) |

**Prop Size by Frame:**
• 2-2.5" = Tiny whoops, micro quads
• 3" = Cinewhoops, indoor
• 3.5" = Toothpicks, ultralight
• 4" = Light freestyle, cinelifters
• 5" = Standard freestyle/racing
• 6" = Long range, smooth cinematic
• 7" = Dedicated long range
• 8-10"+ = Heavy lift, ultra endurance

**Key Principle:**
Larger props at lower RPM are more efficient than smaller props at higher RPM for generating the same thrust.`
      },
      {
        title: 'Propeller Pitch',
        content: `**What Pitch Means:**
The second number (e.g., 4.5 in 5x4.5) is the pitch in inches - the theoretical distance the prop would travel forward in one complete rotation through a solid medium (like a screw through wood).

**Visualizing Pitch:**
• Low pitch (3.0-4.0"): Gentle blade angle, like a ceiling fan
• Medium pitch (4.0-4.8"): Balanced angle
• High pitch (5.0-6.0"): Aggressive blade angle, like a boat propeller

**Effects of Different Pitch:**

| Pitch Level | Characteristics |
|-------------|-----------------|
| Low (3-4") | Efficient hover, smooth response, lower top speed |
| Medium (4-4.8") | Balanced performance, most versatile |
| High (5-6"+) | Faster top speed, aggressive feel, higher current draw |

**Real-World Thrust Examples (5" prop on 2207 2400KV 6S):**

| Prop | Thrust at Full | Current at Full |
|------|----------------|-----------------|
| 5x3.0 | ~600g | 20A |
| 5x4.3 | ~800g | 28A |
| 5x5.1 | ~950g | 38A |

Higher pitch = more thrust but exponentially more current.

**Matching Pitch to KV:**
• High KV motor (2400+) → Lower pitch prop (compensates for high RPM)
• Low KV motor (1700-) → Higher pitch acceptable (needs the bite)

This is why you can't just put any prop on any motor - they must be matched.`
      },
      {
        title: 'Blade Count',
        content: `**How Blade Count Affects Performance:**

**2-Blade:**
• Most aerodynamically efficient
• Lowest total thrust
• Quietest operation
• Best for: Long range, efficiency-focused builds
• Less responsive/aggressive feel
• Classic airplane propeller look

**3-Blade (Industry Standard):**
• Good balance of thrust and efficiency
• Most common for 5" builds
• Best all-around for freestyle/racing
• Good grip and control in all maneuvers
• Sweet spot for most pilots

**4-Blade:**
• More thrust than 3-blade (~15% more)
• Less efficient (~10% more current)
• Better low-speed grip and control
• Better for heavier builds or carrying cameras
• Louder than 3-blade
• Popular for cinematic flying (smooth authority)

**5+ Blade (Specialty):**
• Maximum thrust
• Lowest efficiency
• Very loud
• Used for: Heavy lift, extreme grip requirements
• Diminishing returns beyond 4 blades

**Quick Comparison:**

| Blades | Thrust | Efficiency | Noise | Best For |
|--------|--------|------------|-------|----------|
| 2 | 80% | 100% | Low | Long range |
| 3 | 100% | 85% | Medium | All-around |
| 4 | 115% | 75% | High | Heavy lift, cine |
| 5 | 125% | 65% | Very High | Specialty |

**Choosing Blade Count:**
• Max efficiency → 2-blade
• Balanced/general → 3-blade
• Need more thrust/grip → 4-blade
• Specialty applications → 5+`
      },
      {
        title: 'Blade Shape and Geometry',
        content: `**Chord Width (Blade Width):**

**Narrow Chord:**
• Less thrust per blade
• More efficient (less drag)
• Less noise
• Typically found on: Racing props

**Wide Chord:**
• More thrust per blade
• More drag = more current
• More noise
• Typically found on: Freestyle props, heavy lift

**Tip Shape:**

**Square/Flat Tips:**
• More thrust concentrated at tips
• More noise (tip vortices)
• Slightly more efficient at high speed
• Looks aggressive

**Rounded Tips:**
• Quieter operation
• Less tip vortex losses
• Slightly less thrust at same RPM
• Smoother feel

**Bullnose (Blunt/Cut Tips):**
• Maximum thrust in shortest diameter
• Most durable in crashes
• Most noise
• Good for tight spaces or durability needs

**Leading Edge Shape:**

**Sharp Leading Edge:**
• Cuts through air cleanly
• More efficient
• More fragile
• Found on: Premium props

**Rounded Leading Edge:**
• More durable to impacts
• Slightly less efficient
• Found on: Budget and beginner props

**Progressive vs Constant Pitch:**

**Constant Pitch:**
• Same pitch angle along entire blade
• Simpler manufacturing
• Good for most applications

**Progressive/Variable Pitch:**
• Pitch changes from hub to tip
• Optimizes each blade section for its local airspeed
• More efficient overall
• Found on: Premium props (T-Motor, HQProp, Gemfan Fury series)`
      },
      {
        title: 'Reading Propeller Specifications',
        content: `**Common Naming Conventions:**

Format variations all mean the same thing:

**5040 or 5x4.0 or 5040x3:**
• 5 = 5-inch diameter
• 04 or 4.0 = 4-inch pitch
• x3 = 3 blades (if specified)

**51466 or 5.1x4.66x3:**
• 5.1 = 5.1" diameter
• 4.66 = pitch (sometimes written 46 or 466)
• 3 = blade count

**Popular Prop Examples:**

| Name | Diameter | Pitch | Blades | Character |
|------|----------|-------|--------|-----------|
| 51466 | 5.1" | 4.66" | 3 | Aggressive freestyle |
| 5043 | 5" | 4.3" | 3 | Balanced everyday |
| 5040 | 5" | 4.0" | 3 | Smooth, efficient |
| 5051 | 5" | 5.1" | 3 | Racing, speed |
| 4024 | 4" | 2.4" | 3 | Cinewhoop |
| 7035 | 7" | 3.5" | 2 | Long range efficiency |
| 3018 | 3" | 1.8" | 2 | Toothpick |

**Brand-Specific Names:**
Some manufacturers use names instead of numbers:
• HQProp Ethix S3 = roughly 5x4.3 equivalent
• Gemfan Hurricane = aggressive freestyle design
• T-Motor T5147 = premium 5.1x4.7

Always check actual specs when trying a new brand.`
      },
      {
        title: 'Matching Props to Your Build',
        content: `**Prop Selection Framework:**

**Step 1: Match to Frame Size**

| Frame Size | Max Prop |
|------------|----------|
| 2.5" frame | 2.5" prop |
| 3" frame | 3" prop |
| 5" frame | 5-5.1" prop |
| 7" frame | 7" prop |

Always check frame specs for maximum prop clearance!

**Step 2: Match to Motor KV (on 6S)**

| Motor KV | Recommended Pitch |
|----------|-------------------|
| 2400+ KV | 4.0-4.3" (lower) |
| 1900-2200 KV | 4.3-4.8" (medium) |
| 1400-1800 KV | 4.8-5.5" (higher OK) |
| Under 1400 KV | 5.0"+ (high pitch OK) |

**Step 3: Match to Flying Style**

| Style | Pitch | Blades | Examples |
|-------|-------|--------|----------|
| Long range/efficiency | Low 3.5-4.0 | 2 | 7035-2, 5030-2 |
| Freestyle | Medium 4.3-4.8 | 3 | 51466, 5043 |
| Racing | High 4.8-5.5 | 3 | 5051, 5048 |
| Cinematic | Low-Med 4.0-4.5 | 3-4 | 5040x4, 5043 |
| Heavy lift | Medium 4.3-4.8 | 4-5 | 5045x4 |

**Quick Recommendations:**

**5" Freestyle (2207 2400KV 6S):**
• Gemfan 51466 (aggressive)
• HQProp 5x4.3x3 (balanced)

**5" Racing (2207 1950KV 6S):**
• Gemfan 5051
• HQProp 5x4.8x3

**7" Long Range (2806.5 1300KV 6S):**
• HQProp 7x3.5x2
• Gemfan 7035-2

**3" Cinewhoop (1507 3600KV 4S):**
• Gemfan D76 ducted
• HQProp 3x1.8x3`
      }
    ],
    
    keyPoints: [
      'Diameter determines air volume moved - larger = more efficient hover',
      'Pitch is aggressiveness - higher pitch = more speed but more current',
      'More blades = more thrust but less efficiency (3-blade is the sweet spot)',
      'Blade shape affects noise, durability, and efficiency',
      'Always match props to motor KV and flying style'
    ],
    
    interviewTips: [
      'Decode prop numbers immediately when asked (e.g., "51466 means 5.1" diameter, 4.66" pitch, likely 3-blade")',
      'Use the screw analogy for pitch - it\'s intuitive and memorable',
      'Know the blade count trade-offs cold (2=efficient, 3=balanced, 4=thrust)',
      'Give specific prop recommendations for different build types',
      'Discuss matching props to motor KV - shows system-level thinking'
    ],
    
    practiceQuestions: [
      {
        q: 'What does 51466 mean in propeller naming?',
        a: '5.1-inch diameter with 4.66-inch pitch, typically a 3-blade prop. This means the prop is 5.1 inches across, and would theoretically travel forward 4.66 inches per complete rotation through a solid medium. It\'s an aggressive freestyle prop - the slightly larger diameter and medium-high pitch give good thrust and speed.'
      },
      {
        q: 'Why would you choose a 2-blade prop over a 3-blade?',
        a: '2-blade props are more aerodynamically efficient, generating more thrust per watt of power consumed. They\'re also quieter due to less blade interaction and tip vortex noise. The trade-off is lower total thrust and slightly less responsive feel. They\'re ideal for long-range and efficiency builds where flight time matters more than aggressive performance.'
      },
      {
        q: 'How does pitch affect flight characteristics?',
        a: 'Higher pitch means a more aggressive blade angle - the prop "bites" more air per rotation, like a steeper screw thread. This provides more speed and thrust but draws significantly more current (exponentially, not linearly). Lower pitch is smoother, more efficient at hover, but has a lower top speed. Think of it like gear ratios in a car - low pitch is like a lower gear (more torque/control), high pitch is like a higher gear (more speed).'
      },
      {
        q: 'What prop would you recommend for cinematic flying and why?',
        a: 'A medium-low pitch 3 or 4-blade prop, like 5x4.0x3 or 5x4.3x4. Lower pitch provides smooth, predictable throttle response without sudden jolts - important for stable footage. 3-4 blades provide good authority and control at slow speeds for precise movements. You want to avoid high-pitch racing props that are twitchy and aggressive. The goal is silky smooth, controllable flight.'
      }
    ]
  }
}
```

I'll continue with the remaining topics in the next file...

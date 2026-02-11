// FPV Topics Complete Data
export const FPV_TOPICS = [
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
          title: 'Signal Penetration, Range & Power Output',
          content: `**CRITICAL: Analog Can Transmit at HIGHER Power**

This is a key advantage often overlooked: analog VTX systems can legally and practically transmit at much higher power levels than digital systems.

**Analog Power Output:**
• Typical range: 25mW - 1000mW (1W)
• High-power options: Up to 2000mW (2W) available
• Legal limits vary by region (usually 25-600mW)
• Long-range pilots often use 800mW-1W+
• Higher power = more range and penetration

**Digital Power Output:**
• DJI: Fixed at ~700mW (cannot increase)
• HDZero: Up to 1W (1000mW) on some VTX
• Walksnail: Up to 1200mW on some units
• Digital systems often power-limited by design/regulation

**Why This Matters:**
• For long-range flying, raw power helps overcome obstacles
• Analog at 1-2W can push through terrain that digital can't
• Many digital systems have no way to increase power
• This is why some long-range pilots still choose analog

**Analog:**
• Theoretical range: 1-30km (depending on power/antenna)
• At 1W+ power, can achieve 20-30km with directional antennas
• Penetration: Good through foliage, moderate through walls
• Behavior: Signal quality decreases linearly with obstacles

**Digital:**
• DJI: Best penetration, 10-15km typical range (but fixed power)
• HDZero: Similar range to good analog, up to 1W output
• Walksnail: Good penetration, 5-10km typical, up to 1.2W

**Real-World Factors:**
• Antenna quality matters more than VTX power
• Antenna polarization (RHCP vs LHCP) for diversity
• Receiver sensitivity varies widely between goggles
• Environmental interference (WiFi, other pilots)
• Directional antennas (patch, crosshair) dramatically extend range`
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
        'ANALOG CAN TRANSMIT HIGHER POWER: Up to 1-2W vs digital ~700mW-1.2W max',
        'DJI has best image quality but highest latency, weight, and fixed power',
        'HDZero is the racing-focused digital option with lowest digital latency',
        'Choose based on PRIMARY use case: racing vs freestyle vs cinematic vs long-range'
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
          a: 'Lower latency (8-15ms vs 25-40ms) for faster reaction times, graceful signal degradation allowing them to "fly through" interference, lighter weight for better performance, and more reliable operation in multi-pilot scenarios where digital systems might interfere with each other.',
          distractors: [
            'Digital systems like DJI offer 5-8ms latency in race mode, lower than analog\'s 15-20ms, plus HD recording capability makes digital the preferred choice for professional racing leagues.',
            'Analog\'s 480p resolution makes it harder to spot gates at distance, which is why professional racers switched to digital systems that offer 1080p for better obstacle detection.',
            'Professional racers prefer digital because the cliff effect provides a clear on/off signal status, whereas analog static can be distracting and cause more crashes during races.'
          ]
        },
        {
          q: 'Explain the "cliff effect" in digital FPV.',
          a: 'Unlike analog where signal weakens gradually into static while maintaining a viewable image, digital systems either work perfectly or fail completely. When signal strength drops below the decode threshold, video cuts out entirely with no warning - there\'s no gradual degradation to alert the pilot.',
          distractors: [
            'The cliff effect refers to the sudden increase in latency that occurs when digital signal strength drops below 70%, causing a jump from 25ms to over 100ms before eventual signal loss.',
            'Digital systems experience staged degradation called the cliff effect - resolution drops from 1080p to 720p to 480p as signal weakens, then cuts out completely at minimum threshold.',
            'The cliff effect is caused by packet buffering in digital systems - when signal weakens, the receiver buffers more frames to compensate, causing increasing latency until the buffer overflows and video freezes.'
          ]
        },
        {
          q: 'What\'s the latency difference between the main systems and why does it matter?',
          a: 'Analog: 8-15ms, HDZero: 15-25ms, Walksnail: 22-32ms, DJI: 28-40ms. At high speeds, this delay means you\'re flying "blind" for longer distances. At 100mph, 30ms of latency means 4.4 feet of travel you haven\'t seen yet - critical when racing through gates.',
          distractors: [
            'All digital systems have similar latency of 40-60ms due to the encoding/decoding process, while analog achieves 1-3ms. The 40ms digital floor is acceptable for freestyle but not racing.',
            'DJI: 8-12ms, HDZero: 12-18ms, Walksnail: 15-22ms, Analog: 25-35ms. Digital systems are actually faster because they use predictive algorithms to compensate for processing delay.',
            'Latency differences under 50ms are imperceptible to human reaction time (250ms average), so the latency debate is mostly theoretical and doesn\'t affect actual flight performance.'
          ]
        },
        {
          q: 'Which digital system would you recommend for racing and why?',
          a: 'HDZero - it has the lowest latency of any digital system (15-25ms), approaching analog performance while delivering 720p video quality. It was specifically designed with racing in mind, uses a modular system that\'s easy to repair, and has growing industry support.',
          distractors: [
            'DJI O3 is best for racing with its 12ms latency mode and 1080p recording. HDZero\'s 720p looks dated and lacks the image quality needed to spot gates clearly at racing speeds.',
            'Walksnail Avatar is the racing choice because its 1080p/100fps mode provides the smoothest image with 18ms latency, and it\'s more affordable than both DJI and HDZero systems.',
            'Analog remains the only viable racing option. Even HDZero\'s 25-35ms latency is too slow for competitive racing where pilots need sub-10ms response to navigate gates at speed.'
          ]
        },
        {
          q: 'Why might you choose analog for long-range flying despite lower video quality?',
          a: 'Analog can transmit at much higher power levels - up to 1W-2W compared to digital systems that are often limited to 700mW-1.2W. Higher transmit power means better signal penetration through obstacles and extended range. Additionally, analog\'s graceful degradation gives you warning before signal loss (static increases), while digital just cuts out. For extreme long range, the ability to run 1W+ analog VTX with a directional antenna can achieve 20-30km range.',
          distractors: [
            'Analog is actually worse for long-range because its signal degrades linearly with distance, while digital maintains perfect quality until maximum range, then cleanly switches to GPS return-to-home.',
            'DJI systems offer the best long-range performance with 15km proven range and obstacle penetration superior to analog. Analog is only chosen for long-range due to lower equipment cost.',
            'Long-range pilots choose analog because digital systems are legally restricted to 1km range in most countries, while analog has no such restrictions on transmission distance.'
          ]
        },
        {
          q: 'Compare the maximum power output capabilities of analog vs digital systems.',
          a: 'Analog VTX can output up to 2W (2000mW), with 800mW-1W being common for long-range. DJI is fixed at ~700mW with no user adjustment. HDZero can reach 1W on some VTX models. Walksnail goes up to 1.2W. For maximum range and penetration, analog still has the power advantage. This matters because RF power directly affects range - doubling power adds roughly 40% range in ideal conditions.',
          distractors: [
            'All FPV systems are legally limited to 600mW in the US and EU regardless of analog or digital. Higher power claims are marketing exaggerations or refer to illegal modifications.',
            'DJI outputs 1.5W (1500mW) which exceeds analog capabilities. The perception that analog has more power comes from older systems - modern digital has surpassed analog in transmission power.',
            'Power output is similar across systems (600-800mW typical), but digital systems achieve better range through advanced error correction and spread spectrum technology, not raw power.'
          ]
        },
        {
          q: 'At 80mph, how many additional feet does a pilot fly blind with DJI (35ms latency) compared to analog (10ms latency)?',
          a: 'At 80mph (117.3 feet/second), each millisecond equals about 0.117 feet of travel. DJI at 35ms = 4.1 feet blind. Analog at 10ms = 1.17 feet blind. Difference = 2.93 feet additional blind flying with DJI. This nearly 3-foot difference can mean the difference between clearing a gate and clipping it in racing.',
          distractors: [
            'The 25ms difference results in approximately 8.5 additional feet of blind flying, which is why digital systems are banned from professional MultiGP racing events.',
            'At 80mph, the 25ms latency difference equals about 0.5 feet - less than the width of most gates. Human reaction time (200ms) is the larger factor, making latency differences negligible.',
            'DJI\'s predictive video algorithm compensates for latency by extrapolating frame position, so effective blind distance is only 0.8 feet more than analog despite the 25ms difference.'
          ]
        },
        {
          q: 'Why does HDZero achieve lower latency than DJI despite both being digital systems?',
          a: 'HDZero uses a simpler compression algorithm and prioritizes latency over image quality. DJI uses more aggressive compression for higher resolution (1080p vs 720p) which requires more processing time. HDZero was specifically designed for racing where latency matters more than maximum resolution, while DJI prioritized cinematic quality for their target market.',
          distractors: [
            'HDZero achieves lower latency by transmitting uncompressed video, avoiding encoding delay entirely. DJI uses H.265 compression which adds 15-20ms of encoding time alone.',
            'HDZero uses dedicated FPGA chips for video processing while DJI uses general-purpose processors. The custom silicon gives HDZero a 20ms advantage in processing speed.',
            'Both systems have identical latency in their raw transmission, but HDZero goggles have faster displays (120Hz vs 60Hz) which reduces perceived latency by half.'
          ]
        },
        {
          q: 'A pilot is flying behind a concrete building and loses video. With analog they got static first, with digital it cut out instantly. Explain the physics behind this difference.',
          a: 'Analog transmits a continuous wave - as signal weakens through obstacles, the receiver still decodes what it can, showing as static/snow while maintaining some image. Digital transmits encoded packets that must be fully received and decoded - if too many packets are corrupted or lost, the decoder cannot reconstruct the frame and displays nothing. There is no partial decode with digital, only complete success or complete failure.',
          distractors: [
            'Digital systems use higher frequencies (5.8GHz vs 5.3GHz for analog) which are more easily blocked by concrete. The instant cutout is due to the frequency band, not the encoding method.',
            'Analog signals reflect off surfaces allowing multipath reception around obstacles, while digital signals travel only in straight lines and cannot bend around buildings like analog can.',
            'Digital systems buffer 200ms of video to smooth transmission, so when signal is blocked, the buffer empties suddenly causing instant blackout. Analog has no buffer so degradation is visible immediately.'
          ]
        },
        {
          q: 'For a defense or military drone application, what video system considerations change compared to consumer FPV?',
          a: 'Key differences: 1) Reliability over image quality - analog may be preferred for graceful degradation in contested environments. 2) Electronic warfare - digital systems are more vulnerable to jamming since they need clean packet delivery; analog degrades but keeps working. 3) Encryption - digital can encrypt video; analog cannot, making it interceptable. 4) Range/penetration - higher power analog VTX pushes through obstacles better. 5) Weight/power trade-offs favor mission capability over video quality. 6) The ideal solution bypasses RF entirely - fiber-optic control (like ARCHER FIBER) eliminates jamming and interception risks completely.',
          distractors: [
            'Military applications always use digital because 1080p resolution is required for target identification at range. Analog\'s 480p is insufficient for military reconnaissance. All modern defense drones use DJI O3 with AES-256 encryption built into the video link. Analog is only used in training exercises.',
            'Defense drones use neither analog nor digital FPV - they operate autonomously using AI-based obstacle avoidance. Human pilots are too slow for combat situations where millisecond decisions matter. The video system is only used for post-mission review, not real-time piloting.',
            'Military drones exclusively use satellite-linked video systems operating on X-band (8-12 GHz) rather than the 5.8GHz used in consumer FPV. This provides global range and encryption. The 5.8GHz consumer equipment cannot be certified for military use under ITAR regulations.'
          ]
        },
        {
          q: 'If you were building a 10" endurance drone, would you choose analog or digital video? Justify your choice.',
          a: 'For 10" endurance, analog is the practical choice: 1) Lighter weight (17g total vs 20-30g digital) saves energy over long flights. 2) Higher power options (up to 2W) extend video range beyond digital limits. 3) Graceful degradation gives warning before signal loss - critical at long range. 4) Lower power consumption from the VTX itself. 5) Simpler, cheaper to replace in the field. Exception: if you need HD recording or are flying line-of-sight with a spotter, digital like Walksnail Nano is competitive in weight and provides superior image quality.',
          distractors: [
            'Digital is always better for endurance builds because the error correction in digital protocols means you can use lower transmit power and still maintain signal quality. A 400mW digital system outranges an 800mW analog system. Lower VTX power consumption directly extends flight time by 10-15%.',
            'You should use DJI O3 for endurance builds because its 1080p recording eliminates the need for a separate action camera, saving 150g. The combined weight savings of removing the action camera makes DJI the lightest total video solution despite its heavier VTX module.',
            'Neither analog nor digital matters for endurance - use the cheapest option. Video system weight is less than 2% of total AUW on a 10" build, so it has negligible impact on flight time. The difference between systems is less than 30 seconds of hover time.'
          ]
        }
      ]
    }
  },
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
          a: 'The stator is 23mm in diameter (width) and 6mm tall (height). The wider 23mm stator provides more torque than a 22mm stator, making it excellent for aggressive freestyle flying with heavier props, though the shorter 6mm height trades some top-end RPM for better efficiency.',
          distractors: [
            'The stator is 23mm tall (height) and 6mm in diameter (width). The taller 23mm stator provides higher RPM potential while the narrow 6mm width keeps weight down for racing applications.',
            'The designation indicates 2306 RPM per volt (KV rating) with standardized stator dimensions. This mid-range KV is suitable for both 5" freestyle and 6" long-range builds.',
            'The first two digits (23) indicate the motor\'s torque constant in mNm/A, while the last two (06) indicate efficiency class. A 2306 produces 23 mNm of torque per amp at class 6 efficiency.'
          ]
        },
        {
          q: 'Why would you choose a 2806.5 motor over a 2207 for a 7" build?',
          a: 'The 2806.5 has significantly more stator volume (28mm wide × 6.5mm tall vs 22mm × 7mm), providing the torque needed to efficiently spin larger 7" props at lower RPM. A 2207 would technically work but would run hotter, draw more current, and be less efficient because it lacks the torque to swing larger props comfortably.',
          distractors: [
            'The 2806.5 has a taller stator (28mm vs 22mm height) which provides higher RPM needed for 7" props. The extra height allows the motor to spin faster, compensating for the larger prop\'s air resistance.',
            'Both motors perform similarly on 7" builds, but 2806.5 is preferred because its wider bell housing provides better cooling for the larger prop loads, not because of torque differences.',
            'The 2207 is actually preferred for 7" builds due to its higher RPM capability. The 2806.5 is designed for 10"+ props where the extra weight is justified by the extreme torque requirements.'
          ]
        },
        {
          q: 'For efficiency, should you choose a larger or smaller stator motor?',
          a: 'Larger (within reason). A motor running at 50% throttle to hover is more efficient than a smaller motor at 80% throttle achieving the same hover. The larger motor draws less current per unit of thrust and runs cooler. The trade-off is additional weight, so there\'s a sweet spot where efficiency gains outweigh the weight penalty.',
          distractors: [
            'Smaller stators are more efficient because they have less iron mass, reducing magnetic losses. A 1806 motor at 80% throttle produces less heat than a 2207 at 50% throttle for the same thrust output.',
            'Stator size doesn\'t significantly affect efficiency - it primarily affects power output. Choose the smallest motor that meets your thrust requirements to minimize weight and maximize flight time.',
            'Larger stators are less efficient due to increased bearing friction and air resistance from the bigger bell. Efficiency is maximized by using the smallest motor that can handle your prop size.'
          ]
        },
        {
          q: 'How does stator height affect motor performance?',
          a: 'Taller stators allow for more magnetic poles and faster magnetic field changes, resulting in higher potential RPM and more aggressive throttle response. They\'re better for quick acceleration and high-speed flying. However, taller stators also mean more weight and potentially more heat generation under load.',
          distractors: [
            'Taller stators increase torque output by providing more copper windings in series, creating a stronger magnetic field per amp. Height primarily affects torque, while width affects RPM potential.',
            'Stator height determines the motor\'s voltage rating - taller stators can handle higher voltage (6S vs 4S). A 2207 can run 6S safely while a 2204 is limited to 4S operation.',
            'Taller stators improve efficiency by increasing the surface area for heat dissipation. The performance difference is minimal - height is primarily a thermal management consideration.'
          ]
        },
        {
          q: 'Calculate the stator volume difference between a 2207 and a 2306 motor. Which has more volume and by approximately what percentage?',
          a: 'Using cylinder volume (π×r²×h): 2207 = π×(11mm)²×7mm = 2661mm³. 2306 = π×(11.5mm)²×6mm = 2494mm³. The 2207 actually has about 6.7% MORE stator volume than the 2306 despite the 2306 having a wider diameter. This shows why both dimensions matter - the 2207\'s extra height compensates for narrower width.',
          distractors: [
            'The 2306 has approximately 15% more volume because diameter affects volume quadratically (πr²), while height is linear. The wider 23mm diameter easily overcomes the 1mm height difference.',
            'Both motors have nearly identical stator volume (within 1%). The 2306\'s wider diameter exactly compensates for the 2207\'s extra height, making them interchangeable for most applications.',
            'The 2306 has 23% more volume, calculated as (23×6)/(22×7) = 138/154 = 0.89... wait, that shows 2207 larger. Actually 2306 is larger because width is the dominant factor in torque production.'
          ]
        },
        {
          q: 'A 2207 1700KV motor and a 2207 2400KV motor have identical stators. Why does the 1700KV version produce more torque per amp?',
          a: 'Lower KV motors have more wire turns in their windings. More turns = stronger magnetic field per amp of current. The torque constant is inversely proportional to KV (Kt ∝ 1/KV). So 1700KV has roughly 41% more torque per amp than 2400KV. The trade-off is lower maximum RPM - the same voltage produces fewer revolutions per minute.',
          distractors: [
            'Lower KV motors use thicker wire with lower resistance, allowing more current to flow and creating a stronger magnetic field. The 1700KV version draws 40% more current at the same throttle, producing more torque.',
            'The 1700KV has stronger permanent magnets to compensate for the lower electrical speed. Manufacturers use higher-grade N52 magnets in low-KV motors vs N48 in high-KV versions.',
            'Both motors produce identical torque per amp - KV only affects speed, not torque. The 1700KV feels more torquey because it operates at lower RPM where prop efficiency is higher.'
          ]
        },
        {
          q: 'You have a 2812 motor rated for 7" props. Can you run it on a 5" build? What would be the consequences?',
          a: 'Technically yes, but it would be inefficient. The 2812\'s large stator is designed for high torque at low RPM to swing heavy 7" props. On 5" props, you\'d have excess torque you can\'t use, wasted weight (2812 weighs ~78g vs 2207 at ~32g), and the motor would run below its efficiency curve. You\'d also need higher KV to compensate for the small props, defeating the purpose of the large stator.',
          distractors: [
            'No, the 2812 cannot physically fit on a 5" frame due to the larger motor mounting pattern. 7" motors use 19mm mounting holes while 5" frames have 16mm patterns.',
            'Yes, and it would actually improve efficiency. The oversized motor runs cooler at lower throttle, extending motor life and improving flight time despite the extra 30g of weight.',
            'No, the 2812\'s low KV (typically 900-1100) cannot spin 5" props fast enough to generate adequate thrust. The motor would overheat trying to compensate with higher current.'
          ]
        },
        {
          q: 'Why do 1404 motors for 3" builds typically run 3000-4500KV while 2806.5 motors for 7" builds run 1100-1500KV?',
          a: 'Smaller props need higher RPM to generate adequate thrust due to less disc area. Higher KV achieves this. Larger props are more efficient at lower RPM and need more torque to overcome their greater inertia. The relationship is roughly inverse - as prop size doubles, optimal KV roughly halves. This keeps tip speeds reasonable and motors in their efficient operating range.',
          distractors: [
            'Smaller motors have less stator volume and cannot produce adequate torque for low-KV operation. The high KV compensates for the weak magnets in compact motors by spinning faster.',
            'The KV difference is primarily about battery voltage - 3" builds typically run 4S (16.8V) while 7" builds run 6S (25.2V). Lower voltage systems need higher KV to achieve similar RPM.',
            'High-KV small motors and low-KV large motors have similar actual RPM ranges (15,000-25,000). The KV difference exists because manufacturers target the same RPM at different voltage standards.'
          ]
        }
      ]
    }
  },
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
save                   # Save and reboot`
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
          a: '1) Wire servo signal to M5 pad, ground to GND, power to an external 5V BEC. 2) In CLI, check "resource list" to find M5\'s pin (e.g., B06). 3) Run "resource MOTOR 5 NONE" to free the pin. 4) Run "resource SERVO 1 B06" to assign it to servo. 5) Save and reboot. 6) In Servos tab, set min/max (1000/2000) and middle (1500). 7) Use "smix 0 0 5 100 0 0 100 0" to assign to AUX2. 8) Save and test with props off.',
          distractors: [
            '1) Wire servo directly to M5 signal, ground, and 5V pads on the FC. 2) In CLI run "set motor5_protocol = PWM" to switch from DShot to PWM. 3) Run "set servo_pwm_rate = 50" to configure 50Hz output. 4) In Configuration tab, change Motor 5 from "Motor" to "Servo" in the dropdown. 5) Set endpoints in the Servos tab. 6) Use Modes tab to assign a switch.',
            '1) Enable "Servo Mode" in Configuration tab which auto-detects the servo on any unused motor output. 2) Betaflight will scan for servos on M5-M8 and configure them automatically. 3) Use the Receiver tab to map your AUX channel directly to the servo. 4) Adjust travel limits in the radio, not in Betaflight. 5) Power from FC 5V rail is fine for standard servos.',
            '1) Connect servo to M5 and wire power to the FC\'s built-in servo rail. 2) In CLI run "feature SERVO_TILT" to enable servo support. 3) Run "set servo_lowpass_hz = 50" to enable 50Hz output. 4) In the Mixer tab, add M5 to the Servo group. 5) Channel assignment is automatic based on SBUS channel order. 6) Save and calibrate endpoints using stick commands in-flight.'
          ]
        },
        {
          q: 'Why can\'t you just plug a servo into an active motor output?',
          a: 'Motor outputs typically run DShot protocol (digital, high frequency) or high-frequency PWM for motor control, while servos require traditional 50Hz PWM with 1000-2000μs pulses. The protocols are completely incompatible - a servo will not respond to DShot signals. You must remap the resource to output servo-compatible PWM signals instead.',
          distractors: [
            'Motor outputs use 3.3V logic levels while servos require 5V signals. The voltage mismatch means the servo won\'t detect the pulses. You need to install a level shifter chip between the FC and servo, or use dedicated servo outputs that have built-in voltage boosters.',
            'Motor outputs are inverted PWM signals (high when idle, low when active) while servos need standard PWM (low when idle). Plugging a servo into an inverted output causes it to slam to one endpoint and stay there. The resource remap command switches the output polarity.',
            'Motor outputs share a common timer that runs at 8kHz for smooth motor control. Servos need their own dedicated 50Hz timer, and there are only 2-4 timers available. Remapping assigns the servo to a different timer group that supports the lower frequency without affecting motor outputs.'
          ]
        },
        {
          q: 'What\'s the CLI command sequence to free Motor 5 and assign it as Servo 1?',
          a: '"resource MOTOR 5 NONE" frees the pin from motor duty. Then "resource SERVO 1 [pin_identifier]" assigns that pin to servo output. The pin identifier (like B06 or A15) can be found by checking "resource list" before freeing the motor. Finally, "save" to persist changes and reboot.',
          distractors: [
            '"set motor5_output = SERVO" converts Motor 5 directly to a servo output with automatic pin detection. Then "set servo1_channel = AUX2" assigns the control channel. The pin identifier is handled internally. Run "save" to persist changes.',
            '"remap MOTOR_5 TO SERVO_1" performs a direct resource swap in a single command. Betaflight automatically detects the pin and reassigns it. Then run "servo_protocol PWM50" to set the correct frequency. Finally "save" and reboot.',
            '"feature -MOTOR_5" disables the motor output. Then "feature SERVO_1" enables servo mode on the same physical pin, which inherits the assignment automatically. Use "servo 1 enable" to activate it, then "save" to commit changes.'
          ]
        },
        {
          q: 'Why should you use an external BEC for servo power?',
          a: 'Servos can draw 500mA to 2A+ under load, which can exceed the FC\'s 5V regulator capacity. Drawing too much current from the FC can cause voltage drops (brownouts), potentially crashing the flight controller mid-flight. An external BEC isolates servo power consumption and provides stable voltage even under high servo load.',
          distractors: [
            'Servos require clean filtered DC power with less than 10mV ripple, which the FC\'s switching regulator cannot provide. The electrical noise from the FC\'s 5V rail causes servo jitter and reduces positioning accuracy. External linear BECs provide the cleaner power that precision servos require.',
            'Servos operate at different voltages (4.8V or 6V) than the FC\'s fixed 5V rail. An external BEC allows you to select the optimal voltage for your specific servo model. Running at 5V exactly can cause overheating in servos rated for 4.8V nominal.',
            'The FC\'s 5V rail has built-in current limiting at 200mA to protect the USB port. Servos trigger this protection circuit even at idle, causing intermittent resets. External BECs bypass this limit since they connect directly to the battery through the power distribution board.'
          ]
        },
        {
          q: 'What does the smix command "smix 0 0 5 100 0 0 100 0" mean, breaking down each parameter?',
          a: 'smix [rule 0] [target servo 0] [input channel 5/AUX2] [rate 100%] [speed 0/instant] [min 0] [max 100] [box 0/always active]. This creates mixer rule 0 that maps AUX2 (channel 6) to servo 0 at full rate with no speed limiting, full range, and always active regardless of flight mode boxes.',
          distractors: [
            'smix [servo ID 0] [mode 0/position] [PWM min 5] [PWM multiplier 100] [deadband 0] [center offset 0] [travel limit 100] [smoothing 0]. Creates servo 0 in position mode with 500μs minimum pulse, 100% PWM duty cycle, no deadband, centered, full travel, and no output smoothing.',
            'smix [output 0] [timer 0] [prescaler 5] [period 100] [phase 0] [polarity 0] [enable 100] [filter 0]. Configures timer 0 for output 0 with 5x prescaler, 100Hz base frequency, 0° phase offset, normal polarity, 100% duty range, and no filtering.',
            'smix [channel 0] [protocol 0/PWM] [frequency 5] [resolution 100] [offset 0] [trim 0] [expo 100] [failsafe 0]. Sets channel 0 to PWM mode at 50Hz, 100-step resolution, no offset or trim, 100% linear response, and 0μs failsafe pulse.'
          ]
        },
        {
          q: 'You connect a servo to M6 but it jitters constantly. List three possible causes and solutions.',
          a: '1) Electrical noise - add a 100-470μF capacitor across servo power leads. 2) Insufficient current - servo BEC can\'t supply enough amps under load, use higher-rated BEC. 3) Ground loop - ensure servo ground connects to same ground reference as FC, not a separate ground. Also check: PWM frequency mismatch (servo expects 50Hz), resource not properly remapped from motor to servo.',
          distractors: [
            '1) PID loop interference - lower D-term by 20% since servo PWM shares the same timer as D-term calculations. 2) RC link latency - set failsafe_delay to 0ms so the servo gets commands faster. 3) Gyro noise coupling - enable servo_lowpass filter at 10Hz to smooth movements. Also check that the servo protocol matches your ESC protocol.',
            '1) Clock drift - the FC crystal is running fast, set servo_clock_trim to -5 to compensate. 2) Timer conflict - M6 shares timer 4 with M2, move servo to M8 which has a dedicated timer. 3) Firmware bug - downgrade to Betaflight 4.2 where servo PWM was more stable. Also verify the servo isn\'t a digital servo which needs 300Hz.',
            '1) Stick jitter from radio - increase servo_deadband to 15μs to filter out small stick movements. 2) Temperature sensitivity - digital servos drift when cold, wait 2 minutes for warm-up. 3) Feedback pot wear - the servo\'s internal position sensor is degraded, replace with brushless servo. Also try setting servo_rate lower to reduce update frequency.'
          ]
        },
        {
          q: 'Explain why you must run "resource MOTOR 5 NONE" before "resource SERVO 1 B06" when setting up a servo.',
          a: 'Each pin can only have one resource assignment at a time. Motor 5 is pre-assigned to that pin for DShot motor output. If you try to assign SERVO 1 to the same pin without first freeing it, you\'ll get a conflict error or undefined behavior. The "NONE" command releases the pin from motor duty, making it available for servo assignment. The pin can\'t output both DShot and servo PWM simultaneously.',
          distractors: [
            'The "NONE" command tells the DMA controller to stop sending motor data to that pin. Without clearing DMA first, the servo assignment would create a race condition where both motor and servo data try to use the same DMA channel. The NONE keyword safely stops the DMA transfer before reassignment.',
            'Betaflight\'s resource table has priority levels, and MOTOR resources have higher priority than SERVO resources. The NONE command temporarily elevates the pin to priority level 0, allowing the servo assignment to override. Without this step, the servo command would fail silently due to insufficient priority.',
            'The NONE command reconfigures the pin\'s hardware timer from DShot mode (bidirectional capture/compare) to standard PWM mode (output only). Servos can\'t use the bidirectional timer configuration that motors require. NONE resets the timer to its default state before servo assignment.'
          ]
        }
      ]
    }
  },
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
          title: 'COMPLETE BUILD SPECIFICATION - Every Component',
          content: `**This is the EXACT build for maximum 10" hover time:**

═══════════════════════════════════════════════════════
FRAME SELECTION
═══════════════════════════════════════════════════════

**Recommended Frames:**
• iFlight Chimera10 LR (purpose-built 10" long range)
• HGLRC Rekon10 LR frame
• Flywoo Explorer LR 4 (modified for 10")
• Custom carbon 10" X-frame

**Frame Specifications:**
• Wheelbase: 380-420mm motor-to-motor
• Material: 3K carbon fiber (2-3mm arms)
• Weight target: 100-130g max
• Arm width: Minimum 16mm for motor mounting

**Why These Frames:**
• Long arms for 10" prop clearance
• Dead-cat or true-X geometry for efficiency
• Battery mounting for large Li-ion pack
• GPS/antenna mounting points

═══════════════════════════════════════════════════════
MOTORS - THE MOST CRITICAL CHOICE
═══════════════════════════════════════════════════════

**Primary Recommendation: 2812 900-1100KV**

**Specific Motor Options (Best to Good):**

1. **T-Motor F90 2806.5 1300KV** - Premium choice
   • Weight: 70g
   • Max thrust: 1800g
   • Peak efficiency: 12g/W
   • Price: $35-40 each

2. **BrotherHobby Tornado 2812 900KV** - Efficiency king
   • Weight: 78g
   • Max thrust: 1600g
   • Peak efficiency: 14g/W
   • Price: $25-30 each

3. **Emax ECO II 2807 1300KV** - Budget friendly
   • Weight: 62g
   • Max thrust: 1500g
   • Peak efficiency: 11g/W
   • Price: $15-20 each

4. **T-Motor Velox V2 2812 900KV** - Long range specialist
   • Weight: 76g
   • Max thrust: 1700g
   • Peak efficiency: 13g/W
   • Price: $30-35 each

**Motor KV Selection Logic:**
• 900-1100KV on 6S = 22,680-27,720 max RPM
• 10" props most efficient at 12,000-18,000 RPM
• This KV range lets you hover in efficiency sweet spot

**Why 2812 over 2207:**
• 28mm stator diameter vs 22mm = 27% wider
• 12mm height vs 7mm = 71% taller
• Result: MUCH more torque for swinging 10" props efficiently

═══════════════════════════════════════════════════════
PROPELLERS - DON'T OVERLOOK THIS
═══════════════════════════════════════════════════════

**Primary Recommendation: 10x3.8 BI-BLADE**

**Best Prop Options:**

1. **HQProp 10x3.8 MacroQuad** (Top choice)
   • Pitch: 3.8" (low - efficient)
   • Blades: 2
   • Weight: 11g each
   • Material: Reinforced nylon

2. **Gemfan 1038-2** (Budget alternative)
   • Pitch: 3.8"
   • Blades: 2
   • Weight: 12g each
   • Very efficient

3. **APC 10x3.8 Slow Fly**
   • Classic efficiency prop
   • Proven in long-range builds
   • Slightly heavier (14g)

**Why 3.8" Pitch (NOT 4.5" or higher):**
• At hover, you're at 25-35% throttle
• Low pitch = efficient at low throttle
• High pitch = wastes energy at low RPM
• 3.8" is the sweet spot for hover efficiency

**Why BI-BLADE (NOT tri-blade):**
• 2 blades = lowest drag
• Maximum efficiency per blade
• Quieter operation
• You don't need aggressive thrust - you need efficiency

═══════════════════════════════════════════════════════
BATTERY - THE SECRET TO FLIGHT TIME
═══════════════════════════════════════════════════════

**Primary Recommendation: 6S Li-ion 21700 pack**

**Specific Cell Choice:**

**BEST: Molicel P42A 21700**
• Capacity: 4200mAh per cell
• Continuous discharge: 45A
• Weight: 70g per cell
• 6S1P pack: 4200mAh, 420g

**ALTERNATIVE: Samsung 40T 21700**
• Capacity: 4000mAh per cell
• Continuous discharge: 35A
• Weight: 67g per cell
• 6S1P pack: 4000mAh, 402g

**ULTRA-ENDURANCE: Samsung 50E 21700**
• Capacity: 5000mAh per cell
• Continuous discharge: 10A (ONLY for gentle flying)
• Weight: 69g per cell
• 6S1P pack: 5000mAh, 414g

**Why Li-ion over LiPo:**

| Metric | 6S 1500mAh LiPo | 6S 4200mAh Li-ion |
|--------|-----------------|-------------------|
| Energy | 33Wh | 93Wh |
| Weight | 250g | 420g |
| Wh/kg | 132 | 221 |
| Flight time | 8-12 min | 30-45 min |

**Li-ion provides 2.8× flight time for 1.7× weight!**

**Pack Configuration:**
• Cells: 6S1P (6 in series, 1 parallel)
• Voltage: 25.2V fully charged
• Connector: XT60 (adequate for currents)
• BMS: Optional but recommended for cell protection

═══════════════════════════════════════════════════════
FLIGHT CONTROLLER & ESC STACK
═══════════════════════════════════════════════════════

**Flight Controller:**

**Recommended: F7 or H7 based FC**
• SpeedyBee F7 V3 (~$40, 8g)
• MAMBA F722 Mini (~$35, 7g)
• BetaFPV F722 AIO (includes ESC)

**Key FC Requirements:**
• F7 or H7 processor (F4 acceptable but F7 better)
• Betaflight 4.3+ support
• Barometer (for altitude hold if desired)
• Blackbox flash or SD slot
• Enough UARTs for GPS, receiver, VTX control

**ESC Selection:**

**Recommended: 4-in-1 35-50A ESC**
• SpeedyBee BLS 50A 4-in-1 (~$50, 14g)
• MAMBA F50 4-in-1 (~$45, 13g)
• T-Motor F45A 4-in-1 (~$60, 15g)

**ESC Requirements:**
• BLHeli_32 or AM32 firmware (for bidirectional DShot)
• 35A+ continuous rating
• 6S compatible
• Low weight

**AIO Option (Saves Weight):**
• SpeedyBee F7 AIO (~$70, combines FC+ESC)
• Saves ~5-8g and simplifies build

═══════════════════════════════════════════════════════
VIDEO SYSTEM
═══════════════════════════════════════════════════════

**For Maximum Efficiency, Choose Lightweight:**

**Option 1: Analog (Lightest)**
• Camera: Caddx Ratel 2 (8g)
• VTX: Rush Tank Mini 800mW (6g)
• Antenna: AXII Mini (3g)
• Total: ~17g
• Pros: Lightest, highest power available

**Option 2: HDZero (Balanced)**
• Camera: HDZero Nano Lite (8g)
• VTX: HDZero Race V3 (11g)
• Antenna: HDZero whip (2g)
• Total: ~21g
• Pros: HD quality, low latency

**Option 3: Walksnail (Premium)**
• Camera: Walksnail Avatar Nano (14g)
• VTX: Built into camera kit
• Antenna: Included (3g)
• Total: ~17g
• Pros: Great quality, competitive weight

═══════════════════════════════════════════════════════
RECEIVER
═══════════════════════════════════════════════════════

**Recommendation: ExpressLRS 2.4GHz**

**Best Options:**
• BetaFPV EP2 (1.5g)
• HappyModel EP1 (0.9g)
• RadioMaster RP1 (2g)

**Why ELRS:**
• Extremely lightweight
• Excellent range (10km+ easily)
• Low latency
• Open source, widely supported

═══════════════════════════════════════════════════════
GPS MODULE (RECOMMENDED)
═══════════════════════════════════════════════════════

**Recommendation: Include GPS for safety**

**Best Options:**
• BN-880 GPS/Compass (12g) - Budget
• Matek M10-5883 (10g) - Compact
• BetaFPV M10 GPS (8g) - Lightest

**Why GPS:**
• GPS Rescue - returns drone if signal lost
• Position hold for stability
• Speed/altitude telemetry
• Track flights

═══════════════════════════════════════════════════════
COMPLETE WEIGHT BREAKDOWN
═══════════════════════════════════════════════════════

| Component | Weight |
|-----------|--------|
| Frame | 120g |
| Motors (×4) | 280g |
| Props (×4) | 44g |
| FC | 8g |
| ESC | 14g |
| VTX System | 20g |
| Receiver | 2g |
| GPS | 10g |
| Wiring/Hardware | 25g |
| **Dry Weight** | **523g** |
| Battery (6S Li-ion) | 420g |
| **ALL-UP WEIGHT** | **943g** |

═══════════════════════════════════════════════════════
EXPECTED PERFORMANCE
═══════════════════════════════════════════════════════

**Hover Throttle:** 28-32% (in efficiency sweet spot)

**Flight Times:**
• Pure hover: 35-45 minutes
• Slow cruise (30-40 km/h): 30-40 minutes
• Active flying: 20-30 minutes

**Efficiency Metrics:**
• ~4-5 grams of thrust per watt at hover
• ~12-15 Wh consumed per 10 minutes hover
• Total battery energy: ~93 Wh (6S 4200mAh Li-ion)

**Maximum Range:**
• 15-25km with analog (800mW+)
• 10-15km with digital
• ELRS range not the limiting factor

═══════════════════════════════════════════════════════
BETAFLIGHT CONFIGURATION FOR EFFICIENCY
═══════════════════════════════════════════════════════

**Key Settings:**

set motor_poles = 14
set dshot_bidir = ON
set rpm_filter_harmonics = 3
set motor_kv = 900 (or your motor's KV)

**PID Tune for Efficiency (Smooth, not aggressive):**
• Lower P than freestyle builds
• Moderate I for stability
• Minimal D (less motor heat)
• Low Feed Forward

**Idle Settings:**
set dshot_idle_value = 450-550
(Lower idle = less energy wasted at hover)`
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
          a: 'Li-ion has significantly higher energy density (200-270 Wh/kg vs 150-200 Wh/kg for LiPo). For hover/cruise where current draw is moderate and consistent, Li-ion provides 2-3× the flight time per gram of battery weight. The lower discharge rate isn\'t a problem because efficient hover doesn\'t require high current bursts. Cells like Molicel P42A give 4200mAh at only 340g for a 6S pack.',
          distractors: [
            'Li-ion cells have a flatter voltage discharge curve, maintaining 3.7V nominal throughout 90% of capacity whereas LiPo drops from 4.2V to 3.3V rapidly. This consistent voltage means motors run at optimal efficiency longer. The lower C-rating actually reduces motor heat by limiting peak current.',
            'Li-ion\'s cylindrical 21700 form factor distributes heat more evenly than flat LiPo pouches, preventing thermal throttling during extended hovers. The steel casing also adds structural rigidity to the frame. Most importantly, Li-ion cells have built-in BMS circuits that eliminate the need for voltage monitoring.',
            'Li-ion provides higher instantaneous current than LiPo due to lower internal resistance at the cell level. While LiPo cells sag 0.3V under load, Li-ion only sags 0.1V. This reduced sag means more consistent throttle response and less PID compensation required during hover.'
          ]
        },
        {
          q: 'What motor KV and stator size would you choose for a 10" efficiency build?',
          a: '2806.5 or 2812 stator with 1100-1400KV. The large stator (28mm diameter) provides the torque needed to efficiently spin 10" props at low RPM. The low KV generates more torque per amp and keeps RPM in an efficient range. On 6S, a 1200KV motor peaks at ~30,000 RPM, allowing efficient operation at 15,000-20,000 RPM where props and motors are most efficient.',
          distractors: [
            '2207 or 2306 stator with 2400-2700KV on 4S. Smaller stators are more efficient because they have less iron losses and lower weight. Higher KV compensates by spinning faster, which creates the same thrust with smaller magnets. The 4S voltage keeps amp draw low for efficiency.',
            '2812 stator with 2000-2200KV on 4S. Large stators need high KV to overcome their rotational inertia. The 2000KV rating ensures quick throttle response while the 4S voltage limits power consumption. This combination achieves the optimal 35,000-40,000 RPM range for 10" props.',
            '2506 stator with 1800KV on 6S. Medium stators balance torque and weight while high KV ensures the motor can accelerate 10" props quickly enough for stable flight. The narrow 25mm stator reduces air resistance at high RPM and runs cooler than wider stators.'
          ]
        },
        {
          q: 'Why use low pitch props (10x3.8) instead of higher pitch (10x5)?',
          a: 'Lower pitch means a gentler blade angle, which is more efficient at low throttle where you\'ll spend most time hovering. High pitch props are designed for speed - they require more power to overcome the steeper blade angle. For hover, you want to move large volumes of air slowly and smoothly, which low pitch achieves with minimal energy. The result is dramatically better efficiency at cruise/hover speeds.',
          distractors: [
            'Lower pitch creates less gyroscopic effect on the frame, reducing vibration and motor wear. High pitch props generate strong precession forces that fight against the FC\'s PID corrections. The 10x3.8 also has a lower tip speed at the same RPM, staying below the turbulent threshold of 0.6 Mach.',
            'Lower pitch props are thinner at the blade root, reducing rotational mass by 15-20% compared to high-pitch versions. This means faster motor acceleration and better throttle response. The 10x3.8 can change RPM 2x faster than 10x5, which compensates for reduced thrust per revolution.',
            'Lower pitch works better with the harmonic resonance of 10" diameter blades. High-pitch 10x5 props create standing waves at hover RPM that cause acoustic fatigue in the carbon fiber. The 10x3.8 pitch keeps blade loading below the flutter threshold across the entire throttle range.'
          ]
        },
        {
          q: 'What\'s the target hover throttle percentage and why?',
          a: '25-35% throttle. Motors operate most efficiently at 50-70% of their maximum power output. By sizing components so hover occurs at 25-35% throttle, we position the hover operating point in the motor\'s efficiency sweet spot while still leaving 65-75% of available power for maneuvering, climbing, or fighting wind. This is the key to maximizing flight time.',
          distractors: [
            '45-55% throttle. ESCs have optimal MOSFET efficiency at mid-throttle where duty cycle switching losses are balanced. Below 40%, the PWM frequency causes excessive switching losses. Above 60%, conduction losses dominate. The mid-throttle sweet spot minimizes total electrical losses.',
            '15-25% throttle. Lower is always more efficient because motors draw current proportional to throttle squared. Hovering at 20% uses only 4% of maximum current, giving 25x the efficiency of full throttle. The remaining 80% throttle provides ample headroom for wind gusts.',
            '50-60% throttle. Props generate maximum thrust-per-watt at their designed operating point, which is around 60% RPM for most 10" props. Below 50%, blade stall begins as airspeed drops. Motors should be sized so hover occurs at the prop\'s peak efficiency point.'
          ]
        },
        {
          q: 'A 6S 4200mAh Li-ion pack provides 93Wh. If your 10" build consumes 150W at hover, calculate the theoretical maximum hover time.',
          a: '93Wh ÷ 150W = 0.62 hours = 37.2 minutes theoretical maximum. In practice, you should land at 20% battery remaining for safety, so usable is 74.4Wh ÷ 150W = 29.8 minutes. Additionally, takeoff/landing and maneuvering consume more power, so realistic hover time is 25-30 minutes.',
          distractors: [
            '4200mAh × 6S = 25,200mAh total capacity. At 150W hover draw, current is 150W ÷ 22.2V = 6.76A. Flight time = 25,200mAh ÷ 6760mA = 3.73 hours = 223 minutes. Landing at 80% depth of discharge gives 178 minutes of usable hover time.',
            '93Wh × 0.85 (motor efficiency) × 0.92 (ESC efficiency) = 72.7Wh delivered to props. At 150W mechanical power: 72.7Wh ÷ 150W = 0.48 hours = 29.1 minutes. Account for 15% battery sag margin: 24.7 minutes realistic hover.',
            '150W ÷ 22.2V nominal = 6.76A continuous draw. 4200mAh ÷ 6.76A = 0.62A-hours at C/0.16 rate. Li-ion has 95% capacity available at this low discharge rate: 0.62 × 0.95 = 0.59 hours = 35.4 minutes usable.'
          ]
        },
        {
          q: 'Compare the energy density (Wh/kg) of a Samsung 40T 21700 Li-ion cell versus a typical racing LiPo cell. Why does this matter for long-range builds?',
          a: 'Samsung 40T: 4000mAh × 3.6V nominal = 14.4Wh per 67g cell = 215 Wh/kg. Racing LiPo: Typical 1300mAh 6S at 230g = 28.9Wh at 230g = 126 Wh/kg. Li-ion has 70% higher energy density. For long-range, this means 70% more flight time per gram of battery weight, which is why Li-ion dominates efficiency builds despite lower discharge rates.',
          distractors: [
            'Samsung 40T: 4000mAh at 4.2V max = 16.8Wh per cell × 35A rating = 588 W/kg power density. Racing LiPo: 1300mAh at 100C = 130A × 4.2V = 546W per cell = 2,373 W/kg. LiPo has 4× higher power density but the 40T\'s higher voltage under load gives 15% more usable energy.',
            'Samsung 40T: 67g × 3.6V × 35A = 8.4 kW/kg theoretical. Racing LiPo: 38g per cell × 4.2V × 50A = 8.0 kW/kg theoretical. They\'re nearly equal, but Li-ion\'s flat discharge curve maintains that power for 3× longer. The crossover point occurs at 45% state of charge.',
            'Samsung 40T: 4000mAh ÷ 67g = 59.7 mAh/g capacity density. Racing LiPo: 1300mAh ÷ 38g = 34.2 mAh/g capacity density. Li-ion stores 74% more milliamp-hours per gram. However, LiPo voltage is 16% higher (4.2V vs 3.6V), so actual energy difference is only 45% after voltage correction.'
          ]
        },
        {
          q: 'Explain why a 10x3.8 prop is more efficient at hover than a 10x5 prop on the same motor.',
          a: 'At hover, you\'re at 25-35% throttle where low RPM dominates. Low-pitch props (3.8") have a gentler blade angle optimized for efficiency at low RPM - they move more air per watt at slow speeds. High-pitch (5") props are optimized for high-speed flight where they "bite" more air per revolution. At low throttle, high-pitch props are fighting their own steep blade angle inefficiently, wasting energy as turbulence rather than lift.',
          distractors: [
            'The 10x3.8 has a thinner airfoil cross-section that reduces drag coefficient by 23% compared to the 10x5. This reduced drag means less motor torque required. Additionally, the 3.8" pitch produces less reactive torque, reducing yaw authority demands and allowing lower idle speeds without toilet-bowl effect.',
            'At hover the 10x3.8 operates closer to its resonant frequency, where blade elasticity amplifies thrust by 8-12%. The 10x5 pitch shifts the resonant point to higher RPM where motor efficiency drops. This acoustic coupling effect is why matching prop pitch to motor KV matters for efficiency.',
            'The 10x3.8 has 18% less blade area than the 10x5, which means less induced drag from tip vortices. Smaller blade area also reduces gyroscopic precession forces that fight PID corrections. The motor can maintain hover with 15% less current due to reduced rotational inertia.'
          ]
        },
        {
          q: 'Your 10" hover build weighs 950g AUW and hovers at 40% throttle. Is this good or bad, and what would you change?',
          a: 'Bad - 40% hover throttle is too high, outside the 25-35% optimal range. The motors are working harder than necessary, reducing efficiency. Solutions: 1) Reduce weight (lighter components, smaller battery if acceptable), 2) Use larger/more efficient props if frame allows, 3) Switch to lower KV motors for more torque at lower RPM, 4) Use higher capacity Li-ion cells that provide more total energy despite slight weight increase.',
          distractors: [
            'Good - 40% hover throttle is optimal because it provides equal headroom above and below hover for maneuvering. Being centered in the throttle range gives symmetric control authority. Changes would be minor tuning: increase D-term by 10% to handle the heavier weight and reduce feed-forward for smoother response.',
            'Borderline acceptable - 40% is at the upper limit of efficiency but still usable. The main issue is thermal management, not efficiency. Solutions: 1) Add motor cooling fins, 2) Reduce PID values to minimize motor corrections, 3) Use tri-blade props which run cooler than bi-blades at the same thrust.',
            'Good - 40% throttle leaves 60% headroom for climbing and wind resistance, which is ideal for long-range missions. Lower hover throttle would mean undersized motors that struggle in gusty conditions. The only change would be switching to higher C-rating batteries to handle the sustained 40% current draw.'
          ]
        },
        {
          q: 'Your 10" hover build only achieves 15 minutes instead of the expected 35. Walk through your troubleshooting process.',
          a: 'Systematic troubleshooting: 1) Check AUW - extra weight increases hover power dramatically (10g = ~1% more power). 2) Verify hover throttle in blackbox - if above 35%, motors aren\'t in efficiency sweet spot. 3) Battery health - degraded cells have lower actual capacity than rated. 4) PID tune - aggressive PIDs (especially high D) waste energy on constant corrections. 5) Motor/prop mismatch - wrong KV or pitch wastes energy. 6) Mechanical issues - bent props, tight bearings, unbalanced motors create parasitic drag. 7) Wind conditions - even light wind dramatically increases power consumption vs calm indoor hover. 8) Check if any motors are running significantly hotter than others (indicates mechanical or electrical issue).',
          distractors: [
            'The most likely cause is ESC timing set too high, causing motor desync at low throttle. Reset ESC timing to 15° and recalibrate. Also check that motor direction is correct - reversed motors lose 30% efficiency. Finally, verify prop direction (leading edge forward) and balance all props on a balancer.',
            'Check if GPS rescue mode is enabled, as it constantly adjusts position and altitude consuming extra power. Disable all autonomous features for pure hover testing. Also verify that OSD refresh rate isn\'t set to 60Hz (use 30Hz to save FC power) and disable blackbox logging which draws 100mA from the FC.',
            'The problem is almost certainly battery voltage sag. Li-ion cells sag more than LiPo under load, and the FC cuts power early to protect cells. Use LiHV (high-voltage) Li-ion cells that start at 4.35V instead of 4.2V, giving 8% more energy. Also, discharge the pack to only 20% instead of 30% to access more capacity.'
          ]
        },
        {
          q: 'Could you use a LiPo battery instead of Li-ion for a 10" hover build? What would change?',
          a: 'Yes, but flight time drops significantly. A comparable 6S 1500mAh LiPo weighs ~250g with 33Wh energy vs 6S 4200mAh Li-ion at ~420g with 93Wh energy. Despite Li-ion being 170g heavier, it has 2.8x more energy. LiPo advantage: higher discharge rate for aggressive maneuvers and lighter weight if you need short but powerful flights. LiPo disadvantage: much lower energy density (126 Wh/kg vs 221 Wh/kg). You\'d only choose LiPo if you need both hover AND aggressive maneuvering capability, accepting roughly 40-50% of the Li-ion hover time.',
          distractors: [
            'No, LiPo is not recommended for 10" builds because the high discharge rates create voltage spikes that damage the larger motors\' windings. Li-ion\'s current limiting protects the motors from overcurrent. If you must use LiPo, add inline resistors to limit current flow to motor-safe levels.',
            'LiPo would actually provide longer hover time due to its flatter voltage curve. Li-ion drops from 4.2V to 3.0V during discharge while LiPo maintains 3.7V consistently. The more consistent voltage means more efficient motor operation. Li-ion is preferred only for cost reasons, not performance.',
            'You could use LiPo but would need to change to higher KV motors to compensate for LiPo\'s lower voltage under load. LiPo sags to 3.3V/cell under hover load (19.8V total) while Li-ion maintains 3.6V (21.6V). The 1.8V difference requires ~10% higher KV to maintain the same RPM and thrust.'
          ]
        },
        {
          q: 'Why specifically bi-blade props over tri-blade for a hover-focused 10" build?',
          a: 'At hover, you need steady, efficient lift - not agility. Bi-blade advantages: 1) Each blade operates in cleaner air with less wake interference from the other blade, maximizing efficiency. 2) Less total blade drag means lower current draw at the same thrust. 3) Quieter operation from reduced blade interaction. 4) The efficiency advantage of 2-blade over 3-blade is roughly 15-20% at hover throttle levels. Tri-blade makes sense when you need more thrust or agility (freestyle, racing), but for pure hover endurance, that extra blade just wastes energy. The math: 3-blade produces ~20% more thrust but draws ~25% more current - a net loss for efficiency.',
          distractors: [
            'Bi-blade props are preferred because 3-blade props create asymmetric vibration patterns on 10" builds due to the odd blade count. The vibration causes gyro noise that forces higher filtering, adding latency. Two blades create symmetric forces that cancel out, resulting in cleaner gyro data and better PID performance.',
            'The choice is purely about weight. Each extra blade adds 5-8g, and with 4 props that\'s 20-32g of extra rotating mass. The motor must accelerate this extra mass during every PID correction, wasting energy. The thrust advantage of 3 blades is irrelevant because hover requires constant thrust, not thrust changes.',
            'Bi-blade is chosen because 10" tri-blade props are not widely available from reputable manufacturers. The market focuses on bi-blade for 10" since that\'s what long-range builders use. Tri-blade would actually be slightly more efficient due to reduced tip speed per blade, but supply constraints make bi-blade the practical choice.'
          ]
        }
      ]
    }
  },
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
          a: '5.1-inch diameter with 4.66-inch pitch, typically a 3-blade prop. This means the prop is 5.1 inches across, and would theoretically travel forward 4.66 inches per complete rotation through a solid medium. It\'s an aggressive freestyle prop - the slightly larger diameter and medium-high pitch give good thrust and speed.',
          distractors: [
            '514mm blade length with 66° blade angle at the hub. The first three digits represent total blade span in millimeters, and the last two digits indicate the attack angle in degrees. A steeper 66° angle provides more aggressive bite than the standard 45° racing props.',
            '5 blades, 14mm chord width, 66% thrust efficiency rating. This manufacturer naming convention indicates blade count first, then average chord width in millimeters, followed by an efficiency metric. The 66% rating means it produces 66% of theoretical thrust.',
            '5.14" pitch with 66mm² total blade area per blade. The number represents pitch to two decimal places, with the blade area suffix. The 66mm² area falls between narrow racing props (50mm²) and wide freestyle props (80mm²).'
          ]
        },
        {
          q: 'Why would you choose a 2-blade prop over a 3-blade?',
          a: '2-blade props are more aerodynamically efficient, generating more thrust per watt of power consumed. They\'re also quieter due to less blade interaction and tip vortex noise. The trade-off is lower total thrust and slightly less responsive feel. They\'re ideal for long-range and efficiency builds where flight time matters more than aggressive performance.',
          distractors: [
            '2-blade props have lower rotational inertia, allowing faster RPM changes and more responsive throttle. This makes them better for aggressive maneuvers like snap rolls and quick stops. The reduced blade count also means less stress on motor bearings, extending motor life by 30-40%.',
            '2-blade props are stronger because the blade roots are thicker where they connect to the hub. With only 2 mounting points instead of 3, each blade base can be 50% wider. This makes them crash-resistant and preferred for beginners learning acro.',
            '2-blade props create less torque differential between motors, reducing the need for PID tuning. Three blades cause asymmetric thrust during rotation, which requires higher I-term to compensate. Two blades produce cleaner thrust vectors that match the FC\'s mathematical model.'
          ]
        },
        {
          q: 'How does pitch affect flight characteristics?',
          a: 'Higher pitch means a more aggressive blade angle - the prop "bites" more air per rotation, like a steeper screw thread. This provides more speed and thrust but draws significantly more current (exponentially, not linearly). Lower pitch is smoother, more efficient at hover, but has a lower top speed. Think of it like gear ratios in a car - low pitch is like a lower gear (more torque/control), high pitch is like a higher gear (more speed).',
          distractors: [
            'Higher pitch increases the resonant frequency of the blade, making the prop stiffer and more resistant to flex. This reduces the "blade flap" effect that causes vibration. Lower pitch props are more flexible and absorb motor vibrations, making them quieter but less efficient at high throttle.',
            'Pitch controls the blade\'s lift-to-drag ratio by changing the airfoil camber. Higher pitch numbers indicate more curved blade profiles that generate lift at lower angles of attack. Lower pitch is flatter, requiring higher RPM to achieve the same lift, which explains the efficiency difference.',
            'Pitch determines the prop\'s advance ratio - the relationship between forward speed and rotational speed. Higher pitch props slip less in moving air, making them more efficient at high speeds. Lower pitch props have more slip, wasting energy as the blades cut through air they\'ve already moved.'
          ]
        },
        {
          q: 'What prop would you recommend for cinematic flying and why?',
          a: 'A medium-low pitch 3 or 4-blade prop, like 5x4.0x3 or 5x4.3x4. Lower pitch provides smooth, predictable throttle response without sudden jolts - important for stable footage. 3-4 blades provide good authority and control at slow speeds for precise movements. You want to avoid high-pitch racing props that are twitchy and aggressive. The goal is silky smooth, controllable flight.',
          distractors: [
            'High-pitch 2-blade props like 5x5.5x2 for maximum smoothness. Fewer blades eliminate the vibration harmonics that cause rolling shutter jello. The high pitch allows lower motor RPM at any given thrust, reducing motor noise that gets picked up by onboard microphones. Two blades also have symmetric inertia for balanced yaw.',
            'Wide-chord 5-blade props like 5x4.5x5 for gyroscopic stabilization. More blades create a stronger gyroscopic effect that naturally dampens small perturbations. The wide chord provides thrust authority even at the micro-corrections needed for smooth footage. Five blades also filter out prop wash turbulence.',
            'Narrow racing props like 5x4.8x3 with bullnose tips. The reduced blade area means less thrust variation from air turbulence, creating steadier lift. Bullnose tips are stiffer, reducing blade flex that causes micro-vibrations. Racing props also have tighter manufacturing tolerances for better balance.'
          ]
        },
        {
          q: 'A 5" prop has 44% less disc area than a 6" prop. How does this affect hover efficiency and why?',
          a: 'Disc area affects how much air the prop can move per rotation. With 44% less area, the 5" prop must spin faster to generate the same thrust, moving air at higher velocity. Higher air velocity = more energy wasted as turbulence (kinetic energy scales with velocity squared). The 6" prop moves more air slowly, which is fundamentally more efficient for hover. This is why larger props at lower RPM always beat smaller props at higher RPM for efficiency.',
          distractors: [
            'The 44% smaller disc area means 44% less thrust per rotation, requiring proportionally higher motor KV to compensate. Higher KV motors have thinner windings that are less efficient due to copper resistance losses. The 6" prop can use lower KV motors with thicker windings that waste less energy as heat.',
            'Smaller disc area creates higher disc loading (thrust ÷ area), which improves efficiency in forward flight but hurts hover. At hover the 5" prop induces more downwash velocity, creating ground effect interference that the FC must fight with higher I-term. The 6" prop\'s lower disc loading reduces this recirculation.',
            'The 44% area reduction means 44% less blade surface for generating lift. To compensate, 5" props use higher camber airfoils that create more lift per unit area but also more drag. The 6" prop can use efficient flat-bottom airfoils since it has sufficient area. This airfoil difference accounts for most of the efficiency gap.'
          ]
        },
        {
          q: 'You switch from 5x4.3x3 props to 5x5.1x3 on the same motor. What changes should you expect in current draw, thrust, and flight characteristics?',
          a: 'Higher pitch (5.1 vs 4.3) means: 1) Current draw increases ~30-40% at same throttle (exponential relationship), 2) Maximum thrust increases ~15-20%, 3) Top speed increases significantly, 4) Throttle feels more aggressive/punchy, 5) Motors run hotter, 6) Flight time decreases noticeably, 7) Low-throttle control becomes twitchier. The prop "bites" more air per revolution but requires exponentially more power to do so.',
          distractors: [
            'Higher pitch (5.1 vs 4.3): 1) Current draw stays similar because pitch doesn\'t affect motor loading significantly, 2) Thrust increases ~40% proportional to pitch ratio, 3) Motor RPM decreases because higher pitch generates more thrust per rotation, 4) Throttle feels softer/smoother since less RPM is needed, 5) Motors run cooler from lower RPM, 6) Flight time increases slightly due to lower RPM efficiency.',
            'Higher pitch (5.1 vs 4.3): 1) Current draw decreases ~15% because the prop works more efficiently at its designed speed, 2) Maximum thrust stays the same since diameter determines thrust ceiling, 3) Hover throttle increases to compensate for reduced low-speed lift, 4) Yaw authority improves from increased blade area, 5) PID tuning requires lower D-term due to faster prop response, 6) Motor timing should be increased to match.',
            'Higher pitch (5.1 vs 4.3): 1) Current draw increases linearly by 18.6% (5.1/4.3 ratio), 2) Thrust increases at hover but decreases at full throttle due to blade stall, 3) Top speed decreases because higher pitch props can\'t spin as fast, 4) RPM filtering needs recalibration for the new harmonic frequencies, 5) Feed-forward should be reduced by 20% to prevent overshoot.'
          ]
        },
        {
          q: 'Why would adding a 4th blade to a prop increase thrust by ~15% but reduce efficiency by ~10%?',
          a: 'Each blade generates lift but also creates drag and wake turbulence. The 4th blade adds thrust (more lifting surfaces) but operates in increasingly disturbed air from the other blades. Each additional blade has diminishing returns on thrust while adding constant drag. The blades also interact aerodynamically, creating tip vortices that waste energy. Two blades is most efficient because each blade operates in cleaner air.',
          distractors: [
            'The 4th blade adds 33% more lifting surface but reduces the angle of attack each blade can use before stall. With 4 blades sharing the same disc area, each blade must operate at a lower pitch angle to avoid interference. This lower effective pitch per blade reduces efficiency. The thrust gain comes from more blades, but efficiency drops from the compromised angles.',
            'Adding a 4th blade increases hub weight and complexity, which adds rotational inertia. The motor must work harder to change RPM, wasting energy during PID corrections. Additionally, 4-blade props have resonance frequencies that partially cancel each other, requiring the motor to maintain higher average current to overcome these standing waves.',
            'The 4th blade creates a thrust imbalance because 4 doesn\'t divide evenly into the quad\'s control axes. With 3 blades, each blade aligns with a control input (pitch, roll, yaw). A 4th blade creates cross-coupling that the FC must actively compensate for with higher P-term, wasting energy. The thrust gain is real but the control overhead reduces net efficiency.'
          ]
        },
        {
          q: 'Match the following props to their ideal use case and explain why: 7035-2, 51466-3, 5040-4, 3018-2',
          a: '7035-2 (7" diameter, 3.5" pitch, 2-blade): Long-range/efficiency - large diameter for efficient hover, low pitch for cruise, 2-blade for minimal drag. 51466-3 (5.1", 4.66" pitch, 3-blade): Aggressive freestyle - medium-high pitch for speed and punch, 3-blade for balanced thrust. 5040-4 (5", 4.0" pitch, 4-blade): Cinematic/heavy lift - low pitch for smooth control, 4-blade for authority carrying cameras. 3018-2 (3", 1.8" pitch, 2-blade): Toothpick/micro - small diameter for small frame, very low pitch for efficiency, 2-blade for weight savings.',
          distractors: [
            '7035-2: Indoor flying - the 2-blade design produces less noise for indoor environments, 70mm props fit whoop frames. 51466-3: Cinematic - the 3 blades provide smooth thrust transitions, 5.14" is the standard cinewhoop size. 5040-4: Racing - 4 blades maximize acceleration, 50mm pitch for speed. 3018-2: Long-range - smallest props use least energy, 30mm diameter is optimal for efficiency.',
            '7035-2: Racing - high pitch-to-diameter ratio (35/70=0.5) indicates speed optimization, 2 blades reduce drag at high speed. 51466-3: Long-range - mid-size props balance efficiency and control, 3 blades are most versatile. 5040-4: Freestyle - 4 blades give aggressive thrust for tricks, medium pitch for control. 3018-2: Cinematic - tiny props create minimal wind noise for clean audio recording.',
            '7035-2: Heavy lift - 70mm chord width provides maximum blade area for carrying payloads, 2 blades reduce torque requirements. 51466-3: Indoor proximity - the 5.14" diameter fits tight spaces with margin for error, 3 blades for control. 5040-4: Racing - 4 blades overcome prop wash in tight racing lines. 3018-2: FPV racing micro class - 30mm is regulation size, 1.8" pitch for quick acceleration.'
          ]
        },
        {
          q: 'How does propeller material affect flight performance? Compare carbon fiber, reinforced nylon, and polycarbonate.',
          a: 'Carbon fiber: Stiffest and most efficient - blade doesn\'t flex under load so all energy goes to thrust. Lightest per unit strength, but brittle and shatters on impact. Best for efficiency builds where crashes are rare. Reinforced nylon (glass-filled): Good balance of stiffness, durability, and cost. Flexes slightly but maintains shape - best all-around choice for most pilots. Polycarbonate: Most flexible and crash-durable, but flex loses efficiency at high RPM as blade deforms under load, wasting energy as vibration. For a 10" efficiency build, choose carbon or glass-nylon. For learning/crashing, polycarbonate saves money on replacements.',
          distractors: [
            'Carbon fiber props are heavier than nylon due to the resin matrix, but their superior stiffness compensates. Polycarbonate is actually the lightest material and most efficient, but breaks easily. Reinforced nylon is the heaviest option, chosen purely for crash resistance in beginner builds.',
            'All three materials perform identically in terms of efficiency and thrust - the differences are purely about durability and cost. Material choice is aesthetic preference for most pilots. Carbon fiber props are chosen for their look, not performance, since modern nylon composites match carbon in stiffness.',
            'Polycarbonate props are most efficient because their flexibility absorbs motor vibration, resulting in smoother thrust output. Carbon fiber transmits vibrations to the frame causing gyro noise. Reinforced nylon is a poor compromise that offers neither the vibration damping of PC nor the lightweight of carbon.'
          ]
        },
        {
          q: 'What is the difference between a bullnose tip and a standard rounded tip on a propeller?',
          a: 'Bullnose (blunt/cut) tips concentrate thrust at the blade tip, producing maximum thrust within a given diameter - they effectively act like a slightly larger prop. They draw more current and are louder due to aggressive tip vortices. Standard rounded tips reduce tip vortices, making them quieter and more efficient but generating less thrust at the same RPM. Bullnose is good for tight frames where you can\'t fit larger diameter props, or when you need maximum thrust from limited space. For efficiency builds, standard or rounded tips are preferred.',
          distractors: [
            'Bullnose tips are designed primarily for crash resistance - the blunt shape prevents blade tip damage during ground strikes. Standard tips break more easily on impact. The thrust and efficiency differences are negligible; the choice is purely about durability for pilots who frequently crash.',
            'Bullnose props generate identical thrust to standard tips but at lower RPM due to the increased blade area at the tip. This makes them more efficient overall because the motor works less for the same thrust. They are louder only because of the wider chord, not because of aerodynamic differences.',
            'Standard rounded tips are less efficient than bullnose because air slips off the tapered end, creating wasted downwash. Bullnose tips capture 15% more air per rotation with their wider surface. Standard tips are only used on racing props where the reduced weight from less material at the tip improves RPM response.'
          ]
        },
        {
          q: 'If you increase prop diameter by 1 inch but decrease pitch by 1 inch (e.g., switching from 5x4.5 to 6x3.5), what changes?',
          a: 'Major shift toward efficiency: 1) Larger diameter means 44% more disc area, moving more air at lower velocity - fundamentally more efficient for hover. 2) Lower pitch means less aggressive blade angle, reducing current draw at hover throttle. 3) Combined effect: much better hover efficiency but lower top speed. 4) Requires more motor torque (larger stator or lower KV) to swing the bigger prop. 5) Frame must accommodate the larger prop. This is exactly the trade-off between a racing setup (5x4.5) and a long-range setup (6x3.5) - sacrificing speed for endurance.',
          distractors: [
            'The effects cancel out. Larger diameter increases thrust while lower pitch decreases it proportionally. A 6x3.5 produces the same thrust as a 5x4.5 because the diameter-pitch product (6×3.5=21 vs 5×4.5=22.5) is nearly identical. The only real difference is the prop weighs more, slightly reducing efficiency.',
            'Increasing diameter while decreasing pitch creates dangerous resonance issues. The longer blade at lower pitch enters a flutter zone where the blade oscillates between its natural frequency and the motor frequency. This causes structural failure at mid-throttle. Props should maintain consistent diameter-to-pitch ratios within 15%.',
            'The larger diameter with lower pitch makes the drone less controllable because the lower pitch reduces authority during maneuvers. The prop can\'t "grip" the air during rolls and flips, making it sluggish and unresponsive. This combination should only be used on GPS-stabilized platforms where manual control isn\'t needed.'
          ]
        }
      ]
    }
  },
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
          a: 'RPM filtering uses real-time motor RPM from ESC telemetry to place notch filters exactly where motor noise occurs at any moment. Unlike static filters that must filter a wide frequency range (adding latency), RPM filters precisely target only actual noise as it moves with throttle changes. This provides better noise rejection with significantly less latency.',
          distractors: [
            'RPM filtering uses accelerometer data to detect frame vibrations and applies a fixed 250Hz lowpass filter to cut motor noise. Static filters are less precise because they only work at one frequency, while RPM filtering adapts to different frame resonances automatically.',
            'RPM filtering monitors ESC temperature to adjust filter cutoff frequencies proportionally. At higher temps, filters shift to lower frequencies because motor bearings create more low-frequency noise. This thermal compensation is what makes it superior to static filters.',
            'RPM filtering samples motor current draw at 32kHz and places bandpass filters around the highest current spikes. Static filters use fixed frequency bands, but RPM filtering calculates optimal center frequencies from current harmonics, reducing CPU load by 40%.'
          ]
        },
        {
          q: 'What are the hardware and firmware requirements?',
          a: 'ESCs must run firmware supporting telemetry: BLHeli_32 (native), AM32 (open-source), or Bluejay (free BLHeli_S replacement). Bidirectional DShot must be enabled in Betaflight. Motor pole count must be configured correctly (typically 14 for 22xx motors).',
          distractors: [
            'ESCs must run KISS firmware v2.0+ or BLHeli_S with the telemetry patch. Standard DShot600 is required (DShot300 lacks bandwidth). Motor KV rating must be entered in Betaflight so the FC can calculate RPM from throttle position.',
            'Any ESC firmware works with RPM filtering since it uses back-EMF sensing through the motor wires. Requires Betaflight 4.2+ with soft-serial enabled on a spare UART. Motor timing advance must be set to 26° for accurate frequency detection.',
            'ESCs need SimonK firmware with the rpm_telemetry fork or stock BLHeli. Requires a separate RPM sensor wire connected to each motor phase. FC must have a dedicated F7 processor for the FFT calculations that extract motor frequencies.'
          ]
        },
        {
          q: 'What are harmonics in RPM filtering?',
          a: 'Harmonics are integer multiples of the fundamental motor noise frequency. At 30,000 RPM, fundamental is 500Hz. Second harmonic is 1000Hz, third is 1500Hz. Motors generate noise at all these frequencies. RPM filtering typically targets the fundamental plus 2-3 harmonics for complete noise removal.',
          distractors: [
            'Harmonics are fractional sub-frequencies below the motor fundamental caused by mechanical imbalance. At 30,000 RPM (500Hz), the first harmonic is 250Hz, second is 125Hz. These sub-harmonics appear when props are damaged and RPM filtering targets the 3 strongest peaks automatically.',
            'Harmonics refer to the resonant frequencies of the carbon fiber frame that amplify motor vibrations. Each arm has its own harmonic based on length and thickness. RPM filtering calculates these from motor position and applies arm-specific notch filters at 1.5×, 2.5×, and 3.5× the fundamental.',
            'Harmonics are the phase differences between motors when they briefly sync up at certain throttle positions. At 30,000 RPM, motors create constructive interference at 500Hz, 750Hz, and 875Hz. RPM filtering uses phase cancellation between opposing motors to reduce these peaks.'
          ]
        },
        {
          q: 'A 14-pole motor reports 196,000 eRPM via bidirectional DShot. Calculate the actual RPM and the fundamental noise frequency.',
          a: 'For a 14-pole motor, pole pairs = 14/2 = 7. Actual RPM = eRPM ÷ pole pairs = 196,000 ÷ 7 = 28,000 RPM. Fundamental noise frequency = RPM ÷ 60 = 28,000 ÷ 60 = 466.7Hz. The 2nd harmonic would be 933Hz and 3rd harmonic 1400Hz. Setting motor_poles = 14 in Betaflight ensures correct calculation.',
          distractors: [
            'For a 14-pole motor, multiply eRPM by poles: 196,000 × 14 = 2,744,000 mechanical RPM. Fundamental noise = RPM × 60 = 164,640,000Hz, but this is divided by 1000 for practical filtering at 164.6kHz. Betaflight downsamples this to the audible range for filtering.',
            'For a 14-pole motor, actual RPM = eRPM ÷ 14 = 196,000 ÷ 14 = 14,000 RPM. Fundamental noise frequency = RPM × pole pairs = 14,000 × 7 = 98,000Hz. The motor_poles setting adjusts the notch Q factor proportionally to match motor construction.',
            'For a 14-pole motor, actual RPM equals eRPM directly since ESCs report true mechanical speed: 196,000 RPM. Fundamental frequency = RPM ÷ (60 × poles) = 196,000 ÷ 840 = 233.3Hz. The 2nd harmonic is 350Hz and 3rd is 466.7Hz. Motor_poles only affects the harmonic spacing calculation.'
          ]
        },
        {
          q: 'Explain the trade-off when adjusting rpm_filter_q from 500 to 700.',
          a: 'Higher Q (700) creates a narrower notch filter that removes less signal overall, reducing latency and preserving more wanted frequencies. However, if motor RPM fluctuates or the pole count setting is slightly off, the narrow notch might miss some noise. Lower Q (500) creates a wider notch that catches noise even with some RPM variation, but removes more wanted signal and adds latency. For well-tuned, smooth-running motors, higher Q is better.',
          distractors: [
            'Higher Q (700) creates a steeper rolloff slope that cuts more aggressively at the target frequency, providing 40dB attenuation vs 20dB at Q=500. The trade-off is increased CPU usage since steeper filters require more calculations. Lower Q is better for F4 boards, while F7 can handle Q=700.',
            'Higher Q (700) enables the filter to track faster RPM changes by sampling at 32kHz instead of 8kHz. This increases motor response accuracy but uses more ESC telemetry bandwidth. Lower Q (500) has slower tracking but works reliably with all ESC firmware versions including older BLHeli.',
            'Higher Q (700) sets the notch depth to -70dB attenuation, completely eliminating motor noise. Q=500 only attenuates by -50dB, leaving residual noise but preserving more phase margin. The trade-off is that Q=700 can cause motor sync issues if RPM drops below the filter minimum frequency.'
          ]
        },
        {
          q: 'Why does RPM filtering require BLHeli_32, AM32, or Bluejay firmware specifically?',
          a: 'These firmwares support bidirectional DShot protocol, which enables ESC-to-FC telemetry. Standard DShot is one-way (FC sends throttle commands to ESC). Bidirectional DShot adds a return channel where the ESC reports motor eRPM back to the FC in real-time. BLHeli_S (non-32) doesn\'t have this capability natively, though Bluejay is a free replacement that adds it. Without eRPM data, RPM filtering cannot know where to place the notch filters.',
          distractors: [
            'These firmwares have built-in FFT analyzers that process motor vibration locally on the ESC and send pre-calculated filter frequencies to the FC. Older firmware like BLHeli_S lacks the processing power for real-time FFT, so the FC would need to do all calculations, causing timing issues with the PID loop.',
            'These firmwares implement 48kHz PWM switching frequencies required for clean RPM detection. Standard BLHeli_S uses 24kHz PWM which aliases with motor frequencies. The higher switching rate allows the FC gyro to differentiate motor noise from PWM artifacts without additional filtering.',
            'These firmwares support synchronized commutation timing that generates consistent back-EMF pulses. Older BLHeli_S uses variable timing that creates irregular voltage spikes, making it impossible to extract accurate RPM from the motor phase wires. The FC needs clean timing signals to calculate frequency.'
          ]
        },
        {
          q: 'After enabling RPM filtering, what other filter settings can you typically relax, and why does this improve flight performance?',
          a: 'You can raise gyro lowpass cutoffs (e.g., from 150Hz to 200Hz+) and reduce dynamic notch aggressiveness because RPM filter is handling motor noise precisely. Higher lowpass cutoffs mean less phase delay (latency) in the control loop, making the quad feel more connected and responsive. You can also potentially increase D-term because the cleaner gyro signal has less noise for D to amplify. The result is better propwash handling and sharper stick feel with cooler motors.',
          distractors: [
            'You can lower gyro lowpass cutoffs (e.g., from 150Hz to 100Hz) and increase dynamic notch bandwidth because RPM filtering only works above 300Hz. Lower cutoffs ensure no motor noise leaks through the gaps. You can also reduce D-term by 20% since RPM filtering adds 2ms latency that D needs to compensate for.',
            'You can disable the D-term lowpass entirely and set gyro filtering to "OFF" since RPM filtering replaces all other filters. The FC uses the RPM data to apply one unified filter that handles everything. This frees up CPU cycles, allowing you to run 8kHz PID loops on F4 boards.',
            'You can increase anti-gravity gain and lower I-term because RPM filtering eliminates the high-frequency oscillation that I normally fights. Keeping I-term high with RPM filtering causes integral windup during throttle blips. The cleaner signal means feed-forward can be reduced by 30% as well.'
          ]
        },
        {
          q: 'What happens if you set motor_poles incorrectly in Betaflight?',
          a: 'The notch filters will be placed at wrong frequencies. motor_poles determines conversion from eRPM to actual RPM (eRPM / pole pairs). If poles are set too high, calculated RPM will be too low, placing filters below actual noise frequencies. If too low, filters sit above the noise. Motor noise passes through unfiltered, defeating the purpose entirely. Symptoms: vibration, hot motors, poor flight despite RPM filtering being "enabled." Always verify pole count from motor specs - typically 14 for 22xx motors, 12 for some smaller motors.',
          distractors: [
            'Incorrect motor_poles causes the ESC to send wrong throttle commands, making motors spin at incorrect speeds. The poles setting calibrates the ESC-to-motor communication protocol. Wrong values can cause motor desync, sudden stops, or runaway motors. Always match the setting to your specific ESC firmware version.',
            'Wrong motor_poles only affects the RPM readout in the OSD and blackbox logs - it doesn\'t change filter behavior. The filters work on raw eRPM data directly without using the poles conversion. The setting is cosmetic for logging accuracy. Incorrect values show wrong RPM numbers but filtering works normally.',
            'Setting motor_poles too high overloads the FC processor because it tries to generate more notch filters than needed. Each additional "pole" creates an extra filter instance. Setting 14 poles on a 12-pole motor creates 2 phantom filters that waste CPU cycles and can cause PID loop timing issues on F4 boards.'
          ]
        },
        {
          q: 'What is bidirectional DShot and why is it essential for RPM filtering?',
          a: 'Standard DShot is one-way: the FC sends throttle commands to the ESC. Bidirectional DShot adds a return channel where the ESC reports motor eRPM back to the FC after each command cycle. This real-time RPM data lets the FC calculate exact motor noise frequencies and place notch filters precisely. Without bidirectional DShot, the FC has no way to know actual motor RPM - it would have to guess from throttle position, which is wildly inaccurate due to varying loads, wind, prop size, and maneuvers.',
          distractors: [
            'Bidirectional DShot doubles the communication speed between FC and ESC, allowing 48kHz updates instead of 24kHz. The faster updates mean smoother motor control and less noise generation. RPM filtering needs the faster protocol because standard DShot cannot sample fast enough to detect motor frequencies above 400Hz.',
            'Bidirectional DShot sends motor commands simultaneously to all 4 ESCs in sync, rather than sequentially. This synchronized firing eliminates inter-motor interference that creates the noise RPM filtering targets. Without sync, the 4 motors create beat frequencies that move too fast for static filters to track.',
            'Bidirectional DShot uses error correction (CRC checksums) on motor commands that standard DShot lacks. The error correction prevents signal corruption that causes motor glitches. RPM filtering requires clean signals because glitches look like noise spikes that would cause the filter to misplace notch frequencies.'
          ]
        },
        {
          q: 'How would you verify that RPM filtering is actually working on your build?',
          a: '1) In Motors tab (props OFF!), spin motors to ~20% - you should see RPM values updating for each motor in real-time. If RPM shows 0, bidirectional DShot isn\'t working. 2) Check blackbox logs - compare gyro noise spectrum with RPM filter on vs off. You should see clean notches cut at motor frequencies. 3) In the Betaflight CLI, run "status" to verify RPM filter is active. 4) Physical test: the quad should feel noticeably smoother and motors should run cooler. 5) In the Configurator\'s gyro graph, noise at motor frequencies should be dramatically reduced.',
          distractors: [
            'RPM filtering is verified by checking the debug_mode = RPM_FILTER output in the OSD. The OSD displays a real-time frequency graph showing where notch filters are placed. If the graph shows flat lines, the filter isn\'t working. You can also verify by checking ESC temperature - RPM filtering reduces ESC heat by 30%.',
            'Run the self-test command "rpm_filter_test" in CLI. This spins each motor individually and verifies the filter tracks correctly. The test takes 30 seconds and outputs a pass/fail for each motor. If any motor fails, check wiring and ESC firmware. The self-test should be run after every firmware update.',
            'RPM filtering works automatically with no verification needed once dshot_bidir = ON. The only way it fails is if the ESC firmware is incompatible. There is no way to visualize or confirm it\'s working in real-time - you can only infer from improved flight characteristics and motor temperatures.'
          ]
        }
      ]
    }
  },
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
          a: 'P provides correction proportional to current error - bigger error means bigger correction. I accumulates error over time to eliminate persistent drift, like correcting for constant wind. D looks at how fast error is changing and dampens the response to prevent overshoot - it\'s predictive braking.',
          distractors: [
            'P sets the overall power level sent to motors. I controls the rate of change between different power levels. D provides dampening during idle to prevent motor stuttering at low throttle.',
            'P is the primary gain that should be set highest (typically 80-120). I is the secondary correction (40-60). D is the derivative dampening that should be lowest (10-20). The ratio P>I>D is always maintained.',
            'P handles roll/pitch corrections. I handles yaw corrections independently. D provides a time delay between gyro readings to smooth sensor noise. Each term handles a different axis or function.'
          ]
        },
        {
          q: 'Your motors are getting hot after tuning. What\'s likely wrong?',
          a: 'Most likely D-term is too high. D amplifies high-frequency signals including noise, causing constant small motor corrections. Solution: lower D value, improve filtering (especially RPM filtering), or check for mechanical vibration sources. Could also be P if accompanied by visible oscillation.',
          distractors: [
            'P-term is too high, causing the motors to overcorrect for every small attitude change. Reduce P by 20-30% and the motors will run significantly cooler without affecting flight characteristics.',
            'I-term accumulation is causing constant motor corrections to maintain position. Lower I-term or enable I-term relax feature. Hot motors during hover specifically indicates excessive I-term.',
            'Feed Forward is too aggressive, sending large motor commands directly from stick inputs. Reduce FF to 50-75 for cooler motor operation. FF bypasses the PID loop and can cause excessive motor work.'
          ]
        },
        {
          q: 'What causes propwash oscillation?',
          a: 'Propwash occurs when descending through turbulent air from your own props. P tries to correct the rapid attitude changes, but without enough D to dampen, it overshoots repeatedly. Fix: better P:D balance (often need more D), good filtering to allow adequate D, and D-Max settings to provide more damping during maneuvers.',
          distractors: [
            'Propwash is caused by I-term windup during descents. The accumulated I correction from climbing persists during descent, fighting against the new direction. Reducing I-term or lowering I-term limit eliminates propwash.',
            'Propwash oscillation is a filtering issue, not a PID issue. The gyro picks up turbulence as noise, which passes through inadequate filters and causes erratic motor commands. Lowering filter cutoffs fixes propwash.',
            'Propwash is caused by motor desync during rapid throttle changes in turbulent air. ESC timing settings and demag protection need adjustment. Propwash is primarily an ESC configuration problem, not PID tuning.'
          ]
        },
        {
          q: 'What is Feed Forward and when would you increase it?',
          a: 'Feed Forward adds motor output directly from stick movement without waiting for gyro feedback - it\'s immediate response. Increase FF for snappier, more connected stick feel (good for racing). Decrease for smoother, more cinematic flying. Too much causes overshoot at the end of moves.',
          distractors: [
            'Feed Forward pre-calculates the expected error before it occurs based on stick velocity, then adds correction to P-term. Increase FF when P alone isn\'t responding fast enough. It\'s essentially predictive P gain.',
            'Feed Forward sends a portion of the RC signal directly to motors bypassing the entire PID controller. Increase FF for more direct motor control when you want raw, unprocessed stick response. Max FF disables PID entirely.',
            'Feed Forward increases gyro sampling rate when stick movement is detected, providing faster feedback loop updates during maneuvers. Increase FF when you experience input lag on an underpowered flight controller.'
          ]
        },
        {
          q: 'A quad oscillates rapidly (high frequency buzz) during hover but flies fine during fast maneuvers. Is this more likely a P or D issue? Explain.',
          a: 'This is likely P too high. High-frequency oscillation at steady state (hover) is characteristic of excessive P gain - the controller is over-correcting small errors, causing rapid back-and-forth oscillation. D-related issues typically manifest as motor heat or oscillation during/after maneuvers, not at steady hover. The fact that it disappears during fast flying suggests P is marginal - fast movements mask the small error oscillations.',
          distractors: [
            'This is a D-term issue. D is meant to provide stability during hover, and insufficient D causes the oscillation you describe. The fact that it stops during maneuvers shows D-Max is working but base D is too low.',
            'This is an I-term issue. I-term builds up during steady hover causing oscillation, but resets during fast maneuvers. Lower I-term or increase anti-gravity gain to prevent hover oscillation.',
            'This is a filtering issue, not a PID issue. Static hover allows resonant frequencies to build up, which are masked by varying throttle during maneuvers. Lower the gyro lowpass filter cutoff to eliminate hover buzz.'
          ]
        },
        {
          q: 'You increase D from 35 to 45 and motors get significantly hotter. What\'s happening and what are two ways to fix it?',
          a: 'D-term calculates the rate of change of error, which amplifies high-frequency noise. Higher D means more amplification of gyro noise into motor commands, causing constant small corrections that generate heat. Fixes: 1) Improve filtering - enable RPM filter, lower gyro lowpass cutoffs to remove noise before D sees it. 2) Address mechanical noise sources - check for bent props, loose motor screws, soft-mounted FC if hard-mounted. Better filtering lets you run adequate D without heat.',
          distractors: [
            'Higher D causes motors to resist any rotation more strongly, requiring more current to overcome the dampening. Fix: 1) Lower motor timing in ESC settings to reduce resistance. 2) Increase motor idle percentage to overcome static friction at low throttle.',
            'D-term of 45 is above the recommended maximum of 40. The controller is entering a nonlinear region causing computational overflow. Fix: 1) Keep D below 40. 2) Use D-weight and D-Max instead of raw D gain for high-D tunes.',
            'The D-term increase is fighting against motor cogging, where discrete magnet positions create torque ripple. Fix: 1) Use sinusoidal ESC commutation mode. 2) Lower motor KV - high KV motors have more cogging that D amplifies.'
          ]
        },
        {
          q: 'Explain why the I-term can cause "bounce-back" at the end of quick flips or rolls.',
          a: 'During a quick maneuver, there\'s sustained error between setpoint and actual position. I-term accumulates this error over time, building up correction. When the maneuver ends and setpoint returns to neutral, this accumulated I-term is still present and pushes the quad past neutral, causing overshoot/bounce. Modern Betaflight uses "I-term relax" to reduce accumulation during fast moves. If bounce-back is excessive, I might be too high or I-term relax needs tuning.',
          distractors: [
            'Bounce-back is caused by motor momentum, not I-term. The spinning propellers act as gyroscopes that resist stopping. I-term relax helps by reducing motor power before the maneuver ends, allowing props to slow naturally.',
            'I-term bounce-back occurs because the gyro continues reporting rotation briefly after the maneuver ends due to sensor lag. Increasing I-term relax adds a delay that waits for accurate gyro readings before applying correction.',
            'Bounce-back is a Feed Forward issue. FF sends large commands during fast maneuvers that overshoot the endpoint. I-term relax reduces FF (not I) during maneuvers to prevent the overshoot you\'re describing.'
          ]
        },
        {
          q: 'Describe the symptoms and underlying cause of propwash oscillation, and explain why increasing D-term helps.',
          a: 'Propwash oscillation is a wobble/shake when descending through your own prop wash (turbulent air). P sees the rapid attitude disturbances and tries to correct, but overshoots without adequate damping. D provides that damping - it sees the rapid rate of change and applies counter-correction before P overshoots. Increasing D helps D "see" the correction earlier and brake the movement. The underlying cause is P fighting turbulence without enough predictive braking from D.',
          distractors: [
            'Propwash oscillation is caused by uneven prop wash hitting the FC\'s gyro at turbulent descent angles. Increasing D filters out the high-frequency vibration that propwash creates. D acts as a notch filter targeting propwash frequencies.',
            'Propwash is motor desync caused by turbulent airflow stalling individual motors momentarily. Increasing D provides more motor authority to overcome aerodynamic stalls. D essentially increases motor torque response during turbulence.',
            'Propwash occurs when descending faster than the FC can process gyro data. Increasing D adds a buffer/delay that smooths rapid corrections. Higher D means the FC waits longer between corrections, preventing overcorrection.'
          ]
        },
        {
          q: 'Your blackbox log shows the gyro trace is clean but motors are oscillating. What does this indicate about your tune?',
          a: 'If gyro is clean (no noise in the signal) but motors oscillate, P is likely too high. The PID controller is over-responding to even small errors. This is pure tuning issue, not a filtering issue. Reduce P gain until oscillation stops, then optionally increase D slightly for better damping. If gyro was noisy, you\'d suspect filtering; clean gyro with oscillation points directly to P gain.',
          distractors: [
            'Clean gyro with motor oscillation indicates D-term is too high. D amplifies motor commands without corresponding gyro noise, creating the oscillation. The clean gyro proves the oscillation source is D, not P or filtering.',
            'This indicates a motor timing or desync issue in the ESC, not a PID problem. The FC is outputting correct commands (clean gyro) but ESCs are responding incorrectly. Recalibrate ESC timing or update ESC firmware.',
            'Clean gyro with motor oscillation means the gyro soft mount is too soft, isolating the FC from airframe vibration while motors resonate on the frame. Reduce soft mount dampening or hard-mount the FC.'
          ]
        },
        {
          q: 'How does having RPM filtering enabled change your approach to PID tuning?',
          a: 'RPM filtering gives you a cleaner gyro signal, which unlocks more tuning headroom: 1) You can raise D-term higher without hot motors because noise that D would amplify is already removed. 2) Higher D means better propwash handling. 3) You can raise gyro lowpass cutoffs, reducing latency and making the quad feel more connected. 4) You can push P higher before oscillation appears because the cleaner signal has less noise to excite resonance. 5) Overall, RPM filtering lets you run a more aggressive tune with better flight characteristics and cooler motors. Without RPM filtering, you\'re limited by noise, not by the PID controller itself.',
          distractors: [
            'RPM filtering doesn\'t change PID tuning approach - it only affects filter settings. PIDs should be tuned identically regardless of RPM filtering status. The filtering runs independently of the PID loop and only cleans up the gyro signal for logging purposes. Tune PIDs first, then optimize filters separately.',
            'With RPM filtering enabled, you should lower all PID values by 20-30% because the filter introduces 5ms of additional latency. Higher PIDs would cause overshoot due to this delay. Specifically, reduce D by 30% since RPM filtering already provides damping that overlaps with D-term function.',
            'RPM filtering requires completely different PID values. Start from scratch with P=30, I=60, D=15 as the new baseline. The standard defaults assume no RPM filtering and are too aggressive when combined with it. Using default PIDs with RPM filtering causes a feedback loop between the filter and D-term.'
          ]
        },
        {
          q: 'You\'re tuning a new 10" build. The quad feels floaty and doesn\'t hold its angle well in wind. Which PID term do you adjust first and why?',
          a: 'Increase P first. Floaty feel with poor angle hold indicates P is too low - the controller isn\'t correcting errors aggressively enough. On a 10" build, the larger props have more inertia, so the FC needs stronger corrections (higher P) to overcome that inertia and hold attitude. Start by increasing P in 5-point increments until the quad feels locked-in but before oscillation appears. If it still drifts in wind after P is adequate, increase I to eliminate steady-state error from constant wind force.',
          distractors: [
            'Increase D first. The floaty feeling is caused by overshoot at the end of corrections - the quad corrects past its target and wobbles. D dampens this overshoot, making the quad feel more planted. On 10" builds, the heavy props create momentum that D needs to brake. Start with D at 50+ for large builds.',
            'Increase Feed Forward first. Floaty feel means the motors aren\'t responding quickly enough to stick inputs. FF adds direct stick-to-motor response bypassing the PID loop entirely. On 10" builds, FF of 200+ is needed because the large prop inertia delays motor response. This gives instant, connected feel.',
            'Lower I first. On 10" builds, the default I-term is too aggressive and fights against attitude changes including your own inputs. The wind sensitivity is caused by I-term accumulating during gusts and then over-correcting. Reduce I to 40-50 for large builds to prevent this wind hunting behavior.'
          ]
        }
      ]
    }
  },
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
          a: 'Larger motors (within reason). A motor running at 50% throttle to hover is significantly more efficient than a smaller motor at 80% throttle for the same thrust. Heat losses scale with current squared (I²R), so the larger motor drawing less current wastes exponentially less energy. Trade-off is the extra weight.',
          distractors: [
            'Smaller motors are more efficient because they have less rotational mass and lower iron core losses. A 2205 motor converts more electrical energy to thrust per gram than a 2207 due to reduced eddy current heating in the smaller stator. The weight savings compound into lower current requirements.',
            'Motor size doesn\'t affect efficiency - only KV rating matters. A 2207 1900KV and a 2806 1900KV have identical efficiency curves because the KV determines the winding resistance and torque constant. Choose based on frame size constraints rather than efficiency considerations.',
            'Smaller motors are better because they reach operating temperature faster, entering their efficient range within seconds. Larger motors waste energy during warm-up and run cold, which increases winding resistance. The thermal mass of larger stators actually reduces efficiency in typical flight durations.'
          ]
        },
        {
          q: 'Why does lower KV mean more efficient for hover?',
          a: 'Lower KV motors produce more torque per amp drawn. For a given thrust requirement, they draw less current. Since heat loss = I²R, less current means exponentially less energy wasted as heat. Lower KV also means lower RPM, and larger props at lower RPM are aerodynamically more efficient than smaller props spinning fast.',
          distractors: [
            'Lower KV motors use thinner magnet wire with higher resistance, which naturally limits current flow and prevents waste. The higher winding resistance acts as a built-in current regulator. Additionally, lower KV means slower RPM which reduces bearing friction and windage losses inside the motor.',
            'Lower KV motors have stronger permanent magnets that do more work per rotation. The magnetic field strength is inversely proportional to KV, so a 1200KV motor has twice the magnetic force of a 2400KV motor. This stronger field generates more thrust without drawing additional current.',
            'Lower KV is more efficient because the ESC can use longer PWM pulses at the same throttle setting. Longer pulses have less switching loss compared to the rapid switching needed for high KV motors. The ESC operates more efficiently, which compounds with motor efficiency gains.'
          ]
        },
        {
          q: 'What throttle percentage should you target for hover?',
          a: '25-35%. This positions hover in the motor\'s peak efficiency zone (50-70% of max is most efficient, but hover at 25-35% leaves headroom for maneuvering). If you hover at 50%+ throttle, your motors are working too hard and you should consider larger motors or lighter build.',
          distractors: [
            '50-60%. Motors achieve peak efficiency at mid-throttle where the magnetic field is optimally utilized. Below 50%, the stator doesn\'t fully saturate and efficiency drops. Hovering below 40% wastes energy because the motor can\'t maintain stable commutation timing.',
            '10-20%. The lowest possible hover throttle is always most efficient because current draw is minimized. Target the absolute minimum throttle that maintains altitude. If hover is above 25%, the motors are oversized and should be replaced with smaller, lighter options.',
            '40-50%. This range balances motor efficiency with prop efficiency. Motors peak at 50% throttle while props peak around 70% RPM. The 40-50% range optimizes both simultaneously. Below 40%, prop efficiency drops faster than motor efficiency improves.'
          ]
        },
        {
          q: 'Heat loss in motor windings follows I²R. If you reduce current from 20A to 10A, by what factor does heat loss decrease?',
          a: 'Heat loss decreases by a factor of 4. At 20A: Heat = 20² × R = 400R. At 10A: Heat = 10² × R = 100R. The ratio is 400R/100R = 4. This demonstrates why running motors at partial load is so beneficial - halving current reduces heat waste by 75%, not 50%. This is the fundamental physics behind the efficiency gains of larger motors at lower throttle.',
          distractors: [
            'Heat loss decreases by a factor of 2. The I²R formula means current is squared, but efficiency is measured as a ratio so you take the square root. √(20²/10²) = √4 = 2. This is why halving current doubles efficiency - a linear relationship when properly calculated.',
            'Heat loss decreases by a factor of 10. The formula P = I²R applies at DC, but motors use AC switching. For switched PWM power, the effective formula is P = I × R × duty_cycle. At half current with half duty cycle: 10 × R × 0.5 = 5R vs 20 × R × 1.0 = 20R, giving a factor of 4×2.5=10.',
            'Heat loss decreases by a factor of √2 (approximately 1.4). In AC motors, the skin effect concentrates current on wire surfaces, modifying the effective resistance. The corrected formula for high-frequency switching is P = I^1.5 × R_eff. At 10A vs 20A: (10/20)^1.5 = 0.35, factor of ~2.8.'
          ]
        },
        {
          q: 'Compare a 2207 2400KV and 2207 1700KV motor. Both have the same stator. Which draws less current to produce 500g of thrust and why?',
          a: 'The 1700KV draws less current. Lower KV means more wire turns in the windings, which increases the torque constant (Kt). Higher Kt = more torque per amp. To produce 500g of thrust, the 1700KV motor needs less current because each amp produces more force. The trade-off is lower maximum RPM - the 1700KV cannot spin as fast as the 2400KV at the same voltage.',
          distractors: [
            'The 2400KV draws less current. Higher KV motors operate at higher RPM where prop efficiency is maximized. At 500g thrust, the 2400KV spins a prop at its optimal RPM while the 1700KV forces the prop into an inefficient low-RPM regime. The prop efficiency difference outweighs the motor torque constant advantage.',
            'Both draw identical current. Thrust is determined by motor power (V × I), not KV. Since both are running from the same voltage and producing the same thrust, they consume the same power and therefore the same current. KV only affects RPM, not efficiency or current draw for a given thrust.',
            'The 2400KV draws less current. Higher KV motors have thicker wire with lower resistance, reducing I²R losses. At 500g thrust, the 2400KV motor\'s lower winding resistance means less voltage drop across the windings, leaving more voltage available for producing thrust efficiently.'
          ]
        },
        {
          q: 'A racing pilot chooses 2205 motors over 2207 despite 2207 being more efficient. Justify this decision.',
          a: 'For racing, the 2205\'s advantages outweigh efficiency: 1) Lighter weight (saves ~20-30g total) improves acceleration and agility. 2) Lower rotational inertia allows faster RPM changes for quicker direction changes. 3) Races are short (typically 2-3 minutes) so efficiency/flight time matters less. 4) Weight savings improve thrust-to-weight ratio. The 2207\'s efficiency advantage is less relevant when you\'re flying at high throttle for short periods rather than cruising for flight time.',
          distractors: [
            'The 2205 has a better torque-to-weight ratio than 2207 at racing throttle levels (80-100%). Efficiency curves cross over at high throttle - 2207 is only more efficient below 60% throttle. At racing throttle, 2205 produces more thrust per watt because its smaller stator reaches optimal magnetic saturation faster.',
            'The 2205\'s smaller diameter creates less aerodynamic drag on the motor bell, which matters at racing speeds of 100+ km/h. The 2mm diameter reduction eliminates ~5% parasitic drag. Additionally, the 2205 fits better in tight racing frame designs where prop-to-motor clearance is minimized.',
            'Racing regulations often limit motor size to 2205 class to keep competition fair. MultiGP and similar organizations set stator volume limits that 2207 exceeds. The pilot must use 2205 to remain legal, regardless of efficiency preferences. Larger motors would be disqualified.'
          ]
        },
        {
          q: 'Explain why a motor\'s efficiency peaks at 50-70% throttle rather than at 0% or 100%.',
          a: 'At 0% throttle, efficiency is 0% because no useful work is done. As throttle increases, efficiency rises because useful thrust output increases faster than losses. At 50-70%, the motor operates in its designed sweet spot - magnetic saturation is optimal, current is moderate (low I²R losses), and airflow provides adequate cooling. Above 70%, I²R losses increase exponentially with current, magnetic cores approach saturation (diminishing returns), and heat becomes harder to dissipate. Efficiency drops as more energy goes to heat rather than thrust.',
          distractors: [
            'Efficiency peaks at 50-70% because that\'s where the ESC\'s PWM duty cycle is most linear. At low throttle, PWM pulse gaps create current spikes during transitions. At high throttle, duty cycle approaches 100% where the ESC can\'t regulate properly. The mid-range provides the cleanest power delivery with minimal switching losses.',
            'The peak occurs because prop efficiency and motor efficiency have opposite curves. Motors are most efficient at 100% while props are most efficient at 0% RPM. The 50-70% range represents the mathematical intersection where combined system efficiency is maximized. Below this range, prop losses dominate; above it, motor losses dominate.',
            'Motor efficiency peaks at 50-70% due to bearing friction characteristics. Bearings have static friction at low RPM and dynamic friction at high RPM. The mid-range minimizes total friction loss. Additionally, the motor\'s internal fan provides optimal cooling airflow at these speeds, preventing thermal derating.'
          ]
        },
        {
          q: 'At what point does choosing a larger motor become counterproductive for efficiency?',
          a: 'When the weight penalty of larger motors exceeds the efficiency gain from lower throttle operation. Going from 2207 to 2812 adds ~180g across 4 motors, requiring significantly more thrust just to hover. If bigger motors push AUW so high that hover throttle INCREASES above 35% despite the more efficient motors, you\'ve gone too far. The sweet spot: choose the motor size where hover sits at 25-35% throttle for your total AUW including the motors\' own weight. For 5" builds, 2207 is the sweet spot. For 7", 2806.5. For 10", 2812. Going beyond those for each frame size hits diminishing returns.',
          distractors: [
            'Larger motors never become counterproductive for efficiency. The I²R relationship always favors bigger motors because heat losses scale with current squared. Even if weight increases, the exponential reduction in heat loss always exceeds the linear increase in thrust requirements. The only reason to use smaller motors is cost or frame compatibility.',
            'The tipping point occurs when motor diameter exceeds 20% of prop diameter. A 28mm stator on a 5" (127mm) prop creates aerodynamic interference between the motor bell and prop root. Keep stator diameter below 15% of prop diameter for optimal efficiency. This is why 2207 works on 5" but 2812 does not.',
            'Larger motors become counterproductive when they exceed the ESC\'s continuous current rating at hover. A 2812 motor draws 8-10A at idle due to the larger stator mass, which exceeds a 35A ESC\'s thermal capacity during extended hover. The ESC becomes the efficiency bottleneck, not the motor.'
          ]
        },
        {
          q: 'How would your motor selection strategy differ between a 5" racing build and a 10" endurance build?',
          a: 'Opposite philosophies. Racing 5": Prioritize low weight and fast response - choose 2205-2207 with high KV (1900-2400KV). Lighter motors with lower rotational inertia enable quicker direction changes. Races are 2-3 minutes so efficiency is irrelevant. Endurance 10": Prioritize efficiency and torque - choose 2806-2812 with low KV (900-1300KV). Heavier but massively more efficient motors that hover at 25-35% throttle. Pair with Li-ion battery and low-pitch bi-blade props. Racing builds waste energy for speed; endurance builds conserve energy for time. Completely different design goals drive completely different choices.',
          distractors: [
            'Both builds should use the same motor selection principles - choose the most efficient motor available. The only difference is prop size: 5" racing uses 2207 1700KV and 10" uses 2812 1700KV. Same KV, different stators matched to prop size. The approach is identical, only the scale changes.',
            'Racing 5": Use the largest possible motor (2306-2307) for maximum power, paired with highest KV (2600+) and aggressive props. Endurance 10": Use the smallest motor that can maintain hover (2207 at low KV) to minimize weight and maximize flight time. Racing goes big on motors, endurance goes small.',
            'The strategy is identical but inverted: racing builds hover at 70-80% throttle with undersized motors to maximize top speed, while endurance builds hover at 70-80% with oversized motors to maximize control authority in wind. Both target the same 70-80% hover throttle operating point for different reasons.'
          ]
        },
        {
          q: 'Explain how the I²R heat loss formula directly impacts your decision between a larger vs smaller motor for an efficiency build.',
          a: 'Heat loss (wasted energy) = I² × R. Current is SQUARED, so small reductions in current yield large efficiency gains. A larger motor produces the same thrust at lower current because it has more torque per amp (larger stator, lower KV). Example: if a smaller motor needs 15A to hover and a larger one needs 9A (same resistance), heat loss drops from 225R to 81R watts - a 64% reduction in wasted energy just from halving current by 40%. This is why "slightly oversized motors at partial throttle" is the golden rule for efficiency. The current squared relationship makes this effect dramatic.',
          distractors: [
            'The I²R formula shows that resistance (R) is the dominant factor, not current (I). Larger motors have more copper windings which means higher R. The increased resistance actually increases losses: a 2812 with 0.15Ω at 9A loses 12.15W, while a 2207 with 0.08Ω at 15A loses 18W. The 2812 wins only because the R difference is smaller than the I difference in this specific case.',
            'I²R applies to DC circuits, but motors use AC switching through the ESC. In PWM-driven motors, the actual loss formula is I × V_drop × duty_cycle, which is linear with current, not squared. The squared relationship only applies during motor startup. At steady hover, motor losses scale linearly with current draw.',
            'The I²R formula is misleading for motor selection because R changes with temperature. Larger motors run cooler (lower R) while smaller motors run hotter (higher R). The temperature-dependent resistance means the real-world efficiency gap between motor sizes is 3-5× larger than I²R alone would predict. Always use thermal modeling, not simple I²R calculations.'
          ]
        }
      ]
    }
  }
];

// Categories
export const CATEGORIES = [
  {
    id: 'company-knowledge',
    name: 'Company Knowledge',
    icon: '🎯',
    color: 'red',
    description: 'Neros.tech products, mission, interview prep'
  },
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

// Difficulty Levels
export const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: 'Beginner', color: 'green' },
  { id: 'intermediate', name: 'Intermediate', color: 'yellow' },
  { id: 'advanced', name: 'Advanced', color: 'red' }
];

// Helper function to get topic by ID
export const getTopicById = (id) => FPV_TOPICS.find(topic => topic.id === id);

// Additional Topics - Neros.tech and Betaflight Configurator
export const ADDITIONAL_TOPICS = [
  {
    id: 'neros-tech-company',
    title: 'Neros.tech - Defense Drone Company',
    icon: '🎯',
    category: 'company-knowledge',
    difficulty: 'intermediate',
    shortAnswer: 'Neros.tech is a defense drone company building FPV systems for military applications. Products include ARCHER FPV drone, ARCHER STRIKE, and ARCHER FIBER (fiber-optic control). HQ in El Segundo, CA with operations in DC, Kyiv, and London.',

    content: {
      overview: `Neros.tech is a defense-focused drone company that develops advanced FPV drone systems for military applications. Understanding the company's mission, products, technology focus, and market position is essential for anyone interviewing with them. They represent the cutting edge of applying FPV technology to real-world defense challenges.`,

      sections: [
        {
          title: 'Company Overview & Mission',
          content: `**Company Mission:**
Neros.tech builds drone systems for military and defense applications, focusing on making FPV technology reliable and effective for combat scenarios.

**Company History:**
• Founded to address critical needs in modern warfare
• Rapid growth driven by real-world battlefield requirements
• Series B funding: $75 million led by Sequoia Capital
• Expanding operations internationally

**Headquarters & Operations:**
• Main HQ: El Segundo, California (aerospace hub)
• Washington DC office (government/DoD relations)
• Kyiv, Ukraine office (battlefield proximity, testing)
• London, UK office (European operations)

**Why These Locations Matter:**
• El Segundo: Heart of aerospace industry, engineering talent
• DC: Essential for defense contracts and relationships
• Kyiv: Direct access to active combat zone for real-world testing
• London: European defense market expansion

**Company Culture:**
• Fast-paced, mission-driven
• Engineering-first approach
• Rapid iteration based on field feedback
• Serious about reliability - lives depend on their products`
        },
        {
          title: 'Product Line - ARCHER Series',
          content: `**ARCHER FPV Drone:**
The core FPV drone platform designed for military reconnaissance and strike missions.

**Key Characteristics:**
• Purpose-built for military use (not modified consumer drones)
• Ruggedized construction for harsh conditions
• Optimized for reliability over consumer features
• Designed for rapid deployment and field repair

**ARCHER STRIKE:**
Strike variant designed for offensive operations.

**Capabilities:**
• Payload delivery system
• Enhanced range and endurance
• Precision targeting systems
• Designed for one-way missions when required

**ARCHER FIBER:**
Revolutionary fiber-optic controlled drone system.

**Why Fiber-Optic Control:**
• Immune to RF jamming (critical in contested environments)
• Zero RF signature (undetectable by RF sensors)
• Unlimited bandwidth for HD video
• Extremely low latency (speed of light through fiber)
• Secure communication (can't be intercepted wirelessly)

**Fiber-Optic Technical Details:**
• Thin fiber spools out during flight
• Fiber is extremely lightweight
• Enables operation in GPS-denied, RF-jammed environments
• Game-changer for electronic warfare scenarios

**Why This Matters in Modern Combat:**
Electronic warfare has made RF-based drones vulnerable. ARCHER FIBER operates regardless of jamming, making it uniquely valuable in contested airspace.`
        },
        {
          title: 'Ground Control Systems',
          content: `**CROSSBOW Ground Station:**
Portable ground control system for ARCHER drones.

**Features:**
• Ruggedized tablet-based interface
• Intuitive controls for non-expert operators
• Real-time video feed with low latency
• Mission planning capabilities
• Designed for field conditions

**LONGBOW Ground Station:**
Extended range ground control system.

**Capabilities:**
• Higher power transmission
• Extended operational range
• Enhanced antenna systems
• Multi-drone coordination potential
• Vehicle or fixed-position mounting

**Why Ground Stations Matter:**
The pilot interface is as critical as the drone itself. Military operators need:
• Reliability in harsh conditions
• Intuitive operation under stress
• Clear video even in degraded conditions
• Quick setup and teardown
• Minimal training requirements`
        },
        {
          title: 'Technology Focus Areas',
          content: `**Core Engineering Pillars:**

**1. Flight Control:**
• Custom flight controller development
• Military-grade stabilization
• GPS-denied navigation capabilities
• Fail-safe systems for combat scenarios
• Integration with military systems

**2. Powertrain:**
• Motor and ESC optimization for military specs
• Extended flight time focus
• Reliability in extreme temperatures
• Rapid field replacement design

**3. Radio Systems:**
• Encrypted communication links
• Anti-jamming technology
• Frequency-hopping protocols
• Long-range transmission
• ARCHER FIBER alternative for jammed environments

**4. Software:**
• Custom firmware for military requirements
• Real-time video processing
• Autonomous flight modes
• Mission planning integration
• Fleet management capabilities

**What Makes Defense Drones Different from Consumer/Racing:**
• Reliability is life-or-death
• Must work in electronic warfare environments
• Ruggedization for combat conditions
• Integration with military command systems
• Strict security requirements
• Rapid repair/replacement in field
• Consistent performance in extreme temperatures`
        },
        {
          title: 'Interview Preparation - Company Questions',
          content: `**"Why do you want to work at Neros.tech?"**
Strong Answer Points:
• Passion for applying FPV technology to meaningful problems
• Interest in defense/military applications
• Desire to work on cutting-edge drone technology
• Attracted to mission-driven company culture
• Want to build products that matter

**"What do you know about our products?"**
Demonstrate knowledge of:
• ARCHER FPV - core reconnaissance/strike platform
• ARCHER STRIKE - offensive operations variant
• ARCHER FIBER - fiber-optic control (jam-proof)
• CROSSBOW/LONGBOW ground stations
• Why fiber-optic control matters in contested environments

**"How does defense drone development differ from consumer?"**
Key Differences:
• Reliability requirements (lives depend on it)
• Operation in electronic warfare environments
• Extreme temperature performance
• Field repairability
• Security and encryption requirements
• Integration with military systems
• Regulatory compliance (ITAR, etc.)

**"What unique skills do you bring?"**
Relevant FPV Experience:
• Building and tuning drones
• Betaflight configuration expertise
• Understanding of flight dynamics
• Video system knowledge (analog/digital trade-offs)
• Motor/prop selection for specific requirements
• Problem-solving under pressure
• Rapid prototyping skills`
        },
        {
          title: 'Market Context & Competition',
          content: `**Why Defense Drones Now:**
• Ukraine conflict proved FPV drones' military value
• Low-cost precision strike capability
• Asymmetric warfare advantage
• Intelligence gathering revolution
• Rapidly evolving battlefield requirements

**Competition Landscape:**
• Large defense contractors (slow, expensive)
• Other startups (various approaches)
• International competitors
• Neros.tech advantage: FPV expertise + defense focus

**What Neros.tech Does Differently:**
• Started from FPV community knowledge
• Rapid iteration based on field feedback
• Direct connection to active combat zones
• Focus on practical, deployable systems
• Not trying to build autonomous - embracing human pilots

**Investment & Growth:**
• $75M Series B from Sequoia Capital
• Significant investor confidence
• Rapid hiring and expansion
• Government contract pipeline
• International market expansion

**Future Directions:**
• Swarm capabilities
• Enhanced autonomous features
• New platform variants
• Expanded international presence
• Integration with broader military systems`
        }
      ],

      keyPoints: [
        'ARCHER FPV (recon), ARCHER STRIKE (offensive), ARCHER FIBER (fiber-optic jam-proof)',
        'CROSSBOW (portable) and LONGBOW (extended range) ground stations',
        'HQ El Segundo, CA + DC, Kyiv, London offices',
        '$75M Series B from Sequoia Capital',
        'Fiber-optic control is immune to RF jamming - critical for contested environments',
        'Four pillars: Flight Control, Powertrain, Radios, Software'
      ],

      interviewTips: [
        'Know all product names and what makes each unique (especially ARCHER FIBER)',
        'Understand WHY fiber-optic control matters (jamming immunity)',
        'Connect your FPV experience to their mission-critical requirements',
        'Show awareness of defense industry differences (reliability, security)',
        'Demonstrate passion for the mission, not just the technology'
      ],

      practiceQuestions: [
        {
          q: 'What is ARCHER FIBER and why is it significant?',
          a: 'ARCHER FIBER is a fiber-optic controlled drone where commands and video travel through a thin fiber cable instead of RF. This makes it completely immune to RF jamming and undetectable by RF sensors - critical in contested electronic warfare environments. It offers unlimited bandwidth, extremely low latency (speed of light), and secure communications that cannot be intercepted wirelessly. This is a game-changer for operating in GPS-denied, heavily jammed combat zones.',
          distractors: [
            'ARCHER FIBER uses carbon fiber construction throughout the airframe instead of standard materials. The all-carbon construction reduces radar cross-section by 90% and provides superior strength-to-weight ratio for military operations. This stealth feature makes it invisible to air defense systems.',
            'ARCHER FIBER is a high-capacity power distribution system using fiber-reinforced battery cables. The fiber insulation prevents electromagnetic interference with onboard electronics and allows higher current flow. This enables longer flight times through more efficient power delivery.',
            'ARCHER FIBER implements mesh networking where multiple drones connect via short-range fiber links in formation flight. Each drone acts as a relay node, extending communication range exponentially. This swarm architecture provides redundancy if any single drone is lost.'
          ]
        },
        {
          q: 'Why would Neros.tech have an office in Kyiv, Ukraine?',
          a: 'Kyiv provides direct access to an active combat zone where FPV drones are being used extensively. This enables real-world testing, rapid feedback from actual battlefield conditions, understanding of what operators truly need under stress, and iteration based on genuine combat requirements rather than theoretical scenarios. It demonstrates the company\'s commitment to building products that work in real conditions.',
          distractors: [
            'Ukraine has favorable corporate tax rates for defense companies (7% vs 21% US) and operates outside ITAR restrictions. Manufacturing in Kyiv allows export to international customers without US State Department approval. The cost savings fund additional R&D efforts at headquarters.',
            'The Ukrainian government provides subsidized rare earth materials and motors essential for drone production. Kyiv serves as the manufacturing hub while El Segundo handles design. This supply chain arrangement reduces production costs by 40% compared to US manufacturing.',
            'Kyiv hosts the world\'s largest FPV racing league, providing access to top pilots for testing drone agility and performance. The competitive pilots offer feedback that pushes performance limits beyond what military test pilots would achieve. This racing heritage improves the ARCHER series flight characteristics.'
          ]
        },
        {
          q: 'How does building drones for military differ from consumer FPV?',
          a: 'Military drones require: extreme reliability (lives depend on them), operation in electronic warfare/jamming environments, performance in extreme temperatures, field repairability with minimal tools, integration with military command systems, strict security and encryption, ITAR compliance, and consistent performance under stress. Consumer drones prioritize features and price; military drones prioritize reliability and capability in hostile conditions.',
          distractors: [
            'The main difference is payload capacity - military drones carry 5-10kg payloads while consumer FPV carries cameras under 100g. All other engineering aspects are similar. Military contracts simply require scaling up proven consumer designs with stronger motors and larger batteries.',
            'Military drones use classified proprietary motors and ESCs that achieve 95% efficiency compared to 75% for consumer components. The technology gap is primarily in powertrain components developed by defense contractors. Airframes, flight controllers, and software are largely identical.',
            'Military drones must exceed 100km range and 2-hour flight time minimums specified in DoD contracts. Consumer FPV optimizes for 5-minute flights. This range requirement is the primary engineering difference, requiring larger airframes and batteries rather than different design philosophies.'
          ]
        },
        {
          q: 'What are Neros.tech\'s four technology focus areas?',
          a: 'Flight Control (military-grade stabilization, GPS-denied navigation, fail-safes), Powertrain (motors, ESCs optimized for reliability and efficiency), Radio Systems (encrypted, anti-jamming, long-range, plus fiber-optic alternative), and Software (custom firmware, video processing, autonomous modes, mission planning). Each pillar addresses specific military requirements that consumer products don\'t need to meet.',
          distractors: [
            'The four areas are: Aerodynamics (stealth airframe design), Materials (radar-absorbing composites), Manufacturing (rapid production scaling), and Training (operator certification programs). These enable Neros.tech to deliver complete defense systems rather than just drone hardware.',
            'The four areas are: Visual Systems (thermal/night vision cameras), Weapons Integration (payload delivery mechanisms), AI Targeting (computer vision for target tracking), and Swarm Coordination (multi-drone operations). Flight control uses off-the-shelf Betaflight with minor modifications.',
            'The four areas are: Cybersecurity (protection against hacking), Counter-UAS (detecting enemy drones), Ground Support (maintenance equipment), and Logistics (supply chain management). These wrap around standard FPV drone technology to create a complete military solution.'
          ]
        },
        {
          q: 'Explain the technical advantages and limitations of ARCHER FIBER\'s fiber-optic control system.',
          a: 'Advantages: Complete RF jamming immunity (fiber is optical, not RF), zero RF signature (undetectable by spectrum analyzers), unlimited bandwidth (supports high-res video easily), extremely low latency (light speed through glass), secure communications (must physically tap the fiber to intercept), works in GPS-denied environments. Limitations: Range limited by fiber spool capacity, fiber can be cut or snagged on obstacles, adds weight of fiber spool, cannot be recovered if fiber breaks, one-way missions more complex for fiber management.',
          distractors: [
            'Advantages: Lower power consumption than RF (10% of typical radio draw), longer battery life enables 2-hour missions, fiber weighs less than batteries saved, higher video resolution (8K vs 1080p RF). Limitations: Requires specialized fiber-compatible cameras, limited to clear weather (humidity affects fiber), complex calibration for temperature changes, expensive fiber consumables ($50 per mission).',
            'Advantages: Bi-directional fiber allows remote firmware updates mid-flight, fiber serves as structural tether enabling vertical takeoff recovery, fiber tension sensors provide precise position data, backup power can be transmitted through fiber. Limitations: Fiber drag limits top speed to 40km/h, tether prevents evasive maneuvers, single fiber strand creates single point of failure, daylight degrades optical signal.',
            'Advantages: Fiber carries power to reduce onboard battery size, lighter drone improves maneuverability, ground station can have unlimited power, total system weight reduced 30%. Limitations: Power transmission losses over distance, fiber heating at high current, requires hybrid optical/copper cable, copper adds weight and defeats jamming immunity benefits.'
          ]
        },
        {
          q: 'Why might a company like Neros.tech choose to build custom flight controller firmware rather than using Betaflight?',
          a: 'Military requirements differ fundamentally: 1) Security - Betaflight is open-source, military needs proprietary encrypted firmware. 2) Reliability certification - military systems need formal verification and testing that open-source doesn\'t provide. 3) Integration - needs to interface with military command systems, targeting, and communication protocols. 4) Features - GPS-denied navigation, autonomous modes for combat scenarios, fail-safes specific to military operations. 5) ITAR compliance - export control regulations may require controlling the entire stack.',
          distractors: [
            'Betaflight licensing prohibits commercial use in defense products under its GPL terms. Companies must either pay Betaflight Foundation licensing fees ($2M/year) or develop their own firmware. Most startups choose custom development to avoid ongoing royalty payments and licensing audits.',
            'Betaflight\'s PID algorithm is optimized for acrobatic flight, not stable payload delivery. Military drones require different control mathematics focused on precision hovering and smooth camera movements. The fundamental control theory differs, making Betaflight unsuitable even with modifications.',
            'Betaflight doesn\'t support the specialized military-grade sensors (MIL-SPEC gyros, encrypted GPS receivers) required for defense contracts. These sensors use proprietary protocols that Betaflight developers won\'t implement due to classification restrictions. Custom firmware is the only option for sensor integration.'
          ]
        },
        {
          q: 'Compare CROSSBOW and LONGBOW ground control systems. When would you choose each?',
          a: 'CROSSBOW: Portable, tablet-based, designed for infantry use in the field. Choose when mobility is essential, operations are at shorter range, and operators need to move quickly. LONGBOW: Extended range, likely vehicle-mounted or fixed position, higher power transmission, enhanced antenna systems. Choose for longer range operations, fixed observation posts, or when coordinating multiple drones. The trade-off is mobility vs capability - CROSSBOW goes where you go, LONGBOW extends your reach.',
          distractors: [
            'CROSSBOW: Designed for ARCHER FPV drone control with latency under 5ms for precision piloting. LONGBOW: Designed for ARCHER STRIKE missions requiring autonomous waypoint navigation over extended distances. CROSSBOW is for manual FPV control; LONGBOW is for programmed autonomous missions where pilot latency doesn\'t matter.',
            'CROSSBOW: Uses standard ELRS protocol compatible with commercial receivers. LONGBOW: Uses proprietary military-only frequency bands requiring special FCC licensing. CROSSBOW works with commercial drones for training; LONGBOW only pairs with ARCHER systems for classified operations.',
            'CROSSBOW: Single operator system for controlling one drone at a time with direct video feed. LONGBOW: Command center system for coordinating up to 50 drones simultaneously with AI-assisted target distribution. Choose CROSSBOW for reconnaissance; choose LONGBOW for swarm strike operations.'
          ]
        },
        {
          q: 'What ITAR compliance considerations apply to a company like Neros.tech?',
          a: 'ITAR (International Traffic in Arms Regulations) controls export of defense-related technology. Considerations include: 1) Cannot share controlled technical data with foreign nationals without license. 2) Must register with State Department as defense manufacturer. 3) Export licenses required for selling products or sharing technology internationally. 4) Employees with foreign citizenship may have restricted access. 5) Ukraine office operations require specific licenses. 6) Even hiring decisions are affected - certain roles may require US citizenship. Violations carry severe criminal penalties.',
          distractors: [
            'ITAR requires all defense drones to be manufactured in the USA using only domestic components. Foreign-sourced motors, ESCs, or batteries are prohibited. Companies must certify complete supply chain US origin. The Ukraine office can only handle sales and support, not engineering, due to manufacturing origin requirements.',
            'ITAR applies only to products containing classified technology or exceeding specific performance thresholds (range >50km, payload >5kg, speed >200km/h). Standard FPV drones fall below these thresholds and are unregulated. ITAR compliance becomes relevant only when adding military-specific features like encrypted communications.',
            'ITAR requires annual third-party audits of all defense technology companies to verify compliance. Companies must implement biometric access controls, maintain classified document vaults, and employ dedicated compliance officers. The regulatory burden is primarily procedural rather than restricting hiring or technology sharing.'
          ]
        }
      ]
    }
  },
  {
    id: 'betaflight-configurator',
    title: 'Betaflight Configurator Proficiency',
    icon: '🖥️',
    category: 'betaflight',
    difficulty: 'advanced',
    shortAnswer: 'Betaflight Configurator is the GUI for configuring flight controllers. Master the Setup, Ports, Configuration, PID Tuning, Receiver, Modes, Motors, OSD, and CLI tabs to fully configure any build.',

    content: {
      overview: `Betaflight Configurator is the essential tool for configuring FPV drone flight controllers. True proficiency means understanding every tab, knowing CLI commands for advanced configuration, being able to diagnose problems, and optimizing performance. This knowledge separates beginners from experts.`,

      sections: [
        {
          title: 'Setup Tab - First Connection',
          content: `**What Setup Tab Shows:**
• 3D drone model showing real-time orientation
• Firmware version information
• Sensor status (gyro, accelerometer, barometer, magnetometer)
• Board alignment visualization
• Arming disable flags

**Critical Checks on First Connection:**
1. Does the 3D model move correctly when you move the drone?
2. Are all expected sensors showing as detected?
3. Is firmware version current/expected?
4. What arming disable flags are present?

**Calibrate Accelerometer:**
• Place drone on flat surface
• Click "Calibrate Accelerometer"
• Wait for completion
• Essential for angle/horizon modes

**Board Alignment:**
If FC is mounted at an angle:
• Set Board Alignment degrees (0, 90, 180, 270)
• Or use CLI: set board_align_yaw = 90

**Arming Disable Flags:**
Common flags that prevent arming:
• RXLOSS - No receiver signal
• CLI - Currently in CLI mode
• MSP - Connected to configurator
• THROTTLE - Throttle not at zero
• ANGLE - Drone tilted (if angle limit enabled)
• NOPREARM - Prearm switch required

**Reset Settings:**
• "Reset Settings" button returns to defaults
• "Backup" saves current configuration
• "Restore" loads saved configuration
• ALWAYS backup before major changes`
        },
        {
          title: 'Ports Tab - Serial Configuration',
          content: `**Understanding Ports:**
Every UART (serial port) on your FC can be assigned different functions.

**Common Port Assignments:**

| Function | Purpose | Typical UART |
|----------|---------|--------------|
| MSP | Configurator connection | USB (auto) |
| Serial RX | Receiver protocol | UART1 or UART2 |
| GPS | GPS module | Any free UART |
| TBS Crossfire | Crossfire telemetry | Dedicated |
| SmartAudio | VTX control | Any UART |
| ESC Telemetry | ESC sensor data | Any UART |
| Blackbox | External logger | Any UART |

**Setting Up Receiver (Most Common Task):**
1. Identify which UART your receiver is connected to
2. Enable "Serial RX" for that UART
3. Baud rate: typically 115200 (CRSF/ELRS) or 100000 (SBUS)
4. Save and go to Receiver tab to select protocol

**Setting Up VTX Control (SmartAudio/IRC Tramp):**
1. Enable "Peripherals" for VTX UART
2. Select "TBS SmartAudio" or "IRC Tramp"
3. Save - VTX settings now controllable via OSD

**Setting Up GPS:**
1. Enable "Sensor Input" > GPS for GPS UART
2. Set baud rate (typically 115200 for modern GPS)
3. Save and configure GPS settings in Configuration tab

**Common Mistakes:**
• Assigning multiple functions to same UART
• Wrong baud rate for protocol
• Not saving after changes
• Receiver on wrong UART`
        },
        {
          title: 'Configuration Tab - Core Settings',
          content: `**Mixer:**
• Quad X (most common)
• Other layouts: Quad +, Hex, Octo, etc.
• Motor direction settings

**ESC/Motor Features:**
• Motor Protocol: DShot300/600 (digital) or PWM
• Motor direction: Normal or Reversed
• Bidirectional DShot: Enable for RPM filtering
• Motor poles: Set correctly for RPM filter (usually 14)

**System Configuration:**
• Gyro update frequency: 8kHz typical
• PID loop frequency: 4kHz or 8kHz
• Accelerometer: Enable for angle mode, disable for pure acro
• Barometer: Enable for altitude hold features
• Magnetometer: Enable for GPS rescue heading

**Personalization:**
• Craft name: Shows on OSD
• Pilot name: Shows on OSD

**Board and Sensor Alignment:**
• Board alignment offsets (if FC mounted at angle)
• Gyro alignment (if gyro chip rotated)

**Arming:**
• Max arm angle: How level drone must be to arm
• Disable when in-flight: Prevents accidental disarm

**GPS Settings (when GPS enabled):**
• Protocol: UBLOX, NMEA, etc.
• Ground assistance: GPS rescue feature
• Set home point: When GPS fix acquired

**Other Features:**
• OSD: Enable to use On-Screen Display
• VTX: Enable for VTX control
• LED Strip: Enable for addressable LEDs

**Common Configuration Mistakes:**
• Wrong motor protocol (DShot vs PWM)
• Bidirectional DShot disabled (RPM filter won't work)
• Wrong motor poles (RPM filter inaccurate)
• Accelerometer disabled but trying to use angle mode`
        },
        {
          title: 'PID Tuning Tab - Flight Performance',
          content: `**PID Controller Section:**

**Main PID Values:**
• P (Proportional): Correction strength
• I (Integral): Drift elimination
• D (Derivative): Overshoot damping
• F (Feed Forward): Direct stick response

**Per-Axis Tuning:**
• Roll: Often can handle higher PIDs
• Pitch: Usually similar or slightly lower than roll
• Yaw: Needs less P and D than roll/pitch

**Sliders (Betaflight 4.3+):**
• Master: Scales all PIDs proportionally
• PD Balance: Ratio between P and D
• Stick Response: Feed Forward aggressiveness
• D Gain: D-term strength
• PI Gain: P and I together

**Using Sliders (Recommended Approach):**
1. Start with Master slider for overall response
2. Adjust PD Balance for propwash (more D helps)
3. Tune Stick Response for feel preference
4. Fine-tune individual values only if needed

**Feed Forward Section:**
• Transition: How FF blends with PID at center stick
• Limit: Caps FF contribution
• Boost: Extra FF during fast stick moves
• Jitter reduction: Smooths noisy RC input

**Filter Settings:**
• Gyro Lowpass 1: Main gyro filter
• Gyro Lowpass 2: Second stage filter
• D-Term Lowpass: Filters D calculation
• Dynamic Notch: Auto-targeting notch filter

**Filtering Strategy:**
• Lower cutoff = more filtering = more latency
• Higher cutoff = less filtering = faster response but more noise
• With RPM filter, can raise cutoffs for less latency

**Rate Profiles:**
Different PIDs for different flying situations
• Profile 1: Freestyle
• Profile 2: Racing
• Profile 3: Cinematic`
        },
        {
          title: 'Receiver Tab - RC Configuration',
          content: `**Receiver Mode (Protocol):**
• SBUS: FrSky and many others (inverted)
• CRSF: Crossfire, ELRS (bidirectional)
• IBUS: FlySky
• SPEKTRUM: Spektrum satellites
• PPM: Old single-wire protocol (avoid)

**Channel Map (Critical!):**
Standard is AETR (TAER on some):
• A = Aileron (Roll)
• E = Elevator (Pitch)
• T = Throttle
• R = Rudder (Yaw)

**If Channels Wrong:**
• Reorder in Channel Map dropdown
• Or fix in transmitter mixer

**Stick Values Display:**
• Shows real-time channel values
• Move sticks - bars should respond
• All channels should show 1000-2000 range
• Center should be ~1500 (except throttle at 1000)

**RSSI Configuration:**
• Channel: Which AUX has RSSI (if any)
• Or use "RSSI_ADC" for analog RSSI pin
• CRSF/ELRS send RSSI automatically

**Telemetry:**
Enable for bidirectional protocols (CRSF, ELRS) to send FC data to transmitter

**RC Smoothing:**
• Auto: Let Betaflight calculate
• Interpolation: Smooths RC steps
• Filter: Additional smoothing
• Higher = smoother but more latency

**Serial RX Provider:**
Must match your receiver:
• SBUS for FrSky
• CRSF for Crossfire/ELRS
• IBUS for FlySky
• SPEKTRUM1024/2048 for Spektrum

**Stick Calibration:**
If endpoints wrong:
• Adjust in transmitter (preferred)
• Or use rxrange command in CLI
• Should see 1000-2000 full range`
        },
        {
          title: 'Modes Tab - Switches and Arming',
          content: `**Essential Modes to Configure:**

**ARM:**
• REQUIRED - drone won't fly without this
• Assign to a dedicated switch
• Never use same switch for other critical functions
• Test arming/disarming before every session

**ANGLE:**
• Self-leveling mode for beginners
• Requires accelerometer enabled
• Drone returns to level when sticks centered

**HORIZON:**
• Self-levels but allows flips at full stick
• Transition mode for learning acro

**BEEPER:**
• Activates buzzer for finding lost drone
• Assign to a convenient switch

**FLIP OVER AFTER CRASH (Turtle Mode):**
• Spins motors to flip drone upright
• Requires bidirectional DShot

**PREARM:**
• Safety switch - must be active before ARM works
• Adds extra protection against accidental arming

**Configuring a Mode:**
1. Click "Add Range" for desired mode
2. Select AUX channel (your switch)
3. Drag yellow range to switch position values
4. Test by flipping switch - mode should highlight

**Reading the Mode Display:**
• Yellow bar = active range
• Mode highlights when active
• Watch channel values as you flip switches

**Multiple Ranges:**
• Can have multiple ranges on same channel
• Useful for 3-position switches
• Example: Low = off, Mid = Angle, High = Horizon

**Best Practices:**
• ARM on its own dedicated switch
• Never share ARM switch with other modes
• Test all modes before flying
• Keep critical modes on accessible switches`
        },
        {
          title: 'Motors Tab - Testing and Direction',
          content: `**CRITICAL SAFETY WARNING:**
• REMOVE ALL PROPELLERS before using Motors tab
• Even at low throttle, props can cause serious injury
• This is the #1 safety rule in FPV

**Motor Test Slider:**
• Enable "I understand" checkbox
• Slide master or individual motor sliders
• Motors will spin (without props!)

**Verifying Motor Order:**
The 3D model shows motor numbers:
• Motor 1 = rear right
• Motor 2 = front right
• Motor 3 = rear left
• Motor 4 = front left
(Standard Quad X layout)

**Testing Each Motor:**
1. Enable motor test
2. Slide Motor 1 slider slightly
3. Verify rear-right motor spins
4. Repeat for Motors 2, 3, 4

**If Motor Order Wrong:**
Either:
• Remap in CLI: resource MOTOR [#] [pin]
• Or swap motor wire connections
• Or remap in BLHeli/ESC configurator

**Checking Motor Direction:**
With bidirectional DShot, can reverse in Betaflight:
• Configuration tab > Motor direction: Reversed

Or check visually:
• Front motors should spin outward (away from center)
• Rear motors should spin inward (toward center)

**Motor Direction Fix:**
• In ESC configurator (BLHeli, etc.)
• Or swap any two motor phase wires
• Or CLI: set motor_direction_inverted = [list]

**RPM Readout:**
With bidirectional DShot:
• Motors tab shows real-time RPM
• Verify all motors report similar RPM
• Confirms RPM filter will work`
        },
        {
          title: 'OSD Tab - On-Screen Display',
          content: `**What OSD Shows:**
Information overlay on your FPV video feed

**Common OSD Elements:**

**Flight Data:**
• Battery voltage (total and per-cell)
• Current draw (amps)
• mAh consumed
• Flight time / Armed time
• Altitude (if baro enabled)

**Attitude:**
• Artificial horizon
• Crosshairs
• Heading / compass

**GPS Data (if equipped):**
• Speed (ground speed)
• Coordinates
• Distance from home
• Satellites locked
• GPS rescue status

**System Status:**
• Warnings (low battery, etc.)
• Flight mode
• RSSI (signal strength)
• Link quality
• Throttle position

**Configuring OSD:**
1. Drag elements to desired position on preview
2. Toggle element visibility
3. Adjust element options (where available)
4. Save

**OSD Profiles:**
• Multiple OSD layouts
• Switch between using AUX channel
• Example: Racing (minimal) vs Freestyle (more info)

**Font Selection:**
• Different fonts available
• Install via "Font Manager" button
• Affects character appearance

**Critical OSD Elements:**
Minimum recommended:
• Battery voltage (prevents over-discharge)
• Flight time or mAh used
• RSSI/LQ (signal monitoring)
• Warnings

**VTX Administrative Info:**
If enabled, shows VTX settings for competition check`
        },
        {
          title: 'CLI Tab - Advanced Configuration',
          content: `**What CLI Is:**
Command Line Interface for advanced settings not in GUI

**Essential CLI Commands:**

**status**
Shows current FC status, sensors, features enabled

**diff all**
Shows only settings different from defaults
Great for backup/sharing configurations

**dump all**
Shows ALL settings (very long)
Complete configuration backup

**get [setting]**
Shows current value of a setting
Example: get motor_poles

**set [setting] = [value]**
Changes a setting value
Example: set motor_poles = 14

**save**
Saves changes and reboots
ALWAYS save after making changes!

**resource list**
Shows pin assignments
Critical for servo setup, troubleshooting

**resource [type] [index] [pin]**
Reassigns pin resources
Example: resource MOTOR 5 NONE

**tasks**
Shows running tasks and CPU usage
Helps diagnose performance issues

**Useful CLI Settings:**

**Motor Configuration:**
set motor_poles = 14
set dshot_bidir = ON
set dshot_idle_value = 550

**Filter Configuration:**
set gyro_lowpass_hz = 150
set dterm_lowpass_hz = 150
set rpm_filter_harmonics = 3

**Safety:**
set small_angle = 180 (arm at any angle)
set runaway_takeoff_prevention = ON

**Backup and Restore:**
• Copy "diff all" output to text file
• Paste commands back into CLI to restore
• Share configurations with others

**Profile Commands:**
profile [0-2] - Switch PID profile
rateprofile [0-5] - Switch rate profile`
        },
        {
          title: 'Blackbox Tab - Flight Logging',
          content: `**What Blackbox Is:**
Records flight data for analysis and tuning

**Recording Options:**
• Onboard flash (if FC has flash chip)
• SD card (if FC has SD slot)
• Serial (external logger)

**Configuring Blackbox:**
1. Select logging device
2. Set logging rate (2kHz common)
3. Enable desired debug modes
4. Configure in Modes tab if using switch activation

**What Gets Logged:**
• Gyro data (all axes)
• RC commands (your inputs)
• Motor outputs
• PID calculations
• Set point vs actual (error)
• Current/voltage (if sensors present)

**Debug Modes:**
Enable specific data for troubleshooting:
• GYRO_SCALED - filtered gyro
• GYRO_RAW - unfiltered gyro
• NOTCH - filter activity
• RPM_FILTER - RPM filter data
• FFT - frequency analysis

**Analyzing Logs:**
Use Blackbox Explorer (separate program):
• Visual graphs of all data
• Frequency analysis (spectrograph)
• PID tuning insights
• Find oscillations and noise

**Tuning Workflow with Blackbox:**
1. Record flight with Blackbox enabled
2. Open log in Blackbox Explorer
3. Look at gyro trace for noise/oscillations
4. Check PID error (setpoint vs gyro)
5. Adjust settings based on findings
6. Repeat

**Common Things to Look For:**
• Gyro noise spikes (filtering issue)
• P oscillation (P too high)
• D noise (D too high or poor filtering)
• Motor saturation (hitting 100%)
• I-term windup (I too high)`
        },
        {
          title: 'Presets Tab - Quick Configuration',
          content: `**What Presets Are:**
Pre-made configurations from experienced tuners

**Official Presets:**
• Betaflight provides tested presets
• Categorized by use case
• Good starting points

**Types of Presets:**
• PID tunes (for specific frame types)
• Filter settings (for different noise levels)
• Rate profiles (for different flying styles)
• Full configurations (complete setup)

**Using Presets:**
1. Go to Presets tab
2. Browse or search for relevant preset
3. Read description carefully
4. Click to apply
5. Review changes before saving
6. Test cautiously

**Creating Your Own:**
• Tune your drone
• Use "diff all" in CLI
• Save the output
• Share with community

**When to Use Presets:**
• Starting a new build (baseline)
• Trying different flying style
• Troubleshooting (compare to known-good)
• Learning what settings do

**Caution with Presets:**
• Not all presets work for all builds
• Motor/prop/frame affect tune requirements
• Always test carefully after applying
• Understand what the preset changed`
        },
        {
          title: 'Troubleshooting Common Issues',
          content: `**Won't Connect to Configurator:**
1. Check USB cable (some are charge-only)
2. Install correct drivers (ImpulseRC, STM32, etc.)
3. Try different USB port
4. Check if FC is in bootloader mode
5. Try "No Reboot Sequence" option

**Won't Arm:**
Check Setup tab for arming disable flags:
• RXLOSS: Receiver not bound/connected
• THROTTLE: Throttle not at minimum
• CLI: Close CLI and save
• ANGLE: Level the drone or increase small_angle
• NOPREARM: Activate prearm switch first

**Motors Don't Spin:**
1. Verify ESC calibration (if using PWM)
2. Check motor protocol matches ESC capability
3. Verify motor wiring
4. Check motor test in Motors tab (props off!)
5. Verify ARM mode is configured

**Receiver Not Working:**
1. Confirm receiver is bound to transmitter
2. Check serial port assignment (Ports tab)
3. Verify receiver protocol selection
4. Check wiring (RX to TX, TX to RX)
5. Confirm receiver powers on

**Drone Flips on Takeoff:**
1. Motor direction wrong - check all 4
2. Motor order wrong - verify with motor test
3. Props on wrong motors (CW/CCW)
4. FC orientation wrong - check board alignment

**FC Reboots During Flight:**
1. Check voltage regulator
2. Verify ESC is not pulling too much current
3. Check for shorts
4. Try different/better USB power

**Excessive Vibration/Oscillation:**
1. Mechanical issue - check props, motors
2. P too high - reduce P gain
3. Filter settings - check gyro filtering
4. Soft mount FC if hard mounted
5. Check motor screws not loose`
        }
      ],

      keyPoints: [
        'Setup Tab: First check - verify sensors, calibrate accel, check arming flags',
        'Ports Tab: Assign UARTs for receiver, GPS, VTX control, etc.',
        'Configuration Tab: Motor protocol, bidirectional DShot, board alignment',
        'PID Tab: Use sliders first, fine-tune individual values only if needed',
        'Modes Tab: ARM is essential - test all modes before flying',
        'CLI: "diff all" for backup, "resource list" for pin troubleshooting',
        'ALWAYS remove props before using Motors tab'
      ],

      interviewTips: [
        'Walk through each tab and what you configure there',
        'Know the essential CLI commands from memory (diff, resource, set, save)',
        'Demonstrate troubleshooting logic (won\'t arm? check flags...)',
        'Explain the relationship between filtering and PID tuning',
        'Show you understand WHY settings matter, not just what they do'
      ],

      practiceQuestions: [
        {
          q: 'Walk me through setting up a new build in Betaflight Configurator.',
          a: 'First, Setup tab - verify sensors detected, calibrate accelerometer. Ports tab - assign UART for receiver (Serial RX). Configuration tab - set motor protocol (DShot600), enable bidirectional DShot, set motor poles, verify board alignment. Receiver tab - select protocol (CRSF/SBUS), verify stick movements. Modes tab - configure ARM switch (critical), add other modes like Beeper, Angle if needed. Motors tab (PROPS OFF) - verify motor order and direction. OSD tab - add battery voltage, mAh, RSSI at minimum. Save and test arm/disarm before mounting props.',
          distractors: [
            'First, Motors tab - spin up each motor to 50% to verify ESC calibration. PID Tuning tab - load a recommended preset for your frame size. Blackbox tab - start recording before first flight. CLI - run "set defaults" to ensure clean configuration. Modes tab - enable Angle mode as default for first flights. Power tab - calibrate voltage sensor with multimeter. The most critical step is ESC calibration through the Motors tab.',
            'First, CLI - type "defaults" to reset all settings. Configuration tab - flash the latest firmware if not current. Power tab - set battery parameters first (cells, capacity, voltage warnings). Receiver tab - bind your radio and verify channels 1-16. PID tab - copy values from similar builds online. OSD tab - enable all elements for maximum information. Always flash firmware before configuring anything else.',
            'First, Presets tab - select your exact frame and motor combination for automatic configuration. GPS tab - enable GPS rescue for safety. Receiver tab - let auto-detect find your protocol. Configuration tab - enable all features for flexibility. Rates tab - adjust before first flight based on skill level. Motors tab - verify rotation by watching motor labels spin. Presets handle most configuration automatically.'
          ]
        },
        {
          q: 'The drone won\'t arm. How do you troubleshoot?',
          a: 'Go to Setup tab and check arming disable flags. Common issues: RXLOSS means receiver not working (check binding, ports, protocol). THROTTLE means throttle not at minimum (verify in Receiver tab). ANGLE means drone not level enough (increase small_angle in CLI or level the surface). CLI flag means save and exit CLI. NOPREARM means prearm switch required. Each flag tells you exactly what\'s preventing arming.',
          distractors: [
            'First check the Modes tab to verify ARM is mapped to a switch position. If ARM range doesn\'t highlight when you flip the switch, adjust the range slider. Then check Motors tab that ESCs initialize (brief motor twitch on connection). Verify battery voltage in Power tab meets minimum threshold (default 3.5V/cell). CLI command "status" shows arming state.',
            'Go to CLI and type "arm" to force arming and identify the error code. The response shows exactly what\'s blocking. Common codes: E01 is accelerometer calibration needed, E02 is gyro fault, E03 is receiver failsafe. After fixing, type "arm_force" to bypass remaining warnings for testing. Use "disarm_all" to reset.',
            'Check Motors tab first - if motor test doesn\'t spin motors, the ESC-FC connection is broken. Then verify Receiver tab shows stick movement. Reset the arm switch in Modes to default 1500-2000 range. Run "set arm_timeout = 0" in CLI to disable the arm timeout that resets the arm state. Battery voltage is rarely the issue.'
          ]
        },
        {
          q: 'What CLI commands would you use to backup and diagnose a configuration?',
          a: '"diff all" shows all non-default settings - perfect for backup, sharing, and seeing what\'s been changed. "status" shows current FC state, sensors, and features. "resource list" shows pin assignments for troubleshooting servo setup or motor mapping. "tasks" shows CPU usage if there are performance concerns. "get [setting]" checks specific values. Always end with "save" after changes to persist and reboot.',
          distractors: [
            '"backup" creates a .json file on your computer with all settings. "diagnostic" runs a full hardware test and reports issues. "export" generates shareable configuration code. "verify" checks for setting conflicts. "resources" shows available RAM and flash. "log" shows recent errors and warnings. Use "restore [filename]" to apply a backup file.',
            '"settings all" exports every parameter to a text file for backup. "health" checks gyro, accelerometer, and ESC status. "pins" shows GPIO assignments. "memory" shows heap and stack usage. "errors" displays fault codes from last session. Changes auto-save when you close the CLI, no explicit save needed.',
            '"config dump" writes all settings to SD card for backup. "system check" validates hardware connections. "timer list" shows DMA and timer conflicts. "features show" lists enabled features. "profile dump" saves just the current PID profile. Use "config restore" to load from SD card backup.'
          ]
        },
        {
          q: 'Explain the relationship between filtering and PID tuning.',
          a: 'Filters remove noise from gyro signal before PID controller uses it. D-term especially amplifies high-frequency noise, so poor filtering means you can\'t run adequate D without hot motors. With good filtering (especially RPM filter), you can raise filter cutoffs for less latency and run more D for better propwash handling. Tuning PIDs on a noisy gyro is pointless - fix filtering first. Blackbox analysis shows if noise is getting through filters.',
          distractors: [
            'Filters and PIDs are independent systems - tune PIDs first to establish baseline performance, then add filtering to smooth out remaining oscillations. High P-term benefits from heavy filtering which dampens overshoot. D-term should be minimized when using strong filters since they perform the same dampening function. RPM filtering replaces D-term entirely in modern Betaflight.',
            'Filters apply to the motor output signal, smoothing PWM commands to prevent ESC desync. PID tuning determines how aggressively the FC responds to errors. Lower filter cutoffs allow higher PIDs by preventing motor current spikes. The relationship is primarily about protecting ESCs from overcurrent, not gyro noise.',
            'Filtering is primarily for video quality - reducing vibration in DVR footage. PID tuning is for flight characteristics. They operate on different signal paths and can be tuned independently. Motor temperature is determined by prop load and efficiency, not filter settings. Blackbox is for flight replay, not filter analysis.'
          ]
        },
        {
          q: 'You plug in via USB but Configurator shows no port available. List the troubleshooting steps in order.',
          a: '1) Try different USB cable (many are charge-only without data lines). 2) Try different USB port (some ports have power issues). 3) Check Device Manager (Windows) for unknown devices - install drivers (ImpulseRC Driver Fixer, STM32 VCP drivers). 4) Check if FC is in DFU/bootloader mode (hold boot button while connecting). 5) Try "Manual Selection" with "No Reboot Sequence" in Configurator. 6) Check if FC has power (lights on?). 7) Verify cable connections to FC are secure.',
          distractors: [
            '1) Update Betaflight Configurator to latest version. 2) Reinstall Chrome browser (Configurator dependency). 3) Disable antivirus temporarily (blocks serial ports). 4) Run Configurator as administrator. 5) Flash latest firmware using DFU mode. 6) Clear Configurator cache in settings. 7) Verify FC firmware matches Configurator version. Version mismatches are the most common connection issue.',
            '1) Check that battery is connected (USB doesn\'t provide enough power). 2) Verify FC LEDs show correct boot sequence. 3) Try legacy COM port mode in Configurator settings. 4) Update FC firmware via SD card. 5) Reset FC by shorting boot pads for 10 seconds. 6) Try WebSerial version of Configurator. 7) Check if another application has the port open.',
            '1) Install FTDI drivers from ftdichip.com. 2) Set USB baud rate to 115200 in Device Manager. 3) Disable USB selective suspend in Windows power settings. 4) Try USB 2.0 port instead of USB 3.0. 5) Disconnect all other USB devices. 6) Check Windows event log for USB errors. 7) Update motherboard USB controller drivers.'
          ]
        },
        {
          q: 'Explain the difference between "diff all" and "dump all" CLI commands and when to use each.',
          a: '"diff all" shows only settings that differ from defaults - compact, easy to read, perfect for sharing tunes or backing up your customizations. Most useful for troubleshooting and comparing configurations. "dump all" shows every single setting regardless of whether it matches defaults - very long output, but useful for complete backup or when you need to verify a specific default value. For day-to-day use, "diff all" is preferred; "dump all" is for complete restoration or firmware migration.',
          distractors: [
            '"diff all" compares your current settings against the previous saved version, showing what changed in your last session. "dump all" exports settings in binary format for exact restoration, including calibration data. Use "diff all" to track your recent changes; use "dump all" for complete backups that preserve sensor calibration.',
            '"diff all" shows settings that differ between your rate profiles (Profile 1 vs 2 vs 3), useful for comparing your freestyle vs racing setups. "dump all" shows the merged settings from all profiles combined. Use "diff all" when switching between flight styles; use "dump all" for single-profile configuration.',
            '"diff all" outputs in human-readable format with comments explaining each setting. "dump all" outputs in compressed format that can be directly pasted to restore. Both show the same settings - the difference is just the format. Use "diff all" when learning; use "dump all" for backup and restore operations.'
          ]
        },
        {
          q: 'The drone flips on the first takeoff attempt. Describe the systematic troubleshooting process.',
          a: '1) Motors tab (props OFF): Test each motor individually - verify M1-M4 spin the correct physical motor. 2) Check motor direction: Front motors should spin outward, rear motors inward (or opposite depending on "Props In" setting). 3) Verify prop placement: CW props on CW motors, CCW on CCW. 4) Check board orientation: Setup tab 3D model should match physical movement. If not, adjust board_align settings. 5) Verify mixer: Configuration tab should show correct frame type (Quad X typically). Problem is almost always motor order, direction, or props on wrong motors.',
          distractors: [
            '1) Reduce P-term by 50% in PID tab - high P causes violent oscillations on takeoff. 2) Check that accelerometer is calibrated on a level surface. 3) Enable Angle mode for first flight which limits flip angle. 4) Verify battery is centered for balance. 5) Lower rates to 300 deg/sec maximum. 6) Check that ESC calibration was performed. Flip on takeoff is typically a PID tuning issue.',
            '1) Verify ESC firmware matches across all ESCs - mixed versions cause desync. 2) Check that motor timing is set identically on all ESCs (18-24° typical). 3) Run ESC calibration through Motors tab. 4) Lower DShot speed from 600 to 300. 5) Enable motor_pwm_protocol_check in CLI. 6) Verify all motors draw similar current at same throttle. ESC desync causes sudden flip.',
            '1) Check battery voltage - sagging below 3.3V/cell causes erratic behavior. 2) Verify gyro calibration wasn\'t done while moving. 3) Look for bent motor shafts causing vibration. 4) Check prop balance using magnetic balancer. 5) Tighten all motor screws. 6) Verify frame isn\'t cracked. Mechanical issues cause flip on takeoff more often than configuration problems.'
          ]
        },
        {
          q: 'You need to assign GPS to UART3 and ExpressLRS receiver to UART2. Walk through the Ports tab configuration.',
          a: 'Ports tab: For UART2 - toggle "Serial RX" on (this enables receiver input), leave other columns off, configuration dropdown shows baud rate (ELRS auto-negotiates, typically 115200). For UART3 - toggle "Sensor Input" on in the GPS column (not Serial RX), set baud rate to match GPS module (typically 115200 for modern GPS). Save. Then go to Configuration tab to select GPS protocol (usually UBLOX) and Receiver tab to select Serial RX provider (CRSF for ELRS). Common mistake: putting GPS on Serial RX instead of Sensor Input.',
          distractors: [
            'Ports tab: For UART2 - enable "MSP" for ELRS since it uses MSP protocol for telemetry bidirection. For UART3 - enable "Telemetry Output" and select GPS type from dropdown. Set both to 420000 baud for best performance. ELRS receiver auto-configures protocol in the Receiver tab. GPS protocol is detected automatically from the telemetry stream.',
            'Ports tab: Both GPS and receiver use the same Serial RX setting - Betaflight distinguishes them by baud rate. UART2 at 420000 baud = ELRS receiver, UART3 at 9600 baud = GPS. The Configuration tab has a "GPS UART" selector if you need to override auto-detection. ELRS is always SBUS protocol regardless of hardware.',
            'Ports tab: UART2 needs "Peripherals" enabled with ELRS selected from the dropdown - Serial RX is for traditional PWM receivers. UART3 needs "Sensor Input" plus "GPS" column both enabled simultaneously. Baud rates are locked to 57600 for GPS and 100000 for ELRS by the protocol specifications.'
          ]
        },
        {
          q: 'Describe how to diagnose a "mushy" or delayed stick response using Betaflight tools.',
          a: 'Check in this order: 1) Receiver tab - verify RC input updates smoothly without stuttering (protocol issue). 2) RC Smoothing settings - if auto, try reducing or setting manual lower values. 3) PID tab - check if Feed Forward is too low (increase for sharper response). 4) Filter settings - cutoffs too low add latency; try raising gyro/D lowpass if noise allows. 5) Rates - check if RC rate/expo makes center stick too soft. 6) Blackbox - look at RC command vs setpoint vs gyro to see where delay occurs. Systematic approach isolates whether it\'s input lag, filtering, or tune issue.',
          distractors: [
            'Check in this order: 1) Increase P-term by 20% increments until response sharpens. 2) Lower D-term which dampens stick response. 3) Disable dynamic filtering which adds processing delay. 4) Switch from DShot600 to DShot1200 for faster motor response. 5) Reduce gyro sample rate to 4kHz (lower is faster). 6) Motor KV may be too low for quick response - consider higher KV motors.',
            'Check in this order: 1) Verify ESC timing is set to 26° or higher for faster commutation. 2) Flash BLHeli_32 firmware with 48kHz PWM option. 3) Check that motor_pwm_speed is set to maximum. 4) Enable anti-gravity which sharpens throttle response. 5) Reduce TPA since it softens response at high throttle. 6) I-term is likely too high, causing slow correction.',
            'Check in this order: 1) Battery internal resistance may be too high - use higher C-rated pack. 2) Voltage sag causes ESC current limiting - verify with battery meter. 3) Props may be too heavy causing slow acceleration. 4) Check motor temperature - thermal throttling softens response. 5) Frame flex absorbs motor torque - check arm stiffness. 6) Verify prop nuts aren\'t over-torqued limiting shaft speed.'
          ]
        }
      ]
    }
  }
];

// Merge additional topics into main array
FPV_TOPICS.push(...ADDITIONAL_TOPICS);

// Helper function to get topics by category
export const getTopicsByCategory = (categoryId) =>
  FPV_TOPICS.filter(topic => topic.category === categoryId);

// Helper function to get category info
export const getCategoryById = (id) => CATEGORIES.find(cat => cat.id === id);

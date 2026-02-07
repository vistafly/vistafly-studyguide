# FPV Interview Quick Reference Cheat Sheet

Use this as a rapid review. All key facts in one place.

---

## 1. ANALOG vs DIGITAL

| Aspect | Analog | DJI | HDZero | Walksnail |
|--------|--------|-----|--------|-----------|
| Latency | 8-15ms | 28-40ms | 15-25ms | 22-32ms |
| Resolution | ~480p | 1080p | 720p | 1080p |
| Signal Loss | Gradual (static) | Cliff effect | Cliff effect | Cliff effect |
| Best For | Racing | Cinematic | Racing HD | Freestyle |

**Key Points:**
- Cliff effect = digital works or doesn't (no gradual degradation)
- At 100mph: 30ms latency = 4.4 feet of "blind" travel
- Analog still preferred for professional racing

---

## 2. STATOR SIZE

**Format: WWHH** (e.g., 2207 = 22mm wide × 7mm tall)

| Size | Prop Size | KV Range | Use |
|------|-----------|----------|-----|
| 1404 | 3" | 3000-4500 | Micro |
| 2207 | 5" | 1700-2600 | Standard |
| 2806.5 | 7" | 1100-1700 | Long range |
| 2812 | 10" | 900-1400 | Endurance |

**Key Points:**
- Width = torque (for heavy props)
- Height = RPM potential (responsiveness)
- Larger motors at partial throttle = more efficient

---

## 3. SERVO SETUP IN BETAFLIGHT

**CLI Commands:**
```
resource MOTOR 5 NONE      # Free motor resource
resource SERVO 1 B06       # Assign pin to servo
save                       # Reboot

servo 0 1000 2000 1500 100 # Configure (min/max/mid/rate)
smix 0 0 5 100 0 0 100 0   # Assign to AUX2 (channel 6)
save
```

**Key Points:**
- Servos need 50Hz PWM (NOT DShot)
- Power from external BEC (not FC 5V)
- Channel inputs: 0=Roll, 1=Pitch, 2=Yaw, 3=Throttle, 4+=AUX

---

## 4. 10" HOVER BUILD

**Optimal Specs:**
- Motor: 2806.5-2812, 1100-1400KV
- Props: 10x3.8 bi-blade (low pitch)
- Battery: 6S Li-ion (4000mAh 21700 cells)
- Target: Hover at 25-35% throttle

**Li-ion vs LiPo:**
- Li-ion: 260 Wh/kg (2-3× flight time)
- LiPo: 150 Wh/kg (better for power)

**Key Points:**
- Lower disc loading = more efficient hover
- Large props + low RPM = efficient
- Li-ion for endurance, LiPo for performance

---

## 5. PROPELLER SPECS

**Format:** Diameter × Pitch × Blades (e.g., 51466 = 5.1" × 4.66" × 3-blade)

| Pitch | Character |
|-------|-----------|
| 3.0-4.0" | Efficient, smooth |
| 4.0-4.8" | Balanced |
| 5.0"+ | Aggressive, fast |

| Blades | Thrust | Efficiency |
|--------|--------|------------|
| 2 | 80% | 100% |
| 3 | 100% | 85% |
| 4 | 115% | 75% |

**Key Points:**
- Larger diameter = more efficient hover
- Higher pitch = more speed, more current
- Match pitch to KV (high KV → low pitch)

---

## 6. RPM FILTERING

**Requirements:**
- ESC: BLHeli_32, AM32, or Bluejay
- Enable: `set dshot_bidir = ON`
- Configure: `set motor_poles = 14`

**How It Works:**
1. ESC reports motor RPM via bidirectional DShot
2. FC calculates noise frequency: RPM ÷ 60 = Hz
3. Notch filters placed at fundamental + harmonics
4. Filters move as throttle changes

**Key Settings:**
- `rpm_filter_harmonics = 3` (filter 1×, 2×, 3×)
- `rpm_filter_q = 500` (higher = narrower notch)

**Key Points:**
- Harmonics = 2×, 3× the fundamental frequency
- Lower Q = wider notch (more latency)
- Result: Less latency than static filtering

---

## 7. PID TUNING

| Term | Formula | Purpose | Too Low | Too High |
|------|---------|---------|---------|----------|
| P | P × Error | Correction | Mushy | Oscillation |
| I | I × ΣError | Anti-drift | Drifts | Bounce-back |
| D | D × ΔError/Δt | Damping | Overshoot | Hot motors |
| FF | Direct stick | Response | Laggy | Overshoot |

**Typical Values (BF 4.3+):**
- Roll/Pitch P: 40-70
- Roll/Pitch I: 80-120
- Roll/Pitch D: 25-45
- Roll/Pitch FF: 100-150

**Quick Diagnosis:**
- Hot motors → Lower D, improve filtering
- Oscillation → Lower P
- Propwash → Better P:D balance, more D
- Drift → Increase I

---

## 8. MOTOR EFFICIENCY

**Key Formula:** Heat Loss = I²R (current SQUARED)

**Efficiency Comparison:**
| Motor | Throttle | Current | Heat Loss |
|-------|----------|---------|-----------|
| Small (2207) | 70% | 15A | 22.5W |
| Large (2806) | 40% | 9A | 8.1W |

**Key Points:**
- Motors most efficient at 50-70% load
- Target hover at 25-35% throttle
- Lower KV = more torque per amp
- Larger motor at partial throttle beats smaller motor working hard

---

## QUICK FORMULAS

```
Motor Noise Hz = RPM ÷ 60
Max RPM = KV × Voltage
Disc Area = π × radius²

Example:
30,000 RPM motor → 500 Hz noise
2400KV on 6S (25.2V) → 60,480 max RPM
5" prop → 126.7 cm² disc area
```

---

## INTERVIEW POWER PHRASES

**Video Systems:**
> "Analog degrades gracefully with static, while digital has a cliff effect where it either works perfectly or fails completely."

**Stator Size:**
> "The first two digits are width for torque, last two are height for RPM. A 2207 is 22mm wide by 7mm tall."

**Servo Setup:**
> "You need to remap the motor resource because DShot and servo PWM are incompatible protocols."

**Efficiency:**
> "Heat loss scales with current squared, so a larger motor drawing less current is exponentially more efficient."

**RPM Filtering:**
> "It uses bidirectional DShot telemetry to place notch filters exactly where motor noise occurs as it changes with throttle."

**PID:**
> "P is your correction strength, I prevents drift over time, and D dampens to prevent overshoot."

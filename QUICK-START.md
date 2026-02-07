# FPV Mastery Study App - Quick Start for Claude Code

## Project Summary

Build a personal study website for FPV drone technical interview preparation. Cyberpunk/tech aesthetic with neon colors on dark backgrounds.

## Files in This Package

1. **INSTRUCTIONS.md** - Complete project setup and architecture guide
2. **TOPICS-DATA.md** - Topics 1-5 with full content (Analog/Digital, Stators, Servo Setup, 10" Build, Propellers)
3. **TOPICS-DATA-PART3.md** - Topics 6-8 with full content (RPM Filtering, PID Tuning, Motor Efficiency)
4. **UI-COMPONENTS.md** - Component specifications and design system
5. **QUICK-START.md** - This file

## Build Order

### Phase 1: Setup (Do First)
```bash
npm create vite@latest fpv-mastery -- --template react
cd fpv-mastery
npm install react-router-dom lucide-react framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Add Google Fonts to index.html:
```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Phase 2: Core Files
1. Configure tailwind.config.js with custom colors
2. Create src/data/topics.js with ALL topic data from TOPICS-DATA files
3. Create base CSS in index.css with effects
4. Set up React Router in App.jsx

### Phase 3: Components
1. Build common components (Button, Card, Badge, ProgressBar)
2. Build layout (Header, PageLayout)
3. Build topic components (TopicCard, TopicContent, KeyPointsBox, etc.)

### Phase 4: Pages
1. Home/Dashboard
2. Topics browser
3. Topic detail page
4. Flashcards study mode
5. Quiz mode

### Phase 5: Advanced (If Time)
1. Interview simulator
2. Speed round
3. Progress statistics
4. Study streak tracking

## Key Design Decisions

- **No backend needed** - LocalStorage for all persistence
- **Single page app** - React Router for navigation
- **Mobile responsive** - Works on phone for on-the-go study
- **Offline capable** - Works without internet once loaded

## Color Quick Reference

```javascript
'neon-cyan': '#00fff7',    // Primary
'neon-pink': '#ff00ff',    // Secondary
'neon-yellow': '#ffd700',  // Achievements
'neon-green': '#39ff14',   // Success
'dark-900': '#0a0a0f',     // Darkest BG
'dark-800': '#12121a',     // Card BG
```

## The 8 Topics

1. Analog vs Digital Video Systems
2. Motor Stator Sizes
3. Servo Setup in Betaflight
4. 10" Maximum Hover Time Build
5. Propeller Pitch, Size, and Shape
6. RPM Filtering
7. PID Tuning
8. Motor Size and Efficiency

All content is in the TOPICS-DATA files - just copy into the JavaScript data structure.

## Success Criteria

- User can browse all 8 topics
- User can read full content with sections
- User can use flashcard mode
- User can take quizzes with practice questions
- Progress is saved between sessions
- Works on mobile

Good luck! 🚁

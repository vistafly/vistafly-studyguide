# UI Components Specification

This file details the key UI components for the FPV study website.

---

## Design System Summary

### Colors
- **Primary:** Neon Cyan (#00fff7)
- **Secondary:** Neon Pink (#ff00ff)  
- **Accent:** Gold (#ffd700)
- **Success:** Neon Green (#39ff14)
- **Warning:** Orange (#ff6b00)
- **Error:** Red (#ff3131)
- **Backgrounds:** Dark grays (#0a0a0f to #252535)

### Fonts
- **Headers:** Orbitron (tech/futuristic)
- **Body:** Rajdhani (clean, readable)
- **Code:** JetBrains Mono

### Key Effects
- Glow on text and boxes
- Grid background pattern
- Card hover with lift and glow
- Pulsing borders on active elements
- Gradient progress bars

---

## Essential Components to Build

### Common Components
1. **Button** - Multiple variants (primary, secondary, success, danger, ghost)
2. **Card** - Reusable card container with optional hover/glow effects
3. **ProgressBar** - Animated gradient progress indicator
4. **Badge** - Small labels for categories and difficulty
5. **Modal** - For confirmations and additional info

### Topic Components
1. **TopicCard** - Grid card showing topic preview with progress
2. **TopicContent** - Full content renderer with section navigation
3. **KeyPointsBox** - Highlighted box for key points to remember
4. **InterviewTips** - Styled list of interview advice
5. **PracticeQA** - Expandable Q&A practice section
6. **ContentRenderer** - Parses markdown-like content with tables, code blocks, lists

### Study Mode Components
1. **Flashcard** - 3D flip card with question/answer
2. **FlashcardDeck** - Manages deck of flashcards with swipe/buttons
3. **QuizQuestion** - Multiple choice with immediate feedback
4. **QuizResults** - Score summary with review
5. **InterviewSim** - Timer + question + self-grading
6. **SpeedRound** - Rapid fire key points with timer

### Dashboard Components
1. **StatsCard** - Individual stat display
2. **StreakCounter** - Study streak with flame icon
3. **ProgressOverview** - Overall mastery progress
4. **RecentActivity** - Last studied topics

### Layout Components
1. **Header** - Fixed navigation with logo
2. **PageLayout** - Standard page wrapper
3. **Sidebar** - For topic detail navigation

---

## Key Interactions

### Flashcard Flow
1. Show topic title as question
2. Click to flip and reveal answer
3. Two buttons: "Know It" or "Need Practice"
4. Track confidence in localStorage
5. Spaced repetition prioritizes weak topics

### Quiz Flow
1. Select category or "All Topics"
2. Present 10 random practice questions
3. Immediate feedback on each answer
4. Show ideal answer after selection
5. Final score with review of missed questions

### Interview Simulator Flow
1. Random topic presented as question
2. Optional timer (60-120 seconds)
3. User thinks/speaks answer
4. Click to reveal ideal answer
5. Self-grade: Nailed It / Partial / Missed It
6. Tracks weak areas over time

### Progress Tracking
All stored in localStorage:
- Topics viewed
- Topics marked "mastered"
- Flashcard confidence per topic
- Quiz scores history
- Interview self-grades
- Study streak (consecutive days)

---

## Mobile Considerations

- Cards stack vertically on mobile
- Flashcards should be touch-swipeable
- Navigation collapses to hamburger menu
- Font sizes adjust for readability
- Touch targets minimum 44px

---

## Animation Guidelines

Use Framer Motion for:
- Page transitions (fade/slide)
- Card entrance animations (stagger)
- Flashcard flip (3D rotate)
- Progress bar fill
- Quiz answer reveal
- Hover states

Keep animations snappy (200-400ms) for good feel.

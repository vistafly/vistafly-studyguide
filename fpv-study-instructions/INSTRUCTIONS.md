# FPV Drone Technical Interview Study Website - Complete Build Instructions

## Project Overview

Build a comprehensive FPV drone technical knowledge study website designed for personal use to prepare for in-depth technical interviews. The application should be engaging, modern with a tech/drone aesthetic, and include multiple study modes with deep technical content covering all aspects of FPV drone building, tuning, and theory.

**Target User:** Ron - experienced FPV pilot preparing for technical interviews
**Purpose:** Deep learning and memorization of FPV technical concepts
**Design Aesthetic:** Futuristic/tech cyberpunk theme with neon accents (cyan, magenta, gold)

---

## Table of Contents

1. [Project Setup](#1-project-setup)
2. [Design Requirements](#2-design-requirements)
3. [Content Database Structure](#3-content-database-structure)
4. [Core Features](#4-core-features)
5. [Study Modes](#5-study-modes)
6. [Component Structure](#6-component-structure)
7. [Complete Topic Data](#7-complete-topic-data)
8. [Local Storage for Progress](#8-local-storage-for-progress)

---

## 1. Project Setup

### Tech Stack
- **Frontend**: React 18+ with Vite
- **Styling**: Tailwind CSS with custom cyberpunk theme
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Storage**: LocalStorage (no backend needed - personal use)

### Initial Setup Commands
```bash
npm create vite@latest fpv-mastery -- --template react
cd fpv-mastery
npm install
npm install react-router-dom lucide-react framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Tailwind Configuration
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Orbitron', 'monospace'],
        'body': ['Rajdhani', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'neon': {
          'cyan': '#00fff7',
          'pink': '#ff00ff',
          'yellow': '#ffd700',
          'green': '#39ff14',
          'orange': '#ff6b00',
          'red': '#ff3131',
        },
        'dark': {
          '900': '#0a0a0f',
          '800': '#12121a',
          '700': '#1a1a25',
          '600': '#252535',
          '500': '#353545',
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 247, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 247, 0.6)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Google Fonts
Add to `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## 2. Design Requirements

### Aesthetic Direction
**Theme:** Cyberpunk/Tech HUD interface - like a drone's onboard computer display

### Color Palette
- **Background:** Deep space black with subtle grid pattern (#0a0a0f to #1a1a25)
- **Primary Accent:** Neon Cyan (#00fff7) - main interactive elements
- **Secondary Accent:** Neon Magenta (#ff00ff) - highlights, progress
- **Tertiary Accent:** Gold (#ffd700) - achievements, important info
- **Success:** Neon Green (#39ff14)
- **Warning:** Neon Orange (#ff6b00)
- **Error:** Neon Red (#ff3131)
- **Text:** White with slight cyan tint for body, pure white for headers

### Typography
- **Headers:** Orbitron (tech/futuristic feel)
- **Body:** Rajdhani (clean, readable, slightly technical)
- **Code/Data:** JetBrains Mono

### Visual Effects
- Subtle grid background pattern
- Glow effects on interactive elements
- Scan line overlay (subtle)
- Card hover animations with glow
- Progress bars with gradient animation
- Pulsing borders on active elements

### Layout Principles
- Dark mode only
- Card-based content organization
- Clear visual hierarchy
- Generous spacing
- Mobile responsive

---

## 3. Content Database Structure

### Topic Object Structure
```javascript
{
  id: 'topic-slug',
  title: 'Topic Display Name',
  icon: '📡', // Emoji for visual identification
  category: 'Category Name',
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  shortAnswer: 'Quick one-liner answer for flashcard mode',
  content: {
    overview: 'Introduction paragraph explaining the topic',
    sections: [
      {
        title: 'Section Title',
        content: 'Detailed markdown-style content with tables, code blocks, lists'
      }
    ],
    keyPoints: ['Point 1', 'Point 2', ...], // For quick review
    interviewTips: ['Tip 1', 'Tip 2', ...], // How to answer in interview
    practiceQuestions: [
      {
        q: 'Interview question',
        a: 'Ideal answer'
      }
    ]
  }
}
```

### Categories
1. **Video Systems** - Analog vs Digital, VTX, Cameras
2. **Motors** - Stator sizes, KV, Efficiency
3. **Propellers** - Pitch, Size, Shape, Selection
4. **Betaflight** - PID Tuning, RPM Filtering, Configuration
5. **Build Theory** - Efficiency builds, Component selection
6. **Configuration** - Servo setup, ESC configuration

---

## 4. Core Features

### 4.1 Dashboard/Home
- Welcome message with study streak
- Quick stats (topics mastered, quiz scores, time studied)
- Continue where you left off
- Topic category grid with progress indicators

### 4.2 Topic Browser
- Grid/List view of all topics
- Filter by category
- Filter by difficulty
- Search functionality
- Progress indicator per topic (not started, in progress, mastered)

### 4.3 Topic Deep Dive
- Full content display with sections
- Collapsible sections
- Key points highlight box
- Interview tips section
- Practice Q&A with reveal answers
- Mark as "Mastered" button
- Navigation to next/previous topic

### 4.4 Progress Tracking (LocalStorage)
- Topics viewed
- Topics marked as mastered
- Quiz scores per topic
- Flashcard progress (know it / need practice)
- Study streak (consecutive days)
- Total time studied

---

## 5. Study Modes

### 5.1 📖 Read Mode (Deep Dive)
- Full content display
- Section navigation sidebar
- Highlight key terms
- Note-taking capability (saved to localStorage)

### 5.2 🎴 Flashcard Mode
- Shows topic title as question
- Flip to reveal short answer
- Swipe/buttons: "Know It" or "Need Practice"
- Spaced repetition based on confidence
- Filter by category or "Need Practice" items

### 5.3 📝 Quiz Mode
- Multiple choice questions from practice questions
- Immediate feedback with explanations
- Score tracking
- Review incorrect answers
- Quiz by category or all topics

### 5.4 🎯 Interview Simulator
- Random topic presented as interview question
- Timer for response (optional)
- Reveal ideal answer after attempt
- Self-grade: Nailed It / Partial / Missed It
- Tracks weak areas

### 5.5 ⚡ Speed Round
- Rapid-fire key points
- 10 seconds to recall
- Points for speed and accuracy
- Combo multiplier for streaks

### 5.6 🔗 Concept Connections
- Shows related topics
- How concepts connect (e.g., "Motor KV affects Prop Selection")
- Mind-map style visualization

---

## 6. Component Structure

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── common/
│   │   ├── Card.jsx
│   │   ├── Button.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── Badge.jsx
│   │   ├── Modal.jsx
│   │   └── Tooltip.jsx
│   ├── topics/
│   │   ├── TopicCard.jsx
│   │   ├── TopicGrid.jsx
│   │   ├── TopicContent.jsx
│   │   ├── TopicSection.jsx
│   │   ├── KeyPointsBox.jsx
│   │   ├── InterviewTips.jsx
│   │   └── PracticeQA.jsx
│   ├── study/
│   │   ├── Flashcard.jsx
│   │   ├── FlashcardDeck.jsx
│   │   ├── QuizQuestion.jsx
│   │   ├── QuizResults.jsx
│   │   ├── InterviewSim.jsx
│   │   ├── SpeedRound.jsx
│   │   └── ConceptMap.jsx
│   └── dashboard/
│       ├── StatsCard.jsx
│       ├── StreakCounter.jsx
│       ├── ProgressOverview.jsx
│       └── RecentActivity.jsx
├── pages/
│   ├── Home.jsx
│   ├── Topics.jsx
│   ├── TopicDetail.jsx
│   ├── Flashcards.jsx
│   ├── Quiz.jsx
│   ├── Interview.jsx
│   ├── SpeedRound.jsx
│   └── Progress.jsx
├── context/
│   ├── ProgressContext.jsx
│   └── ThemeContext.jsx
├── hooks/
│   ├── useLocalStorage.jsx
│   ├── useProgress.jsx
│   └── useStudyTimer.jsx
├── data/
│   ├── topics.js (ALL TOPIC DATA)
│   └── categories.js
└── utils/
    ├── helpers.js
    └── constants.js
```

---

## 7. Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Dashboard with stats and quick access |
| `/topics` | Topics | Browse all topics with filters |
| `/topics/:id` | TopicDetail | Full topic content |
| `/flashcards` | Flashcards | Flashcard study mode |
| `/flashcards/:category` | Flashcards | Category-specific flashcards |
| `/quiz` | Quiz | Quiz mode selection |
| `/quiz/:category` | Quiz | Category quiz |
| `/interview` | Interview | Interview simulator |
| `/speed` | SpeedRound | Speed round game |
| `/progress` | Progress | Detailed progress stats |

---

## 8. Local Storage Schema

```javascript
// Key: 'fpv-mastery-progress'
{
  version: 1,
  lastUpdated: 'ISO timestamp',
  user: {
    studyStreak: 0,
    longestStreak: 0,
    lastStudyDate: 'ISO date',
    totalTimeStudied: 0, // minutes
  },
  topics: {
    'topic-id': {
      viewed: true,
      mastered: false,
      lastViewed: 'ISO timestamp',
      notes: 'User notes string',
      flashcardConfidence: 'know' | 'practice' | null,
      quizScores: [85, 90, 100], // array of scores
    }
  },
  quizHistory: [
    {
      date: 'ISO timestamp',
      category: 'all' | 'category-name',
      score: 85,
      totalQuestions: 10,
    }
  ],
  interviewHistory: [
    {
      date: 'ISO timestamp',
      topicId: 'topic-id',
      selfGrade: 'nailed' | 'partial' | 'missed',
    }
  ]
}
```

---

## Implementation Priority

### Phase 1: Core Structure
1. Project setup with Vite + React + Tailwind
2. Custom theme implementation
3. Basic routing
4. Topic data file with all content
5. Home page with navigation

### Phase 2: Topic Content
1. Topic browser page
2. Topic detail page with full content rendering
3. Key points and interview tips components
4. Practice Q&A component

### Phase 3: Study Modes
1. Flashcard mode
2. Quiz mode
3. Progress tracking with localStorage

### Phase 4: Advanced Features
1. Interview simulator
2. Speed round
3. Concept connections
4. Study statistics dashboard

---

## Important Notes

1. **All topic content is in the TOPICS-DATA.md file** - This contains the complete technical content for all 10 interview topics with deep explanations

2. **Personal use only** - No authentication needed, localStorage is sufficient

3. **Offline capable** - Should work without internet once loaded

4. **Mobile responsive** - Should work well on phone for on-the-go study

5. **Performance** - Topic content is large, implement lazy loading for topic details

import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext(null);

const STORAGE_KEY = 'fpv-mastery-progress';

const getInitialState = () => ({
  version: 1,
  lastUpdated: new Date().toISOString(),
  user: {
    studyStreak: 0,
    longestStreak: 0,
    lastStudyDate: null,
    totalTimeStudied: 0,
  },
  topics: {},
  quizHistory: [],
  interviewHistory: [],
  flaggedItems: {
    questions: [],   // Array of "topicId_questionIndex" strings (for Quiz/MasteryCheck)
  },
  savedBuilds: [],   // Array of saved drone builds from the simulator
});

// Deep merge function to properly combine nested objects
const deepMerge = (initial, loaded) => {
  if (!loaded) return initial;

  return {
    ...initial,
    ...loaded,
    user: {
      ...initial.user,
      ...(loaded.user || {}),
    },
    topics: {
      ...initial.topics,
      ...(loaded.topics || {}),
    },
    quizHistory: loaded.quizHistory || initial.quizHistory,
    interviewHistory: loaded.interviewHistory || initial.interviewHistory,
    flaggedItems: {
      questions: loaded.flaggedItems?.questions || initial.flaggedItems.questions,
    },
    savedBuilds: loaded.savedBuilds || initial.savedBuilds,
  };
};

export function ProgressProvider({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const merged = deepMerge(getInitialState(), parsed);
        console.log('Loaded progress from localStorage:', merged);
        return merged;
      }
    } catch (e) {
      console.error('Error loading progress:', e);
    }
    return getInitialState();
  });

  // Mark as initialized after first render
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever progress changes (but not on initial load)
  useEffect(() => {
    if (!isInitialized) return;

    try {
      const toSave = {
        ...progress,
        lastUpdated: new Date().toISOString(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
      console.log('Saved progress to localStorage:', toSave);
    } catch (e) {
      console.error('Error saving progress:', e);
    }
  }, [progress, isInitialized]);

  // Update study streak on mount
  useEffect(() => {
    updateStudyStreak();
  }, []);

  const updateStudyStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    setProgress(prev => {
      const lastStudy = prev.user.lastStudyDate;

      if (!lastStudy) {
        return prev;
      }

      const lastStudyDate = new Date(lastStudy).toDateString();

      if (lastStudyDate === today) {
        // Already studied today, do nothing
        return prev;
      } else if (lastStudyDate === yesterdayStr) {
        // Studied yesterday, increment streak
        return {
          ...prev,
          user: {
            ...prev.user,
            studyStreak: prev.user.studyStreak + 1,
            longestStreak: Math.max(prev.user.longestStreak, prev.user.studyStreak + 1),
            lastStudyDate: today,
          },
        };
      } else {
        // Missed a day, reset streak
        return {
          ...prev,
          user: {
            ...prev.user,
            studyStreak: 1,
            lastStudyDate: today,
          },
        };
      }
    });
  };

  const markTopicViewed = (topicId) => {
    const today = new Date().toDateString();

    setProgress(prev => ({
      ...prev,
      user: {
        ...prev.user,
        lastStudyDate: today,
        studyStreak: prev.user.lastStudyDate !== today
          ? (prev.user.studyStreak || 0) + 1
          : prev.user.studyStreak || 1,
      },
      topics: {
        ...prev.topics,
        [topicId]: {
          ...prev.topics[topicId],
          viewed: true,
          lastViewed: new Date().toISOString(),
        },
      },
    }));
  };

  const markTopicMastered = (topicId, mastered = true) => {
    setProgress(prev => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topicId]: {
          ...prev.topics[topicId],
          mastered,
          masteredDate: mastered ? new Date().toISOString() : null,
        },
      },
    }));
  };

  const addQuizScore = (category, score, totalQuestions) => {
    setProgress(prev => ({
      ...prev,
      quizHistory: [
        ...prev.quizHistory,
        {
          date: new Date().toISOString(),
          category,
          score,
          totalQuestions,
        },
      ],
    }));
  };

  const addInterviewResult = (topicId, selfGrade) => {
    setProgress(prev => ({
      ...prev,
      interviewHistory: [
        ...prev.interviewHistory,
        {
          date: new Date().toISOString(),
          topicId,
          selfGrade,
        },
      ],
    }));
  };

  const saveTopicNotes = (topicId, notes) => {
    setProgress(prev => ({
      ...prev,
      topics: {
        ...prev.topics,
        [topicId]: {
          ...prev.topics[topicId],
          notes,
        },
      },
    }));
  };

  const addStudyTime = (minutes) => {
    setProgress(prev => ({
      ...prev,
      user: {
        ...prev.user,
        totalTimeStudied: (prev.user.totalTimeStudied || 0) + minutes,
      },
    }));
  };

  const getTopicProgress = (topicId) => {
    return progress.topics[topicId] || {
      viewed: false,
      mastered: false,
      quizScores: [],
      notes: '',
    };
  };

  const getOverallStats = () => {
    const topics = Object.values(progress.topics);
    const totalTopics = 8; // We have 8 topics

    return {
      topicsViewed: topics.filter(t => t.viewed).length,
      topicsMastered: topics.filter(t => t.mastered).length,
      totalTopics,
      studyStreak: progress.user.studyStreak || 0,
      longestStreak: progress.user.longestStreak || 0,
      totalTimeStudied: progress.user.totalTimeStudied || 0,
      quizzesTaken: progress.quizHistory.length,
      averageQuizScore: progress.quizHistory.length > 0
        ? Math.round(
            progress.quizHistory.reduce((acc, q) => acc + (q.score / q.totalQuestions) * 100, 0) /
            progress.quizHistory.length
          )
        : 0,
    };
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setProgress(getInitialState());
    }
  };

  // Flag management functions
  const toggleFlagQuestion = (topicId, questionIndex) => {
    const questionId = `${topicId}_${questionIndex}`;

    setProgress(prev => {
      const currentFlags = prev.flaggedItems.questions;
      const isFlagged = currentFlags.includes(questionId);

      return {
        ...prev,
        flaggedItems: {
          ...prev.flaggedItems,
          questions: isFlagged
            ? currentFlags.filter(id => id !== questionId)
            : [...currentFlags, questionId],
        },
      };
    });
  };

  const autoFlagQuestion = (topicId, questionIndex) => {
    const questionId = `${topicId}_${questionIndex}`;

    setProgress(prev => {
      const currentFlags = prev.flaggedItems.questions;

      // Only add if not already flagged
      if (currentFlags.includes(questionId)) {
        return prev;
      }

      return {
        ...prev,
        flaggedItems: {
          ...prev.flaggedItems,
          questions: [...currentFlags, questionId],
        },
      };
    });
  };

  const isQuestionFlagged = (topicId, questionIndex) => {
    const questionId = `${topicId}_${questionIndex}`;
    return progress.flaggedItems.questions.includes(questionId);
  };

  const getFlaggedCounts = () => {
    return {
      questions: progress.flaggedItems.questions.length,
      total: progress.flaggedItems.questions.length,
    };
  };

  const clearAllFlags = () => {
    setProgress(prev => ({
      ...prev,
      flaggedItems: {
        questions: [],
      },
    }));
  };

  // Drone Build Simulator functions
  const saveBuild = (build, name, results) => {
    setProgress(prev => ({
      ...prev,
      savedBuilds: [
        ...prev.savedBuilds,
        {
          id: `build-${Date.now()}`,
          name,
          build,
          results,
          createdAt: new Date().toISOString(),
        },
      ],
    }));
  };

  const deleteBuild = (buildId) => {
    setProgress(prev => ({
      ...prev,
      savedBuilds: prev.savedBuilds.filter(b => b.id !== buildId),
    }));
  };

  const getSavedBuilds = () => {
    return progress.savedBuilds || [];
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markTopicViewed,
        markTopicMastered,
        addQuizScore,
        addInterviewResult,
        saveTopicNotes,
        addStudyTime,
        getTopicProgress,
        getOverallStats,
        resetProgress,
        toggleFlagQuestion,
        autoFlagQuestion,
        isQuestionFlagged,
        getFlaggedCounts,
        clearAllFlags,
        saveBuild,
        deleteBuild,
        getSavedBuilds,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import Home from './pages/Home';
import Topics from './pages/Topics';
import TopicDetail from './pages/TopicDetail';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import BuildSimulator from './pages/BuildSimulator';
import FlaggedQuestions from './pages/FlaggedQuestions';
import Progress from './pages/Progress';

function App() {
  return (
    <ProgressProvider>
      <BrowserRouter basename="/vistafly-studyguide">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:id" element={<TopicDetail />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/flashcards/:category" element={<Flashcards />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:category" element={<Quiz />} />
          <Route path="/simulator" element={<BuildSimulator />} />
          <Route path="/flagged" element={<FlaggedQuestions />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  );
}

export default App;

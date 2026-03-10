import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="font-ubuntu text-xfitgray min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<h1 className="font-teko text-6xl text-xfitorange p-4">Xtreme Fitness</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

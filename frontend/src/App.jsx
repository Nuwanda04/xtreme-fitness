import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import Services from './pages/Services';
import Trainers from './pages/Trainers';

function App() {
  return (
    <Router>
      <div className="font-ubuntu text-xfitgray min-h-screen bg-white flex flex-col">
        <Header />

        {/* Main content wrapper */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/om-os" element={<AboutUs />} />
            <Route path="/tjenester" element={<Services />} />
            <Route path="/traenere" element={<Trainers />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AboutUs from "./pages/AboutUs";
import Backoffice from "./pages/Backoffice";
import BlogDetail from "./pages/BlogDetail";
import Home from "./pages/Home";
import Kontakt from "./pages/Kontakt";
import Login from "./pages/Login";
import Priser from "./pages/Priser";
import Services from "./pages/Services";
import Trainers from "./pages/Trainers";

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
            <Route path="/priser" element={<Priser />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/backoffice" element={<Backoffice />} />
          </Routes>
        </main>

        <Footer />
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
      />
    </Router>
  );
}

export default App;

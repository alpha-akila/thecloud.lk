import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About/About";
import Rooms from "./pages/Rooms/Rooms";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

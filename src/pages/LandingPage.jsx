import React from "react";
import Home from "./Home/Home";
import About from "./About/About";
import Rooms from "./Rooms/Rooms";
import Gallery from "./Gallery/Gallery";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div style={{ backgroundColor: "#1F2125" }}>
      {/* Home Section */}
      <div id="home-section">
        <Home />
      </div>

      {/* About Section */}
      <div id="about-section">
        <About />
      </div>

      <Rooms />

      <Gallery />

      <Footer />
    </div>
  );
};

export default LandingPage;

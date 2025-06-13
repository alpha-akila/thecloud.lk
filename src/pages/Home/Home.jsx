import WeatherInfo from "./components/WeatherInfo";
import BookingForm from "./components/BookingForm";
import RatingsSection from "./components/RatingSection";
import AmenitiesScroll from "./components/AmenitiesScroll";
import Navbar from "../../components/Navbar";
import landingVideo from "../../assets/landing.mp4";
import calendarIcon from "../../assets/icons/calendar-2-line.svg";

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Navbar */}
      <Navbar />

      {/* 1. Background Layer (z-0) */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={landingVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 3. Content Layer (z-20) */}
      <div className="absolute inset-0 z-20 flex flex-col">
        {/* Weather Info - Centered below navbar */}
        <div className="pt-27.5 w-full flex justify-center items-center p-4">
          <WeatherInfo />
        </div>

        {/* Main Content - Below weather info */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          {/* Hero Text */}
          <div className="mb-12">
            <h2
              className="text-white/90 mb-6"
              style={{
                fontFamily: "Inter",
                fontWeight: 300,
                fontSize: "4rem",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Welcome to
            </h2>
            <h1
              className="text-white text-8xl font-bold mb-8 tracking-wide"
              style={{
                fontFamily: "Krona One",
                fontWeight: 400,
                fontSize: "5.5rem",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              The Cloud Hanthana
            </h1>
            <p
              className="text-white/80 text-xl font-light mb-8 max-w-2xl text-center mx-auto"
              style={{
                fontFamily: "Inter",
                fontWeight: 300,
                fontSize: "1.5rem",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Minimalist, Eco-Friendly, Authentic, Just like Home
            </p>

            {/* Book Now Button */}
            <button
              className="bg-white/10 hover:bg-white hover:text-[#1F2125] transition-all duration-300 border-2 border-white/60 hover:border-white text-white rounded-lg text-lg font-medium flex items-center justify-center space-x-3 mx-auto backdrop-blur-sm w-96 h-18 group"
              style={{
                boxShadow: "0px 4px 4px 0px #00000040",
              }}
            >
              <img
                src={calendarIcon}
                alt="Calendar"
                className="w-8 h-8 filter brightness-0 invert group-hover:invert-0 group-hover:brightness-100 transition-all duration-300"
              />
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "1.75rem",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                Book Now
              </span>
            </button>

            {/* Amenities Scrolling Section */}
            <AmenitiesScroll />
          </div>

          {/* Booking Form */}
          <BookingForm />

          {/* Ratings */}
          <RatingsSection />
        </div>

        {/* Floating animation elements - These can remain as they are */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default Home;

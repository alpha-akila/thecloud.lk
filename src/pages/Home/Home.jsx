import WeatherInfo from "./components/WeatherInfo";
import BookingForm from "./components/BookingForm";
import RatingsSection from "./components/RatingSection";
import AmenitiesScroll from "./components/AmenitiesScroll";
import Navbar from "../../components/Navbar";
import landingVideo from "../../assets/landing.mp4";
import calendarIcon from "../../assets/icons/calendar-2-line.svg";

const Home = () => {
  const url =
    "https://www.booking.com/hotel/lk/the-cloud-hanthana-kandy.en-us.html?aid=1549630&label=bckbtn-clicktrip-bn-n37-030625-the_cloud_hanthana_kandy-i18694353-s119021-w4h1RCY1GhE1HZF4N-cu_tab-d1103-dc3&sid=515644fee0aeea3376641f2bd50ce8ce&all_sr_blocks=1031380007_376056652_2_42_0&checkin=2025-06-13&checkout=2025-06-14&dest_id=-2222251&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1031380007_376056652_2_42_0&hpos=1&matching_block_id=1031380007_376056652_2_42_0&nflt=sth%3D27&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1031380007_376056652_2_42_0__3010&srepoch=1749823820&srpvid=524063a2662702df&type=total&ucfs=1&#hotelTmpl";

  const handleClick = () => {
    window.open(url, "_blank");
  };

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
              onClick={handleClick}
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

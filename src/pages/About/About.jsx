import React, { useState, useRef, useEffect } from "react"; // Added useRef, useEffect
import NearByAttractions from "./components/nearByAttractions";
import aboutImg from "../../assets/about.png";
import mapImg from "../../assets/map.png";
import { gsap } from "gsap"; // Import gsap

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const overlayRef = useRef(null); // Create a ref for the overlay

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMouseEnter = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 0,
        ease: "power2.inOut",
        onComplete: () => {
          // Optionally hide it completely after fade out to prevent mouse event issues
          if (overlayRef.current) {
            overlayRef.current.style.visibility = "hidden";
          }
        },
      });
    }
  };

  return (
    <div
      className="min-h-screen text-white p-8 relative" // Added 'relative'
      style={{ backgroundColor: "#1F2125" }}
    >
      <div className="mx-auto px-17">
        <h1 className="text-6xl font-bold text-center mb-16">
          About The Cloud Hanthana
        </h1>

        <div
          className={`${
            !isExpanded
              ? "grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
              : "relative"
          }`}
        >
          {/* Google Maps Section */}
          <div
            className={`${
              !isExpanded
                ? "order-2 lg:order-1"
                : "float-left mr-8 mb-8 w-full lg:w-1/2"
            }`}
          >
            <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <img
                src={mapImg}
                alt="The Cloud Hanthana Location Map"
                className="w-full h-166 object-cover"
              />
              {/* <div className="p-4 bg-gray-700">
                <div className="flex items-center text-sm text-gray-300">
                  <span>The Cloud Hanthana</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Content Section */}
          <div className={`${!isExpanded ? "order-1 lg:order-2" : ""}`}>
            <div className="text-lg leading-relaxed">
              <p
                className="mb-6"
                style={{
                  fontFamily: "Lora",
                  fontWeight: 400,
                  fontSize: "2rem",
                  lineHeight: "3.75rem",
                  letterSpacing: "0%",
                  textAlign: "justify",
                  verticalAlign: "middle",
                }}
              >
                <span
                  style={{
                    fontFamily: "Lora",
                    fontSize: "5rem",
                    fontWeight: 400,
                    float: "left",
                    marginRight: "8px",
                  }}
                >
                  W
                </span>
                elcome to The Cloud Hanthana, where simplicity meets soul.
                Nestled just 10 minutes from Kandy, our boutique retreat offers
                a serene escape that feels worlds apart. We embrace a minimalist
                philosophy, using locally sourced materials and sustainable
                practices to create a space that's as eco-conscious as it is
                elegant. Here, you're not just a guest—you're family. Experience
                the warmth of home combined with the charm of a thoughtfully
                designed getaway. Discover a place to breathe, a place to
                belong.
              </p>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="animate-fadeIn">
                  <p
                    className="mb-6"
                    style={{
                      fontFamily: "Lora",
                      fontWeight: 400,
                      fontSize: "2rem",
                      lineHeight: "3.75rem",
                      letterSpacing: "0%",
                      textAlign: "justify",
                      verticalAlign: "middle",
                    }}
                  >
                    Nestled just 10 minutes from Kandy, our boutique retreat
                    offers a serene escape that feels worlds apart. We embrace a
                    minimalist philosophy, using locally sourced materials and
                    sustainable practices to create a space that's as
                    eco-conscious as it is elegant. Here, you're not just a
                    guest—you're family. Experience the warmth of home combined
                    with the charm of a thoughtfully designed getaway. Discover
                    a place to breathe, a place to belong.
                  </p>

                  <p
                    className="mb-6"
                    style={{
                      fontFamily: "Lora",
                      fontWeight: 400,
                      fontSize: "2rem",
                      lineHeight: "3.75rem",
                      letterSpacing: "0%",
                      textAlign: "justify",
                      verticalAlign: "middle",
                    }}
                  >
                    Welcome to The Cloud Hanthana, where simplicity meets soul.
                    Nestled just 10 minutes from Kandy, our boutique retreat
                    offers a serene escape that feels worlds apart. We embrace a
                    minimalist philosophy, using locally sourced materials and
                    sustainable practices to create a space that's as
                    eco-conscious as it is elegant. Here, you're not just a
                    guest—you're family. Experience the warmth of home combined
                    with the charm of a thoughtfully designed getaway. Discover
                    a place to breathe, a place to belong.
                  </p>

                  <p
                    className="mb-6"
                    style={{
                      fontFamily: "Lora",
                      fontWeight: 400,
                      fontSize: "2rem",
                      lineHeight: "3.75rem",
                      letterSpacing: "0%",
                      textAlign: "justify",
                      verticalAlign: "middle",
                    }}
                  >
                    Welcome to The Cloud Hanthana, where simplicity meets soul.
                    Nestled just 10 minutes from Kandy, our boutique retreat
                    offers a serene escape that feels worlds apart. We embrace a
                    minimalist philosophy, using locally sourced materials and
                    sustainable practices to create a space that's as
                    eco-conscious as it is elegant. Here, you're not just a
                    guest—you're family. Experience the warmth of home combined
                    with the charm of a thoughtfully designed getaway. Discover
                    a place to breathe, a place to belong.
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-10 mt-8 ">
                <button className="text-3xl px-8 py-3 bg-transparent border border-gray-500 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 min-w-[calc(100%/2-1.25rem)] min-h-22">
                  View Map
                </button>

                <button
                  onClick={toggleExpanded}
                  className="text-3xl px-8 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium min-w-[calc(100%/2-1.25rem)] min-h-22"
                >
                  {isExpanded ? "Show Less" : "Learn More About"}
                </button>
              </div>
            </div>
          </div>

          {/* Clear floats when expanded */}
          {isExpanded && <div className="clear-both"></div>}
        </div>
      </div>

      {/* Image Overlay */}
      <div
        ref={overlayRef} // Assign the ref
        className="absolute inset-0 z-30 cursor-pointer" // Changed back to absolute to only cover About section
        style={{ backgroundColor: "#1F2125" }} // Matches page background, image will cover this
        onMouseEnter={handleMouseEnter} // Add mouse enter event
      >
        <img
          src={aboutImg}
          alt="About The Cloud Hanthana"
          className="object-cover" // Using object-cover for full coverage
        />
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
      <NearByAttractions />
    </div>
  );
};

export default About;

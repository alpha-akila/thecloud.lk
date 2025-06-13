import React, { useState, useEffect } from "react";
import ceylonTea from "../../../assets/ceylon-tea-museum-attractions-1024x585.jpg";
import kandyColckTower from "../../../assets/Kandy_clock_tower,_1950.jpg";
import highlands from "../../../assets/sri-lanka-highlands.jpg";
import peraUni from "../../../assets/peradeniya.mp4";
import arrowLeftIcon from "../../../assets/icons/arrow-left-s-line.svg";
import arrowRightIcon from "../../../assets/icons/arrow-right-s-line.svg";
import ImgDescription from "./imgDescription";

const NearByAttractions = () => {
  const [activeTab, setActiveTab] = useState("Nearby Attractions");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const tabs = [
    "Nearby Attractions",
    "Experiences",
    "Dining",
    "Accommodations",
  ];

  const attractionsData = {
    "Nearby Attractions": {
      images: [
        peraUni, // This will be used as video
        ceylonTea,
        highlands,
        kandyColckTower,
      ],
      hasVideo: true, // Flag to indicate first item is a video
      descriptions: [
        {
          title: "University of Peradeniya",
          driveTime: "20",
          distance: "10Km",
        },
        { title: "Ceylon Tea Museum", driveTime: "15", distance: "8Km" },
        { title: "Sri Lanka Highlands", driveTime: "30", distance: "25Km" },
        { title: "Kandy Clock Tower", driveTime: "25", distance: "18Km" },
      ],
    },
    Experiences: {
      images: [highlands, ceylonTea, kandyColckTower, peraUni],
      hasVideo: false,
      descriptions: [
        { title: "Mountain Hiking", driveTime: "45", distance: "35Km" },
        { title: "Tea Plantation Tour", driveTime: "20", distance: "15Km" },
        { title: "Cultural Heritage Walk", driveTime: "30", distance: "20Km" },
        { title: "River Rafting", driveTime: "60", distance: "45Km" },
      ],
    },
    Dining: {
      images: [ceylonTea, highlands, kandyColckTower, peraUni],
      hasVideo: false,
      descriptions: [
        { title: "Local Cuisine Restaurant", driveTime: "10", distance: "5Km" },
        { title: "Mountain View Cafe", driveTime: "25", distance: "18Km" },
        { title: "Traditional Tea House", driveTime: "15", distance: "12Km" },
        { title: "Riverside Dining", driveTime: "35", distance: "28Km" },
      ],
    },
    Accommodations: {
      images: [kandyColckTower, highlands, ceylonTea, peraUni],
      hasVideo: false,
      descriptions: [
        { title: "Luxury Mountain Resort", driveTime: "40", distance: "32Km" },
        { title: "Eco Lodge", driveTime: "50", distance: "38Km" },
        { title: "Heritage Hotel", driveTime: "20", distance: "15Km" },
        { title: "Boutique Villa", driveTime: "30", distance: "22Km" },
      ],
    },
  };

  const getImageWidth = (index) => {
    if (hoveredIndex === null) return "20rem"; // Default width when no hover
    if (hoveredIndex === index) return "36rem"; // Expanded width for hovered image
    return "20rem"; // Reduced width for non-hovered images
  };

  const currentData = attractionsData[activeTab];

  // Reset image index when switching tabs with animation
  useEffect(() => {
    setCurrentImageIndex(0);
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const nextImage = () => {
    setIsTransitioning(true);
    const currentTabIndex = tabs.indexOf(activeTab);
    const nextTabIndex =
      currentTabIndex === tabs.length - 1 ? 0 : currentTabIndex + 1;
    setTimeout(() => setActiveTab(tabs[nextTabIndex]), 150);
  };

  const prevImage = () => {
    setIsTransitioning(true);
    const currentTabIndex = tabs.indexOf(activeTab);
    const prevTabIndex =
      currentTabIndex === 0 ? tabs.length - 1 : currentTabIndex - 1;
    setTimeout(() => setActiveTab(tabs[prevTabIndex]), 150);
  };

  return (
    <section
      className="relative py-16 px-6"
      style={{ backgroundColor: "#1F2125" }}
      id="NearByAttractions-section"
    >
      <div className=" mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-6xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            We Have Everything
          </h2>
          <h2 className="text-6xl md:text-5xl lg:text-6xl font-bold text-white">
            You Need
          </h2>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-26 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab !== activeTab) {
                  setIsTransitioning(true);
                  setTimeout(() => setActiveTab(tab), 150);
                }
              }}
              className={`relative text-4xl  font-medium transition-all duration-300 pb-2 transform hover:scale-105 ${
                activeTab === tab
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full animate-tab-underline"></div>
              )}
            </button>
          ))}
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <div
            className={`flex flex-wrap gap-4 justify-center transition-all duration-300 ${
              isTransitioning
                ? "opacity-0 transform translate-y-4"
                : "opacity-100 transform translate-y-0"
            }`}
          >
            {/* Main large image/video */}
            <div
              className={`relative overflow-hidden rounded-lg group transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
              style={{
                width: getImageWidth(0),
                height: "36rem",
                transitionDelay: isTransitioning ? "0ms" : "50ms",
              }}
              onMouseEnter={() => setHoveredIndex(0)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Show video for Peradeniya University on current index 0, otherwise show image */}
              {currentImageIndex === 0 &&
              currentData.hasVideo &&
              activeTab === "Nearby Attractions" ? (
                <video
                  src={currentData.images[currentImageIndex]}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  poster="" // This will show the first frame as thumbnail
                  onMouseEnter={(e) => e.target.play()}
                  onMouseLeave={(e) => {
                    e.target.pause();
                    e.target.currentTime = 0;
                  }}
                />
              ) : (
                <img
                  src={currentData.images[currentImageIndex]}
                  alt="Main attraction"
                  className="w-full h-full object-cover"
                />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Description overlay for main image - Shows on hover */}
              {hoveredIndex === 0 && (
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImgDescription
                    title={currentData.descriptions[0].title}
                    driveTime={currentData.descriptions[0].driveTime}
                    distance={currentData.descriptions[0].distance}
                  />
                </div>
              )}
            </div>

            {/* Secondary image 1 */}
            <div
              className={`relative overflow-hidden rounded-lg group transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
              style={{
                width: getImageWidth(1),
                height: "36rem",
                transitionDelay: isTransitioning ? "0ms" : "100ms",
              }}
              onMouseEnter={() => setHoveredIndex(1)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={currentData.images[1]}
                alt={currentData.descriptions[1].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Description - Shows on hover */}
              {hoveredIndex === 1 && (
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImgDescription
                    title={currentData.descriptions[1].title}
                    driveTime={currentData.descriptions[1].driveTime}
                    distance={currentData.descriptions[1].distance}
                  />
                </div>
              )}
            </div>

            {/* Secondary image 2 */}
            <div
              className={`relative overflow-hidden rounded-lg group transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
              style={{
                width: getImageWidth(2),
                height: "36rem",
                transitionDelay: isTransitioning ? "0ms" : "150ms",
              }}
              onMouseEnter={() => setHoveredIndex(2)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={currentData.images[2]}
                alt={currentData.descriptions[2].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Description - Shows on hover */}
              {hoveredIndex === 2 && (
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImgDescription
                    title={currentData.descriptions[2].title}
                    driveTime={currentData.descriptions[2].driveTime}
                    distance={currentData.descriptions[2].distance}
                  />
                </div>
              )}
            </div>

            {/* Last column image */}
            <div
              className={`relative overflow-hidden rounded-lg group transition-all duration-500 ${
                isTransitioning
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
              style={{
                width: getImageWidth(3),
                height: "36rem",
                transitionDelay: isTransitioning ? "0ms" : "200ms",
              }}
              onMouseEnter={() => setHoveredIndex(3)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                src={currentData.images[3]}
                alt={currentData.descriptions[3].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

              {/* Description - Shows on hover */}
              {hoveredIndex === 3 && (
                <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ImgDescription
                    title={currentData.descriptions[3].title}
                    driveTime={currentData.descriptions[3].driveTime}
                    distance={currentData.descriptions[3].distance}
                  />
                </div>
              )}
            </div>
          </div>
          {/* Navigation arrows */}
          <button
            onClick={prevImage}
            disabled={isTransitioning}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              isTransitioning ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <img
              src={arrowLeftIcon}
              alt="Previous"
              className="w-15 h-15 filter brightness-0 invert"
            />
          </button>
          <button
            onClick={nextImage}
            disabled={isTransitioning}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              isTransitioning ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <img
              src={arrowRightIcon}
              alt="Next"
              className="w-15 h-15 filter brightness-0 invert"
            />
          </button>
          {/* Tab indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  if (tab !== activeTab) {
                    setIsTransitioning(true);
                    setTimeout(() => setActiveTab(tab), 150);
                  }
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  tab === activeTab ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
          </div>{" "}
        </div>
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

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes tabUnderline {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }

        .animate-tab-underline {
          animation: tabUnderline 0.3s ease-out;
        }

        .animate-slide-in-left {
          animation: slideInFromLeft 0.4s ease-out;
        }

        .animate-slide-in-right {
          animation: slideInFromRight 0.4s ease-out;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
        }

        /* Custom transition for smooth tab switching */
        .tab-transition {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Enhanced hover effects */
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </section>
  );
};

export default NearByAttractions;

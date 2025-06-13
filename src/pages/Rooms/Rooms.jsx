import React, { useState, useEffect } from "react";
import landscapeIcon from "../../assets/icons/landscape-line.svg";
import creativeCommonsIcon from "../../assets/icons/creative-commons-by-line.svg";
import routerIcon from "../../assets/icons/router-line.svg";
import fireIcon from "../../assets/icons/fire-line.svg";
import arrowLeftIcon from "../../assets/icons/arrow-left-s-line.svg";
import arrowRightIcon from "../../assets/icons/arrow-right-s-line.svg";
import sriLankaHighlands from "../../assets/sri-lanka-highlands.jpg";
import room1img1 from "../../assets/room1img1.jpg";
import room1img2 from "../../assets/room1img2.jpg";

const Rooms = () => {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  // Sample data for 7 rooms
  const rooms = [
    {
      name: "Room 1",
      description:
        "Embrace a minimalist philosophy, using locally sourced materials and sustainable practices to create a space that's as serene as it is luxurious.",
      images: [room1img1, room1img2],
      landscapeImage: sriLankaHighlands,
    },
    {
      name: "Room 2",
      description:
        "Overlook the rolling tea gardens with panoramic views. This room combines traditional Sri Lankan design with modern comfort.",
      images: [room1img1, room1img2],
      landscapeImage: sriLankaHighlands,
    },
    {
      name: "Room 3",
      description:
        "Nestled among misty highlands, this room offers a peaceful escape with traditional woodwork and stunning mountain views.",
      images: [room1img1, room1img2],
      landscapeImage: sriLankaHighlands,
    },
    {
      name: "Room 4",
      description:
        "Experience the mystique of cloud forests with this elevated retreat featuring glass walls and sustainable bamboo interiors.",
      images: [room1img1, room1img2],
      landscapeImage: sriLankaHighlands,
    },
    {
      name: "Room 5",
      description:
        "Perched on a hillside, this villa offers sweeping valley views and features traditional Sri Lankan architecture with modern amenities.",
      images: [room1img1, room1img2],
      landscapeImage: sriLankaHighlands,
    },
    {
      name: "Room 6",
      description:
        "Wake up to breathtaking sunrises in this east-facing pavilion with floor-to-ceiling windows and a private meditation deck.",
      images: [room1img1, room1img2],
      landscapeImage: sriLankaHighlands,
    },
    {
      name: "Room 7",
      description:
        "The highest accommodation on the property, this cabin is surrounded by clouds and offers unparalleled privacy and tranquility.",
      images: [room1img1, room1img2],
      landscapeImage: sriLankaHighlands,
    },
  ];

  // Handle wheel/scroll events with proper debouncing
  useEffect(() => {
    let isScrolling = false;
    let scrollBuffer = 0;
    const scrollThreshold = 100; // Minimum scroll delta needed to trigger room change
    let lastScrollTime = 0;
    const cooldownPeriod = 1000; // 1 second cooldown between room changes

    const handleWheel = (e) => {
      // Get the rooms container element
      const container = document.getElementById("rooms-container");
      if (!container) return;

      // Check if the scroll is happening within our container
      const rect = container.getBoundingClientRect();
      const isInContainer = e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (!isInContainer) return;

      const currentTime = Date.now();
      const scrollingUp = e.deltaY < 0;
      const scrollingDown = e.deltaY > 0;

      // Allow normal scrolling when at boundaries
      if (scrollingUp && currentRoom === 0) {
        // At first room, scrolling up - allow normal page scroll
        return;
      }

      if (scrollingDown && currentRoom === rooms.length - 1) {
        // At last room, scrolling down - allow normal page scroll
        return;
      }

      // If in cooldown period, prevent all scrolling
      if (currentTime - lastScrollTime < cooldownPeriod) {
        e.preventDefault();
        return;
      }

      // Prevent default scroll behavior
      e.preventDefault();
      e.stopPropagation();

      // Accumulate scroll delta
      scrollBuffer += Math.abs(e.deltaY);

      // Only change room if we've accumulated enough scroll and not currently transitioning
      if (scrollBuffer >= scrollThreshold && !isScrolling) {
        isScrolling = true;
        lastScrollTime = currentTime;
        scrollBuffer = 0; // Reset buffer

        // Handle room change
        if (scrollingDown && currentRoom < rooms.length - 1) {
          // Scroll down - next room
          setCurrentRoom((prev) => prev + 1);
          setCurrentImage(0); // Reset image carousel
        } else if (scrollingUp && currentRoom > 0) {
          // Scroll up - previous room
          setCurrentRoom((prev) => prev - 1);
          setCurrentImage(0); // Reset image carousel
        }

        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrolling = false;
        }, 600); // Match the transition duration
      }
    };

    // Add event listener to window for better scroll detection
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentRoom, rooms.length]);

  const currentRoomData = rooms[currentRoom];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % currentRoomData.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) =>
        (prev - 1 + currentRoomData.images.length) %
        currentRoomData.images.length
    );
  };

  return (
    <div
      id="rooms-container"
      className="text-white flex w-full h-screen overflow-hidden"
      style={{
        backgroundColor: "#1F2125",
        paddingTop: "80px", // Add padding to account for navbar
      }}
    >
      {/* Content Container - adjusted height */}
      <div className="w-full h-full flex items-center justify-center">
        <div
          className="w-full flex"
          style={{ height: "calc(100vh - 80px)" }} // Match the padding top
        >
          {/* Left Sidebar */}
          <div className="w-1/2 p-6 pr-4">
            {/* Progress Line */}
            <div className="flex items-start h-full">
              <div
                className="w-1 mr-6 flex-shrink-0 relative"
                style={{ height: "calc(100vh - 160px)" }} // Adjusted height for better proportion
              >
                {/* Background line */}
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-20"></div>

                {/* Progress segments */}
                {rooms.map((_, index) => {
                  const segmentHeight = 100 / rooms.length; // percentage per segment
                  const isActive = index === currentRoom;

                  return (
                    <div
                      key={index}
                      className={`absolute left-0 transition-all duration-600 ease-in-out ${
                        isActive
                          ? "w-1 bg-white opacity-100"
                          : "w-0.5 bg-white opacity-40"
                      }`}
                      style={{
                        top: `${index * segmentHeight}%`,
                        height: `${segmentHeight}%`,
                        boxShadow: isActive
                          ? "0px 0px 8.2px 0px #FFFFFF"
                          : "none",
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex-1 ml-12 flex justify-center">
                <div
                  style={{ width: "480px" }}
                  className="h-full flex flex-col" // Remove justify-center to allow manual spacing
                >
                  {/* Top spacer for better vertical centering */}
                  <div className="flex-1 min-h-0"></div>

                  {/* Room Number and Name */}
                  <div className="transition-all duration-600 ease-in-out transform">
                    <h2
                      className="mb-6"
                      style={{
                        fontFamily: "Lora",
                        fontWeight: 500,
                        fontSize: "40px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        textAlign: "left",
                      }}
                    >
                      {currentRoom + 1}. {currentRoomData.name}
                    </h2>

                    {/* Description */}
                    <p
                      className="mb-8 text-gray-300"
                      style={{
                        fontFamily: "Lora",
                        fontWeight: 400,
                        fontSize: "24px",
                        lineHeight: "40px",
                        letterSpacing: "0%",
                        textAlign: "justify",
                      }}
                    >
                      {currentRoomData.description}
                    </p>

                    {/* Landscape Image */}
                    <div className="mb-8">
                      <img
                        key={currentRoom} // Force re-render for smooth transition
                        src={currentRoomData.landscapeImage}
                        alt="Room landscape"
                        className="object-cover transition-all duration-600 ease-in-out transform hover:scale-105"
                        style={{
                          width: "480px",
                          height: "260px",
                        }}
                      />
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex-shrink-0 mt-6 mb-8">
                    <h3
                      className="text-xl font-medium mb-4"
                      style={{
                        fontFamily: "Inter",
                        fontWeight: 600,
                        fontSize: "22px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                      }}
                    >
                      DETAILS
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {/* Left Column */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={landscapeIcon}
                            alt="Guests"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 600,
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            2 Guests
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={creativeCommonsIcon}
                            alt="Private hot tub and fire pit"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 600,
                              fontSize: "16px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Private hot tub and fire pit
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={routerIcon}
                            alt="En-suite bathrooms"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 300,
                              fontSize: "14px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            En-suite bathrooms
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={landscapeIcon}
                            alt="Private balconies"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 300,
                              fontSize: "14px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Private balconies
                          </span>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <img
                            src={fireIcon}
                            alt="Room size"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            50sqm|538 sq ft
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={creativeCommonsIcon}
                            alt="Bed"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            1 king-size bed
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={routerIcon}
                            alt="Free Wi-Fi"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 300,
                              fontSize: "14px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Free Wi-Fi
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            src={fireIcon}
                            alt="Hot water"
                            className="w-4 h-4 filter brightness-0 invert"
                          />
                          <span
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 300,
                              fontSize: "14px",
                              lineHeight: "100%",
                              letterSpacing: "0%",
                            }}
                          >
                            Hot water
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom spacer for better vertical centering */}
                  <div className="flex-1 min-h-0"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Image Carousel */}
          <div className="w-1/2 relative">
            <div className="h-full relative overflow-hidden">
              <img
                key={`${currentRoom}-${currentImage}`} // Force re-render for smooth transition
                src={currentRoomData.images[currentImage]}
                alt={`${currentRoomData.name} view ${currentImage + 1}`}
                className="w-full h-full object-cover transition-all duration-600 ease-in-out transform"
              />

              {/* Navigation Arrows - Centered at bottom */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-8 items-center">
                <button
                  onClick={prevImage}
                  className="text-white p-3 rounded-full transition-all duration-300 hover:bg-opacity-20"
                  style={{
                    backgroundColor: "#FFFFFF1A",
                  }}
                >
                  <img
                    src={arrowLeftIcon}
                    alt="Previous"
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </button>

                <button
                  onClick={nextImage}
                  className="text-white p-3 rounded-full transition-all duration-300 hover:bg-opacity-20"
                  style={{
                    backgroundColor: "#FFFFFF1A",
                  }}
                >
                  <img
                    src={arrowRightIcon}
                    alt="Next"
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;

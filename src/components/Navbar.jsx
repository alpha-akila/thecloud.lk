import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("Home");

  const navItems = ["Home", "About", "Services"];

  // Scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        {
          id: "home-section",
          element: document.getElementById("home-section"),
          name: "Home",
        },
        {
          id: "about-section",
          element: document.getElementById("about-section"),
          name: "About",
        },
        {
          id: "NearByAttractions-section",
          element: document.getElementById("NearByAttractions-section"),
          name: "Services",
        },
        {
          id: "contact-section",
          element: document.getElementById("contact-section"),
          name: "Contact",
        },
      ];

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're at the very top (Home section)
      if (scrollPosition < 100) {
        setActiveItem("Home");
        return;
      }

      // Check if we're near the bottom (Contact section)
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveItem("Contact");
        return;
      }

      // Check each section's visibility
      let currentSection = "Home";

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          const elementTop = rect.top + scrollPosition;
          const elementHeight = rect.height;

          // Consider section active if it's in the upper portion of the viewport
          // Use a smaller offset for better detection
          if (
            scrollPosition >= elementTop - 300 &&
            scrollPosition < elementTop + elementHeight - 100
          ) {
            currentSection = section.name;
          }
        }
      }

      setActiveItem(currentSection);
    };

    // Add scroll event listener with throttling for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);

    // Call once to set initial state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  const handleNavClick = (item) => {
    // Temporarily set the active item for immediate visual feedback
    setActiveItem(item);

    // Scroll to specific sections
    if (item === "About") {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (item === "Services") {
      const servicesSection = document.getElementById(
        "NearByAttractions-section"
      );
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else if (item === "Home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // Note: The scroll event listener will automatically update the active state
    // once the scrolling animation completes
  };

  const handleContactClick = () => {
    // Temporarily set active item for immediate visual feedback
    setActiveItem("Contact");

    const contactSection = document.getElementById("contact-section");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    // Note: The scroll event listener will automatically update the active state
    // once the scrolling animation completes
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-20"
      style={{
        background: "#1F212505 2%",
        backdropFilter: "blur(100px)",
        border: "1px solid #FFFFFF66 40%",
      }}
    >
      <div className="mx-auto px-28 py-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div
            className="text-white"
            style={{
              fontFamily: "Krona One",
              fontWeight: 400,
              fontSize: "1.5rem",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            <a href="/">The Cloud Hanthana</a>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item)}
                className={`relative text-white/90 hover:text-white transition-colors duration-300 py-2 px-1 ${
                  activeItem === item ? "text-white" : ""
                }`}
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "1.5rem",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {item}
                {activeItem === item && (
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-white rounded-full"
                    style={{
                      bottom: "-1rem",
                      boxShadow: "0px 0px 10px 0px #FFFFFF",
                    }}
                  ></div>
                )}
              </button>
            ))}
          </div>

          {/* Contact Button */}
          <div className="relative">
            <button
              onClick={handleContactClick}
              className={`transition-colors duration-300 px-8 py-3 rounded-full ${
                activeItem === "Contact"
                  ? "bg-white text-gray-800"
                  : "bg-white text-gray-800 hover:bg-gray-100"
              }`}
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "1.5rem",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Contact
            </button>
            {activeItem === "Contact" && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 h-0.5 bg-white rounded-full"
                style={{
                  bottom: "-1rem",
                  width: "3.5rem",
                  boxShadow: "0px 0px 10px 0px #FFFFFF",
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

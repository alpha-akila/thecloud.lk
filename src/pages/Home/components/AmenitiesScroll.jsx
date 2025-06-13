import React from "react";
import routerIcon from "../../../assets/icons/router-line.svg";
import bathroomIcon from "../../../assets/icons/creative-commons-by-line.svg";
import landscapeIcon from "../../../assets/icons/landscape-line.svg";
import brushIcon from "../../../assets/icons/brush-2-line.svg";
import fireIcon from "../../../assets/icons/fire-line.svg";

const AmenitiesScroll = () => {
  const amenities = [
    { name: "Free Wi-Fi", icon: routerIcon },
    { name: "Hot water", icon: fireIcon },
    { name: "Private balconies", icon: landscapeIcon },
    { name: "Daily housekeeping", icon: brushIcon },
    { name: "En-suite bathrooms", icon: bathroomIcon },
  ];

  return (
    <div className="mt-13 max-w-242 mx-auto overflow-hidden">
      <div className="flex animate-scroll whitespace-nowrap">
        <div className="flex items-center space-x-12 text-white/70">
          {/* Duplicate amenities for seamless loop */}
          {[...amenities, ...amenities].map((amenity, index) => (
            <span key={index} className="flex items-center space-x-3">
              <img
                src={amenity.icon}
                alt={amenity.name}
                className="w-8 h-8"
                style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
              />
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 300,
                  fontSize: "2rem",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {amenity.name}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesScroll;

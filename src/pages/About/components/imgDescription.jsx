import React from "react";
import roadsterIcon from "../../../assets/icons/roadster-line.svg";
import arrowRightIcon from "../../../assets/icons/arrow-right-line.svg";

const ImgDescription = ({ title, driveTime, distance }) => {
  return (
    <div
      className="text-white px-8 py-6 bg-gray-900"
      style={{
        height: "6.25rem",
        backgroundColor: "#1F2125",
        opacity: 0.8,
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="mx-auto h-full flex flex-col justify-center items-start">
        {/* Title at the top */}
        <h2
          className="text-white"
          style={{
            fontFamily: "Lora",
            fontWeight: 600,
            fontSize: "2rem",
            lineHeight: "100%",
            letterSpacing: "0%",
            textAlign: "left",
          }}
        >
          {title}
        </h2>

        {/* Distance and Explore Button below */}
        <div className="flex items-center justify-between w-full mt-1">
          <div className="flex items-center space-x-3">
            <img
              src={roadsterIcon}
              alt="Car"
              className="w-8 h-8 filter brightness-0 invert"
            />
            <span
              className=" text-white"
              style={{
                fontFamily: "Inter",
                fontWeight: 300,
                fontSize: "1.5rem",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {driveTime}
              </span>{" "}
              Minutes Drive{" "}
              <span
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  lineHeight: "100%",
                  letterSpacing: "0%",
                }}
              >
                {distance}
              </span>
            </span>
          </div>

          {/* Right Side - Explore Button */}
          <button className="flex items-center space-x-3 hover:text-gray-300 transition-colors duration-300 group">
            <span
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: "1.5rem",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              EXPLORE
            </span>
            <img
              src={arrowRightIcon}
              alt="Arrow Right"
              className="w-8 h-8 filter brightness-0 invert group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImgDescription;

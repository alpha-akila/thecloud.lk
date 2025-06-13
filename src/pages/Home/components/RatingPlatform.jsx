import starIcon from "../../../assets/icons/star-half-line.svg";

const RatingPlatform = ({ platform, rating, maxRating, url }) => {
  const handleClick = () => {
    window.open(url, "_blank");
  };

  return (
    <div
      className="text-center text-white/90 cursor-pointer hover:text-white hover:scale-105 transition-all duration-300"
      onClick={handleClick}
    >
      <div
        className="text-2xl font-bold mb-1 flex items-center justify-center gap-2"
        style={{
          fontFamily: "Inter",
          fontWeight: 900,
          fontSize: "2rem",
          lineHeight: "100%",
          letterSpacing: "0%",
        }}
      >
        {rating}/{maxRating}
        <img
          src={starIcon}
          alt="star"
          className="w-8 h-8"
          style={{ filter: "brightness(0) saturate(100%) invert(100%)" }}
        />
      </div>
      <div
        className="text-sm opacity-80"
        style={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "2rem",
          lineHeight: "100%",
          letterSpacing: "0%",
        }}
      >
        {platform}
      </div>
    </div>
  );
};

export default RatingPlatform;

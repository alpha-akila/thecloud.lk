import React, { useState, useEffect } from "react";
import arrowLeftIcon from "../../assets/icons/arrow-left-double-line.svg";
import arrowRightIcon from "../../assets/icons/arrow-right-double-line.svg";
import instagramIcon from "../../assets/icons/instagram-line.svg";
// import "./gallery.css"; 

const Gallery = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalPages = 3;

  // Sample gallery images
  const galleryImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=400&fit=crop",
  ];

  // Load sample testimonials (Google Places API can't be called directly from browser due to CORS)
  useEffect(() => {
    const loadSampleTestimonials = () => {
      // Sample testimonials based on actual reviews
      const sampleTestimonials = [
        {
          text: "Nice place with a great view from the balcony and the rooftop. About 3 km to city center. There is a car parking place as well. Daniel warmly meets us in the evening and prepares tasty breakfast in...",
          author: "Olga",
          rating: 5,
          country: "Russia",
          flag: "🇷🇺",
        },
        {
          text: "Amazing hospitality and stunning mountain views! The minimalist design perfectly complements the natural beauty surrounding the property. Breakfast was exceptional and the staff went above and beyond...",
          author: "Marcus",
          rating: 5,
          country: "Germany",
          flag: "🇩🇪",
        },
        {
          text: "Perfect retreat for a peaceful getaway. The rooms are beautifully designed with sustainable materials, and the location offers incredible sunset views. Would definitely recommend to anyone...",
          author: "Sarah",
          rating: 4,
          country: "Australia",
          flag: "🇦🇺",
        },
        {
          text: "Exceptional service and breathtaking location! The eco-friendly approach and locally sourced materials create a unique atmosphere. The team made our stay unforgettable with their attention to detail...",
          author: "James",
          rating: 5,
          country: "United Kingdom",
          flag: "🇬🇧",
        },
        {
          text: "A hidden gem in the mountains! The minimalist design is stunning and the views are spectacular. Perfect place for a romantic getaway or peaceful retreat from city life...",
          author: "Emma",
          rating: 5,
          country: "Canada",
          flag: "🇨🇦",
        },
        {
          text: "Wonderful experience at Cloud Hanthana! The sustainable practices and beautiful architecture make this place special. Great location for exploring Kandy and the surrounding tea plantations...",
          author: "Philippe",
          rating: 4,
          country: "France",
          flag: "🇫🇷",
        },
      ];
      setTestimonials(sampleTestimonials);
      setLoading(false);
    };

    loadSampleTestimonials();
  }, []);

  // Helper function to render star ratings
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-sm ${
          index < rating ? "text-yellow-400" : "text-gray-600"
        }`}
      >
        ★
      </span>
    ));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : 1));
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : totalPages));
  };

  return (
    <div className="text-white relative" style={{ backgroundColor: "#1F2125" }}>
      {/* Instagram Feed Section */}
      <div className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p
              className="text-sm uppercase tracking-wider text-white mb-4"
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "28px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              INSTAGRAM FEED
            </p>
            <h2
              className="text-5xl font-light"
              style={{
                fontFamily: "Lora",
                fontWeight: 400,
                fontSize: "80px",
                lineHeight: "100%",
                letterSpacing: "0%",
                textAlign: "center",
              }}
            >
              Relax In The Comfort
              <br />
              Of Our Hotel
            </h2>
          </div>

          {/* Gallery Grid with Alternating Image Heights */}
          <div className="flex gap-2">
            {/* Create 4 columns manually to ensure proper alternating pattern */}
            {[0, 1, 2, 3].map((colIndex) => (
              <div key={colIndex} className="flex-1 flex flex-col gap-2">
                {galleryImages
                  .filter((_, index) => index % 4 === colIndex)
                  .map((image, imageIndex) => {
                    const actualIndex = colIndex + imageIndex * 4;
                    const rowIndex = imageIndex;

                    // First row pattern: tall-short-tall-short
                    // Second row pattern: short-tall-short-tall
                    const isTall =
                      rowIndex % 2 === 0
                        ? colIndex % 2 === 0 // First row: even columns are tall
                        : colIndex % 2 === 1; // Second row: odd columns are tall

                    return (
                      <div
                        key={actualIndex}
                        className="overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer relative group"
                        style={{
                          height: isTall ? "300px" : "200px",
                        }}
                      >
                        <img
                          src={image}
                          alt={`Gallery image ${actualIndex + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Hover overlay with Instagram icon */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          style={{ backgroundColor: "#FFFFFF33" }}
                        >
                          <img
                            src={instagramIcon}
                            alt="Instagram"
                            className="w-8 h-8 filter brightness-0 invert"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 px-8" style={{ backgroundColor: "#1F2125" }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className="text-5xl font-light mb-6"
              style={{
                fontFamily: "Lora",
                fontWeight: 400,
                fontSize: "80px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              What people say
            </h2>
            <p
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              style={{
                fontFamily: "Lora",
                fontWeight: 400,
                fontSize: "28px",
                lineHeight: "100%",
                letterSpacing: "0%",
              }}
            >
              Discover what our satisfied customers have to say
              <br />
              about their experiences with our products / services
            </p>
          </div>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="text-center text-gray-400">Loading reviews...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: 6 }, (_, index) => {
                const testimonial = testimonials[index % testimonials.length];
                return (
                  <div
                    key={index}
                    className="p-6 hover:bg-opacity-80 transition-colors duration-300 flex flex-col justify-between"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 26.44%, rgba(66, 158, 194, 0.1) 80.77%)",
                      width: "400px",
                      height: "250px",
                      borderRadius: "38px",
                    }}
                  >
                    <blockquote
                      className="text-gray-300 leading-relaxed"
                      style={{
                        fontFamily: "Lora",
                        fontWeight: 400,
                        fontSize: "20px",
                        lineHeight: "100%",
                        letterSpacing: "0%",
                        textAlign: "center",
                      }}
                    >
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <span
                          className="font-medium"
                          style={{
                            fontFamily: "Inter",
                            fontWeight: 600,
                            fontSize: "20px",
                            lineHeight: "100%",
                            letterSpacing: "0%",
                            textAlign: "center",
                          }}
                        >
                          ✍... {testimonial.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {testimonial.flag && (
                          <>
                            <span className="text-xl">{testimonial.flag}</span>
                            <span
                              className="text-sm text-gray-400"
                              style={{
                                fontFamily: "Inter",
                                fontWeight: 600,
                                fontSize: "20px",
                                lineHeight: "100%",
                                letterSpacing: "0%",
                                textAlign: "center",
                              }}
                            >
                              {testimonial.country}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevPage}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <img
                src={arrowLeftIcon}
                alt="Previous"
                className="w-6 h-6 filter brightness-0 invert"
              />
            </button>

            <div className="flex space-x-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10 rounded-full transition-colors duration-300 text-white"
                  style={{
                    backgroundColor:
                      currentPage === page ? "#FFFFFF80" : "#FFFFFF1A",
                    backdropFilter:
                      currentPage === page ? "blur(100px)" : "none",
                  }}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <img
                src={arrowRightIcon}
                alt="Next"
                className="w-6 h-6 filter brightness-0 invert"
              />
            </button>
          </div>

          {/* Decorative white line below pagination */}
          <div className="mt-8">
            <div className="w-full h-px bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;

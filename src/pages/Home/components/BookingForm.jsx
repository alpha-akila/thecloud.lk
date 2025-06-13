import React, { useState } from "react";
import calendarIcon from "../../../assets/icons/calendar-2-line.svg";
import usersIcon from "../../../assets/icons/group-3-line.svg";

const BookingForm = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);
  const [showGuestPicker, setShowGuestPicker] = useState(false);

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const handleDateSelect = (date, isCheckIn) => {
    if (isCheckIn) {
      setCheckInDate(date);
      setShowCheckInPicker(false);
      // Auto-set checkout to next day if it's before or same as check-in
      if (checkOutDate <= date) {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + 1);
        setCheckOutDate(nextDay);
      }
    } else {
      // Only allow checkout dates after check-in
      if (date > checkInDate) {
        setCheckOutDate(date);
      }
      setShowCheckOutPicker(false);
    }
  };

  const handleGuestSelect = (guestCount) => {
    setGuests(guestCount);
    setShowGuestPicker(false);
  };

  const generateCalendarDays = (isCheckIn) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today;
      const isSelected = isCheckIn
        ? date.toDateString() === checkInDate.toDateString()
        : date.toDateString() === checkOutDate.toDateString();
      const isDisabled = isPast || (!isCheckIn && date <= checkInDate);

      days.push(
        <button
          key={day}
          onClick={() => !isDisabled && handleDateSelect(date, isCheckIn)}
          disabled={isDisabled}
          className={`w-8 h-8 text-sm rounded-full transition-all duration-200 ${
            isSelected
              ? "bg-white text-black font-bold"
              : isToday
              ? "bg-white/20 text-white font-semibold"
              : isDisabled
              ? "text-gray-500 cursor-not-allowed"
              : "text-white hover:bg-white/10"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const checkInFormatted = formatDate(checkInDate);
  const checkOutFormatted = formatDate(checkOutDate);

  const handleBookingRedirect = () => {
    // Format dates for Booking.com (YYYY-MM-DD)
    const formatDateForBooking = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const checkInFormatted = formatDateForBooking(checkInDate);
    const checkOutFormatted = formatDateForBooking(checkOutDate);

    // Build the Booking.com URL with dynamic parameters
    const baseUrl =
      "https://www.booking.com/hotel/lk/the-cloud-hanthana-kandy.en-us.html";
    const params = new URLSearchParams({
      aid: "1549630",
      label:
        "bckbtn-clicktrip-bn-n37-030625-the_cloud_hanthana_kandy-i18694353-s119021-w4h1RCY1GhE1HZF4N-cu_tab-d1103-dc3",
      sid: "8ae2068c183d451201118d1d6f0ffa4b",
      all_sr_blocks: "1031380007_376056652_2_42_0",
      checkin: checkInFormatted,
      checkout: checkOutFormatted,
      dest_id: "10313800",
      dest_type: "hotel",
      dist: "0",
      group_adults: guests.toString(),
      group_children: "0",
      hapos: "1",
      highlighted_blocks: "1031380007_376056652_2_42_0",
      hpos: "1",
      matching_block_id: "1031380007_376056652_2_42_0",
      no_rooms: "1",
      req_adults: guests.toString(),
      req_children: "0",
      room1: "A%2CA",
      sb_price_type: "total",
      sr_order: "popularity",
      sr_pri_blocks: "1031380007_376056652_2_42_0__3010",
      srepoch: "1748971456",
      srpvid: "52527a5e8df800f0",
      type: "total",
      ucfs: "1",
    });

    const bookingUrl = `${baseUrl}?${params.toString()}#hotelTmpl`;

    // Open in new tab
    window.open(bookingUrl, "_blank");
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-2 rounded-xl relative">
      <div className="relative">
        <button
          onClick={() => {
            setShowCheckInPicker(!showCheckInPicker);
            setShowCheckOutPicker(false);
          }}
          className="backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg px-11 py-2.5 border border-transparent text-white min-w-88"
          style={{
            backgroundColor: "#D9D9D90D",
            boxShadow: "0px 0px 20px 2px #00000040",
            borderRadius: "10px",
          }}
        >
          <div className="flex items-center space-x-2">
            <img
              src={calendarIcon}
              alt="Calendar"
              className="w-12 h-12 filter brightness-0 invert flex-shrink-0"
            />
            <div className="flex flex-col justify-center text-left">
              <div className="text-2xl opacity-80 text-left">
                Check in date:
              </div>
              <div className="text-lg font-medium text-left">
                <span
                  className="text-white/70"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "2rem",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {checkInFormatted.day}{" "}
                </span>
                <span
                  className="text-white/70"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {checkInFormatted.month} {checkInFormatted.year}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Check-in Date Picker */}
        {showCheckInPicker && (
          <div
            className="absolute bottom-full mb-2 left-0 z-50 backdrop-blur-sm rounded-lg p-4 border border-white/30"
            style={{
              backgroundColor: "#1F2125CC",
              boxShadow: "0px 4px 20px 0px #00000040",
            }}
          >
            <div className="text-white text-center mb-3 font-medium">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-white text-xs text-center mb-2">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays(true)}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => {
            setShowCheckOutPicker(!showCheckOutPicker);
            setShowCheckInPicker(false);
          }}
          className="backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg px-11 py-2.5 border border-transparent text-white min-w-88"
          style={{
            backgroundColor: "#D9D9D90D",
            boxShadow: "0px 0px 20px 2px #00000040",
            borderRadius: "10px",
          }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={calendarIcon}
              alt="Calendar"
              className="w-12 h-12 filter brightness-0 invert flex-shrink-0"
            />
            <div className="flex flex-col justify-center text-left">
              <div className="text-2xl opacity-80 text-left">
                Check out date:
              </div>
              <div className="text-lg font-medium text-left">
                <span
                  className="text-white/70"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 700,
                    fontSize: "2rem",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {checkOutFormatted.day}{" "}
                </span>
                <span
                  className="text-white/70"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {checkOutFormatted.month} {checkOutFormatted.year}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Check-out Date Picker */}
        {showCheckOutPicker && (
          <div
            className="absolute bottom-full mb-2 left-0 z-50 backdrop-blur-sm rounded-lg px-11 py-2.5  border border-white/30"
            style={{
              backgroundColor: "#1F2125CC",
              boxShadow: "0px 4px 20px 0px #00000040",
            }}
          >
            <div className="text-white text-center mb-3 font-medium">
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-white text-xs text-center mb-2">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays(false)}
            </div>
          </div>
        )}
      </div>

      {/* Guest Selection */}
      <div className="relative">
        <button
          onClick={() => {
            setShowGuestPicker(!showGuestPicker);
            setShowCheckInPicker(false);
            setShowCheckOutPicker(false);
          }}
          className="backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg px-11 py-2.5  border border-transparent text-white min-w-70"
          style={{
            backgroundColor: "#D9D9D90D",
            boxShadow: "0px 0px 20px 2px #00000040",
            borderRadius: "10px",
          }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={usersIcon}
              alt="Users"
              className="w-12 h-12 filter brightness-0 invert flex-shrink-0"
            />
            <div className="flex flex-col justify-center text-left">
              <div className="text-2xl opacity-80 text-left">Guest:</div>
              <div className="text-lg font-medium text-left">
                <span>
                  <span
                    className="text-white/70"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 700,
                      fontSize: "2rem",
                      lineHeight: "100%",
                      letterSpacing: "0%",
                    }}
                  >
                    {guests}{" "}
                  </span>
                </span>
                <span
                  className="text-white/70"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "1.5rem",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                  }}
                >
                  {guests === 1 ? "Guest" : "Guests"}
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* Guest Picker */}
        {showGuestPicker && (
          <div
            className="absolute bottom-full mb-2 left-0 z-50 backdrop-blur-sm rounded-lg px-11 py-2.5  border border-white/30 min-w-84"
            style={{
              backgroundColor: "#1F2125CC",
              boxShadow: "0px 4px 20px 0px #00000040",
            }}
          >
            <div className="text-white text-center mb-3 font-medium text-4xl">
              Select Guests
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((guestCount) => (
                <button
                  key={guestCount}
                  onClick={() => handleGuestSelect(guestCount)}
                  className={`w-10 h-10 text-sm rounded-lg transition-all duration-200 ${
                    guests === guestCount
                      ? "bg-white text-black font-bold"
                      : "text-white hover:bg-white/10 border border-white/20"
                  }`}
                >
                  {guestCount}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Find Details Button */}
      <button
        onClick={handleBookingRedirect}
        className="backdrop-blur-sm hover:bg-white/20 transition-all duration-300 rounded-lg px-10 py-3 border border-transparent  text-white font-medium cursor-pointer"
        style={{
          backgroundColor: "#D9D9D90D",
          boxShadow: "0px 0px 20px 2px #00000040",
          borderRadius: "10px",
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
          Find Details
        </span>
      </button>

      {/* Click outside to close pickers */}
      {(showCheckInPicker || showCheckOutPicker || showGuestPicker) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowCheckInPicker(false);
            setShowCheckOutPicker(false);
            setShowGuestPicker(false);
          }}
        />
      )}
    </div>
  );
};

export default BookingForm;

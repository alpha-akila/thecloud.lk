import RatingPlatform from "./RatingPlatform";

const RatingsSection = () => {
  // Helper function to get current date and a more realistic checkout date
  const getCurrentDates = () => {
    const today = new Date();
    const checkout = new Date(today);
    checkout.setDate(checkout.getDate() + 2); // 2-night stay is more typical

    return { today, checkout };
  };

  // Format date for different platforms
  const formatDateForBooking = (date) => {
    // Format: YYYY-MM-DD
    return date.toISOString().split("T")[0];
  };

  const formatDateForPlanetOfHotels = (date) => {
    // Format: YYYY-MM-DD
    return date.toISOString().split("T")[0];
  };

  const formatDateForMakeMyTrip = (date) => {
    // Format: MMDDYYYY
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}${day}${year}`;
  };

  const formatDateForGoibibo = (date) => {
    // Format: YYYYMMDD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const { today, checkout } = getCurrentDates();

  const ratings = [
    {
      platform: "Booking.com",
      rating: "8.9",
      maxRating: "10",
      url: `https://www.booking.com/hotel/lk/the-cloud-hanthana-kandy.html?aid=304142&label=gen173rf-1FCAEoggI46AdIM1gDaIUBiAEBmAExuAEHyAEM2AEB6AEB-AECiAIBogIObG9jYWxob3N0OjUxNzOoAgO4AqLgkMIGwAIB0gIkNDIzZWJkYjgtZDlkMC00YThjLWI0MmEtMmNiYjRhY2YwYTMz2AIF4AIB&sid=8ae2068c183d451201118d1d6f0ffa4b&all_sr_blocks=1031380007_376056652_2_42_0&checkin=${formatDateForBooking(
        today
      )}&checkout=${formatDateForBooking(
        checkout
      )}&dest_id=10313800&dest_type=hotel&dist=0&group_adults=2&group_children=0&hapos=1&highlighted_blocks=1031380007_376056652_2_42_0&hpos=1&matching_block_id=1031380007_376056652_2_42_0&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&sr_pri_blocks=1031380007_376056652_2_42_0__2580&srepoch=1749299466&srpvid=6d7158033f16037c&type=total&ucfs=1&`,
    },
    {
      platform: "Tripadvisor.com",
      rating: "5",
      maxRating: "5",
      url: "https://www.tripadvisor.com/Hotel_Review-g304138-d33023880-Reviews-The_Cloud_Hanthana-Kandy_Kandy_District_Central_Province.html",
    },
    {
      platform: "planetofhotels.com",
      rating: "9",
      maxRating: "10",
      url: `https://en.planetofhotels.com/sri-lanka/kandy/cloud-hanthana-kandy?checkin=${formatDateForPlanetOfHotels(
        today
      )}&checkout=${formatDateForPlanetOfHotels(checkout)}&rooms[0][adults]=2`,
    },
    {
      platform: "makemytrip.com",
      rating: "9",
      maxRating: "10",
      url: `https://www.makemytrip.com/hotels/hotel-details/?hotelId=202310201350342290&_uCurrency=INR&checkin=${formatDateForMakeMyTrip(
        today
      )}&checkout=${formatDateForMakeMyTrip(
        checkout
      )}&city=CTKANDY&country=SRI&lat=7.27809&lng=80.62642&locusId=CTKANDY&locusType=city&rank=1&regionNearByExp=3&roomStayQualifier=2e0e&rsc=1e2e0e&searchText=The+Cloud+Hanthana%2C+Kandy&topHtlId=202310201350342290&mtkeys=undefined&isPropSearch=T`,
    },
    {
      platform: "airbnb.com",
      rating: "4.9",
      maxRating: "5",
      url: "https://www.airbnb.com/",
    },
    {
      platform: "goibibo.com",
      rating: "4.9",
      maxRating: "5",
      url: `https://www.goibibo.com/hotels-international/the-cloud-hanthana-kandy-hotel-in-kandy-426090133628648824/?hquery={%22ci%22:%22${formatDateForGoibibo(
        today
      )}%22,%22co%22:%22${formatDateForGoibibo(
        checkout
      )}%22,%22r%22:%221-2-0%22,%22ibp%22:%22%22}&cc=SRI&vcid=3579083667265584084&locusId=CTKANDY&locusType=city&cityCode=CTKANDY&mmtId=202310201350342290&FS=GSU&city=Kandy`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mt-10">
      {ratings.map((item, index) => (
        <RatingPlatform
          key={index}
          platform={item.platform}
          rating={item.rating}
          maxRating={item.maxRating}
          url={item.url}
        />
      ))}
    </div>
  );
};

export default RatingsSection;

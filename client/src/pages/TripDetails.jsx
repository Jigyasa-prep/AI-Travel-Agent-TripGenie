import { useEffect, useState } from "react";

function TripDetails() {
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    const savedTrip = JSON.parse(localStorage.getItem("trip"));
    setTrip(savedTrip);
  }, []);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Loading...</h1>
      </div>
    );
  }

  const itinerary = [
    {
      day: "Day 1",
      activities: [
        "🏖️ Explore local attractions",
        "🍽️ Try famous local food",
        "🌅 Enjoy sunset viewpoint",
      ],
    },
    {
      day: "Day 2",
      activities: [
        "📸 Visit popular sightseeing spots",
        "🛍️ Explore local markets",
        "🎭 Experience local culture",
      ],
    },
    {
      day: "Day 3",
      activities: [
        "🚴 Adventure activities",
        "☕ Relax at scenic cafes",
        "🎁 Souvenir shopping",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-5xl font-bold mb-4">
            ✈️ Your Trip to {trip.destination}
          </h1>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <h3 className="font-bold text-lg">💰 Budget</h3>
              <p>₹{trip.budget}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <h3 className="font-bold text-lg">📅 Days</h3>
              <p>{trip.days} Days</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl">
              <h3 className="font-bold text-lg">🎯 Interest</h3>
              <p>{trip.interest}</p>
            </div>
          </div>
        </div>

        {/* Itinerary Section */}
        <h2 className="text-3xl font-bold mb-6">
          🗺️ Day-wise Itinerary
        </h2>

        <div className="grid gap-6">
          {itinerary.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-600">
                {item.day}
              </h3>

              <ul className="space-y-3">
                {item.activities.map((activity, i) => (
                  <li
                    key={i}
                    className="bg-gray-50 p-3 rounded-lg"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default TripDetails;
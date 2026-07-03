import { useState } from "react";

function TripDetails() {
  const [trip] = useState(() =>
    JSON.parse(localStorage.getItem("trip"))
  );

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold">No Trip Found 😔</h1>
      </div>
    );
  }

  const totalDays = Number(trip.days);

  const itinerary = Array.from(
    { length: totalDays },
    (_, index) => ({
      day: `Day ${index + 1}`,
      activities: [
        `🏖️ Explore attractions on Day ${index + 1}`,
        `🍽️ Enjoy local food on Day ${index + 1}`,
        `📸 Visit famous places on Day ${index + 1}`,
      ],
    })
  );
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">
          <h1 className="text-5xl font-bold text-center mb-8">
            ✈️ Trip to {trip.destination}
          </h1>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold">💰 Budget</h3>
              <p className="text-2xl mt-2 font-semibold">
                ₹{trip.budget}
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold">📅 Days</h3>
              <p className="text-2xl mt-2 font-semibold">
                {trip.days}
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold">🎯 Interest</h3>
              <p className="text-2xl mt-2 font-semibold">
                {trip.interest}
              </p>
            </div>

          </div>
        </div>

        {/* Itinerary */}
        <h2 className="text-4xl font-bold mb-6">
          🗺️ Day-wise Itinerary
        </h2>

        <div className="space-y-6 mb-12">
          {itinerary.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h2 className="text-2xl font-bold text-blue-600 mb-4">
                {item.day}
              </h2>

              <ul className="space-y-3">
                {item.activities.map((activity, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 p-3 rounded-lg"
                  >
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Hotels */}

        <h2 className="text-4xl font-bold mb-6">
          🏨 Recommended Hotels
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-12">

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
            <h3 className="text-2xl font-bold">
              ⭐ Hotel Snow View
            </h3>

            <p className="mt-3 text-lg">
              ⭐⭐⭐⭐☆
            </p>

            <p className="mt-3">
              💰 ₹2500 / Night
            </p>

            <p>
              📍 Near City Center
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition">
            <h3 className="text-2xl font-bold">
              ⭐ Himalayan Resort
            </h3>

            <p className="mt-3 text-lg">
              ⭐⭐⭐⭐⭐
            </p>

            <p className="mt-3">
              💰 ₹3500 / Night
            </p>

            <p>
              📍 Mountain View
            </p>
          </div>

        </div>

        {/* Food */}

        <h2 className="text-4xl font-bold mb-6">
          🍴 Must Try Foods
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-orange-100 p-4 rounded-xl">
              🍜 Local Noodles
            </div>

            <div className="bg-orange-100 p-4 rounded-xl">
              🥟 Momos
            </div>

            <div className="bg-orange-100 p-4 rounded-xl">
              ☕ Local Tea
            </div>

            <div className="bg-orange-100 p-4 rounded-xl">
              🍛 Traditional Thali
            </div>

          </div>

        </div>

        {/* Budget */}

        <h2 className="text-4xl font-bold mb-6">
          💰 Budget Breakdown
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">

          <div className="space-y-4">

            <div className="flex justify-between">
              <span>🏨 Hotels</span>
              <span>₹12,000</span>
            </div>

            <div className="flex justify-between">
              <span>🍴 Food</span>
              <span>₹5,000</span>
            </div>

            <div className="flex justify-between">
              <span>🚕 Transport</span>
              <span>₹8,000</span>
            </div>

            <div className="flex justify-between">
              <span>🛍️ Shopping</span>
              <span>₹5,000</span>
            </div>

          </div>

        </div>

        {/* Tips */}

        <h2 className="text-4xl font-bold mb-6">
          📝 Travel Tips
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <ul className="space-y-3">

            <li>✅ Carry ID Proof</li>

            <li>✅ Keep Emergency Cash</li>

            <li>✅ Start sightseeing early</li>

            <li>✅ Check local weather before travelling</li>

            <li>✅ Keep your phone charged</li>

          </ul>

        </div>

      </div>
    </div>
  );
}

export default TripDetails;
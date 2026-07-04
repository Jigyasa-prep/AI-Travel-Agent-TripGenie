import { useState } from "react";

function TripDetails() {
  const [trip] = useState(() =>
    JSON.parse(localStorage.getItem("trip"))
  );

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold">
          No Trip Found 😔
        </h1>
      </div>
    );
  }

  const totalDays = Number(trip.days) || 1;

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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-sky-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

          <h1 className="text-5xl font-bold text-center text-blue-700">
            ✈️ Trip to {trip.destination}
          </h1>

          <p className="text-center text-gray-500 mt-3">
            Your Personalized AI Travel Plan
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-blue-50 rounded-2xl p-6 text-center shadow">
              <h3 className="text-xl font-bold">
                💰 Budget
              </h3>

              <p className="text-3xl font-semibold mt-2">
                ₹{trip.budget}
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 text-center shadow">
              <h3 className="text-xl font-bold">
                📅 Days
              </h3>

              <p className="text-3xl font-semibold mt-2">
                {trip.days}
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-6 text-center shadow">
              <h3 className="text-xl font-bold">
                🎯 Interest
              </h3>

              <p className="text-2xl font-semibold mt-2">
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
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >

              <h3 className="text-2xl font-bold text-blue-600 mb-4">
                {item.day}
              </h3>

              <ul className="space-y-3">

                {item.activities.map((activity, i) => (

                  <li
                    key={i}
                    className="bg-gray-100 rounded-xl p-3"
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

            <p className="text-lg mt-3">
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

            <p className="text-lg mt-3">
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

            <div className="bg-orange-100 rounded-xl p-4 font-semibold">
              🍜 Local Noodles
            </div>

            <div className="bg-orange-100 rounded-xl p-4 font-semibold">
              🥟 Momos
            </div>

            <div className="bg-orange-100 rounded-xl p-4 font-semibold">
              ☕ Local Tea
            </div>

            <div className="bg-orange-100 rounded-xl p-4 font-semibold">
              🍛 Traditional Thali
            </div>

          </div>

        </div>

        {/* Budget Breakdown */}

        <h2 className="text-4xl font-bold mb-6">
          💰 Budget Breakdown
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-2">
              <span>🏨 Hotels</span>
              <span>₹12,000</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>🍴 Food</span>
              <span>₹5,000</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>🚕 Transport</span>
              <span>₹8,000</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>🛍️ Shopping</span>
              <span>₹5,000</span>
            </div>

            <div className="flex justify-between text-xl font-bold text-green-600 pt-2">
              <span>Total Budget</span>
              <span>₹{trip.budget}</span>
            </div>

          </div>

        </div>

        {/* Travel Tips */}

        <h2 className="text-4xl font-bold mb-6">
          📝 Travel Tips
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

          <ul className="space-y-4">

            <li className="bg-green-100 rounded-lg p-3">
              ✅ Carry your ID proof and travel documents.
            </li>

            <li className="bg-blue-100 rounded-lg p-3">
              ✅ Keep emergency cash and digital payment options.
            </li>

            <li className="bg-yellow-100 rounded-lg p-3">
              ✅ Start sightseeing early to avoid crowds.
            </li>

            <li className="bg-purple-100 rounded-lg p-3">
              ✅ Check the weather forecast before leaving.
            </li>

            <li className="bg-pink-100 rounded-lg p-3">
              ✅ Keep your phone charged and carry a power bank.
            </li>

          </ul>

        </div>

      </div>
    </div>
  );
}

export default TripDetails;
import { useState } from "react";

function TripDetails() {
  const [trip] = useState(() =>
    JSON.parse(localStorage.getItem("trip"))
  );

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          No Trip Found
        </h1>
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

  console.log("Trip:", trip);
  console.log("Days:", totalDays);
  console.log("Itinerary:", itinerary);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h1 className="text-5xl font-bold mb-4">
            ✈️ Your Trip to {trip.destination}
          </h1>

          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-bold">💰 Budget</h3>
              <p>₹{trip.budget}</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="font-bold">📅 Days</h3>
              <p>{trip.days}</p>
            </div>

            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="font-bold">🎯 Interest</h3>
              <p>{trip.interest}</p>
            </div>

          </div>
        </div>

        <h2 className="text-3xl font-bold mb-2">
          🗺️ Day-wise Itinerary
        </h2>

        <p className="text-red-600 text-xl mb-6">
          Total Cards: {itinerary.length}
        </p>

        <div className="space-y-6">

          {itinerary.map((item, index) => {
            console.log("Rendering:", item.day);

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                  {item.day}
                </h2>

                <ul className="space-y-2">
                  {item.activities.map((activity, i) => (
                    <li
                      key={i}
                      className="bg-gray-100 rounded-lg p-3"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}

export default TripDetails;
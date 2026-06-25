import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    destination: "",
    budget: "",
    days: "",
    interest: "",
  });

  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log("Saving Trip:", tripData);

  localStorage.setItem(
    "trip",
    JSON.stringify(tripData)
  );

  console.log(
    "Saved:",
    localStorage.getItem("trip")
  );

  navigate("/trip/1");
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          Create Your Trip ✈️
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Tell us your preferences and let AI plan your journey.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="destination"
            placeholder="Destination (Goa, Manali, Jaipur...)"
            value={tripData.destination}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="budget"
            placeholder="Budget (₹)"
            value={tripData.budget}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="days"
            placeholder="Number of Days"
            value={tripData.days}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="interest"
            value={tripData.interest}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Select Interest</option>
            <option value="Foodie">Foodie 🍕</option>
            <option value="Adventure">Adventure 🏔️</option>
            <option value="Nature">Nature 🌿</option>
            <option value="Spiritual">Spiritual 🛕</option>
            <option value="Historical">Historical 🏰</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Generate AI Trip
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateTrip;
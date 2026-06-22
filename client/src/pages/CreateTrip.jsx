import { useState } from "react";

function CreateTrip() {
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
    console.log(tripData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-[500px]"
      >
        <h1 className="text-3xl font-bold mb-6">
          Create Your Trip ✈️
        </h1>

        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={tripData.destination}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget (₹)"
          value={tripData.budget}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="number"
          name="days"
          placeholder="Number of Days"
          value={tripData.days}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        />

        <select
          name="interest"
          value={tripData.interest}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="">Select Interest</option>
          <option value="Foodie">Foodie</option>
          <option value="Adventure">Adventure</option>
          <option value="Nature">Nature</option>
          <option value="Spiritual">Spiritual</option>
          <option value="Historical">Historical</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg"
        >
          Generate AI Trip
        </button>
      </form>
    </div>
  );
}

export default CreateTrip;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateTripPlan } from "../services/GeminiAI";

function CreateTrip() {

  const navigate = useNavigate();

  const [tripData, setTripData] = useState({
    destination: "",
    budget: "",
    days: "",
    interest: "",
    travelMode: "Flight",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTripData({
      ...tripData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {

      const prompt = `

You are a professional AI travel planner.

Create a ${tripData.days}-day travel plan for ${tripData.destination}.

Budget: ₹${tripData.budget}

Traveler Interest: ${tripData.interest}

Travel Mode: ${tripData.travelMode}

IMPORTANT:

Follow exactly this format.

ITINERARY:

Day 1:

📍 Places:
- Place name

🎯 Activities:
- Activity

🍽️ Food:
- Food item

Continue same format until Day ${tripData.days}.

HOTELS:

- Hotel name with approximate price
- Hotel name with approximate price

FAMOUS FOODS:

- Local famous dishes
- Local famous dishes

BUDGET BREAKDOWN:

- Hotel:
- Food:
- Transport:
- Activities:

TRAVEL TIPS:

- Tip 1
- Tip 2
- Tip 3

TRAVEL ALERT:

Status:
On Time / Delayed / Cancelled

Reason:

ALTERNATIVE FLIGHTS:
- Flight name

ALTERNATIVE TRAINS:
- Train name

ALTERNATIVE BUS:
- Bus name

Extra Cost:

Advice:

Do not mix sections.
Keep every section separate.

`;

      console.log("📤 Prompt:");
      console.log(prompt);

      let aiResponse = "";

      try {

        aiResponse = await generateTripPlan(prompt);

        console.log("AI Response:");
        console.log(aiResponse);

      } catch (error) {

        console.log("AI failed:", error);

        aiResponse = "";

      }

      const itineraryFallback = Array.from(
        { length: Number(tripData.days) },
        (_, index) => `

Day ${index + 1}:

📍 Places:
- Explore famous places in ${tripData.destination}

🎯 Activities:
- Sightseeing and photography

🍽️ Food:
- Try local cuisine

`
      ).join("");

      const fallbackPlan = `

ITINERARY:

${itineraryFallback}

HOTELS:

- Mountain View Hotel ₹2500/night
- City Center Hotel ₹3000/night

FAMOUS FOODS:

- Local Cuisine
- Street Food

BUDGET BREAKDOWN:

- Hotel: ₹8000
- Food: ₹4000
- Transport: ₹5000
- Activities: ₹3000

TRAVEL TIPS:

- Carry ID proof
- Keep emergency cash
- Check weather forecast

TRAVEL ALERT:

Status:
On Time

Reason:
No major travel disruption expected.

ALTERNATIVE FLIGHTS:
- Not Required

ALTERNATIVE TRAINS:
- Not Required

ALTERNATIVE BUS:
- Volvo AC Bus

Extra Cost:
₹0

Advice:
Enjoy your journey.

`;

      const finalPlan =
        aiResponse?.trim()
          ? aiResponse
          : fallbackPlan;

      localStorage.setItem(
        "trip",
        JSON.stringify({
          ...tripData,
          aiPlan: finalPlan,
        })
      );

      navigate("/trip/1");

    } catch (error) {

      console.error("Error:", error);
      alert("Something went wrong");

    } finally {

      setLoading(false);

    }

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

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

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
            <option value="">
              Select Interest
            </option>

            <option value="Foodie">
              🍕 Foodie
            </option>

            <option value="Adventure">
              🏔 Adventure
            </option>

            <option value="Nature">
              🌿 Nature
            </option>

            <option value="Spiritual">
              🛕 Spiritual
            </option>

            <option value="Historical">
              🏰 Historical
            </option>
          </select>

          <select
            name="travelMode"
            value={tripData.travelMode}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="Flight">
              ✈ Flight
            </option>

            <option value="Train">
              🚆 Train
            </option>

            <option value="Bus">
              🚌 Bus
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading
              ? "Generating AI Trip..."
              : "Generate AI Trip"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateTrip;
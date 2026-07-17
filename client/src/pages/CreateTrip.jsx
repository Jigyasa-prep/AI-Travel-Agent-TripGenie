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



IMPORTANT:
Follow exactly this format:


ITINERARY:


Day 1:

📍 Places:
- Place name


🎯 Activities:
- Activity


🍽️ Food:
- Food item



Continue same format until Day ${tripData.days}




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


Do not mix sections.
Keep every section separate.

`;



      console.log("📤 Prompt:");
      console.log(prompt);



      let aiResponse = "";



      try {


        aiResponse = await generateTripPlan(prompt);


        console.log("✅ AI Response:");
        console.log(aiResponse);



      }

      catch(error) {

  console.log("AI failed:", error);

  aiResponse = "";

}




      // Fallback if Gemini fails

      const fallbackPlan = `


ITINERARY:


Day 1:

📍 Places:
- Explore famous places in ${tripData.destination}


🎯 Activities:
- Sightseeing and photography


🍽️ Food:
- Try local food




Day 2:

📍 Places:
- Visit tourist attractions


🎯 Activities:
- Explore and enjoy views


🍽️ Food:
- Famous local dishes




HOTELS:

- Mountain View Hotel ₹2500/night
- City Center Hotel ₹3000/night




FAMOUS FOODS:

- Local Cuisine
- Traditional Food




BUDGET BREAKDOWN:

- Hotel: ₹8000
- Food: ₹4000
- Transport: ₹5000
- Activities: ₹3000




TRAVEL TIPS:

- Carry important documents
- Check weather before travel
- Keep emergency cash


`;






      const finalPlan = aiResponse?.trim()
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



    }


    catch(error) {


      console.error("❌ Error:", error);

      alert("Something went wrong");


    }


    finally {


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
              Foodie 🍕
            </option>

            <option value="Adventure">
              Adventure 🏔️
            </option>

            <option value="Nature">
              Nature 🌿
            </option>

            <option value="Spiritual">
              Spiritual 🛕
            </option>

            <option value="Historical">
              Historical 🏰
            </option>


          </select>




          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >

          {
            loading
            ? "Generating AI Trip..."
            : "Generate AI Trip"
          }


          </button>



        </form>


      </div>


    </div>

  );

}


export default CreateTrip;
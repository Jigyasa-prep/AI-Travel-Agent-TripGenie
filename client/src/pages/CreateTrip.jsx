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
Give response exactly in this format:


Day 1:
📍 Places:
- 

🎯 Activities:
- 

🍽️ Food:
- 



Day 2:
📍 Places:
- 

🎯 Activities:
- 

🍽️ Food:
- 



Day 3:
📍 Places:
- 

🎯 Activities:
- 

🍽️ Food:
- 



Hotels:
- Hotel name with approximate price


Famous Foods:
- Local dishes


Budget Breakdown:
- Hotel:
- Food:
- Transport:
- Activities:


Travel Tips:
- Tip 1
- Tip 2
- Tip 3

`;



      console.log("📤 Prompt:");
      console.log(prompt);



      let aiResponse = "";



      try {

        aiResponse = await generateTripPlan(prompt);

      } 

      catch {

  console.log("AI failed, using fallback");

  aiResponse = "";

}





      const fallbackPlan = `

Day 1:
📍 Places:
Explore famous attractions

🎯 Activities:
Sightseeing and photography

🍽️ Food:
Try local cuisine


Day 2:
📍 Places:
Visit popular tourist places

🎯 Activities:
Shopping and exploring

🍽️ Food:
Local special dishes


Day 3:
📍 Places:
Nature exploration

🎯 Activities:
Relax and enjoy views

🍽️ Food:
Traditional food


`;





      localStorage.setItem(

        "trip",

        JSON.stringify({

          ...tripData,

          aiPlan: aiResponse || fallbackPlan,

        })

      );




      navigate("/trip/1");



    } 


    catch(error){


      console.error("❌ Error:", error);

      alert("Something went wrong");


    }


    finally{


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

            {loading 
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
import { useState } from "react";
import TravelChatbot from "../components/TravelChatbot";

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


  const staticPlan = `
Day 1:
🏖️ Explore famous attractions
🍽️ Try local food
📸 Visit popular places

Day 2:
🌄 Explore scenic locations
☕ Visit local cafes
🛍️ Shopping and sightseeing

Day 3:
🏞️ Nature exploration
🍴 Enjoy traditional cuisine
📸 Capture memories
`;


  const finalPlan = trip.aiPlan?.trim()
    ? trip.aiPlan
    : staticPlan;



  const itinerary = finalPlan
    .split(/Day \d+[:-]?/i)
    .filter(Boolean)
    .map((item, index) => ({
      day: `Day ${index + 1}`,
      activities: item
        .split("\n")
        .filter(line => line.trim() !== "")
    }));



  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-sky-100 to-purple-100 p-8">

      <div className="max-w-6xl mx-auto">


        {/* Header */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">


          <h1 className="text-5xl font-bold text-center text-blue-700">

            ✈️ Trip to {trip.destination}

          </h1>


          <p className="text-center text-gray-500 mt-3">

            Your Personalized AI Travel Planner

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




        {/* AI Generated Plan */}


        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">


          <h2 className="text-3xl font-bold text-blue-700 mb-6">

            🤖 AI Generated Travel Plan

          </h2>



          <div className="space-y-6">


            {itinerary.map((item,index)=>(


              <div
                key={index}
                className="bg-blue-50 rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >


                <h3 className="text-2xl font-bold text-blue-700 mb-4">

                  🗓️ {item.day}

                </h3>



                <ul className="space-y-3">


                  {item.activities.map((activity,i)=>(


                    <li
                      key={i}
                      className="bg-white rounded-xl p-3 shadow"
                    >

                      {activity}

                    </li>


                  ))}


                </ul>


              </div>


            ))}


          </div>


        </div>
                {/* Hotels */}


        <h2 className="text-4xl font-bold mb-6">

          🏨 Recommended Hotels

        </h2>



        <div className="grid md:grid-cols-2 gap-6 mb-12">



          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">


            <h3 className="text-2xl font-bold text-blue-700">

              ⭐ Hotel Snow View

            </h3>


            <p className="text-lg mt-3">

              ⭐⭐⭐⭐☆

            </p>


            <p className="mt-3 text-gray-700">

              💰 ₹2500 / Night

            </p>


            <p className="mt-2 text-gray-600">

              📍 Near City Center

            </p>


          </div>




          <div className="bg-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">


            <h3 className="text-2xl font-bold text-blue-700">

              ⭐ Himalayan Resort

            </h3>


            <p className="text-lg mt-3">

              ⭐⭐⭐⭐⭐

            </p>


            <p className="mt-3 text-gray-700">

              💰 ₹3500 / Night

            </p>


            <p className="mt-2 text-gray-600">

              📍 Mountain View

            </p>


          </div>



        </div>





        {/* Must Try Foods */}



        <h2 className="text-4xl font-bold mb-6">

          🍴 Must Try Foods

        </h2>




        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">


          <div className="grid md:grid-cols-2 gap-4">


            <div className="bg-orange-100 rounded-xl p-4 font-semibold hover:scale-105 transition">

              🍜 Local Noodles

            </div>



            <div className="bg-orange-100 rounded-xl p-4 font-semibold hover:scale-105 transition">

              🥟 Momos

            </div>



            <div className="bg-orange-100 rounded-xl p-4 font-semibold hover:scale-105 transition">

              ☕ Local Tea

            </div>



            <div className="bg-orange-100 rounded-xl p-4 font-semibold hover:scale-105 transition">

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



            <div className="flex justify-between border-b pb-3">

              <span>🏨 Hotels</span>

              <span>₹12,000</span>

            </div>




            <div className="flex justify-between border-b pb-3">

              <span>🍴 Food</span>

              <span>₹5,000</span>

            </div>




            <div className="flex justify-between border-b pb-3">

              <span>🚕 Transport</span>

              <span>₹8,000</span>

            </div>




            <div className="flex justify-between border-b pb-3">

              <span>🎟️ Activities</span>

              <span>₹3,000</span>

            </div>




            <div className="flex justify-between border-b pb-3">

              <span>🛍️ Shopping</span>

              <span>₹5,000</span>

            </div>




            <div className="flex justify-between text-2xl font-bold text-green-600 pt-4">

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


            <li className="bg-green-100 rounded-xl p-4">

              ✅ Carry your ID proof and travel documents.

            </li>


            <li className="bg-blue-100 rounded-xl p-4">

              ✅ Keep emergency cash and digital payment options.

            </li>


            <li className="bg-yellow-100 rounded-xl p-4">

              ✅ Start sightseeing early to avoid crowds.

            </li>


            <li className="bg-purple-100 rounded-xl p-4">

              ✅ Check the weather forecast before leaving.

            </li>


            <li className="bg-pink-100 rounded-xl p-4">

              ✅ Carry a power bank and keep your phone charged.

            </li>


            <li className="bg-orange-100 rounded-xl p-4">

              ✅ Try local food and respect local culture.

            </li>


          </ul>


        </div>





        {/* AI Chatbot */}


        <TravelChatbot />





        {/* Footer */}



        <div className="bg-white rounded-3xl shadow-lg p-8 text-center">


          <h2 className="text-3xl font-bold text-blue-700 mb-4">

            🌍 Have a Safe Journey!

          </h2>



          <p className="text-gray-600 text-lg">

            Thank you for using{" "}

            <span className="font-bold text-blue-600">

              TripGenie AI

            </span>.

          </p>



          <p className="text-gray-500 mt-2">

            Your smart AI travel companion ✈️

          </p>



        </div>



      </div>

    </div>

  );

}


export default TripDetails;
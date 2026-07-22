import { useState, useEffect } from "react";
import { getWeather } from "../services/WeatherAPI";
import TravelChatbot from "../components/TravelChatbot";
import MapView from "../components/MapView";
import { downloadTripPDF } from "../services/pdfGenerator";


function TripDetails() {


  const [trip] = useState(() =>
    JSON.parse(localStorage.getItem("trip"))
  );


  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);



  // ================= WEATHER =================


  useEffect(() => {

    if (!trip) return;


    const fetchWeather = async () => {

      try {

        const data = await getWeather(trip.destination);

        setWeather(data);

      } catch (error) {

        console.log("Weather Error:", error);
        setWeather(null);

      }
      finally {

        setWeatherLoading(false);

      }

    };


    fetchWeather();


  }, [trip]);





  if (!trip) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <h1 className="text-3xl font-bold">
          No Trip Found 😔
        </h1>

      </div>

    );

  }





  // ================= FALLBACK =================


  const fallbackPlan = `

Day 1:

📍 Places:
- Explore famous attractions

🎯 Activities:
- Sightseeing and photography

🍽️ Food:
- Try local food


Day 2:

📍 Places:
- Visit popular tourist spots

🎯 Activities:
- Local exploration

🍽️ Food:
- Traditional dishes



Hotels:

- Mountain View Hotel ₹2500/night
- Himalayan Resort ₹3500/night



Famous Foods:

- Local cuisine
- Famous street food



Budget Breakdown:

- Hotel: ₹8000
- Food: ₹4000
- Transport: ₹5000
- Activities: ₹3000



Travel Tips:

- Carry ID proof
- Check weather before travel
- Keep emergency cash

TRAVEL ALERT:

Status:
No Delay

Reason:
Normal weather conditions.

ALTERNATIVE FLIGHTS:
- No alternate flight required.

ALTERNATIVE TRAINS:
- No alternate train required.

ALTERNATIVE BUS:
- Volvo AC Bus

Extra Cost:
₹0

Advice:
Enjoy your trip.
`;






  const finalPlan =
    trip.aiPlan?.trim()
      ? trip.aiPlan
      : fallbackPlan;







  // ================= ITINERARY =================


  const itinerary =
    finalPlan
      .match(
/Day\s*\d+\s*:[\s\S]*?(?=Day\s*\d+\s*:|Hotels:|Famous Foods:|Budget Breakdown:|Travel Tips:|TRAVEL ALERT:|$)/gi
)
      ?.map((item,index)=>({

        day:`Day ${index+1}`,

        content:
          item
          .replace(/Day\s*\d+\s*:/i,"")
          .trim()

      }))
      || [];







  // ================= HOTELS =================


  const hotels =
    finalPlan
    .match(
      /Hotels:\s*([\s\S]*?)(?=Famous Foods:|Budget Breakdown:|Travel Tips:|$)/i
    )
    ?.[1]
    ?.split("\n")
    .map(item=>item.trim())
    .filter(item=>item)
    || [];







  // ================= FOODS =================


  const foods =
    finalPlan
    .match(
      /Famous Foods:\s*([\s\S]*?)(?=Budget Breakdown:|Travel Tips:|$)/i
    )
    ?.[1]
    ?.split("\n")
    .map(item=>item.trim())
    .filter(item=>item)
    || [];








  // ================= BUDGET =================


  const budget =
    finalPlan
    .match(
      /Budget Breakdown:\s*([\s\S]*?)(?=Travel Tips:|$)/i
    )
    ?.[1]
    ?.split("\n")
    .map(item=>item.trim())
    .filter(item=>item)
    || [];








  // ================= TIPS =================


  const tips =
    finalPlan
    .match(
/Travel Tips:\s*([\s\S]*?)(?=TRAVEL ALERT:|$)/i
)
    ?.[1]
    ?.split("\n")
    .map(item=>item.trim())
    .filter(item=>item)
    || [];


  return (

    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-sky-100 to-purple-100 p-8">

      <div className="max-w-6xl mx-auto">


// ================= TRAVEL ALERT =================

const travelAlert =
  finalPlan.match(
    /TRAVEL ALERT:\s*([\s\S]*)/i
  )?.[1]
  ?.trim() || "";  

        {/* ================= HEADER ================= */}


        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">


          <h1 className="text-5xl font-bold text-center text-blue-700">

            ✈️ Trip to {trip.destination}

          </h1>


          <p className="text-center text-gray-500 mt-3">

            Your Personalized AI Travel Planner

          </p>



          <div className="grid md:grid-cols-3 gap-6 mt-8">


            <div className="bg-blue-100 rounded-2xl p-6 text-center shadow">

              <h3 className="text-xl font-bold">
                💰 Budget
              </h3>

              <p className="text-3xl font-semibold mt-2">

                ₹{trip.budget}

              </p>

            </div>



            <div className="bg-green-100 rounded-2xl p-6 text-center shadow">

              <h3 className="text-xl font-bold">
                📅 Days
              </h3>

              <p className="text-3xl font-semibold mt-2">

                {trip.days}

              </p>

            </div>




            <div className="bg-purple-100 rounded-2xl p-6 text-center shadow">

              <h3 className="text-xl font-bold">
                🎯 Interest
              </h3>

              <p className="text-xl font-semibold mt-2">

                {trip.interest}

              </p>

            </div>


          </div>


        </div>







        {/* ================= WEATHER ================= */}



        {
          weatherLoading ? (

            <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">

              <h2 className="text-2xl font-bold text-blue-700">

                🌦 Loading Weather...

              </h2>

            </div>


          )

          :

          weather && weather.main && (

            <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">


              <h2 className="text-3xl font-bold text-blue-700 mb-5">

                🌦 Current Weather

              </h2>




              <div className="grid md:grid-cols-4 gap-5">



                <div className="bg-blue-100 rounded-xl p-5 text-center">

                  🌡 Temperature

                  <p className="text-xl font-bold">

                    {weather.main.temp} °C

                  </p>

                </div>





                <div className="bg-green-100 rounded-xl p-5 text-center">

                  💧 Humidity

                  <p className="text-xl font-bold">

                    {weather.main.humidity} %

                  </p>

                </div>





                <div className="bg-yellow-100 rounded-xl p-5 text-center">

                  🌤 Condition

                  <p className="text-xl font-bold">

                    {weather.weather?.[0]?.main}

                  </p>

                </div>





                <div className="bg-purple-100 rounded-xl p-5 text-center">

                  💨 Wind

                  <p className="text-xl font-bold">

                    {weather.wind?.speed} m/s

                  </p>

                </div>



              </div>


            </div>


          )

        }





<div className="flex justify-center mb-8">
  <button
    onClick={() =>
      downloadTripPDF(
        trip,
        itinerary,
        hotels,
        foods,
        budget,
        tips
      )
    }
    className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg"
  >
    📄 Download Trip PDF
  </button>
</div>


        {/* ================= MAP ================= */}



        <div className="bg-red-500 text-white p-5 mb-5">
  MAP SHOULD BE BELOW
</div>

<MapView destination={trip.destination} />








        {/* ================= ITINERARY ================= */}



        <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">


          <h2 className="text-3xl font-bold text-blue-700 mb-6">

            🤖 AI Day-wise Itinerary

          </h2>



          <div className="space-y-6">



            {
              itinerary.length > 0 ?


              itinerary.map((item,index)=>(


                <div

                  key={index}

                  className="bg-blue-50 rounded-2xl shadow-lg p-6"

                >



                  <h3 className="text-2xl font-bold text-blue-700 mb-4">

                    🗓️ {item.day}

                  </h3>




                  <div className="bg-white rounded-xl p-5 shadow">


                    <p className="whitespace-pre-line text-lg text-gray-700">

                      {item.content}

                    </p>


                  </div>



                </div>


              ))



              :


              <div className="bg-red-100 p-5 rounded-xl">

                No itinerary generated

              </div>


            }



          </div>


        </div>
                {/* ================= HOTELS ================= */}


        <h2 className="text-4xl font-bold mb-6">

          🏨 Recommended Hotels

        </h2>



        <div className="bg-white rounded-3xl shadow-xl p-6 mb-12">


          <div className="grid md:grid-cols-2 gap-5">


            {
              hotels.length > 0 ?


              hotels.map((hotel,index)=>(


                <div

                  key={index}

                  className="bg-blue-50 rounded-xl p-5 shadow"

                >

                  <h3 className="text-xl font-semibold">

                    ⭐ {hotel}

                  </h3>


                </div>


              ))


              :


              <div className="bg-blue-50 p-5 rounded-xl">

                Hotel information not available

              </div>


            }


          </div>


        </div>







        {/* ================= FOODS ================= */}



        <h2 className="text-4xl font-bold mb-6">

          🍴 Famous Foods

        </h2>



        <div className="bg-white rounded-3xl shadow-xl p-6 mb-12">


          <div className="grid md:grid-cols-2 gap-5">


          {

            foods.length > 0 ?


            foods.map((food,index)=>(


              <div

                key={index}

                className="bg-orange-100 rounded-xl p-5 font-semibold"

              >

                🍽️ {food}

              </div>


            ))


            :


            <div className="bg-orange-100 rounded-xl p-5">

              Food information not available

            </div>


          }


          </div>


        </div>









        {/* ================= BUDGET ================= */}



        <h2 className="text-4xl font-bold mb-6">

          💰 Budget Breakdown

        </h2>



        <div className="bg-white rounded-3xl shadow-xl p-6 mb-12">


          <div className="space-y-4">



          {

            budget.length > 0 ?


            budget.map((item,index)=>(


              <div

                key={index}

                className="border-b pb-3 text-lg"

              >

                💵 {item}

              </div>


            ))


            :


            <div>

              Budget information not available

            </div>


          }


          </div>


        </div>









        {/* ================= TRAVEL TIPS ================= */}



        <h2 className="text-4xl font-bold mb-6">

          📝 Travel Tips

        </h2>




        <div className="bg-white rounded-3xl shadow-xl p-6 mb-12">


          <ul className="space-y-4">


          {


            tips.length > 0 ?


            tips.map((tip,index)=>(


              <li

                key={index}

                className="bg-green-100 rounded-xl p-4"

              >

                ✅ {tip}

              </li>


            ))


            :


            <li className="bg-green-100 rounded-xl p-4">

              Carry important documents and enjoy your trip.

            </li>


          }


          </ul>


        </div>




    {/* ================= TRAVEL ALERT ================= */}

<h2 className="text-4xl font-bold mb-6">
🚨 Travel Alert & Alternate Options
</h2>

<div className="bg-white rounded-3xl shadow-xl p-6 mb-12">

  {
    travelAlert ? (

      <pre className="whitespace-pre-wrap text-lg text-gray-700">
        {travelAlert}
      </pre>

    ) : (

      <div className="bg-yellow-100 rounded-xl p-5">

        ✅ No travel disruption reported.

      </div>

    )
  }

</div>




        {/* ================= CHATBOT ================= */}



        <TravelChatbot />









        {/* ================= FOOTER ================= */}



        <div className="bg-white rounded-3xl shadow-xl p-8 text-center mt-10">


          <h2 className="text-3xl font-bold text-blue-700">

            🌍 Have a Safe Journey!

          </h2>



          <p className="text-gray-600 mt-3 text-lg">

            Thank you for using

            <span className="font-bold text-blue-600">

              {" "}TripGenie AI

            </span>

            ✈️

          </p>


          <p className="text-gray-500 mt-2">

            Your smart AI travel companion

          </p>


        </div>



      </div>

    </div>

  );

}


export default TripDetails;
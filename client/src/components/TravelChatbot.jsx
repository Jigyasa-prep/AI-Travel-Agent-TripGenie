import { useState } from "react";
import { generateTripPlan } from "../services/GeminiAI";

function TravelChatbot() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);


  const sendMessage = async () => {

    if (!message.trim() || loading) return;


    const userMessage = message;


    setChat((prev) => [
      ...prev,
      {
        user: userMessage,
        bot: "🤖 Thinking..."
      }
    ]);


    setMessage("");
    setLoading(true);


    try {

      const prompt = `
You are TripGenie AI Travel Assistant.

Help the user with travel related questions.

Give useful answers about:
- Tourist places
- Hotels
- Food
- Budget planning
- Travel tips
- Best time to visit

User Question:
${userMessage}
`;


      const aiResponse = await generateTripPlan(prompt);



      setChat((prev) => [
        ...prev.slice(0, -1),
        {
          user: userMessage,
          bot: aiResponse
        }
      ]);


    } catch (error) {


      console.error(error);


      setChat((prev) => [
        ...prev.slice(0, -1),
        {
          user: userMessage,
          bot: "❌ Sorry, I am unable to answer right now."
        }
      ]);


    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="bg-white rounded-3xl shadow-xl p-6 mt-10">


      <h2 className="text-3xl font-bold text-blue-700 mb-5">

        🤖 TripGenie AI Assistant

      </h2>



      <div className="h-64 overflow-y-auto space-y-4 mb-5">


        {chat.map((item, index) => (

          <div key={index}>


            <p className="bg-blue-100 rounded-xl p-3">

              👤 {item.user}

            </p>



            <p className="bg-green-100 rounded-xl p-3 mt-2 whitespace-pre-wrap">

              {item.bot}

            </p>



          </div>

        ))}


      </div>




      <div className="flex gap-3">


        <input

          value={message}

          onChange={(e) => setMessage(e.target.value)}

          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}

          placeholder="Ask about your trip..."

          className="flex-1 border rounded-xl p-3"

        />



        <button

          onClick={sendMessage}

          disabled={loading}

          className="bg-blue-600 text-white px-6 rounded-xl disabled:opacity-50"

        >

          {loading ? "..." : "Send"}

        </button>


      </div>


    </div>

  );

}


export default TravelChatbot;
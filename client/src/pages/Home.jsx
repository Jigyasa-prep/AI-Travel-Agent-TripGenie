import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold mb-4">
        ✈️ TripGenie AI
      </h1>

      <p className="text-xl mb-8">
        Your Autonomous Travel Agent
      </p>

      <Link
        to="/create-trip"
        className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Plan Your Trip
      </Link>
    </div>
  );
}

export default Home;
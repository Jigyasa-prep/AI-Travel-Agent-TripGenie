import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">
        TripGenie AI ✈️
      </h1>

      <p className="mb-6">
        Your Autonomous Travel Agent
      </p>

      <Link
        to="/create-trip"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Plan Your Trip
      </Link>
    </div>
  );
}

export default Home;
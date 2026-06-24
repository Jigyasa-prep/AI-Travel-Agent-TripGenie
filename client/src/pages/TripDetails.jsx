function TripDetails() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        
        <h1 className="text-4xl font-bold mb-6">
          ✈️ Your AI Travel Plan
        </h1>

        <div className="space-y-6">

          <div className="border-l-4 border-blue-500 pl-4">
            <h2 className="text-2xl font-semibold">
              Day 1
            </h2>

            <ul className="list-disc ml-6 mt-2">
              <li>Visit Baga Beach</li>
              <li>Seafood Lunch</li>
              <li>Sunset Cruise</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl font-semibold">
              Day 2
            </h2>

            <ul className="list-disc ml-6 mt-2">
              <li>Old Goa Churches</li>
              <li>Panjim Market</li>
              <li>Local Food Tour</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h2 className="text-2xl font-semibold">
              Budget Summary
            </h2>

            <p className="mt-2">
              Estimated Budget: ₹20,000
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default TripDetails;
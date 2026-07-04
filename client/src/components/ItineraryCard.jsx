function ItineraryCard({ day, activities }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        {day}
      </h2>

      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="bg-gray-100 rounded-lg p-3"
          >
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItineraryCard;
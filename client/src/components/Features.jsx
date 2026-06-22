function Features() {
  const features = [
    "AI Itinerary Generation",
    "Budget Optimization",
    "Weather Insights",
    "Google Maps Integration",
  ];

  return (
    <section className="py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        Features
      </h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white text-black p-6 rounded-xl shadow-lg"
          >
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
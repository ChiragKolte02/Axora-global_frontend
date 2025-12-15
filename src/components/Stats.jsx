export default function Stats() {
  const stats = [
    { value: "1000+", label: "Successful Shipments" },
    { value: "50+", label: "Countries Served" },
    { value: "500+", label: "Happy Clients" },
    { value: "99%", label: "On-Time Delivery" }
  ];

  return (
    <section className="bg-blue-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Trusted by Businesses Worldwide
        </h2>
        <p className="text-center mb-12 text-blue-200">
          Our track record speaks for itself
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-4">{stat.value}</div>
              <div className="text-xl">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
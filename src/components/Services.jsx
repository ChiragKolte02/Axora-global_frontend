export default function Services() {
  const services = [
    {
      title: "Product Sourcing",
      description: "Find the best suppliers worldwide with quality verification.",
      icon: "🔍",
      color: "blue"
    },
    {
      title: "Shipping & Logistics",
      description: "End-to-end shipping with customs clearance and tracking.",
      icon: "🚢",
      color: "green"
    },
    {
      title: "Documentation",
      description: "Complete handling of all import/export paperwork.",
      icon: "📋",
      color: "purple"
    },
    {
      title: "Quality Control",
      description: "Rigorous inspection processes before shipment.",
      icon: "✅",
      color: "amber"
    }
  ];

  const colorMap = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500"
  };

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50" id="services">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gray-900">Our Trade</span>
            <span className="text-blue-600 ml-3">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            End-to-end solutions for successful international trade
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-12 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <div className="text-gray-600">Years</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1000+</div>
              <div className="text-gray-600">Projects</div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-xl ${colorMap[service.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl text-white">{service.icon}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-8">
                  {service.description}
                </p>
                
                {/* Button */}
                <button className={`w-full ${colorMap[service.color]} text-white font-semibold py-3 rounded-lg hover:opacity-90 transition duration-300`}>
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Need Custom Solutions?</h3>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            We offer tailored services for your unique business needs.
          </p>
          <button className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300">
            Get Custom Quote
          </button>
        </div>
      </div>
    </section>
  );
}
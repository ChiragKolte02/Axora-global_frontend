export default function WhyChoose() {
  const features = [
    {
      title: "Secure Transactions",
      description: "Bank-grade security and compliance with international trade regulations for worry-free transactions.",
      icon: "🛡️",
      color: "blue",
      stats: "100% Secure"
    },
    {
      title: "Fast Processing",
      description: "Quick turnaround times without compromising on quality or compliance requirements.",
      icon: "⚡",
      color: "green",
      stats: "24-48 Hours"
    },
    {
      title: "Expert Team",
      description: "Dedicated specialists with years of international trade experience guiding your journey.",
      icon: "👨‍💼",
      color: "purple",
      stats: "50+ Experts"
    },
    {
      title: "Cost Optimization",
      description: "Competitive rates and cost-effective solutions tailored to your business needs.",
      icon: "💰",
      color: "amber",
      stats: "Save 30% Avg"
    },
    {
      title: "Global Network",
      description: "Established partnerships with suppliers and carriers across 50+ countries worldwide.",
      icon: "🌐",
      color: "indigo",
      stats: "50+ Countries"
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality checks at every stage to ensure your standards are met and exceeded.",
      icon: "✅",
      color: "emerald",
      stats: "99.9% Success"
    }
  ];

  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-purple-600",
    amber: "from-amber-500 to-orange-500",
    indigo: "from-indigo-500 to-indigo-600",
    emerald: "from-emerald-500 to-teal-600"
  };

  const colorBgClasses = {
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
    purple: "bg-purple-50 border-purple-100",
    amber: "bg-amber-50 border-amber-100",
    indigo: "bg-indigo-50 border-indigo-100",
    emerald: "bg-emerald-50 border-emerald-100"
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden" id="why-choose">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
      
      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-sm font-semibold px-6 py-3 rounded-full mb-8 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Our Competitive Edge
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-gray-900">Why Choose</span>
            <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              Axora Global
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your success is our priority. Discover the unparalleled advantages that set us apart 
            in the global trade industry.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Feature Card */}
              <div className={`relative h-full bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden ${colorBgClasses[feature.color]}`}>
                {/* Animated Background */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[feature.color]} opacity-5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700`}></div>
                
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[feature.color]} opacity-10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`}></div>
                  <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${colorClasses[feature.color]} flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  
                  {/* Stats Badge */}
                  <div className="absolute -top-2 -right-2 bg-white rounded-full px-4 py-2 shadow-lg">
                    <span className={`text-sm font-bold bg-gradient-to-r ${colorClasses[feature.color]} bg-clip-text text-transparent`}>
                      {feature.stats}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Learn More Button */}
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className={`bg-gradient-to-r ${colorClasses[feature.color]} bg-clip-text text-transparent`}>
                      Learn more
                    </span>
                    <svg className={`w-4 h-4 group-hover:translate-x-2 transition-transform duration-300`} 
                         style={{color: getComputedStyle(document.documentElement).getPropertyValue(`--color-${feature.color}-500`)}}
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>

                {/* Hover Effect Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colorClasses[feature.color]} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-24 bg-gradient-to-r from-blue-900 to-blue-950 rounded-3xl p-8 md:p-12 text-white overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="lg:w-2/5">
                <h3 className="text-3xl font-bold mb-6">
                  Trusted by Industry Leaders
                </h3>
                <p className="text-blue-200 leading-relaxed">
                  Join hundreds of satisfied businesses that have expanded globally with our expert guidance.
                </p>
              </div>
              
              <div className="lg:w-3/5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { value: "500+", label: "Happy Clients" },
                    { value: "1000+", label: "Successful Shipments" },
                    { value: "99.9%", label: "Customer Satisfaction" },
                    { value: "24/7", label: "Support Available" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-blue-300 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-600/20 to-blue-800/20 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-700/10 to-blue-900/10 rounded-full translate-y-48 -translate-x-48"></div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-left">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Ready to experience the difference?
              </h4>
              <p className="text-gray-600">
                Join thousands of successful businesses that trust Axora Global for their international trade needs.
              </p>
            </div>
            <button className="group bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 whitespace-nowrap">
              <span className="flex items-center gap-3">
                Start Your Journey
                <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Animated Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[1, 2, 3].map((dot) => (
          <div 
            key={dot}
            className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
            style={{ animationDelay: `${dot * 0.2}s` }}
          ></div>
        ))}
      </div>
    </section>
  );
}
export default function HowItWorks() {
  const steps = [
    { 
      number: "1", 
      title: "Consultation", 
      description: "Share your import/export needs and we'll create a tailored solution for your business.",
      icon: "💬",
      color: "from-blue-500 to-blue-600"
    },
    { 
      number: "2", 
      title: "Sourcing & Planning", 
      description: "We identify suppliers, negotiate terms, and plan the entire logistics chain.",
      icon: "🌍",
      color: "from-green-500 to-emerald-600"
    },
    { 
      number: "3", 
      title: "Shipping & Tracking", 
      description: "Your products are shipped with full tracking and customs clearance handled.",
      icon: "🚢",
      color: "from-purple-500 to-purple-600"
    },
    { 
      number: "4", 
      title: "Delivery & Support", 
      description: "Receive your products with complete documentation and ongoing support.",
      icon: "📦",
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-gray-50"></div>
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
            Our Process
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="block text-gray-900">How It</span>
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A simple, streamlined process from start to finish. We handle everything so you can focus on growing your business.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-green-500/20 to-purple-500/20"></div>
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 opacity-20 blur-sm"></div>
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="relative group"
              >
                {/* Step Card */}
                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  {/* Step Number Badge */}
                  <div className="absolute -top-6 -left-6">
                    <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} shadow-lg rotate-45 group-hover:rotate-0 transition-transform duration-500`}>
                      <div className="absolute inset-0 flex items-center justify-center -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                        <div className="text-4xl">{step.icon}</div>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-lg font-bold text-gray-900">{step.number}</span>
                      </div>
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="pt-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {step.description}
                    </p>
                    
                    {/* Progress Indicator */}
                    {index < steps.length - 1 && (
                      <div className="lg:hidden flex items-center justify-center mt-6">
                        <div className="w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300"></div>
                        <div className="absolute">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                </div>

                {/* Connector Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Process Timeline Visualization */}
        <div className="mt-24 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                End-to-End Trade Solutions
              </h3>
              <p className="text-gray-600">
                From initial consultation to final delivery, we manage every step of your international trade journey.
              </p>
            </div>
            
            <div className="md:w-2/3">
              <div className="relative">
                {/* Process Bar */}
                <div className="h-3 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full mb-8"></div>
                
                {/* Process Labels */}
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <div className="text-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                    <span>Consultation</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                    <span>Sourcing</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-2"></div>
                    <span>Shipping</span>
                  </div>
                  <div className="text-center">
                    <div className="w-3 h-3 bg-amber-500 rounded-full mx-auto mb-2"></div>
                    <span>Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">99%</div>
            <div className="text-gray-600">On-Time Delivery</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">50+</div>
            <div className="text-gray-600">Countries Covered</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl md:text-4xl font-bold text-amber-600 mb-2">1000+</div>
            <div className="text-gray-600">Successful Shipments</div>
          </div>
        </div>
      </div>

      
      
    </section>
  );
}
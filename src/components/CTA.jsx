import React, { useState, useEffect } from 'react';
import EnquiryPopup from './EnquiryPopup';

const CTA = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  // Auto-show popup when user scrolls to this section
  useEffect(() => {
    const handleScroll = () => {
      const ctaSection = document.getElementById('contact');
      if (ctaSection && !hasShownPopup) {
        const rect = ctaSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
        
        if (isVisible) {
          setTimeout(() => {
            setShowPopup(true);
            setHasShownPopup(true);
          }, 1500); // Delay to let user see the section first
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownPopup]);

  const handleManualOpen = () => {
    setShowPopup(true);
  };

  return (
    <>
      <section id="contact" className="relative py-20 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Global Business Meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-blue-800/80 to-indigo-900/85"></div>
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden">
            
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-blue-400/50 rounded-tl-3xl"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-blue-400/50 rounded-br-3xl"></div>
            
            {/* Main Content */}
            <div className="text-center relative z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <span className="text-white font-semibold">Limited Time Offer</span>
              </div>
              
              {/* Main Heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="block text-white">Ready to Expand</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300">
                  Your Business Globally?
                </span>
              </h2>
              
              {/* Description */}
              <p className="text-xl text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Let's discuss how Axora Global can help you navigate international trade with ease. 
                Get started today with a <span className="font-bold text-white">free consultation</span>.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                <button 
                  onClick={handleManualOpen}
                  className="group relative bg-white text-blue-900 font-bold py-5 px-14 rounded-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Start Free Consultation
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </button>
                
                <button 
                  onClick={handleManualOpen}
                  className="group border-2 border-white/40 text-white font-semibold py-5 px-10 rounded-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule a Call
                  </span>
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">24h</div>
                  <div className="text-blue-200 text-sm">Response Time</div>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">Free</div>
                  <div className="text-blue-200 text-sm">Initial Consultation</div>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-white/5 rounded-2xl backdrop-blur-sm">
                  <div className="text-3xl font-bold text-white mb-2">No Commitment</div>
                  <div className="text-blue-200 text-sm">Required</div>
                </div>
              </div>
              
              {/* Testimonial Preview */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-blue-200 italic mb-4">
                  "Axora Global helped us expand to 3 new countries in just 6 months. 
                  Their expertise is unmatched!"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <div className="text-left">
                    <div className="font-semibold text-white">Sarah Chen</div>
                    <div className="text-blue-300 text-sm">CEO, GlobalTech Solutions</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>

      {/* Enquiry Popup */}
      <EnquiryPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
};

export default CTA;
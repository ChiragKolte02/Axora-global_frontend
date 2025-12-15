import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Services from './Services';
import HowItWorks from './HowItWorks';
import WhyChoose from './WhyChoose';
import Stats from './Stats';
import CTA from './CTA';
import Footer from './Footer';

const MainWebsite = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <section id="services">
        <Services />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="why-choose">
        <WhyChoose />
      </section>
      <Stats />
      <section id="contact">
        <CTA />
      </section>
      <Footer />
    </div>
  );
};

export default MainWebsite;
import React from 'react';
import { 
  Globe, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Shield,
  Truck,
  FileText,
  CheckCircle
} from 'lucide-react';

const Footer = () => {
  const services = [
    { name: 'Product Sourcing', icon: <CheckCircle className="w-4 h-4" /> },
    { name: 'Shipping & Logistics', icon: <Truck className="w-4 h-4" /> },
    { name: 'Customs Documentation', icon: <FileText className="w-4 h-4" /> },
    { name: 'Quality Control', icon: <Shield className="w-4 h-4" /> },
    { name: 'Trade Compliance', icon: <Globe className="w-4 h-4" /> },
    { name: 'Warehousing', icon: <Truck className="w-4 h-4" /> },
  ];

  const countries = [
    'United States', 'United Kingdom', 'Germany', 'China', 
    'Japan', 'India', 'Australia', 'Canada', 'UAE', 'Singapore'
  ];

  const certifications = [
    'ISO 9001:2015 Certified',
    'FIDI Accredited',
    'IATA Member',
    'Customs Broker Licensed'
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-3 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-900 rounded"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold">Axora Global</h2>
                <p className="text-blue-300 text-sm">Import & Export Specialists</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner in global trade solutions. We simplify international 
              commerce with expertise, reliability, and seamless logistics.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition duration-300">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-blue-800">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#top" className="text-gray-300 hover:text-white transition duration-300 hover:translate-x-2 inline-block">Home</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition duration-300 hover:translate-x-2 inline-block">Our Services</a></li>
              <li><a href="#how-it-works" className="text-gray-300 hover:text-white transition duration-300 hover:translate-x-2 inline-block">How It Works</a></li>
              <li><a href="#why-choose" className="text-gray-300 hover:text-white transition duration-300 hover:translate-x-2 inline-block">Why Choose Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition duration-300 hover:translate-x-2 inline-block">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 hover:translate-x-2 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition duration-300 hover:translate-x-2 inline-block">Terms of Service</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-blue-800">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span className="text-blue-400">{service.icon}</span>
                  <span className="text-gray-300 hover:text-white transition duration-300">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-blue-300">Certifications</h4>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-blue-800">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-300 text-sm">
                    15/A, Shridharnagar, Sangli (MH)<br />
                    India - 416416
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">24/7 Support</p>
                  <p className="text-gray-300">+65 1234 5678</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-300">pranil@axoraglobal.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-gray-300">Mon-Fri: 24/7 Operations</p>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-8">
              <h4 className="font-semibold mb-3 text-blue-300">Newsletter</h4>
              <div className="space-y-3">
                <p className="text-sm text-gray-300">Get trade insights & updates</p>
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Presence */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <h3 className="text-xl font-bold mb-6 text-center">Global Presence</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {countries.map((country, index) => (
              <div 
                key={index}
                className="px-4 py-2 bg-gray-800/50 rounded-full text-sm hover:bg-blue-900/30 transition duration-300 cursor-pointer"
              >
                {country}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Axora Global Import & Export. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live Support Available</span>
              </div>
              <a href="#" className="hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-white transition duration-300">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition duration-300">Cookie Policy</a>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-black font-bold text-xs">ISO</span>
              </div>
              <span className="text-sm">ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm">Secure Transactions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm">Verified Partner</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

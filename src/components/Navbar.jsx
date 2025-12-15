import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
      setIsAdmin(loggedIn);
    };
    
    checkAuth();
    
    // Listen for storage changes (for logout from other tabs)
    const handleStorageChange = () => checkAuth();
    window.addEventListener('storage', handleStorageChange);
    
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function for main website
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80; // Navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    // Close mobile menu if open
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAdmin(false);
    setShowDropdown(false);
    
    // If on admin dashboard, redirect to home
    if (location.pathname.startsWith('/admin')) {
      navigate('/');
    }
    
    // Close mobile menu if open
    setIsOpen(false);
  };

  const handleAdminLogin = () => {
    navigate('/admin/login');
    setIsOpen(false);
  };

  const handleAdminDashboard = () => {
    navigate('/admin/dashboard');
    setShowDropdown(false);
    setIsOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'top' },
    { label: 'Services', id: 'services' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Why Choose Us', id: 'why-choose' },
    { label: 'Contact', id: 'contact' },
  ];

  // Don't show navbar on admin login page
  if (location.pathname === '/admin/login') {
    return null;
  }

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a 
                href="/"
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    scrollToSection(e, 'top');
                  } else {
                    navigate('/');
                  }
                }}
                className="flex items-center space-x-3 cursor-pointer"
              >
                <div className="bg-white p-2 rounded-lg">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Echo_global_icon.svg/2048px-Echo_global_icon.svg.png" 
                    alt="Axora Global Logo"
                    className="w-10 h-10"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-blue-900">Axora Global</h1>
                  <p className="text-xs text-gray-600">Import & Export Specialists</p>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Show website navigation only on main site */}
              {location.pathname === '/' && navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`font-medium transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-blue-900' : 'text-white hover:text-blue-200'} cursor-pointer`}
                >
                  {item.label}
                </a>
              ))}

              {/* Admin Dropdown/Login Button */}
              <div className="relative">
                {isAdmin ? (
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex items-center space-x-2 bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300"
                    >
                      <User className="w-5 h-5" />
                      <span>Admin</span>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Admin Dropdown Menu */}
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                        <div className="px-4 py-3 border-b">
                          <p className="font-medium text-gray-900">Welcome, Admin</p>
                          <p className="text-sm text-gray-500">Administrator</p>
                        </div>
                        <button
                          onClick={handleAdminDashboard}
                          className="w-full text-left px-4 py-3 hover:bg-blue-50 text-gray-700 hover:text-blue-900 transition duration-300"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-red-50 text-red-600 hover:text-red-700 transition duration-300"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    onClick={handleAdminLogin}
                    className="flex items-center space-x-2 bg-white text-blue-900 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition duration-300 shadow-md"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Admin Login</span>
                  </button>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-md ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 bottom-0 w-64 bg-white shadow-xl animate-slide-in-right">
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="p-6 border-b">
                <div className="flex items-center space-x-3">
                  <div className="bg-white p-2 rounded-lg border">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Echo_global_icon.svg/2048px-Echo_global_icon.svg.png" 
                      alt="Axora Global Logo"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-blue-900">Axora Global</h2>
                    <p className="text-xs text-gray-600">Import & Export</p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Items - Only show on main site */}
              {location.pathname === '/' && (
                <div className="flex-1 p-4">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => scrollToSection(e, item.id)}
                      className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg transition duration-200 cursor-pointer"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}

              {/* Mobile Admin Section */}
              <div className="p-6 border-t">
                {isAdmin ? (
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium text-blue-900">Admin Panel</p>
                      <p className="text-sm text-blue-700">Logged in as Administrator</p>
                    </div>
                    <button
                      onClick={handleAdminDashboard}
                      className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-300"
                    >
                      <User className="w-5 h-5" />
                      <span>Dashboard</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 font-semibold py-3 px-6 rounded-lg hover:bg-red-100 transition duration-300"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleAdminLogin}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-800 transition duration-300"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Admin Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar - Only show on main site */}
      {location.pathname === '/' && <div className="h-20"></div>}
    </>
  );
};

export default Navbar;
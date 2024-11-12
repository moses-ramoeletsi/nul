import React from 'react';
import { Menu, X, Mail, MapPin, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './Admin'; 

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-blue-900 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">NUL SOCA</span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['Home', 'About', 'Mission', 'Activities'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-white hover:bg-blue-800 transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-64' : 'max-h-0'} overflow-hidden bg-blue-900`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['Home', 'About', 'Mission', 'Activities'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-800 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Hero Component with enhanced styling
const Hero = () => (
  <div id="home" className="relative bg-gradient-to-br from-blue-900 to-blue-700 text-white min-h-screen flex items-center">
    <div className="absolute inset-0 bg-black opacity-20"></div>
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          National University of Lesotho<br />Sociology Association
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-blue-100">
          "Sociological unity in a diverse community"
        </p>
        <div className="flex justify-center space-x-6">
          <a 
            href="#about"
            className="bg-white text-blue-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center"
          >
            Learn More
            <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </div>
    </div>
  </div>
);



// About Component with enhanced styling
const About = () => (
  <section id="about" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-16 text-center text-blue-900">About Us</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <p className="text-lg text-gray-600 leading-relaxed">
            The National University of Lesotho Sociology Association (NUL SOCA) is an academic association formed in 2024 to promote the study of sociology and related disciplines. Through collaborative efforts, we aim to deepen our understanding of human behaviour, social structures, and cultural dynamics.
          </p>
          <div className="bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-blue-900">Key Personnel</h3>
            <ul className="space-y-4">
              {[
                ['President', 'Posholi Makotoko'],
                ['Vice-president', 'Mpho Metsing'],
                ['Chief Organiser', 'Khauhelo Nthunya'],
                ['Secretary', 'Senate Peete'],
                ['Vice-secretary', 'Teboho Mphakonyane']
              ].map(([role, name]) => (
                <li key={role} className="flex items-center">
                  <span className="font-semibold text-blue-900 w-32">{role}:</span>
                  <span className="text-gray-700">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-8 text-blue-900">Meeting Information</h3>
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <Clock className="text-blue-600 mr-4" size={24} />
              <div>
                <h4 className="font-semibold text-gray-900">Weekly Meetings</h4>
                <p className="text-gray-600">Every Tuesday</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
              <MapPin className="text-blue-600 mr-4" size={24} />
              <div>
                <h4 className="font-semibold text-gray-900">Location</h4>
                <p className="text-gray-600">CMP 107</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-100 rounded-lg">
              <p className="text-blue-900 font-medium text-center">
                Open to all sociology students on campus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Mission Component with enhanced styling
const Mission = () => (
  <section id="mission" className="py-24 bg-gradient-to-br from-gray-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-16 text-center text-blue-900">Our Mission</h2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold mb-8 text-blue-900">Core Values</h3>
          <ul className="space-y-6">
            {[
              'Academic excellence',
              'Collaboration and partnership',
              'Conducting research',
              'Dignified representation of sociology'
            ].map((value, index) => (
              <li key={index} className="flex items-center p-4 bg-blue-50 rounded-lg">
                <ChevronRight className="text-blue-600 mr-4" size={20} />
                <span className="text-gray-800 font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-center">
          <div className="bg-blue-900 text-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
            <p className="text-lg leading-relaxed">
              We envision a world where sociological understanding is harnessed to empower individuals and communities, leading to social cohesion, justice and sustainable development. Our mission is to create a unified community among sociology students and foster an environment where diversity, inclusivity and academic rigor thrive.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Activities Component with enhanced styling
const Activities = () => (
  <section id="activities" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold mb-16 text-center text-blue-900">Our Activities</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          'Seminars',
          'Mental health care',
          'Educational trips',
          'Annual debates',
          'Weekly group meetings',
          'Collaborations and partnerships'
        ].map((activity, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-4">{activity}</h3>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Footer Component with enhanced styling
const Footer = () => (
  <footer className="bg-blue-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="mr-4" size={20} />
              <span>nulsoca@email.com</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-4" size={20} />
              <span>National University of Lesotho, Roma Campus</span>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
          <ul className="space-y-4">
            {['Home', 'About', 'Mission', 'Activities'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-blue-200 transition-colors duration-200 flex items-center"
                >
                  <ArrowRight className="mr-2" size={16} />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-blue-800 text-center">
        <p>&copy; 2024 NUL SOCA. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const MainContent  = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Mission />
        <Activities />
      </main>
      <Footer />
    </div>
  );
};
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <a 
        href="/" 
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        Return to homepage
      </a>
    </div>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website route */}
        <Route path="/" element={<MainContent />} />
        
        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/admin-panel/*" element={<AdminPanel />} />
        <Route path="/dashboard/*" element={<AdminPanel />} />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
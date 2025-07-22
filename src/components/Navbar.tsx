import React from 'react';
import { Home, Film, AlertTriangle, User, Cctv } from 'lucide-react';

export default function Navbar() {
  const navItems = [
    { name: 'Dashboard', icon: <Home />,
       href: '/', 
      active: true },

    { name: 'Cameras', icon: <Cctv />, href: '/' },

    { name: 'Scenes', icon: <Film />, href: '/' },

    { name: 'Incidents', icon: <AlertTriangle />, href: '/' },
    { name: 'Users', icon: <User />, href: '/' },
  ];

  return (
    <nav className="bg-black border-b border-gray-800 w-full h-[76px] pt-4 pr-6 pb-3 pl-6">
      <div className="flex items-center justify-between h-full">
        
        
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-white font-bold text-lg">🔷 MANDLAC X</div>
          </div>
          
          {/* Navigation Menu */}
          <div className="md:flex items-center space-x-1 hidden ">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  
                    
                     'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className={`text-base ${item.active? 'text-yellow-400' : 'text-white'}`}>{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
            ))}
          </div>
        
        
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <div className="text-white text-sm font-medium">Aryan Gupta</div>
            <div className="text-gray-400 text-xs">aryan@example.com</div>
          </div>
          <div className="text-gray-400">⚙️</div>
        </div>
      </div>
    </nav>
  );
}

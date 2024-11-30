import React from 'react';
import { Code, Palette, Monitor } from 'lucide-react';

const LinkedInBanner = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 flex items-center justify-between">
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl font-bold">
          Crafting Digital Experiences
        </h1>
        <div className="flex items-center space-x-4">
          <Code className="h-10 w-10" />
          <Palette className="h-10 w-10" />
          <Monitor className="h-10 w-10" />
        </div>
        <p className="text-xl">
          Web Developer | Designer | Creating Innovative Digital Solutions
        </p>
        <div className="flex space-x-4">
          <div className="bg-white text-blue-600 px-4 py-2 rounded-full">
            Full Stack Development
          </div>
          <div className="bg-white text-purple-600 px-4 py-2 rounded-full">
            UI/UX Design
          </div>
        </div>
      </div>
      <div className="bg-white/20 p-4 rounded-full">
        <img 
          src="/api/placeholder/300/300" 
          alt="Professional Headshot" 
          className="rounded-full h-64 w-64 object-cover"
        />
      </div>
    </div>
  );
};

export default LinkedInBanner;
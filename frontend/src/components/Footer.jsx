import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-indigo-950 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">InterviewPro</h3>
            <p className="mt-2 text-purple-200">
              Empowering job seekers with AI-powered interview preparation tools.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-purple-300 hover:text-blue-300 transition-colors duration-300">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-purple-300 hover:text-blue-300 transition-colors duration-300">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-purple-300 hover:text-blue-300 transition-colors duration-300">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-purple-300 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-purple-200 hover:text-blue-300 transition-colors duration-300">
                  AI Interview
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-purple-200 hover:text-blue-300 transition-colors duration-300">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-purple-200 hover:text-blue-300 transition-colors duration-300">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-purple-300 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-purple-200 hover:text-blue-300 transition-colors duration-300">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-purple-200 hover:text-blue-300 transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-purple-200 hover:text-blue-300 transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-purple-800 pt-8">
          <p className="text-base text-purple-300 text-center">
            © 2024 InterviewPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
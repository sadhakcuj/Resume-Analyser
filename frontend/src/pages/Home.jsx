import React from 'react';
import { ArrowRight, Video, MessageSquare, BarChart2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white">

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1600/900')] bg-center bg-cover filter blur-sm"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                  Master Your Interviews
                </span>
                <span className="mt-2 block text-white">
                  With AI-Powered Practice
                </span>
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-purple-100">
                Elevate your interview performance using cutting-edge AI technology that provides real-time feedback, personalized coaching, and expert insights.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/practice"
                  className="inline-flex items-center justify-center px-8 py-4 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Practicing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 border border-purple-300 rounded-full text-base font-medium bg-transparent hover:bg-purple-900 hover:bg-opacity-40 text-white transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block lg:max-w-md mt-10 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-75"></div>
                <div className="relative bg-indigo-950 p-6 rounded-2xl">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="w-full h-full bg-indigo-800 rounded-lg flex items-center justify-center">
                      <Video className="h-16 w-16 text-purple-300 opacity-75" />
                    </div>
                  </div>
                  <p className="text-sm text-purple-200">
                    "This platform transformed my interview skills completely. I landed my dream job after just 2 weeks of practice!"
                  </p>
                  <p className="mt-2 text-sm font-semibold text-purple-300">— Sarah J., Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-24 relative">
        <div className="absolute inset-0 bg-indigo-950 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Cutting-Edge Features
            </h2>
            <p className="text-xl text-purple-200 mb-16">
              Our comprehensive suite of AI-powered tools helps you prepare for any interview scenario
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="group">
              <div className="relative p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Video Interview Practice</h3>
                  <p className="text-purple-200 mb-6 flex-grow">
                    Practice with AI interviewers that analyze your facial expressions, tone, and delivery. Receive detailed feedback on your body language and presentation.
                  </p>
                  <Link to="/video-practice" className="inline-flex items-center text-blue-300 hover:text-blue-200 font-medium">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>


            <div className="group">
              <div className="relative p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                    <MessageSquare className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Text-Based Practice</h3>
                  <p className="text-purple-200 mb-6 flex-grow">
                    Perfect your written communication and technical responses with our AI chat interface. Get real-time suggestions to improve clarity and impact.
                  </p>
                  <Link to="/text-practice" className="inline-flex items-center text-blue-300 hover:text-blue-200 font-medium">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>


            <div className="group">
              <div className="relative p-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                  <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                    <BarChart2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">Insightful Analytics</h3>
                  <p className="text-purple-200 mb-6 flex-grow">
                    Track your progress with comprehensive analytics. Identify patterns, strengths, and areas for improvement through detailed performance metrics.
                  </p>
                  <Link to="/analytics" className="inline-flex items-center text-blue-300 hover:text-blue-200 font-medium">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-indigo-950 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-purple-200">
              Join thousands who have transformed their career prospects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-indigo-900 bg-opacity-50 p-6 rounded-xl border border-purple-800">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  <div className="ml-4">
                    <p className="font-semibold text-white">User {i}</p>
                    <p className="text-sm text-purple-300">Professional Title</p>
                  </div>
                </div>
                <p className="text-purple-100 italic">
                  "The AI-powered feedback was incredibly precise and helped me identify issues I wasn't aware of. After practicing regularly, I felt much more confident and performed better in real interviews."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-3xl p-12 shadow-2xl">
            <div className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
                Ready to Transform Your Interview Skills?
              </h2>
              <p className="text-xl text-purple-100 mb-10 max-w-3xl mx-auto">
                Join thousands of professionals who have elevated their careers through our AI-powered interview preparation platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/practice"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full text-base font-medium bg-white hover:bg-purple-50 text-purple-800 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  Start Practicing Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center px-8 py-4 border border-purple-300 rounded-full text-base font-medium bg-transparent hover:bg-purple-700 text-white transition-all duration-300"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Video, MessageSquare, Users, Clock, BookOpen } from 'lucide-react';

function Practice() {
  const navigate = useNavigate(); // Initialize navigation

  const [selectedRole, setSelectedRole] = useState(() => {
    const storedRole = localStorage.getItem('selectedRole');
    return storedRole ? storedRole : '';
  });

  const [practiceStats, setPracticeStats] = useState(() => {
    const storedStats = localStorage.getItem('practiceStats');
    return storedStats
      ? JSON.parse(storedStats)
      : {
        practiceTime: 0,
        questionsAnswered: 0,
        mockInterviews: 0,
      };
  });

  useEffect(() => {
    localStorage.setItem('selectedRole', selectedRole);
  }, [selectedRole]);

  useEffect(() => {
    localStorage.setItem('practiceStats', JSON.stringify(practiceStats));
  }, [practiceStats]);

  const updateStats = (statType, value) => {
    setPracticeStats((prevStats) => ({
      ...prevStats,
      [statType]: prevStats[statType] + value,
    }));
  };

  const startInterview = (type) => {
    if (type === 'video') {
      navigate('/videoInterview');
    } else if (type === 'text') {
      navigate('/textinterview');
    }
  };

  const scheduleInterview = () => {
    navigate('/scheduler');
  };

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-8">
          Choose Your Practice Mode
        </h1>

        {/* Schedule Interview */}
        <div className="relative p-1 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
          <div className="relative bg-indigo-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Schedule Your Interview</h2>
            <p className="text-purple-200 mb-4">
              Ready to take the next step? Schedule a mock interview with a mentor.
            </p>
            <button
              className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              onClick={scheduleInterview}
            >
              Schedule Interview
            </button>
          </div>
        </div>

        {/* Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Video Interview */}
          <div className="group">
            <div className="relative p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Video Interview</h2>
                <p className="text-purple-200 mb-6 flex-grow">
                  Practice with our AI interviewer and get feedback on your body language, tone, and delivery.
                </p>
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => startInterview('video')}
                >
                  Start Video Interview
                </button>
              </div>
            </div>
          </div>

          {/* Text-Based Interview */}
          <div className="group">
            <div className="relative p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Text-Based Interview</h2>
                <p className="text-purple-200 mb-6 flex-grow">
                  Practice through text chat and focus on crafting well-structured responses.
                </p>
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => startInterview('text')}
                >
                  Start Text Interview
                </button>
              </div>
            </div>
          </div>

          {/* Mock Quiz */}
          <div className="group">
            <div className="relative p-1">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 group-hover:opacity-100 blur-sm group-hover:blur-md transition-all duration-300"></div>
              <div className="relative bg-indigo-950 rounded-xl p-8 h-full flex flex-col">
                <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">Mock Quiz</h2>
                <p className="text-purple-200 mb-6 flex-grow">
                  Test your programming knowledge with AI-generated quizzes in C++ or Java.
                </p>
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  onClick={startQuiz}
                >
                  Start Mock Quiz
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="relative p-1">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
          <div className="relative bg-indigo-950 rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-white mb-6">Quick Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-300">Practice Time</p>
                  <p className="text-xl font-semibold text-white">{practiceStats.practiceTime} hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-300">Questions Answered</p>
                  <p className="text-xl font-semibold text-white">{practiceStats.questionsAnswered}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-300">Mock Interviews</p>
                  <p className="text-xl font-semibold text-white">{practiceStats.mockInterviews}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Practice;

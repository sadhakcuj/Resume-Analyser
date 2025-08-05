import React, { useState, useEffect } from 'react';
import { UploadCloud, BadgeCheck, HelpCircle, ListOrdered, AlertCircle, CheckCircle2, XCircle, History, Loader2, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Analytics() {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [previousAnalysis, setPreviousAnalysis] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin', { state: { from: '/analytics' } });
    } else {
      fetchResumes();
    }
  }, [isAuthenticated, navigate]);

  const fetchResumes = async () => {
    try {
      const response = await fetch('https://interview-platform-5db3.onrender.com/api/resumes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch resumes');
      const data = await response.json();
      setResumes(data);
    } catch (err) {
      console.error('Error fetching resumes:', err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {

      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Please upload a PDF, Word document, or text file');
        return;
      }

      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should be less than 5MB');
        return;
      }
      setFile(selectedFile);
      setUploadStatus('');
      setAnalysis(null);
      setError(null);
    }
  };

  const extractTextFromFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const text = e.target.result;
          resolve(text);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsText(file);
    });
  };

  const analyzeResume = (text) => {
    const keywords = {
      skills: ['skills', 'technical', 'proficient', 'expertise', 'abilities', 'competencies'],
      experience: ['experience', 'work history', 'employment', 'career', 'professional'],
      education: ['education', 'degree', 'university', 'college', 'school', 'graduated'],
      achievements: ['achievements', 'accomplishments', 'awards', 'certifications', 'projects', 'achieved']
    };

    let score = 0;
    const issues = [];
    const strengths = [];
    const questions = [];

    Object.entries(keywords).forEach(([section, words]) => {
      const hasSection = words.some(word => text.toLowerCase().includes(word));
      if (hasSection) {
        score += 20;
        strengths.push({
          title: `Strong ${section} section`,
          description: `Your resume includes a well-defined ${section} section, which is important for ATS systems.`
        });
      } else {
        issues.push({
          title: `Missing ${section} section`,
          description: `Your resume appears to be missing a dedicated ${section} section.`,
          suggestion: `Add a clear ${section} section to improve your ATS score.`
        });
      }
    });


    const hasBulletPoints = text.includes('•') || text.includes('-') || text.includes('*');
    if (hasBulletPoints) {
      score += 10;
      strengths.push({
        title: 'Good formatting',
        description: 'Your resume uses bullet points effectively for better readability.'
      });
    } else {
      issues.push({
        title: 'Formatting could be improved',
        description: 'Consider using bullet points to make your resume more scannable.',
        suggestion: 'Use bullet points to highlight key achievements and responsibilities.'
      });
    }


    const actionVerbs = ['managed', 'led', 'developed', 'created', 'implemented', 'improved', 'achieved'];
    const hasActionVerbs = actionVerbs.some(verb => text.toLowerCase().includes(verb));
    if (hasActionVerbs) {
      score += 10;
      strengths.push({
        title: 'Strong action verbs',
        description: 'Your resume uses impactful action verbs to describe your experience.'
      });
    } else {
      issues.push({
        title: 'Weak action verbs',
        description: 'Your resume could benefit from stronger action verbs.',
        suggestion: 'Use more impactful verbs like "managed", "led", "developed" to describe your experience.'
      });
    }

    if (text.toLowerCase().includes('project')) {
      questions.push('Can you tell me about a challenging project you worked on?');
    }
    if (text.toLowerCase().includes('team')) {
      questions.push('How do you work in a team environment?');
    }
    if (text.toLowerCase().includes('lead')) {
      questions.push('Can you describe your leadership style?');
    }
    if (text.toLowerCase().includes('problem')) {
      questions.push('How do you approach problem-solving?');
    }

    questions.push(
      'What are your career goals?',
      'What are your greatest strengths?',
      'Where do you see yourself in 5 years?'
    );

    return {
      atsScore: Math.min(score, 100),
      issues,
      strengths,
      questions
    };
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setUploadStatus('Analyzing your resume...');
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch('https://interview-platform-5db3.onrender.com/api/resume-upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const text = await extractTextFromFile(file);
      const analysisResult = analyzeResume(text);

      setAnalysis(analysisResult);
      setUploadStatus('Analysis complete!');
      fetchResumes();
    } catch (error) {
      console.error('Error during resume analysis:', error);
      setError(error.message);
      setUploadStatus(`Analysis failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeClick = async (resumeId) => {
    setSelectedResumeId(resumeId);
    setLoading(true);
    try {
      const response = await fetch(`https://interview-platform-5db3.onrender.com/api/resumes/${resumeId}/analysis`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch analysis');
      const data = await response.json();
      setPreviousAnalysis(data);
      setAnalysis(null);
    } catch (err) {
      console.error('Error fetching analysis:', err);
      setError('Failed to load previous analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Resume Analytics</h1>
          <p className="text-purple-200">Upload your resume to get detailed insights and improve your chances of landing interviews</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex flex-col items-center p-8 border-2 border-dashed border-purple-500/50 rounded-xl hover:border-purple-500 transition-colors">
                <UploadCloud className="h-12 w-12 text-purple-400 mb-4" />
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Upload your resume
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                  accept=".pdf,.doc,.docx,.txt"
                />
                <label
                  htmlFor="resume-upload"
                  className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Choose File
                </label>
                {file && (
                  <p className="mt-2 text-sm text-purple-300">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200">
                  {error}
                </div>
              )}

              {uploadStatus && (
                <div className="text-center text-purple-200">
                  {uploadStatus}
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${!file || loading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700'
                  }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="animate-spin mr-2" />
                    Analyzing...
                  </span>
                ) : (
                  'Analyze Resume'
                )}
              </button>
            </motion.div>
          </div>

          <div className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <History className="mr-2" />
              Analysis History
            </h2>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {resumes.length === 0 ? (
                <p className="text-purple-200 text-center">No previous analyses</p>
              ) : (
                resumes.map((resume) => (
                  <motion.div
                    key={resume._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${selectedResumeId === resume._id
                      ? 'bg-purple-600/50 border border-purple-500'
                      : 'bg-indigo-800/50 hover:bg-indigo-800/70'
                      }`}
                    onClick={() => handleResumeClick(resume._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-purple-400 mr-2" />
                        <span className="text-white truncate">{resume.originalname}</span>
                      </div>
                      <BadgeCheck className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="mt-2 text-sm text-purple-200">
                      Score: {resume.analysisResults.atsScore}%
                    </div>
                    <div className="text-xs text-purple-300 mt-1">
                      {new Date(resume.analysisResults.analyzedDate).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(79, 70, 229, 0.1);
                border-radius: 3px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(139, 92, 246, 0.5);
                border-radius: 3px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(139, 92, 246, 0.7);
              }
            `}</style>
          </div>
        </div>

        {(analysis || previousAnalysis) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-indigo-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/50 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">ATS Score</h2>
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#4B0082"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#8B5CF6"
                        strokeWidth="3"
                        strokeDasharray={`${(analysis || previousAnalysis).atsScore} 100`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {(analysis || previousAnalysis).atsScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <CheckCircle2 className="mr-2 text-green-400" />
                    Strengths
                  </h3>
                  <div className="space-y-3">
                    {(analysis || previousAnalysis).strengths.map((strength, index) => (
                      <div key={index} className="bg-green-500/10 p-4 rounded-lg">
                        <h4 className="font-medium text-green-400">{strength.title}</h4>
                        <p className="text-green-200 mt-1">{strength.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <AlertCircle className="mr-2 text-yellow-400" />
                    Areas for Improvement
                  </h3>
                  <div className="space-y-3">
                    {(analysis || previousAnalysis).issues.map((issue, index) => (
                      <div key={index} className="bg-yellow-500/10 p-4 rounded-lg">
                        <h4 className="font-medium text-yellow-400">{issue.title}</h4>
                        <p className="text-yellow-200 mt-1">{issue.description}</p>
                        <p className="text-yellow-300 mt-2 text-sm">
                          <span className="font-medium">Suggestion:</span> {issue.suggestion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <HelpCircle className="mr-2 text-blue-400" />
                    Potential Interview Questions
                  </h3>
                  <div className="space-y-3">
                    {(analysis || previousAnalysis).questions.map((question, index) => (
                      <div key={index} className="bg-blue-500/10 p-4 rounded-lg">
                        <p className="text-blue-200">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Analytics;

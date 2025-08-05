
import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChevronLeft, ChevronRight, BookOpen, Clock, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';

function Quiz() {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
    const [timerActive, setTimerActive] = useState(false);
    const [score, setScore] = useState(0);

    const genAI = new GoogleGenerativeAI("AIzaSyAskR1GqZzlZXYfZO4kmFt37PN9zAAvyPs");
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });


    useEffect(() => {
        let interval = null;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            submitQuiz();
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const generateQuestions = async (language) => {
        setLoading(true);
        try {
            const prompt = `Generate 10 multiple choice questions about ${language} programming language for technical interview preparation. 
      Each question should have 4 options (A, B, C, D) and indicate the correct answer.
      Format the response as a JSON array with objects containing: question, options (array of 4 strings), correctAnswer (0-3 index), explanation.
      Focus on core concepts, syntax, OOP principles, and common interview topics.
      
      Example format:
      [
        {
          "question": "What is the purpose of virtual functions in C++?",
          "options": [
            "To allow function overloading",
            "To enable runtime polymorphism", 
            "To prevent inheritance",
            "To optimize memory usage"
          ],
          "correctAnswer": 1,
          "explanation": "Virtual functions enable runtime polymorphism by allowing derived classes to override base class methods."
        }
      ]`;

            const result = await model.generateContent(prompt);
            const responseText = result.response.text();

            const jsonMatch = responseText.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const questionsData = JSON.parse(jsonMatch[0]);
                setQuestions(questionsData);
                setAnswers(new Array(questionsData.length).fill(null));
                setQuizStarted(true);
                setTimerActive(true);
            } else {
                throw new Error('Could not parse questions from response');
            }
        } catch (error) {
            console.error('Error generating questions:', error);
            alert('Failed to generate questions. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answerIndex;
        setAnswers(newAnswers);
    };

    const nextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const submitQuiz = () => {
        setTimerActive(false);
        let correctAnswers = 0;
        questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setQuizCompleted(true);
    };

    const resetQuiz = () => {
        setSelectedLanguage('');
        setCurrentQuestion(0);
        setQuestions([]);
        setAnswers([]);
        setQuizStarted(false);
        setQuizCompleted(false);
        setTimeLeft(600);
        setTimerActive(false);
        setScore(0);
    };

    const goHome = () => {

        console.log('Navigate back to /practice');
    };

    if (!quizStarted && !quizCompleted) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-4">
                            Mock Programming Quiz
                        </h1>
                        <p className="text-purple-200 text-lg">
                            Test your programming knowledge with AI-generated questions
                        </p>
                    </div>

                    <div className="relative p-1 mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
                        <div className="relative bg-indigo-950 rounded-xl p-8">
                            <h2 className="text-2xl font-semibold text-white mb-6">Setup Your Quiz</h2>

                            <div className="mb-8">
                                <label className="block text-purple-200 text-sm font-medium mb-4">
                                    Choose Programming Language
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        className={`p-4 border-2 rounded-lg transition-all duration-300 ${selectedLanguage === 'C++'
                                                ? 'border-purple-400 bg-indigo-800 bg-opacity-50 text-purple-200'
                                                : 'border-indigo-700 hover:border-purple-400 hover:bg-indigo-800 hover:bg-opacity-30 text-purple-300'
                                            }`}
                                        onClick={() => setSelectedLanguage('C++')}
                                    >
                                        <div className="text-lg font-semibold">C++</div>
                                        <div className="text-sm opacity-75">Object-oriented programming</div>
                                    </button>
                                    <button
                                        className={`p-4 border-2 rounded-lg transition-all duration-300 ${selectedLanguage === 'Java'
                                                ? 'border-purple-400 bg-indigo-800 bg-opacity-50 text-purple-200'
                                                : 'border-indigo-700 hover:border-purple-400 hover:bg-indigo-800 hover:bg-opacity-30 text-purple-300'
                                            }`}
                                        onClick={() => setSelectedLanguage('Java')}
                                    >
                                        <div className="text-lg font-semibold">Java</div>
                                        <div className="text-sm opacity-75">Platform-independent programming</div>
                                    </button>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    className={`inline-flex items-center justify-center px-8 py-4 border-0 rounded-full text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 ${selectedLanguage && !loading
                                            ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg'
                                            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                        }`}
                                    onClick={() => selectedLanguage && !loading && generateQuestions(selectedLanguage)}
                                    disabled={!selectedLanguage || loading}
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Generating Questions...
                                        </>
                                    ) : (
                                        <>
                                            <BookOpen className="h-5 w-5 mr-2" />
                                            Start Quiz
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="mt-6 p-4 bg-indigo-800 bg-opacity-50 rounded-lg">
                                <h3 className="text-lg font-semibold text-purple-200 mb-2">Quiz Details:</h3>
                                <ul className="text-purple-300 space-y-1">
                                    <li>• 10 multiple choice questions</li>
                                    <li>• 10 minutes time limit</li>
                                    <li>• AI-generated questions tailored to your selected language</li>
                                    <li>• Instant results and explanations</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (quizCompleted) {
        const percentage = Math.round((score / questions.length) * 100);
        let performanceColor = 'text-red-400';
        let performanceText = 'Needs Improvement';

        if (percentage >= 80) {
            performanceColor = 'text-green-400';
            performanceText = 'Excellent!';
        } else if (percentage >= 60) {
            performanceColor = 'text-yellow-400';
            performanceText = 'Good Job!';
        }

        return (
            <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 mb-4">
                            Quiz Results
                        </h1>
                    </div>

                    <div className="relative p-1 mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
                        <div className="relative bg-indigo-950 rounded-xl p-8 text-center">
                            <div className="mb-6">
                                <div className={`text-6xl font-bold ${performanceColor} mb-2`}>
                                    {percentage}%
                                </div>
                                <div className={`text-2xl font-semibold ${performanceColor} mb-4`}>
                                    {performanceText}
                                </div>
                                <div className="text-purple-200 text-lg">
                                    You answered {score} out of {questions.length} questions correctly
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4">
                                    <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{score}</div>
                                    <div className="text-purple-300">Correct</div>
                                </div>
                                <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4">
                                    <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{questions.length - score}</div>
                                    <div className="text-purple-300">Incorrect</div>
                                </div>
                                <div className="bg-indigo-800 bg-opacity-50 rounded-lg p-4">
                                    <Clock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                                    <div className="text-2xl font-bold text-white">{formatTime(600 - timeLeft)}</div>
                                    <div className="text-purple-300">Time Taken</div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    className="inline-flex items-center justify-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                    onClick={resetQuiz}
                                >
                                    <RotateCcw className="h-5 w-5 mr-2" />
                                    Take Another Quiz
                                </button>
                                <button
                                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-400 rounded-full text-base font-medium text-purple-200 hover:bg-purple-400 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                    onClick={goHome}
                                >
                                    <Home className="h-5 w-5 mr-2" />
                                    Back to Practice
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="relative p-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
                        <div className="relative bg-indigo-950 rounded-xl p-8">
                            <h2 className="text-2xl font-semibold text-white mb-6">Question Review</h2>
                            <div className="space-y-6">
                                {questions.map((question, index) => (
                                    <div key={index} className="bg-indigo-800 bg-opacity-50 rounded-lg p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-white pr-4">
                                                {index + 1}. {question.question}
                                            </h3>
                                            {answers[index] === question.correctAnswer ? (
                                                <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                                            ) : (
                                                <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                                            {question.options.map((option, optionIndex) => (
                                                <div
                                                    key={optionIndex}
                                                    className={`p-3 rounded-lg border-2 ${optionIndex === question.correctAnswer
                                                            ? 'border-green-400 bg-green-400 bg-opacity-20 text-green-200'
                                                            : answers[index] === optionIndex
                                                                ? 'border-red-400 bg-red-400 bg-opacity-20 text-red-200'
                                                                : 'border-indigo-600 text-purple-300'
                                                        }`}
                                                >
                                                    {String.fromCharCode(65 + optionIndex)}. {option}
                                                </div>
                                            ))}
                                        </div>

                                        {question.explanation && (
                                            <div className="bg-indigo-700 bg-opacity-50 rounded-lg p-4">
                                                <h4 className="font-semibold text-purple-200 mb-2">Explanation:</h4>
                                                <p className="text-purple-300">{question.explanation}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                        {selectedLanguage} Quiz
                    </h1>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 bg-indigo-800 bg-opacity-50 rounded-full px-4 py-2">
                            <Clock className="h-5 w-5 text-purple-300" />
                            <span className={`font-mono text-lg ${timeLeft <= 60 ? 'text-red-400' : 'text-white'}`}>
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-purple-300">
                            Question {currentQuestion + 1} of {questions.length}
                        </span>
                        <span className="text-purple-300">
                            Answered: {answers.filter(a => a !== null).length}/{questions.length}
                        </span>
                    </div>
                    <div className="w-full bg-indigo-800 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {questions.length > 0 && (
                    <div className="relative p-1 mb-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
                        <div className="relative bg-indigo-950 rounded-xl p-8">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                {questions[currentQuestion].question}
                            </h2>

                            <div className="space-y-4 mb-8">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-300 ${answers[currentQuestion] === index
                                                ? 'border-purple-400 bg-indigo-800 bg-opacity-50 text-purple-200'
                                                : 'border-indigo-700 hover:border-purple-400 hover:bg-indigo-800 hover:bg-opacity-30 text-purple-300'
                                            }`}
                                        onClick={() => handleAnswerSelect(index)}
                                    >
                                        <span className="font-semibold mr-3">
                                            {String.fromCharCode(65 + index)}.
                                        </span>
                                        {option}
                                    </button>
                                ))}
                            </div>

                            <div className="flex justify-between items-center">
                                <button
                                    className={`inline-flex items-center px-6 py-3 border-2 border-purple-400 rounded-full text-base font-medium transition-all duration-300 ${currentQuestion === 0
                                            ? 'text-gray-500 border-gray-500 cursor-not-allowed'
                                            : 'text-purple-200 hover:bg-purple-400 hover:text-white transform hover:-translate-y-1'
                                        }`}
                                    onClick={prevQuestion}
                                    disabled={currentQuestion === 0}
                                >
                                    <ChevronLeft className="h-5 w-5 mr-2" />
                                    Previous
                                </button>

                                <div className="flex space-x-4">
                                    {currentQuestion === questions.length - 1 ? (
                                        <button
                                            className="inline-flex items-center justify-center px-8 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                            onClick={submitQuiz}
                                        >
                                            Submit Quiz
                                        </button>
                                    ) : (
                                        <button
                                            className="inline-flex items-center px-6 py-3 border-0 rounded-full text-base font-medium bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                            onClick={nextQuestion}
                                        >
                                            Next
                                            <ChevronRight className="h-5 w-5 ml-2" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="relative p-1">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-50 blur-sm"></div>
                    <div className="relative bg-indigo-950 rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">Question Navigator</h3>
                        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 ${index === currentQuestion
                                            ? 'bg-purple-500 text-white'
                                            : answers[index] !== null
                                                ? 'bg-green-500 text-white'
                                                : 'bg-indigo-700 text-purple-300 hover:bg-indigo-600'
                                        }`}
                                    onClick={() => setCurrentQuestion(index)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
import { useState } from 'react';
import { Calendar, Clock, User, Users, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MockInterviewScheduler() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');
    const [isBooked, setIsBooked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Software Engineer');

    const availableTimes = [
        "9:00 AM", "10:00 AM", "11:00 AM",
        "1:00 PM", "2:00 PM", "3:00 PM"
    ];

    const mentors = [
        { id: 1, name: "Alex Johnson", expertise: "Frontend Development", rating: 4.9 },
        { id: 2, name: "Sarah Williams", expertise: "Backend Engineering", rating: 4.8 },
        { id: 3, name: "Michael Chen", expertise: "Full Stack Development", rating: 4.7 },
        { id: 4, name: "Love Babbar", expertise: "Data Analytics", rating: 4.5 }
    ];

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleTimeSelection = (time) => {
        setSelectedTime(time);
        setStep(3);
    };

    const handleMentorSelection = (mentor) => {
        setSelectedMentor(mentor);
        setStep(4);
    };

    const handleBooking = () => {

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setIsBooked(true);
        }, 1500);
    };

    const resetBooking = () => {
        setStep(1);
        setSelectedDate('');
        setSelectedTime('');
        setSelectedMentor('');
        setIsBooked(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
                    Mock Interview Scheduler
                </h1>
                <p className="text-xl text-purple-200 mb-10">
                    Book practice sessions with industry experts to perfect your interview skills
                </p>

                {/* Progress indicator */}
                <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4].map((stepNum) => (
                        <div
                            key={stepNum}
                            className={`flex flex-col items-center ${step >= stepNum ? 'text-blue-400' : 'text-gray-500'}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= stepNum
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600'
                                : 'bg-indigo-800 bg-opacity-50'
                                }`}>
                                {stepNum === 1 && <Calendar size={20} className="text-white" />}
                                {stepNum === 2 && <Clock size={20} className="text-white" />}
                                {stepNum === 3 && <User size={20} className="text-white" />}
                                {stepNum === 4 && <CheckCircle size={20} className="text-white" />}
                            </div>
                            <span className="text-sm mt-2">
                                {stepNum === 1 && "Date"}
                                {stepNum === 2 && "Time"}
                                {stepNum === 3 && "Mentor"}
                                {stepNum === 4 && "Confirm"}
                            </span>
                        </div>
                    ))}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <div className="animate-spin h-12 w-12 border-4 border-purple-300 border-t-transparent rounded-full"></div>
                        <p className="ml-4 text-purple-300">Processing your request...</p>
                    </div>
                ) : isBooked ? (
                    <div className="relative p-1 mb-12">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl opacity-75 blur-sm"></div>
                        <div className="relative bg-indigo-950 rounded-xl p-8 text-center">
                            <CheckCircle className="mx-auto text-green-400 mb-4" size={64} />
                            <h2 className="text-2xl font-bold text-white mb-2">Interview Scheduled!</h2>
                            <p className="text-purple-200 mb-6">
                                Your mock interview with {selectedMentor.name} is scheduled for {selectedDate} at {selectedTime}.
                            </p>
                            <p className="text-purple-300 mb-8">
                                You'll receive a calendar invitation and confirmation email shortly.
                            </p>
                            <button
                                onClick={resetBooking}
                                className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                Schedule Another Interview
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="relative p-1 mb-12">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 blur-sm"></div>
                        <div className="relative bg-indigo-950 rounded-xl p-8">
                            {step === 1 && (
                                <div>
                                    <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                                        <Calendar className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Select Interview Date</h2>
                                    <p className="text-purple-200 mb-6">Choose a date for your mock interview session</p>

                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full p-4 border border-indigo-700 rounded-lg bg-indigo-900 bg-opacity-50 text-white focus:outline-none focus:ring focus:ring-purple-500 focus:border-purple-500"
                                    />

                                    <div className="mt-8 flex justify-end">
                                        <button
                                            onClick={() => selectedDate && setStep(2)}
                                            disabled={!selectedDate}
                                            className={`inline-flex items-center px-8 py-4 rounded-full ${selectedDate
                                                ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                                                : 'bg-indigo-800 text-indigo-400 cursor-not-allowed opacity-50'
                                                }`}
                                        >
                                            Continue
                                            <ChevronRight className="ml-2 h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div>
                                    <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                                        <Clock className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Select Time Slot</h2>
                                    <p className="text-purple-200 mb-6">Available time slots for {selectedDate}</p>

                                    <div className="grid grid-cols-2 gap-3">
                                        {availableTimes.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => handleTimeSelection(time)}
                                                className="p-4 border border-indigo-700 rounded-lg bg-indigo-900 bg-opacity-50 hover:bg-indigo-800 hover:border-purple-500 transition-all duration-300"
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            onClick={() => setStep(1)}
                                            className="inline-flex items-center px-8 py-4 rounded-full border border-purple-300 bg-transparent hover:bg-purple-900 hover:bg-opacity-40 text-white transition-all duration-300"
                                        >
                                            <ChevronLeft className="mr-2 h-5 w-5" />
                                            Back
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div>
                                    <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                                        <Users className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Select a Mentor</h2>
                                    <p className="text-purple-200 mb-6">Choose an expert for your {selectedCategory} interview</p>

                                    <div className="space-y-4">
                                        {mentors.map((mentor) => (
                                            <div
                                                key={mentor.id}
                                                onClick={() => handleMentorSelection(mentor)}
                                                className="p-5 border border-indigo-700 rounded-lg bg-indigo-900 bg-opacity-50 hover:bg-indigo-800 hover:border-purple-500 cursor-pointer transition-all duration-300"
                                            >
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4">
                                                        <Users size={24} className="text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-lg text-white">{mentor.name}</h3>
                                                        <p className="text-purple-300">{mentor.expertise}</p>
                                                        <div className="flex items-center mt-2">
                                                            <span className="text-yellow-400">★</span>
                                                            <span className="text-sm ml-1 text-purple-200">{mentor.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            onClick={() => setStep(2)}
                                            className="inline-flex items-center px-8 py-4 rounded-full border border-purple-300 bg-transparent hover:bg-purple-900 hover:bg-opacity-40 text-white transition-all duration-300"
                                        >
                                            <ChevronLeft className="mr-2 h-5 w-5" />
                                            Back
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 4 && (
                                <div>
                                    <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
                                        <CheckCircle className="h-8 w-8 text-white" />
                                    </div>
                                    <h2 className="text-xl font-semibold text-white mb-4">Confirm Booking</h2>
                                    <p className="text-purple-200 mb-6">Review your interview details</p>

                                    <div className="bg-indigo-900 bg-opacity-50 p-6 rounded-xl border border-indigo-700 mb-6">
                                        <div className="flex items-center mb-4">
                                            <Calendar size={20} className="text-blue-400 mr-3" />
                                            <div>
                                                <p className="text-purple-300 text-sm">Date</p>
                                                <p className="text-white font-medium">{selectedDate}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center mb-4">
                                            <Clock size={20} className="text-blue-400 mr-3" />
                                            <div>
                                                <p className="text-purple-300 text-sm">Time</p>
                                                <p className="text-white font-medium">{selectedTime}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center mb-4">
                                            <User size={20} className="text-blue-400 mr-3" />
                                            <div>
                                                <p className="text-purple-300 text-sm">Mentor</p>
                                                <p className="text-white font-medium">{selectedMentor.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <Users size={20} className="text-blue-400 mr-3" />
                                            <div>
                                                <p className="text-purple-300 text-sm">Expertise</p>
                                                <p className="text-white font-medium">{selectedMentor.expertise}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button
                                            onClick={() => setStep(3)}
                                            className="inline-flex items-center px-8 py-4 rounded-full border border-purple-300 bg-transparent hover:bg-purple-900 hover:bg-opacity-40 text-white transition-all duration-300"
                                        >
                                            <ChevronLeft className="mr-2 h-5 w-5" />
                                            Back
                                        </button>

                                        <button
                                            onClick={handleBooking}
                                            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
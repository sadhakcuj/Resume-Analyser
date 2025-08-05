import React, { useState, useEffect, useRef } from 'react';
import { Video, ChevronLeft, ChevronRight } from 'lucide-react';

function VideoInterview() {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: 'Can you tell me a little about yourself?',
      answer: '',
    },
    {
      id: 2,
      text: 'Why do you want to work for our company?',
      answer: '',
    },
    {
      id: 3,
      text: 'What are your strengths and weaknesses?',
      answer: '',
    },
    {
      id: 4,
      text: 'Why should we hire you ?',
      answer: '',
    },
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedBlobs, setRecordedBlobs] = useState([]);

  const liveVideoRef = useRef(null);
  const playbackVideoRef = useRef(null);

  useEffect(() => {
    if (recording) {
      startRecording();
    }
  }, [recording]);


  useEffect(() => {
    if (stream && liveVideoRef.current) {
      liveVideoRef.current.srcObject = stream;
    }
  }, [stream, liveVideoRef]);


  useEffect(() => {
    if (!recording && recordedBlobs.length > 0) {
      const blob = new Blob(recordedBlobs, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    }
  }, [recording, recordedBlobs]);


  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [stream, videoUrl]);

  const startRecording = async () => {
    try {

      setRecordedBlobs([]);

      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userStream);

      const recorder = new MediaRecorder(userStream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
        }
      };

      recorder.start(100);
    } catch (err) {
      console.error("Recording error:", err);
      setError('Failed to start recording. Please check your camera and microphone permissions.');
      setRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();


      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      setRecording(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      if (recording) {
        stopRecording();
      }

      setVideoUrl(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      if (recording) {
        stopRecording();
      }

      setVideoUrl(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900 text-white pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
          Video Interview Practice
        </h1>
        <p className="text-xl text-purple-200 mb-10">
          Practice your interview presence with real-time video recording
        </p>

        <div className="relative p-1 mb-12">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl opacity-75 blur-sm"></div>
          <div className="relative bg-indigo-950 rounded-xl p-8">
            <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 inline-flex items-center justify-center w-16 h-16 mb-6">
              <Video className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-purple-100 mb-8">{questions[currentQuestionIndex].text}</p>


            {recording && (
              <div className="mt-6 bg-black rounded-lg overflow-hidden mb-6">
                <video
                  ref={liveVideoRef}
                  width="100%"
                  height="400"
                  autoPlay
                  muted
                  className="mx-auto"
                />
              </div>
            )}


            {recording ? (
              <div className="flex justify-center items-center mb-6">
                <div className="flex items-center bg-red-900 bg-opacity-50 px-4 py-2 rounded-lg">
                  <div className="animate-pulse w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <p className="text-lg font-medium text-red-200">Recording...</p>
                </div>
                <button
                  onClick={stopRecording}
                  className="ml-4 px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-lg transition-all duration-300"
                >
                  Stop Recording
                </button>
              </div>
            ) : (
              <button
                onClick={() => setRecording(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                Start Recording
              </button>
            )}


            {videoUrl && !recording && (
              <div className="mt-8 mb-6">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Your Recording:</h3>
                <div className="bg-black rounded-lg overflow-hidden">
                  <video
                    ref={playbackVideoRef}
                    src={videoUrl}
                    width="100%"
                    height="400"
                    controls
                    className="mx-auto"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className={`inline-flex items-center px-8 py-4 rounded-full ${currentQuestionIndex > 0
                    ? 'border border-purple-300 bg-transparent hover:bg-purple-900 hover:bg-opacity-40 text-white transition-all duration-300'
                    : 'bg-indigo-800 text-indigo-400 cursor-not-allowed opacity-50'
                  }`}
              >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Previous Question
              </button>
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className={`inline-flex items-center px-8 py-4 rounded-full ${currentQuestionIndex < questions.length - 1
                    ? 'bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white shadow-lg transition-all duration-300 transform hover:-translate-y-1'
                    : 'bg-indigo-800 text-indigo-400 cursor-not-allowed opacity-50'
                  }`}
              >
                Next Question
                <ChevronRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>


        {error && (
          <div className="bg-red-900 bg-opacity-50 text-red-200 p-6 rounded-xl border border-red-700 mb-6">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoInterview;
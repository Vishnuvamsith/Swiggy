// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function SubmitFeedback() {
//   const [feedbackText, setFeedbackText] = useState('');
//   const [aiSummary, setAiSummary] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token, user } = useSelector((state) => state.auth);

//   // Initialize speech recognition
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       if (SpeechRecognition) {
//         const recognitionInstance = new SpeechRecognition();
//         recognitionInstance.continuous = true;
//         recognitionInstance.interimResults = true;
        
//         recognitionInstance.onresult = (event) => {
//           const transcript = Array.from(event.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('');
//           setFeedbackText(transcript);
//         };

//         setRecognition(recognitionInstance);
//       } else {
//         console.warn('Speech recognition not supported in this browser');
//       }
//     }

//     return () => {
//       if (recognition) {
//         recognition.stop();
//       }
//     };
//   }, []);

//   const handleRecord = () => {
//     if (!recognition) return;

//     if (!isRecording) {
//       recognition.start();
//       setIsRecording(true);
//     } else {
//       recognition.stop();
//       setIsRecording(false);
//     }
//   };

//   const generateAISummary = async () => {
//     if (!feedbackText.trim()) return;
    
//     setIsGenerating(true);
//     try {
//       const formData = new FormData();
//       formData.append('feedback_text', feedbackText);

//       const response = await fetch('http://127.0.0.1:5020/api/feedback-summary', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });
      
//       const data = await response.json();
//       if (response.ok) {
//         const summary = `Strengths: ${data.response.key_strengths}\n\nAreas for Improvement: ${data.response.development_areas}`;
//         setAiSummary(summary);
//       } else {
//         console.error('AI summary error:', data.message);
//       }
//     } catch (err) {
//       console.error('Network error:', err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const endpoint = user.role === 'manager'
//         ? 'http://127.0.0.1:5001/feedback/manager/feedbacks/submit-requested'
//         : 'http://127.0.0.1:5001/feedback/employee/feedbacks/submit';

//       const requestBody = {
//         feedbackId: id, // Using the ID from URL params for both roles
//         feedbackText,
//         aiSummary
//       };

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(requestBody)
//       });

//       if (response.ok) {
//         navigate('/dashboard');
//       } else {
//         const errorData = await response.json();
//         console.error('Submission error:', errorData.message);
//       }
//     } catch (err) {
//       console.error('Network error:', err);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">
//         {user.role === 'manager' ? 'Submit Requested Feedback' : 'Submit Your Feedback'}
//       </h1>
      
//       <div className="max-w-3xl space-y-6">
//         <div>
//           <label className="block text-gray-700 mb-2">
//             {user.role === 'manager' ? 'Your Feedback Response' : 'Your Feedback'}
//           </label>
//           <textarea
//             className="w-full px-3 py-2 border rounded h-32"
//             value={feedbackText}
//             onChange={(e) => setFeedbackText(e.target.value)}
//             placeholder={user.role === 'manager' 
//               ? "Type your feedback response to the employee's request"
//               : "Type your feedback or record using the button below"}
//           />
//           {user.role === 'employee' && (
//             <button
//               type="button"
//               onClick={handleRecord}
//               className={`mt-2 px-4 py-2 rounded ${
//                 isRecording 
//                   ? 'bg-red-500 text-white' 
//                   : 'bg-gray-200 hover:bg-gray-300'
//               }`}
//             >
//               {isRecording ? (
//                 <span className="flex items-center">
//                   <span className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
//                   Stop Recording
//                 </span>
//               ) : (
//                 'Record Voice Feedback'
//               )}
//             </button>
//           )}
//         </div>

//         <div>
//           <button
//             type="button"
//             onClick={generateAISummary}
//             disabled={!feedbackText || isGenerating}
//             className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
//           >
//             {isGenerating ? (
//               <span className="flex items-center">
//                 <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Generating...
//               </span>
//             ) : (
//               'AI Enhance Feedback'
//             )}
//           </button>
//         </div>

//         {aiSummary && (
//           <div>
//             <label className="block text-gray-700 mb-2">AI Enhanced Summary</label>
//             <textarea
//               className="w-full px-3 py-2 border rounded h-32"
//               value={aiSummary}
//               onChange={(e) => setAiSummary(e.target.value)}
//             />
//             <p className="text-sm text-gray-500 mt-1">
//               You can edit the AI summary before submitting
//             </p>
//           </div>
//         )}

//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={!feedbackText}
//             className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
//           >
//             Submit Feedback
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaMicrophone } from 'react-icons/fa';

export default function SubmitFeedback() {
  const [feedbackText, setFeedbackText] = useState('');
  const [aiSummary, setAiSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [recordingError, setRecordingError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setRecordingError('Speech recognition not supported in your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + ' ';
        } else {
          interim += transcript;
        }
      }
      
      if (final) {
        setFeedbackText(prev => prev + final);
        setInterimTranscript('');
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setRecordingError(`Recording error: ${event.error}`);
      stopRecording();
    };

    recognition.onend = () => {
      if (isRecording) {
        recognition.start(); // Restart if we're still supposed to be recording
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startRecording = () => {
    setRecordingError(null);
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setRecordingError('Failed to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    setInterimTranscript('');
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const generateAISummary = async () => {
    if (!feedbackText.trim()) return;
    
    setIsGenerating(true);
    try {
      const formData = new FormData();
      formData.append('feedback_text', feedbackText);

      const response = await fetch('http://127.0.0.1:5020/api/feedback-summary', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      if (response.ok) {
        const summary = `Strengths: ${data.response.key_strengths}\n\nAreas for Improvement: ${data.response.development_areas}`;
        setAiSummary(summary);
      } else {
        console.error('AI summary error:', data.message);
      }
    } catch (err) {
      console.error('Network error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const endpoint = user.role === 'manager'
        ? 'http://127.0.0.1:5001/feedback/manager/feedbacks/submit-requested'
        : 'http://127.0.0.1:5001/feedback/employee/feedbacks/submit';

      const requestBody = {
        feedbackId: id,
        feedbackText,
        aiSummary
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        console.error('Submission error:', errorData.message);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {user.role === 'manager' ? 'Submit Requested Feedback' : 'Submit Your Feedback'}
      </h1>
      
      <div className="max-w-3xl space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            {user.role === 'manager' ? 'Your Feedback Response' : 'Your Feedback'}
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded h-32"
            value={feedbackText + (interimTranscript ? ' ' + interimTranscript : '')}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder={user.role === 'manager' 
              ? "Type your feedback response to the employee's request"
              : "Type your feedback or record using the button below"}
          />
          {interimTranscript && (
            <p className="text-sm text-gray-500 mt-1">Listening...</p>
          )}
          {recordingError && (
            <p className="text-sm text-red-500 mt-1">{recordingError}</p>
          )}
          {/* Voice recording button - now available for both roles */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`mt-2 px-4 py-2 rounded flex items-center ${
              isRecording 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            <FaMicrophone className="mr-2" />
            {isRecording ? (
              <span className="flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                Stop Recording
              </span>
            ) : (
              'Record Voice Feedback'
            )}
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={generateAISummary}
            disabled={!feedbackText || isGenerating}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {isGenerating ? (
              <span className="flex items-center">
                <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              'AI Enhance Feedback'
            )}
          </button>
        </div>

        {aiSummary && (
          <div>
            <label className="block text-gray-700 mb-2">AI Enhanced Summary</label>
            <textarea
              className="w-full px-3 py-2 border rounded h-32"
              value={aiSummary}
              onChange={(e) => setAiSummary(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">
              You can edit the AI summary before submitting
            </p>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!feedbackText}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
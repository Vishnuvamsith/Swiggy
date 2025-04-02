// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function PendingFeedbacks() {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { token, user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!token || !user) {
//       navigate('/login');
//       return;
//     }

//     const fetchFeedbacks = async () => {
//         try {
//           setLoading(true);
//           setError(null);
          
//           const endpoint = user.role === 'manager'
//             ? 'http://127.0.0.1:5001/feedback/manager/feedbacks/pending'
//             : 'http://127.0.0.1:5001/feedback/employee/feedbacks/pending';
      
//           const response = await fetch(endpoint, {
//             headers: { 
//               'Authorization': `Bearer ${token}`,
//               'Content-Type': 'application/json'
//             }
//           });
      
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
      
//           const contentType = response.headers.get('content-type');
//           if (!contentType?.includes('application/json')) {
//             throw new Error('Invalid response format');
//           }
      
//           const data = await response.json();
//           // Extract the pendingFeedbacks array from the response
//           setFeedbacks(Array.isArray(data.pendingFeedbacks) ? data.pendingFeedbacks : []);
//         } catch (err) {
//           console.error('Error fetching feedbacks:', err);
//           setError('Failed to load pending feedbacks');
//           setFeedbacks([]);
//         } finally {
//           setLoading(false);
//         }
//       };

//     fetchFeedbacks();
//   }, [token, navigate, user]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl">Loading pending feedbacks...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           <strong>Error: </strong>
//           <span>{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Pending Feedbacks</h1>
      
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white rounded-lg overflow-hidden">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-3 px-4 text-left">About</th>
//               <th className="py-3 px-4 text-left">Requested By</th>
//               <th className="py-3 px-4 text-left">Date</th>
//               <th className="py-3 px-4 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedbacks.length > 0 ? (
//               feedbacks.map((feedback) => (
//                 <tr key={feedback._id} className="border-t hover:bg-gray-50">
//                   <td className="py-3 px-4">{feedback.feedbackOn?.name}</td>
//                   <td className="py-3 px-4">{feedback.requester?.name}</td>
//                   <td className="py-3 px-4">
//                     {new Date(feedback.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4">
//                     <button
//                       onClick={() => navigate(`/submit-feedback/${feedback._id}`)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                     >
//                       Submit Feedback
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="4" className="py-4 text-center text-gray-500">
//                   No pending feedback requests
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PendingFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const endpoint = user.role === 'manager'
          ? 'http://127.0.0.1:5001/feedback/manager/feedbacks/pending'
          : 'http://127.0.0.1:5001/feedback/employee/feedbacks/pending';
    
        const response = await fetch(endpoint, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          throw new Error('Invalid response format');
        }
    
        const data = await response.json();
        setFeedbacks(Array.isArray(data.pendingFeedbacks) ? data.pendingFeedbacks : []);
      } catch (err) {
        console.error('Error fetching feedbacks:', err);
        setError('Failed to load pending feedbacks');
        setFeedbacks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [token, navigate, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-10 w-64 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 w-full max-w-2xl">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error loading pending feedbacks</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pending Feedbacks</h1>
            <p className="text-sm text-gray-500 mt-1">
              {user?.role === 'manager' ? 'Feedback requests awaiting your response' : 'Feedback requests you need to complete'}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    About
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Requested
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback) => (
                    <tr key={feedback._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600 font-medium">
                              {feedback.feedbackOn?.name?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {feedback.feedbackOn?.name || 'Unknown'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{feedback.requester?.name}</div>
                        <div className="text-sm text-gray-500">{feedback.requester?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(feedback.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(feedback.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/submit-feedback/${feedback._id}`)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Respond
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No pending feedbacks</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {user?.role === 'manager' 
                          ? "You're all caught up! No pending feedback requests."
                          : "You have no pending feedback requests at this time."}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
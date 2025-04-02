// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function RequestFeedback() {
//   const [users, setUsers] = useState([]);
//   const [selectedReceivers, setSelectedReceivers] = useState([]);
//   const [selectedFeedbackOn, setSelectedFeedbackOn] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [loadingUsers, setLoadingUsers] = useState(true);
//   const navigate = useNavigate();
//   const { token, user } = useSelector((state) => state.auth);

//   // Filter out the selected feedback recipient from the receivers list
//   const availableReceivers = users.filter(user => user._id !== selectedFeedbackOn);

//   useEffect(() => {
//     if (!token || !user) {
//       navigate('/login');
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         setLoadingUsers(true);
//         const endpoint = user.role === 'manager' 
//           ? 'http://127.0.0.1:5001/feedback/manager/employees'
//           : 'http://127.0.0.1:5001/feedback/employee/peers-manager';

//         const response = await fetch(endpoint, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const contentType = response.headers.get('content-type');
//         if (!contentType?.includes('application/json')) {
//           throw new Error('Invalid response format');
//         }

//         const responseData = await response.json();
//         const usersArray = responseData.employees || [];
        
//         const processedUsers = usersArray.map(user => ({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role || 'employee'
//         }));

//         setUsers(processedUsers);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//         setError('Failed to load users. Please try again.');
//         setUsers([]);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     fetchUsers();
//   }, [token, navigate, user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedReceivers.length || !selectedFeedbackOn) {
//       setError('Please select at least one receiver and a feedback subject');
//       return;
//     }
  
//     setIsSubmitting(true);
//     setError('');
//     try {
//       const endpoint = user.role === 'manager'
//         ? 'http://127.0.0.1:5001/feedback/manager/feedbacks/submit'
//         : 'http://127.0.0.1:5001/feedback/employee/feedbacks/request';
  
//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           selectedEmployees: selectedReceivers,
//           feedbackOn: selectedFeedbackOn,
//           feedbackText: "Please provide your feedback", // Add default feedback text
//           sendToAll: false
//         })
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Request failed with status ${response.status}`);
//       }
  
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message || 'Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Request Feedback</h1>
      
//       <form onSubmit={handleSubmit} className="max-w-2xl">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Feedback About</label>
//           <select
//             className="w-full px-3 py-2 border rounded"
//             value={selectedFeedbackOn}
//             onChange={(e) => {
//               setSelectedFeedbackOn(e.target.value);
//               setSelectedReceivers([]); // Clear receivers when changing feedback subject
//             }}
//             required
//             disabled={loadingUsers}
//           >
//             <option value="">Select a person</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.email})
//               </option>
//             ))}
//           </select>
//           {loadingUsers && <p className="text-sm text-gray-500 mt-1">Loading users...</p>}
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Request Feedback From</label>
//           <select
//             multiple
//             className="w-full px-3 py-2 border rounded h-auto min-h-[100px]"
//             value={selectedReceivers}
//             onChange={(e) => setSelectedReceivers(
//               Array.from(e.target.selectedOptions, option => option.value)
//             )}
//             required
//             disabled={loadingUsers || !selectedFeedbackOn}
//           >
//             {availableReceivers.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.email})
//               </option>
//             ))}
//           </select>
//           <p className="text-sm text-gray-500 mt-1">
//             Hold Ctrl/Cmd to select multiple people
//           </p>
//           {loadingUsers && <p className="text-sm text-gray-500">Loading users...</p>}
//           {!loadingUsers && !selectedFeedbackOn && (
//             <p className="text-sm text-blue-500">Please select "Feedback About" first</p>
//           )}
//         </div>

//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate('/dashboard')}
//             className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting || loadingUsers}
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {isSubmitting ? 'Submitting...' : 'Request Feedback'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// export default function RequestFeedback() {
//   const [users, setUsers] = useState([]);
//   const [selectedReceivers, setSelectedReceivers] = useState([]);
//   const [selectedFeedbackOn, setSelectedFeedbackOn] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const [loadingUsers, setLoadingUsers] = useState(true);
//   const navigate = useNavigate();
//   const { token, user } = useSelector((state) => state.auth);

//   const availableReceivers = users.filter(user => user._id !== selectedFeedbackOn);

//   useEffect(() => {
//     if (!token || !user) {
//       navigate('/login');
//       return;
//     }

//     const fetchUsers = async () => {
//       try {
//         setLoadingUsers(true);
//         const endpoint = user.role === 'manager' 
//           ? 'http://127.0.0.1:5001/feedback/manager/employees'
//           : 'http://127.0.0.1:5001/feedback/employee/peers-manager';

//         const response = await fetch(endpoint, {
//           headers: { 
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const responseData = await response.json();
        
//         let usersArray = [];
//         if (user.role === 'manager') {
//           usersArray = responseData.employees || [];
//         } else {
//           usersArray = responseData.employees || [];
//           if (!usersArray.length && (responseData.peers || responseData.manager)) {
//             usersArray = [...(responseData.peers || []), ...(responseData.manager ? [responseData.manager] : [])];
//           }
//         }
        
//         const processedUsers = usersArray.map(user => ({
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           role: user.role || (user.role === undefined ? 'employee' : user.role)
//         }));

//         setUsers(processedUsers);
//       } catch (err) {
//         console.error('Error fetching users:', err);
//         setError('Failed to load users. Please try again.');
//         setUsers([]);
//       } finally {
//         setLoadingUsers(false);
//       }
//     };

//     fetchUsers();
//   }, [token, navigate, user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedReceivers.length || !selectedFeedbackOn) {
//       setError('Please select at least one receiver and a feedback subject');
//       return;
//     }

//     setIsSubmitting(true);
//     setError('');
//     try {
//       const endpoint = user.role === 'manager'
//         ? 'http://127.0.0.1:5001/feedback/manager/feedbacks/submit'
//         : 'http://127.0.0.1:5001/feedback/employee/feedbacks/request';

//       const response = await fetch(endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           selectedEmployees: selectedReceivers,
//           feedbackOn: selectedFeedbackOn,
//           feedbackText: "Please provide your feedback",
//           sendToAll: false
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({}));
//         throw new Error(errorData.message || `Request failed with status ${response.status}`);
//       }

//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message || 'Network error. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Request Feedback</h1>
      
//       <form onSubmit={handleSubmit} className="max-w-2xl">
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Feedback About</label>
//           <select
//             className="w-full px-3 py-2 border rounded"
//             value={selectedFeedbackOn}
//             onChange={(e) => {
//               setSelectedFeedbackOn(e.target.value);
//               setSelectedReceivers([]);
//             }}
//             required
//             disabled={loadingUsers}
//           >
//             <option value="">Select a person</option>
//             {users.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.email})
//               </option>
//             ))}
//           </select>
//           {loadingUsers && <p className="text-sm text-gray-500 mt-1">Loading users...</p>}
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 mb-2">Request Feedback From</label>
//           <select
//             multiple
//             className="w-full px-3 py-2 border rounded h-auto min-h-[100px]"
//             value={selectedReceivers}
//             onChange={(e) => setSelectedReceivers(
//               Array.from(e.target.selectedOptions, option => option.value)
//             )}
//             required
//             disabled={loadingUsers || !selectedFeedbackOn}
//           >
//             {availableReceivers.map((user) => (
//               <option key={user._id} value={user._id}>
//                 {user.name} ({user.email})
//               </option>
//             ))}
//           </select>
//           <p className="text-sm text-gray-500 mt-1">
//             Hold Ctrl/Cmd to select multiple people
//           </p>
//           {loadingUsers && <p className="text-sm text-gray-500">Loading users...</p>}
//           {!loadingUsers && !selectedFeedbackOn && (
//             <p className="text-sm text-blue-500">Please select "Feedback About" first</p>
//           )}
//         </div>

//         <div className="flex space-x-4">
//           <button
//             type="button"
//             onClick={() => navigate('/dashboard')}
//             className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting || loadingUsers}
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
//           >
//             {isSubmitting ? 'Submitting...' : 'Request Feedback'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function RequestFeedback() {
  const [users, setUsers] = useState([]);
  const [selectedReceivers, setSelectedReceivers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(true);
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  // For employees, the feedback is always about themselves
  const selectedFeedbackOn = user?.role === 'employee' ? user._id : '';
  const [managerSelectedFeedbackOn, setManagerSelectedFeedbackOn] = useState('');

  // Available receivers exclude the person being given feedback about
  const availableReceivers = user?.role === 'employee' 
    ? users.filter(u => u._id !== user._id) 
    : users.filter(u => u._id !== managerSelectedFeedbackOn);

  const handleReceiverChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedReceivers(selected);
  };

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoadingUsers(true);
        const endpoint = user.role === 'manager' 
          ? 'http://127.0.0.1:5001/feedback/manager/employees'
          : 'http://127.0.0.1:5001/feedback/employee/peers-manager';

        const response = await fetch(endpoint, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        
        let usersArray = [];
        if (user.role === 'manager') {
          usersArray = responseData.employees || [];
        } else {
          usersArray = responseData.employees || [];
          if (!usersArray.length && (responseData.peers || responseData.manager)) {
            usersArray = [...(responseData.peers || []), ...(responseData.manager ? [responseData.manager] : [])];
          }
        }
        
        const processedUsers = usersArray.map(user => ({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role || (user.role === undefined ? 'employee' : user.role)
        }));

        setUsers(processedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users. Please try again.');
        setUsers([]);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [token, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackOn = user.role === 'employee' ? user._id : managerSelectedFeedbackOn;
    
    if (selectedReceivers.length === 0) {
      setError('Please select at least one receiver');
      return;
    }
  
    if (user.role === 'manager' && !managerSelectedFeedbackOn) {
      setError('Please select a feedback subject');
      return;
    }
  
    setIsSubmitting(true);
    setError('');
    try {
      const endpoint = user.role === 'manager'
        ? 'http://127.0.0.1:5001/feedback/manager/feedbacks/submit'
        : 'http://127.0.0.1:5001/feedback/employee/feedbacks/request';
  
      const requestBody = user.role === 'manager' 
        ? {
            selectedEmployees: selectedReceivers,
            feedbackOn: feedbackOn,
            feedbackText: "Please provide your feedback on my performance",
            sendToAll: false
          }
        : {
            selectedEmployees: selectedReceivers,
            feedbackOn: feedbackOn,  // Explicitly including feedbackOn for employee
            feedbackText: "Please provide your feedback on my performance"
          };
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Request failed with status ${response.status}`);
      }
  
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Request Feedback</h1>
      
      <form onSubmit={handleSubmit} className="max-w-2xl">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Feedback About</label>
          {user.role === 'manager' ? (
            <select
              className="w-full px-3 py-2 border rounded"
              value={managerSelectedFeedbackOn}
              onChange={(e) => {
                setManagerSelectedFeedbackOn(e.target.value);
                setSelectedReceivers([]);
              }}
              required
              disabled={loadingUsers}
            >
              <option value="">Select a person</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className="w-full px-3 py-2 border rounded bg-gray-100"
              value={user.name}
              readOnly
              disabled
            />
          )}
          {loadingUsers && <p className="text-sm text-gray-500 mt-1">Loading users...</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Request Feedback From</label>
          <select
            multiple
            className="w-full px-3 py-2 border rounded h-auto min-h-[100px]"
            value={selectedReceivers}
            onChange={handleReceiverChange}
            required
            disabled={loadingUsers || (user.role === 'manager' && !managerSelectedFeedbackOn)}
          >
            {availableReceivers.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-1">
            Hold Ctrl/Cmd to select multiple people
          </p>
          {loadingUsers && <p className="text-sm text-gray-500">Loading users...</p>}
          {!loadingUsers && user.role === 'manager' && !managerSelectedFeedbackOn && (
            <p className="text-sm text-blue-500">Please select "Feedback About" first</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || loadingUsers || (user.role === 'manager' && !managerSelectedFeedbackOn)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Request Feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}
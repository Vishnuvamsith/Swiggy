// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCredentials, logout } from '../store/authSlice';

// export default function Dashboard() {
//   const [pendingCount, setPendingCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);

//   const fetchProfile = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5001/profile/profile', {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           dispatch(logout());
//           navigate('/login');
//           return null;
//         }
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const contentType = response.headers.get('content-type');
//       if (!contentType?.includes('application/json')) {
//         throw new Error('Invalid response format');
//       }

//       return await response.json();
//     } catch (err) {
//       console.error('Profile fetch error:', err);
//       setError('Failed to load profile data');
//       return null;
//     }
//   };

//   const fetchPendingCount = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5001/feedback/feedbacks/pending/count', {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       //console.log(response)

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const contentType = response.headers.get('content-type');
//       if (!contentType?.includes('application/json')) {
//         throw new Error('Invalid response format');
//       }

//       return await response.json();
//     } catch (err) {
//       console.error('Pending count fetch error:', err);
//       setError('Failed to load pending feedback count');
//       return { count: 0 };
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchAllData = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const [profileData, pendingData] = await Promise.all([
//           fetchProfile(),
//           fetchPendingCount()
//         ]);

//         if (profileData) {
//           dispatch(setCredentials({ 
//             token, 
//             user: profileData.user 
//           }));
//         }

//         if (pendingData) {
//           setPendingCount(pendingData.count);
//         }
//       } catch (err) {
//         console.error('Dashboard data fetch error:', err);
//         setError('Failed to load dashboard data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, [token, navigate, dispatch]);

//   if (!user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl">Loading user data...</div>
//       </div>
//     );
//   }

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl">Loading dashboard...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <button 
//           onClick={() => {
//             dispatch(logout());
//             navigate('/login');
//           }}
//           className="text-red-500 hover:text-red-700"
//         >
//           Logout
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded shadow mb-6">
//         <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <p className="text-gray-600">Name</p>
//             <p className="font-medium">{user.name}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Email</p>
//             <p className="font-medium">{user.userId}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Role</p>
//             <p className="font-medium capitalize">{user.role}</p>
//           </div>
//           <div>
//             <p className="text-gray-600">Token Expires</p>
//             <p className="font-medium">
//               {new Date(user.exp * 1000).toLocaleString()}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded shadow">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Pending Feedbacks</h2>
//           <span className={`px-3 py-1 rounded-full ${
//             pendingCount > 0 
//               ? 'bg-yellow-100 text-yellow-800' 
//               : 'bg-green-100 text-green-800'
//           }`}>
//             {pendingCount} pending
//           </span>
//         </div>
//         <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
//           <button
//             onClick={() => navigate('/pending-feedbacks')}
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             View All Pending
//           </button>
//           <button
//             onClick={() => navigate('/request-feedback')}
//             className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           >
//             Request New Feedback
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { setCredentials, logout } from '../store/authSlice';

// export default function Dashboard() {
//   const [pendingCount, setPendingCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);

//   const fetchProfile = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5001/profile/profile', {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           dispatch(logout());
//           navigate('/login');
//           throw new Error('Session expired. Please login again.');
//         }
//         throw new Error(`Failed to fetch profile: ${response.status}`);
//       }

//       return await response.json();
//     } catch (err) {
//       console.error('Profile fetch error:', err);
//       throw err;
//     }
//   };

//   const fetchPendingCount = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:5001/feedback/feedbacks/pending/count', {
//         headers: { 
//           'Authorization': `Bearer ${token}`,
//         }
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           dispatch(logout());
//           navigate('/login');
//           throw new Error('Session expired. Please login again.');
//         }
//         throw new Error(`Failed to fetch pending count: ${response.status}`);
//       }

//       const data = await response.json();
//       return data.totalPendingFeedbacks || 0;
//     } catch (err) {
//       console.error('Pending count fetch error:', err);
//       throw err;
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       navigate('/login');
//       return;
//     }

//     const fetchAllData = async () => {
//       setLoading(true);
//       setError(null);
      
//       try {
//         const [profileData, count] = await Promise.all([
//           fetchProfile(),
//           fetchPendingCount()
//         ]);

//         if (profileData) {
//           dispatch(setCredentials({ 
//             token, 
//             user: profileData.user 
//           }));
//         }

//         setPendingCount(count);
//       } catch (err) {
//         console.error('Dashboard data fetch error:', err);
//         setError(err.message || 'Failed to load dashboard data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();

//     // Refresh data every 5 minutes
//     const interval = setInterval(fetchAllData, 300000);
//     return () => clearInterval(interval);
//   }, [token, navigate, dispatch]);

//   if (loading && !user) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-xl">Loading user data...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//           <button 
//             onClick={() => window.location.reload()}
//             className="absolute top-0 bottom-0 right-0 px-4 py-3"
//           >
//             <svg className="fill-current h-6 w-6 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//               <path d="M14.66 15.66A8 8 0 1 1 17 10h-2a6 6 0 1 0-1.76 4.24l1.42 1.42zM12 10h8l-4 4-4-4z"/>
//             </svg>
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
//         <div className="flex items-center space-x-4">
//           {loading && (
//             <div className="flex items-center">
//               <svg className="animate-spin h-5 w-5 mr-2 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//               </svg>
//               <span>Refreshing...</span>
//             </div>
//           )}
//           <button 
//             onClick={() => {
//               dispatch(logout());
//               navigate('/login');
//             }}
//             className="text-red-500 hover:text-red-700 flex items-center"
//           >
//             <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//             </svg>
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="bg-gray-50 p-3 rounded">
//               <p className="text-gray-600 text-sm">Name</p>
//               <p className="font-medium">{user?.name || 'N/A'}</p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded">
//               <p className="text-gray-600 text-sm">Email</p>
//               <p className="font-medium">{user?.userId || 'N/A'}</p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded">
//               <p className="text-gray-600 text-sm">Role</p>
//               <p className="font-medium capitalize">{user?.role || 'N/A'}</p>
//             </div>
//             <div className="bg-gray-50 p-3 rounded">
//               <p className="text-gray-600 text-sm">Token Expires</p>
//               <p className="font-medium">
//                 {user?.exp ? new Date(user.exp * 1000).toLocaleString() : 'N/A'}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Feedback Status</h2>
//             <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//               pendingCount > 0 
//                 ? 'bg-yellow-100 text-yellow-800' 
//                 : 'bg-green-100 text-green-800'
//             }`}>
//               {pendingCount} pending
//             </span>
//           </div>
//           <div className="space-y-3">
//             <button
//               onClick={() => navigate('/pending-feedbacks')}
//               className="w-full flex items-center justify-between bg-blue-50 text-blue-600 px-4 py-3 rounded hover:bg-blue-100 transition-colors"
//             >
//               <span>View Pending Feedbacks</span>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//             <button
//               onClick={() => navigate('/request-feedback')}
//               className="w-full flex items-center justify-between bg-green-50 text-green-600 px-4 py-3 rounded hover:bg-green-100 transition-colors"
//             >
//               <span>Request New Feedback</span>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//               </svg>
//             </button>
//             {user?.role === 'manager' && (
//               <button
//                 onClick={() => navigate('/team-feedbacks')}
//                 className="w-full flex items-center justify-between bg-purple-50 text-purple-600 px-4 py-3 rounded hover:bg-purple-100 transition-colors"
//               >
//                 <span>Team Feedback Overview</span>
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                 </svg>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow">
//         <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           <button 
//             onClick={() => navigate('/my-feedbacks')}
//             className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
//           >
//             <h3 className="font-medium mb-1">My Feedbacks</h3>
//             <p className="text-sm text-gray-600">View feedback you've given and received</p>
//           </button>
//           <button 
//             onClick={() => navigate('/profile-settings')}
//             className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
//           >
//             <h3 className="font-medium mb-1">Profile Settings</h3>
//             <p className="text-sm text-gray-600">Update your account information</p>
//           </button>
//           {user?.role === 'manager' && (
//             <button 
//               onClick={() => navigate('/team-performance')}
//               className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
//             >
//               <h3 className="font-medium mb-1">Team Performance</h3>
//               <p className="text-sm text-gray-600">View your team's feedback trends</p>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials, logout } from '../store/authSlice';

export default function Dashboard() {
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  const fetchProfile = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/profile/profile', {
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          dispatch(logout());
          navigate('/login');
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(`Failed to fetch profile: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Profile fetch error:', err);
      throw err;
    }
  };

  const fetchPendingCount = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/feedback/feedbacks/pending/count', {
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          dispatch(logout());
          navigate('/login');
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(`Failed to fetch pending count: ${response.status}`);
      }

      const data = await response.json();
      return data.totalPendingFeedbacks || 0;
    } catch (err) {
      console.error('Pending count fetch error:', err);
      throw err;
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [profileData, count] = await Promise.all([
          fetchProfile(),
          fetchPendingCount()
        ]);

        if (profileData) {
          dispatch(setCredentials({ 
            token, 
            user: profileData.user 
          }));
        }

        setPendingCount(count);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();

    // Refresh data every 5 minutes
    const interval = setInterval(fetchAllData, 300000);
    return () => clearInterval(interval);
  }, [token, navigate, dispatch]);

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
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
              <h3 className="text-sm font-medium text-red-800">Error loading dashboard</h3>
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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            {loading && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                <svg className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            )}
            <button
              onClick={() => {
                dispatch(logout());
                navigate('/login');
              }}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </button>
          </div>
        </div>

        {/* Stats and Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Your Profile</h3>
                  <div className="mt-1 text-sm text-gray-500">
                    <p>Role: <span className="capitalize">{user?.role || 'N/A'}</span></p>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email</p>
                  <p className="mt-1 text-sm text-gray-900 truncate">{user?.userId || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Token Expires</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.exp ? new Date(user.exp * 1000).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Feedback Card */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <h3 className="text-lg font-medium text-gray-900">Pending Feedbacks</h3>
                  <div className="mt-1 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900">{pendingCount}</p>
                    <span className="ml-2 text-sm font-medium text-gray-500">awaiting your response</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => navigate('/pending-feedbacks')}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  View All Pending
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Feedback Actions</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <button
                onClick={() => navigate('/pending-feedbacks')}
                className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-md">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 text-left">Review Pending</h4>
                  <p className="text-sm text-gray-500 mt-1 text-left">Respond to feedback requests</p>
                </div>
              </button>
              
              <button
                onClick={() => navigate('/request-feedback')}
                className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-4 hover:border-indigo-500 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
              >
                <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-md">
                  <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 text-left">Request Feedback</h4>
                  <p className="text-sm text-gray-500 mt-1 text-left">Ask for new feedback</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import Api from '../../Api/Api';

const AllCourseRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    const fetchCourseRequests = async () => {
      try {
        const token = localStorage.getItem('Admin-Token');
        const response = await Api.get('/Admin/get-all-course-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPendingRequests(response.data.pendingRequests);
        setApprovedRequests(response.data.approvedRequests);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch course requests', error);
        setError('Failed to load course requests.');
        setLoading(false);
      }
    };

    fetchCourseRequests();
  }, []);

  const handleApprove = async (courseId, studentId) => {
    try {
      const token = localStorage.getItem('Admin-Token');
      const response = await Api.post(
        '/Admin/approve-course-request',
        { courseId, studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      const updatedPendingRequests = pendingRequests.filter((request) => request.courseId !== courseId);
      const approvedRequest = pendingRequests.find((request) => request.courseId === courseId);
      setPendingRequests(updatedPendingRequests);
      setApprovedRequests([...approvedRequests, { ...approvedRequest, approve: true }]);
    } catch (err) {
      console.error('Failed to approve course request', err);
      alert('Error approving course request.');
    }
  };

  const handleDeny = async (courseId, studentId) => {
    try {
      const token = localStorage.getItem('Admin-Token');
      const response = await Api.post(
        '/Admin/deny-course-request',
        { courseId, studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
      setPendingRequests(pendingRequests.filter((request) => request.courseId !== courseId));
    } catch (err) {
      console.error('Failed to deny course request', err);
      alert('Error denying course request.');
    }
  };

  const handleComplete = async (courseId, studentId) => {
    try {
      const token = localStorage.getItem('Admin-Token');
      const response = await Api.post(
        '/Admin/complete-course',
        { courseId, studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (err) {
      console.error('Failed to complete course', err);
      alert('Error marking course as complete.');
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div className="alert error">{error}</div>;
  }

  return (
    <div className="container">
      <style>
        {`
          .container {
            padding: 20px;
          }

          .tab-group {
            display: flex;
            gap: 24px;
            margin-bottom: 24px;
          }

          .tab-button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s, color 0.2s;
          }

          .tab-button.active {
            background-color: #3182ce;
            color: white;
          }

          .tab-button:not(.active) {
            background-color: #edf2f7;
            color: #4a5568;
          }

          .content-box {
            flex: 1;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .title {
            font-size: 24px;
            margin-bottom: 20px;
            font-weight: bold;
            color: #3182ce;
          }

          .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 16px;
          }

          .table th,
          .table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }

          .table th {
            background-color: #f7fafc;
            font-weight: 600;
            color: #4a5568;
          }

          .button-group {
            display: flex;
            gap: 12px;
          }

          .button {
            padding: 6px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 500;
            font-size: 14px;
            transition: opacity 0.2s;
          }

          .button:hover {
            opacity: 0.9;
          }

          .button-green {
            background-color: #38a169;
            color: white;
          }

          .button-red {
            background-color: #e53e3e;
            color: white;
          }

          .button-blue {
            background-color: #3182ce;
            color: white;
          }

          .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3182ce;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .alert {
            padding: 12px 16px;
            border-radius: 4px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
          }

          .error {
            background-color: #fed7d7;
            color: #c53030;
          }

          .empty-message {
            text-align: center;
            padding: 20px;
            color: #718096;
          }
        `}
      </style>

      <div className="tab-group">
        <button
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Course Requests
        </button>
        <button
          className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          Approved Courses
        </button>
      </div>

      <div className="content-box">
        <h2 className="title">
          {activeTab === 'pending' ? 'Pending Course Requests' : 'Approved Courses'}
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Mobile Number</th>
              <th>Batch Number</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'pending' ? (
              pendingRequests.length > 0 ? (
                pendingRequests.map((request, index) => (
                  <tr key={request._id}>
                    <td>{index + 1}</td>
                    <td>{request.userName}</td>
                    <td>{request.mobileno}</td>
                    <td>{request.batchNumber}</td>
                    <td>{request.courseName}</td>
                    <td>
                      <div className="button-group">
                        <button 
                          className="button button-green"
                          onClick={() => handleApprove(request.courseId, request.studentId)}
                        >
                          Approve
                        </button>
                        <button 
                          className="button button-red"
                          onClick={() => handleDeny(request.courseId, request.studentId)}
                        >
                          Deny
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-message">
                    No pending requests found.
                  </td>
                </tr>
              )
            ) : (
              approvedRequests.length > 0 ? (
                approvedRequests.map((request, index) => (
                  <tr key={request._id}>
                    <td>{index + 1}</td>
                    <td>{request.userName}</td>
                    <td>{request.mobileno}</td>
                    <td>{request.batchNumber}</td>
                    <td>{request.courseName}</td>
                    <td>
                      <button 
                        className="button button-blue"
                        onClick={() => handleComplete(request.courseId, request.studentId)}
                      >
                        Complete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-message">
                    No approved requests found.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCourseRequests;
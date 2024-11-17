  import React, { useEffect, useState } from 'react';
  import { 
    Box, Button, Input, Table, Thead, Tbody, Tr, Th, Td, Text, Spinner, Alert, AlertIcon, 
    ChakraProvider, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
    ModalCloseButton, FormControl, FormLabel, Stack, useToast
  } from '@chakra-ui/react';
  import Api from '../../Api/Api';
  import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
  import moment from 'moment';

  const UserDetails = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [filteredUserDetails, setFilteredUserDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUserResponses, setSelectedUserResponses] = useState(null);
    const [loadingResponses, setLoadingResponses] = useState(false);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [progressData, setProgressData] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [showResponses, setShowResponses] = useState(false);
    const [editFormData, setEditFormData] = useState({
      name: '',
      email: '',
      age: '',
      mobileno: '',
      batchno: ''
    });

    const toast = useToast();

    // Fetch User Details
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const token = localStorage.getItem('Admin-Token');
          if (!token) {
            setError('No token found. Please login again.');
            setLoading(false);
            return;
          }

          const response = await Api.get('/Admin/alluser', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUserDetails(response.data);
          setFilteredUserDetails(response.data);
          setLoading(false);
        } catch (err) {
          console.error('Failed to fetch user details', err);
          setError('Failed to load user details.');
          setLoading(false);
        }
      };

      fetchUserDetails();
    }, []);

    // Handle Search
    const handleSearchChange = (e) => {
      const term = e.target.value;
      setSearchTerm(term);
      if (term.trim() === "") {
        setFilteredUserDetails(userDetails);
      } else {
        const filtered = userDetails.filter((user) => 
          user.name.toLowerCase().includes(term.toLowerCase()) ||
          user.email.toLowerCase().includes(term.toLowerCase()) ||
          user.studentId.toString().includes(term) ||
          (user.batchno && user.batchno.toLowerCase().includes(term.toLowerCase()))
        );
        setFilteredUserDetails(filtered);
      }
    };

    // View User Responses
    const handleViewResponses = async (studentId) => {
      setLoadingResponses(true);
      try {
        const token = localStorage.getItem('Admin-Token');
        const response = await Api.get(`/Admin/responses/${studentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.data.responseData || response.data.responseData.responses.length === 0) {
          toast({
            title: "No Responses",
            description: "This user hasn't submitted any responses yet.",
            status: "info",
            duration: 3000,
            isClosable: true,
          });
          setLoadingResponses(false);
          return;
        }

        setSelectedUserResponses(response.data.responseData || []);
        setAnalyticsData(response.data.analytics || {});
        setShowResponses(true);
      } catch (err) {
        console.error('Failed to fetch responses', err);
        toast({
          title: "Error",
          description: "Failed to fetch user responses.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
      setLoadingResponses(false);
    };

    // Close Responses Modal
    const handleCloseResponses = () => {
      setShowResponses(false);
      setSelectedUserResponses(null);
      setAnalyticsData(null);
    };

    // Edit User Details
    const handleEditClick = (user) => {
      setEditingUser(user);
      setEditFormData({
        name: user.name,
        email: user.email,
        age: user.age,
        mobileno: user.mobileno,
        batchno: user.batchno || ''
      });
    };

    // Handle Form Change
    const handleEditFormChange = (e) => {
      const { name, value } = e.target;
      setEditFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    // Submit the Edited User Details
    const handleEditSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const token = localStorage.getItem('Admin-Token');
        if (!token) {
          throw new Error('No token found. Please login again.');
        }

        const response = await Api.patch(`/Admin/user/${editingUser.studentId}`, editFormData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.data) {
          throw new Error('Failed to update user details');
        }

        const updatedUsers = userDetails.map(user => 
          user.studentId === editingUser.studentId ? { ...user, ...editFormData } : user
        );
        setUserDetails(updatedUsers);
        setFilteredUserDetails(updatedUsers);
        setEditingUser(null);
        
        toast({
          title: "Success",
          description: "User details updated successfully!",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (err) {
        console.error('Failed to update user details', err);
        toast({
          title: "Error",
          description: err.message || 'Failed to update user details. Please try again later.',
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    const isValidPhoneNumber = (phoneNumber) => {
      const phoneRegex = /^[0-9]{7,15}$/;
      return phoneRegex.test(phoneNumber);
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
              background: white;
              color: black;
            }

            .title {
              font-size: 24px;
              margin-bottom: 16px;
            }

            .search-input {
              width: 100%;
              padding: 8px 12px;
              margin-bottom: 16px;
              border: 1px solid #e2e8f0;
              border-radius: 4px;
            }

            .table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 16px;
            }

            .table th,
            .table td {
              padding: 12px;
              border-bottom: 1px solid #e2e8f0;
              text-align: left;
            }

            .table th {
              background-color: #f7fafc;
              font-weight: 600;
            }

            .table tr:nth-child(even) {
              background-color: #f8f9fa;
            }

            .button {
              padding: 8px 16px;
              border-radius: 4px;
              border: none;
              cursor: pointer;
              font-weight: 500;
              margin-right: 8px;
            }

            .button-blue {
              background-color: #3182ce;
              color: white;
            }

            .button-green {
              background-color: #38a169;
              color: white;
            }

            .button-red {
              background-color: #e53e3e;
              color: white;
            }

            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .modal {
              background: white;
              padding: 24px;
              border-radius: 8px;
              width: 90%;
              max-width: 500px;
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 16px;
            }

            .form-group {
              margin-bottom: 16px;
            }

            .form-label {
              display: block;
              margin-bottom: 8px;
              font-weight: 500;
            }

            .form-input {
              width: 100%;
              padding: 8px 12px;
              border: 1px solid #e2e8f0;
              border-radius: 4px;
            }

            .spinner {
              border: 4px solid #f3f3f3;
              border-top: 4px solid #3182ce;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            .alert {
              padding: 12px;
              border-radius: 4px;
              margin-bottom: 16px;
            }

            .error {
              background-color: #fed7d7;
              color: #c53030;
            }

            .flex {
              display: flex;
            }

            .flex-end {
              justify-content: flex-end;
            }

            .gap-2 {
              gap: 8px;
            }
          `}
        </style>

        <h1 className="title">User Details</h1>
        <input
          className="search-input"
          placeholder="Search by name, email, or student ID..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Edit Modal */}
        {editingUser && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>Edit User Details</h2>
                <button onClick={() => setEditingUser(null)}>&times;</button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    className="form-input"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    className="form-input"
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Age</label>
                  <input
                    className="form-input"
                    type="number"
                    name="age"
                    value={editFormData.age}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    className="form-input"
                    name="mobileno"
                    value={editFormData.mobileno}
                    onChange={handleEditFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Batch Number</label>
                  <input
                    className="form-input"
                    name="batchno"
                    value={editFormData.batchno}
                    onChange={handleEditFormChange}
                  />
                </div>

                <div className="flex flex-end gap-2">
                  <button 
                    className="button" 
                    type="button" 
                    onClick={() => setEditingUser(null)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="button button-blue" 
                    type="submit" 
                    disabled={loading}
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* User Table */}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
              <th>Age</th>
              <th>Phone Number</th>
              <th>Batch Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserDetails.length > 0 ? (
              filteredUserDetails.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.studentId}</td>
                  <td>{user.age}</td>
                  <td>{isValidPhoneNumber(user.mobileno) ? user.mobileno : 'Invalid'}</td>
                  <td>{user.batchno || 'No Batch'}</td>
                  <td>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewResponses(user.studentId)} 
                        className="button button-blue"
                      >
                        View
                      </button>
                      <button 
                        onClick={() => handleEditClick(user)} 
                        className="button button-green"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{textAlign: 'center'}}>No users found.</td>
              </tr>
            )}
          </tbody>
        </table>

        {loadingResponses && <div className="spinner"></div>}

        {/* Responses Section */}
        {showResponses && selectedUserResponses && (
          <div className="responses-section">
            <div className="flex" style={{justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <h2 className="title">
                Responses for Student ID: {selectedUserResponses.studentId}
              </h2>
              <button 
                onClick={handleCloseResponses}
                className="button button-red"
              >
                Close Responses
              </button>
            </div>
            
            <table className="table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Response Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedUserResponses.responses.map((response, index) => (
                  <tr key={index}>
                    <td>{response.questionText}</td>
                    <td>{response.answer}</td>
                    <td>{moment(response.responseDate).format('YYYY-MM-DD')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
    {selectedUserResponses.responses.length > 0 && (
      <div style={{ marginTop: '20px', height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={selectedUserResponses.responses}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="responseDate" 
              tickFormatter={(date) => moment(date).format('YYYY-MM-DD')} 
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="answer" stroke="#82ca9d" name="Answer" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}

          </div>
        )}

        {/* Analytics Section */}
        {showResponses && analyticsData && (
          <div style={{marginTop: '20px'}}>
            <h2 className="title">Analytics</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Yes Count</th>
                  <th>No Count</th>
                  <th>Total Multiple Choice</th>
                  <th>Total Short Text</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData.analyticsResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.questionText}</td>
                    <td>{result.yesCount}</td>
                    <td>{result.noCount}</td>
                    <td>{result.multipleChoiceCounts.length}</td>
                    <td>{result.shortTextResponses.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  export default UserDetails;
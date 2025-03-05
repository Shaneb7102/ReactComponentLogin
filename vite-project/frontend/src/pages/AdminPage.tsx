import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers, logoutUser, updateUserRole } from "../services/api";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Available roles
  const availableRoles = ["ADMINISTRATOR", "RESEARCHER", "POLICYMAKER", "DATA_ANALYST"];

  // Load users when component mounts
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      const userData = await fetchAllUsers();
      setUsers(userData);
      setIsLoading(false);
    };
    
    loadUsers();
  }, []);

  // Open the role edit modal
  const openEditModal = (user: any) => {
    setSelectedUser({...user});
    setIsModalOpen(true);
  };

  // Close the role edit modal
  const closeEditModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  // Handle role change in the form
  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        role: e.target.value
      });
    }
  };

  // Save the role change
  const handleSaveRole = async () => {
    if (selectedUser) {
      try {
        const success = await updateUserRole(selectedUser.email, selectedUser.role);
        
        if (success) {
          // Update local state
          setUsers(users.map(user => 
            user.email === selectedUser.email 
              ? { ...user, role: selectedUser.role } 
              : user
          ));
          
          setSuccessMessage("User role updated successfully");
          setTimeout(() => setSuccessMessage(""), 3000);
        } else {
          setErrorMessage("Failed to update user role");
          setTimeout(() => setErrorMessage(""), 3000);
        }
      } catch (error) {
        console.error("Error saving role:", error);
        setErrorMessage("An error occurred");
      }
      
      closeEditModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">User Management</h1>
          <Link to="/end" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Back to Dashboard
          </Link>
          <button 
    onClick={logoutUser}
    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
  >
    Logout
  </button>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
            <p>{successMessage}</p>
          </div>
        )}
        
        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{errorMessage}</p>
          </div>
        )}

        {isLoading ? (
          <p>Loading users...</p>
        ) : (
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.email}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(user)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Role Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Edit User Role</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">
                <span className="font-medium">Email:</span> {selectedUser.email}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Current Role:</span> {selectedUser.role}
              </p>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Role
              </label>
              <select
                value={selectedUser.role}
                onChange={handleRoleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {availableRoles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveRole}
                className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
import React, { useState } from 'react';
import { 
  Users, Settings, Calendar, Activity, 
  LogOut, Shield, Edit, Trash, Plus,
  Save, X
} from 'lucide-react';

// Mock authentication - in a real app, you'd want to use a proper auth system
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = (credentials) => {
    
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };
  
  return { isAuthenticated, login, logout };
};

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(credentials)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-blue-900">Admin Login</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({...prev, username: e.target.value}))}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({...prev, password: e.target.value}))}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminPanel = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('members');
  const [members, setMembers] = useState([
    { id: 1, role: 'President', name: 'Posholi Makotoko' },
    { id: 2, role: 'Vice-president', name: 'Mpho Metsing' },
    { id: 3, role: 'Chief Organiser', name: 'Khauhelo Nthunya' },
    { id: 4, role: 'Secretary', name: 'Senate Peete' },
    { id: 5, role: 'Vice-secretary', name: 'Teboho Mphakonyane' }
  ]);
  
  const [activities, setActivities] = useState([
    'Seminars',
    'Mental health care',
    'Educational trips',
    'Annual debates',
    'Weekly group meetings',
    'Collaborations and partnerships'
  ]);

  const [editingMember, setEditingMember] = useState(null);
  const [editingActivity, setEditingActivity] = useState(null);

  if (!isAuthenticated) {
    return <LoginForm onLogin={login} />;
  }

  const handleUpdateMember = (id, updatedData) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, ...updatedData } : member
    ));
    setEditingMember(null);
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleAddMember = () => {
    const newMember = {
      id: members.length + 1,
      role: 'New Role',
      name: 'New Member'
    };
    setMembers([...members, newMember]);
    setEditingMember(newMember.id);
  };

  const handleUpdateActivity = (index, newValue) => {
    setActivities(activities.map((activity, i) => 
      i === index ? newValue : activity
    ));
    setEditingActivity(null);
  };

  const handleDeleteActivity = (index) => {
    setActivities(activities.filter((_, i) => i !== index));
  };

  const handleAddActivity = () => {
    setActivities([...activities, 'New Activity']);
    setEditingActivity(activities.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-900 text-white">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Members', icon: Users, id: 'members' },
            { name: 'Activities', icon: Activity, id: 'activities' },
            { name: 'Settings', icon: Settings, id: 'settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-6 py-3 text-left ${
                activeSection === item.id ? 'bg-blue-800' : 'hover:bg-blue-800'
              }`}
            >
              <item.icon className="mr-4" size={20} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-800 rounded-md hover:bg-blue-700"
          >
            <LogOut className="mr-2" size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        {activeSection === 'members' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-900">Manage Members</h2>
              <button
                onClick={handleAddMember}
                className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              >
                <Plus className="mr-2" size={20} />
                Add Member
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {members.map(member => (
                    <tr key={member.id}>
                      <td className="px-6 py-4">
                        {editingMember === member.id ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 border rounded"
                            defaultValue={member.role}
                            onBlur={(e) => handleUpdateMember(member.id, { role: e.target.value })}
                          />
                        ) : (
                          member.role
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {editingMember === member.id ? (
                          <input
                            type="text"
                            className="w-full px-2 py-1 border rounded"
                            defaultValue={member.name}
                            onBlur={(e) => handleUpdateMember(member.id, { name: e.target.value })}
                          />
                        ) : (
                          member.name
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'activities' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-900">Manage Activities</h2>
              <button
                onClick={handleAddActivity}
                className="flex items-center px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800"
              >
                <Plus className="mr-2" size={20} />
                Add Activity
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  {editingActivity === index ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-1 px-2 py-1 border rounded"
                        defaultValue={activity}
                        onBlur={(e) => handleUpdateActivity(index, e.target.value)}
                      />
                      <button
                        onClick={() => setEditingActivity(null)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span>{activity}</span>
                      <div className="space-x-2">
                        <button
                          onClick={() => setEditingActivity(index)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Settings</h2>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-600">Settings panel content would go here...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
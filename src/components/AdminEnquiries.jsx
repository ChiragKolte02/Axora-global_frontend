import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { 
  Mail, 
  User, 
  Phone, 
  Building, 
  Calendar, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  LogOut,
  Home,
  Shield,
  Key,
  Menu,
  X
} from 'lucide-react';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        // Redirect to login if no user data
        navigate('/admin/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fetch enquiries from backend using Axios
  const fetchEnquiries = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get("/api/enquiries");
      
      if (response.data.success) {
        setEnquiries(response.data.data);
      } else {
        throw new Error(response.data.error || 'Failed to fetch enquiries');
      }
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      if (error.response?.status === 401) {
        // Token expired or invalid
        handleLogout();
      } else {
        setError(error.response?.data?.error || error.message || 'Failed to load enquiries. Please check backend connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await api.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminLoggedIn');
      
      // Redirect to login
      navigate('/admin/login');
    }
  };

  // Filter enquiries based on search and status
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (enquiry.company && enquiry.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      enquiry.enquiry.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Update enquiry status using Axios
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await api.patch(
        `/api/enquiries/${id}/status`,
        { status: newStatus }
      );

      if (response.data.success) {
        // Update local state
        setEnquiries(prev => prev.map(enq => 
          enq._id === id ? { ...enq, status: newStatus } : enq
        ));
        
        // Update selected enquiry if open
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry(prev => ({ ...prev, status: newStatus }));
        }
        
        // Show success notification
        alert(`Status updated to ${newStatus}`);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        alert(error.response?.data?.error || 'Failed to update status');
      }
    }
  };

  // Delete enquiry using Axios
  const deleteEnquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    
    try {
      const response = await api.delete(`/api/enquiries/${id}`);

      if (response.data.success) {
        // Remove from local state
        setEnquiries(prev => prev.filter(enq => enq._id !== id));
        
        // Close modal if open
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry(null);
        }
        
        // Show success notification
        alert('Enquiry deleted successfully');
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error('Error deleting enquiry:', error);
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        alert(error.response?.data?.error || 'Failed to delete enquiry');
      }
    }
  };

  // Export to CSV using Axios
  const exportToCSV = async () => {
    try {
      const response = await api.get(
        "/api/enquiries/export/csv",
        { responseType: 'blob' }
      );
      
      // Create blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      
      // Set filename and trigger download
      const date = new Date().toISOString().split('T')[0];
      link.href = url;
      link.setAttribute('download', `axora_enquiries_${date}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      // Clean up
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        alert('Failed to export CSV. Please try again.');
      }
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    const config = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
      contacted: { color: 'bg-blue-100 text-blue-800', icon: <Eye className="w-3 h-3" /> },
      resolved: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
    };
    
    const { color, icon } = config[status] || { color: 'bg-gray-100 text-gray-800', icon: null };
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${color}`}>
        {icon}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Stats calculation
  const stats = {
    total: enquiries.length,
    pending: enquiries.filter(e => e.status === 'pending').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    resolved: enquiries.filter(e => e.status === 'resolved').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  if (error && error.includes('401')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Session Expired</h3>
            <p className="text-gray-600 mb-6">Your session has expired. Please login again.</p>
            <button
              onClick={() => navigate('/admin/login')}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Echo_global_icon.svg/2048px-Echo_global_icon.svg.png" 
                    alt="Logo"
                    className="w-8 h-8 filter brightness-0 invert"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                  <p className="text-xs text-gray-500">Axora Global Import & Export</p>
                </div>
              </div>
            </div>

            {/* Desktop User Info & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Key className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition duration-300"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-lg">
          <div className="px-4 py-3 space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.username || 'Admin'}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
            
            <button
              onClick={() => {
                navigate('/');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition duration-300"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-300"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Enquiry Management</h1>
              <p className="text-gray-600">Manage all customer enquiries from the website</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchEnquiries}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && !error.includes('401') && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h3 className="text-lg font-semibold text-red-800">Connection Error</h3>
            </div>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchEnquiries}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              <RefreshCw className="w-4 h-4" />
              Retry Connection
            </button>
            <p className="text-sm text-gray-500 mt-4">
              Make sure the backend server is running on http://localhost:5000
            </p>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-gray-800 mb-2">{stats.total}</div>
            <div className="text-gray-600">Total Enquiries</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.pending}</div>
            <div className="text-gray-600">Pending</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.contacted}</div>
            <div className="text-gray-600">Contacted</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.resolved}</div>
            <div className="text-gray-600">Resolved</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                  placeholder="Search by name, email, company..."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition duration-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filteredEnquiries.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <Mail className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No enquiries found</h3>
              <p className="text-gray-500">
                {enquiries.length === 0 
                  ? 'No enquiries have been submitted yet.' 
                  : 'No enquiries match your search criteria.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry._id} className="hover:bg-gray-50 transition duration-300">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900">{enquiry.name}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {enquiry.company || 'No company'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            {enquiry.email}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4" />
                            {enquiry.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={enquiry.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedEnquiry(enquiry)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(enquiry._id, 'contacted')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300"
                            title="Mark as Contacted"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateStatus(enquiry._id, 'resolved')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition duration-300"
                            title="Mark as Resolved"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteEnquiry(enquiry._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-300"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Enquiry Details</h2>
                  <p className="text-gray-600">
                    Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={selectedEnquiry.status} />
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <XCircle className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Customer Name</label>
                  <div className="mt-2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-lg font-medium">{selectedEnquiry.name}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <div className="mt-2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Building className="w-5 h-5 text-gray-400" />
                    <span className="text-lg">{selectedEnquiry.company || 'Not provided'}</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <div className="mt-2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <a 
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-lg text-blue-600 hover:text-blue-800 transition duration-300"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone</label>
                  <div className="mt-2 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a 
                      href={`tel:${selectedEnquiry.phone}`}
                      className="text-lg text-blue-600 hover:text-blue-800 transition duration-300"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 mb-2 block">Enquiry Details</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="whitespace-pre-line text-gray-700">{selectedEnquiry.enquiry}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 mb-3 block">Update Status</label>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => updateStatus(selectedEnquiry._id, 'pending')}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                      selectedEnquiry.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Mark as Pending
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry._id, 'contacted')}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                      selectedEnquiry.status === 'contacted'
                        ? 'bg-blue-100 text-blue-800 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Mark as Contacted
                  </button>
                  <button
                    onClick={() => updateStatus(selectedEnquiry._id, 'resolved')}
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                      selectedEnquiry.status === 'resolved'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Mark as Resolved
                  </button>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">Danger Zone</h3>
                  <button
                    onClick={() => deleteEnquiry(selectedEnquiry._id)}
                    className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
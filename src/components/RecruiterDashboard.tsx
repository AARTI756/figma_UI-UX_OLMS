import { useState } from 'react';
import { 
  LayoutDashboard, Users, FileText, Settings, 
  Plus, Filter, TrendingUp, Clock, CheckCircle, XCircle, 
  AlertCircle, BarChart3, Calendar, Send, Eye, Edit, Upload,
 Download, Mail, Phone, MapPin, Briefcase
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CandidatePipeline } from './CandidatePipeline';
import { WorkflowTracker } from './WorkflowTracker';

interface RecruiterDashboardProps {
  onBackToSelection: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  onWorkflowNavigate?: (role: 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin', view: string, data?: any) => void;
  workflowData?: any;
}

export function RecruiterDashboard({ onBackToSelection, currentView, setCurrentView, onWorkflowNavigate, workflowData }: RecruiterDashboardProps) {
  const [notifications, setNotifications] = useState(7);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);

  // Mock data
  const candidates = [
    { id: 1, name: 'Sarah Johnson', position: 'Senior Software Engineer', status: 'Offer Sent', date: '2026-05-25', salary: '$145,000', location: 'San Francisco, CA', email: 'sarah.j@email.com', phone: '+1 (555) 123-4567', experience: '8 years' },
    { id: 2, name: 'Michael Chen', position: 'Product Manager', status: 'Pending Approval', date: '2026-05-24', salary: '$135,000', location: 'New York, NY', email: 'michael.c@email.com', phone: '+1 (555) 234-5678', experience: '6 years' },
    { id: 3, name: 'Emily Rodriguez', position: 'UX Designer', status: 'Draft', date: '2026-05-23', salary: '$115,000', location: 'Austin, TX', email: 'emily.r@email.com', phone: '+1 (555) 345-6789', experience: '5 years' },
    { id: 4, name: 'James Wilson', position: 'Data Scientist', status: 'Offer Accepted', date: '2026-05-22', salary: '$155,000', location: 'Seattle, WA', email: 'james.w@email.com', phone: '+1 (555) 456-7890', experience: '7 years' },
    { id: 5, name: 'Lisa Anderson', position: 'Marketing Director', status: 'Offer Sent', date: '2026-05-21', salary: '$140,000', location: 'Boston, MA', email: 'lisa.a@email.com', phone: '+1 (555) 567-8901', experience: '10 years' },
    { id: 6, name: 'David Kumar', position: 'DevOps Engineer', status: 'Interview Complete', date: '2026-05-20', salary: '$130,000', location: 'Denver, CO', email: 'david.k@email.com', phone: '+1 (555) 678-9012', experience: '6 years' },
  ];

  const pipelineData = [
    { stage: 'Applied', count: 145 },
    { stage: 'Screening', count: 78 },
    { stage: 'Interview', count: 42 },
    { stage: 'Offer', count: 18 },
    { stage: 'Accepted', count: 12 },
  ];

  const hiringTrendData = [
    { month: 'Jan', hires: 8, offers: 12 },
    { month: 'Feb', hires: 12, offers: 15 },
    { month: 'Mar', hires: 15, offers: 18 },
    { month: 'Apr', hires: 18, offers: 22 },
    { month: 'May', hires: 14, offers: 19 },
  ];

  const offerStatusData = [
    { name: 'Accepted', value: 45, color: '#10b981' },
    { name: 'Pending', value: 28, color: '#f59e0b' },
    { name: 'Rejected', value: 12, color: '#ef4444' },
    { name: 'Draft', value: 15, color: '#6b7280' },
  ];

  const recentActivities = [
    { action: 'Offer sent to Sarah Johnson', time: '2 hours ago', type: 'sent' },
    { action: 'Offer approved for Michael Chen', time: '4 hours ago', type: 'approved' },
    { action: 'New candidate added: Emily Rodriguez', time: '6 hours ago', type: 'added' },
    { action: 'Offer accepted by James Wilson', time: '1 day ago', type: 'accepted' },
    { action: 'Reminder sent to Lisa Anderson', time: '1 day ago', type: 'reminder' },
  ];

  const getStatusBadge = (status: string) => {
    const styles: any = {
      'Offer Sent': 'bg-blue-100 text-blue-700 border-blue-200',
      'Pending Approval': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Draft': 'bg-gray-100 text-gray-700 border-gray-200',
      'Offer Accepted': 'bg-green-100 text-green-700 border-green-200',
      'Interview Complete': 'bg-purple-100 text-purple-700 border-purple-200',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-[57px] bottom-0 z-30">
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentView('candidates')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'candidates' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Candidates</span>
            <span className="ml-auto bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {candidates.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentView('create-offer')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'create-offer' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Create Offer</span>
          </button>

          <button
            onClick={() => setCurrentView('templates')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'templates' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Edit className="w-5 h-5" />
            <span>Templates</span>
          </button>

          <button
            onClick={() => setCurrentView('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'analytics' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content - Properly offset from sidebar */}
      <div className="flex-1 ml-64 pt-[57px]">
        <div className="p-6 max-w-[1600px]">
          {currentView === 'dashboard' && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-green-600 text-sm flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> 12%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Active Candidates</p>
                  <p className="text-3xl text-gray-900">145</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-yellow-600 text-sm flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> 5
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                  <p className="text-3xl text-gray-900">8</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-green-600 text-sm flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> 8%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Offers Accepted</p>
                  <p className="text-3xl text-gray-900">45</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-gray-600 text-sm">Avg.</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Time to Hire</p>
                  <p className="text-3xl text-gray-900">18d</p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pipeline Chart */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Candidate Pipeline</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={pipelineData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Offer Status */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Offer Status Distribution</h3>
                  <div className="flex items-center gap-8">
                    <ResponsiveContainer width="50%" height={250}>
                      <PieChart>
                        <Pie
                          data={offerStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {offerStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-3">
                      {offerStatusData.map((item) => (
                        <div key={item.name} className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                          <div>
                            <p className="text-sm text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-600">{item.value} offers</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.type === 'sent' ? 'bg-blue-100' :
                          activity.type === 'approved' ? 'bg-green-100' :
                          activity.type === 'accepted' ? 'bg-green-100' :
                          activity.type === 'reminder' ? 'bg-yellow-100' :
                          'bg-gray-100'
                        }`}>
                          {activity.type === 'sent' && <Send className="w-4 h-4 text-blue-600" />}
                          {activity.type === 'approved' && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {activity.type === 'accepted' && <CheckCircle className="w-4 h-4 text-green-600" />}
                          {activity.type === 'reminder' && <Clock className="w-4 h-4 text-yellow-600" />}
                          {activity.type === 'added' && <Plus className="w-4 h-4 text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setCurrentView('create-offer')}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Create New Offer</span>
                    </button>
                    <button
                      onClick={() => setCurrentView('candidates')}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Users className="w-5 h-5" />
                      <span>Add Candidate</span>
                    </button>
                    <button
                      onClick={() => setCurrentView('templates')}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Edit Templates</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      <Download className="w-5 h-5" />
                      <span>Export Reports</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'candidates' && (
            <div className="space-y-6">
              {/* Filters & Search */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Candidate
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                  <div className="flex-1"></div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>Offer Sent</option>
                    <option>Pending Approval</option>
                    <option>Draft</option>
                    <option>Offer Accepted</option>
                  </select>
                </div>
              </div>

              {/* Candidates Table */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Candidate</th>
                        <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Position</th>
                        <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Salary</th>
                        <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {candidates.map((candidate) => (
                        <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm text-gray-900">{candidate.name}</p>
                                <p className="text-xs text-gray-500">{candidate.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-sm text-gray-900">{candidate.position}</p>
                            <p className="text-xs text-gray-500">{candidate.location}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs border ${getStatusBadge(candidate.status)}`}>
                              {candidate.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{candidate.salary}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{candidate.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedCandidate(candidate)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                              </button>
                              <button
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Send Offer"
                              >
                                <Send className="w-4 h-4 text-blue-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Candidate Detail Modal */}
              {selectedCandidate && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                      <h3 className="text-xl text-gray-900">Candidate Details</h3>
                      <button
                        onClick={() => setSelectedCandidate(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <XCircle className="w-6 h-6 text-gray-600" />
                      </button>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="flex items-start gap-6">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 text-3xl">
                          {selectedCandidate.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-2xl text-gray-900 mb-2">{selectedCandidate.name}</h4>
                          <p className="text-gray-600 mb-4">{selectedCandidate.position}</p>
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs border ${getStatusBadge(selectedCandidate.status)}`}>
                            {selectedCandidate.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Email</p>
                              <p className="text-sm text-gray-900">{selectedCandidate.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Phone</p>
                              <p className="text-sm text-gray-900">{selectedCandidate.phone}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Location</p>
                              <p className="text-sm text-gray-900">{selectedCandidate.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-500">Experience</p>
                              <p className="text-sm text-gray-900">{selectedCandidate.experience}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h5 className="text-sm text-gray-600 mb-3">Offer Details</h5>
                        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                          <div>
                            <p className="text-xs text-gray-500">Offered Salary</p>
                            <p className="text-lg text-gray-900">{selectedCandidate.salary}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Offer Date</p>
                            <p className="text-lg text-gray-900">{selectedCandidate.date}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Send Offer Letter
                        </button>
                        <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          Edit Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentView === 'create-offer' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Candidate Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      placeholder="e.g., John Smith"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      placeholder="john.smith@email.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Position Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Senior Software Engineer"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Department *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Engineering</option>
                      <option>Product</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Compensation Details</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Base Salary *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        placeholder="145000"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Signing Bonus</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        placeholder="10000"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Equity (RSUs)</label>
                    <input
                      type="text"
                      placeholder="e.g., 1000 shares"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Start Date *</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Template & Attachments</h3>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Offer Letter Template *</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Standard Full-Time Offer</option>
                      <option>Executive Offer Template</option>
                      <option>Contract Position Offer</option>
                      <option>Internship Offer Template</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Upload Company Logo</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">HR Signature</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Upload signature image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 1MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5" />
                  Preview Offer Letter
                </button>
                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Save as Draft
                </button>
                <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Send for Approval
                </button>
              </div>
            </div>
          )}

          {currentView === 'templates' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  Create New Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['Standard Full-Time Offer', 'Executive Offer Template', 'Contract Position Offer', 'Internship Offer Template'].map((template, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <h4 className="text-lg text-gray-900 mb-2">{template}</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Last modified: May {20 + idx}, 2026
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                        Preview
                      </button>
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                        Use Template
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Hiring Trends</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={hiringTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="hires" stroke="#10b981" strokeWidth={2} name="Hires" />
                      <Line type="monotone" dataKey="offers" stroke="#3b82f6" strokeWidth={2} name="Offers" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Department Distribution</h3>
                  <div className="space-y-4">
                    {[
                      { dept: 'Engineering', count: 42, color: 'bg-blue-500' },
                      { dept: 'Product', count: 28, color: 'bg-purple-500' },
                      { dept: 'Design', count: 18, color: 'bg-pink-500' },
                      { dept: 'Marketing', count: 24, color: 'bg-green-500' },
                      { dept: 'Sales', count: 33, color: 'bg-yellow-500' },
                    ].map((item) => (
                      <div key={item.dept}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{item.dept}</span>
                          <span className="text-sm text-gray-900">{item.count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${(item.count / 145) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Offer Acceptance Rate</p>
                  <p className="text-3xl text-gray-900 mb-1">76.5%</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> +5.2% from last month
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Average Time to Accept</p>
                  <p className="text-3xl text-gray-900 mb-1">4.2 days</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> -0.8 days improvement
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Avg. Salary Offered</p>
                  <p className="text-3xl text-gray-900 mb-1">$138K</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    Across all departments
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Email Notifications</h3>
                <div className="space-y-4">
                  {[
                    'Notify me when an offer is approved',
                    'Notify me when a candidate accepts an offer',
                    'Notify me when a candidate rejects an offer',
                    'Send daily summary of pending approvals',
                    'Remind me about pending offer letters',
                  ].map((setting, idx) => (
                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100">
                      <span className="text-sm text-gray-700">{setting}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={idx < 3} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Default Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Default Offer Expiry</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>7 days</option>
                      <option>14 days</option>
                      <option>21 days</option>
                      <option>30 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Reminder Frequency</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Every 2 days</option>
                      <option>Every 3 days</option>
                      <option>Every 5 days</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
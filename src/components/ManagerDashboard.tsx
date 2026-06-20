import React, { useState } from 'react';
import {
  LayoutDashboard, CheckCircle, XCircle, Clock, Shield, BarChart3,
  Settings, Bell, Search, FileText, TrendingUp, AlertTriangle,
  DollarSign, Users, Award, Activity, ChevronRight, Eye, Download,
  ThumbsUp, ThumbsDown, MessageSquare, Filter, Calendar
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ManagerDashboardProps {
  onBackToSelection: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;

  onWorkflowNavigate?: (
    role: 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin',
    view: string,
    data?: any
  ) => void;

  workflowData?: any;
}

export function ManagerDashboard({ onBackToSelection, currentView, setCurrentView }: ManagerDashboardProps) {
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [approvalAction, setApprovalAction] = useState<'approve' | 'reject' | null>(null);

  // Mock data
  const pendingApprovals = [
    { id: 1, candidate: 'Sarah Johnson', position: 'Senior Software Engineer', department: 'Engineering', salary: 145000, recruiter: 'John Davis', submittedDate: '2026-05-25', urgency: 'high' },
    { id: 2, candidate: 'Michael Chen', position: 'Product Manager', department: 'Product', salary: 135000, recruiter: 'Jane Smith', submittedDate: '2026-05-24', urgency: 'medium' },
    { id: 3, candidate: 'Emily Rodriguez', position: 'UX Designer', department: 'Design', salary: 115000, recruiter: 'John Davis', submittedDate: '2026-05-23', urgency: 'medium' },
    { id: 4, candidate: 'David Kumar', position: 'DevOps Engineer', department: 'Engineering', salary: 130000, recruiter: 'Sarah Lee', submittedDate: '2026-05-22', urgency: 'high' },
    { id: 5, candidate: 'Lisa Anderson', position: 'Marketing Director', department: 'Marketing', salary: 140000, recruiter: 'Mike Johnson', submittedDate: '2026-05-21', urgency: 'low' },
  ];

  const approvalHistory = [
    { id: 101, candidate: 'James Wilson', position: 'Data Scientist', salary: 155000, status: 'Approved', date: '2026-05-20', approver: 'You' },
    { id: 102, candidate: 'Anna Martinez', position: 'Sales Manager', salary: 125000, status: 'Approved', date: '2026-05-19', approver: 'You' },
    { id: 103, candidate: 'Robert Taylor', position: 'Junior Developer', salary: 85000, status: 'Rejected', date: '2026-05-18', approver: 'You', reason: 'Salary exceeds budget for level' },
    { id: 104, candidate: 'Maria Garcia', position: 'Content Writer', salary: 75000, status: 'Approved', date: '2026-05-17', approver: 'You' },
  ];

  const approvalMetrics = [
    { month: 'Jan', approved: 22, rejected: 3, pending: 5 },
    { month: 'Feb', approved: 28, rejected: 4, pending: 6 },
    { month: 'Mar', approved: 32, rejected: 5, pending: 4 },
    { month: 'Apr', approved: 38, rejected: 3, pending: 7 },
    { month: 'May', approved: 24, rejected: 2, pending: 8 },
  ];

  const compensationData = [
    { range: '$60K-$80K', count: 15 },
    { range: '$80K-$100K', count: 28 },
    { range: '$100K-$120K', count: 35 },
    { range: '$120K-$150K', count: 42 },
    { range: '$150K+', count: 25 },
  ];

  const complianceChecks = [
    { check: 'Equal Employment Opportunity', status: 'Passed', score: 98 },
    { check: 'Salary Band Compliance', status: 'Passed', score: 95 },
    { check: 'Budget Allocation', status: 'Warning', score: 87 },
    { check: 'Position Authorization', status: 'Passed', score: 100 },
    { check: 'Document Completeness', status: 'Passed', score: 92 },
  ];

  const aiSuggestions = [
    { type: 'salary', message: 'Consider salary adjustment for Senior Engineer role - 5% below market avg', priority: 'medium' },
    { type: 'timeline', message: 'Product Manager approval pending for 3 days - expedite review', priority: 'high' },
    { type: 'budget', message: 'Marketing department at 92% of quarterly hiring budget', priority: 'low' },
    { type: 'compliance', message: 'Review required: Budget allocation warning for Q2', priority: 'medium' },
  ];

  const auditLog = [
    { action: 'Approved offer for James Wilson', user: 'You', timestamp: '2026-05-20 14:30', ip: '192.168.1.100' },
    { action: 'Rejected offer for Robert Taylor', user: 'You', timestamp: '2026-05-18 09:15', ip: '192.168.1.100' },
    { action: 'Updated salary band for Engineering', user: 'Finance Team', timestamp: '2026-05-17 16:45', ip: '192.168.1.105' },
    { action: 'Compliance check completed', user: 'System', timestamp: '2026-05-16 08:00', ip: 'auto' },
  ];

  const getUrgencyBadge = (urgency: string) => {
    if (urgency === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (urgency === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const handleApproval = (offer: any, action: 'approve' | 'reject') => {
    setSelectedOffer(offer);
    setApprovalAction(action);
    setShowApprovalModal(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-[57px] bottom-0 z-30">
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentView('approvals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'approvals' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Approval Queue</span>
            <span className="ml-auto bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingApprovals.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentView('compensation')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'compensation' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span>Compensation</span>
          </button>

          <button
            onClick={() => setCurrentView('compliance')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'compliance' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Compliance</span>
          </button>

          <button
            onClick={() => setCurrentView('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'analytics' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Analytics</span>
          </button>

          <button
            onClick={() => setCurrentView('audit')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'audit' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span>Audit Logs</span>
          </button>

          <button
            onClick={() => setCurrentView('team')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'team' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>HR Team</span>
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'settings' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {currentView === 'dashboard' && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-red-600 text-sm flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Urgent
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                  <p className="text-3xl text-gray-900">{pendingApprovals.length}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-green-600 text-sm flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> +12%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Approved This Month</p>
                  <p className="text-3xl text-gray-900">24</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                    <span className="text-purple-600 text-sm">96%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Approval Rate</p>
                  <p className="text-3xl text-gray-900">92%</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-gray-600 text-sm">Budget</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Avg. Approval Time</p>
                  <p className="text-3xl text-gray-900">1.4d</p>
                </div>
              </div>

              {/* Urgent Approvals */}
              <div className="bg-white rounded-xl p-6 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg text-gray-900">Urgent Approvals Required</h3>
                  <span className="ml-auto text-sm text-red-600">2 high priority</span>
                </div>
                <div className="space-y-3">
                  {pendingApprovals.filter(a => a.urgency === 'high').map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-100">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{approval.candidate}</p>
                        <p className="text-xs text-gray-600">{approval.position} • {approval.department}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-900">${(approval.salary / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-gray-600">Submitted {approval.submittedDate}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleApproval(approval, 'approve')}
                            className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleApproval(approval, 'reject')}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Approval Trends</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={approvalMetrics}>
                      <defs>
                        <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="approved" stroke="#10b981" fillOpacity={1} fill="url(#colorApproved)" />
                      <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">AI-Powered Insights</h3>
                  <div className="space-y-3">
                    {aiSuggestions.map((suggestion, idx) => (
                      <div key={idx} className={`p-4 rounded-lg border ${
                        suggestion.priority === 'high' ? 'bg-red-50 border-red-200' :
                        suggestion.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-blue-50 border-blue-200'
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            suggestion.priority === 'high' ? 'bg-red-100' :
                            suggestion.priority === 'medium' ? 'bg-yellow-100' :
                            'bg-blue-100'
                          }`}>
                            {suggestion.type === 'salary' && <DollarSign className={`w-4 h-4 ${
                              suggestion.priority === 'high' ? 'text-red-600' :
                              suggestion.priority === 'medium' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />}
                            {suggestion.type === 'timeline' && <Clock className={`w-4 h-4 ${
                              suggestion.priority === 'high' ? 'text-red-600' :
                              suggestion.priority === 'medium' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />}
                            {suggestion.type === 'budget' && <TrendingUp className={`w-4 h-4 ${
                              suggestion.priority === 'high' ? 'text-red-600' :
                              suggestion.priority === 'medium' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />}
                            {suggestion.type === 'compliance' && <Shield className={`w-4 h-4 ${
                              suggestion.priority === 'high' ? 'text-red-600' :
                              suggestion.priority === 'medium' ? 'text-yellow-600' :
                              'text-blue-600'
                            }`} />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{suggestion.message}</p>
                            <p className="text-xs text-gray-600 mt-1 capitalize">{suggestion.priority} priority</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Approvals */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4">Recent Approval History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">Candidate</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">Position</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">Salary</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs text-gray-600 uppercase">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {approvalHistory.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm text-gray-900">{item.candidate}</td>
                          <td className="px-4 py-4 text-sm text-gray-600">{item.position}</td>
                          <td className="px-4 py-4 text-sm text-gray-900">${(item.salary / 1000).toFixed(0)}K</td>
                          <td className="px-4 py-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs ${
                              item.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentView === 'approvals' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Filter className="w-5 h-5" />
                    Filter
                  </button>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>All Departments</option>
                    <option>Engineering</option>
                    <option>Product</option>
                    <option>Design</option>
                    <option>Marketing</option>
                  </select>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option>All Urgency Levels</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <div className="flex-1"></div>
                  <span className="text-sm text-gray-600">{pendingApprovals.length} pending approvals</span>
                </div>
              </div>

              {/* Approval Cards */}
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-lg">
                          {approval.candidate.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-lg text-gray-900">{approval.candidate}</h4>
                          <p className="text-sm text-gray-600">{approval.position}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-500">{approval.department}</span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-500">Submitted by {approval.recruiter}</span>
                            <span className="text-xs text-gray-300">•</span>
                            <span className="text-xs text-gray-500">{approval.submittedDate}</span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs border ${getUrgencyBadge(approval.urgency)}`}>
                        {approval.urgency.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Base Salary</p>
                        <p className="text-lg text-gray-900">${(approval.salary / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Department Budget</p>
                        <p className="text-sm text-green-600">Within Range</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Market Comparison</p>
                        <p className="text-sm text-blue-600">+2% above avg</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Compliance</p>
                        <p className="text-sm text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Passed
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedOffer(approval)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        onClick={() => handleApproval(approval, 'approve')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Approve Offer
                      </button>
                      <button
                        onClick={() => handleApproval(approval, 'reject')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <ThumbsDown className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'compensation' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Total Compensation Budget</p>
                  <p className="text-3xl text-gray-900 mb-1">$8.2M</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">68% utilized</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Average Offer Salary</p>
                  <p className="text-3xl text-gray-900 mb-1">$138K</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" /> +3.2% vs last quarter
                  </p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Salary Band Compliance</p>
                  <p className="text-3xl text-gray-900 mb-1">95%</p>
                  <p className="text-sm text-green-600">All offers within range</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4">Compensation Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={compensationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#9333ea" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4">Department Budget Analysis</h3>
                <div className="space-y-4">
                  {[
                    { dept: 'Engineering', budget: 2800000, used: 2100000, color: 'bg-blue-500' },
                    { dept: 'Product', budget: 1500000, used: 980000, color: 'bg-purple-500' },
                    { dept: 'Design', budget: 900000, used: 650000, color: 'bg-pink-500' },
                    { dept: 'Marketing', budget: 1800000, used: 1620000, color: 'bg-green-500' },
                    { dept: 'Sales', budget: 2200000, used: 1450000, color: 'bg-yellow-500' },
                  ].map((item) => {
                    const percentage = (item.used / item.budget) * 100;
                    return (
                      <div key={item.dept}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{item.dept}</span>
                          <span className="text-sm text-gray-900">
                            ${(item.used / 1000000).toFixed(1)}M / ${(item.budget / 1000000).toFixed(1)}M ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className={`${item.color} h-3 rounded-full transition-all`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {currentView === 'compliance' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Compliance Checks</h3>
                <div className="space-y-4">
                  {complianceChecks.map((check, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          check.status === 'Passed' ? 'bg-green-100' : 'bg-yellow-100'
                        }`}>
                          {check.status === 'Passed' ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-6 h-6 text-yellow-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-gray-900">{check.check}</p>
                          <p className="text-xs text-gray-600">Score: {check.score}%</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        check.status === 'Passed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {check.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Recent Compliance Alerts</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-gray-900">Budget allocation warning for Q2</p>
                      <p className="text-xs text-gray-600 mt-1">Engineering department at 92% capacity</p>
                    </div>
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-gray-900">All EEO requirements met</p>
                      <p className="text-xs text-gray-600 mt-1">Last checked: May 27, 2026</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Compliance Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Generate Compliance Report
                    </button>
                    <button className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      Schedule Audit Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Monthly Approval Metrics</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={approvalMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="approved" stroke="#10b981" strokeWidth={2} />
                      <Line type="monotone" dataKey="rejected" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Key Performance Indicators</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Approval Rate</span>
                        <span className="text-sm text-gray-900">92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Average Review Time</span>
                        <span className="text-sm text-gray-900">1.4 days</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Budget Utilization</span>
                        <span className="text-sm text-gray-900">68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">Compliance Score</span>
                        <span className="text-sm text-gray-900">96%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'audit' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg text-gray-900">Audit Log</h3>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    Export Logs
                  </button>
                </div>
                <div className="space-y-3">
                  {auditLog.map((log, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{log.action}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-600">{log.user}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">{log.timestamp}</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-600">IP: {log.ip}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'team' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  <Users className="w-5 h-5" />
                  Add Team Member
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'John Davis', role: 'Senior Recruiter', email: 'john.d@company.com', offers: 24, status: 'Active' },
                  { name: 'Jane Smith', role: 'Recruiter', email: 'jane.s@company.com', offers: 18, status: 'Active' },
                  { name: 'Sarah Lee', role: 'Recruiter', email: 'sarah.l@company.com', offers: 15, status: 'Active' },
                  { name: 'Mike Johnson', role: 'Junior Recruiter', email: 'mike.j@company.com', offers: 8, status: 'Active' },
                ].map((member, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        {member.status}
                      </span>
                    </div>
                    <h4 className="text-lg text-gray-900 mb-1">{member.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                    <p className="text-xs text-gray-500 mb-4">{member.email}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-xs text-gray-600">Offers Created</span>
                      <span className="text-sm text-gray-900">{member.offers}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Approval Workflow Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Auto-approve offers below</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        placeholder="75000"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Require finance approval above</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        placeholder="150000"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">SLA for approval (days)</label>
                    <input
                      type="number"
                      placeholder="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Approval Modal */}
      {showApprovalModal && selectedOffer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl text-gray-900">
                {approvalAction === 'approve' ? 'Approve Offer' : 'Reject Offer'}
              </h3>
              <button
                onClick={() => setShowApprovalModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Candidate</p>
                <p className="text-lg text-gray-900">{selectedOffer.candidate}</p>
                <p className="text-sm text-gray-600">{selectedOffer.position}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Salary</p>
                  <p className="text-lg text-gray-900">${(selectedOffer.salary / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Department</p>
                  <p className="text-lg text-gray-900">{selectedOffer.department}</p>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  {approvalAction === 'approve' ? 'Approval Notes (Optional)' : 'Rejection Reason *'}
                </label>
                <textarea
                  rows={4}
                  placeholder={approvalAction === 'approve' ? 'Add any notes...' : 'Please provide a reason for rejection...'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowApprovalModal(false);
                    setSelectedOffer(null);
                  }}
                  className={`flex-1 px-4 py-3 text-white rounded-lg transition-colors ${
                    approvalAction === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {approvalAction === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
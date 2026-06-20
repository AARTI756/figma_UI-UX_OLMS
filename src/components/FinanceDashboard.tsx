import React, { useState } from 'react';
import {
  LayoutDashboard, DollarSign, TrendingUp, AlertTriangle, CheckCircle,
  XCircle, Clock, Search, Bell, Filter, Calendar, BarChart3,
  Settings, FileText, Eye, ThumbsUp, ThumbsDown, Download
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FinanceDashboardProps {
  onBackToSelection: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  onWorkflowNavigate?: (role: 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin', view: string, data?: any) => void;
  workflowData?: any;
}

export function FinanceDashboard({ onBackToSelection, currentView, setCurrentView, onWorkflowNavigate, workflowData }: FinanceDashboardProps) {
  const [selectedOffer, setSelectedOffer] = useState<any>(null);

  const pendingFinanceApprovals = [
    { id: 1, candidate: 'Sarah Johnson', position: 'Senior Software Engineer', department: 'Engineering', salary: 145000, recruiter: 'John Davis', hrApproved: true, budgetImpact: 'Medium', submittedDate: '2026-05-25' },
    { id: 2, candidate: 'Michael Chen', position: 'Product Manager', department: 'Product', salary: 135000, recruiter: 'Jane Smith', hrApproved: true, budgetImpact: 'Low', submittedDate: '2026-05-24' },
    { id: 3, candidate: 'Emily Rodriguez', position: 'UX Designer', department: 'Design', salary: 115000, recruiter: 'John Davis', hrApproved: true, budgetImpact: 'Low', submittedDate: '2026-05-23' },
  ];

  const budgetData = [
    { dept: 'Engineering', allocated: 2800000, used: 2100000, pending: 420000 },
    { dept: 'Product', allocated: 1500000, used: 980000, pending: 270000 },
    { dept: 'Design', allocated: 900000, used: 650000, pending: 115000 },
    { dept: 'Marketing', allocated: 1800000, used: 1620000, pending: 140000 },
    { dept: 'Sales', allocated: 2200000, used: 1450000, pending: 0 },
  ];

  const monthlySpendData = [
    { month: 'Jan', actual: 680000, budget: 720000 },
    { month: 'Feb', actual: 750000, budget: 720000 },
    { month: 'Mar', actual: 820000, budget: 850000 },
    { month: 'Apr', actual: 890000, budget: 900000 },
    { month: 'May', actual: 720000, budget: 780000 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-[57px] bottom-0 z-30">
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'bg-orange-50 text-orange-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentView('approvals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'approvals' ? 'bg-orange-50 text-orange-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            <span>Salary Approvals</span>
            <span className="ml-auto bg-orange-600 text-white text-xs px-2 py-0.5 rounded-full">
              {pendingFinanceApprovals.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentView('budget')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'budget' ? 'bg-orange-50 text-orange-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span>Budget Analysis</span>
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'settings' ? 'bg-orange-50 text-orange-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onBackToSelection}
            className="w-full px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            ← Switch Role
          </button>
        </div>
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
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <span className="text-orange-600 text-sm">Urgent</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                  <p className="text-3xl text-gray-900">{pendingFinanceApprovals.length}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-green-600 text-sm">+8%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Approved This Month</p>
                  <p className="text-3xl text-gray-900">18</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-gray-600 text-sm">68%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Budget Utilized</p>
                  <p className="text-3xl text-gray-900">$5.6M</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-yellow-600 text-sm">Pending</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Pending Budget</p>
                  <p className="text-3xl text-gray-900">$945K</p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Department Budget Status</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={budgetData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="dept" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="used" fill="#10b981" name="Used" />
                      <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Monthly Spend Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlySpendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#f97316" strokeWidth={2} name="Actual" />
                      <Line type="monotone" dataKey="budget" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Budget" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Urgent Approvals */}
              <div className="bg-white rounded-xl p-6 border border-orange-200">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg text-gray-900">Pending Salary Approvals</h3>
                </div>
                <div className="space-y-3">
                  {pendingFinanceApprovals.map((approval) => (
                    <div key={approval.id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{approval.candidate}</p>
                        <p className="text-xs text-gray-600">{approval.position} • {approval.department}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-900">${(approval.salary / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-gray-600">Impact: {approval.budgetImpact}</p>
                        </div>
                        <button
                          onClick={() => setSelectedOffer(approval)}
                          className="px-3 py-1.5 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'approvals' && (
            <div className="space-y-6">
              <div className="space-y-4">
                {pendingFinanceApprovals.map((approval) => (
                  <div key={approval.id} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-lg text-gray-900">{approval.candidate}</h4>
                        <p className="text-sm text-gray-600">{approval.position}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                        HR Approved
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Proposed Salary</p>
                        <p className="text-lg text-gray-900">${(approval.salary / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Budget Impact</p>
                        <p className={`text-sm ${approval.budgetImpact === 'High' ? 'text-red-600' : approval.budgetImpact === 'Medium' ? 'text-yellow-600' : 'text-green-600'}`}>
                          {approval.budgetImpact}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Department</p>
                        <p className="text-sm text-gray-900">{approval.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Remaining Budget</p>
                        <p className="text-sm text-green-600">Within Range</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        Approve Salary
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                        <ThumbsDown className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'budget' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Department Budget Breakdown</h3>
                <div className="space-y-4">
                  {budgetData.map((dept) => {
                    const percentage = ((dept.used + dept.pending) / dept.allocated) * 100;
                    const usedPercentage = (dept.used / dept.allocated) * 100;
                    return (
                      <div key={dept.dept}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">{dept.dept}</span>
                          <span className="text-sm text-gray-900">
                            ${((dept.used + dept.pending) / 1000000).toFixed(1)}M / ${(dept.allocated / 1000000).toFixed(1)}M
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="relative h-3">
                            <div
                              className="absolute bg-green-500 h-3 rounded-l-full"
                              style={{ width: `${usedPercentage}%` }}
                            ></div>
                            <div
                              className="absolute bg-yellow-500 h-3"
                              style={{ left: `${usedPercentage}%`, width: `${percentage - usedPercentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                          <span>Used: ${(dept.used / 1000000).toFixed(2)}M</span>
                          <span>Pending: ${(dept.pending / 1000000).toFixed(2)}K</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
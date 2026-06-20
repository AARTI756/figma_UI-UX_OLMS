import React, { useState } from 'react';
import {
  LayoutDashboard, Users, Shield, Settings, Activity, Bell,
  Search, UserPlus, Edit, Trash2, Lock, Key, Database,
  FileText, BarChart3, AlertTriangle, CheckCircle, XCircle
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSelection: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  onWorkflowNavigate?: (role: 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin', view: string, data?: any) => void;
  workflowData?: any;
}

export function AdminDashboard({ onBackToSelection, currentView, setCurrentView, onWorkflowNavigate, workflowData }: AdminDashboardProps) {
  const users = [
    { id: 1, name: 'John Davis', email: 'john.d@company.com', role: 'Recruiter', status: 'Active', lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane.s@company.com', role: 'Recruiter', status: 'Active', lastActive: '1 hour ago' },
    { id: 3, name: 'Alex Martinez', email: 'alex.m@company.com', role: 'HR Manager', status: 'Active', lastActive: '30 min ago' },
    { id: 4, name: 'Finance Team', email: 'finance@company.com', role: 'Finance', status: 'Active', lastActive: '1 day ago' },
    { id: 5, name: 'Sarah Admin', email: 'admin@company.com', role: 'Admin', status: 'Active', lastActive: 'Just now' },
  ];

  const permissions = {
    Recruiter: ['Create Candidates', 'Create Offers', 'View Pipeline', 'Edit Templates', 'Send Reminders'],
    'HR Manager': ['Approve Offers', 'View Analytics', 'Manage Compliance', 'View Audit Logs', 'Manage Team'],
    Finance: ['Approve Salaries', 'View Budget', 'Financial Reports', 'Budget Analysis'],
    Admin: ['All Permissions', 'User Management', 'System Settings', 'Role Management', 'Access Control'],
    Candidate: ['View Offer', 'Sign Offer', 'Upload Documents', 'View Timeline', 'Contact HR'],
  };

  const systemActivities = [
    { action: 'User login: john.d@company.com', timestamp: '2026-05-27 14:30', type: 'auth', ip: '192.168.1.100' },
    { action: 'Offer approved: Sarah Johnson', timestamp: '2026-05-27 14:15', type: 'approval', user: 'Alex Martinez' },
    { action: 'New user created: Michael Chen', timestamp: '2026-05-27 13:45', type: 'user', user: 'Admin' },
    { action: 'Template updated: Standard Offer', timestamp: '2026-05-27 12:30', type: 'template', user: 'John Davis' },
    { action: 'Finance approval: $145K salary', timestamp: '2026-05-27 11:00', type: 'finance', user: 'Finance Team' },
    { action: 'System backup completed', timestamp: '2026-05-27 03:00', type: 'system', user: 'Auto' },
  ];

  const roleColors: any = {
    Recruiter: 'bg-blue-100 text-blue-700 border-blue-200',
    'HR Manager': 'bg-purple-100 text-purple-700 border-purple-200',
    Finance: 'bg-orange-100 text-orange-700 border-orange-200',
    Admin: 'bg-red-100 text-red-700 border-red-200',
    Candidate: 'bg-green-100 text-green-700 border-green-200',
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-[57px] bottom-0 z-30">
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'dashboard' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setCurrentView('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'users' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>User Management</span>
            <span className="ml-auto text-xs text-gray-500">{users.length}</span>
          </button>

          <button
            onClick={() => setCurrentView('roles')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'roles' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Shield className="w-5 h-5" />
            <span>Roles & Permissions</span>
          </button>

          <button
            onClick={() => setCurrentView('activity')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'activity' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span>System Activity</span>
          </button>

          <button
            onClick={() => setCurrentView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              currentView === 'settings' ? 'bg-red-50 text-red-700' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>System Settings</span>
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
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Total Users</p>
                  <p className="text-3xl text-gray-900">{users.length}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Active Users</p>
                  <p className="text-3xl text-gray-900">{users.filter(u => u.status === 'Active').length}</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Roles Configured</p>
                  <p className="text-3xl text-gray-900">5</p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Today's Activities</p>
                  <p className="text-3xl text-gray-900">127</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4">Recent System Activity</h3>
                <div className="space-y-3">
                  {systemActivities.slice(0, 5).map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === 'auth' ? 'bg-blue-100' :
                        activity.type === 'approval' ? 'bg-green-100' :
                        activity.type === 'user' ? 'bg-purple-100' :
                        activity.type === 'finance' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        {activity.type === 'auth' && <Key className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'approval' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {activity.type === 'user' && <UserPlus className="w-4 h-4 text-purple-600" />}
                        {activity.type === 'finance' && <BarChart3 className="w-4 h-4 text-orange-600" />}
                        {activity.type === 'system' && <Database className="w-4 h-4 text-gray-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-600 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm text-gray-700">Database Status</h4>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl text-green-600">Healthy</p>
                  <p className="text-xs text-gray-600 mt-2">Last backup: 3 hours ago</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm text-gray-700">API Performance</h4>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl text-green-600">98.7%</p>
                  <p className="text-xs text-gray-600 mt-2">Uptime this month</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm text-gray-700">Security Status</h4>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-2xl text-green-600">Secure</p>
                  <p className="text-xs text-gray-600 mt-2">No threats detected</p>
                </div>
              </div>
            </div>
          )}

          {currentView === 'users' && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  <UserPlus className="w-5 h-5" />
                  Add New User
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">User</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Last Active</th>
                      <th className="px-6 py-4 text-left text-xs text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs border ${roleColors[user.role]}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 rounded-full text-xs bg-green-100 text-green-700 border border-green-200">
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.lastActive}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                              <Lock className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {currentView === 'roles' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(permissions).map(([role, perms]) => (
                  <div key={role} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          role === 'Admin' ? 'bg-red-100' :
                          role === 'HR Manager' ? 'bg-purple-100' :
                          role === 'Recruiter' ? 'bg-blue-100' :
                          role === 'Finance' ? 'bg-orange-100' :
                          'bg-green-100'
                        }`}>
                          <Shield className={`w-6 h-6 ${
                            role === 'Admin' ? 'text-red-600' :
                            role === 'HR Manager' ? 'text-purple-600' :
                            role === 'Recruiter' ? 'text-blue-600' :
                            role === 'Finance' ? 'text-orange-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <div>
                          <h3 className="text-lg text-gray-900">{role}</h3>
                          <p className="text-xs text-gray-600">{perms.length} permissions</p>
                        </div>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {perms.map((perm, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {perm}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'activity' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Complete Activity Log</h3>
                <div className="space-y-3">
                  {systemActivities.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'auth' ? 'bg-blue-100' :
                        activity.type === 'approval' ? 'bg-green-100' :
                        activity.type === 'user' ? 'bg-purple-100' :
                        activity.type === 'finance' ? 'bg-orange-100' :
                        'bg-gray-100'
                      }`}>
                        <Activity className={`w-5 h-5 ${
                          activity.type === 'auth' ? 'text-blue-600' :
                          activity.type === 'approval' ? 'text-green-600' :
                          activity.type === 'user' ? 'text-purple-600' :
                          activity.type === 'finance' ? 'text-orange-600' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-600">{activity.timestamp}</span>
                          {activity.user && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-600">By: {activity.user}</span>
                            </>
                          )}
                          {activity.ip && (
                            <>
                              <span className="text-xs text-gray-400">•</span>
                              <span className="text-xs text-gray-600">IP: {activity.ip}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'settings' && (
            <div className="max-w-4xl space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm text-gray-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-600">Require 2FA for all users</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm text-gray-900">Session Timeout</p>
                      <p className="text-xs text-gray-600">Auto-logout after inactivity</p>
                    </div>
                    <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>2 hours</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div>
                      <p className="text-sm text-gray-900">Password Complexity</p>
                      <p className="text-xs text-gray-600">Enforce strong passwords</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">System Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Default Offer Expiry (Days)</label>
                    <input
                      type="number"
                      defaultValue="14"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Auto-Reminder Frequency</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500">
                      <option>Every 2 days</option>
                      <option>Every 3 days</option>
                      <option>Every 5 days</option>
                      <option>Weekly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Document Retention Period (Years)</label>
                    <input
                      type="number"
                      defaultValue="7"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
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
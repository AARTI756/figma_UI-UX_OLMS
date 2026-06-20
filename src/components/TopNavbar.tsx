import React, { useState } from 'react';
import { Home, ArrowLeft, Users, Bell, LogOut, ChevronDown } from 'lucide-react';
import { NotificationPanel } from './NotificationPanel';

interface TopNavbarProps {
  currentRole: 'recruiter' | 'manager' | 'finance' | 'admin' | 'candidate';
  onRoleSwitch: (role: 'recruiter' | 'manager' | 'finance' | 'admin' | 'candidate') => void;
  onBackToSelection: () => void;
  onGoHome: () => void;
  userName?: string;
  notifications?: any[];
}

export function TopNavbar({ 
  currentRole, 
  onRoleSwitch, 
  onBackToSelection,
  onGoHome,
  userName = 'User',
  notifications = []
}: TopNavbarProps) {
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roleConfig: any = {
    recruiter: { name: 'HR Recruiter', color: 'bg-blue-600', initial: 'JD', fullName: 'John Davis' },
    manager: { name: 'HR Manager', color: 'bg-purple-600', initial: 'AM', fullName: 'Alex Martinez' },
    finance: { name: 'Finance Team', color: 'bg-orange-600', initial: 'FT', fullName: 'Finance Team' },
    admin: { name: 'Admin', color: 'bg-red-600', initial: 'SA', fullName: 'Sarah Admin' },
    candidate: { name: 'Candidate', color: 'bg-green-600', initial: 'SJ', fullName: 'Sarah Johnson' },
  };

  const allRoles = [
    { key: 'recruiter', label: 'HR Recruiter', icon: '👥' },
    { key: 'manager', label: 'HR Manager', icon: '🛡️' },
    { key: 'finance', label: 'Finance Team', icon: '💰' },
    { key: 'admin', label: 'System Admin', icon: '⚙️' },
    { key: 'candidate', label: 'Candidate', icon: '👤' },
  ];

  const currentRoleConfig = roleConfig[currentRole];
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-3">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 ${currentRoleConfig.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-sm">OLMS</span>
              </div>
              <div>
                <p className="text-sm text-gray-900">{currentRoleConfig.name}</p>
                <p className="text-xs text-gray-500">{currentRoleConfig.fullName}</p>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-200"></div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onGoHome}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Go to Dashboard"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>
              
              <button
                onClick={onBackToSelection}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-300"
              >
                <Users className="w-4 h-4" />
                <span>Switch Role</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showRoleSwitcher && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowRoleSwitcher(false)}
                  ></div>
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-3 py-2 border-b border-gray-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Switch to</p>
                    </div>
                    {allRoles.map((role) => (
                      <button
                        key={role.key}
                        onClick={() => {
                          onRoleSwitch(role.key as any);
                          setShowRoleSwitcher(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          currentRole === role.key ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                        }`}
                      >
                        <span>{role.icon}</span>
                        <span>{role.label}</span>
                        {currentRole === role.key && (
                          <span className="ml-auto text-xs text-blue-600">Current</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <NotificationPanel
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  role={currentRole}
                />
              )}
            </div>

            {/* User Menu */}
            <div className="h-6 w-px bg-gray-200"></div>
            
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 ${currentRoleConfig.color} rounded-full flex items-center justify-center text-white text-sm`}>
                {currentRoleConfig.initial}
              </div>
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

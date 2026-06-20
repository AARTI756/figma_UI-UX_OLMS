import React from 'react';
import { Users, Shield, User, DollarSign, Settings } from 'lucide-react';

interface RoleSelectionProps {
  onRoleSelect: (role: 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin') => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: 'recruiter',
      name: 'HR Recruiter',
      icon: Users,
      color: 'blue',
      description: 'Manage candidates and create offer letters'
    },
    {
      id: 'manager',
      name: 'HR Manager',
      icon: Shield,
      color: 'purple',
      description: 'Review and approve compensation offers'
    },
    {
      id: 'finance',
      name: 'Finance Team',
      icon: DollarSign,
      color: 'orange',
      description: 'Approve salaries and manage budgets'
    },
    {
      id: 'admin',
      name: 'System Admin',
      icon: Settings,
      color: 'red',
      description: 'Manage users and system configuration'
    },
    {
      id: 'candidate',
      name: 'Candidate',
      icon: User,
      color: 'green',
      description: 'Review offers and complete onboarding'
    },
  ];

  const colorMap: any = {
    blue: { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', light: 'bg-blue-100', text: 'text-blue-600' },
    purple: { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', light: 'bg-purple-100', text: 'text-purple-600' },
    orange: { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', light: 'bg-orange-100', text: 'text-orange-600' },
    red: { bg: 'bg-red-600', hover: 'hover:bg-red-700', light: 'bg-red-100', text: 'text-red-600' },
    green: { bg: 'bg-green-600', hover: 'hover:bg-green-700', light: 'bg-green-100', text: 'text-green-600' },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">OLMS</span>
            </div>
          </div>
          <h1 className="text-4xl text-gray-900 mb-3">Offer Letter Management System</h1>
          <p className="text-lg text-gray-600">Select your role to continue</p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            const colors = colorMap[role.color];
            
            return (
              <button
                key={role.id}
                onClick={() => onRoleSelect(role.id as any)}
                className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all text-left"
              >
                <div className={`w-14 h-14 ${colors.light} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${colors.text}`} />
                </div>
                <h3 className="text-xl text-gray-900 mb-2">{role.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                <div className={`inline-flex items-center gap-2 text-sm ${colors.text} group-hover:gap-3 transition-all`}>
                  <span>Continue</span>
                  <span>→</span>
                </div>
              </button>
            );
          })}

          {/* Demo Mode Card */}
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-6 text-white flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl mb-2">Demo Mode</h3>
              <p className="text-sm text-blue-100">
                Experience the complete hiring workflow from candidate to onboarding
              </p>
            </div>
            <div className="mt-6 space-y-2 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <span>Multi-role workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <span>Approval processes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                <span>Real-time tracking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          Enterprise OLMS v2.0 • Prototype Demo
        </div>
      </div>
    </div>
  );
}

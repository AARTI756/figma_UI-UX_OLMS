import React, { useState } from 'react';
import {
  FileText, CheckCircle, Clock, Home, Bell, Download, Eye,
  DollarSign, Calendar, MapPin, Briefcase, Award, Users,
  Shield, Heart, Zap, Coffee, Book, Mail, Phone, Upload,
  MessageCircle, ChevronRight, XCircle, Check, Edit, HelpCircle
} from 'lucide-react';

interface CandidatePortalProps {
  onBackToSelection: () => void;
  currentView: string;
  setCurrentView: (view: string) => void;

  workflowData?: any;
}

export function CandidatePortal({ onBackToSelection, currentView, setCurrentView }: CandidatePortalProps) {
  const [offerAccepted, setOfferAccepted] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);

  // Mock candidate data
  const candidateData = {
    name: 'Sarah Johnson',
    position: 'Senior Software Engineer',
    department: 'Engineering',
    startDate: '2026-06-15',
    location: 'San Francisco, CA',
    manager: 'Alex Martinez',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 123-4567',
  };

  const compensationDetails = {
    baseSalary: 145000,
    signingBonus: 15000,
    equity: '1,000 RSUs',
    annualBonus: '15% target',
    benefits: [
      { name: 'Health Insurance', value: 'Premium Plan - Company Paid' },
      { name: 'Dental & Vision', value: 'Full Coverage' },
      { name: '401(k) Match', value: '6% employer match' },
      { name: 'PTO', value: '20 days per year' },
      { name: 'Remote Work', value: 'Hybrid - 3 days/week' },
      { name: 'Learning Budget', value: '$2,000 per year' },
    ],
  };

  const onboardingChecklist = [
    { id: 1, task: 'Review and sign offer letter', status: 'completed', dueDate: '2026-05-25' },
    { id: 2, task: 'Complete tax forms (W-4, I-9)', status: 'in-progress', dueDate: '2026-05-28' },
    { id: 3, task: 'Upload identification documents', status: 'in-progress', dueDate: '2026-05-28' },
    { id: 4, task: 'Set up direct deposit', status: 'pending', dueDate: '2026-05-30' },
    { id: 5, task: 'Complete background check', status: 'pending', dueDate: '2026-06-01' },
    { id: 6, task: 'Enroll in benefits', status: 'pending', dueDate: '2026-06-05' },
    { id: 7, task: 'Complete IT setup request', status: 'pending', dueDate: '2026-06-10' },
    { id: 8, task: 'Review employee handbook', status: 'pending', dueDate: '2026-06-12' },
  ];

  const timeline = [
    { date: '2026-05-25', event: 'Offer letter sent', status: 'completed' },
    { date: '2026-05-27', event: 'Offer letter signed', status: 'completed' },
    { date: '2026-05-28', event: 'Tax forms submitted', status: 'in-progress' },
    { date: '2026-06-01', event: 'Background check initiated', status: 'pending' },
    { date: '2026-06-05', event: 'Benefits enrollment', status: 'pending' },
    { date: '2026-06-10', event: 'IT equipment ordered', status: 'pending' },
    { date: '2026-06-15', event: 'First day - Orientation', status: 'pending' },
  ];

  const documents = [
    { name: 'Offer Letter - Signed.pdf', date: '2026-05-27', size: '245 KB', type: 'Offer' },
    { name: 'Employee Handbook.pdf', date: '2026-05-25', size: '1.2 MB', type: 'Policy' },
    { name: 'Benefits Overview.pdf', date: '2026-05-25', size: '680 KB', type: 'Benefits' },
    { name: 'Code of Conduct.pdf', date: '2026-05-25', size: '320 KB', type: 'Policy' },
  ];

  const notifications = [
    { id: 1, message: 'Complete your tax forms by May 28', type: 'action', time: '2 hours ago' },
    { id: 2, message: 'Benefits enrollment opens June 1', type: 'info', time: '1 day ago' },
    { id: 3, message: 'Your offer letter has been approved', type: 'success', time: '2 days ago' },
    { id: 4, message: 'Welcome to TechCorp! Start date: June 15', type: 'info', time: '2 days ago' },
  ];

  const faqs = [
    { q: 'When is my first day?', a: 'Your official start date is June 15, 2026. Orientation begins at 9:00 AM.' },
    { q: 'What should I bring on my first day?', a: 'Please bring a valid government ID and your signed paperwork. Everything else will be provided.' },
    { q: 'How do I enroll in benefits?', a: 'Benefits enrollment opens 10 days before your start date. You\'ll receive an email with instructions.' },
    { q: 'Is parking available?', a: 'Yes, we offer free parking for all employees. You\'ll receive a parking pass on your first day.' },
  ];

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'in-progress') return <Clock className="w-5 h-5 text-yellow-600" />;
    return <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>;
  };

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'in-progress') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const completedTasks = onboardingChecklist.filter(t => t.status === 'completed').length;
  const totalTasks = onboardingChecklist.length;
  const progress = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="pt-[57px] px-6 py-8 max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl text-gray-900">
                {currentView === 'dashboard' && 'Welcome Dashboard'}
                {currentView === 'offer' && 'Your Offer Letter'}
                {currentView === 'compensation' && 'Compensation Details'}
                {currentView === 'onboarding' && 'Onboarding Checklist'}
                {currentView === 'documents' && 'Documents'}
                {currentView === 'timeline' && 'Your Journey'}
                {currentView === 'help' && 'Help & FAQ'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {currentView === 'dashboard' && 'Track your onboarding progress and important tasks'}
                {currentView === 'offer' && 'Review your offer letter and compensation package'}
                {currentView === 'compensation' && 'Detailed breakdown of your total compensation'}
                {currentView === 'onboarding' && 'Complete these tasks before your start date'}
                {currentView === 'documents' && 'Access and download all your documents'}
                {currentView === 'timeline' && 'Important milestones and upcoming events'}
                {currentView === 'help' && 'Frequently asked questions and support'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MessageCircle className="w-6 h-6 text-gray-600" />
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
              </button>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                SJ
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {currentView === 'dashboard' && (
            <div className="space-y-8">
              {/* Welcome Card */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-8 text-white">
                <h3 className="text-3xl mb-2">Welcome to TechCorp, {candidateData.name}! 🎉</h3>
                <p className="text-green-100 mb-6">
                  We're excited to have you join our {candidateData.department} team as a {candidateData.position}.
                  Your journey starts on {candidateData.startDate}.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <Calendar className="w-6 h-6 mb-2" />
                    <p className="text-sm text-green-100">Start Date</p>
                    <p className="text-lg">{candidateData.startDate}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <MapPin className="w-6 h-6 mb-2" />
                    <p className="text-sm text-green-100">Location</p>
                    <p className="text-lg">{candidateData.location}</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <Users className="w-6 h-6 mb-2" />
                    <p className="text-sm text-green-100">Manager</p>
                    <p className="text-lg">{candidateData.manager}</p>
                  </div>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Onboarding Progress</h3>
                  <span className="text-sm text-gray-600">{completedTasks} of {totalTasks} completed</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div
                    className="bg-green-600 h-4 rounded-full transition-all flex items-center justify-end pr-2"
                    style={{ width: `${progress}%` }}
                  >
                    <span className="text-xs text-white">{Math.round(progress)}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl text-green-600">{completedTasks}</p>
                    <p className="text-xs text-gray-600">Completed</p>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <p className="text-2xl text-yellow-600">
                      {onboardingChecklist.filter(t => t.status === 'in-progress').length}
                    </p>
                    <p className="text-xs text-gray-600">In Progress</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl text-gray-600">
                      {onboardingChecklist.filter(t => t.status === 'pending').length}
                    </p>
                    <p className="text-xs text-gray-600">Pending</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Upcoming Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setCurrentView('offer')}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-gray-900">View Offer Letter</p>
                          <p className="text-xs text-gray-600">Review your signed offer</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setCurrentView('compensation')}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-gray-900">View Compensation</p>
                          <p className="text-xs text-gray-600">See your full package</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                    <button
                      onClick={() => setCurrentView('onboarding')}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm text-gray-900">Complete Onboarding</p>
                          <p className="text-xs text-gray-600">{totalTasks - completedTasks} tasks remaining</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg text-gray-900 mb-4">Upcoming Tasks</h3>
                  <div className="space-y-3">
                    {onboardingChecklist.filter(t => t.status !== 'completed').slice(0, 4).map((task) => (
                      <div key={task.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{task.task}</p>
                          <p className="text-xs text-gray-600 mt-1">Due: {task.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4">Recent Notifications</h3>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notif.type === 'action' ? 'bg-yellow-100' :
                        notif.type === 'success' ? 'bg-green-100' :
                        'bg-blue-100'
                      }`}>
                        {notif.type === 'action' && <Clock className="w-4 h-4 text-yellow-600" />}
                        {notif.type === 'success' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {notif.type === 'info' && <Bell className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'offer' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Offer Status */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-lg text-green-900">Offer Accepted</p>
                    <p className="text-sm text-green-700">Signed on May 27, 2026</p>
                  </div>
                </div>
              </div>

              {/* Offer Letter Preview */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-lg text-gray-900">Offer Letter</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
                <div className="p-8">
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-white text-2xl">
                        TC
                      </div>
                      <h1 className="text-2xl text-gray-900 mb-2">TechCorp Inc.</h1>
                      <p className="text-sm text-gray-600">123 Innovation Drive, San Francisco, CA 94105</p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>May 25, 2026</p>
                      <p className="mt-4">{candidateData.name}</p>
                      <p>{candidateData.email}</p>
                    </div>

                    <div className="space-y-4 text-sm text-gray-700">
                      <p>Dear {candidateData.name},</p>
                      <p>
                        We are pleased to offer you the position of <strong>{candidateData.position}</strong> in our {candidateData.department} department at TechCorp Inc. We believe your skills and experience will be a valuable addition to our team.
                      </p>
                      <p className="mt-4"><strong>Position Details:</strong></p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Position: {candidateData.position}</li>
                        <li>Department: {candidateData.department}</li>
                        <li>Start Date: {candidateData.startDate}</li>
                        <li>Location: {candidateData.location}</li>
                        <li>Reporting To: {candidateData.manager}</li>
                      </ul>

                      <p className="mt-4"><strong>Compensation:</strong></p>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>Base Salary: ${compensationDetails.baseSalary.toLocaleString()} per year</li>
                        <li>Signing Bonus: ${compensationDetails.signingBonus.toLocaleString()}</li>
                        <li>Equity Grant: {compensationDetails.equity}</li>
                        <li>Annual Bonus: {compensationDetails.annualBonus}</li>
                      </ul>

                      <p className="mt-4">
                        This offer is contingent upon successful completion of a background check and compliance with our company policies.
                      </p>

                      <p className="mt-4">
                        Please confirm your acceptance by signing below. We look forward to welcoming you to the team!
                      </p>

                      <p className="mt-4">Sincerely,</p>
                      <p className="mt-8 italic text-gray-600">Alex Martinez</p>
                      <p className="text-gray-600">VP of Engineering</p>
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-200">
                      <p className="text-sm text-gray-700 mb-4"><strong>Candidate Signature:</strong></p>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-lg italic text-gray-900 mb-2">Sarah Johnson</p>
                        <p className="text-sm text-gray-600">Signed electronically on May 27, 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'compensation' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Total Compensation */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-8 text-white">
                <p className="text-blue-100 mb-2">Total Annual Compensation</p>
                <p className="text-5xl mb-4">
                  ${(compensationDetails.baseSalary + compensationDetails.signingBonus).toLocaleString()}
                </p>
                <p className="text-blue-100">Plus equity and comprehensive benefits</p>
              </div>

              {/* Compensation Breakdown */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Compensation Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">Base Salary</p>
                        <p className="text-xs text-gray-600">Annual</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-900">${compensationDetails.baseSalary.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">Signing Bonus</p>
                        <p className="text-xs text-gray-600">One-time payment</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-900">${compensationDetails.signingBonus.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">Equity Grant</p>
                        <p className="text-xs text-gray-600">Restricted Stock Units</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-900">{compensationDetails.equity}</p>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <Award className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">Annual Bonus</p>
                        <p className="text-xs text-gray-600">Performance-based</p>
                      </div>
                    </div>
                    <p className="text-lg text-gray-900">{compensationDetails.annualBonus}</p>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Benefits & Perks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {compensationDetails.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {idx === 0 && <Heart className="w-4 h-4 text-green-600" />}
                        {idx === 1 && <Shield className="w-4 h-4 text-green-600" />}
                        {idx === 2 && <DollarSign className="w-4 h-4 text-green-600" />}
                        {idx === 3 && <Calendar className="w-4 h-4 text-green-600" />}
                        {idx === 4 && <Coffee className="w-4 h-4 text-green-600" />}
                        {idx === 5 && <Book className="w-4 h-4 text-green-600" />}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{benefit.name}</p>
                        <p className="text-xs text-gray-600 mt-1">{benefit.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'onboarding' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Progress Overview */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg text-gray-900">Your Onboarding Progress</h3>
                  <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Checklist */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Onboarding Checklist</h3>
                <div className="space-y-3">
                  {onboardingChecklist.map((task) => (
                    <div key={task.id} className={`p-4 rounded-lg border ${
                      task.status === 'completed' ? 'bg-green-50 border-green-200' :
                      task.status === 'in-progress' ? 'bg-yellow-50 border-yellow-200' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-start gap-4">
                        {getStatusIcon(task.status)}
                        <div className="flex-1">
                          <p className={`text-sm ${
                            task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                          }`}>
                            {task.task}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">Due: {task.dueDate}</p>
                        </div>
                        {task.status === 'in-progress' && (
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                            Continue
                          </button>
                        )}
                        {task.status === 'pending' && (
                          <button className="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                            Start
                          </button>
                        )}
                        {task.status === 'completed' && (
                          <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(task.status)}`}>
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Upload */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-4">Upload Required Documents</h3>
                <div className="space-y-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Upload Identification Documents</p>
                    <p className="text-xs text-gray-500 mt-1">Driver's License, Passport, or State ID</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-700">Upload Direct Deposit Form</p>
                    <p className="text-xs text-gray-500 mt-1">Voided check or bank letter</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'documents' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                  <h3 className="text-lg text-gray-900">Your Documents</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {documents.map((doc, idx) => (
                    <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-900">{doc.name}</p>
                            <p className="text-xs text-gray-600 mt-1">
                              {doc.type} • {doc.size} • {doc.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-5 h-5 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                            <Download className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'timeline' && (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-8">Your Journey with TechCorp</h3>
                <div className="relative">
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                  <div className="space-y-8">
                    {timeline.map((event, idx) => (
                      <div key={idx} className="relative flex items-start gap-6">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white z-10 ${
                          event.status === 'completed' ? 'bg-green-600' :
                          event.status === 'in-progress' ? 'bg-yellow-500' :
                          'bg-gray-300'
                        }`}>
                          {event.status === 'completed' && <Check className="w-5 h-5 text-white" />}
                          {event.status === 'in-progress' && <Clock className="w-5 h-5 text-white" />}
                        </div>
                        <div className="flex-1 pb-8">
                          <p className="text-sm text-gray-900">{event.event}</p>
                          <p className="text-xs text-gray-600 mt-1">{event.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'help' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Contact HR */}
              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 text-white">
                <h3 className="text-xl mb-4">Need Help?</h3>
                <p className="text-green-100 mb-4">Our HR team is here to assist you with any questions.</p>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition-colors">
                    <Mail className="w-4 h-4" />
                    Email HR
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors">
                    <Phone className="w-4 h-4" />
                    Call: (555) 100-2000
                  </button>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-900 mb-2">{faq.q}</p>
                      <p className="text-sm text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chatbot */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-900">HR Assistant Chatbot</h3>
                    <p className="text-sm text-gray-600">Get instant answers to your questions</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatbot(true)}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div className="fixed bottom-8 right-8 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
          <div className="bg-green-600 rounded-t-xl px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-white">HR Assistant</p>
                <p className="text-xs text-green-100">Online</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(false)}
              className="p-1 hover:bg-green-700 rounded transition-colors"
            >
              <XCircle className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="h-96 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-green-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm text-gray-900">Hi! I'm your HR assistant. How can I help you today?</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="px-3 py-2 bg-green-50 text-green-700 text-sm rounded-lg hover:bg-green-100 transition-colors">
                  When is my start date?
                </button>
                <button className="px-3 py-2 bg-green-50 text-green-700 text-sm rounded-lg hover:bg-green-100 transition-colors">
                  Benefits enrollment
                </button>
                <button className="px-3 py-2 bg-green-50 text-green-700 text-sm rounded-lg hover:bg-green-100 transition-colors">
                  Parking information
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
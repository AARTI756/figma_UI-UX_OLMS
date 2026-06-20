import { RoleSelection } from './components/RoleSelection';
import { RecruiterDashboard } from './components/RecruiterDashboard';
import { ManagerDashboard } from './components/ManagerDashboard';
import { CandidatePortal } from './components/CandidatePortal';
import { FinanceDashboard } from './components/FinanceDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { TopNavbar } from './components/TopNavbar';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

export default function OfferLetterManagementSystem() {
  const [currentRole, setCurrentRole] = useState<'selection' | 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin'>('selection');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [workflowData, setWorkflowData] = useState<any>({
    selectedCandidate: null,
    selectedOffer: null,
    pipelineStage: 'Applied',
  });

  // Role-specific notifications
  const notificationsByRole: any = {
    recruiter: [
      { id: 1, type: 'success', category: 'offer-accepted', message: 'Sarah Johnson accepted the offer for Senior Software Engineer', time: '2 hours ago', read: false },
      { id: 2, type: 'action', category: 'pending-approval', message: 'Offer for Michael Chen is pending HR Manager approval', time: '4 hours ago', read: false },
      { id: 3, type: 'info', category: 'interview-scheduled', message: 'Interview scheduled with Emily Rodriguez for tomorrow at 2 PM', time: '6 hours ago', read: true },
      { id: 4, type: 'warning', category: 'onboarding-reminder', message: 'Reminder: Send onboarding documents to James Wilson', time: '1 day ago', read: true },
    ],
    manager: [
      { id: 1, type: 'action', category: 'pending-approval', message: '3 offers awaiting your approval - Sarah Johnson, Michael Chen, Emily Rodriguez', time: '1 hour ago', read: false },
      { id: 2, type: 'success', category: 'offer-approved', message: 'Finance approved salary for James Wilson ($155K)', time: '3 hours ago', read: false },
      { id: 3, type: 'warning', category: 'salary-approval', message: 'High urgency: Senior Engineer offer exceeds standard band by 5%', time: '5 hours ago', read: true },
      { id: 4, type: 'info', category: 'offer-sent', message: 'Offer letter sent to Lisa Anderson after your approval', time: '1 day ago', read: true },
    ],
    finance: [
      { id: 1, type: 'action', category: 'salary-approval', message: 'Salary approval needed for Sarah Johnson - $145K base + $15K bonus', time: '30 min ago', read: false },
      { id: 2, type: 'action', category: 'salary-approval', message: 'Budget review required for Engineering department - 92% utilized', time: '2 hours ago', read: false },
      { id: 3, type: 'success', category: 'offer-approved', message: 'You approved salary for Michael Chen', time: '1 day ago', read: true },
    ],
    admin: [
      { id: 1, type: 'info', category: 'document-uploaded', message: 'New user John Davis added to Recruiter role', time: '1 hour ago', read: false },
      { id: 2, type: 'warning', category: 'pending-approval', message: 'System backup completed successfully', time: '3 hours ago', read: false },
      { id: 3, type: 'info', category: 'offer-sent', message: '145 active users in the system', time: '1 day ago', read: true },
    ],
    candidate: [
      { id: 1, type: 'success', category: 'offer-approved', message: 'Your offer letter has been approved and is ready for review', time: '2 hours ago', read: false },
      { id: 2, type: 'action', category: 'document-uploaded', message: 'Please upload your identification documents by May 28', time: '1 day ago', read: false },
      { id: 3, type: 'info', category: 'onboarding-reminder', message: 'Benefits enrollment opens on June 1st', time: '2 days ago', read: true },
    ],
  };

  const handleRoleSelect = (role: 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin') => {
    setCurrentRole(role);
    setCurrentView('dashboard');
  };

  const handleBackToSelection = () => {
    setCurrentRole('selection');
    setCurrentView('dashboard');
  };

  const handleGoHome = () => {
    setCurrentView('dashboard');
  };

  const handleWorkflowNavigation = (role: 'recruiter' | 'manager' | 'candidate' | 'finance' | 'admin', view: string, data?: any) => {
    setCurrentRole(role);
    setCurrentView(view);
    if (data) {
      setWorkflowData({ ...workflowData, ...data });
    }
  };

  const getCurrentNotifications = () => {
    if (currentRole === 'selection') return [];
    return notificationsByRole[currentRole] || [];
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {currentRole === 'selection' && (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}
      
      {currentRole !== 'selection' && (
        <>
          <TopNavbar
            currentRole={currentRole as any}
            onRoleSwitch={handleRoleSelect}
            onBackToSelection={handleBackToSelection}
            onGoHome={handleGoHome}
            notifications={getCurrentNotifications()}
          />
          
          {currentRole === 'recruiter' && (
            <RecruiterDashboard 
              onBackToSelection={handleBackToSelection}
              currentView={currentView}
              setCurrentView={setCurrentView}
              onWorkflowNavigate={handleWorkflowNavigation}
              workflowData={workflowData}
            />
          )}
          {currentRole === 'manager' && (
            <ManagerDashboard 
              onBackToSelection={handleBackToSelection}
              currentView={currentView}
              setCurrentView={setCurrentView}
              onWorkflowNavigate={handleWorkflowNavigation}
              workflowData={workflowData}
            />
          )}
          {currentRole === 'finance' && (
            <FinanceDashboard 
              onBackToSelection={handleBackToSelection}
              currentView={currentView}
              setCurrentView={setCurrentView}
              onWorkflowNavigate={handleWorkflowNavigation}
              workflowData={workflowData}
            />
          )}
          {currentRole === 'admin' && (
            <AdminDashboard 
              onBackToSelection={handleBackToSelection}
              currentView={currentView}
              setCurrentView={setCurrentView}
              onWorkflowNavigate={handleWorkflowNavigation}
              workflowData={workflowData}
            />
          )}
          {currentRole === 'candidate' && (
            <CandidatePortal 
              onBackToSelection={handleBackToSelection}
              currentView={currentView}
              setCurrentView={setCurrentView}
              workflowData={workflowData}
            />
          )}
        </>
      )}
    </div>
  );
}
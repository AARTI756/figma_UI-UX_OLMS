import { 
  CheckCircle, Clock, XCircle, User, FileText, 
  Shield, DollarSign, Send, Eye, Edit2, Calendar 
} from 'lucide-react';

interface WorkflowStage {
  id: string;
  name: string;
  status: 'completed' | 'in-progress' | 'pending' | 'rejected';
  actor: string;
  timestamp?: string;
  description: string;
  icon: any;
  color: string;
}

interface WorkflowTrackerProps {
  candidateName: string;
  position: string;
  currentStage: string;
}

export function WorkflowTracker({ candidateName, currentStage }: WorkflowTrackerProps) {
  const workflowStages: WorkflowStage[] = [
    {
      id: 'applied',
      name: 'Application Received',
      status: 'completed',
      actor: 'System',
      timestamp: '2026-05-20 10:30 AM',
      description: 'Candidate application submitted',
      icon: User,
      color: 'blue'
    },
    {
      id: 'screening',
      name: 'Resume Screening',
      status: 'completed',
      actor: 'John Davis (Recruiter)',
      timestamp: '2026-05-21 02:15 PM',
      description: 'Initial screening completed',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 'interview',
      name: 'Interview Scheduled',
      status: 'completed',
      actor: 'John Davis (Recruiter)',
      timestamp: '2026-05-22 09:00 AM',
      description: 'Technical interview conducted',
      icon: Calendar,
      color: 'blue'
    },
    {
      id: 'selected',
      name: 'Candidate Selected',
      status: 'completed',
      actor: 'Hiring Team',
      timestamp: '2026-05-23 04:30 PM',
      description: 'Candidate approved for offer',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 'offer-draft',
      name: 'Offer Letter Created',
      status: 'completed',
      actor: 'John Davis (Recruiter)',
      timestamp: '2026-05-24 11:00 AM',
      description: 'Offer letter drafted with compensation details',
      icon: Edit2,
      color: 'blue'
    },
    {
      id: 'hr-approval',
      name: 'HR Manager Review',
      status: currentStage === 'hr-approval' ? 'in-progress' : currentStage === 'finance-approval' || currentStage === 'offer-sent' || currentStage === 'accepted' ? 'completed' : 'pending',
      actor: 'Alex Martinez (HR Manager)',
      timestamp: currentStage === 'finance-approval' || currentStage === 'offer-sent' || currentStage === 'accepted' ? '2026-05-25 10:15 AM' : undefined,
      description: 'Compensation and compliance review',
      icon: Shield,
      color: 'purple'
    },
    {
      id: 'finance-approval',
      name: 'Finance Approval',
      status: currentStage === 'finance-approval' ? 'in-progress' : currentStage === 'offer-sent' || currentStage === 'accepted' ? 'completed' : 'pending',
      actor: 'Finance Team',
      timestamp: currentStage === 'offer-sent' || currentStage === 'accepted' ? '2026-05-25 03:45 PM' : undefined,
      description: 'Salary and budget approval',
      icon: DollarSign,
      color: 'orange'
    },
    {
      id: 'offer-sent',
      name: 'Offer Letter Sent',
      status: currentStage === 'offer-sent' ? 'in-progress' : currentStage === 'accepted' ? 'completed' : 'pending',
      actor: 'System',
      timestamp: currentStage === 'accepted' ? '2026-05-26 09:00 AM' : currentStage === 'offer-sent' ? '2026-05-26 09:00 AM' : undefined,
      description: 'Offer sent to candidate via email',
      icon: Send,
      color: 'blue'
    },
    {
      id: 'accepted',
      name: 'Offer Accepted',
      status: currentStage === 'accepted' ? 'completed' : 'pending',
      actor: candidateName,
      timestamp: currentStage === 'accepted' ? '2026-05-27 02:30 PM' : undefined,
      description: 'Candidate digitally signed offer letter',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 'onboarding',
      name: 'Onboarding Started',
      status: currentStage === 'accepted' ? 'in-progress' : 'pending',
      actor: 'HR Team',
      timestamp: currentStage === 'accepted' ? '2026-05-27 03:00 PM' : undefined,
      description: 'Pre-boarding documentation and setup',
      icon: FileText,
      color: 'green'
    }
  ];

  const getStageIcon = (stage: WorkflowStage) => {
    const Icon = stage.icon;
    const iconClass = `w-5 h-5 ${
      stage.status === 'completed' ? 'text-white' :
      stage.status === 'in-progress' ? 'text-white' :
      stage.status === 'rejected' ? 'text-white' :
      'text-gray-400'
    }`;
    return <Icon className={iconClass} />;
  };

  const getStageColor = (stage: WorkflowStage) => {
    if (stage.status === 'completed') {
      return stage.color === 'green' ? 'bg-green-600' :
             stage.color === 'blue' ? 'bg-blue-600' :
             stage.color === 'purple' ? 'bg-purple-600' :
             stage.color === 'orange' ? 'bg-orange-600' :
             'bg-gray-600';
    }
    if (stage.status === 'in-progress') return 'bg-yellow-500 animate-pulse';
    if (stage.status === 'rejected') return 'bg-red-600';
    return 'bg-gray-300';
  };

  const completedStages = workflowStages.filter(s => s.status === 'completed').length;
  const totalStages = workflowStages.length;
  const progress = (completedStages / totalStages) * 100;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg text-gray-900">Hiring Workflow Progress</h3>
          <span className="text-sm text-gray-600">
            {completedStages} of {totalStages} stages completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-1">
        {workflowStages.map((stage, index) => (
          <div key={stage.id} className="relative">
            {/* Connecting Line */}
            {index < workflowStages.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            
            {/* Stage Card */}
            <div className={`relative flex items-start gap-4 p-4 rounded-lg transition-all ${
              stage.status === 'in-progress' ? 'bg-yellow-50 border-2 border-yellow-300' :
              stage.status === 'completed' ? 'bg-gray-50' :
              'bg-white'
            }`}>
              {/* Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getStageColor(stage)} z-10 border-4 border-white`}>
                {stage.status === 'completed' && <CheckCircle className="w-5 h-5 text-white" />}
                {stage.status === 'in-progress' && <Clock className="w-5 h-5 text-white" />}
                {stage.status === 'rejected' && <XCircle className="w-5 h-5 text-white" />}
                {stage.status === 'pending' && <div className="w-3 h-3 bg-gray-400 rounded-full"></div>}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h4 className={`text-sm ${
                      stage.status === 'completed' || stage.status === 'in-progress' ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {stage.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">{stage.description}</p>
                  </div>
                  {stage.status === 'in-progress' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full border border-yellow-200 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      In Progress
                    </span>
                  )}
                  {stage.status === 'completed' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full border border-green-200">
                      Completed
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-600">{stage.actor}</span>
                  {stage.timestamp && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{stage.timestamp}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            {currentStage === 'accepted' ? (
              <CheckCircle className="w-6 h-6 text-green-600" />
            ) : (
              <Clock className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-900">
              {currentStage === 'hr-approval' && 'Waiting for HR Manager approval'}
              {currentStage === 'finance-approval' && 'Waiting for Finance Team approval'}
              {currentStage === 'offer-sent' && 'Offer sent - Waiting for candidate response'}
              {currentStage === 'accepted' && 'Offer accepted! Onboarding in progress'}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {currentStage === 'hr-approval' && 'Next: Finance approval required'}
              {currentStage === 'finance-approval' && 'Next: Offer will be sent to candidate'}
              {currentStage === 'offer-sent' && 'Offer expires in 12 days'}
              {currentStage === 'accepted' && 'First day: June 15, 2026'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

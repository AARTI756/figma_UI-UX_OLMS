import React, { useState } from 'react';
import { Users, Eye, Calendar, CheckCircle, Send, FileText, ChevronDown } from 'lucide-react';

interface Candidate {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  stage: string;
  daysInStage: number;
  priority: 'high' | 'medium' | 'low';
  nextAction: string;
  recruiter: string;
}

export function CandidatePipeline() {
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  const pipeline = [
    { 
      stage: 'Applied', 
      count: 145, 
      color: 'bg-gray-500',
      description: 'New applications received'
    },
    { 
      stage: 'Screening', 
      count: 78, 
      color: 'bg-blue-500',
      description: 'Resume review in progress'
    },
    { 
      stage: 'Interview', 
      count: 42, 
      color: 'bg-purple-500',
      description: 'Interview scheduled or completed'
    },
    { 
      stage: 'Selected', 
      count: 18, 
      color: 'bg-yellow-500',
      description: 'Approved for offer creation'
    },
    { 
      stage: 'Offer Sent', 
      count: 12, 
      color: 'bg-orange-500',
      description: 'Awaiting candidate response'
    },
    { 
      stage: 'Accepted', 
      count: 8, 
      color: 'bg-green-500',
      description: 'Offer accepted, onboarding'
    },
  ];

  const candidates: Candidate[] = [
    { id: 1, name: 'Sarah Johnson', position: 'Senior Software Engineer', email: 'sarah.j@email.com', phone: '+1 (555) 123-4567', stage: 'Offer Sent', daysInStage: 2, priority: 'high', nextAction: 'Follow up on offer', recruiter: 'John Davis' },
    { id: 2, name: 'Michael Chen', position: 'Product Manager', email: 'michael.c@email.com', phone: '+1 (555) 234-5678', stage: 'Selected', daysInStage: 1, priority: 'high', nextAction: 'Create offer letter', recruiter: 'Jane Smith' },
    { id: 3, name: 'Emily Rodriguez', position: 'UX Designer', email: 'emily.r@email.com', phone: '+1 (555) 345-6789', stage: 'Interview', daysInStage: 5, priority: 'medium', nextAction: 'Schedule final round', recruiter: 'John Davis' },
    { id: 4, name: 'James Wilson', position: 'Data Scientist', email: 'james.w@email.com', phone: '+1 (555) 456-7890', stage: 'Accepted', daysInStage: 0, priority: 'low', nextAction: 'Send onboarding docs', recruiter: 'Sarah Lee' },
    { id: 5, name: 'Lisa Anderson', position: 'Marketing Director', email: 'lisa.a@email.com', phone: '+1 (555) 567-8901', stage: 'Screening', daysInStage: 3, priority: 'medium', nextAction: 'Review resume', recruiter: 'Mike Johnson' },
    { id: 6, name: 'David Kumar', position: 'DevOps Engineer', email: 'david.k@email.com', phone: '+1 (555) 678-9012', stage: 'Interview', daysInStage: 2, priority: 'high', nextAction: 'Technical interview', recruiter: 'John Davis' },
  ];

  const stageCandidates = selectedStage 
    ? candidates.filter(c => c.stage === selectedStage)
    : [];

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Visualization */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg text-gray-900 mb-6">Candidate Pipeline Overview</h3>
        
        {/* Funnel Chart */}
        <div className="space-y-3">
          {pipeline.map((stage, index) => {
            const width = 100 - (index * 12);
            const isSelected = selectedStage === stage.stage;
            
            return (
              <div key={stage.stage}>
                <button
                  onClick={() => setSelectedStage(isSelected ? null : stage.stage)}
                  className={`w-full group transition-all ${isSelected ? 'scale-105' : ''}`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-gray-700 w-24">{stage.stage}</span>
                    <div className="flex-1 relative">
                      <div className="w-full bg-gray-100 rounded-lg h-12 overflow-hidden">
                        <div
                          className={`h-full ${stage.color} transition-all duration-300 group-hover:opacity-90 flex items-center justify-between px-4`}
                          style={{ width: `${width}%` }}
                        >
                          <span className="text-white text-sm font-medium">{stage.count} candidates</span>
                          <ChevronDown className={`w-5 h-5 text-white transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                      <div className="absolute -right-2 top-0 bottom-0 w-4 bg-white transform skew-x-12"></div>
                    </div>
                    <span className="text-xs text-gray-600 w-48 text-right">{stage.description}</span>
                  </div>
                </button>

                {/* Expanded Candidate List */}
                {isSelected && (
                  <div className="mt-4 mb-6 ml-28 space-y-3 animate-fadeIn">
                    {stageCandidates.length > 0 ? (
                      stageCandidates.map(candidate => (
                        <div key={candidate.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                                {candidate.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-sm text-gray-900">{candidate.name}</p>
                                <p className="text-xs text-gray-600">{candidate.position}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-xs text-gray-500">{candidate.email}</span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-500">Recruiter: {candidate.recruiter}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs border ${getPriorityColor(candidate.priority)}`}>
                                  {candidate.priority}
                                </span>
                                <p className="text-xs text-gray-600 mt-1">{candidate.daysInStage} days in stage</p>
                              </div>
                              <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                                {candidate.nextAction}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-600 text-center py-4">No candidates in this stage</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pipeline Stats */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl text-blue-600">
              {pipeline.reduce((sum, stage) => sum + stage.count, 0)}
            </p>
            <p className="text-xs text-gray-600 mt-1">Total Candidates</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl text-green-600">
              {Math.round((pipeline[pipeline.length - 1].count / pipeline[0].count) * 100)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">Conversion Rate</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl text-purple-600">18</p>
            <p className="text-xs text-gray-600 mt-1">Avg. Days to Offer</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl text-orange-600">12</p>
            <p className="text-xs text-gray-600 mt-1">Pending Offers</p>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg text-gray-900 mb-4">Pipeline Activities</h3>
        <div className="space-y-3">
          {[
            { action: 'Candidate moved to Interview stage', candidate: 'Emily Rodriguez', time: '2 hours ago', icon: Calendar, color: 'purple' },
            { action: 'Offer letter sent', candidate: 'Sarah Johnson', time: '4 hours ago', icon: Send, color: 'blue' },
            { action: 'Candidate selected for offer', candidate: 'Michael Chen', time: '1 day ago', icon: CheckCircle, color: 'green' },
            { action: 'Resume screening completed', candidate: 'Lisa Anderson', time: '1 day ago', icon: Eye, color: 'blue' },
            { action: 'Offer accepted', candidate: 'James Wilson', time: '2 days ago', icon: FileText, color: 'green' },
          ].map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-${activity.color}-100`}>
                  <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600 mt-1">{activity.candidate} • {activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

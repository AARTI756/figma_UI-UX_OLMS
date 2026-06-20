import React from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, Clock, FileText, 
  Upload, Calendar, DollarSign, Users, Send, X 
} from 'lucide-react';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'action';
  category: string;
  message: string;
  time: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationPanelProps {
  notifications: Notification[];
  onClose: () => void;
  role: string;
}

export function NotificationPanel({ notifications, onClose, role }: NotificationPanelProps) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'offer-approved':
      case 'offer-accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'offer-rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pending-approval':
      case 'salary-approval':
        return <DollarSign className="w-5 h-5 text-orange-600" />;
      case 'document-uploaded':
        return <Upload className="w-5 h-5 text-blue-600" />;
      case 'interview-scheduled':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      case 'onboarding-reminder':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'offer-sent':
        return <Send className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'action':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      ></div>
      <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              {notifications.filter(n => !n.read).length} unread
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getIcon(notification.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{notification.time}</p>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                      {notification.action && (
                        <button
                          onClick={notification.action.onClick}
                          className="mt-2 text-xs text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          {notification.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-200">
            <button className="w-full text-sm text-blue-600 hover:text-blue-700 py-2 hover:bg-blue-50 rounded transition-colors">
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  );
}

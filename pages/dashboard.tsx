import Head from 'next/head';
import { useState } from 'react';
import ProgressTracker from '../components/Progress/ProgressTracker';
import { 
  AcademicCapIcon, 
  ChartBarIcon, 
  BookmarkIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';
import Card from '../components/UI/Card';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('progress');

  const recentActivity = [
    { id: 1, type: 'lesson', title: 'Installation & Setup', timestamp: '2 hours ago' },
    { id: 2, type: 'quiz', title: 'PEGA BPM Fundamentals Quiz', score: 85, timestamp: '1 day ago' },
    { id: 3, type: 'lesson', title: 'What is PEGA BPM?', timestamp: '2 days ago' },
    { id: 4, type: 'bookmark', title: 'Rules & Rule Resolution', timestamp: '3 days ago' },
  ];

  const bookmarks = [
    { id: 1, title: 'Rules & Rule Resolution', category: 'Intermediate', url: '/tutorials/intermediate/rules-resolution' },
    { id: 2, title: 'Performance Tuning', category: 'Advanced', url: '/tutorials/advanced/performance-tuning' },
    { id: 3, title: 'CSA Exam Preparation', category: 'Certification', url: '/certifications/csa' },
    { id: 4, title: 'Banking App Project', category: 'Project', url: '/projects/bank-onboarding' },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookmarkIcon className="h-5 w-5 text-blue-600" />;
      case 'quiz': return <AcademicCapIcon className="h-5 w-5 text-green-600" />;
      case 'bookmark': return <BookmarkIcon className="h-5 w-5 text-purple-600" />;
      default: return <ClockIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <>
      <Head>
        <title>Learning Dashboard | PegaStack</title>
        <meta name="description" content="Track your PEGA learning progress, manage bookmarks, and continue your journey." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-gray-600">
              Continue your PEGA learning journey and track your progress.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'progress', name: 'Progress', icon: ChartBarIcon },
                { id: 'activity', name: 'Recent Activity', icon: ClockIcon },
                { id: 'bookmarks', name: 'Bookmarks', icon: BookmarkIcon },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-pega-blue text-pega-blue'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'progress' && (
            <ProgressTracker />
          )}

          {activeTab === 'activity' && (
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-4 hover:bg-gray-50 rounded-lg">
                    <div className="mr-4">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {activity.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="capitalize">{activity.type}</span>
                        {activity.score && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Score: {activity.score}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.timestamp}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {activeTab === 'bookmarks' && (
            <Card>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Bookmarks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bookmarks.map((bookmark) => (
                  <div key={bookmark.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {bookmark.title}
                      </h3>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {bookmark.category}
                      </span>
                    </div>
                    <a 
                      href={bookmark.url}
                      className="text-pega-blue hover:text-pega-light text-sm font-medium"
                    >
                      Continue Reading →
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

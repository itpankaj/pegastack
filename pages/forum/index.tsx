import { useState } from 'react';
import Head from 'next/head';
import { PlusIcon, MagnifyingGlassIcon, FireIcon, ClockIcon } from '@heroicons/react/24/outline';
import ForumCard from '../../components/Forum/ForumCard';
import CategoryFilter from '../../components/Forum/CategoryFilter';
import NewThreadForm from '../../components/Forum/NewThreadForm';

const ForumPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [isNewThreadFormOpen, setIsNewThreadFormOpen] = useState(false);

  // Sample forum data - in real app, this would come from your database
  const forumThreads = [
    {
      id: '1',
      title: 'How to implement custom validation rules in PEGA?',
      description: 'I\'m trying to create a custom validation rule for email format validation in my case type. Can someone guide me through the process?',
      category: 'Rules & Flows',
      author: 'Sarah Chen',
      authorAvatar: '/avatars/sarah.jpg',
      replies: 12,
      views: 245,
      lastActivity: '2 hours ago',
      tags: ['validation', 'rules', 'case-type'],
      isPinned: false,
      isSolved: true
    },
    {
      id: '2',
      title: 'Best practices for PEGA performance optimization',
      description: 'What are the key strategies for optimizing PEGA application performance? Looking for both development and runtime optimization tips.',
      category: 'Performance',
      author: 'Mike Rodriguez',
      replies: 8,
      views: 189,
      lastActivity: '4 hours ago',
      tags: ['performance', 'optimization', 'best-practices'],
      isPinned: true,
      isSolved: false
    },
    {
      id: '3',
      title: 'CSA Certification Study Group - Week 3',
      description: 'Join our weekly study group for CSA certification preparation. This week we\'re covering Case Management fundamentals.',
      category: 'Certification Help',
      author: 'Alex Thompson',
      replies: 25,
      views: 412,
      lastActivity: '6 hours ago',
      tags: ['csa', 'certification', 'study-group'],
      isPinned: true,
      isSolved: false
    },
    {
      id: '4',
      title: 'Integration with REST APIs - Error handling',
      description: 'I\'m having trouble with error handling in REST connector. The service returns 400 but my flow doesn\'t catch it properly.',
      category: 'Integration',
      author: 'Jennifer Liu',
      replies: 6,
      views: 134,
      lastActivity: '8 hours ago',
      tags: ['rest', 'integration', 'error-handling'],
      isPinned: false,
      isSolved: false
    },
    {
      id: '5',
      title: 'Beginner question: What\'s the difference between Flow and Process?',
      description: 'I\'m new to PEGA and confused about when to use Flow vs Process. Can someone explain the key differences?',
      category: 'Beginner Questions',
      author: 'David Park',
      replies: 15,
      views: 298,
      lastActivity: '12 hours ago',
      tags: ['beginner', 'flow', 'process'],
      isPinned: false,
      isSolved: true
    },
    {
      id: '6',
      title: 'Showcase: Insurance Claims Processing App',
      description: 'Built a complete insurance claims processing application using PEGA. Sharing screenshots and lessons learned.',
      category: 'Project Showcase',
      author: 'Maria Garcia',
      replies: 18,
      views: 356,
      lastActivity: '1 day ago',
      tags: ['showcase', 'insurance', 'claims'],
      isPinned: false,
      isSolved: false
    }
  ];

  const categories = [
    'General Discussion',
    'Beginner Questions',
    'Advanced Topics',
    'Case Management',
    'Rules & Flows',
    'Integration',
    'Performance',
    'Certification Help',
    'Career Advice',
    'Project Showcase'
  ];

  const filteredThreads = forumThreads.filter(thread => {
    const matchesCategory = selectedCategory === 'all' || thread.category === selectedCategory;
    const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         thread.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'replies':
        return b.replies - a.replies;
      case 'recent':
      default:
        return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
    }
  });

  const handleNewThread = (threadData: any) => {
    console.log('New thread:', threadData);
    // In real app, this would save to database
  };

  return (
    <>
      <Head>
        <title>Community Forum - PegaStack</title>
        <meta name="description" content="Join the PegaStack community forum to discuss PEGA BPM, ask questions, share knowledge, and connect with fellow developers." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
                <p className="text-gray-600 mt-2">
                  Connect with the PEGA community, ask questions, and share knowledge
                </p>
              </div>
              <button
                onClick={() => setIsNewThreadFormOpen(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>New Discussion</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              
              {/* Forum Stats */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Forum Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Discussions</span>
                    <span className="font-semibold text-pega-blue">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Members</span>
                    <span className="font-semibold text-pega-blue">892</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Solved Questions</span>
                    <span className="font-semibold text-green-600">734</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Week</span>
                    <span className="font-semibold text-pega-blue">45</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search and Sort */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pega-blue focus:border-transparent"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pega-blue focus:border-transparent"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="replies">Most Replies</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Thread List */}
              <div className="space-y-4">
                {sortedThreads.length > 0 ? (
                  sortedThreads.map((thread) => (
                    <ForumCard key={thread.id} {...thread} />
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <MagnifyingGlassIcon className="w-12 h-12 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your search or filter criteria, or start a new discussion.
                    </p>
                    <button
                      onClick={() => setIsNewThreadFormOpen(true)}
                      className="btn-primary"
                    >
                      Start New Discussion
                    </button>
                  </div>
                )}
              </div>

              {/* Load More */}
              {sortedThreads.length > 0 && (
                <div className="text-center mt-8">
                  <button className="btn-secondary">
                    Load More Discussions
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* New Thread Form Modal */}
      <NewThreadForm
        isOpen={isNewThreadFormOpen}
        onClose={() => setIsNewThreadFormOpen(false)}
        onSubmit={handleNewThread}
      />
    </>
  );
};

export default ForumPage;

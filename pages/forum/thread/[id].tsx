import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeftIcon, EyeIcon, ClockIcon, UserIcon, PencilIcon } from '@heroicons/react/24/outline';
import ThreadReply from '../../../components/Forum/ThreadReply';

interface ThreadPageProps {
  thread: {
    id: string;
    title: string;
    content: string;
    category: string;
    author: string;
    authorAvatar?: string;
    authorRole?: string;
    views: number;
    createdAt: string;
    tags: string[];
    isPinned: boolean;
    isSolved: boolean;
    replies: {
      id: string;
      author: string;
      authorAvatar?: string;
      authorRole?: string;
      content: string;
      timestamp: string;
      upvotes: number;
      downvotes: number;
      isAcceptedAnswer?: boolean;
    }[];
  };
}

const ThreadPage = ({ thread }: ThreadPageProps) => {
  const [newReply, setNewReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReply.trim()) return;

    // In real app, this would save to database
    console.log('New reply:', newReply);
    setNewReply('');
    setIsReplying(false);
  };

  const handleMarkAsAnswer = (replyId: string) => {
    console.log('Mark as answer:', replyId);
    // In real app, this would update the database
  };

  const handleVote = (replyId: string, voteType: 'up' | 'down') => {
    console.log('Vote:', replyId, voteType);
    // In real app, this would update the database
  };

  return (
    <>
      <Head>
        <title>{thread.title} - Forum | PegaStack</title>
        <meta name="description" content={thread.content.substring(0, 160)} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/forum"
              className="inline-flex items-center text-pega-blue hover:text-pega-light font-medium"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Forum
            </Link>
          </div>

          {/* Thread Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-3">
                  {thread.isPinned && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      📌 Pinned
                    </span>
                  )}
                  {thread.isSolved && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✅ Solved
                    </span>
                  )}
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {thread.category}
                  </span>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                  {thread.title}
                </h1>

                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    {thread.authorAvatar ? (
                      <img src={thread.authorAvatar} alt={thread.author} className="w-5 h-5 rounded-full" />
                    ) : (
                      <UserIcon className="w-5 h-5" />
                    )}
                    <span>{thread.author}</span>
                    {thread.authorRole && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {thread.authorRole}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{thread.createdAt}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <EyeIcon className="w-4 h-4" />
                    <span>{thread.views} views</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {thread.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: thread.content }} />
            </div>
          </div>

          {/* Replies */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900">
              {thread.replies.length} {thread.replies.length === 1 ? 'Reply' : 'Replies'}
            </h2>

            {thread.replies.map((reply) => (
              <ThreadReply
                key={reply.id}
                {...reply}
                canMarkAsAnswer={!thread.isSolved}
                onMarkAsAnswer={handleMarkAsAnswer}
                onVote={handleVote}
              />
            ))}
          </div>

          {/* Reply Form */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Your Reply</h3>
            
            {!isReplying ? (
              <button
                onClick={() => setIsReplying(true)}
                className="w-full p-4 text-left text-gray-500 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <PencilIcon className="w-5 h-5" />
                  <span>Write your reply...</span>
                </div>
              </button>
            ) : (
              <form onSubmit={handleSubmitReply} className="space-y-4">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pega-blue focus:border-transparent"
                  placeholder="Share your thoughts, provide an answer, or ask for clarification..."
                  required
                />
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Be respectful and constructive in your response.
                  </p>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setIsReplying(false);
                        setNewReply('');
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Post Reply
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Sample paths - in real app, this would come from your database
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } },
  ];

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  // Sample thread data - in real app, fetch from database
  const threadData: { [key: string]: any } = {
    '1': {
      id: '1',
      title: 'How to implement custom validation rules in PEGA?',
      content: `
        <p>I'm trying to create a custom validation rule for email format validation in my case type. I've looked at the documentation but I'm still confused about the best approach.</p>
        
        <p>Here's what I want to achieve:</p>
        <ul>
          <li>Validate email format on a property</li>
          <li>Show custom error message if invalid</li>
          <li>Apply this validation across multiple case types</li>
        </ul>
        
        <p>I've tried using the built-in email format validation, but I need more specific validation rules for our business requirements.</p>
        
        <p>Any guidance would be greatly appreciated!</p>
      `,
      category: 'Rules & Flows',
      author: 'Sarah Chen',
      authorRole: 'Developer',
      views: 245,
      createdAt: '2 days ago',
      tags: ['validation', 'rules', 'case-type'],
      isPinned: false,
      isSolved: true,
      replies: [
        {
          id: 'r1',
          author: 'Mike Rodriguez',
          authorRole: 'Senior Architect',
          content: `
            <p>Great question! For custom email validation in PEGA, you have a few options:</p>
            
            <h4>Option 1: Edit Validate Rule</h4>
            <p>Create an Edit Validate rule with a custom Java function or regex pattern:</p>
            <pre><code>@IsValidEmail(.EmailProperty)</code></pre>
            
            <h4>Option 2: Custom Function</h4>
            <p>You can create a custom function in a library rule and call it from your validation.</p>
            
            <p>I'd recommend Option 1 for most cases as it's more maintainable.</p>
          `,
          timestamp: '1 day ago',
          upvotes: 8,
          downvotes: 0,
          isAcceptedAnswer: true
        },
        {
          id: 'r2',
          author: 'Jennifer Liu',
          authorRole: 'Lead Developer',
          content: `
            <p>Building on Mike's answer, here's a complete example:</p>
            
            <ol>
              <li>Create Edit Validate rule: <code>ValidateEmail</code></li>
              <li>Set the condition to check email format</li>
              <li>Add custom error message</li>
              <li>Reference this rule in your case type properties</li>
            </ol>
            
            <p>This approach ensures consistency across all your case types.</p>
          `,
          timestamp: '18 hours ago',
          upvotes: 5,
          downvotes: 0
        }
      ]
    },
    '2': {
      id: '2',
      title: 'Best practices for PEGA performance optimization',
      content: `
        <p>I'm working on a large PEGA application that's experiencing performance issues. The application handles thousands of cases daily and we're seeing slow response times.</p>
        
        <p>Current issues:</p>
        <ul>
          <li>Slow case creation (5-10 seconds)</li>
          <li>Report queries taking too long</li>
          <li>UI responsiveness issues</li>
        </ul>
        
        <p>What are the key strategies for optimizing PEGA application performance? Looking for both development-time and runtime optimization tips.</p>
      `,
      category: 'Performance',
      author: 'Mike Rodriguez',
      views: 189,
      createdAt: '3 days ago',
      tags: ['performance', 'optimization', 'best-practices'],
      isPinned: true,
      isSolved: false,
      replies: [
        {
          id: 'r3',
          author: 'Alex Thompson',
          authorRole: 'Performance Specialist',
          content: `
            <p>Performance optimization in PEGA requires a multi-layered approach:</p>
            
            <h4>Database Level:</h4>
            <ul>
              <li>Optimize database indexes</li>
              <li>Review and tune SQL queries</li>
              <li>Consider database partitioning for large tables</li>
            </ul>
            
            <h4>Application Level:</h4>
            <ul>
              <li>Use declare expressions wisely</li>
              <li>Minimize rule resolution overhead</li>
              <li>Optimize data transforms</li>
            </ul>
            
            <p>I can provide more specific guidance if you share details about your architecture.</p>
          `,
          timestamp: '2 days ago',
          upvotes: 12,
          downvotes: 1
        }
      ]
    }
  };

  const thread = threadData[id];

  if (!thread) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      thread
    },
    revalidate: 60
  };
};

export default ThreadPage;

import Link from 'next/link';
import { ChatBubbleLeftIcon, EyeIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';

interface ForumCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  authorAvatar?: string;
  replies: number;
  views: number;
  lastActivity: string;
  tags: string[];
  isPinned?: boolean;
  isSolved?: boolean;
}

const ForumCard = ({
  id,
  title,
  description,
  category,
  author,
  authorAvatar,
  replies,
  views,
  lastActivity,
  tags,
  isPinned = false,
  isSolved = false
}: ForumCardProps) => {
  return (
    <div className={`bg-white rounded-lg border ${isPinned ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'} p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            {isPinned && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                📌 Pinned
              </span>
            )}
            {isSolved && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✅ Solved
              </span>
            )}
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {category}
            </span>
          </div>
          
          <Link href={`/forum/thread/${id}`}>
            <h3 className="text-lg font-semibold text-gray-900 hover:text-pega-blue cursor-pointer mb-2">
              {title}
            </h3>
          </Link>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {authorAvatar ? (
              <img src={authorAvatar} alt={author} className="w-5 h-5 rounded-full" />
            ) : (
              <UserIcon className="w-5 h-5" />
            )}
            <span>{author}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            <span>{replies}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <EyeIcon className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <ClockIcon className="w-4 h-4" />
          <span>{lastActivity}</span>
        </div>
      </div>
    </div>
  );
};

export default ForumCard;

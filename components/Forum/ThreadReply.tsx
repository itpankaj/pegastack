import { useState } from 'react';
import { HandThumbUpIcon, HandThumbDownIcon, ChatBubbleLeftIcon, UserIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpSolidIcon, HandThumbDownIcon as HandThumbDownSolidIcon } from '@heroicons/react/24/solid';

interface ThreadReplyProps {
  id: string;
  author: string;
  authorAvatar?: string;
  authorRole?: string;
  content: string;
  timestamp: string;
  upvotes: number;
  downvotes: number;
  isAcceptedAnswer?: boolean;
  canMarkAsAnswer?: boolean;
  onMarkAsAnswer?: (replyId: string) => void;
  onVote?: (replyId: string, voteType: 'up' | 'down') => void;
}

const ThreadReply = ({
  id,
  author,
  authorAvatar,
  authorRole,
  content,
  timestamp,
  upvotes,
  downvotes,
  isAcceptedAnswer = false,
  canMarkAsAnswer = false,
  onMarkAsAnswer,
  onVote
}: ThreadReplyProps) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  const handleVote = (voteType: 'up' | 'down') => {
    if (userVote === voteType) {
      setUserVote(null);
    } else {
      setUserVote(voteType);
    }
    onVote?.(id, voteType);
  };

  return (
    <div className={`bg-white rounded-lg border p-6 ${isAcceptedAnswer ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
      {isAcceptedAnswer && (
        <div className="flex items-center space-x-2 mb-4 text-green-700">
          <span className="text-lg">✅</span>
          <span className="font-medium text-sm">Accepted Answer</span>
        </div>
      )}
      
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {authorAvatar ? (
            <img src={authorAvatar} alt={author} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-gray-600" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-semibold text-gray-900">{author}</h4>
            {authorRole && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {authorRole}
              </span>
            )}
            <span className="text-sm text-gray-500">{timestamp}</span>
          </div>
          
          <div className="prose prose-sm max-w-none mb-4">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleVote('up')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                    userVote === 'up'
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {userVote === 'up' ? (
                    <HandThumbUpSolidIcon className="w-4 h-4" />
                  ) : (
                    <HandThumbUpIcon className="w-4 h-4" />
                  )}
                  <span>{upvotes}</span>
                </button>
                
                <button
                  onClick={() => handleVote('down')}
                  className={`flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium transition-colors ${
                    userVote === 'down'
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {userVote === 'down' ? (
                    <HandThumbDownSolidIcon className="w-4 h-4" />
                  ) : (
                    <HandThumbDownIcon className="w-4 h-4" />
                  )}
                  <span>{downvotes}</span>
                </button>
              </div>
              
              <button className="flex items-center space-x-1 px-2 py-1 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                <ChatBubbleLeftIcon className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </div>
            
            {canMarkAsAnswer && !isAcceptedAnswer && (
              <button
                onClick={() => onMarkAsAnswer?.(id)}
                className="px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
              >
                Mark as Answer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadReply;

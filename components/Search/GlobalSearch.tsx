import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'tutorial' | 'blog' | 'forum' | 'project' | 'certification';
  url: string;
  category?: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch = ({ isOpen, onClose }: GlobalSearchProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample search data - in real app, this would come from your search API
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'What is PEGA BPM?',
      description: 'Learn the fundamentals of PEGA Business Process Management',
      type: 'tutorial',
      url: '/tutorials/beginner/what-is-pega-bpm',
      category: 'Beginner'
    },
    {
      id: '2',
      title: 'PEGA Installation & Setup',
      description: 'Complete guide to setting up your PEGA development environment',
      type: 'tutorial',
      url: '/tutorials/beginner/installation-setup',
      category: 'Beginner'
    },
    {
      id: '3',
      title: 'CSA Certification Guide',
      description: 'Everything you need to know about PEGA CSA certification',
      type: 'certification',
      url: '/certifications#csa',
      category: 'Certification'
    },
    {
      id: '4',
      title: 'Insurance Claims Processing Project',
      description: 'Build a complete insurance claims processing application',
      type: 'project',
      url: '/projects#insurance-claims',
      category: 'Advanced'
    },
    {
      id: '5',
      title: 'Custom Validation Rules Discussion',
      description: 'Community discussion on implementing custom validation rules',
      type: 'forum',
      url: '/forum/thread/1',
      category: 'Rules & Flows'
    },
    {
      id: '6',
      title: 'PEGA Performance Optimization Tips',
      description: 'Best practices for optimizing PEGA application performance',
      type: 'blog',
      url: '/blog#performance-tips',
      category: 'Performance'
    }
  ];

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filteredResults);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tutorial':
        return '📚';
      case 'blog':
        return '📝';
      case 'forum':
        return '💬';
      case 'project':
        return '🚀';
      case 'certification':
        return '🏆';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tutorial':
        return 'bg-blue-100 text-blue-800';
      case 'blog':
        return 'bg-green-100 text-green-800';
      case 'forum':
        return 'bg-purple-100 text-purple-800';
      case 'project':
        return 'bg-orange-100 text-orange-800';
      case 'certification':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 pt-20">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center p-4 border-b border-gray-200">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search tutorials, projects, forum discussions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 ml-3"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pega-blue mx-auto"></div>
              <p className="text-gray-500 mt-2">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={onClose}
                  className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg">{getTypeIcon(result.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-gray-900">{result.title}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                      {result.category && (
                        <p className="text-xs text-gray-500 mt-1">{result.category}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">
                Try adjusting your search terms or browse our categories.
              </p>
            </div>
          ) : (
            <div className="p-8 text-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Search PegaStack</h3>
              <p className="text-gray-500">
                Find tutorials, projects, forum discussions, and more.
              </p>
            </div>
          )}
        </div>
        
        {query.length >= 2 && results.length > 0 && (
          <div className="border-t border-gray-200 px-4 py-3 bg-gray-50">
            <p className="text-sm text-gray-600">
              Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalSearch;

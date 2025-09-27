import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { CalendarDaysIcon, ClockIcon, TagIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Card from '../components/UI/Card';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'news', 'tutorial', 'certification', 'advanced', 'best-practices'];

  const blogPosts = [
    {
      id: 1,
      title: 'PEGA 24.1 New Features: What You Need to Know',
      excerpt: 'Explore the latest features in PEGA 24.1 including enhanced AI capabilities, improved UX, and new integration options that will revolutionize your development experience.',
      content: 'Detailed content about PEGA 24.1 features...',
      category: 'news',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      author: 'Sarah Johnson',
      tags: ['PEGA 24.1', 'New Features', 'AI', 'Integration'],
      featured: true,
      imageUrl: '/images/blog/pega-24-1.jpg'
    },
    {
      id: 2,
      title: 'Best Practices for PEGA Performance Optimization',
      excerpt: 'Learn proven techniques to optimize your PEGA applications for better performance and user experience. Includes database optimization, rule efficiency, and system tuning.',
      content: 'Comprehensive guide to PEGA performance optimization...',
      category: 'best-practices',
      publishDate: '2024-01-12',
      readTime: '8 min read',
      author: 'Michael Chen',
      tags: ['Performance', 'Optimization', 'Best Practices', 'Database'],
      featured: true,
      imageUrl: '/images/blog/performance-optimization.jpg'
    },
    {
      id: 3,
      title: 'Common CSA Exam Mistakes and How to Avoid Them',
      excerpt: 'Insider tips from certified architects on the most common pitfalls in CSA exam preparation and strategies to ensure success on your first attempt.',
      content: 'Expert advice on CSA exam preparation...',
      category: 'certification',
      publishDate: '2024-01-10',
      readTime: '6 min read',
      author: 'David Rodriguez',
      tags: ['CSA', 'Exam Preparation', 'Certification', 'Study Tips'],
      featured: false,
      imageUrl: '/images/blog/csa-exam.jpg'
    },
    {
      id: 4,
      title: 'Building Microservices with PEGA DX API',
      excerpt: 'Step-by-step guide to implementing microservices architecture using PEGA\'s Digital Experience API for modern enterprise applications.',
      content: 'Complete tutorial on PEGA DX API microservices...',
      category: 'advanced',
      publishDate: '2024-01-08',
      readTime: '12 min read',
      author: 'Lisa Wang',
      tags: ['DX API', 'Microservices', 'Architecture', 'Advanced'],
      featured: false,
      imageUrl: '/images/blog/dx-api-microservices.jpg'
    },
    {
      id: 5,
      title: 'PEGA Case Management vs Traditional Workflow: A Comparison',
      excerpt: 'Understanding the fundamental differences between PEGA\'s case management approach and traditional workflow systems.',
      content: 'Detailed comparison of case management vs workflow...',
      category: 'tutorial',
      publishDate: '2024-01-05',
      readTime: '7 min read',
      author: 'John Smith',
      tags: ['Case Management', 'Workflow', 'Comparison', 'Fundamentals'],
      featured: false,
      imageUrl: '/images/blog/case-vs-workflow.jpg'
    },
    {
      id: 6,
      title: 'Security Best Practices in PEGA Applications',
      excerpt: 'Essential security practices every PEGA developer should implement to protect sensitive data and ensure compliance.',
      content: 'Comprehensive security guide for PEGA applications...',
      category: 'best-practices',
      publishDate: '2024-01-03',
      readTime: '9 min read',
      author: 'Emily Davis',
      tags: ['Security', 'Best Practices', 'Compliance', 'Data Protection'],
      featured: false,
      imageUrl: '/images/blog/security-best-practices.jpg'
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'news': 'bg-blue-100 text-blue-800',
      'tutorial': 'bg-green-100 text-green-800',
      'certification': 'bg-purple-100 text-purple-800',
      'advanced': 'bg-orange-100 text-orange-800',
      'best-practices': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <Head>
        <title>PEGA BPM Blog - Latest News, Tutorials & Insights | PegaStack</title>
        <meta 
          name="description" 
          content="Stay updated with the latest PEGA BPM news, tutorials, best practices, and expert insights. Your go-to resource for PEGA knowledge."
        />
        <meta name="keywords" content="PEGA blog, BPM news, PEGA tutorials, best practices, expert insights" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pega-blue to-pega-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PEGA BPM Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Latest news, tutorials, and expert insights from the PEGA community. 
              Stay ahead with cutting-edge knowledge and best practices.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-lg">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pega-blue focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-pega-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Articles' : category.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Posts */}
      {selectedCategory === 'all' && searchQuery === '' && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Articles</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <Card key={post.id} className={index === 0 ? 'lg:col-span-2' : ''}>
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        <TagIcon className="h-3 w-3 mr-1" />
                        {post.category}
                      </span>
                      <span className="bg-pega-accent text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    </div>
                    
                    <h3 className={`font-bold text-gray-900 mb-3 ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                      <Link href={`/blog/${post.id}`} className="hover:text-pega-blue transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className={`text-gray-600 mb-4 flex-grow ${index === 0 ? 'text-lg' : 'text-base'}`}>
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>By {post.author}</span>
                        <div className="flex items-center">
                          <CalendarDaysIcon className="h-4 w-4 mr-1" />
                          {formatDate(post.publishDate)}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Posts */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory.replace('-', ' ')} Articles`}
            </h2>
            <span className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                      <TagIcon className="h-3 w-3 mr-1" />
                      {post.category}
                    </span>
                    {post.featured && (
                      <span className="bg-pega-accent text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    <Link href={`/blog/${post.id}`} className="hover:text-pega-blue transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-1" />
                      {formatDate(post.publishDate)}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                No articles found matching your search criteria.
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-16 bg-pega-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with PEGA Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest PEGA news, tutorials, and expert tips delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white"
            />
            <button className="bg-pega-accent hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

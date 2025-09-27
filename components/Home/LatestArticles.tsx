import Link from 'next/link';
import { CalendarDaysIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';

const LatestArticles = () => {
  const articles = [
    {
      id: 1,
      title: 'PEGA 24.1 New Features: What You Need to Know',
      excerpt: 'Explore the latest features in PEGA 24.1 including enhanced AI capabilities, improved UX, and new integration options.',
      category: 'News',
      publishDate: '2024-01-15',
      readTime: '5 min read',
      href: '/blog/pega-24-1-new-features',
      featured: true
    },
    {
      id: 2,
      title: 'Best Practices for PEGA Performance Optimization',
      excerpt: 'Learn proven techniques to optimize your PEGA applications for better performance and user experience.',
      category: 'Tutorial',
      publishDate: '2024-01-12',
      readTime: '8 min read',
      href: '/blog/pega-performance-optimization'
    },
    {
      id: 3,
      title: 'Common CSA Exam Mistakes and How to Avoid Them',
      excerpt: 'Insider tips from certified architects on the most common pitfalls in CSA exam preparation.',
      category: 'Certification',
      publishDate: '2024-01-10',
      readTime: '6 min read',
      href: '/blog/csa-exam-mistakes'
    },
    {
      id: 4,
      title: 'Building Microservices with PEGA DX API',
      excerpt: 'Step-by-step guide to implementing microservices architecture using PEGA\'s Digital Experience API.',
      category: 'Advanced',
      publishDate: '2024-01-08',
      readTime: '12 min read',
      href: '/blog/pega-dx-api-microservices'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'News': 'bg-blue-100 text-blue-800',
      'Tutorial': 'bg-green-100 text-green-800',
      'Certification': 'bg-purple-100 text-purple-800',
      'Advanced': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              Stay updated with the latest PEGA trends and insights
            </p>
          </div>
          <Link 
            href="/blog"
            className="hidden md:flex items-center text-pega-blue hover:text-pega-light font-semibold"
          >
            View All Articles
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <Card key={article.id} className={index === 0 ? 'md:col-span-2 lg:col-span-2' : ''}>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="bg-pega-accent text-white px-2 py-1 rounded text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className={`font-bold text-gray-900 mb-3 ${index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
                  <Link href={article.href} className="hover:text-pega-blue transition-colors">
                    {article.title}
                  </Link>
                </h3>
                
                <p className={`text-gray-600 mb-4 flex-grow ${index === 0 ? 'text-base' : 'text-sm'}`}>
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-4 w-4 mr-1" />
                    {formatDate(article.publishDate)}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link 
            href="/blog"
            className="btn-secondary"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestArticles;

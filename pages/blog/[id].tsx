import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { CalendarDaysIcon, ClockIcon, TagIcon, ArrowLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';

const blogPostsData: any = {
  '1': {
    id: 1,
    slug: 'pega-24-1-new-features',
    title: 'PEGA 24.1 New Features: What You Need to Know',
    excerpt: 'Explore the latest features in PEGA 24.1 including enhanced AI capabilities, improved UX, and new integration options.',
    category: 'news',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    author: 'Sarah Johnson',
    tags: ['PEGA 24.1', 'New Features', 'AI', 'Integration'],
    content: `
# PEGA 24.1: Revolutionary Updates

PEGA 24.1 brings significant improvements across the platform. Here are the key highlights:

## Enhanced AI Capabilities
The new version includes advanced AI-powered decision-making tools that help automate complex business processes with greater accuracy.

## Improved User Experience
- Redesigned interface with modern UI components
- Better mobile responsiveness
- Faster loading times
- Enhanced accessibility features

## New Integration Options
PEGA 24.1 introduces seamless integration with popular third-party services and enhanced API capabilities.

## Performance Improvements
Significant optimizations have been made to improve application performance and reduce resource consumption.
    `
  },
  '2': {
    id: 2,
    slug: 'pega-performance-optimization',
    title: 'Best Practices for PEGA Performance Optimization',
    excerpt: 'Learn proven techniques to optimize your PEGA applications for better performance and user experience.',
    category: 'best-practices',
    publishDate: '2024-01-12',
    readTime: '8 min read',
    author: 'Michael Chen',
    tags: ['Performance', 'Optimization', 'Best Practices', 'Database'],
    content: `
# PEGA Performance Optimization Guide

Optimizing PEGA applications is crucial for delivering excellent user experience. Follow these best practices:

## Database Optimization
- Use declare expressions instead of activities where possible
- Minimize database calls
- Implement proper indexing strategies
- Use report definitions efficiently

## Rule Efficiency
- Keep decision tables simple and organized
- Use declarative rules over procedural
- Avoid unnecessary rule executions
- Implement proper caching strategies

## System Tuning
- Configure appropriate JVM settings
- Monitor memory usage
- Optimize requestor pool settings
- Use performance profiler tools

## Best Practices
1. Always test performance in production-like environments
2. Use PAL (PEGA Alerting and Logging) for monitoring
3. Implement proper error handling
4. Regular code reviews and optimization
    `
  },
  '3': {
    id: 3,
    slug: 'csa-exam-mistakes',
    title: 'Common CSA Exam Mistakes and How to Avoid Them',
    excerpt: 'Insider tips from certified architects on the most common pitfalls in CSA exam preparation.',
    category: 'certification',
    publishDate: '2024-01-10',
    readTime: '6 min read',
    author: 'David Rodriguez',
    tags: ['CSA', 'Exam Preparation', 'Certification', 'Study Tips'],
    content: `
# Common CSA Exam Mistakes

Based on feedback from hundreds of test-takers, here are the most common mistakes:

## 1. Insufficient Hands-on Practice
Many candidates focus too much on theory and not enough on practical application building.

**Solution**: Build at least 3-5 complete applications before attempting the exam.

## 2. Ignoring Case Management Fundamentals
The exam heavily tests case management concepts, which many candidates overlook.

**Solution**: Master case types, stages, processes, and steps thoroughly.

## 3. Poor Time Management
Running out of time is a common issue during the exam.

**Solution**: Practice with timed mock tests and learn to pace yourself.

## 4. Not Understanding the Question
Misreading questions leads to incorrect answers.

**Solution**: Read each question carefully, twice if needed.

## 5. Skipping Practice Tests
Many fail to gauge their readiness through practice exams.

**Solution**: Take multiple practice tests and review all incorrect answers.
    `
  },
  '4': {
    id: 4,
    slug: 'pega-dx-api-microservices',
    title: 'Building Microservices with PEGA DX API',
    excerpt: 'Step-by-step guide to implementing microservices architecture using PEGA\'s Digital Experience API.',
    category: 'advanced',
    publishDate: '2024-01-08',
    readTime: '12 min read',
    author: 'Lisa Wang',
    tags: ['DX API', 'Microservices', 'Architecture', 'Advanced'],
    content: `
# Building Microservices with PEGA DX API

Modern applications require flexible, scalable architectures. PEGA DX API enables microservices patterns.

## What is PEGA DX API?
The Digital Experience (DX) API provides RESTful endpoints to interact with PEGA applications from external systems.

## Architecture Benefits
- Decoupled frontend and backend
- Independent scaling
- Technology flexibility
- Easier testing and deployment

## Implementation Steps

### 1. Configure API Authentication
Set up OAuth 2.0 authentication for secure API access.

### 2. Design API Endpoints
Create RESTful endpoints for your use cases:
- GET /cases - List cases
- POST /cases - Create new case
- PUT /cases/{id} - Update case
- DELETE /cases/{id} - Delete case

### 3. Implement Frontend
Build your frontend using modern frameworks (React, Vue, Angular) consuming the DX API.

### 4. Handle Data Mapping
Map PEGA data structures to your API responses appropriately.

## Best Practices
- Use proper versioning for APIs
- Implement comprehensive error handling
- Add request/response logging
- Monitor API performance
- Implement rate limiting
    `
  }
};

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;
  
  const post = id ? blogPostsData[id as string] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: any = {
      'news': 'bg-blue-100 text-blue-800',
      'tutorial': 'bg-green-100 text-green-800',
      'certification': 'bg-purple-100 text-purple-800',
      'advanced': 'bg-orange-100 text-orange-800',
      'best-practices': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const relatedPosts = Object.values(blogPostsData)
    .filter((p: any) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Head>
        <title>{post.title} | PegaStack Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
      </Head>

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center text-pega-blue hover:text-pega-light">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)} mb-4`}>
              <TagIcon className="h-4 w-4 mr-1" />
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <UserCircleIcon className="h-5 w-5 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <CalendarDaysIcon className="h-5 w-5 mr-2" />
                {formatDate(post.publishDate)}
              </div>
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag: string) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </div>

          {/* Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Share this article</h3>
            <div className="flex gap-4">
              <button className="btn-secondary text-sm">Share on Twitter</button>
              <button className="btn-secondary text-sm">Share on LinkedIn</button>
              <button className="btn-secondary text-sm">Copy Link</button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost: any) => (
                <Card key={relatedPost.id}>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedPost.category)} mb-3`}>
                    {relatedPost.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    <Link href={`/blog/${relatedPost.id}`} className="hover:text-pega-blue transition-colors">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedPost.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-1" />
                      {formatDate(relatedPost.publishDate)}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {relatedPost.readTime}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="py-16 bg-pega-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Continue Learning
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Explore our comprehensive tutorials and certification guides
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutorials" className="bg-white text-pega-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse Tutorials
            </Link>
            <Link href="/certifications" className="bg-pega-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Certification Prep
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Sidebar from '../../components/Tutorial/Sidebar';
import { buildStaticPaths, getNextLesson, getPrevLesson, formatTitle } from '../../lib/lessons';

interface TutorialPageProps {
  tutorial: {
    level: string;
    lesson: string;
    title: string;
    content: string;
    progress: number;
    nextLesson?: {
      title: string;
      slug: string;
    } | null;
    prevLesson?: {
      title: string;
      slug: string;
    } | null;
  };
}

interface SidebarSection {
  title: string;
  slug: string;
  progress: number;
  lessons: {
    title: string;
    slug: string;
    completed: boolean;
    current?: boolean;
  }[];
}

const TutorialPage = ({ tutorial }: TutorialPageProps) => {
  const sidebarSections: SidebarSection[] = [
    {
      title: 'Beginner',
      slug: 'beginner',
      progress: 0,
      lessons: [
        { title: 'What is PEGA BPM?', slug: 'what-is-pega-bpm', completed: false, current: tutorial.lesson === 'what-is-pega-bpm' },
        { title: 'PRPC Overview', slug: 'prpc-overview', completed: false, current: tutorial.lesson === 'prpc-overview' },
        { title: 'Installation & Setup', slug: 'installation-setup', completed: false, current: tutorial.lesson === 'installation-setup' },
        { title: 'App Studio vs Dev Studio', slug: 'app-vs-dev-studio', completed: false, current: tutorial.lesson === 'app-vs-dev-studio' },
        { title: 'Case Types and Stages', slug: 'case-types-stages', completed: false, current: tutorial.lesson === 'case-types-stages' },
        { title: 'Data Modeling Basics', slug: 'data-modeling', completed: false, current: tutorial.lesson === 'data-modeling' },
        { title: 'UI Design Fundamentals', slug: 'ui-design-fundamentals', completed: false, current: tutorial.lesson === 'ui-design-fundamentals' },
        { title: 'Your First Case App', slug: 'first-case-app', completed: false, current: tutorial.lesson === 'first-case-app' },
        { title: 'Basic Validations', slug: 'basic-validations', completed: false, current: tutorial.lesson === 'basic-validations' },
        { title: 'Simple Reporting', slug: 'simple-reporting', completed: false, current: tutorial.lesson === 'simple-reporting' },
        { title: 'Testing Your App', slug: 'testing-your-app', completed: false, current: tutorial.lesson === 'testing-your-app' },
        { title: 'Deployment Basics', slug: 'deployment-basics', completed: false, current: tutorial.lesson === 'deployment-basics' },
      ]
    },
    {
      title: 'Intermediate',
      slug: 'intermediate',
      progress: 25,
      lessons: [
        { title: 'Rules & Rule Resolution', slug: 'rules-resolution', completed: false, current: tutorial.lesson === 'rules-resolution' },
        { title: 'Declarative Rules', slug: 'declarative-rules', completed: false, current: tutorial.lesson === 'declarative-rules' },
        { title: 'Data Pages & Sources', slug: 'data-pages-sources', completed: false, current: tutorial.lesson === 'data-pages-sources' },
        { title: 'Integration Basics', slug: 'integration-basics', completed: false, current: tutorial.lesson === 'integration-basics' },
        { title: 'Advanced Data Modeling', slug: 'advanced-data-modeling', completed: false, current: tutorial.lesson === 'advanced-data-modeling' },
        { title: 'Flow Rules & Actions', slug: 'flow-rules-actions', completed: false, current: tutorial.lesson === 'flow-rules-actions' },
        { title: 'UI Advanced Concepts', slug: 'user-interface-advanced-concepts', completed: false, current: tutorial.lesson === 'user-interface-advanced-concepts' },
        { title: 'Security & Access Control', slug: 'security-access-control', completed: false, current: tutorial.lesson === 'security-access-control' },
        { title: 'Case Management Advanced', slug: 'case-management-advanced', completed: false, current: tutorial.lesson === 'case-management-advanced' },
        { title: 'Performance Optimization', slug: 'performance-optimization', completed: false, current: tutorial.lesson === 'performance-optimization' },
        { title: 'Reporting & Analytics', slug: 'reporting-analytics', completed: false, current: tutorial.lesson === 'reporting-analytics' },
        { title: 'Decisioning & NBA', slug: 'decisioning-next-best-action', completed: false, current: tutorial.lesson === 'decisioning-next-best-action' },
        { title: 'Testing & Debugging', slug: 'testing-debugging', completed: false, current: tutorial.lesson === 'testing-debugging' },
        { title: 'Background Processing', slug: 'background-processing', completed: false, current: tutorial.lesson === 'background-processing' },
        { title: 'Mobile & Offline Apps', slug: 'mobile-offline-apps', completed: false, current: tutorial.lesson === 'mobile-offline-apps' },
        { title: 'DevOps & Deployment', slug: 'devops-deployment-pipelines', completed: false, current: tutorial.lesson === 'devops-deployment-pipelines' },
        { title: 'Localization & Globalization', slug: 'localization-globalization', completed: false, current: tutorial.lesson === 'localization-globalization' },
        { title: 'Governance & CoE', slug: 'governance-center-excellence', completed: false, current: tutorial.lesson === 'governance-center-excellence' },
      ]
    },
    {
      title: 'Advanced',
      slug: 'advanced',
      progress: 0,
      lessons: [
        { title: 'Enterprise Architecture Patterns', slug: 'enterprise-architecture-patterns', completed: false, current: tutorial.lesson === 'enterprise-architecture-patterns' },
        { title: 'Advanced Performance Tuning', slug: 'advanced-performance-tuning', completed: false, current: tutorial.lesson === 'advanced-performance-tuning' },
        { title: 'Database Trace Analysis', slug: 'database-trace-analysis', completed: false, current: tutorial.lesson === 'database-trace-analysis' },
        { title: 'Circumstancing & Specialization', slug: 'circumstancing-specialization', completed: false, current: tutorial.lesson === 'circumstancing-specialization' },
        { title: 'Product Rules & Deployment', slug: 'product-rules-deployment', completed: false, current: tutorial.lesson === 'product-rules-deployment' },
        { title: 'Deployment Manager', slug: 'deployment-manager', completed: false, current: tutorial.lesson === 'deployment-manager' },
        { title: 'PEGA DevOps & CI/CD', slug: 'pega-devops-cicd', completed: false, current: tutorial.lesson === 'pega-devops-cicd' },
        { title: 'PAL Performance Alerts', slug: 'pal-performance-alerts', completed: false, current: tutorial.lesson === 'pal-performance-alerts' },
        { title: 'Production Support Strategies', slug: 'production-support-strategies', completed: false, current: tutorial.lesson === 'production-support-strategies' },
        { title: 'Advanced Integration Patterns', slug: 'advanced-integration-patterns', completed: false, current: tutorial.lesson === 'advanced-integration-patterns' },
        { title: 'Microservices with PEGA', slug: 'microservices-pega', completed: false, current: tutorial.lesson === 'microservices-pega' },
        { title: 'Advanced Security Patterns', slug: 'advanced-security-patterns', completed: false, current: tutorial.lesson === 'advanced-security-patterns' },
        { title: 'PEGA Platform APIs', slug: 'pega-platform-apis', completed: false, current: tutorial.lesson === 'pega-platform-apis' },
        { title: 'Advanced Testing Strategies', slug: 'advanced-testing-strategies', completed: false, current: tutorial.lesson === 'advanced-testing-strategies' },
        { title: 'Cloud-Native PEGA', slug: 'cloud-native-pega', completed: false, current: tutorial.lesson === 'cloud-native-pega' },
        { title: 'PEGA Constellation UI', slug: 'pega-constellation-ui', completed: false, current: tutorial.lesson === 'pega-constellation-ui' },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>{tutorial.title} - PegaStack Tutorial</title>
        <meta name="description" content={`Learn ${tutorial.title} in this comprehensive PEGA tutorial.`} />
      </Head>

      <div className="lg:flex">
        <div className="hidden lg:block">
          <Sidebar sections={sidebarSections} currentSlug={tutorial.lesson} />
        </div>
        
        <div className="flex-1 max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 sm:mb-10">
            <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
              <Link href="/tutorials" className="hover:text-pega-blue transition-colors">
                Tutorials
              </Link>
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <span className="capitalize text-pega-blue font-medium">{tutorial.level}</span>
              <span className="mx-1 sm:mx-2 text-gray-400">/</span>
              <span className="text-gray-900 font-medium break-words">{tutorial.title}</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              {tutorial.title}
            </h1>
            
            {/* Progress indicator */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-pega-blue rounded-full mr-2"></div>
                <span className="capitalize font-medium">{tutorial.level} Level</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>Interactive Quiz Available</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-blue max-w-none mb-16">
            <div 
              className="tutorial-content space-y-8"
              dangerouslySetInnerHTML={{ __html: tutorial.content }} 
            />
          </div>

          {/* Quiz Button */}
          <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Test Your Knowledge</h3>
                <p className="text-gray-600">Take the interactive quiz to reinforce what you've learned in this lesson.</p>
              </div>
              <Link
                href={`/quiz/${tutorial.level}/${tutorial.lesson}`}
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-semibold rounded-lg text-white bg-pega-blue hover:bg-pega-dark transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pega-blue shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Take Quiz
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-10 border-t border-gray-200 space-y-4 sm:space-y-0">
            <div className="w-full sm:w-auto">
              {tutorial.prevLesson ? (
                <Link
                  href={tutorial.prevLesson.slug}
                  className="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto justify-center sm:justify-start"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-3" />
                  <div className="text-left">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Previous</div>
                    <div className="font-medium">{tutorial.prevLesson.title}</div>
                  </div>
                </Link>
              ) : (
                <div className="w-full sm:w-48"></div>
              )}
            </div>
            
            <div className="w-full sm:w-auto">
              {tutorial.nextLesson ? (
                <Link
                  href={tutorial.nextLesson.slug}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-pega-blue hover:bg-pega-dark transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto justify-center sm:justify-end"
                >
                  <div className="text-right">
                    <div className="text-xs text-blue-100 uppercase tracking-wide">Next</div>
                    <div className="font-medium">{tutorial.nextLesson.title}</div>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 ml-3" />
                </Link>
              ) : (
                <div className="w-full sm:w-48"></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = buildStaticPaths();
  
  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[];
  const level = slug?.[0];
  const lesson = slug?.[1];

  if (!level) {
    return {
      notFound: true
    };
  }

  // If no lesson specified, redirect to first lesson of the track
  if (!lesson) {
    const { lessonOrder } = require('../../lib/lessons');
    const firstLesson = lessonOrder[level]?.[0];
    
    if (firstLesson) {
      return {
        redirect: {
          destination: `/tutorials/${level}/${firstLesson}`,
          permanent: false
        }
      };
    } else {
      return {
        notFound: true
      };
    }
  }

  // Load tutorial content from JSON file
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'tutorials', level, `${lesson}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const tutorialData = JSON.parse(fileContent);
    
    // Convert JSON content to HTML string for rendering
    let contentHtml = '';
    
    // Handle introduction if it exists
    if (tutorialData.content && tutorialData.content.introduction) {
      contentHtml += `<h2>${tutorialData.content.introduction.title}</h2>`;
      contentHtml += `<p>${tutorialData.content.introduction.text}</p>`;
    }
    
    // Handle sections structure (new format)
    if (tutorialData.content && tutorialData.content.sections) {
      tutorialData.content.sections.forEach((section: any) => {
        contentHtml += `<h3>${section.title}</h3>`;
        contentHtml += `<p>${section.content}</p>`;
        
        if (section.key_points) {
          contentHtml += '<ul>';
          section.key_points.forEach((point: string) => {
            contentHtml += `<li>${point}</li>`;
          });
          contentHtml += '</ul>';
        }
        
        if (section.subsections) {
          section.subsections.forEach((subsection: any) => {
            contentHtml += `<h4>${subsection.title}</h4>`;
            contentHtml += `<p>${subsection.content}</p>`;
            
            if (subsection.benefits) {
              contentHtml += '<ul>';
              subsection.benefits.forEach((benefit: string) => {
                contentHtml += `<li>${benefit}</li>`;
              });
              contentHtml += '</ul>';
            }
          });
        }
      });
    }
    
    // Handle direct sections structure (advanced format)
    if (tutorialData.sections) {
      tutorialData.sections.forEach((section: any) => {
        contentHtml += `<h3>${section.title}</h3>`;
        
        if (section.content) {
          section.content.forEach((content: any) => {
            if (content.type === 'text') {
              contentHtml += `<p>${content.data}</p>`;
            } else if (content.type === 'code') {
              contentHtml += `<pre><code class="language-${content.language || 'text'}">${content.data}</code></pre>`;
            }
          });
        }
      });
    }
    
    return {
      props: {
        tutorial: {
          level,
          lesson,
          title: tutorialData.title,
          content: contentHtml,
          progress: 0, // Will be dynamic with user progress tracking
          nextLesson: getNextLesson(level, lesson),
          prevLesson: getPrevLesson(level, lesson)
        }
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Error loading tutorial:', error);
    // Fallback to legacy inline data for lessons not yet migrated
    const legacyTutorialData = {
      beginner: {
        'what-is-pega-bpm': {
          title: 'What is PEGA BPM?',
          content: `
            <h2>Introduction to PEGA BPM</h2>
            <p>PEGA Business Process Management (BPM) is a comprehensive platform that enables organizations to design, execute, monitor, and optimize business processes. It combines case management capabilities with traditional workflow management to create powerful business applications.</p>
            
            <h3>Key Features</h3>
            <ul>
              <li><strong>Case Management:</strong> Handle complex, knowledge-intensive processes</li>
              <li><strong>Business Rules:</strong> Define and manage business logic declaratively</li>
              <li><strong>Integration:</strong> Connect with existing systems and services</li>
              <li><strong>Reporting:</strong> Built-in analytics and reporting capabilities</li>
            </ul>

            <h3>Why Choose PEGA?</h3>
            <p>PEGA stands out from other BPM platforms because of its low-code approach, making it accessible to both business users and developers. The platform emphasizes reusability, maintainability, and rapid application development.</p>
          `,
          progress: 25
        },
        'prpc-overview': {
          title: 'PRPC Overview',
          content: `
            <h2>PEGA Rules Process Commander (PRPC)</h2>
            <p>PRPC is the foundation of the PEGA platform. It provides the runtime environment and development tools for building PEGA applications.</p>
            
            <h3>Architecture Overview</h3>
            <p>PRPC follows a multi-tier architecture:</p>
            <ul>
              <li><strong>Presentation Tier:</strong> User interfaces and portals</li>
              <li><strong>Business Logic Tier:</strong> Rules and process definitions</li>
              <li><strong>Data Tier:</strong> Database and external system connections</li>
            </ul>
          `,
          progress: 50
        }
      }
    };

    const levelData = legacyTutorialData[level as keyof typeof legacyTutorialData];
    const tutorialContent = levelData && lesson in levelData ? levelData[lesson as keyof typeof levelData] : undefined;

    if (!tutorialContent) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        tutorial: {
          level,
          lesson,
          title: tutorialContent.title,
          content: tutorialContent.content,
          progress: tutorialContent.progress,
          nextLesson: getNextLesson(level, lesson),
          prevLesson: getPrevLesson(level, lesson)
        }
      },
      revalidate: 60
    };
  }
};

export default TutorialPage;

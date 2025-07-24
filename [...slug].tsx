import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Sidebar from '../../components/Tutorial/Sidebar';

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
      progress: 75,
      lessons: [
        { title: 'What is PEGA BPM?', slug: 'what-is-pega-bpm', completed: true },
        { title: 'PRPC Overview', slug: 'prpc-overview', completed: true },
        { title: 'Installation & Setup', slug: 'installation-setup', completed: true },
        { title: 'App Studio vs Dev Studio', slug: 'app-vs-dev-studio', completed: true },
        { title: 'Your First Case App', slug: 'first-case-app', completed: true },
        { title: 'Data Modeling Basics', slug: 'data-modeling', completed: false, current: tutorial.lesson === 'data-modeling' },
        { title: 'User Interface Basics', slug: 'user-interface-basics', completed: false, current: tutorial.lesson === 'user-interface-basics' },
        { title: 'Case Lifecycle Management', slug: 'case-lifecycle', completed: false, current: tutorial.lesson === 'case-lifecycle' },
      ]
    },
    {
      title: 'Intermediate',
      slug: 'intermediate',
      progress: 25,
      lessons: [
        { title: 'Rules & Rule Resolution', slug: 'rules-resolution', completed: false, current: tutorial.lesson === 'rules-resolution' },
        { title: 'Flow Rules & Actions', slug: 'flow-rules-actions', completed: false, current: tutorial.lesson === 'flow-rules-actions' },
        { title: 'Declarative Rules', slug: 'declarative-rules', completed: false, current: tutorial.lesson === 'declarative-rules' },
        { title: 'Integration Basics', slug: 'integration-basics', completed: false, current: tutorial.lesson === 'integration-basics' },
      ]
    },
    {
      title: 'Advanced',
      slug: 'advanced',
      progress: 0,
      lessons: [
        { title: 'Performance Tuning', slug: 'performance-tuning', completed: false, current: tutorial.lesson === 'performance-tuning' },
        { title: 'PEGA DevOps', slug: 'pega-devops', completed: false, current: tutorial.lesson === 'pega-devops' },
        { title: 'Custom Components', slug: 'custom-components', completed: false, current: tutorial.lesson === 'custom-components' },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>{tutorial.title} - PegaStack Tutorial</title>
        <meta name="description" content={`Learn ${tutorial.title} in this comprehensive PEGA tutorial.`} />
      </Head>

      <div className="flex">
        <Sidebar sections={sidebarSections} currentSlug={tutorial.lesson} />
        
        <div className="flex-1 max-w-4xl mx-auto px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <Link href="/tutorials" className="hover:text-pega-blue">
                Tutorials
              </Link>
              <span className="mx-2">/</span>
              <span className="capitalize">{tutorial.level}</span>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{tutorial.title}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {tutorial.title}
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: tutorial.content }} />
          </div>

          {/* Quiz Button */}
          <div className="mb-8">
            <Link
              href={`/quiz/${tutorial.level}/${tutorial.lesson}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pega-blue hover:bg-pega-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pega-blue"
            >
              Take Quiz
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <div>
              {tutorial.prevLesson && (
                <Link
                  href={tutorial.prevLesson.slug}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  {tutorial.prevLesson.title}
                </Link>
              )}
            </div>
            
            <div>
              {tutorial.nextLesson && (
                <Link
                  href={tutorial.nextLesson.slug}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pega-blue hover:bg-pega-dark"
                >
                  {tutorial.nextLesson.title}
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // All tutorial paths
  const paths = [
    // Beginner lessons
    { params: { slug: ['beginner', 'what-is-pega-bpm'] } },
    { params: { slug: ['beginner', 'prpc-overview'] } },
    { params: { slug: ['beginner', 'installation-setup'] } },
    { params: { slug: ['beginner', 'app-vs-dev-studio'] } },
    { params: { slug: ['beginner', 'first-case-app'] } },
    { params: { slug: ['beginner', 'data-modeling'] } },
    { params: { slug: ['beginner', 'user-interface-basics'] } },
    { params: { slug: ['beginner', 'case-lifecycle'] } },
    // Intermediate lessons
    { params: { slug: ['intermediate', 'rules-resolution'] } },
    { params: { slug: ['intermediate', 'flow-rules-actions'] } },
    { params: { slug: ['intermediate', 'declarative-rules'] } },
    { params: { slug: ['intermediate', 'integration-basics'] } },
    // Advanced lessons
    { params: { slug: ['advanced', 'performance-tuning'] } },
    { params: { slug: ['advanced', 'pega-devops'] } },
    { params: { slug: ['advanced', 'custom-components'] } },
  ];

  return {
    paths,
    fallback: 'blocking'
  };
};

// Helper functions for navigation
function getNextLesson(level: string, lesson: string): { title: string; slug: string } | null {
  const lessonOrder = {
    beginner: ['what-is-pega-bpm', 'prpc-overview', 'installation-setup', 'app-vs-dev-studio', 'first-case-app', 'data-modeling', 'user-interface-basics', 'case-lifecycle'],
    intermediate: ['rules-resolution', 'flow-rules-actions', 'declarative-rules', 'integration-basics'],
    advanced: ['performance-tuning', 'pega-devops', 'custom-components']
  };
  
  const currentLessons = lessonOrder[level as keyof typeof lessonOrder];
  if (!currentLessons) return null;
  
  const currentIndex = currentLessons.indexOf(lesson);
  if (currentIndex === -1 || currentIndex === currentLessons.length - 1) {
    // Check if we can move to next level
    if (level === 'beginner') {
      return { title: 'Rules & Rule Resolution', slug: '/tutorials/intermediate/rules-resolution' };
    } else if (level === 'intermediate') {
      return { title: 'Performance Tuning', slug: '/tutorials/advanced/performance-tuning' };
    }
    return null;
  }
  
  const nextLesson = currentLessons[currentIndex + 1];
  return { title: formatTitle(nextLesson), slug: `/tutorials/${level}/${nextLesson}` };
}

function getPreviousLesson(level: string, lesson: string): { title: string; slug: string } | null {
  const lessonOrder = {
    beginner: ['what-is-pega-bpm', 'prpc-overview', 'installation-setup', 'app-vs-dev-studio', 'first-case-app', 'data-modeling', 'user-interface-basics', 'case-lifecycle'],
    intermediate: ['rules-resolution', 'flow-rules-actions', 'declarative-rules', 'integration-basics'],
    advanced: ['performance-tuning', 'pega-devops', 'custom-components']
  };
  
  const currentLessons = lessonOrder[level as keyof typeof lessonOrder];
  if (!currentLessons) return null;
  
  const currentIndex = currentLessons.indexOf(lesson);
  if (currentIndex <= 0) {
    // Check if we can move to previous level
    if (level === 'intermediate') {
      return { title: 'Case Lifecycle Management', slug: '/tutorials/beginner/case-lifecycle' };
    } else if (level === 'advanced') {
      return { title: 'Integration Basics', slug: '/tutorials/intermediate/integration-basics' };
    }
    return null;
  }
  
  const prevLesson = currentLessons[currentIndex - 1];
  return { title: formatTitle(prevLesson), slug: `/tutorials/${level}/${prevLesson}` };
}

function formatTitle(slug: string): string {
  return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[];
  const level = slug?.[0];
  const lesson = slug?.[1];

  if (!level || !lesson) {
    return {
      notFound: true
    };
  }

  // Load tutorial content from JSON file
  const fs = require('fs');
  const path = require('path');
  
  try {
    const filePath = path.join(process.cwd(), 'data', 'tutorials', level, `${lesson}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const tutorialData = JSON.parse(fileContent);
    
    // Convert JSON content to HTML string for rendering
    let contentHtml = `<h2>${tutorialData.content.introduction.title}</h2>`;
    contentHtml += `<p>${tutorialData.content.introduction.text}</p>`;
    
    // Add sections
    if (tutorialData.content.sections) {
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
            
            if (subsection.types) {
              contentHtml += '<ul>';
              subsection.types.forEach((type: any) => {
                contentHtml += `<li><strong>${type.name}:</strong> ${type.description}`;
                if (type.example) contentHtml += ` (e.g., ${type.example})`;
                contentHtml += '</li>';
              });
              contentHtml += '</ul>';
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
          prevLesson: getPreviousLesson(level, lesson)
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
          prevLesson: getPreviousLesson(level, lesson)
        }
      },
      revalidate: 60
    };
  }
};

export default TutorialPage;

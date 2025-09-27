import Head from 'next/head';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  CogIcon, 
  RocketLaunchIcon,
  ClockIcon,
  BookOpenIcon 
} from '@heroicons/react/24/outline';
import Card from '../components/UI/Card';
import ProgressBar from '../components/UI/ProgressBar';

export default function Tutorials() {
  const tutorialTracks = [
    {
      id: 'beginner',
      title: 'Beginner Track',
      description: 'Perfect for those new to PEGA BPM. Learn the fundamentals and build your first application.',
      icon: AcademicCapIcon,
      color: 'from-green-400 to-green-600',
      progress: 0,
      totalLessons: 12,
      estimatedTime: '4-6 weeks',
      lessons: [
        { title: 'What is PEGA BPM?', slug: 'what-is-pega-bpm', completed: false },
        { title: 'PRPC Overview', slug: 'prpc-overview', completed: false },
        { title: 'Installation & Setup', slug: 'installation-setup', completed: false },
        { title: 'App Studio vs Dev Studio', slug: 'app-vs-dev-studio', completed: false },
        { title: 'Case Types and Stages', slug: 'case-types-stages', completed: false },
        { title: 'Data Modeling Basics', slug: 'data-modeling', completed: false },
        { title: 'UI Design Fundamentals', slug: 'ui-design-fundamentals', completed: false },
        { title: 'Your First Case App', slug: 'first-case-app', completed: false },
        { title: 'Basic Validations', slug: 'basic-validations', completed: false },
        { title: 'Simple Reporting', slug: 'simple-reporting', completed: false },
        { title: 'Testing Your App', slug: 'testing-your-app', completed: false },
        { title: 'Deployment Basics', slug: 'deployment-basics', completed: false },
      ]
    },
    {
      id: 'intermediate',
      title: 'Intermediate Track',
      description: 'Build on your foundation with advanced concepts, integrations, and complex business rules.',
      icon: CogIcon,
      color: 'from-blue-400 to-blue-600',
      progress: 0,
      totalLessons: 18,
      estimatedTime: '6-8 weeks',
      lessons: [
        { title: 'Rules & Rule Resolution', slug: 'rules-resolution', completed: false },
        { title: 'Declarative Rules', slug: 'declarative-rules', completed: false },
        { title: 'Data Pages & Data Sources', slug: 'data-pages-sources', completed: false },
        { title: 'Integration Basics', slug: 'integration-basics', completed: false },
        { title: 'Advanced Data Modeling', slug: 'advanced-data-modeling', completed: false },
        { title: 'Flow Rules & Flow Actions', slug: 'flow-rules-actions', completed: false },
        { title: 'User Interface Advanced Concepts', slug: 'user-interface-advanced-concepts', completed: false },
        { title: 'Security & Access Control', slug: 'security-access-control', completed: false },
        { title: 'Case Management Advanced', slug: 'case-management-advanced', completed: false },
        { title: 'Performance Optimization', slug: 'performance-optimization', completed: false },
        { title: 'Reporting & Analytics', slug: 'reporting-analytics', completed: false },
        { title: 'Decisioning & Next-Best-Action', slug: 'decisioning-next-best-action', completed: false },
        { title: 'Testing & Debugging', slug: 'testing-debugging', completed: false },
        { title: 'Background Processing', slug: 'background-processing', completed: false },
        { title: 'Mobile & Offline Apps', slug: 'mobile-offline-apps', completed: false },
        { title: 'DevOps & Deployment Pipelines', slug: 'devops-deployment-pipelines', completed: false },
        { title: 'Localization & Globalization', slug: 'localization-globalization', completed: false },
        { title: 'Governance & Center of Excellence', slug: 'governance-center-excellence', completed: false },
      ]
    },
    {
      id: 'advanced',
      title: 'Advanced Track',
      description: 'Master enterprise-level concepts, performance optimization, and architectural patterns.',
      icon: RocketLaunchIcon,
      color: 'from-purple-400 to-purple-600',
      progress: 0,
      totalLessons: 15,
      estimatedTime: '8-10 weeks',
      lessons: [
        { title: 'Circumstancing & Specialization', slug: 'circumstancing-specialization', completed: false },
        { title: 'Advanced Performance Tuning', slug: 'advanced-performance-tuning', completed: false },
        { title: 'PAL & Performance Alerts', slug: 'pal-performance-alerts', completed: false },
        { title: 'Database Trace Analysis', slug: 'database-trace-analysis', completed: false },
        { title: 'Product Rules & Deployment', slug: 'product-rules-deployment', completed: false },
        { title: 'PEGA DevOps & CI/CD', slug: 'pega-devops-cicd', completed: false },
        { title: 'Deployment Manager', slug: 'deployment-manager', completed: false },
        { title: 'Circumstancing & Specialization', slug: 'circumstancing-specialization', completed: false },
        { title: 'Production Support Strategies', slug: 'production-support-strategies', completed: false },
        { title: 'Advanced Integration Patterns', slug: 'advanced-integration-patterns', completed: false },
        { title: 'Microservices with PEGA', slug: 'microservices-pega', completed: false },
        { title: 'Advanced Security Patterns', slug: 'advanced-security-patterns', completed: false },
        { title: 'PEGA Platform APIs', slug: 'pega-platform-apis', completed: false },
        { title: 'Advanced Testing Strategies', slug: 'advanced-testing-strategies', completed: false },
        { title: 'Cloud-Native PEGA', slug: 'cloud-native-pega', completed: false },
        { title: 'PEGA Constellation UI', slug: 'pega-constellation-ui', completed: false },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>PEGA BPM Tutorials - Beginner to Advanced | PegaStack</title>
        <meta 
          name="description" 
          content="Comprehensive PEGA BPM tutorials from beginner to advanced level. Learn case management, integrations, and enterprise architecture."
        />
        <meta name="keywords" content="PEGA tutorials, BPM learning, case management, PEGA training" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pega-blue to-pega-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              PEGA BPM Tutorials
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Master PEGA BPM with our comprehensive tutorial tracks. 
              From absolute beginner to enterprise architect.
            </p>
          </div>
        </div>
      </div>

      {/* Tutorial Tracks */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {tutorialTracks.map((track) => {
              const IconComponent = track.icon;
              return (
                <Card key={track.id} className="overflow-hidden">
                  <div className="md:flex">
                    {/* Track Info */}
                    <div className="md:w-1/3 p-8">
                      <div className={`w-20 h-20 bg-gradient-to-r ${track.color} rounded-full flex items-center justify-center mb-6`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {track.title}
                      </h2>
                      
                      <p className="text-gray-600 mb-6">
                        {track.description}
                      </p>
                      
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center text-gray-600">
                          <BookOpenIcon className="h-5 w-5 mr-3" />
                          <span>{track.totalLessons} Lessons</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <ClockIcon className="h-5 w-5 mr-3" />
                          <span>{track.estimatedTime}</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm text-gray-600">{track.progress}%</span>
                        </div>
                        <ProgressBar progress={track.progress} />
                      </div>
                      
                      <Link 
                        href={`/tutorials/${track.id}`}
                        className="btn-primary w-full block text-center"
                      >
                        {track.progress > 0 ? 'Continue Learning' : 'Start Track'}
                      </Link>
                    </div>

                    {/* Lessons List */}
                    <div className="md:w-2/3 bg-gray-50 p-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Lessons in this track:
                      </h3>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                        {track.lessons.map((lesson, index) => (
                          <Link
                            key={lesson.slug}
                            href={`/tutorials/${track.id}/${lesson.slug}`}
                            className="flex items-center p-3 bg-white rounded-lg hover:shadow-md transition-shadow group"
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                              lesson.completed 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-gray-100 text-gray-600 group-hover:bg-pega-blue group-hover:text-white'
                            }`}>
                              {lesson.completed ? '✓' : index + 1}
                            </div>
                            <span className="text-gray-700 group-hover:text-pega-blue transition-colors">
                              {lesson.title}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

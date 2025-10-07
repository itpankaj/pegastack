import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { 
  AcademicCapIcon, 
  DocumentTextIcon, 
  QuestionMarkCircleIcon,
  LightBulbIcon,
  PlayIcon,
  ArrowLeftIcon 
} from '@heroicons/react/24/outline';
import Card from '../../components/UI/Card';
import ProgressBar from '../../components/UI/ProgressBar';

interface CertificationData {
  id: string;
  name: string;
  fullName: string;
  description: string;
  syllabus: string[];
  sampleQuestions: {
    question: string;
    options: string[];
    correct: number;
  }[];
  studyTips: string[];
  examInfo: {
    duration: string;
    questions: number;
    passingScore: string;
    cost: string;
  };
  resources: {
    title: string;
    type: string;
    link: string;
  }[];
  prerequisites: string[];
}

const certificationData: { [key: string]: CertificationData } = {
  csa: {
    id: 'csa',
    name: 'CSA',
    fullName: 'Certified System Architect',
    description: 'Foundation level certification for PEGA developers and business architects. This certification validates your ability to design and build PEGA applications.',
    prerequisites: [
      'Completion of Beginner track tutorials',
      'Completion of Intermediate track tutorials',
      'Basic understanding of PEGA concepts',
      '3-6 months of hands-on PEGA experience recommended'
    ],
    syllabus: [
      'Case Management Fundamentals',
      'Data Modeling and Management',
      'User Interface Design',
      'Security and Access Control',
      'Integration and APIs',
      'Reporting and Analytics',
      'Application Deployment',
      'Decision Rules and Logic',
      'Workflow and Process Design',
      'Testing and Debugging'
    ],
    sampleQuestions: [
      {
        question: 'What is the primary purpose of a Case Type in PEGA?',
        options: [
          'To define database tables',
          'To represent a business transaction or process',
          'To create user interfaces',
          'To manage security settings'
        ],
        correct: 1
      },
      {
        question: 'Which rule type is used to define business logic in PEGA?',
        options: [
          'Flow Rules',
          'Decision Rules',
          'Declare Expression',
          'All of the above'
        ],
        correct: 3
      },
      {
        question: 'What is the purpose of a Data Page in PEGA?',
        options: [
          'To store user interface components',
          'To cache and manage data efficiently',
          'To define security rules',
          'To create reports'
        ],
        correct: 1
      }
    ],
    studyTips: [
      'Focus on understanding Case Management concepts thoroughly',
      'Practice building applications in App Studio',
      'Understand the difference between App Studio and Dev Studio',
      'Master data modeling and class hierarchy',
      'Practice with decision rules and expressions',
      'Understand security concepts and access groups',
      'Complete all hands-on projects in the tutorials',
      'Take practice tests regularly to assess your knowledge'
    ],
    examInfo: {
      duration: '90 minutes',
      questions: 60,
      passingScore: '70%',
      cost: '$200 USD'
    },
    resources: [
      {
        title: 'Beginner Tutorial Track',
        type: 'Tutorial',
        link: '/tutorials?level=beginner'
      },
      {
        title: 'Intermediate Tutorial Track',
        type: 'Tutorial',
        link: '/tutorials?level=intermediate'
      },
      {
        title: 'CSA Practice Quiz',
        type: 'Quiz',
        link: '/quiz/certification/csa'
      },
      {
        title: 'Bank Onboarding Project',
        type: 'Project',
        link: '/projects/bank-onboarding'
      }
    ]
  },
  cssa: {
    id: 'cssa',
    name: 'CSSA',
    fullName: 'Certified Senior System Architect',
    description: 'Advanced certification for experienced PEGA developers and architects. This certification validates your expertise in building complex enterprise applications.',
    prerequisites: [
      'Active CSA certification',
      'Completion of Advanced track tutorials',
      '1-2 years of PEGA development experience',
      'Experience with enterprise-level PEGA implementations'
    ],
    syllabus: [
      'Advanced Case Management',
      'Performance Optimization',
      'Advanced Integration Patterns',
      'Custom UI Development',
      'Advanced Security',
      'Application Architecture',
      'Deployment Strategies',
      'Complex Data Transformations',
      'Advanced Reporting',
      'Troubleshooting and Debugging'
    ],
    sampleQuestions: [
      {
        question: 'What is the best practice for optimizing PEGA application performance?',
        options: [
          'Use activities for all processing',
          'Minimize database calls and use declarative rules',
          'Create complex SQL queries',
          'Use clipboard pages extensively'
        ],
        correct: 1
      },
      {
        question: 'Which integration pattern is recommended for real-time data synchronization?',
        options: [
          'Batch processing',
          'REST API with webhooks',
          'File transfer',
          'Email integration'
        ],
        correct: 1
      }
    ],
    studyTips: [
      'Master advanced flow patterns and error handling',
      'Understand performance tuning techniques',
      'Learn about advanced integration patterns',
      'Practice with complex data transformations',
      'Study deployment and DevOps practices',
      'Work on real-world enterprise scenarios',
      'Review CSSA-specific study guides',
      'Join study groups and forums'
    ],
    examInfo: {
      duration: '120 minutes',
      questions: 80,
      passingScore: '75%',
      cost: '$300 USD'
    },
    resources: [
      {
        title: 'Advanced Tutorial Track',
        type: 'Tutorial',
        link: '/tutorials?level=advanced'
      },
      {
        title: 'CSSA Practice Quiz',
        type: 'Quiz',
        link: '/quiz/certification/cssa'
      },
      {
        title: 'Insurance Claims Project',
        type: 'Project',
        link: '/projects/insurance-claims'
      }
    ]
  },
  lsa: {
    id: 'lsa',
    name: 'LSA',
    fullName: 'Lead System Architect',
    description: 'Expert level certification for solution architects and technical leads. This certification validates your ability to lead enterprise PEGA implementations and architect complex solutions.',
    prerequisites: [
      'Active CSSA certification',
      '3+ years of PEGA architecture experience',
      'Experience leading PEGA implementation projects',
      'Strong understanding of enterprise architecture patterns'
    ],
    syllabus: [
      'Enterprise Architecture',
      'Solution Design Patterns',
      'Performance Engineering',
      'Advanced DevOps',
      'Team Leadership',
      'Client Engagement',
      'Technical Strategy',
      'Scalability and Reliability',
      'Cloud Architecture',
      'Migration and Modernization'
    ],
    sampleQuestions: [
      {
        question: 'What is the recommended approach for enterprise-scale PEGA implementations?',
        options: [
          'Single monolithic application',
          'Microservices with PEGA DX API',
          'Multiple isolated applications',
          'Traditional SOA approach'
        ],
        correct: 1
      }
    ],
    studyTips: [
      'Focus on enterprise architecture patterns',
      'Understand client engagement methodologies',
      'Master advanced performance optimization',
      'Study real-world implementation scenarios',
      'Practice solution design and presentation skills',
      'Learn about cloud architecture and migration',
      'Develop leadership and communication skills',
      'Stay updated with latest PEGA best practices'
    ],
    examInfo: {
      duration: '150 minutes',
      questions: 100,
      passingScore: '80%',
      cost: '$400 USD'
    },
    resources: [
      {
        title: 'Advanced Tutorial Track',
        type: 'Tutorial',
        link: '/tutorials?level=advanced'
      },
      {
        title: 'LSA Practice Quiz',
        type: 'Quiz',
        link: '/quiz/certification/lsa'
      },
      {
        title: 'Procurement Management Project',
        type: 'Project',
        link: '/projects/procurement-management'
      }
    ]
  }
};

export default function CertificationPage() {
  const router = useRouter();
  const { id } = router.query;
  
  const cert = id ? certificationData[id as string] : null;

  if (!cert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Certification Not Found</h1>
          <p className="text-gray-600 mb-6">The certification you're looking for doesn't exist.</p>
          <Link href="/certifications" className="btn-primary">
            View All Certifications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{cert.fullName} ({cert.name}) - PEGA Certification | PegaStack</title>
        <meta 
          name="description" 
          content={cert.description}
        />
        <meta name="keywords" content={`PEGA, ${cert.name}, certification, exam preparation, study guide`} />
      </Head>

      {/* Header */}
      <div className="bg-gradient-to-r from-pega-blue to-pega-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/certifications"
            className="inline-flex items-center text-white hover:text-gray-200 mb-6"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to All Certifications
          </Link>
          
          <div className="flex items-center mb-4">
            <AcademicCapIcon className="h-12 w-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              {cert.fullName}
            </h1>
          </div>
          
          <p className="text-xl text-gray-100 max-w-3xl">
            {cert.description}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Exam Info Card */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Exam Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="border-r border-gray-200 last:border-r-0">
              <div className="text-3xl font-bold text-pega-blue mb-2">{cert.examInfo.duration}</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
            <div className="border-r border-gray-200 last:border-r-0">
              <div className="text-3xl font-bold text-pega-blue mb-2">{cert.examInfo.questions}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="border-r border-gray-200 last:border-r-0">
              <div className="text-3xl font-bold text-pega-blue mb-2">{cert.examInfo.passingScore}</div>
              <div className="text-sm text-gray-600">Passing Score</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pega-blue mb-2">{cert.examInfo.cost}</div>
              <div className="text-sm text-gray-600">Exam Cost</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Prerequisites */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h3>
              <ul className="space-y-2">
                {cert.prerequisites.map((prereq, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-pega-blue rounded-full mr-3 mt-2"></div>
                    <span className="text-gray-700">{prereq}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Syllabus */}
            <Card>
              <div className="flex items-center mb-4">
                <DocumentTextIcon className="h-6 w-6 text-pega-blue mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Exam Syllabus</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cert.syllabus.map((topic, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-pega-blue rounded-full mr-3"></div>
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
              <button className="btn-primary w-full mt-6">
                Download Detailed Syllabus PDF
              </button>
            </Card>

            {/* Sample Questions */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-pega-blue mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Sample Questions</h3>
                </div>
              </div>
              
              <div className="space-y-6">
                {cert.sampleQuestions.map((q, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Q{index + 1}: {q.question}
                    </h4>
                    <div className="space-y-2">
                      {q.options.map((option, optIndex) => (
                        <div 
                          key={optIndex} 
                          className={`flex items-center p-2 rounded ${
                            optIndex === q.correct ? 'bg-green-50 border border-green-200' : ''
                          }`}
                        >
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-gray-700">{option}</span>
                          {optIndex === q.correct && (
                            <span className="ml-auto text-green-600 text-sm font-semibold">✓ Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href={`/quiz/certification/${cert.id}`} className="btn-secondary w-full mt-6 inline-block text-center">
                Take Full Practice Test
              </Link>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Study Tips */}
            <Card>
              <div className="flex items-center mb-4">
                <LightBulbIcon className="h-6 w-6 text-pega-blue mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Study Tips</h3>
              </div>
              <ul className="space-y-3">
                {cert.studyTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Resources */}
            <Card>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Study Resources</h3>
              <div className="space-y-3">
                {cert.resources.map((resource, index) => (
                  <Link 
                    key={index}
                    href={resource.link}
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{resource.title}</div>
                        <div className="text-xs text-gray-600">{resource.type}</div>
                      </div>
                      <ArrowLeftIcon className="h-4 w-4 text-gray-400 transform rotate-180" />
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href={`/quiz/certification/${cert.id}`} className="btn-primary w-full flex items-center justify-center">
                <PlayIcon className="h-5 w-5 mr-2" />
                Start Practice Test
              </Link>
              <button className="btn-secondary w-full">
                Join Study Group
              </button>
              <button className="btn-secondary w-full">
                Schedule Exam
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="bg-gradient-to-r from-pega-blue to-pega-light text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Preparation?</h3>
          <p className="text-gray-100 mb-6 max-w-2xl mx-auto">
            Begin your journey to becoming a {cert.fullName} with our comprehensive study materials and practice tests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="bg-white text-pega-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Go to Dashboard
            </Link>
            <Link href="/tutorials" className="bg-pega-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
              Browse Tutorials
            </Link>
          </div>
        </Card>
      </div>
    </>
  );
}

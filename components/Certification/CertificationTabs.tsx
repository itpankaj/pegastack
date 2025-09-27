import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { 
  AcademicCapIcon, 
  DocumentTextIcon, 
  QuestionMarkCircleIcon,
  LightBulbIcon,
  PlayIcon 
} from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import ProgressBar from '../UI/ProgressBar';

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
  progress: number;
}

const CertificationTabs = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const certifications: CertificationData[] = [
    {
      id: 'csa',
      name: 'CSA',
      fullName: 'Certified System Architect',
      description: 'Foundation level certification for PEGA developers and business architects.',
      syllabus: [
        'Case Management Fundamentals',
        'Data Modeling and Management',
        'User Interface Design',
        'Security and Access Control',
        'Integration and APIs',
        'Reporting and Analytics',
        'Application Deployment'
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
        }
      ],
      studyTips: [
        'Focus on understanding Case Management concepts thoroughly',
        'Practice building applications in App Studio',
        'Understand the difference between App Studio and Dev Studio',
        'Master data modeling and class hierarchy',
        'Practice with decision rules and expressions',
        'Understand security concepts and access groups'
      ],
      examInfo: {
        duration: '90 minutes',
        questions: 60,
        passingScore: '70%',
        cost: '$200 USD'
      },
      progress: 45
    },
    {
      id: 'cssa',
      name: 'CSSA',
      fullName: 'Certified Senior System Architect',
      description: 'Advanced certification for experienced PEGA developers and architects.',
      syllabus: [
        'Advanced Case Management',
        'Performance Optimization',
        'Advanced Integration Patterns',
        'Custom UI Development',
        'Advanced Security',
        'Application Architecture',
        'Deployment Strategies'
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
        }
      ],
      studyTips: [
        'Master advanced flow patterns and error handling',
        'Understand performance tuning techniques',
        'Learn about advanced integration patterns',
        'Practice with complex data transformations',
        'Study deployment and DevOps practices'
      ],
      examInfo: {
        duration: '120 minutes',
        questions: 80,
        passingScore: '75%',
        cost: '$300 USD'
      },
      progress: 20
    },
    {
      id: 'lsa',
      name: 'LSA',
      fullName: 'Lead System Architect',
      description: 'Expert level certification for solution architects and technical leads.',
      syllabus: [
        'Enterprise Architecture',
        'Solution Design Patterns',
        'Performance Engineering',
        'Advanced DevOps',
        'Team Leadership',
        'Client Engagement',
        'Technical Strategy'
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
        'Practice solution design and presentation skills'
      ],
      examInfo: {
        duration: '150 minutes',
        questions: 100,
        passingScore: '80%',
        cost: '$400 USD'
      },
      progress: 5
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 mb-8">
          {certifications.map((cert) => (
            <Tab
              key={cert.id}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
                ${selected
                  ? 'bg-white text-pega-blue shadow'
                  : 'text-blue-800 hover:bg-white/[0.12] hover:text-pega-blue'
                }`
              }
            >
              {cert.fullName}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {certifications.map((cert) => (
            <Tab.Panel key={cert.id} className="space-y-8">
              {/* Overview */}
              <Card>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {cert.fullName} ({cert.name})
                    </h2>
                    <p className="text-xl text-gray-600 mb-4">
                      {cert.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-pega-blue mb-1">
                      {cert.progress}%
                    </div>
                    <div className="text-sm text-gray-600">Progress</div>
                  </div>
                </div>
                
                <ProgressBar progress={cert.progress} className="mb-6" />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="font-semibold text-gray-900">{cert.examInfo.duration}</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{cert.examInfo.questions}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{cert.examInfo.passingScore}</div>
                    <div className="text-sm text-gray-600">Passing Score</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{cert.examInfo.cost}</div>
                    <div className="text-sm text-gray-600">Exam Cost</div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Syllabus */}
                <Card>
                  <div className="flex items-center mb-4">
                    <DocumentTextIcon className="h-6 w-6 text-pega-blue mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Exam Syllabus</h3>
                  </div>
                  <ul className="space-y-2">
                    {cert.syllabus.map((topic, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-pega-blue rounded-full mr-3"></div>
                        <span className="text-gray-700">{topic}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn-primary w-full mt-6">
                    Download Detailed Syllabus
                  </button>
                </Card>

                {/* Study Tips */}
                <Card>
                  <div className="flex items-center mb-4">
                    <LightBulbIcon className="h-6 w-6 text-pega-blue mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Study Tips</h3>
                  </div>
                  <ul className="space-y-3">
                    {cert.studyTips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {/* Sample Questions */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <QuestionMarkCircleIcon className="h-6 w-6 text-pega-blue mr-3" />
                    <h3 className="text-xl font-bold text-gray-900">Sample Questions</h3>
                  </div>
                  <button className="btn-secondary">
                    View All Questions
                  </button>
                </div>
                
                <div className="space-y-6">
                  {cert.sampleQuestions.map((q, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Q{index + 1}: {q.question}
                      </h4>
                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center">
                            <div className="w-6 h-6 border-2 border-gray-300 rounded-full mr-3"></div>
                            <span className="text-gray-700">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center">
                  <PlayIcon className="h-5 w-5 mr-2" />
                  Start Practice Test
                </button>
                <button className="btn-secondary">
                  Join Study Group
                </button>
                <button className="btn-secondary">
                  Schedule Exam
                </button>
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CertificationTabs;

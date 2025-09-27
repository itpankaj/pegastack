import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon, ClockIcon, UserIcon, CodeBracketIcon } from '@heroicons/react/24/outline';

interface ProjectPageProps {
  project: {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    difficulty: string;
    duration: string;
    technologies: string[];
    category: string;
    features: string[];
    learningOutcomes: string[];
    prerequisites: string[];
    steps: {
      title: string;
      description: string;
      tasks: string[];
    }[];
    downloadUrl?: string;
  };
}

const ProjectPage = ({ project }: ProjectPageProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>{project.title} - Projects | PegaStack</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center text-pega-blue hover:text-pega-light font-medium"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Projects
            </Link>
          </div>

          {/* Project Header */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="w-5 h-5 mr-2" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <UserIcon className="w-5 h-5 mr-2" />
                    <span>{project.category}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: project.longDescription }} />
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Features */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-pega-blue mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Outcomes</h2>
              <ul className="space-y-2">
                {project.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">🎯</span>
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prerequisites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.prerequisites.map((prereq, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-orange-500 mr-2">📋</span>
                  <span className="text-gray-700">{prereq}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Steps */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Implementation Steps</h2>
            <div className="space-y-6">
              {project.steps.map((step, index) => (
                <div key={index} className="border-l-4 border-pega-blue pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Step {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start">
                        <span className="text-pega-blue mr-2">•</span>
                        <span className="text-gray-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {project.downloadUrl && (
                <a
                  href={project.downloadUrl}
                  className="btn-primary flex items-center justify-center"
                >
                  <CodeBracketIcon className="w-5 h-5 mr-2" />
                  Download Project Files
                </a>
              )}
              <Link
                href="/forum"
                className="btn-secondary flex items-center justify-center"
              >
                Get Help in Forum
              </Link>
              <Link
                href="/projects"
                className="btn-secondary flex items-center justify-center"
              >
                View More Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // All project paths
  const paths = [
    { params: { id: 'bank-onboarding' } },
    { params: { id: 'insurance-claims' } },
    { params: { id: 'leave-management' } },
    { params: { id: 'customer-service' } },
    { params: { id: 'loan-processing' } },
    { params: { id: 'expense-management' } },
    { params: { id: 'procurement-system' } },
    { params: { id: 'healthcare-portal' } },
  ];

  return {
    paths,
    fallback: 'blocking'
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  // Complete project data
  const projectData: { [key: string]: any } = {
    'bank-onboarding': {
      id: 'bank-onboarding',
      title: 'Banking Customer Onboarding System',
      description: 'Build a comprehensive customer onboarding system for banking with KYC, document verification, and account setup.',
      longDescription: `
        <p>This project demonstrates how to build a complete banking customer onboarding system using PEGA BPM. You'll learn to handle complex business processes, integrate with external services, and implement regulatory compliance requirements.</p>
        
        <p>The system handles the entire customer journey from initial application to account activation, including identity verification, credit checks, and regulatory compliance. This is a real-world example of how banks use PEGA to streamline their onboarding processes while ensuring compliance with banking regulations.</p>
        
        <p>By completing this project, you'll gain hands-on experience with advanced PEGA features including case management, integration patterns, business rules, and user interface design.</p>
      `,
      difficulty: 'Intermediate',
      duration: '3-4 weeks',
      technologies: ['PEGA BPM', 'REST APIs', 'Database Integration', 'Document Management', 'Business Rules'],
      category: 'Financial Services',
      features: [
        'Multi-step customer application process',
        'Document upload and verification',
        'KYC (Know Your Customer) compliance',
        'Credit score integration',
        'Automated decision making',
        'Email notifications and alerts',
        'Dashboard for bank officers',
        'Audit trail and reporting'
      ],
      learningOutcomes: [
        'Master complex case management patterns',
        'Implement external service integrations',
        'Design user-friendly forms and workflows',
        'Handle business rule automation',
        'Build compliance and audit features',
        'Create comprehensive reporting dashboards'
      ],
      prerequisites: [
        'Basic PEGA BPM knowledge',
        'Understanding of banking processes',
        'Familiarity with REST APIs',
        'Basic database concepts'
      ],
      steps: [
        {
          title: 'Project Setup and Requirements',
          description: 'Set up the project structure and define business requirements',
          tasks: [
            'Create new PEGA application',
            'Define case types and data model',
            'Set up development environment',
            'Configure database connections'
          ]
        },
        {
          title: 'Customer Application Flow',
          description: 'Build the main customer application process',
          tasks: [
            'Design application form with validation',
            'Implement document upload functionality',
            'Create identity verification steps',
            'Add progress tracking for customers'
          ]
        },
        {
          title: 'KYC and Compliance',
          description: 'Implement Know Your Customer and regulatory compliance',
          tasks: [
            'Build KYC verification workflow',
            'Integrate with identity verification services',
            'Implement compliance checks',
            'Create audit trail functionality'
          ]
        },
        {
          title: 'Integration and Automation',
          description: 'Connect with external services and automate decisions',
          tasks: [
            'Integrate credit scoring APIs',
            'Set up automated decision rules',
            'Configure email notifications',
            'Implement exception handling'
          ]
        },
        {
          title: 'Testing and Deployment',
          description: 'Test the complete system and prepare for deployment',
          tasks: [
            'Create test scenarios and data',
            'Perform end-to-end testing',
            'Set up monitoring and reporting',
            'Deploy to production environment'
          ]
        }
      ],
      downloadUrl: '/downloads/bank-onboarding-project.zip'
    },
    'insurance-claims': {
      id: 'insurance-claims',
      title: 'Insurance Claims Processing System',
      description: 'Develop an automated insurance claims processing system with fraud detection and settlement workflows.',
      longDescription: `
        <p>Build a comprehensive insurance claims processing system that automates the entire claims lifecycle from submission to settlement. This project showcases advanced PEGA capabilities in handling complex business processes with multiple stakeholders and decision points.</p>
        
        <p>The system includes automated fraud detection, document processing, adjuster assignment, and settlement calculations. You'll learn how insurance companies use PEGA to reduce processing time, improve accuracy, and enhance customer satisfaction.</p>
        
        <p>This project is perfect for understanding how PEGA handles complex business rules, integrations with external systems, and workflow orchestration in a real-world enterprise environment.</p>
      `,
      difficulty: 'Advanced',
      duration: '4-5 weeks',
      technologies: ['PEGA BPM', 'Machine Learning', 'Document Processing', 'Integration APIs', 'Reporting'],
      category: 'Insurance',
      features: [
        'Automated claims intake and validation',
        'Fraud detection algorithms',
        'Document processing and OCR',
        'Adjuster assignment and scheduling',
        'Settlement calculation engine',
        'Customer communication portal',
        'Real-time reporting dashboard',
        'Integration with external systems'
      ],
      learningOutcomes: [
        'Implement complex business rule engines',
        'Build machine learning integration',
        'Master document processing workflows',
        'Create sophisticated reporting systems',
        'Handle multi-party communication flows',
        'Design scalable system architecture'
      ],
      prerequisites: [
        'Intermediate PEGA BPM skills',
        'Understanding of insurance processes',
        'Knowledge of integration patterns',
        'Basic machine learning concepts'
      ],
      steps: [
        {
          title: 'Claims Intake System',
          description: 'Build the initial claims submission and validation system',
          tasks: [
            'Create claims submission forms',
            'Implement data validation rules',
            'Set up document upload system',
            'Build initial triage workflow'
          ]
        },
        {
          title: 'Fraud Detection Engine',
          description: 'Implement automated fraud detection capabilities',
          tasks: [
            'Design fraud detection rules',
            'Integrate machine learning models',
            'Create risk scoring algorithms',
            'Build investigation workflows'
          ]
        },
        {
          title: 'Claims Processing Workflow',
          description: 'Build the core claims processing and adjuster assignment',
          tasks: [
            'Create adjuster assignment logic',
            'Build inspection scheduling system',
            'Implement damage assessment tools',
            'Design approval workflows'
          ]
        },
        {
          title: 'Settlement and Payment',
          description: 'Implement settlement calculation and payment processing',
          tasks: [
            'Build settlement calculation engine',
            'Create payment processing workflows',
            'Implement approval hierarchies',
            'Set up customer notifications'
          ]
        },
        {
          title: 'Reporting and Analytics',
          description: 'Create comprehensive reporting and analytics dashboard',
          tasks: [
            'Build operational dashboards',
            'Create performance metrics',
            'Implement trend analysis',
            'Set up automated reporting'
          ]
        }
      ],
      downloadUrl: '/downloads/insurance-claims-project.zip'
    },
    'leave-management': {
      id: 'leave-management',
      title: 'Employee Leave Management System',
      description: 'Create a comprehensive employee leave management system with approval workflows and calendar integration.',
      longDescription: `
        <p>Develop a complete employee leave management system that handles all aspects of leave requests, approvals, and tracking. This project demonstrates how HR departments use PEGA to automate and streamline their leave management processes.</p>
        
        <p>The system includes leave request submission, multi-level approval workflows, calendar integration, and comprehensive reporting. You'll learn how to build user-friendly interfaces for both employees and managers while maintaining proper audit trails and compliance.</p>
        
        <p>This project is ideal for understanding PEGA's capabilities in handling routine business processes with multiple user roles and approval hierarchies.</p>
      `,
      difficulty: 'Beginner',
      duration: '2-3 weeks',
      technologies: ['PEGA BPM', 'Calendar Integration', 'Email Notifications', 'Reporting', 'Mobile UI'],
      category: 'Human Resources',
      features: [
        'Employee self-service portal',
        'Multi-level approval workflows',
        'Leave balance tracking',
        'Calendar integration',
        'Email notifications',
        'Manager dashboard',
        'HR reporting and analytics',
        'Mobile-friendly interface'
      ],
      learningOutcomes: [
        'Build user-friendly self-service portals',
        'Implement approval workflow patterns',
        'Create role-based access controls',
        'Design mobile-responsive interfaces',
        'Build notification systems',
        'Create management dashboards'
      ],
      prerequisites: [
        'Basic PEGA BPM knowledge',
        'Understanding of HR processes',
        'Basic UI/UX concepts',
        'Familiarity with email systems'
      ],
      steps: [
        {
          title: 'System Setup and User Roles',
          description: 'Set up the application structure and define user roles',
          tasks: [
            'Create application and case types',
            'Define user roles and permissions',
            'Set up organizational hierarchy',
            'Configure leave types and policies'
          ]
        },
        {
          title: 'Employee Portal',
          description: 'Build the employee self-service portal',
          tasks: [
            'Create leave request forms',
            'Build leave balance display',
            'Implement calendar view',
            'Add request history tracking'
          ]
        },
        {
          title: 'Approval Workflows',
          description: 'Implement multi-level approval processes',
          tasks: [
            'Design approval routing logic',
            'Create manager approval interface',
            'Build escalation mechanisms',
            'Implement delegation features'
          ]
        },
        {
          title: 'Notifications and Integration',
          description: 'Add notifications and external system integration',
          tasks: [
            'Set up email notifications',
            'Integrate with calendar systems',
            'Build mobile-responsive UI',
            'Add SMS notifications'
          ]
        },
        {
          title: 'Reporting and Analytics',
          description: 'Create reporting dashboards for HR and management',
          tasks: [
            'Build HR analytics dashboard',
            'Create leave trend reports',
            'Implement compliance reporting',
            'Set up automated reports'
          ]
        }
      ],
      downloadUrl: '/downloads/leave-management-project.zip'
    },
    'customer-service': {
      id: 'customer-service',
      title: 'Customer Service Management System',
      description: 'Build a comprehensive customer service platform with ticket management, SLA tracking, and knowledge base integration.',
      longDescription: `
        <p>Create a complete customer service management system that handles customer inquiries, support tickets, and service requests. This project demonstrates how service organizations use PEGA to deliver exceptional customer experiences while maintaining operational efficiency.</p>
        
        <p>The system includes multi-channel support (email, chat, phone), automated ticket routing, SLA management, and knowledge base integration. You'll learn how to build scalable customer service solutions that can handle high volumes while maintaining quality.</p>
      `,
      difficulty: 'Intermediate',
      duration: '3-4 weeks',
      technologies: ['PEGA BPM', 'Multi-channel Integration', 'Knowledge Management', 'SLA Management', 'Analytics'],
      category: 'Customer Service',
      features: [
        'Multi-channel ticket creation',
        'Automated routing and assignment',
        'SLA tracking and escalation',
        'Knowledge base integration',
        'Customer communication portal',
        'Agent productivity tools',
        'Performance analytics',
        'Quality management'
      ],
      learningOutcomes: [
        'Build multi-channel integration',
        'Implement SLA management',
        'Create knowledge management systems',
        'Design agent productivity tools',
        'Build customer communication portals',
        'Implement quality assurance workflows'
      ],
      prerequisites: [
        'Basic PEGA BPM knowledge',
        'Understanding of customer service processes',
        'Familiarity with integration concepts',
        'Basic knowledge of SLA management'
      ],
      steps: [
        {
          title: 'Multi-channel Ticket System',
          description: 'Build ticket creation from multiple channels',
          tasks: [
            'Create email integration',
            'Build web form submission',
            'Set up chat integration',
            'Implement phone call logging'
          ]
        },
        {
          title: 'Routing and Assignment',
          description: 'Implement intelligent ticket routing',
          tasks: [
            'Build skill-based routing',
            'Create workload balancing',
            'Implement escalation rules',
            'Set up supervisor assignment'
          ]
        },
        {
          title: 'SLA and Performance Management',
          description: 'Add SLA tracking and performance monitoring',
          tasks: [
            'Configure SLA timers',
            'Build escalation workflows',
            'Create performance dashboards',
            'Implement quality scoring'
          ]
        }
      ],
      downloadUrl: '/downloads/customer-service-project.zip'
    },
    'loan-processing': {
      id: 'loan-processing',
      title: 'Loan Processing and Approval System',
      description: 'Develop an automated loan processing system with credit assessment, document verification, and approval workflows.',
      longDescription: `
        <p>Build a comprehensive loan processing system that automates the entire loan lifecycle from application to disbursement. This project showcases how financial institutions use PEGA to streamline lending operations while ensuring regulatory compliance.</p>
        
        <p>The system includes automated credit scoring, document verification, risk assessment, and multi-level approval workflows. You'll learn advanced PEGA patterns for handling complex financial processes with strict compliance requirements.</p>
      `,
      difficulty: 'Advanced',
      duration: '4-5 weeks',
      technologies: ['PEGA BPM', 'Credit Scoring APIs', 'Document Processing', 'Risk Assessment', 'Compliance'],
      category: 'Financial Services',
      features: [
        'Online loan application portal',
        'Automated credit scoring',
        'Document verification system',
        'Risk assessment engine',
        'Multi-level approval workflows',
        'Compliance checking',
        'Loan disbursement process',
        'Customer communication'
      ],
      learningOutcomes: [
        'Implement complex financial workflows',
        'Build credit assessment systems',
        'Create document processing automation',
        'Design risk management frameworks',
        'Implement regulatory compliance',
        'Build customer-facing portals'
      ],
      prerequisites: [
        'Intermediate PEGA BPM skills',
        'Understanding of lending processes',
        'Knowledge of financial regulations',
        'Familiarity with credit scoring'
      ],
      steps: [
        {
          title: 'Loan Application System',
          description: 'Build the customer-facing loan application',
          tasks: [
            'Create application forms',
            'Implement data validation',
            'Build document upload',
            'Add application tracking'
          ]
        },
        {
          title: 'Credit Assessment',
          description: 'Implement automated credit scoring and assessment',
          tasks: [
            'Integrate credit bureau APIs',
            'Build scoring algorithms',
            'Create risk categorization',
            'Implement decision rules'
          ]
        },
        {
          title: 'Approval Workflows',
          description: 'Build multi-level approval and decision processes',
          tasks: [
            'Create approval hierarchies',
            'Build underwriter workflows',
            'Implement committee approvals',
            'Add exception handling'
          ]
        }
      ],
      downloadUrl: '/downloads/loan-processing-project.zip'
    },
    'expense-management': {
      id: 'expense-management',
      title: 'Employee Expense Management System',
      description: 'Create a comprehensive expense management system with receipt processing, approval workflows, and reimbursement automation.',
      longDescription: `
        <p>Develop a complete employee expense management system that handles expense submission, approval, and reimbursement processes. This project demonstrates how organizations use PEGA to automate financial processes while maintaining proper controls and audit trails.</p>
        
        <p>The system includes mobile receipt capture, automated expense categorization, policy compliance checking, and integrated reimbursement processing. You'll learn how to build user-friendly financial applications with robust approval workflows.</p>
      `,
      difficulty: 'Intermediate',
      duration: '3-4 weeks',
      technologies: ['PEGA BPM', 'OCR Processing', 'Mobile Integration', 'Payment Systems', 'Policy Engine'],
      category: 'Finance',
      features: [
        'Mobile expense submission',
        'Receipt OCR and processing',
        'Automated expense categorization',
        'Policy compliance checking',
        'Multi-level approval workflows',
        'Integration with accounting systems',
        'Reimbursement processing',
        'Expense analytics and reporting'
      ],
      learningOutcomes: [
        'Build mobile-first applications',
        'Implement OCR and document processing',
        'Create policy compliance engines',
        'Design approval workflow patterns',
        'Build financial system integrations',
        'Create expense analytics dashboards'
      ],
      prerequisites: [
        'Basic PEGA BPM knowledge',
        'Understanding of expense processes',
        'Familiarity with mobile development',
        'Basic accounting concepts'
      ],
      steps: [
        {
          title: 'Mobile Expense Capture',
          description: 'Build mobile expense submission capabilities',
          tasks: [
            'Create mobile-responsive forms',
            'Implement camera integration',
            'Build OCR processing',
            'Add offline capabilities'
          ]
        },
        {
          title: 'Policy and Compliance',
          description: 'Implement expense policy checking and compliance',
          tasks: [
            'Build policy rule engine',
            'Create compliance checking',
            'Implement violation handling',
            'Add audit trail features'
          ]
        },
        {
          title: 'Approval and Reimbursement',
          description: 'Build approval workflows and payment processing',
          tasks: [
            'Create approval routing',
            'Build manager dashboards',
            'Integrate payment systems',
            'Add reimbursement tracking'
          ]
        }
      ],
      downloadUrl: '/downloads/expense-management-project.zip'
    },
    'procurement-system': {
      id: 'procurement-system',
      title: 'Procurement and Purchase Order System',
      description: 'Build an enterprise procurement system with vendor management, purchase approvals, and contract lifecycle management.',
      longDescription: `
        <p>Create a comprehensive procurement system that handles the entire purchase-to-pay process. This project showcases how enterprises use PEGA to manage complex procurement workflows with multiple stakeholders and approval hierarchies.</p>
        
        <p>The system includes vendor onboarding, RFQ management, purchase order processing, contract management, and supplier performance tracking. You'll learn advanced PEGA patterns for handling enterprise-scale business processes.</p>
      `,
      difficulty: 'Advanced',
      duration: '5-6 weeks',
      technologies: ['PEGA BPM', 'Vendor Integration', 'Contract Management', 'ERP Integration', 'Analytics'],
      category: 'Supply Chain',
      features: [
        'Vendor onboarding and management',
        'RFQ and bidding process',
        'Purchase requisition workflows',
        'Multi-level purchase approvals',
        'Contract lifecycle management',
        'Supplier performance tracking',
        'Integration with ERP systems',
        'Procurement analytics'
      ],
      learningOutcomes: [
        'Build complex enterprise workflows',
        'Implement vendor management systems',
        'Create contract lifecycle processes',
        'Design approval hierarchy patterns',
        'Build ERP system integrations',
        'Create procurement analytics'
      ],
      prerequisites: [
        'Advanced PEGA BPM skills',
        'Understanding of procurement processes',
        'Knowledge of ERP systems',
        'Familiarity with contract management'
      ],
      steps: [
        {
          title: 'Vendor Management',
          description: 'Build vendor onboarding and management system',
          tasks: [
            'Create vendor registration',
            'Build qualification workflows',
            'Implement performance tracking',
            'Add contract management'
          ]
        },
        {
          title: 'Purchase Requisition',
          description: 'Implement purchase request and approval workflows',
          tasks: [
            'Build requisition forms',
            'Create approval routing',
            'Implement budget checking',
            'Add purchase order generation'
          ]
        },
        {
          title: 'Contract and Compliance',
          description: 'Build contract management and compliance tracking',
          tasks: [
            'Create contract templates',
            'Build approval workflows',
            'Implement compliance monitoring',
            'Add renewal management'
          ]
        }
      ],
      downloadUrl: '/downloads/procurement-system-project.zip'
    },
    'healthcare-portal': {
      id: 'healthcare-portal',
      title: 'Healthcare Patient Portal System',
      description: 'Develop a comprehensive patient portal with appointment scheduling, medical records access, and care coordination.',
      longDescription: `
        <p>Build a complete healthcare patient portal that enables patients to manage their healthcare journey digitally. This project demonstrates how healthcare organizations use PEGA to improve patient engagement while ensuring HIPAA compliance and data security.</p>
        
        <p>The system includes appointment scheduling, medical records access, prescription management, care team communication, and health tracking features. You'll learn how to build healthcare applications with strict privacy and security requirements.</p>
      `,
      difficulty: 'Advanced',
      duration: '4-5 weeks',
      technologies: ['PEGA BPM', 'HIPAA Compliance', 'EHR Integration', 'Secure Messaging', 'Health APIs'],
      category: 'Healthcare',
      features: [
        'Patient registration and profiles',
        'Appointment scheduling system',
        'Medical records access',
        'Prescription management',
        'Secure messaging with providers',
        'Health tracking and monitoring',
        'Insurance and billing integration',
        'Care coordination workflows'
      ],
      learningOutcomes: [
        'Build HIPAA-compliant applications',
        'Implement healthcare data security',
        'Create patient engagement portals',
        'Design care coordination workflows',
        'Build EHR system integrations',
        'Implement secure communication systems'
      ],
      prerequisites: [
        'Advanced PEGA BPM skills',
        'Understanding of healthcare processes',
        'Knowledge of HIPAA requirements',
        'Familiarity with healthcare standards'
      ],
      steps: [
        {
          title: 'Patient Portal Foundation',
          description: 'Build secure patient registration and authentication',
          tasks: [
            'Create secure registration',
            'Implement multi-factor authentication',
            'Build patient profiles',
            'Add privacy controls'
          ]
        },
        {
          title: 'Appointment and Records',
          description: 'Implement appointment scheduling and records access',
          tasks: [
            'Build scheduling system',
            'Create records viewer',
            'Implement provider integration',
            'Add notification system'
          ]
        },
        {
          title: 'Care Coordination',
          description: 'Build care team communication and coordination',
          tasks: [
            'Create secure messaging',
            'Build care plan management',
            'Implement referral workflows',
            'Add health monitoring'
          ]
        }
      ],
      downloadUrl: '/downloads/healthcare-portal-project.zip'
    }
  };

  const project = projectData[id];

  if (!project) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      project
    },
    revalidate: 60
  };
};

export default ProjectPage;

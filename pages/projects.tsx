import Head from 'next/head';
import Link from 'next/link';
import { 
  BuildingOffice2Icon, 
  ShieldCheckIcon, 
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon 
} from '@heroicons/react/24/outline';
import Card from '../components/UI/Card';

export default function Projects() {
  const projects = [
    {
      id: 'bank-onboarding',
      title: 'Bank Customer Onboarding',
      description: 'Build a complete customer onboarding system with KYC verification, document management, and approval workflows.',
      difficulty: 'Intermediate',
      duration: '2-3 weeks',
      technologies: ['Case Management', 'File Upload', 'Decision Rules', 'Integration'],
      icon: BuildingOffice2Icon,
      color: 'from-blue-500 to-blue-600',
      lessons: 8,
      enrolled: 1250,
      featured: true
    },
    {
      id: 'insurance-claim',
      title: 'Insurance Claim Processing',
      description: 'Create an end-to-end insurance claim processing application with automated assessment and payment workflows.',
      difficulty: 'Advanced',
      duration: '3-4 weeks',
      technologies: ['Complex Workflows', 'External APIs', 'Reporting', 'Security'],
      icon: ShieldCheckIcon,
      color: 'from-green-500 to-green-600',
      lessons: 12,
      enrolled: 850,
      featured: true
    },
    {
      id: 'leave-management',
      title: 'Employee Leave Management',
      description: 'Develop a comprehensive leave management system with approval hierarchies, calendar integration, and analytics.',
      difficulty: 'Beginner',
      duration: '1-2 weeks',
      technologies: ['Basic Workflows', 'Calendar', 'Notifications', 'Reports'],
      icon: CalendarDaysIcon,
      color: 'from-purple-500 to-purple-600',
      lessons: 6,
      enrolled: 2100,
      featured: false
    },
    {
      id: 'expense-tracking',
      title: 'Expense Tracking System',
      description: 'Build an expense management application with receipt scanning, approval workflows, and expense analytics.',
      difficulty: 'Intermediate',
      duration: '2-3 weeks',
      technologies: ['Document Processing', 'Approval Chains', 'Analytics', 'Mobile'],
      icon: BuildingOffice2Icon,
      color: 'from-orange-500 to-orange-600',
      lessons: 10,
      enrolled: 950,
      featured: false
    },
    {
      id: 'helpdesk-system',
      title: 'IT Helpdesk System',
      description: 'Create a comprehensive IT support system with ticket management, SLA tracking, and knowledge base integration.',
      difficulty: 'Advanced',
      duration: '3-4 weeks',
      technologies: ['Service Management', 'SLA Rules', 'Knowledge Base', 'Escalations'],
      icon: UserGroupIcon,
      color: 'from-red-500 to-red-600',
      lessons: 14,
      enrolled: 720,
      featured: false
    },
    {
      id: 'procurement-system',
      title: 'Procurement Management',
      description: 'Develop a procurement system with vendor management, purchase approvals, and contract tracking.',
      difficulty: 'Advanced',
      duration: '4-5 weeks',
      technologies: ['Vendor Management', 'Contract Rules', 'Financial Integration', 'Compliance'],
      icon: BuildingOffice2Icon,
      color: 'from-indigo-500 to-indigo-600',
      lessons: 16,
      enrolled: 680,
      featured: false
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Head>
        <title>PEGA BPM Projects - Hands-on Learning | PegaStack</title>
        <meta 
          name="description" 
          content="Learn PEGA BPM through hands-on projects. Build real-world applications like banking systems, insurance processing, and more."
        />
        <meta name="keywords" content="PEGA projects, hands-on learning, case studies, BPM applications" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pega-blue to-pega-light text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hands-on PEGA Projects
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Apply your PEGA knowledge by building real-world applications. 
              Each project includes step-by-step guidance and source code.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600">Start with these popular projects</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {projects.filter(p => p.featured).map((project) => {
              const IconComponent = project.icon;
              return (
                <Card key={project.id} className="overflow-hidden">
                  <div className="flex">
                    <div className={`w-20 h-20 bg-gradient-to-r ${project.color} rounded-lg flex items-center justify-center mr-6`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {project.title}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {project.duration}
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="h-4 w-4 mr-1" />
                          {project.enrolled.toLocaleString()} students
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <Link 
                        href={`/projects/${project.id}`}
                        className="btn-primary"
                      >
                        Start Project
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* All Projects */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">All Projects</h2>
            <p className="text-xl text-gray-600">Choose from our complete collection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              return (
                <Card key={project.id} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                      {project.difficulty}
                    </span>
                    {project.featured && (
                      <span className="bg-pega-accent text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{project.lessons} lessons</span>
                    <span>{project.duration}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-6 justify-center">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-gray-500 text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  <Link 
                    href={`/projects/${project.id}`}
                    className="btn-primary w-full"
                  >
                    Start Project
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

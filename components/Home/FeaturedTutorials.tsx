import Link from 'next/link';
import Card from '../UI/Card';
import { 
  AcademicCapIcon, 
  CogIcon, 
  RocketLaunchIcon 
} from '@heroicons/react/24/outline';

const FeaturedTutorials = () => {
  const tutorials = [
    {
      id: 'beginner',
      title: 'Beginner Track',
      description: 'Start your PEGA journey with fundamentals, installation, and your first case application.',
      icon: AcademicCapIcon,
      lessons: 12,
      duration: '4-6 weeks',
      color: 'from-green-400 to-green-600',
      href: '/tutorials/beginner'
    },
    {
      id: 'intermediate',
      title: 'Intermediate Track',
      description: 'Master rules, integrations, security, and build complex business applications.',
      icon: CogIcon,
      lessons: 18,
      duration: '6-8 weeks',
      color: 'from-blue-400 to-blue-600',
      href: '/tutorials/intermediate'
    },
    {
      id: 'advanced',
      title: 'Advanced Track',
      description: 'Performance tuning, DevOps, custom components, and enterprise architecture.',
      icon: RocketLaunchIcon,
      lessons: 15,
      duration: '8-10 weeks',
      color: 'from-purple-400 to-purple-600',
      href: '/tutorials/advanced'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Structured learning tracks designed to take you from beginner to expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tutorials.map((tutorial) => {
            const IconComponent = tutorial.icon;
            return (
              <Card key={tutorial.id} className="text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${tutorial.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {tutorial.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {tutorial.description}
                </p>
                
                <div className="flex justify-between text-sm text-gray-500 mb-6">
                  <span>{tutorial.lessons} Lessons</span>
                  <span>{tutorial.duration}</span>
                </div>
                
                <Link 
                  href={tutorial.href}
                  className="btn-primary w-full block text-center"
                >
                  Start Learning
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTutorials;

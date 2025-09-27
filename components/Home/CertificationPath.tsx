import Link from 'next/link';
import { CheckCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import Card from '../UI/Card';

const CertificationPath = () => {
  const certifications = [
    {
      id: 'csa',
      name: 'CSA',
      fullName: 'Certified System Architect',
      description: 'Foundation level certification for PEGA developers',
      duration: '3-4 months',
      prerequisite: 'Beginner & Intermediate tracks',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 'cssa',
      name: 'CSSA',
      fullName: 'Certified Senior System Architect',
      description: 'Advanced certification for senior developers',
      duration: '4-6 months',
      prerequisite: 'CSA + Advanced track',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'lsa',
      name: 'LSA',
      fullName: 'Lead System Architect',
      description: 'Expert level certification for solution architects',
      duration: '6+ months',
      prerequisite: 'CSSA + Real-world experience',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Certification Roadmap
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our structured path to become a certified PEGA professional
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-8 mb-12">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="flex items-center">
              <Card className="text-center min-w-[280px]">
                <div className={`w-20 h-20 ${cert.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className={`text-2xl font-bold ${cert.color}`}>
                    {cert.name}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {cert.fullName}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4">
                  {cert.description}
                </p>
                
                <div className="text-sm text-gray-500 mb-4">
                  <div className="mb-1">Duration: {cert.duration}</div>
                  <div>Prerequisites: {cert.prerequisite}</div>
                </div>
                
                <Link 
                  href={`/certifications/${cert.id}`}
                  className="btn-primary w-full text-sm"
                >
                  Start Preparation
                </Link>
              </Card>
              
              {index < certifications.length - 1 && (
                <ArrowRightIcon className="hidden lg:block h-8 w-8 text-gray-400 mx-4" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/certifications"
            className="btn-secondary"
          >
            View Complete Roadmap
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CertificationPath;

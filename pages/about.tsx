import Head from 'next/head';
import { AcademicCapIcon, UserGroupIcon, TrophyIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';

const AboutPage = () => {
  const features = [
    {
      icon: AcademicCapIcon,
      title: 'Comprehensive Learning',
      description: 'From beginner basics to advanced enterprise solutions, our structured curriculum covers all aspects of PEGA BPM development.'
    },
    {
      icon: UserGroupIcon,
      title: 'Active Community',
      description: 'Join thousands of PEGA professionals sharing knowledge, solving problems, and advancing their careers together.'
    },
    {
      icon: TrophyIcon,
      title: 'Certification Ready',
      description: 'Prepare for CSA, CSSA, and LSA certifications with our targeted study materials and practice tests.'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Real Projects',
      description: 'Build actual business applications with our hands-on projects that mirror real-world scenarios.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Lead PEGA Architect',
      experience: '12+ years',
      certifications: 'CSA, CSSA, LSA',
      image: '/team/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Senior Developer',
      experience: '8+ years',
      certifications: 'CSA, CSSA',
      image: '/team/michael.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Business Analyst',
      experience: '6+ years',
      certifications: 'CSA, Business Architect',
      image: '/team/emily.jpg'
    }
  ];

  return (
    <>
      <Head>
        <title>About Us - PegaStack</title>
        <meta name="description" content="Learn about PegaStack - your comprehensive PEGA BPM learning platform created by industry experts." />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-pega-blue to-pega-light text-white py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About PegaStack
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Empowering the next generation of PEGA professionals through comprehensive education and community collaboration.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                To democratize PEGA BPM education by providing accessible, high-quality learning resources that bridge the gap between academic knowledge and real-world application. We believe everyone should have the opportunity to master PEGA and advance their career in business process management.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <feature.icon className="w-8 h-8 text-pega-blue mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
              <p className="text-lg text-gray-600">
                Industry experts with decades of combined PEGA experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl text-gray-600">👤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-pega-blue font-medium mb-1">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-1">{member.experience} Experience</p>
                  <p className="text-gray-500 text-sm">{member.certifications}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-lg text-gray-600">
                Numbers that reflect our commitment to PEGA education
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-pega-blue mb-2">5,000+</div>
                <div className="text-gray-600">Students Trained</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pega-blue mb-2">1,200+</div>
                <div className="text-gray-600">Certifications Earned</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pega-blue mb-2">50+</div>
                <div className="text-gray-600">Tutorial Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-pega-blue mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-pega-blue text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your PEGA Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of professionals who have advanced their careers with PegaStack
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-pega-blue px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                Start Learning Today
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-pega-blue transition-colors">
                Join Our Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

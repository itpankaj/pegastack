import Link from 'next/link';
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  ChatBubbleBottomCenterTextIcon,
  CodeBracketIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const footerSections = [
    {
      title: 'Learn',
      links: [
        { name: 'Beginner Tutorials', href: '/tutorials/beginner' },
        { name: 'Intermediate Tutorials', href: '/tutorials/intermediate' },
        { name: 'Advanced Tutorials', href: '/tutorials/advanced' },
        { name: 'Projects', href: '/projects' },
      ]
    },
    {
      title: 'Certifications',
      links: [
        { name: 'CSA Preparation', href: '/certifications/csa' },
        { name: 'CSSA Preparation', href: '/certifications/cssa' },
        { name: 'LSA Preparation', href: '/certifications/lsa' },
        { name: 'Practice Tests', href: '/practice-tests' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Interview Q&A', href: '/interview' },
        { name: 'Blog', href: '/blog' },
        { name: 'Downloads', href: '/downloads' },
        { name: 'Community', href: '/community' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-bold text-white mb-4">
              PegaStack
              <span className="text-pega-accent">.com</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Master PEGA BPM from scratch to professional level with comprehensive tutorials, certifications, and hands-on projects.
            </p>
            <div className="flex space-x-4">
              <AcademicCapIcon className="h-6 w-6 text-pega-accent" />
              <BookOpenIcon className="h-6 w-6 text-pega-accent" />
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-pega-accent" />
              <CodeBracketIcon className="h-6 w-6 text-pega-accent" />
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 PegaStack.com. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Built with ❤️ for the PEGA community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

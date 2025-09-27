import Head from 'next/head';
import Link from 'next/link';

const SitemapPage = () => {
  const siteStructure = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', href: '/' },
        { name: 'Tutorials', href: '/tutorials' },
        { name: 'Certifications', href: '/certifications' },
        { name: 'Projects', href: '/projects' },
        { name: 'Interview Q&A', href: '/interview' },
        { name: 'Blog', href: '/blog' },
        { name: 'Forum', href: '/forum' },
        { name: 'Dashboard', href: '/dashboard' },
      ]
    },
    {
      title: 'Tutorial Tracks',
      links: [
        { name: 'Beginner - What is PEGA BPM?', href: '/tutorials/beginner/what-is-pega-bpm' },
        { name: 'Beginner - Installation & Setup', href: '/tutorials/beginner/installation-setup' },
        { name: 'Intermediate - Rules Resolution', href: '/tutorials/intermediate/rules-resolution' },
        { name: 'Advanced - Performance Tuning', href: '/tutorials/advanced/performance-tuning' },
      ]
    },
    {
      title: 'Quizzes',
      links: [
        { name: 'PEGA BPM Fundamentals Quiz', href: '/quiz/beginner/what-is-pega-bpm' },
        { name: 'Installation & Setup Quiz', href: '/quiz/beginner/installation-setup' },
        { name: 'Rules Resolution Quiz', href: '/quiz/intermediate/rules-resolution' },
        { name: 'Performance Tuning Quiz', href: '/quiz/advanced/performance-tuning' },
      ]
    },
    {
      title: 'Forum Discussions',
      links: [
        { name: 'Custom Validation Rules', href: '/forum/thread/1' },
        { name: 'Performance Optimization', href: '/forum/thread/2' },
        { name: 'All Forum Discussions', href: '/forum' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Sitemap', href: '/sitemap' },
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Sitemap - PegaStack</title>
        <meta name="description" content="Complete sitemap of PegaStack.com - your comprehensive PEGA BPM learning platform." />
      </Head>

      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Site Map
            </h1>
            <p className="text-xl text-gray-600">
              Navigate through all pages and resources on PegaStack.com
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteStructure.map((section, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-pega-blue hover:text-pega-light transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-pega-blue mb-1">50+</div>
                <div className="text-sm text-gray-600">Tutorial Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pega-blue mb-1">25+</div>
                <div className="text-sm text-gray-600">Practice Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pega-blue mb-1">15+</div>
                <div className="text-sm text-gray-600">Real Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pega-blue mb-1">1000+</div>
                <div className="text-sm text-gray-600">Community Members</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SitemapPage;

import Link from 'next/link';
import { ArrowRightIcon, PlayIcon } from '@heroicons/react/24/outline';

const Hero = () => {
  return (
    <section className="hero-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Master PEGA BPM
            <br />
            <span className="text-pega-accent">From Scratch to Pro</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Complete learning path from Beginner to LSA certification. 
            Interactive tutorials, hands-on projects, and certification prep all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/tutorials" className="btn-primary flex items-center gap-2 text-lg">
              Start Learning Now
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
            <button className="btn-secondary flex items-center gap-2 text-lg">
              <PlayIcon className="h-5 w-5" />
              Watch Demo
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-pega-accent mb-2">50+</div>
              <div className="text-blue-100">Interactive Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pega-accent mb-2">3</div>
              <div className="text-blue-100">Certification Tracks</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pega-accent mb-2">10+</div>
              <div className="text-blue-100">Hands-on Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

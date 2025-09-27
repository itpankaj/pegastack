import Link from 'next/link';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ProgressBar from '../UI/ProgressBar';

interface TutorialSection {
  title: string;
  slug: string;
  progress: number;
  lessons: {
    title: string;
    slug: string;
    completed: boolean;
    current?: boolean;
  }[];
}

interface SidebarProps {
  sections: TutorialSection[];
  currentSlug?: string;
}

const Sidebar = ({ sections, currentSlug }: SidebarProps) => {
  // Determine which section should be expanded based on current tutorial
  const getCurrentSection = () => {
    if (!currentSlug) return 'beginner';
    if (currentSlug.includes('/intermediate/')) return 'intermediate';
    if (currentSlug.includes('/advanced/')) return 'advanced';
    return 'beginner';
  };
  
  const [expandedSections, setExpandedSections] = useState<string[]>([getCurrentSection()]);

  const toggleSection = (slug: string) => {
    setExpandedSections(prev => 
      prev.includes(slug) 
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
  };

  const totalProgress = sections.reduce((acc, section) => acc + section.progress, 0) / sections.length;

  return (
    <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-16 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Tutorial Progress</h2>
        <ProgressBar progress={totalProgress} className="mb-6" />
        <div className="text-sm text-gray-600 mb-6">
          {Math.round(totalProgress)}% Complete
        </div>

        <div className="space-y-2">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.slug);
            
            return (
              <div key={section.slug} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleSection(section.slug)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {section.title}
                    </h3>
                    <div className="mt-2">
                      <ProgressBar progress={section.progress} className="mb-1" />
                      <div className="text-xs text-gray-500">
                        {section.lessons.filter(l => l.completed).length} of {section.lessons.length} lessons
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-200">
                    {section.lessons.map((lesson) => (
                      <Link
                        key={lesson.slug}
                        href={`/tutorials/${section.slug}/${lesson.slug}`}
                        className={`block px-6 py-3 text-sm border-b border-gray-100 last:border-b-0 hover:bg-gray-50 ${
                          lesson.current ? 'bg-pega-blue text-white hover:bg-pega-light' : 
                          lesson.completed ? 'text-green-600' : 'text-gray-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{lesson.title}</span>
                          {lesson.completed && (
                            <span className="text-green-500">✓</span>
                          )}
                          {lesson.current && (
                            <span className="text-white">▶</span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

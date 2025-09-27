import Link from 'next/link';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

interface QuizButtonProps {
  tutorialSlug: string;
  lessonSlug: string;
  className?: string;
}

const QuizButton = ({ tutorialSlug, lessonSlug, className = '' }: QuizButtonProps) => {
  return (
    <div className={`bg-gradient-to-r from-pega-blue to-pega-light rounded-lg p-6 text-white ${className}`}>
      <div className="flex items-center mb-4">
        <AcademicCapIcon className="h-8 w-8 mr-3" />
        <h3 className="text-xl font-bold">Test Your Knowledge</h3>
      </div>
      <p className="mb-4 text-blue-100">
        Take a quick quiz to reinforce what you've learned in this lesson.
      </p>
      <Link 
        href={`/quiz/${tutorialSlug}/${lessonSlug}`}
        className="bg-white text-pega-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
      >
        Start Quiz
      </Link>
    </div>
  );
};

export default QuizButton;

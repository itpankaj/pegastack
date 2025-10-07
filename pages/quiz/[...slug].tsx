import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import QuizComponent from '../../components/Quiz/QuizComponent';

interface QuizPageProps {
  quiz: {
    id: string;
    title: string;
    description?: string | null;
    level: string;
    lesson: string;
    questions: any[];
    passing_score: number;
    total_questions: number;
    time_limit?: number | null;
  };
}

function QuizPage({ quiz }: QuizPageProps) {
  const handleQuizComplete = (score: number, passed: boolean) => {
    // Here you could save the quiz results to a database or local storage
    console.log(`Quiz completed with score: ${score}%, passed: ${passed}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{quiz.title} | PegaStack</title>
        <meta name="description" content={quiz.description || 'PEGA Quiz'} />
      </Head>

      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 mb-6">
          <Link
            href={quiz.level === 'certification' ? `/certifications/${quiz.lesson}` : `/tutorials/${quiz.level}/${quiz.lesson}`}
            className="inline-flex items-center text-pega-blue hover:text-pega-dark"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            {quiz.level === 'certification' ? 'Back to Certification' : 'Back to Tutorial'}
          </Link>
        </div>
        
        <QuizComponent 
          quizData={quiz} 
          onComplete={handleQuizComplete}
        />
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Define all available quiz paths
  const paths = [
    // Certification quizzes
    { params: { slug: ['certification', 'csa'] } },
    { params: { slug: ['certification', 'cssa'] } },
    { params: { slug: ['certification', 'lsa'] } },
    
    // Beginner quizzes (12 lessons)
    { params: { slug: ['beginner', 'what-is-pega-bpm'] } },
    { params: { slug: ['beginner', 'prpc-overview'] } },
    { params: { slug: ['beginner', 'installation-setup'] } },
    { params: { slug: ['beginner', 'app-vs-dev-studio'] } },
    { params: { slug: ['beginner', 'case-types-stages'] } },
    { params: { slug: ['beginner', 'data-modeling'] } },
    { params: { slug: ['beginner', 'ui-design-fundamentals'] } },
    { params: { slug: ['beginner', 'first-case-app'] } },
    { params: { slug: ['beginner', 'basic-validations'] } },
    { params: { slug: ['beginner', 'simple-reporting'] } },
    { params: { slug: ['beginner', 'testing-your-app'] } },
    { params: { slug: ['beginner', 'deployment-basics'] } },
    
    // Intermediate quizzes (18 lessons)
    { params: { slug: ['intermediate', 'rules-resolution'] } },
    { params: { slug: ['intermediate', 'declarative-rules'] } },
    { params: { slug: ['intermediate', 'data-pages-sources'] } },
    { params: { slug: ['intermediate', 'integration-basics'] } },
    { params: { slug: ['intermediate', 'advanced-data-modeling'] } },
    { params: { slug: ['intermediate', 'flow-rules-actions'] } },
    { params: { slug: ['intermediate', 'user-interface-advanced-concepts'] } },
    { params: { slug: ['intermediate', 'security-access-control'] } },
    { params: { slug: ['intermediate', 'case-management-advanced'] } },
    { params: { slug: ['intermediate', 'performance-optimization'] } },
    { params: { slug: ['intermediate', 'reporting-analytics'] } },
    { params: { slug: ['intermediate', 'decisioning-next-best-action'] } },
    { params: { slug: ['intermediate', 'testing-debugging'] } },
    { params: { slug: ['intermediate', 'background-processing'] } },
    { params: { slug: ['intermediate', 'mobile-offline-apps'] } },
    { params: { slug: ['intermediate', 'devops-deployment-pipelines'] } },
    { params: { slug: ['intermediate', 'localization-globalization'] } },
    { params: { slug: ['intermediate', 'governance-center-excellence'] } },
    
    // Advanced quizzes (16 lessons)
    { params: { slug: ['advanced', 'enterprise-architecture-patterns'] } },
    { params: { slug: ['advanced', 'advanced-performance-tuning'] } },
    { params: { slug: ['advanced', 'database-trace-analysis'] } },
    { params: { slug: ['advanced', 'circumstancing-specialization'] } },
    { params: { slug: ['advanced', 'product-rules-deployment'] } },
    { params: { slug: ['advanced', 'deployment-manager'] } },
    { params: { slug: ['advanced', 'pega-devops-cicd'] } },
    { params: { slug: ['advanced', 'pal-performance-alerts'] } },
    { params: { slug: ['advanced', 'production-support-strategies'] } },
    { params: { slug: ['advanced', 'advanced-integration-patterns'] } },
    { params: { slug: ['advanced', 'microservices-pega'] } },
    { params: { slug: ['advanced', 'advanced-security-patterns'] } },
    { params: { slug: ['advanced', 'pega-platform-apis'] } },
    { params: { slug: ['advanced', 'advanced-testing-strategies'] } },
    { params: { slug: ['advanced', 'cloud-native-pega'] } },
    { params: { slug: ['advanced', 'pega-constellation-ui'] } },
  ];

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string[];
  const level = slug?.[0];
  const lesson = slug?.[1];

  if (!level || !lesson) {
    return {
      notFound: true
    };
  }

  // Load quiz content from JSON file
  const fs = require('fs');
  const path = require('path');
  
  try {
    // Try different file naming conventions
    let filePath;
    let fileContent;
    
    filePath = path.join(process.cwd(), 'data', 'quizzes', level, `${lesson}.json`);

    
    fileContent = fs.readFileSync(filePath, 'utf8');
    const quizData = JSON.parse(fileContent);
    
    return {
      props: {
        quiz: {
          id: quizData.id || lesson,
          title: quizData.title || 'Quiz',
          description: quizData.description || null,
          level,
          lesson,
          questions: quizData.questions || [],
          passing_score: quizData.passing_score || 70,
          total_questions: quizData.total_questions || (quizData.questions ? quizData.questions.length : 0),
          time_limit: quizData.time_limit || null
        }
      },
      revalidate: 60
    };

  } catch (error) {
    console.error('Error loading quiz:', error);
    return {
      notFound: true
    };
  }
};

export default QuizPage;

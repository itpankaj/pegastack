import { useState, useEffect } from 'react';
import { CheckCircleIcon, ClockIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import ProgressBar from '../UI/ProgressBar';

interface LessonProgress {
  id: string;
  title: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
  quizScore?: number;
}

interface TrackProgress {
  trackId: string;
  trackName: string;
  progress: number;
  lessons: LessonProgress[];
  certificationsUnlocked: string[];
}

const ProgressTracker = () => {
  const [userProgress, setUserProgress] = useState<TrackProgress[]>([]);
  const [selectedTrack, setSelectedTrack] = useState('beginner');

  useEffect(() => {
    // Load user progress from localStorage or API
    const savedProgress = localStorage.getItem('pegastack-progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    } else {
      // Initialize default progress
      const defaultProgress: TrackProgress[] = [
        {
          trackId: 'beginner',
          trackName: 'Beginner Track',
          progress: 25,
          lessons: [
            { id: 'what-is-pega-bpm', title: 'What is PEGA BPM?', completed: true, current: false, locked: false, quizScore: 85 },
            { id: 'prpc-overview', title: 'PRPC Overview', completed: true, current: false, locked: false, quizScore: 92 },
            { id: 'installation-setup', title: 'Installation & Setup', completed: false, current: true, locked: false },
            { id: 'app-vs-dev-studio', title: 'App Studio vs Dev Studio', completed: false, current: false, locked: true },
            { id: 'first-case-app', title: 'Your First Case App', completed: false, current: false, locked: true },
          ],
          certificationsUnlocked: []
        },
        {
          trackId: 'intermediate',
          trackName: 'Intermediate Track',
          progress: 0,
          lessons: [
            { id: 'rules-resolution', title: 'Rules & Rule Resolution', completed: false, current: false, locked: true },
            { id: 'flow-rules-actions', title: 'Flow Rules & Actions', completed: false, current: false, locked: true },
            { id: 'declarative-rules', title: 'Declarative Rules', completed: false, current: false, locked: true },
          ],
          certificationsUnlocked: []
        },
        {
          trackId: 'advanced',
          trackName: 'Advanced Track',
          progress: 0,
          lessons: [
            { id: 'performance-tuning', title: 'Performance Tuning', completed: false, current: false, locked: true },
            { id: 'pega-devops', title: 'PEGA DevOps', completed: false, current: false, locked: true },
          ],
          certificationsUnlocked: []
        }
      ];
      setUserProgress(defaultProgress);
      localStorage.setItem('pegastack-progress', JSON.stringify(defaultProgress));
    }
  }, []);

  const currentTrack = userProgress.find(track => track.trackId === selectedTrack);
  const totalLessons = userProgress.reduce((acc, track) => acc + track.lessons.length, 0);
  const completedLessons = userProgress.reduce((acc, track) => 
    acc + track.lessons.filter(lesson => lesson.completed).length, 0
  );
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const getCompletionIcon = (lesson: LessonProgress) => {
    if (lesson.locked) {
      return <LockClosedIcon className="h-5 w-5 text-gray-400" />;
    } else if (lesson.completed) {
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    } else if (lesson.current) {
      return <ClockIcon className="h-5 w-5 text-pega-blue" />;
    } else {
      return <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>;
    }
  };

  const getQuizBadge = (score?: number) => {
    if (!score) return null;
    
    const badgeClass = score >= 90 ? 'bg-green-100 text-green-800' :
                      score >= 70 ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800';
    
    return (
      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}>
        Quiz: {score}%
      </span>
    );
  };

  return (
    <div className="space-y-8">
      {/* Overall Progress */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Progress</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-pega-blue mb-2">
              {Math.round(overallProgress)}%
            </div>
            <div className="text-gray-600">Overall Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pega-blue mb-2">
              {completedLessons}
            </div>
            <div className="text-gray-600">Lessons Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pega-blue mb-2">
              {userProgress.reduce((acc, track) => acc + track.certificationsUnlocked.length, 0)}
            </div>
            <div className="text-gray-600">Certifications Ready</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pega-blue mb-2">
              {Math.floor(completedLessons * 2.5)}
            </div>
            <div className="text-gray-600">Study Hours</div>
          </div>
        </div>
        
        <ProgressBar progress={overallProgress} className="mb-4" />
        <div className="text-sm text-gray-600 text-center">
          Keep going! You're making great progress on your PEGA journey.
        </div>
      </Card>

      {/* Track Selector */}
      <div className="flex flex-wrap gap-2">
        {userProgress.map((track) => (
          <button
            key={track.trackId}
            onClick={() => setSelectedTrack(track.trackId)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedTrack === track.trackId
                ? 'bg-pega-blue text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-pega-blue'
            }`}
          >
            {track.trackName}
            <span className="ml-2 text-sm">({Math.round(track.progress)}%)</span>
          </button>
        ))}
      </div>

      {/* Track Details */}
      {currentTrack && (
        <Card>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {currentTrack.trackName}
            </h3>
            <div className="text-sm text-gray-600">
              {currentTrack.lessons.filter(l => l.completed).length} of {currentTrack.lessons.length} completed
            </div>
          </div>
          
          <ProgressBar progress={currentTrack.progress} className="mb-6" />
          
          <div className="space-y-3">
            {currentTrack.lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`flex items-center p-4 rounded-lg border-2 transition-colors ${
                  lesson.current 
                    ? 'border-pega-blue bg-pega-blue/5' 
                    : lesson.completed 
                      ? 'border-green-200 bg-green-50'
                      : lesson.locked
                        ? 'border-gray-200 bg-gray-50'
                        : 'border-gray-200 hover:border-pega-blue/50'
                }`}
              >
                <div className="flex items-center flex-1">
                  <div className="mr-4">
                    {getCompletionIcon(lesson)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {index + 1}. {lesson.title}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center">
                      {lesson.completed && (
                        <span className="text-green-600">✓ Completed</span>
                      )}
                      {lesson.current && (
                        <span className="text-pega-blue">▶ Current Lesson</span>
                      )}
                      {lesson.locked && (
                        <span className="text-gray-500">🔒 Complete previous lessons to unlock</span>
                      )}
                      {getQuizBadge(lesson.quizScore)}
                    </div>
                  </div>
                </div>
                
                {!lesson.locked && (
                  <div className="ml-4">
                    <button className="btn-primary text-sm">
                      {lesson.completed ? 'Review' : lesson.current ? 'Continue' : 'Start'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Next Steps */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              {currentTrack.progress >= 80 && (
                <li>• 🎉 You're almost done with this track!</li>
              )}
              {currentTrack.progress >= 100 && (
                <li>• 🏆 Ready for certification exam preparation</li>
              )}
              {currentTrack.progress < 80 && (
                <li>• 📚 Continue with the next lesson in sequence</li>
              )}
              <li>• 💡 Take quizzes to reinforce your learning</li>
              <li>• 🛠️ Try hands-on projects to apply your knowledge</li>
            </ul>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ProgressTracker;

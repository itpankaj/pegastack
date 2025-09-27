import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CheckCircleIcon, XCircleIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface QuizQuestion {
  id: string | number;
  type: 'multiple-choice' | 'true-false' | 'scenario';
  question: string;
  options?: string[];
  correct_answer: string | number | boolean;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface QuizComponentProps {
  quizData: {
    id: string;
    title: string;
    description?: string | null;
    level: string;
    lesson: string;
    questions: QuizQuestion[];
    passing_score: number;
    total_questions: number;
    time_limit?: number | null;
  };
  onComplete: (score: number, passed: boolean) => void;
}

const QuizComponent = ({ quizData, onComplete }: QuizComponentProps) => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string | number | boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (answer: string | number | boolean) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      calculateScore();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quizData.questions.forEach((question, index) => {
      if (answers[index] === question.correct_answer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quizData.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    const passed = finalScore >= quizData.passing_score;
    onComplete(finalScore, passed);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setShowExplanation(false);
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  const currentQ = quizData.questions[currentQuestion];
  const isAnswered = answers[currentQuestion] !== undefined;
  const isCorrect = answers[currentQuestion] === currentQ?.correct_answer;

  if (showResults) {
    const passed = score >= quizData.passing_score;
    const correctAnswers = Object.values(answers).filter((answer, index) => 
      answer === quizData.questions[index].correct_answer
    ).length;

    return (
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Overall Results Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8 text-center mb-6 sm:mb-8">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            ) : (
              <XCircleIcon className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quiz {passed ? 'Completed!' : 'Not Passed'}
          </h2>
          
          <p className="text-lg text-gray-600 mb-6">
            Your Score: <span className={`font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {score}%
            </span>
          </p>
          
          <div className="text-sm text-gray-500 mb-8">
            You answered {correctAnswers} out of {quizData.questions.length} questions correctly.
            {!passed && ` You need ${quizData.passing_score}% to pass.`}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={resetQuiz}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm sm:text-base"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => router.push(`/tutorials/${quizData.level}/${quizData.lesson}`)}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2 bg-pega-blue text-white rounded-md hover:bg-pega-dark text-sm sm:text-base"
            >
              Back to Tutorial
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Question Review</h3>
          
          <div className="space-y-6">
            {quizData.questions.map((question, index) => {
              const userAnswer = answers[index];
              const isQuestionCorrect = userAnswer === question.correct_answer;
              const wasAnswered = userAnswer !== undefined;
              
              // Get the display text for answers
              const getUserAnswerText = () => {
                if (!wasAnswered) return 'Not answered';
                if (question.type === 'true-false') {
                  return userAnswer ? 'True' : 'False';
                }
                if (question.type === 'multiple-choice' || question.type === 'scenario') {
                  return question.options?.[userAnswer as number] || 'Invalid answer';
                }
                return String(userAnswer);
              };
              
              const getCorrectAnswerText = () => {
                if (question.type === 'true-false') {
                  return question.correct_answer ? 'True' : 'False';
                }
                if (question.type === 'multiple-choice' || question.type === 'scenario') {
                  return question.options?.[question.correct_answer as number] || 'Invalid answer';
                }
                return String(question.correct_answer);
              };
              
              return (
                <div key={index} className={`border rounded-lg p-6 ${
                  isQuestionCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-medium text-gray-500 mr-2">
                          Question {index + 1}
                        </span>
                        {isQuestionCorrect ? (
                          <CheckCircleIcon className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircleIcon className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">
                        {question.question}
                      </h4>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className={`p-4 rounded-lg ${
                      isQuestionCorrect ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <div className="text-sm font-medium text-gray-700 mb-1">Your Answer:</div>
                      <div className={`font-medium ${
                        isQuestionCorrect ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {getUserAnswerText()}
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-green-100">
                      <div className="text-sm font-medium text-gray-700 mb-1">Correct Answer:</div>
                      <div className="font-medium text-green-800">
                        {getCorrectAnswerText()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-sm font-medium text-blue-800 mb-2">Explanation:</div>
                    <div className="text-blue-700">
                      {question.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Quiz Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{quizData.title}</h1>
        <p className="text-gray-600 mb-4">{quizData.description}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-pega-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="text-sm text-gray-500">
          Question {currentQuestion + 1} of {quizData.questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex-1">
            {currentQ?.question}
          </h2>
          {currentQ?.difficulty && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              currentQ.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
              currentQ.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {currentQ.difficulty}
            </span>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQ?.type === 'multiple-choice' && currentQ.options?.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                answers[currentQuestion] === index
                  ? 'border-pega-blue bg-pega-light bg-opacity-10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={index}
                checked={answers[currentQuestion] === index}
                onChange={() => handleAnswer(index)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border-2 rounded-full mr-3 ${
                answers[currentQuestion] === index
                  ? 'border-pega-blue bg-pega-blue'
                  : 'border-gray-300'
              }`}>
                {answers[currentQuestion] === index && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <span className="text-gray-900">{option}</span>
            </label>
          ))}

          {currentQ?.type === 'true-false' && (
            <div className="flex gap-4">
              {['True', 'False'].map((option, index) => {
                const boolValue = option === 'True';
                const isSelected = answers[currentQuestion] === boolValue;
                return (
                  <label
                    key={option}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors flex-1 ${
                      isSelected
                        ? 'border-pega-blue bg-pega-light bg-opacity-10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion}`}
                      value={boolValue.toString()}
                      checked={isSelected}
                      onChange={() => handleAnswer(boolValue)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded-full mr-3 ${
                      isSelected
                        ? 'border-pega-blue bg-pega-blue'
                        : 'border-gray-300'
                    }`}>
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                      )}
                    </div>
                    <span className="text-gray-900 text-center flex-1">{option}</span>
                  </label>
                );
              })}
            </div>
          )}

          {/* Scenario questions - render same as multiple choice */}
          {currentQ?.type === 'scenario' && currentQ.options?.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                answers[currentQuestion] === index
                  ? 'border-pega-blue bg-pega-light bg-opacity-10'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                value={index}
                checked={answers[currentQuestion] === index}
                onChange={() => handleAnswer(index)}
                className="sr-only"
              />
              <div className={`w-4 h-4 border-2 rounded-full mr-3 ${
                answers[currentQuestion] === index
                  ? 'border-pega-blue bg-pega-blue'
                  : 'border-gray-300'
              }`}>
                {answers[currentQuestion] === index && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>

        {/* Explanation Toggle */}
        {isAnswered && (
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={toggleExplanation}
              className="flex items-center text-pega-blue hover:text-pega-dark font-medium"
            >
              {showExplanation ? 'Hide' : 'Show'} Explanation
              <ArrowRightIcon className={`w-4 h-4 ml-1 transform transition-transform ${
                showExplanation ? 'rotate-90' : ''
              }`} />
            </button>
            
            {showExplanation && (
              <div className={`mt-4 p-4 rounded-lg ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start">
                  {isCorrect ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircleIcon className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {currentQ?.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <button
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
          className="w-full sm:w-auto flex items-center justify-center px-4 py-3 sm:py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Previous
        </button>

        <div className="text-xs sm:text-sm text-gray-500 order-first sm:order-none">
          {Object.keys(answers).length} of {quizData.questions.length} answered
        </div>

        <button
          onClick={nextQuestion}
          disabled={!isAnswered}
          className="w-full sm:w-auto flex items-center justify-center px-4 py-3 sm:py-2 bg-pega-blue text-white rounded-md hover:bg-pega-dark disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
        >
          {currentQuestion === quizData.questions.length - 1 ? 'Finish Quiz' : 'Next'}
          <ArrowRightIcon className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default QuizComponent;

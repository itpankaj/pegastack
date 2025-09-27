import { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Card from '../UI/Card';
import ProgressBar from '../UI/ProgressBar';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizEngineProps {
  questions: QuizQuestion[];
  onComplete: (score: number, totalQuestions: number) => void;
}

const QuizEngine = ({ questions, onComplete }: QuizEngineProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!showExplanation) {
      setSelectedAnswer(answerIndex);
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answerIndex;
      setAnswers(newAnswers);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
      onComplete(score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0), questions.length);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (isCompleted) {
    const finalScore = score + (selectedAnswer === questions[currentQuestion].correctAnswer ? 1 : 0);
    const percentage = Math.round((finalScore / questions.length) * 100);
    
    return (
      <Card className="text-center">
        <div className="mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            percentage >= 70 ? 'bg-green-100' : 'bg-red-100'
          }`}>
            <span className={`text-3xl font-bold ${
              percentage >= 70 ? 'text-green-600' : 'text-red-600'
            }`}>
              {percentage}%
            </span>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Quiz Completed!
          </h2>
          
          <p className="text-xl text-gray-600 mb-6">
            You scored {finalScore} out of {questions.length} questions correctly.
          </p>
          
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
            percentage >= 70 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {percentage >= 70 ? (
              <>
                <CheckCircleIcon className="h-6 w-6 mr-2" />
                Great Job! Pass
              </>
            ) : (
              <>
                <XCircleIcon className="h-6 w-6 mr-2" />
                Try Again
              </>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Retake Quiz
          </button>
          <button 
            onClick={() => window.history.back()}
            className="btn-primary"
          >
            Back to Lesson
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <div className="text-sm text-gray-600">
            Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
          </div>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Question Card */}
      <Card className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          {currentQ.question}
        </h3>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => {
            let buttonClass = 'w-full p-4 text-left border-2 rounded-lg transition-all ';
            
            if (showExplanation) {
              if (index === currentQ.correctAnswer) {
                buttonClass += 'border-green-500 bg-green-50 text-green-800';
              } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                buttonClass += 'border-red-500 bg-red-50 text-red-800';
              } else {
                buttonClass += 'border-gray-200 bg-gray-50 text-gray-600';
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += 'border-pega-blue bg-pega-blue/10 text-pega-blue';
              } else {
                buttonClass += 'border-gray-200 hover:border-pega-blue hover:bg-pega-blue/5';
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={buttonClass}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                  {showExplanation && index === currentQ.correctAnswer && (
                    <CheckCircleIcon className="h-6 w-6 ml-auto text-green-600" />
                  )}
                  {showExplanation && index === selectedAnswer && index !== currentQ.correctAnswer && (
                    <XCircleIcon className="h-6 w-6 ml-auto text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
          <p className="text-blue-800">{currentQ.explanation}</p>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestion === 0}
          className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {!showExplanation ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="btn-primary flex items-center"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizEngine;

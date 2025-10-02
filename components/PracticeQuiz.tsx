
import React, { useState } from 'react';
import { generatePracticeQuiz } from '../services/geminiService';
import type { QuizQuestion } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const PracticeQuiz = () => {
  const [quizState, setQuizState] = useState<'configuring' | 'taking' | 'results'>('configuring');
  const [config, setConfig] = useState({ topic: '', numQuestions: 5, difficulty: 'medium' });
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: name === 'numQuestions' ? parseInt(value, 10) : value }));
  };

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.topic.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    try {
      const generatedQuestions = await generatePracticeQuiz(config.topic, config.numQuestions, config.difficulty);
      if (generatedQuestions && generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
        setUserAnswers(new Array(generatedQuestions.length).fill(null));
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setScore(0);
        setQuizState('taking');
      } else {
          throw new Error("Received an empty quiz from the AI.");
      }
    } catch (err) {
      console.error(err);
      setError('Failed to generate the quiz. The topic might be too specific or invalid. Please try a different topic.');
    } finally {
        setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1]);
    } else {
      // Finished quiz
      let finalScore = 0;
      userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
          finalScore++;
        }
      });
      setScore(finalScore);
      setQuizState('results');
    }
  };

  const handleRestart = () => {
    setQuizState('configuring');
    // Don't reset config topic for convenience
  };

  // Main render logic
  const renderContent = () => {
    if (isGenerating) {
        return <LoadingSpinner />;
    }
    
    if (quizState === 'taking' && questions.length > 0) {
      const question = questions[currentQuestionIndex];
      return (
        <div className="animate-fade-in-up">
          <div className="flex justify-between items-baseline mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-200">Question {currentQuestionIndex + 1} <span className="text-slate-400">of {questions.length}</span></h3>
            <p className="text-sm text-slate-400">{config.topic}</p>
          </div>
          <p className="text-lg text-slate-300 mb-6 min-h-[56px]">{question.question}</p>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'bg-blue-600/30 border-blue-500 text-white'
                    : 'bg-slate-700/50 border-slate-600 hover:bg-slate-700 hover:border-slate-500 text-slate-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="mt-8 text-right">
            <button
              onClick={handleNextQuestion}
              disabled={!selectedAnswer}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        </div>
      );
    }

    if (quizState === 'results') {
        const percentage = Math.round((score / questions.length) * 100);
      return (
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-slate-100 mb-2">Quiz Complete!</h2>
          <p className="text-center text-lg text-slate-400 mb-6">You scored <span className="font-bold text-blue-400">{score}</span> out of <span className="font-bold text-blue-400">{questions.length}</span> ({percentage}%)</p>
          
          <div className="space-y-6 max-h-[50vh] overflow-y-auto pr-2">
            {questions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <div key={index} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                  <p className="font-semibold text-slate-200 mb-2">{index + 1}. {q.question}</p>
                  <p className={`text-sm ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>Your answer: <span className="font-medium">{userAnswer || 'Not answered'}</span></p>
                  {!isCorrect && <p className="text-sm text-green-300">Correct answer: <span className="font-medium">{q.correctAnswer}</span></p>}
                  <p className="mt-2 text-xs text-slate-400 border-t border-slate-600 pt-2"><em>Explanation:</em> {q.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button onClick={handleRestart} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-500 transition-colors">Take Another Quiz</button>
          </div>
        </div>
      );
    }
    
    // Default: 'configuring' state
    return (
      <div className="animate-fade-in-up">
        {error && <div className="mb-4"><ErrorMessage message={error} /></div>}
        <form onSubmit={handleStartQuiz} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-md font-medium text-slate-300 mb-2">
              Quiz Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              value={config.topic}
              onChange={handleConfigChange}
              placeholder="e.g., Photosynthesis, World War 2, JavaScript Promises"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-slate-400 text-slate-100"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="numQuestions" className="block text-md font-medium text-slate-300 mb-2">
                Number of Questions
              </label>
              <select
                id="numQuestions"
                name="numQuestions"
                value={config.numQuestions}
                onChange={handleConfigChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-100"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-md font-medium text-slate-300 mb-2">
                Difficulty
              </label>
              <select
                id="difficulty"
                name="difficulty"
                value={config.difficulty}
                onChange={handleConfigChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-100"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="text-right pt-2">
            <button
              type="submit"
              disabled={isGenerating || !config.topic.trim()}
              className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg shadow-blue-500/30 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 disabled:bg-slate-600 disabled:shadow-none disabled:cursor-not-allowed transition-all hover:-translate-y-px"
            >
              Generate Quiz
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  return (
    <div className="animate-fade-in-up">
      <header className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-100">
          AI <span className="text-blue-400">Practice Quiz</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400">
          Generate a custom quiz on any topic to test your knowledge.
        </p>
      </header>
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-8 border border-slate-700 min-h-[400px] flex flex-col justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default PracticeQuiz;

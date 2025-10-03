
import React, { useState, useEffect } from 'react';
import TenseInputForm from './components/TenseInputForm';
import TenseOutputDisplay from './components/TenseOutputDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import AdvancedOptions from './components/AdvancedOptions';
import { generateTenseExplanation } from './services/geminiService';
import type { TenseDetails, GenerationOptions } from './types';
import LandingPage from './components/LandingPage';
import PracticeQuiz from './components/PracticeQuiz';
import AnimatedBackground from './components/AnimatedBackground';

const defaultOptions: GenerationOptions = {
  includeDefinition: true,
  definitionLength: 'short',
  includeUrduIdentification: true,
  includeActiveVoice: true,
  includePassiveVoice: true,
  includeDetailedExamples: true,
  numberOfExamples: 2,
  detailedExampleDifficulty: 'medium',
  exampleSentenceStructure: 'simple',
  exampleVocabularyLevel: 'intermediate',
  exampleTone: 'neutral',
};

const TenseExplainerTool = () => {
    const [tenseName, setTenseName] = useState('');
    const [tenseDetails, setTenseDetails] = useState<TenseDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [options, setOptions] = useState<GenerationOptions>(defaultOptions);
    const [areOptionsVisible, setAreOptionsVisible] = useState(false);
  
    useEffect(() => {
      if (tenseDetails) {
        setTenseDetails(null);
      }
    }, [tenseName]);
  
    const handleSubmit = async (name: string) => {
      setIsLoading(true);
      setError(null);
      setTenseDetails(null);
  
      try {
        const result = await generateTenseExplanation(name, options);
        setTenseDetails(result);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
        <div className="animate-fade-in-up">
            <header className="text-center my-8">
                <h1 className="text-3xl sm:text-5xl font-bold text-slate-100">
                    AI <span className="text-blue-400">Tense Explainer</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-400">
                    Enter any English tense to get a complete breakdown with formulas, examples, and Urdu translations.
                </p>
            </header>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-8 border border-slate-700">
                <TenseInputForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    tenseName={tenseName}
                    onTenseNameChange={setTenseName}
                />
                 <div className="text-center mt-4">
                    <button
                        onClick={() => setAreOptionsVisible(!areOptionsVisible)}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                        aria-expanded={areOptionsVisible}
                    >
                        {areOptionsVisible ? 'Hide' : 'Show'} Advanced Options
                    </button>
                </div>
                {areOptionsVisible && (
                    <AdvancedOptions
                        options={options}
                        onOptionsChange={setOptions}
                        isDisabled={isLoading}
                    />
                )}
            </div>

            <div className="mt-8">
                {isLoading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {tenseDetails && <TenseOutputDisplay data={tenseDetails} />}
            </div>
        </div>
    );
};

const ToolsPage = ({ onGoHome }: { onGoHome: () => void }) => {
  const [activeTool, setActiveTool] = useState('tenseExplainer');

  const tools = [
    { 
      id: 'tenseExplainer', 
      name: 'AI Tense Explainer', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      comingSoon: false,
    },
    { 
      id: 'quiz', 
      name: 'AI Practice Quiz', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
      comingSoon: false,
    },
    { 
      id: 'letterGenerator', 
      name: 'AI Letter Generator', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
      comingSoon: true 
    },
  ];

  return (
    <div className="min-h-screen text-slate-200">
      <AnimatedBackground />
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <main className="max-w-4xl mx-auto">
            <header className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-8 border border-slate-700 animate-fade-in-up flex justify-between items-center">
                <div className="flex items-center">
                    <svg className="w-8 h-8 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    <span className="text-xl font-bold text-slate-100">Notaina Next | Tools</span>
                </div>
                <button onClick={onGoHome} className="text-sm text-slate-300 hover:text-white bg-slate-700/50 px-3 py-2 rounded-md transition-colors">
                    Back to Home
                </button>
            </header>

            <div role="tablist" className="bg-slate-800/30 backdrop-blur-sm rounded-xl shadow-lg p-2 mb-8 border border-slate-700 flex flex-wrap justify-center gap-2">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        role="tab"
                        aria-selected={activeTool === tool.id}
                        aria-controls={`${tool.id}-panel`}
                        onClick={() => !tool.comingSoon && setActiveTool(tool.id)}
                        disabled={tool.comingSoon}
                        className={`flex items-center px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                            activeTool === tool.id
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-slate-300 hover:bg-slate-700/50'
                        } ${tool.comingSoon ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                        {tool.icon}
                        {tool.name}
                        {tool.comingSoon && <span className="text-xs ml-2 bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">Soon</span>}
                    </button>
                ))}
            </div>

            <div role="tabpanel" id="tenseExplainer-panel" hidden={activeTool !== 'tenseExplainer'}>
                <TenseExplainerTool />
            </div>
             <div role="tabpanel" id="quiz-panel" hidden={activeTool !== 'quiz'}>
                <PracticeQuiz />
            </div>
            
        </main>
      </div>
    </div>
  );
};

const App = () => {
    const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'tools'

    const handleHashChange = () => {
        if (window.location.hash === '#tools') {
            setCurrentPage('tools');
        } else {
            setCurrentPage('landing');
        }
    };

    useEffect(() => {
        handleHashChange(); // Check hash on initial load
        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const navigateToTools = () => {
        window.location.hash = 'tools';
    };

    const navigateToHome = () => {
        window.location.hash = '';
    };

    if (currentPage === 'landing') {
        return <LandingPage onNavigateToTenseApp={navigateToTools} />;
    }

    return <ToolsPage onGoHome={navigateToHome} />;
}

export default App;

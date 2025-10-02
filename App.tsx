

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


const ToolsPage = ({ onGoHome }: { onGoHome: () => void }) => {
  const [activeTool, setActiveTool] = useState('tenseExplainer');
  const [isExamPrepOpen, setIsExamPrepOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const tools = [
    { 
      id: 'tenseExplainer', 
      name: 'AI Tense Explainer', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, 
      comingSoon: false 
    },
    { 
      id: 'letterGenerator', 
      name: 'AI Letter Generator', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>, 
      comingSoon: true 
    },
    { 
      id: 'examPrep', 
      name: 'AI Exam Preparation', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>, 
      subItems: [
        { id: 'studyPlan', name: 'Study Plan', comingSoon: true },
        { id: 'practiceQuiz', name: 'Practice Quiz', comingSoon: false },
        { id: 'summaryGenerator', name: 'Summary Generator', comingSoon: true },
      ]
    },
    { 
      id: 'studyHelper', 
      name: 'AI Study Helper', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>, 
      comingSoon: true 
    },
  ];

  const [tenseName, setTenseName] = useState('');
  const [tenseDetails, setTenseDetails] = useState<TenseDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState<GenerationOptions>(() => {
    try {
      const savedOptions = localStorage.getItem('tenseAppOptions');
      if (savedOptions) {
        return { ...defaultOptions, ...JSON.parse(savedOptions) };
      }
    } catch (e) {
      console.error("Failed to parse options from localStorage", e);
    }
    return defaultOptions;
  });

  useEffect(() => {
    try {
      localStorage.setItem('tenseAppOptions', JSON.stringify(options));
    } catch (e) {
      console.error("Failed to save options to localStorage", e);
    }
  }, [options]);

  const handleGenerate = async (submittedTenseName: string) => {
    setShowAdvanced(false);
    setIsLoading(true);
    setError(null);
    setTenseDetails(null);
    try {
      const result = await generateTenseExplanation(submittedTenseName, options);
      setTenseDetails(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate tense details. Please check your input or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const prefillTense = (tense: string) => {
    setTenseName(tense);
    if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
    }
  }

  return (
    <div className="min-h-screen flex text-slate-200">
      {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          ></div>
      )}
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 flex-shrink-0 bg-slate-800/50 backdrop-blur-sm border-r border-slate-700 flex flex-col p-4 transform transition-transform duration-300 md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center mb-8">
          <button onClick={onGoHome} className="text-slate-400 hover:text-blue-400 transition-colors p-2 rounded-md hover:bg-slate-700/50" aria-label="Go to Homepage">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </button>
          <span className="text-xl font-bold text-slate-100 ml-3">AI Tools</span>
        </div>
        <nav className="flex flex-col space-y-2">
            {tools.map(tool => {
                if (tool.subItems) { // Check for sub-items to create a dropdown
                    return (
                      <div key={tool.id}>
                        <button
                          onClick={() => setIsExamPrepOpen(!isExamPrepOpen)}
                          className="flex items-center p-3 rounded-lg transition-colors text-left text-sm font-medium w-full text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
                          aria-expanded={isExamPrepOpen}
                          aria-controls={`submenu-${tool.id}`}
                        >
                          {tool.icon}
                          <span className="ml-3 flex-grow">{tool.name}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-200 ${isExamPrepOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isExamPrepOpen && (
                          <div id={`submenu-${tool.id}`} className="pl-6 py-1 space-y-1 animate-slide-down">
                            {tool.subItems.map(subItem => (
                              <button
                                key={subItem.id}
                                onClick={() => {
                                  if (!subItem.comingSoon) {
                                      setActiveTool(subItem.id);
                                      if (window.innerWidth < 768) {
                                        setIsSidebarOpen(false);
                                      }
                                  }
                                }}
                                disabled={subItem.comingSoon}
                                className={`w-full flex items-center p-2 rounded-lg transition-colors text-left text-sm font-medium ${
                                  activeTool === subItem.id
                                    ? 'bg-blue-600/30 text-blue-200'
                                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                                } ${
                                  subItem.comingSoon ? 'cursor-not-allowed text-slate-500 hover:bg-transparent' : ''
                                }`}
                              >
                                <span className="ml-5 flex-grow">{subItem.name}</span>
                                {subItem.comingSoon && <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">Soon</span>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                }
                return (
                    <button
                        key={tool.id}
                        onClick={() => {
                            if (!tool.comingSoon) {
                                setActiveTool(tool.id);
                                if (window.innerWidth < 768) setIsSidebarOpen(false);
                            }
                        }}
                        disabled={tool.comingSoon}
                        className={`flex items-center p-3 rounded-lg transition-colors text-left text-sm font-medium ${
                            activeTool === tool.id
                            ? 'bg-blue-600/30 text-blue-200'
                            : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                        } ${
                            tool.comingSoon ? 'cursor-not-allowed text-slate-500 hover:bg-transparent' : ''
                        }`}
                    >
                        {tool.icon}
                        <span className="ml-3 flex-grow">{tool.name}</span>
                        {tool.comingSoon && <span className="text-xs bg-slate-600 text-slate-300 px-2 py-0.5 rounded-full">Soon</span>}
                    </button>
                )
            })}
        </nav>
        <div className="mt-auto pt-4 space-y-4">
          <div className="bg-slate-700/50 p-2 rounded-lg border border-slate-600 flex items-center gap-3 transition-colors hover:border-slate-500">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zbssX7AaHdZiXfe75RnvJhT6l2Co3ltl4Q&s"
              alt="Ali Hasnain"
              className="w-9 h-9 rounded-full object-cover border-2 border-slate-600"
            />
            <div>
              <p className="text-sm font-semibold text-slate-100">Ali Hasnain</p>
              <p className="text-xs text-blue-400">Developer</p>
            </div>
          </div>
          <div className="bg-slate-700/50 p-2 rounded-lg border border-slate-600 flex items-center gap-3 transition-colors hover:border-slate-500">
            <img
              src="https://i.pinimg.com/736x/70/db/15/70db15603dc8ecd536a300f2bd5b59f1.jpg"
              alt="Abdul Raheem"
              className="w-9 h-9 rounded-full object-cover border-2 border-slate-600"
            />
            <div>
              <p className="text-sm font-semibold text-slate-100">Abdul Raheem</p>
              <p className="text-xs text-slate-400">Bestie</p>
            </div>
          </div>
          <div className="flex justify-center space-x-6 pt-2">
             <a href="https://www.instagram.com/hackerz_ali/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-slate-400 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://github.com/invisbleia" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-slate-400 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </a>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto [perspective:2000px]">
        <main className="max-w-4xl mx-auto">
          <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 mb-4 rounded-md text-slate-400 bg-slate-800/50 border border-slate-700"
              aria-label="Open menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
          </button>
          {activeTool === 'tenseExplainer' && (
            <>
              <header className="text-center my-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h1 className="text-3xl sm:text-5xl font-bold text-slate-100">
                  NEXT AI | <span className="text-blue-400">TENSE</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-slate-400">
                  Enter Any Tense Name To Get A Full, Detailed Breakdown.
                </p>
              </header>
              
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 sticky top-4 z-10 border border-slate-700 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl [transform-style:preserve-3d] hover:[transform:rotateX(10deg)_translateZ(20px)] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <TenseInputForm
                  onSubmit={handleGenerate}
                  isLoading={isLoading}
                  tenseName={tenseName}
                  onTenseNameChange={setTenseName}
                />
                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-sm text-slate-400 space-y-2 sm:space-y-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>Try:</span>
                    <button onClick={() => prefillTense('Present Indefinite Tense')} className="font-medium text-blue-400 hover:underline">Present Indefinite</button>,
                    <button onClick={() => prefillTense('Past Perfect Continuous Tense')} className="ml-1 font-medium text-blue-400 hover:underline">Past Perfect</button>,
                    <button onClick={() => prefillTense('Future Perfect Tense')} className="ml-1 font-medium text-blue-400 hover:underline">Future Perfect</button>
                  </div>
                  <button 
                    onClick={() => setShowAdvanced(!showAdvanced)} 
                    className="flex items-center font-medium text-blue-400 hover:underline self-start sm:self-center mt-2 sm:mt-0"
                    aria-expanded={showAdvanced}
                    aria-controls="advanced-options"
                  >
                    Advanced Options
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-1 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
                {showAdvanced && (
                  <div id="advanced-options">
                    <AdvancedOptions 
                      options={options} 
                      onOptionsChange={setOptions} 
                      isDisabled={isLoading} 
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-8">
                {isLoading && <LoadingSpinner />}
                {error && <ErrorMessage message={error} />}
                {tenseDetails && (
                  <div className="animate-flip-in">
                    <TenseOutputDisplay data={tenseDetails} />
                  </div>
                )}
              </div>
            </>
          )}

          {activeTool === 'practiceQuiz' && (
            <PracticeQuiz />
          )}

          {activeTool !== 'tenseExplainer' && activeTool !== 'practiceQuiz' && (
             <div className="flex items-center justify-center h-full animate-fade-in-up min-h-[60vh]">
              <div className="text-center p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700">
                <h2 className="text-3xl font-bold text-slate-100">Coming Soon!</h2>
                <p className="mt-4 text-slate-400">This tool is under development and will be available shortly.</p>
              </div>
            </div>
          )}

          <footer className="text-center text-slate-400 mt-16 pb-4 text-sm animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <p>Powered by Gemini 2.5 Flash . Made For My Friends</p>
          </footer>
        </main>
      </div>
    </div>
  );
}


function App() {
  const [view, setView] = useState<'landing' | 'tenseApp'>('landing');
  
  if (view === 'landing') {
    return <LandingPage onNavigateToTenseApp={() => setView('tenseApp')} />;
  }
  
  return <ToolsPage onGoHome={() => setView('landing')} />;
}


export default App;
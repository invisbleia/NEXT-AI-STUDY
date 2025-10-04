
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import TenseInputForm from './components/TenseInputForm';
import TenseOutputDisplay from './components/TenseOutputDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import AdvancedOptions from './components/AdvancedOptions';
import { generateTenseExplanation } from './services/geminiService';
import type { TenseDetails, GenerationOptions } from './types';
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

// --- Icon Components ---
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const TenseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LetterIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ExamIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.747h18" /><path d="M4 6h16M4 12h16M4 18h16" /></svg>;
const StudyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const InstagramIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>;
const GithubIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;

// --- Sidebar Component ---
interface SidebarProps {
  activeTool: string;
  onToolSelect: (tool: string) => void;
  isOpen: boolean;
  onNavigateHome: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; isSoon?: boolean; hasDropdown?: boolean; onClick: () => void;}> = ({ icon, label, isActive, isSoon, hasDropdown, onClick }) => (
  <button
    onClick={onClick}
    disabled={isSoon}
    className={`w-full flex items-center text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? 'bg-blue-700 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
    } ${isSoon ? 'cursor-not-allowed opacity-60' : ''}`}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
    {isSoon && <span className="text-xs ml-auto bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">Soon</span>}
    {hasDropdown && <ChevronDownIcon />}
  </button>
);

const UserProfile: React.FC<{ name: string; role: string; imageUrl: string }> = ({ name, role, imageUrl }) => (
    <div className="flex items-center p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
        <img src={imageUrl} alt={name} className="w-9 h-9 rounded-full object-cover mr-3" />
        <div>
            <p className="font-semibold text-sm text-slate-200">{name}</p>
            <p className="text-xs text-blue-400">{role}</p>
        </div>
    </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onToolSelect, isOpen, onNavigateHome }) => {
    // FIX: Added 'hasDropdown' property to tool objects to satisfy NavItem component props.
    const tools = [
        { id: 'tenseExplainer', label: 'AI Tense Explainer', icon: <TenseIcon />, isSoon: false, hasDropdown: false },
        { id: 'letterGenerator', label: 'AI Letter Generator', icon: <LetterIcon />, isSoon: true, hasDropdown: false },
        { id: 'examPrep', label: 'AI Practice Quiz', icon: <ExamIcon />, isSoon: false, hasDropdown: false },
        { id: 'studyHelper', label: 'AI Study Helper', icon: <StudyIcon />, isSoon: true, hasDropdown: false },
    ];

    return (
        <aside className={`w-64 bg-[#111827] p-5 flex flex-col flex-shrink-0 h-full fixed top-0 left-0 rounded-r-2xl md:sticky md:h-screen md:rounded-none md:border-r md:border-slate-800 transition-transform transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <button 
                onClick={onNavigateHome}
                className="flex items-center mb-8 w-full text-left p-2 -ml-2 rounded-lg transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                aria-label="Go to homepage"
            >
                <HomeIcon />
                <h1 className="text-xl font-bold text-white ml-2">AI Tools</h1>
            </button>
            <nav className="flex-grow">
                <ul className="space-y-2">
                    {tools.map(tool => (
                        <li key={tool.id}>
                            <NavItem 
                                icon={tool.icon}
                                label={tool.label}
                                isActive={activeTool === tool.id}
                                isSoon={tool.isSoon}
                                hasDropdown={tool.hasDropdown}
                                onClick={() => onToolSelect(tool.id)}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="space-y-3 mt-8">
                <UserProfile name="Ali Hasnain" role="Developer" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zbssX7AaHdZiXfe75RnvJhT6l2Co3ltl4Q&s" />
                <UserProfile name="Abdul Raheem" role="Bestie" imageUrl="https://i.pinimg.com/736x/70/db/15/70db15603dc8ecd536a300f2bd5b59f1.jpg" />
            </div>
            <div className="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-slate-800">
                <a href="https://www.instagram.com/hackerz_ali/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="text-slate-500 hover:text-white transition-colors">
                    <InstagramIcon />
                </a>
                <a href="https://github.com/invisbleia" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="text-slate-500 hover:text-white transition-colors">
                    <GithubIcon />
                </a>
            </div>
        </aside>
    );
};

// --- Page Content Components ---
const TenseExplainerPage = () => {
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
      if (!name) return;
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

    const handleTryTense = (name: string) => {
        setTenseName(name);
        handleSubmit(name);
    }
  
    return (
        <div className="max-w-3xl mx-auto animate-fade-in-up">
            <header className="text-center mb-10">
                <h1 className="text-5xl font-bold text-white tracking-wider">
                    NEXT AI | <span className="text-blue-500">TENSE</span>
                </h1>
                <p className="mt-3 text-lg text-slate-400">
                    Enter Any Tense Name To Get A Full, Detailed Breakdown.
                </p>
            </header>
            <div className="bg-[#1e293b] rounded-xl shadow-2xl shadow-slate-900/50 p-6 sm:p-8 border border-slate-700">
                <TenseInputForm
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    tenseName={tenseName}
                    onTenseNameChange={setTenseName}
                    onTryTense={handleTryTense}
                />
                <div className="text-center mt-6">
                    <button
                        onClick={() => setAreOptionsVisible(!areOptionsVisible)}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center justify-center mx-auto"
                        aria-expanded={areOptionsVisible}
                    >
                        Advanced Options
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${areOptionsVisible ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
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

            <footer className="text-center text-slate-500 mt-12 text-sm">
                <p>Powered by Gemini 2.5 Flash . Made For My Friends</p>
            </footer>
        </div>
    );
};


// --- Main App Component ---
const App = () => {
    const [view, setView] = useState<'landing' | 'app'>('landing');
    const [activeTool, setActiveTool] = useState('tenseExplainer');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleNavigateToApp = () => {
        setView('app');
    };
    
    const handleNavigateToHome = () => {
        setView('landing');
    };

    const renderTool = () => {
        switch (activeTool) {
            case 'tenseExplainer':
                return <TenseExplainerPage />;
            case 'examPrep':
                return <PracticeQuiz />;
            default:
                return (
                    <div className="text-center mt-20">
                        <h2 className="text-2xl font-bold text-white">Coming Soon!</h2>
                        <p className="text-slate-400 mt-2">This tool is under construction.</p>
                    </div>
                );
        }
    };

    if (view === 'landing') {
        return <LandingPage onNavigateToTenseApp={handleNavigateToApp} />;
    }

    return (
      <div className="relative min-h-screen md:flex bg-slate-900 text-slate-300">
        {isSidebarOpen && (
            <div 
                className="md:hidden fixed inset-0 bg-black/60 z-20"
                onClick={() => setIsSidebarOpen(false)}
                aria-label="Close menu"
            ></div>
        )}
        <Sidebar 
            activeTool={activeTool} 
            onToolSelect={(tool) => {
                setActiveTool(tool);
                setIsSidebarOpen(false);
            }}
            isOpen={isSidebarOpen} 
            onNavigateHome={handleNavigateToHome}
        />
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto w-full">
          <button 
            className="md:hidden p-2 mb-4 rounded-md text-slate-400 hover:bg-slate-800"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
          {renderTool()}
        </main>
      </div>
    );
}

export default App;

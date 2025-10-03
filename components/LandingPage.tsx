

import React from 'react';
import AnimatedBackground from './AnimatedBackground';

interface LandingPageProps {
  onNavigateToTenseApp: () => void;
}

// FIX: Changed icon type from JSX.Element to React.ReactElement to resolve namespace issue and extracted props to an interface for better readability.
interface FeatureCardProps {
  icon: React.ReactElement;
  title: string;
  description: string;
  comingSoon?: boolean;
  onLaunch?: () => void;
}

const FeatureCard = ({ icon, title, description, comingSoon, onLaunch }: FeatureCardProps) => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700 flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-blue-500/20">
        <div className="bg-slate-700 p-3 rounded-full mb-4 border border-slate-600">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-100 mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-4 flex-grow">{description}</p>
        <button 
            onClick={onLaunch}
            disabled={comingSoon}
            className={`w-full mt-auto px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                comingSoon 
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-500'
            }`}
        >
            {comingSoon ? 'Coming Soon' : 'Launch Tool'}
        </button>
    </div>
);


const LandingPage: React.FC<LandingPageProps> = ({ onNavigateToTenseApp }) => {
  return (
    <div className="min-h-screen text-slate-200">
      <AnimatedBackground />
      <div className="relative z-10 p-4 sm:p-6 lg:p-8">
        <main className="max-w-5xl mx-auto">
          
          <nav className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-4 mb-8 border border-slate-700 animate-fade-in-up flex justify-between items-center">
            <div className="flex items-center">
              <svg className="w-8 h-8 mr-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              <span className="text-xl font-bold text-slate-100">Notaina Next</span>
            </div>
            <div className="flex items-center space-x-4">
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
          </nav>

          {/* Hero Section */}
          <header className="text-center my-16 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-100 leading-tight">
              NEXT AI | <span className="text-blue-400">Supercharge Your Learning</span>
            </h1>
            <p className="mt-6 text-lg max-w-3xl mx-auto text-slate-400">
              A suite of powerful, <span className="text-green-400 font-semibold">100% free</span> AI tools designed for students. Master English tenses, prepare for exams, and accelerate your studies.
            </p>
            <div className="mt-8 flex justify-center animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <div 
                  onClick={onNavigateToTenseApp} 
                  className="inline-flex items-center cursor-pointer bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-full p-1 pr-4 text-sm text-slate-300 hover:bg-slate-700/80 hover:border-slate-600 transition-all group"
                >
                  <span className="bg-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold mr-3 animate-pulse-red">NEW</span>
                  <span className="group-hover:text-white transition-colors">AI Practice Quiz is now live! Test your knowledge.</span>
                </div>
            </div>
            <button onClick={onNavigateToTenseApp} className="mt-6 inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all hover:-translate-y-1">
              Explore AI Tools
            </button>
          </header>

          {/* Features Section */}
          <section id="tools" className="my-24 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-12">Our AI Toolkit</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <FeatureCard 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                      title="AI Tense Explainer"
                      description="Get detailed explanations of any English tense, including formulas, examples, and Urdu conversions."
                      onLaunch={onNavigateToTenseApp}
                  />
                  <FeatureCard 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                      title="AI Letter Generator"
                      description="Craft professional or personal letters for any occasion with AI assistance."
                      comingSoon
                  />
                  <FeatureCard 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-5.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12v7a2 2 0 002 2h18a2 2 0 002-2v-7" /></svg>}
                      title="AI Exam Preparation"
                      description="Generate custom practice quizzes on any topic. More tools like study plans and summaries are coming soon!"
                      onLaunch={onNavigateToTenseApp}
                  />
                  <FeatureCard 
                      icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
                      title="AI Study Helper"
                      description="Summarize complex topics, create flashcards, and get personalized study plans."
                      comingSoon
                  />
              </div>
          </section>

          {/* Team Section */}
          <section className="my-24 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-12">Meet The Team</h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
                  <a href="https://github.com/invisbleia" target="_blank" rel="noopener noreferrer" className="group block rounded-xl transition-all duration-300">
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700 w-56 text-center transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-blue-500/30">
                          <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0zbssX7AaHdZiXfe75RnvJhT6l2Co3ltl4Q&s"
                          alt="Profile picture of Ali Hasnain"
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-blue-400 group-hover:border-blue-300 transition-colors"
                          />
                          <h3 className="text-lg font-semibold text-slate-100">Ali Hasnain</h3>
                          <p className="text-blue-400 font-medium">Developer</p>
                      </div>
                  </a>
                  <div className="group rounded-xl transition-all duration-300">
                      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-slate-700 w-56 text-center transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-slate-500/30">
                          <img
                          src="https://i.pinimg.com/736x/70/db/15/70db15603dc8ecd536a300f2bd5b59f1.jpg"
                          alt="Aesthetic profile picture of the CEO"
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-slate-500 group-hover:border-slate-400 transition-colors"
                          />
                          <h3 className="text-lg font-semibold text-slate-100">Abdul Raheem</h3>
                          <p className="text-slate-400 font-medium">Bestie</p>
                      </div>
                  </div>
              </div>
          </section>

          <footer className="text-center text-slate-400 mt-16 pb-8 text-sm animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <p>Made with <span className="text-red-500" aria-label="love">❤️</span> By Ali For Study</p>
            <p className="mt-2">Powered by Gemini 2.5 Flash . Made For My Friends</p>
          </footer>

        </main>
      </div>
    </div>
  );
};

export default LandingPage;
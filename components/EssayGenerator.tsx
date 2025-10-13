
import React, { useState } from 'react';
import { generateEssay } from '../services/geminiService';
import type { EssayGenerationOptions } from '../types';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const EssayGenerator = () => {
  const [options, setOptions] = useState<EssayGenerationOptions>({
    topic: '',
    language: 'English',
    length: 'medium',
    vocabulary: 'intermediate',
    tone: 'academic',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!options.topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult('');
    try {
      const essay = await generateEssay(options);
      setResult(essay);
    } catch (err: any) {
      setError(err.message || 'Failed to generate the essay. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;
    
    const isUrdu = options.language === 'Urdu';
    
    return (
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-slate-700 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-slate-100 mb-4">Generated {isUrdu ? 'Mazmon' : 'Essay'}</h2>
            <div 
                className={`text-slate-300 leading-relaxed whitespace-pre-wrap ${isUrdu ? 'font-urdu text-right text-xl' : 'text-base'}`}
                dir={isUrdu ? 'rtl' : 'ltr'}
            >
                {result}
            </div>
        </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in-up">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold text-white tracking-wider">
          AI Essay | <span className="text-blue-500">{options.language === 'Urdu' ? 'مضمون' : 'Writer'}</span>
        </h1>
        <p className="mt-3 text-lg text-slate-400">
          Generate a high-quality essay or mazmon on any topic.
        </p>
      </header>

      <div className="bg-[#1e293b] rounded-xl shadow-2xl shadow-slate-900/50 p-6 sm:p-8 border border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-md font-medium text-slate-300 mb-2">
              Topic
            </label>
            <input
              id="topic"
              name="topic"
              type="text"
              value={options.topic}
              onChange={handleOptionChange}
              placeholder="e.g., The impact of technology on society"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-slate-500 text-slate-100"
              required
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="language" className="block text-md font-medium text-slate-300 mb-2">
                Language
              </label>
              <select
                id="language"
                name="language"
                value={options.language}
                onChange={handleOptionChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-100"
              >
                <option value="English">English</option>
                <option value="Urdu">Urdu</option>
              </select>
            </div>
            <div>
              <label htmlFor="length" className="block text-md font-medium text-slate-300 mb-2">
                Length
              </label>
              <select
                id="length"
                name="length"
                value={options.length}
                onChange={handleOptionChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-100"
              >
                <option value="very-short">Very Short (~100 words)</option>
                <option value="short">Short (~150 words)</option>
                <option value="medium">Medium (~250 words)</option>
                <option value="long">Long (~600 words)</option>
                <option value="extra-long">Extra Long (~1100 words)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="vocabulary" className="block text-md font-medium text-slate-300 mb-2">
                Vocabulary
              </label>
              <select
                id="vocabulary"
                name="vocabulary"
                value={options.vocabulary}
                onChange={handleOptionChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-100"
              >
                <option value="simple">Simple</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label htmlFor="tone" className="block text-md font-medium text-slate-300 mb-2">
                Tone
              </label>
              <select
                id="tone"
                name="tone"
                value={options.tone}
                onChange={handleOptionChange}
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-100"
              >
                <option value="academic">Academic</option>
                <option value="formal">Formal</option>
                <option value="creative">Creative</option>
                <option value="informal">Informal</option>
              </select>
            </div>
          </div>

          <div className="text-right pt-2">
            <button
              type="submit"
              disabled={isLoading || !options.topic.trim()}
              className={`relative overflow-hidden inline-flex justify-center items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white transition-all hover:-translate-y-px ${
                isLoading
                  ? 'is-generating-fire cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 shadow-blue-500/30'
              } disabled:bg-slate-600 disabled:shadow-none disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : `Generate ${options.language === 'Urdu' ? 'Mazmon' : 'Essay'}`}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {result && renderResult()}
      </div>
    </div>
  );
};

export default EssayGenerator;
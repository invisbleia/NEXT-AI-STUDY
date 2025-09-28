import React from 'react';

interface TenseInputFormProps {
  onSubmit: (tenseName: string) => void;
  isLoading: boolean;
  tenseName: string;
  onTenseNameChange: (value: string) => void;
}

const TenseInputForm: React.FC<TenseInputFormProps> = ({ onSubmit, isLoading, tenseName, onTenseNameChange }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tenseName.trim() && !isLoading) {
      onSubmit(tenseName.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tense-input" className="block text-md font-medium text-slate-300 mb-2">
        Enter English Tense Name
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="tense-input"
          type="text"
          value={tenseName}
          onChange={(e) => onTenseNameChange(e.target.value)}
          placeholder="e.g., Past Perfect Continuous"
          className="flex-grow w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder:text-slate-400 text-slate-100"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !tenseName.trim()}
          className={`relative overflow-hidden inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg shadow-blue-500/30 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 disabled:bg-slate-600 disabled:shadow-none disabled:cursor-not-allowed transition-all ${isLoading ? 'is-generating-fire' : 'hover:-translate-y-px'}`}
        >
          {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
            </>
          ) : (
            'Generate Details'
          )}
        </button>
      </div>
    </form>
  );
};

export default TenseInputForm;
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-slate-800/50 backdrop-blur-sm rounded-lg shadow-md border border-slate-700">
      <svg
        className="animate-spin h-12 w-12 text-blue-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="mt-4 text-slate-300 text-lg animate-flicker">Generating your detailed guide...</p>
      <p className="mt-1 text-sm text-slate-400">This may take a moment.</p>
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-500/10 backdrop-blur-sm border-l-4 border-red-500 text-red-300 p-4 rounded-lg shadow-lg animate-shake animate-pulse-red" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm-1-5a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm0-6a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold text-red-200">An Error Occurred</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
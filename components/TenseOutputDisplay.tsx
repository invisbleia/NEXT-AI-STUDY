import React from 'react';
import type { TenseDetails, VoiceDetails, DetailedExample } from '../types';

interface TenseOutputDisplayProps {
  data: TenseDetails;
}

const VoiceSection: React.FC<{ title: string; details: VoiceDetails }> = ({ title, details }) => (
  <div className="mt-6 transition-transform duration-300 hover:shadow-xl hover:-translate-y-2 p-4 rounded-lg">
    <h3 className="flex items-center text-xl font-semibold text-slate-200 border-b-2 border-blue-400/30 pb-2 mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m-6 4h6m-6 4h6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
        </svg>
        {title}
    </h3>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="text-lg font-semibold text-slate-300 mb-2">Formula</h4>
        <ul className="space-y-2 text-slate-300 bg-slate-900/50 p-4 rounded-md border border-slate-700">
          <li><strong className="font-medium text-slate-100">Affirmative:</strong> {details.formula.affirmative}</li>
          <li><strong className="font-medium text-slate-100">Negative:</strong> {details.formula.negative}</li>
          <li><strong className="font-medium text-slate-100">Interrogative:</strong> {details.formula.interrogative}</li>
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-slate-300 mb-2">Examples</h4>
        <ul className="space-y-2 text-slate-300 bg-slate-900/50 p-4 rounded-md border border-slate-700">
          {details.examples.map((ex, i) => <li key={i}>{ex}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

const DetailedExampleSection: React.FC<{ example: DetailedExample; index: number }> = ({ example, index }) => (
  <div className="mt-8 p-4 border border-slate-700 rounded-lg bg-slate-900/50 transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
    <h2 className="flex items-center text-2xl font-bold text-slate-200 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Example Conversion #{index + 1}
    </h2>
    
    <p className="font-urdu text-2xl text-right mb-4" dir="rtl" lang="ur"><strong className="text-slate-400 text-lg font-sans">اردو:</strong> {example.activeVoice.urdu}</p>

    <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-300">Active Voice</h3>
        <div className="mt-2 pl-4 border-l-4 border-blue-500">
            <ul className="list-disc list-inside text-slate-300 space-y-1 py-2 pl-2">
                {example.activeVoice.english.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
        </div>
    </div>
    
    {example.passiveVoice && (
      <div>
          <h3 className="text-xl font-semibold text-slate-300">Passive Voice</h3>
          <div className="mt-2 pl-4 border-l-4 border-green-500">
              <ul className="list-disc list-inside text-slate-300 space-y-1 py-2 pl-2">
                  {example.passiveVoice.english.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
          </div>
      </div>
    )}
  </div>
);


const TenseOutputDisplay: React.FC<TenseOutputDisplayProps> = ({ data }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-lg p-6 sm:p-8 border border-slate-700 [transform-style:preserve-3d]">
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text mb-4 animate-fade-in-up">{data.tenseName}</h1>
      
      {data.definition && (
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h2 className="flex items-center text-2xl font-semibold text-slate-200 border-b-2 border-blue-400/30 pb-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Definition
            </h2>
            <p className="text-slate-300 leading-relaxed">{data.definition}</p>
        </div>
      )}

      {data.urduIdentification && (
        <div className="mt-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <h2 className="flex items-center text-2xl font-semibold text-slate-200 border-b-2 border-blue-400/30 pb-2 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
                </svg>
                Identification (Urdu)
            </h2>
            <p className="font-urdu text-2xl text-right text-slate-200" dir="rtl" lang="ur">{data.urduIdentification}</p>
        </div>
      )}
      
      {data.activeVoice && (
        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <VoiceSection title="Formula & Examples (Active Voice)" details={data.activeVoice} />
        </div>
      )}
      {data.passiveVoice && (
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <VoiceSection title="Formula & Examples (Passive Voice)" details={data.passiveVoice} />
          </div>
      )}

      {data.detailedExamples && data.detailedExamples.map((ex, i) => (
        <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${500 + i * 100}ms` }}>
          <DetailedExampleSection example={ex} index={i} />
        </div>
      ))}
    </div>
  );
};

export default TenseOutputDisplay;
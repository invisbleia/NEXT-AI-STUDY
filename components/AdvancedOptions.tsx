
import React from 'react';
import type { GenerationOptions } from '../types';

interface AdvancedOptionsProps {
  options: GenerationOptions;
  onOptionsChange: (newOptions: GenerationOptions) => void;
  isDisabled: boolean;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ options, onOptionsChange, isDisabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let processedValue: string | number | boolean = value;
    if (type === 'checkbox') {
      processedValue = (e.target as HTMLInputElement).checked;
    }
    if (name === 'numberOfExamples') {
      processedValue = parseInt(value, 10);
    }
    
    onOptionsChange({
      ...options,
      [name]: processedValue,
    });
  };

  return (
    <div className="mt-4 p-4 bg-slate-900/50 border border-slate-700 rounded-lg animate-slide-down text-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        
        {/* Column 1 */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-200 text-base">General Content</h3>
          <div className="flex items-center justify-between">
            <label htmlFor="includeDefinition" className="text-slate-300 select-none">
              Include Definition
            </label>
            <input
              id="includeDefinition"
              name="includeDefinition"
              type="checkbox"
              checked={options.includeDefinition}
              onChange={handleChange}
              disabled={isDisabled}
              className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-blue-400 focus:ring-blue-500 focus:ring-offset-slate-800 cursor-pointer"
            />
          </div>
          {options.includeDefinition && (
             <div className="flex items-center justify-between pl-4">
              <label htmlFor="definitionLength" className="text-slate-300 select-none">
                Definition Length
              </label>
              <select
                id="definitionLength"
                name="definitionLength"
                value={options.definitionLength}
                onChange={handleChange}
                disabled={isDisabled}
                className="rounded-md border-blue-500 bg-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 cursor-pointer text-slate-200"
              >
                <option value="short">Short</option>
                <option value="medium">Medium</option>
                <option value="long">Long</option>
              </select>
            </div>
          )}
          <div className="flex items-center justify-between">
            <label htmlFor="includeUrduIdentification" className="text-slate-300 select-none">
              Include Urdu Identification
            </label>
            <input
              id="includeUrduIdentification"
              name="includeUrduIdentification"
              type="checkbox"
              checked={options.includeUrduIdentification}
              onChange={handleChange}
              disabled={isDisabled}
              className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-blue-400 focus:ring-blue-500 focus:ring-offset-slate-800 cursor-pointer"
            />
          </div>
           <h3 className="font-semibold text-slate-200 text-base pt-2">Voice Details</h3>
            <div className="flex items-center justify-between">
                <label htmlFor="includeActiveVoice" className="text-slate-300 select-none">
                Include Active Voice
                </label>
                <input
                id="includeActiveVoice"
                name="includeActiveVoice"
                type="checkbox"
                checked={options.includeActiveVoice}
                onChange={handleChange}
                disabled={isDisabled}
                className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-blue-400 focus:ring-blue-500 focus:ring-offset-slate-800 cursor-pointer"
                />
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="includePassiveVoice" className="text-slate-300 select-none">
                Include Passive Voice
                </label>
                <input
                id="includePassiveVoice"
                name="includePassiveVoice"
                type="checkbox"
                checked={options.includePassiveVoice}
                onChange={handleChange}
                disabled={isDisabled}
                className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-blue-400 focus:ring-blue-500 focus:ring-offset-slate-800 cursor-pointer"
                />
            </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-200 text-base">Detailed Examples</h3>
           <div className="flex items-center justify-between">
            <label htmlFor="includeDetailedExamples" className="text-slate-300 select-none">
              Include Example Conversions
            </label>
            <input
              id="includeDetailedExamples"
              name="includeDetailedExamples"
              type="checkbox"
              checked={options.includeDetailedExamples}
              onChange={handleChange}
              disabled={isDisabled}
              className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-blue-400 focus:ring-blue-500 focus:ring-offset-slate-800 cursor-pointer"
            />
          </div>
          {options.includeDetailedExamples && (
            <>
              <div className="flex items-center justify-between pl-4">
                <label htmlFor="numberOfExamples" className="text-slate-300 select-none">
                  Number of Examples
                </label>
                <select
                  id="numberOfExamples"
                  name="numberOfExamples"
                  value={options.numberOfExamples}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="rounded-md border-blue-500 bg-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 cursor-pointer text-slate-200"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div className="flex items-center justify-between pl-4">
                <label htmlFor="detailedExampleDifficulty" className="text-slate-300 select-none">
                  Example Difficulty
                </label>
                <select
                  id="detailedExampleDifficulty"
                  name="detailedExampleDifficulty"
                  value={options.detailedExampleDifficulty}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="rounded-md border-blue-500 bg-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 cursor-pointer text-slate-200"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div className="flex items-center justify-between pl-4">
                <label htmlFor="exampleSentenceStructure" className="text-slate-300 select-none">
                  Sentence Structure
                </label>
                <select
                  id="exampleSentenceStructure"
                  name="exampleSentenceStructure"
                  value={options.exampleSentenceStructure}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="rounded-md border-blue-500 bg-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 cursor-pointer text-slate-200"
                >
                  <option value="simple">Simple</option>
                  <option value="compound">Compound</option>
                  <option value="complex">Complex</option>
                </select>
              </div>
              <div className="flex items-center justify-between pl-4">
                <label htmlFor="exampleVocabularyLevel" className="text-slate-300 select-none">
                  Vocabulary Level
                </label>
                <select
                  id="exampleVocabularyLevel"
                  name="exampleVocabularyLevel"
                  value={options.exampleVocabularyLevel}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="rounded-md border-blue-500 bg-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 cursor-pointer text-slate-200"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
               <div className="flex items-center justify-between pl-4">
                <label htmlFor="exampleTone" className="text-slate-300 select-none">
                  Example Tone
                </label>
                <select
                  id="exampleTone"
                  name="exampleTone"
                  value={options.exampleTone}
                  onChange={handleChange}
                  disabled={isDisabled}
                  className="rounded-md border-blue-500 bg-slate-800 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm py-1 cursor-pointer text-slate-200"
                >
                  <option value="formal">Formal</option>
                  <option value="informal">Informal</option>
                  <option value="neutral">Neutral</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;

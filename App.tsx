

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
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89
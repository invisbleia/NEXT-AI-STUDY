
export interface VoiceDetails {
  formula: {
    affirmative: string;
    negative: string;
    interrogative: string;
  };
  examples: string[];
}

export interface DetailedExample {
  activeVoice: {
    urdu: string;
    english: string[];
  };
  passiveVoice?: {
    english: string[];
  };
}

export interface TenseDetails {
  tenseName: string;
  definition?: string;
  urduIdentification?: string;
  activeVoice?: VoiceDetails;
  passiveVoice?: VoiceDetails;
  detailedExamples?: DetailedExample[];
}

export interface GenerationOptions {
  includeDefinition: boolean;
  definitionLength: 'short' | 'medium' | 'long';
  includeUrduIdentification: boolean;
  includeActiveVoice: boolean;
  includePassiveVoice: boolean;
  includeDetailedExamples: boolean;
  numberOfExamples: number;
  detailedExampleDifficulty: 'easy' | 'medium' | 'hard';
  exampleSentenceStructure: 'simple' | 'compound' | 'complex';
  exampleVocabularyLevel: 'beginner' | 'intermediate' | 'advanced';
  exampleTone: 'formal' | 'informal' | 'neutral';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface EssayGenerationOptions {
  topic: string;
  language: 'English' | 'Urdu';
  length: 'very-short' | 'short' | 'medium' | 'long' | 'extra-long';
  vocabulary: 'simple' | 'intermediate' | 'advanced';
  tone: 'formal' | 'informal' | 'academic' | 'creative';
}
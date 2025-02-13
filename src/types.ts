export type ComposerMode = 'guided' | 'freeform';

export interface TestimonyState {
  mode: ComposerMode;
  content: string;
  isPrivate: boolean;
  apiKey: string;
  isLoading: boolean;
  suggestions: string[];
  setMode: (mode: ComposerMode) => void;
  setContent: (content: string) => void;
  setIsPrivate: (isPrivate: boolean) => void;
  setApiKey: (apiKey: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSuggestions: (suggestions: string[]) => void;
}

export interface Scripture {
  reference: string;
  text: string;
}

export interface AIResponse {
  suggestions: string[];
  error?: string;
}
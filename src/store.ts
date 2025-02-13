import { create } from 'zustand';
import { TestimonyState } from './types';

export const useTestimonyStore = create<TestimonyState>((set) => ({
  mode: 'guided',
  content: '',
  isPrivate: true,
  apiKey: '',
  isLoading: false,
  suggestions: [],
  setMode: (mode) => set({ mode }),
  setContent: (content) => set({ content }),
  setIsPrivate: (isPrivate) => set({ isPrivate }),
  setApiKey: (apiKey) => set({ apiKey }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setSuggestions: (suggestions) => set({ suggestions }),
}));
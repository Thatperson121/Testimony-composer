import { create } from 'zustand';
import { testimonyService } from '../services/testimony';

interface TestimonyState {
  mode: 'guided' | 'freeform';
  content: string;
  title: string;
  setMode: (mode: 'guided' | 'freeform') => void;
  setContent: (content: string) => void;
  setTitle: (title: string) => void;
  saveCurrentTestimony: () => void;
  clearCurrentTestimony: () => void;
}

export const useTestimonyStore = create<TestimonyState>((set, get) => ({
  mode: 'guided',
  content: '',
  title: 'Untitled Testimony',
  setMode: (mode) => set({ mode }),
  setContent: (content) => set({ content }),
  setTitle: (title) => set({ title }),
  saveCurrentTestimony: () => {
    const { content, title } = get();
    if (content.trim()) {
      testimonyService.createTestimony(title, content);
      // Force a re-render of components using the testimony service
      set(state => ({ ...state }));
    }
  },
  clearCurrentTestimony: () => {
    set({ content: '', title: 'Untitled Testimony' });
  }
})); 
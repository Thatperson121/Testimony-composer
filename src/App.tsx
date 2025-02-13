import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { GuidedMode } from './components/GuidedMode';
import { FreeformMode } from './components/FreeformMode';
import { ScripturePanel } from './components/ScripturePanel';
import { PrivacyControl } from './components/PrivacyControl';
import { useTestimonyStore } from './store';
import { motion } from 'framer-motion';

const AUTO_SAVE_DELAY = 1000;

function App() {
  const { mode, content } = useTestimonyStore();

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem('testimony-content', content);
    }, AUTO_SAVE_DELAY);

    return () => clearTimeout(saveTimeout);
  }, [content]);

  useEffect(() => {
    const savedContent = localStorage.getItem('testimony-content');
    if (savedContent) {
      useTestimonyStore.getState().setContent(savedContent);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 flex justify-end"
        >
          <PrivacyControl />
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {mode === 'guided' ? <GuidedMode /> : <FreeformMode />}
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <ScripturePanel />
          </motion.div>
        </div>
      </main>
    </div>
  );
}

export default App
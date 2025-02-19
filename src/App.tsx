import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { GuidedMode } from './components/GuidedMode';
import { FreeformMode } from './components/FreeformMode';
import { ScripturePanel } from './components/ScripturePanel';
import { PrivacyControl } from './components/PrivacyControl';
import { Sidebar } from './components/Sidebar';
import { useTestimonyStore } from './store';
import { motion } from 'framer-motion';
import { Auth } from './components/Auth';
import { useAuthStore } from './store/authStore';

const AUTO_SAVE_DELAY = 1000;

function App() {
  const { mode, content, saveCurrentTestimony } = useTestimonyStore();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { user } = useAuthStore();

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

  const handleSave = () => {
    if (!content.trim()) {
      alert('Please add some content before saving');
      return;
    }
    
    setSaveStatus('saving');
    saveCurrentTestimony();
    setSaveStatus('saved');
    
    // Reset status after 2 seconds
    setTimeout(() => {
      setSaveStatus('idle');
    }, 2000);
  };

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 ml-[50px]">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex justify-between items-center"
          >
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className={`px-4 py-2 rounded-lg transition-colors ${
                saveStatus === 'saved'
                  ? 'bg-green-500 text-white'
                  : saveStatus === 'saving'
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saveStatus === 'saved' 
                ? 'Saved!' 
                : saveStatus === 'saving' 
                ? 'Saving...' 
                : 'Save Testimony'}
            </button>
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
    </div>
  );
}

export default App
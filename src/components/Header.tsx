import React from 'react';
import { BookOpen, Edit, Settings } from 'lucide-react';
import { useTestimonyStore } from '../store';
import type { ComposerMode } from '../types';
import { motion } from 'framer-motion';

export function Header() {
  const { mode, setMode, apiKey, setApiKey } = useTestimonyStore();
  const [showSettings, setShowSettings] = React.useState(false);

  const handleModeChange = (newMode: ComposerMode) => {
    setMode(newMode);
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold"
          >
            Testimony Composer
          </motion.h1>
          <div className="flex items-center space-x-4">
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => handleModeChange('guided')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  mode === 'guided'
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Guided</span>
              </button>
              <button
                onClick={() => handleModeChange('freeform')}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                  mode === 'freeform'
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Edit className="w-4 h-4" />
                <span>Freeform</span>
              </button>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white/10 rounded-lg"
          >
            <label className="block">
              <span className="text-sm font-medium">OpenAI API Key</span>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="mt-1 block w-full rounded-md bg-white/5 border-transparent focus:border-white focus:bg-white/10 focus:ring-0 text-sm"
                placeholder="sk-..."
              />
            </label>
          </motion.div>
        )}
      </div>
    </header>
  );
}
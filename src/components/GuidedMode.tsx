import React, { useEffect } from 'react';
import { useTestimonyStore } from '../store';
import { getAISuggestions } from '../services/ai';
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

const prompts = [
  "How did you first gain your testimony?",
  "What experiences have strengthened your faith?",
  "How has the Savior influenced your life?",
  "What principles of the gospel are most meaningful to you?",
  "How has prayer and scripture study affected your testimony?"
];

export function GuidedMode() {
  const { content, setContent, apiKey, isLoading, setIsLoading, suggestions, setSuggestions } = useTestimonyStore();
  const [error, setError] = React.useState<string | null>(null);

  const getSuggestions = async () => {
    if (!content.trim()) {
      setError('Please write some content first to get suggestions.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getAISuggestions(content, apiKey);
      if (response.error) {
        setError(response.error);
      } else {
        setSuggestions(response.suggestions);
      }
    } catch (err) {
      setError('Failed to get suggestions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 rounded-xl"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80")'
          }}
        />
        <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Writing Prompts</h2>
          <ul className="space-y-3">
            {prompts.map((prompt, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 text-gray-700"
              >
                <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm">
                  {index + 1}
                </span>
                <span>{prompt}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <TextareaAutosize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
          placeholder="Begin writing your testimony..."
          minRows={10}
        />
        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={getSuggestions}
            disabled={isLoading}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Sparkles className="w-5 h-5" />
            )}
            <span>Get AI Suggestions</span>
          </button>
          
          <div className="text-sm text-gray-500">
            {content.length} characters
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50 rounded-lg"
          >
            <h3 className="text-lg font-medium text-blue-800 mb-3">AI Suggestions</h3>
            <ul className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-2 text-blue-700"
                >
                  <span className="flex-shrink-0 mt-1">•</span>
                  <span>{suggestion}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
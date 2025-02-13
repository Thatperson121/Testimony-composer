import React from 'react';
import { useTestimonyStore } from '../store';
import TextareaAutosize from 'react-textarea-autosize';
import { motion } from 'framer-motion';

export function FreeformMode() {
  const { content, setContent } = useTestimonyStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative min-h-[calc(100vh-16rem)]"
    >
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5 rounded-xl"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1519817914152-22d216bb9170?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80")'
        }}
      />
      <div className="relative">
        <TextareaAutosize
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-lg"
          placeholder="Express your testimony freely..."
          minRows={20}
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-500">
          {content.length} characters
        </div>
      </div>
    </motion.div>
  );
}
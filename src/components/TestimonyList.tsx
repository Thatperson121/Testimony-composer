import React from 'react';
import { testimonyService } from '../services/testimony';
import { motion } from 'framer-motion';

export const TestimonyList: React.FC = () => {
  const testimonies = testimonyService.getAllTestimonies();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6">Saved Testimonies</h2>
      {testimonies.length === 0 ? (
        <p className="text-gray-500">No saved testimonies yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {testimonies.map((testimony) => (
            <motion.div
              key={testimony.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2">{testimony.title}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {testimony.content.substring(0, 150)}...
              </p>
              <div className="text-xs text-gray-400">
                Last updated: {new Date(testimony.updatedAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}; 
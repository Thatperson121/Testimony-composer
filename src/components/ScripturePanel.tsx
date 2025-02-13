import React from 'react';
import { testimonyScriptures } from '../data/scriptures';

export function ScripturePanel() {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Inspiring Scriptures</h2>
      <div className="space-y-4">
        {testimonyScriptures.map((scripture, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-blue-700">{scripture.reference}</h3>
            <p className="mt-2 text-gray-600">{scripture.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { Lock, Unlock } from 'lucide-react';
import { useTestimonyStore } from '../store';

export function PrivacyControl() {
  const { isPrivate, setIsPrivate } = useTestimonyStore();

  return (
    <button
      onClick={() => setIsPrivate(!isPrivate)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
        isPrivate
          ? 'bg-green-100 text-green-700'
          : 'bg-yellow-100 text-yellow-700'
      }`}
    >
      {isPrivate ? (
        <>
          <Lock className="w-4 h-4" />
          <span>Private Mode</span>
        </>
      ) : (
        <>
          <Unlock className="w-4 h-4" />
          <span>Public Mode</span>
        </>
      )}
    </button>
  );
}
'use client';

import { useState } from 'react';

interface ModeBannerProps {
  isLiveMode: boolean;
  onModeToggle: (isLive: boolean) => void;
  hasApiKey: boolean;
}

export default function ModeBanner({ isLiveMode, onModeToggle, hasApiKey }: ModeBannerProps) {
  return (
    <div className={`border-b px-4 py-3 ${isLiveMode ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full ${isLiveMode ? 'bg-green-500' : 'bg-blue-500'}`} />
            <span className={`font-medium text-sm ${isLiveMode ? 'text-green-700' : 'text-blue-700'}`}>
              {isLiveMode ? 'Live Mode' : 'Demo Mode'}
            </span>
          </div>
          <span className={`text-sm ${isLiveMode ? 'text-green-600' : 'text-blue-600'}`}>
            {isLiveMode 
              ? 'Running live AI evaluations with your API key'
              : 'Showing pre-computed results. Add your own Anthropic API key to run live.'
            }
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-600">Demo</span>
          <button
            onClick={() => onModeToggle(!isLiveMode)}
            disabled={!hasApiKey}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
              isLiveMode ? 'bg-green-600' : 'bg-gray-200'
            } ${!hasApiKey ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={!hasApiKey ? 'Add an API key to enable live mode' : ''}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isLiveMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-gray-600">Live</span>
        </div>
      </div>
    </div>
  );
}
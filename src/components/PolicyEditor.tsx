'use client';

import { useState } from 'react';

interface PolicyEditorProps {
  isLiveMode: boolean;
  onCompile: (policies: string) => void;
  isLoading: boolean;
}

const DEFAULT_POLICIES = `If a customer mentions a food allergy, always notify the restaurant before placing the order.

Never offer a refund larger than $50 without escalating to a human supervisor.

If an order is more than 60 minutes late, proactively offer a credit.

Do not share another customer's order details under any circumstances.`;

export default function PolicyEditor({ isLiveMode, onCompile, isLoading }: PolicyEditorProps) {
  const [policies, setPolicies] = useState(DEFAULT_POLICIES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompile(policies);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg h-full">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-medium text-gray-900">Policies</h2>
        <p className="text-sm text-gray-600">Write your business policies in plain English</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 h-full flex flex-col">
        <div className="flex-1">
          <textarea
            value={policies}
            onChange={(e) => setPolicies(e.target.value)}
            disabled={!isLiveMode}
            className={`w-full h-full min-h-96 p-3 border border-gray-300 rounded-md text-sm font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isLiveMode ? 'bg-gray-50 text-gray-600' : ''
            }`}
            placeholder="Enter your policies here, one per line..."
          />
        </div>
        
        <div className="mt-4">
          <button
            type="submit"
            disabled={!isLiveMode || isLoading || !policies.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? 'Compiling...' : 'Compile Policies'}
          </button>
        </div>
      </form>
    </div>
  );
}
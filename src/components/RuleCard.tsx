'use client';

import { useState } from 'react';
import { Rule, Scenario } from '@/lib/schema';

interface RuleCardProps {
  rule: Rule;
  scenarios?: Scenario[];
  onRunTests?: (rule: Rule) => void;
  isLoading?: boolean;
}

export default function RuleCard({ rule, scenarios, onRunTests, isLoading }: RuleCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getConstraintBadgeColor = (type: string) => {
    switch (type) {
      case 'MUST_DO': return 'bg-green-100 text-green-800';
      case 'MUST_NOT_DO': return 'bg-red-100 text-red-800';
      case 'CONDITIONAL': return 'bg-blue-100 text-blue-800';
      case 'ESCALATE': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConstraintBadgeColor(rule.constraintType)}`}>
                {rule.constraintType.replace('_', ' ')}
              </span>
              <span className="text-xs text-gray-500">#{rule.intent}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">{rule.restatement}</h3>
            <p className="text-xs text-gray-600">{rule.sourceText}</p>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 text-gray-400 hover:text-gray-600"
          >
            <svg 
              className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {onRunTests && (
          <div className="mt-3">
            <button
              onClick={() => onRunTests(rule)}
              disabled={isLoading}
              className="w-full bg-gray-100 text-gray-700 py-2 px-3 rounded text-sm hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating Tests...' : 'Generate Test Scenarios'}
            </button>
          </div>
        )}

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 text-xs">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <span className="font-medium text-gray-700">Trigger:</span>
                <p className="text-gray-600 mt-1">{rule.trigger}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Required Behavior:</span>
                <p className="text-gray-600 mt-1">{rule.requiredBehavior}</p>
              </div>
              {rule.parameters.length > 0 && (
                <div>
                  <span className="font-medium text-gray-700">Parameters:</span>
                  <ul className="mt-1 space-y-1">
                    {rule.parameters.map((param, idx) => (
                      <li key={idx} className="text-gray-600">
                        <span className="font-mono text-xs">{param.name}</span>: {param.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {rule.toolBoundary && (
                <div>
                  <span className="font-medium text-gray-700">Tool Boundary:</span>
                  <p className="text-gray-600 mt-1">{rule.toolBoundary}</p>
                </div>
              )}
            </div>

            {scenarios && scenarios.length > 0 && (
              <div className="mt-4 pt-3 border-t border-gray-100">
                <span className="font-medium text-gray-700">Test Scenarios:</span>
                <div className="mt-2 space-y-2">
                  {scenarios.map((scenario) => (
                    <div key={scenario.id} className="bg-gray-50 p-2 rounded text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          scenario.kind === 'DIRECT' ? 'bg-green-100 text-green-700' :
                          scenario.kind === 'ADVERSARIAL' ? 'bg-red-100 text-red-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {scenario.kind}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-1">{scenario.userGoal}</p>
                      <p className="text-gray-600 italic">"{scenario.openingMessage}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
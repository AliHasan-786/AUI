'use client';

import { ScorecardEntry } from '@/lib/schema';
import DriftMeter from './DriftMeter';

interface ScorecardProps {
  entries: ScorecardEntry[];
  onViewTranscript?: (scenarioId: string) => void;
}

export default function Scorecard({ entries, onViewTranscript }: ScorecardProps) {
  if (entries.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg h-full flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-sm">Scorecard will appear here</p>
          <p className="text-xs mt-1">Compile policies and run tests to see results</p>
        </div>
      </div>
    );
  }

  const overallAdherence = entries.reduce((sum, entry) => sum + entry.adherenceRate, 0) / entries.length;
  const totalTests = entries.reduce((sum, entry) => sum + entry.verdicts.length, 0);
  const passedTests = entries.reduce((sum, entry) => 
    sum + entry.verdicts.filter(v => v.upheld).length, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-lg h-full">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-lg font-medium text-gray-900">Policy Adherence Scorecard</h2>
        <div className="mt-2 flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${overallAdherence >= 0.9 ? 'bg-green-500' : overallAdherence >= 0.7 ? 'bg-yellow-500' : 'bg-red-500'}`} />
            <span className="font-medium">{Math.round(overallAdherence * 100)}% Overall Adherence</span>
          </div>
          <span className="text-gray-600">{passedTests}/{totalTests} tests passed</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {entries.map((entry) => {
          const violations = entry.verdicts.filter(v => !v.upheld);
          const hasViolations = violations.length > 0;
          const hasDrift = entry.driftRuns.some(run => run !== entry.driftRuns[0]);

          return (
            <div key={entry.rule.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{entry.rule.restatement}</h3>
                  <div className="mt-1 flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${
                      entry.adherenceRate === 1 ? 'bg-green-500' :
                      entry.adherenceRate >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-xs text-gray-600">
                      {Math.round(entry.adherenceRate * 100)}% adherence
                    </span>
                    {hasDrift && (
                      <span className="text-xs text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded">
                        Non-deterministic
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="text-right text-xs text-gray-600">
                  {entry.verdicts.filter(v => v.upheld).length}/{entry.verdicts.length} passed
                </div>
              </div>

              {hasViolations && (
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-red-700 mb-2">Violations Found:</h4>
                  <div className="space-y-2">
                    {violations.map((violation) => {
                      const scenario = entry.scenarios.find(s => s.id === violation.scenarioId);
                      return (
                        <div key={violation.scenarioId} className="bg-red-50 border border-red-200 rounded p-2">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <span className="text-xs font-medium text-red-800">
                                {scenario?.kind} scenario
                              </span>
                              <p className="text-xs text-red-700 mt-1">{violation.reasoning}</p>
                              {violation.violatingTurnIndex !== null && (
                                <p className="text-xs text-red-600 mt-1">
                                  Violated at turn {violation.violatingTurnIndex + 1}
                                </p>
                              )}
                            </div>
                            {onViewTranscript && (
                              <button
                                onClick={() => onViewTranscript(violation.scenarioId)}
                                className="ml-2 text-xs text-red-600 hover:text-red-800 underline"
                              >
                                View transcript
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {hasDrift && (
                <div className="mt-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Consistency across runs:</h4>
                  <DriftMeter driftRuns={entry.driftRuns} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
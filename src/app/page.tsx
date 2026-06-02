'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import ModeBanner from '@/components/ModeBanner';
import PolicyEditor from '@/components/PolicyEditor';
import RuleCard from '@/components/RuleCard';
import Scorecard from '@/components/Scorecard';
import Transcript from '@/components/Transcript';
import { Rule, Scenario, ScorecardEntry } from '@/lib/schema';
import { demoRules, demoScenarios, demoScorecardEntries, demoTranscripts, demoVerdicts } from '@/lib/demoData';

export default function Home() {
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [rules, setRules] = useState<Rule[]>(demoRules);
  const [scenarios, setScenarios] = useState<Record<string, Scenario[]>>(
    demoScenarios.reduce((acc, scenario) => {
      if (!acc[scenario.ruleId]) acc[scenario.ruleId] = [];
      acc[scenario.ruleId].push(scenario);
      return acc;
    }, {} as Record<string, Scenario[]>)
  );
  const [scorecardEntries, setScorecardEntries] = useState<ScorecardEntry[]>(demoScorecardEntries);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isGeneratingTests, setIsGeneratingTests] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<{
    transcript: Array<{ role: 'user' | 'agent'; content: string }>;
    violatingTurnIndex?: number | null;
  } | null>(null);

  const handleModeToggle = (isLive: boolean) => {
    if (isLive && !apiKey) {
      // Show API key input
      const key = prompt('Enter your Anthropic API key:');
      if (key) {
        setApiKey(key);
        setIsLiveMode(true);
      }
    } else {
      setIsLiveMode(isLive);
    }
  };

  const handleCompilePolicies = async (policies: string) => {
    if (!isLiveMode) return;
    
    setIsCompiling(true);
    try {
      // Placeholder for actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // For now, just create some mock rules
      const mockRules: Rule[] = [
        {
          id: '1',
          sourceText: policies.split('\n')[0],
          intent: 'allergy_notification',
          constraintType: 'MUST_DO',
          parameters: [{ name: 'allergy_type', description: 'Type of food allergy mentioned' }],
          toolBoundary: 'restaurant_notification_system',
          restatement: 'When a customer mentions a food allergy, the agent must notify the restaurant.',
          trigger: 'Customer mentions any food allergy',
          requiredBehavior: 'Immediately notify restaurant before order placement'
        }
      ];
      setRules(mockRules);
    } catch (error) {
      console.error('Failed to compile policies:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleRunTests = async (rule: Rule) => {
    if (!isLiveMode) return;
    
    setIsGeneratingTests(true);
    try {
      // Placeholder for actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock scenarios
      const mockScenarios: Scenario[] = [
        {
          id: '1',
          ruleId: rule.id,
          kind: 'DIRECT',
          userGoal: 'Order food while mentioning allergy',
          openingMessage: 'Hi, I\'d like to order a pizza but I\'m allergic to nuts.',
          successCondition: 'Agent notifies restaurant about nut allergy',
          violationCondition: 'Agent places order without notifying restaurant'
        }
      ];
      setScenarios(prev => ({ ...prev, [rule.id]: mockScenarios }));
    } catch (error) {
      console.error('Failed to generate tests:', error);
    } finally {
      setIsGeneratingTests(false);
    }
  };

  const handleViewTranscript = (scenarioId: string) => {
    const transcript = demoTranscripts[scenarioId];
    const verdict = demoVerdicts.find(v => v.scenarioId === scenarioId);
    
    if (transcript) {
      setSelectedTranscript({
        transcript,
        violatingTurnIndex: verdict?.violatingTurnIndex || null
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ModeBanner 
        isLiveMode={isLiveMode} 
        onModeToggle={handleModeToggle}
        hasApiKey={!!apiKey}
      />
      
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Policy Editor */}
          <div className="lg:col-span-1">
            <PolicyEditor 
              isLiveMode={isLiveMode}
              onCompile={handleCompilePolicies}
              isLoading={isCompiling}
            />
          </div>

          {/* Center Panel - Rules */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg h-full">
              <div className="border-b border-gray-200 px-4 py-3">
                <h2 className="text-lg font-medium text-gray-900">Compiled Rules</h2>
                <p className="text-sm text-gray-600">Structured policies with generated test scenarios</p>
              </div>
              
              <div className="p-4 h-full overflow-y-auto">
                {rules.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <p className="text-sm">Rules will appear here</p>
                      <p className="text-xs mt-1">Compile your policies to get started</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rules.map((rule) => (
                      <RuleCard
                        key={rule.id}
                        rule={rule}
                        scenarios={scenarios[rule.id]}
                        onRunTests={handleRunTests}
                        isLoading={isGeneratingTests}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Scorecard */}
          <div className="lg:col-span-1">
            <Scorecard 
              entries={scorecardEntries}
              onViewTranscript={handleViewTranscript}
            />
          </div>
        </div>
      </div>

      {selectedTranscript && (
        <Transcript
          transcript={selectedTranscript.transcript}
          violatingTurnIndex={selectedTranscript.violatingTurnIndex}
          onClose={() => setSelectedTranscript(null)}
        />
      )}
    </div>
  );
}
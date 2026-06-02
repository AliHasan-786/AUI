'use client';

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

interface DriftMeterProps {
  driftRuns: number[];
}

export default function DriftMeter({ driftRuns }: DriftMeterProps) {
  const data = driftRuns.map((count, index) => ({
    run: `Run ${index + 1}`,
    passed: count,
    failed: 3 - count, // Assuming 3 scenarios per rule
  }));

  const getBarColor = (passed: number) => {
    if (passed === 3) return '#10b981'; // green-500
    if (passed >= 2) return '#f59e0b'; // yellow-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="h-24">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis 
            dataKey="run" 
            axisLine={false} 
            tickLine={false}
            tick={{ fontSize: 10, fill: '#6b7280' }}
          />
          <YAxis hide domain={[0, 3]} />
          <Bar dataKey="passed" radius={[2, 2, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.passed)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
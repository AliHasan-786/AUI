'use client';

interface TranscriptProps {
  transcript: Array<{
    role: 'user' | 'agent';
    content: string;
  }>;
  violatingTurnIndex?: number | null;
  onClose: () => void;
}

export default function Transcript({ transcript, violatingTurnIndex, onClose }: TranscriptProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Conversation Transcript</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="overflow-y-auto p-4 max-h-80">
          <div className="space-y-4">
            {transcript.map((turn, index) => (
              <div
                key={index}
                className={`${
                  index === violatingTurnIndex 
                    ? 'bg-red-50 border-l-4 border-red-500 pl-4' 
                    : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                    turn.role === 'user' ? 'bg-blue-500' : 'bg-gray-600'
                  }`}>
                    {turn.role === 'user' ? 'U' : 'A'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {turn.role === 'user' ? 'Customer' : 'Agent'}
                      </span>
                      {index === violatingTurnIndex && (
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                          Policy Violation
                        </span>
                      )}
                    </div>
                    <div className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                      {turn.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
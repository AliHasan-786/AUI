'use client';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Agent Policy Compiler
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Author agent policies in plain English. Auto-generate the tests. Measure whether the agent actually complies.
            </p>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            How it works
          </button>
        </div>
      </div>
    </header>
  );
}
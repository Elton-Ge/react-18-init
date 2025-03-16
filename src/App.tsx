import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Test from './components/Test';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container mx-auto py-8 px-4 bg-green-500">
      <div className="flex justify-center space-x-4 mb-6">
        <a href="https://vite.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={viteLogo} className="h-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="hover:opacity-80 transition-opacity">
          <img src={reactLogo} className="h-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-center mb-8">Vite + React + Tailwind + React Query</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Counter Example</h2>
        <div className="flex flex-col items-center">
          <button
            onClick={() => setCount((count) => count + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors mb-4"
          >
            Count is {count}
          </button>
          <p className="text-gray-600 dark:text-gray-300">
            Edit{' '}
            <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">src/App.tsx</code>{' '}
            and save to test HMR
          </p>
        </div>
      </div>

      <p className="text-center text-gray-500 dark:text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
      <Test />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import bg from './assets/bg.png'

export default function BingoApp() {
  const letters = ['B', 'I', 'N', 'G', 'O'];
  const ranges = [
    [1, 15],   // B
    [16, 30],  // I
    [31, 45],  // N
    [46, 60],  // G
    [61, 75],  // O
  ];

  // Generate Bingo board numbers by ranges
  const bingoBoard = ranges.map(([start, end]) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i)
  );

  const [highlighted, setHighlighted] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');

  const handleEnter = () => {
    const num = parseInt(inputValue, 10);
    if (Number.isNaN(num)) {
      setMessage('Please enter a number.');
      return;
    }
    if (num < 1 || num > 75) {
      setMessage('Number must be between 1 and 75.');
      return;
    }
    if (highlighted[num]) {
      setMessage(`Number ${num} already marked.`);
      setInputValue('');
      return;
    }
    setHighlighted((prev) => ({ ...prev, [num]: true }));
    setInputValue('');
    setMessage('');
  };

  const handleClear = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    setHighlighted({});
    setInputValue('');
    setShowConfirm(false);
    setMessage('');
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ 
        backgroundImage: `url(${bg})`, 
        backgroundSize: "100% 100%", 
        backgroundRepeat: "no-repeat", 
        backgroundPosition: "center" 
      }}
    >
      <div className="w-full max-w-5xl bg-white/60 p-4 rounded-xl shadow-md">
        <div className="flex flex-col gap-4">
          {letters.map((letter, colIndex) => (
            <div key={letter} className="flex items-start gap-3">
              <div className="w-12 text-3xl font-bold">{letter}</div>
              <div className="flex flex-wrap gap-2">
                {bingoBoard[colIndex].map((num) => (
                  <div
                    key={num}
                    className={`w-12 h-12 flex items-center justify-center border rounded-full transition
                      ${highlighted[num] 
                        ? 'bg-green-500 text-white font-bold border-green-700' 
                        : 'invisible'
                      }`}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3">
        <input
          type="number"
          min="1"
          max="75"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
          placeholder="Enter number 1-75"
          className="px-3 py-2 border rounded w-40"
        />
        <button onClick={handleEnter} className="px-4 py-2 bg-blue-600 text-white rounded">Enter</button>
        <button onClick={handleClear} className="px-4 py-2 bg-red-600 text-white rounded">Clear</button>
      </div>
      {message && <div className="mt-3 text-sm text-red-600">{message}</div>}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="mb-4 font-semibold">Are you sure you want to clear all numbers?</p>
            <div className="flex gap-3">
              <button onClick={confirmClear} className="px-4 py-2 bg-red-600 text-white rounded">Yes</button>
              <button onClick={cancelClear} className="px-4 py-2 bg-gray-300 rounded">No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

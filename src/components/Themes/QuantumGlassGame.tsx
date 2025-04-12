"use client";
import { useState, useEffect } from 'react';
import { calculateWinner } from "@/lib/CalculateWinner";

function Square({ value, onSquareClick }: { value: string | null, onSquareClick: () => void }) {
  return (
    <button
      className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-4xl font-bold rounded-xl transition-all duration-300
      ${value === 'X' ? 'text-cyan-400' : 'text-amber-400'}
      ${value ? 'cursor-default' : 'cursor-pointer hover:bg-white/10 active:scale-95'}
      backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

export default function QuantumGlassGame() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const [animateBg, setAnimateBg] = useState(false);

  useEffect(() => {
    setAnimateBg(true);
    const timer = setTimeout(() => setAnimateBg(false), 1000);
    return () => clearTimeout(timer);
  }, [currentMove]);

  function handlePlay(nextSquares: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const winner = calculateWinner(currentSquares);
  let status;
  if (winner) {
    status = `🏆 ${winner} wins!`;
  } else if (currentSquares.every(Boolean)) {
    status = '🤝 Draw!';
  } else {
    status = `${xIsNext ? 'X' : 'O'}'s turn`;
  }

  const moves = history.map((_, move) => {
    const isCurrent = move === currentMove;
    const description = move > 0 ? `Move #${move}` : 'Game start';
    
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className={`w-full px-4 py-2 rounded-lg text-left transition-all
          ${isCurrent ? 
            'bg-white/20 text-white font-medium shadow-inner' : 
            'bg-transparent text-white/70 hover:bg-white/10'}`}
        >
          {isCurrent && '▶ '}{description}
        </button>
      </li>
    );
  });

  return (
    <div className={`min-h-screen p-4 transition-all duration-1000
      ${animateBg ? 'bg-gradient-to-br from-indigo-900/90 to-purple-900/90' : 
         'bg-gradient-to-br from-indigo-900 to-purple-900'}`}>
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 mt-8 text-transparent bg-clip-text 
          bg-gradient-to-r from-cyan-400 to-blue-400">
          Quantum Tic-Tac-Toe
        </h1>
        
        <div className="backdrop-blur-lg bg-white/5 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <div className="p-6">
            <div className="flex flex-col items-center gap-6">
              <div className={`text-2xl font-medium px-6 py-3 rounded-full backdrop-blur-sm
                ${winner ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 
                  'bg-gradient-to-r from-purple-400 to-indigo-500'} 
                text-white shadow-lg animate-pulse-slow`}>
                {status}
              </div>
              
              <div className="grid grid-cols-3 gap-3 bg-gradient-to-br from-white/5 to-white/20 p-4 rounded-2xl border border-white/10 shadow-xl">
                {[...Array(9)].map((_, i) => (
                  <Square 
                    key={i} 
                    value={currentSquares[i]} 
                    onSquareClick={() => {
                      if (!currentSquares[i] && !winner) {
                        const nextSquares = currentSquares.slice();
                        nextSquares[i] = xIsNext ? 'X' : 'O';
                        handlePlay(nextSquares);
                      }
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 p-5 border-t border-white/10">
            <h2 className="text-xl font-semibold mb-4 text-white/80 flex items-center gap-2">
              <span className="bg-white/10 px-2 py-1 rounded">⏳</span> Game Timeline
            </h2>
            <ol className="max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {moves}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
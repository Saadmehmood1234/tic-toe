"use client";
import { useState } from 'react';
import { calculateWinner } from "@/lib/CalculateWinner";

function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button 
      className={`w-20 h-20 text-3xl font-bold border-2 border-indigo-200 rounded-lg 
      transition-all duration-200 hover:bg-indigo-50 active:scale-95
      ${value === 'X' ? 'text-indigo-600' : 'text-pink-400'}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function PastelDreamGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

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
    status = `Winner: ${winner}`;
  } else if (currentSquares.every(Boolean)) {
    status = 'Game ended in a draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move} className="mb-2">
        <button 
          onClick={() => jumpTo(move)}
          className={`px-3 py-1 rounded-md text-sm transition-colors
          ${move === currentMove ? 'bg-indigo-500 text-white' : 'bg-white hover:bg-indigo-100 text-indigo-800'}`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-indigo-600">Tic-Tac-Toe</h1>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden p-6 border border-indigo-100">
        <div className="game-board mb-8">
          <div className="flex flex-col items-center gap-4">
            <div className={`text-xl font-semibold p-3 rounded-lg w-full text-center 
              ${winner ? 'bg-pink-100 text-pink-800' : 'bg-indigo-100 text-indigo-800'}`}>
              {status}
            </div>
            <div className="grid grid-cols-3 gap-2">
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
        <div className="game-info">
          <h2 className="text-lg font-semibold mb-3 text-indigo-700">Game History</h2>
          <ol className="space-y-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
}
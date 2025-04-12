"use client";
import { useState } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";

function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button
      onClick={onSquareClick}
      className="w-20 h-20 md:w-24 md:h-24 text-2xl md:text-3xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-200"
    >
      {value}
    </button>
  );
}

export default function NeonGradientGame() {
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
  const status = winner
    ? `🎉 Winner: ${winner}`
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move} className="mb-2">
        <button
          className="w-full text-left px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded shadow hover:scale-105 transition-transform"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2f] via-[#2c2c47] to-[#1b1b2e] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl w-full">
        <div className="game-board">
          <div className="text-center space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-white bg-indigo-700 px-4 py-2 rounded-md shadow-md inline-block">
              {status}
            </h2>
            <div className="grid grid-cols-3 gap-4 justify-center">
              {currentSquares.map((val, i) => (
                <Square 
                  key={i} 
                  value={val} 
                  onSquareClick={() => {
                    if (!val && !winner) {
                      const nextSquares = currentSquares.slice();
                      nextSquares[i] = xIsNext ? "X" : "O";
                      handlePlay(nextSquares);
                    }
                  }} 
                />
              ))}
            </div>
          </div>
        </div>
        <div className="game-info bg-white/10 backdrop-blur-md rounded-xl p-4 w-full md:w-64 text-white shadow-lg">
          <h3 className="text-xl font-semibold mb-3 text-center">History</h3>
          <ol className="space-y-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
}
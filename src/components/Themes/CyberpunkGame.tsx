"use client";
import { useState } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";

function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button
      onClick={onSquareClick}
      className="w-20 h-20 md:w-24 md:h-24 text-3xl font-bold flex items-center justify-center rounded-md bg-[#111] text-lime-300 border border-lime-500 shadow-[0_0_10px_#39ff14] hover:shadow-[0_0_20px_#39ff14] transition-all duration-200"
    >
      {value}
    </button>
  );
}

export default function CyberpunkGame() {
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
    ? `👾 WINNER: ${winner}`
    : currentSquares.every(Boolean)
    ? "⚡ DRAW ⚡"
    : `➡️ TURN: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((_, move) => {
    const description = move ? `MOVE #${move}` : "START";
    return (
      <li key={move} className="mb-1">
        <button 
          onClick={() => jumpTo(move)}
          className="text-green-400 hover:text-pink-400 text-xs font-mono transition-colors"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f0f0f] to-[#1c1c1c] p-6 text-white flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 max-w-5xl w-full">
        <div className="bg-[#1c1c1c] p-6 rounded-xl border border-lime-500 shadow-[0_0_20px_#39ff14] w-full md:w-2/3">
          <div className="text-center space-y-6">
            <h1 className="text-2xl md:text-3xl font-mono text-pink-400 tracking-widest">
              CYBER TAC-TOE
            </h1>
            <div className="text-xl font-mono text-pink-400 tracking-widest">
              {status}
            </div>
            <div className="grid grid-cols-3 gap-3">
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
        <div className="w-full md:w-1/3 bg-[#1a1a1a] p-4 rounded-xl border border-lime-500/30 shadow-inner">
          <h2 className="text-pink-500 font-mono mb-4 text-sm tracking-widest">MOVE LOG</h2>
          <ol className="space-y-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
}
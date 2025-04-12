"use client";
import { useState } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";

function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button
      onClick={onSquareClick}
      className="w-20 h-20 md:w-24 md:h-24 text-3xl font-black flex items-center justify-center rounded-xl bg-[#1e1e2f] text-white shadow-[inset_6px_6px_10px_#1a1a2a,inset_-6px_-6px_10px_#22223a] hover:shadow-[inset_2px_2px_5px_#111, inset_-2px_-2px_5px_#333] transition-all duration-300"
    >
      {value}
    </button>
  );
}

export default function NeonGlowGame() {
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
    ? `🏆 Winner: ${winner}`
    : `🕹️ Next: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((_, move) => {
    const description = move ? `🔁 Move #${move}` : "🔄 Start Game";
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className="w-full text-left px-4 py-2 text-sm bg-white/10 text-white rounded-md hover:bg-white/20 transition-all"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-start gap-10 w-full max-w-6xl">
        <div className="game-board bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl w-full md:w-2/3">
          <div className="text-center space-y-6">
            <h2 className="text-lg md:text-xl font-bold text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-lg shadow-md inline-block">
              {status}
            </h2>
            <div className="grid grid-cols-3 gap-6 mx-auto w-fit">
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
        <div className="game-info bg-white/10 backdrop-blur-md p-6 rounded-2xl w-full md:w-1/3 shadow-lg text-white">
          <h3 className="text-2xl font-bold mb-4 text-center">📜 Move History</h3>
          <ol className="space-y-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
}
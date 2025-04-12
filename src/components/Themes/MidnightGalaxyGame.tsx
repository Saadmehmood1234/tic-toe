"use client";
import { useState, useEffect } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";
function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button
      className={`w-20 h-20 md:w-24 md:h-24 text-3xl font-bold rounded-lg transition-all duration-300
      ${value ? "cursor-default" : "cursor-pointer hover:bg-indigo-900/30 active:scale-95"}
      ${value === "X" ? "text-purple-300 glow-purple" : "text-blue-300 glow-blue"}
      bg-gray-900/50 border-2 ${value ? "border-purple-400/40" : "border-indigo-900"} 
      shadow-lg hover:shadow-xl relative overflow-hidden`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
      {!value && (
        <div className="absolute inset-0 opacity-20 hover:opacity-30 transition-opacity">
          <div className="absolute w-1 h-1 bg-white rounded-full top-1/4 left-1/4"></div>
          <div className="absolute w-1 h-1 bg-blue-400 rounded-full top-3/4 left-3/4"></div>
        </div>
      )}
    </button>
  );
}

export default function MidnightGalaxyGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [stars, setStars] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  // Create twinkling stars
  useEffect(() => {
    const newStars = [];
    for (let i = 0; i < 50; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 0.5
      });
    }
    setStars(newStars);
  }, []);

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
    ? `✨ Cosmic Winner: ${winner}`
    : currentSquares.every(Boolean)
    ? "🌌 Stalemate in Space"
    : `Next: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Move ${move}` : "Big Bang";
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className={`w-full px-3 py-2 text-sm rounded-lg transition-all
          ${
            move === currentMove
              ? "bg-purple-900/50 text-purple-100 border border-purple-400/40"
              : "bg-indigo-900/30 text-indigo-300 hover:bg-indigo-900/50 hover:text-white border border-indigo-800"
          }`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-950 to-gray-900 p-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated stars background */}
      {stars.map(star => (
        <div 
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            opacity: Math.random() * 0.7 + 0.3
          }}
        />
      ))}

      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text 
        bg-gradient-to-r from-purple-300 via-blue-300 to-purple-400 relative z-10">
        COSMIC TAC-TOE
      </h1>

      <div className={`text-xl mb-6 px-6 py-3 rounded-full font-mono relative z-10
        ${winner ? "bg-purple-900/50 text-purple-200" : "bg-indigo-900/50 text-blue-200"}
        border border-blue-400/30 shadow-lg backdrop-blur-sm`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-gray-900/50 backdrop-blur-sm 
        border-2 border-indigo-900 rounded-xl shadow-2xl relative z-10">
        {currentSquares.map((val, i) => (
          <Square key={i} value={val} onSquareClick={() => {
            if (!val && !winner) {
              const nextSquares = currentSquares.slice();
              nextSquares[i] = xIsNext ? "X" : "O";
              handlePlay(nextSquares);
            }
          }} />
        ))}
      </div>

      <div className="w-full max-w-md bg-indigo-900/30 backdrop-blur-sm p-4 rounded-xl 
        border border-indigo-800 shadow-lg relative z-10">
        <h2 className="text-lg font-semibold mb-3 text-blue-300 flex items-center justify-center gap-2">
          <span className="text-purple-300">✦</span> 
          GAME TIMELINE 
          <span className="text-purple-300">✦</span>
        </h2>
        <ol className="grid grid-cols-3 gap-2">{moves}</ol>
      </div>

      {/* Animated comet effect */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 rounded-full 
        shadow-comet animate-comet z-0" />
    </div>
  );
}

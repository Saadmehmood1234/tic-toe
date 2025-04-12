"use client";
import { useState } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";
function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button
      className={`w-20 h-20 md:w-24 md:h-24 text-3xl font-bold rounded-lg transition-all duration-200
      ${value ? "cursor-default" : "cursor-pointer hover:bg-emerald-700/30 active:scale-95"}
      ${value === "X" ? "text-amber-500" : "text-emerald-400"}
      bg-stone-800/50 border-2 ${value ? "border-amber-500/40" : "border-stone-600"} 
      shadow-md hover:shadow-lg`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

export default function NatureForestGame() {
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
    ? `🌲 Winner: ${winner}`
    : currentSquares.every(Boolean)
    ? "🍃 It's a draw!"
    : `Next: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((_, move) => {
    const description = move > 0 ? `Turn ${move}` : "Begin";
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className={`w-full px-3 py-2 text-sm rounded-lg transition-all
          ${
            move === currentMove
              ? "bg-amber-900/60 text-amber-100 border border-amber-500/30"
              : "bg-stone-800/50 text-stone-400 hover:bg-stone-700/50 hover:text-stone-200 border border-stone-600"
          }`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-stone-900 p-4 flex flex-col items-center justify-center relative
      bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj4KPHBhdGggZD0iTTAgMEg2MFY2MEgwVjBaIiBmaWxsPSIjMTkxNzE2Ii8+CjxwYXRoIGQ9Ik0wIDBINjBWMTBIMFYwWiIgZmlsbD0iIzFkMWIxOCIvPgo8cGF0aCBkPSJNMCAxMEg2MFYyMEgwVjEwWiIgZmlsbD0iIzIxMWUxYiIvPgo8cGF0aCBkPSJNMCAyMEg2MFYzMEgwVjIwWiIgZmlsbD0iIzI0MjEyMCIvPgo8cGF0aCBkPSJNMCAzMEg2MFY0MEgwVjMwWiIgZmlsbD0iIzI3MjQyMyIvPgo8L3N2Zz4=')]">
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-transparent bg-clip-text 
        bg-gradient-to-r from-amber-500 to-emerald-400">
        FOREST TAC-TOE
      </h1>

      <div className={`text-xl mb-6 px-6 py-3 rounded-full 
        ${winner ? "bg-emerald-900/60 text-emerald-200" : "bg-amber-900/60 text-amber-200"}
        border border-amber-500/30 shadow-md`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-stone-800/60 backdrop-blur-sm 
        border-2 border-stone-600 rounded-xl shadow-lg">
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

      <div className="w-full max-w-md bg-stone-800/60 backdrop-blur-sm p-4 rounded-xl border-2 border-stone-600 shadow-lg">
        <h2 className="text-lg font-semibold mb-3 text-amber-500">Game History</h2>
        <ol className="grid grid-cols-3 gap-2">{moves}</ol>
      </div>
    </div>
  );
}


"use client";
import { useState } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";

function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button
      className={`w-20 h-20 md:w-24 md:h-24 text-3xl font-bold rounded-none transition-all duration-100
      ${value ? "cursor-default" : "cursor-pointer hover:bg-yellow-100/10 active:bg-yellow-100/20"}
      ${value === "X" ? "text-red-500" : "text-green-400"}
      bg-black border-4 ${value ? "border-yellow-400" : "border-yellow-600"} 
      font-mono`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

export default function RetroArcadeGame() {
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
    ? `WINNER: ${winner}`
    : currentSquares.every(Boolean)
    ? "DRAW!"
    : `PLAYER: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((_, move) => {
    const description = move > 0 ? `#${move}` : "START";
    return (
      <li key={move} className="mb-1">
        <button
          onClick={() => jumpTo(move)}
          className={`w-full px-2 py-1 text-xs font-mono rounded-none
          ${
            move === currentMove
              ? "bg-green-900 text-green-100 border-2 border-yellow-400"
              : "bg-black text-gray-400 hover:bg-gray-900 hover:text-gray-200 border-2 border-gray-700"
          }`}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-black p-4 flex flex-col items-center justify-center relative
      bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMzMzMzMzMiIHg9IjAiIHk9IjAiPjwvcmVjdD4KPC9zdmc+')]">
      
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-yellow-400">
        ARCADE TAC-TOE
      </h1>

      <div className={`text-xl mb-6 px-6 py-3 rounded-none font-mono
        ${winner ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}
        border-4 border-yellow-600`}>
        {status}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-black/90 border-4 border-yellow-600">
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

      <div className="w-full max-w-md bg-black/90 p-4 border-4 border-yellow-600">
        <h2 className="text-lg font-mono text-yellow-400 mb-3">GAME LOG</h2>
        <ol className="grid grid-cols-5 gap-1">{moves}</ol>
      </div>
    </div>
  );
}

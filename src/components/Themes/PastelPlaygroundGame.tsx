"use client";
import { useState } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";

function Square({ value, onSquareClick }: { value: string | null; onSquareClick: () => void }) {
  return (
    <button
      onClick={onSquareClick}
      className="w-20 h-20 md:w-24 md:h-24 rounded-lg text-3xl font-bold text-gray-700 bg-pink-100 hover:bg-pink-200 transition-all duration-200 active:scale-95"
    >
      {value}
    </button>
  );
}

export default function PastelPlaygroundGame() {
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
    : `🧠 Next Player: ${xIsNext ? "X" : "O"}`;

  const moves = history.map((_, move) => {
    const description = move ? `🔁 Move #${move}` : "🔄 Game Start";
    return (
      <li key={move} className="mb-2">
        <button 
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${
            move === currentMove 
              ? "bg-purple-100 text-purple-700 font-medium" 
              : "text-pink-700 hover:bg-pink-50"
          }`}
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-white to-purple-100 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-purple-700">Tic Tac Toe</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-2xl shadow-md flex-1">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-purple-600">{status}</h2>
            <div className="grid grid-cols-3 gap-4 mx-auto w-fit">
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
        <div className="bg-white p-6 rounded-2xl shadow-md flex-1">
          <h3 className="text-lg font-semibold text-purple-600 mb-4">Move History</h3>
          <ol className="space-y-2">{moves}</ol>
        </div>
      </div>
    </div>
  );
}
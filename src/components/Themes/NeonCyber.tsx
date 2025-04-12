"use client";
import { useState } from "react";
import { calculateWinner } from '@/lib/CalculateWinner';

function Square({
  value,
  onSquareClick,
  theme,
}: {
  value: string | null;
  onSquareClick: () => void;
  theme: ThemeProps;
}) {
  return (
    <button
      className={`w-24 h-24 text-4xl font-bold rounded-sm transition-all duration-150
      ${value ? "cursor-default" : "cursor-pointer hover:brightness-125 active:scale-95"}
      ${value === "X" ? theme.xText : theme.oText}
      ${theme.squareBg} border-2 ${value ? theme.borderActive : theme.borderInactive} shadow-lg`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

type ThemeProps = {
  name: string;
  bg: string;
  squareBg: string;
  borderActive: string;
  borderInactive: string;
  xText: string;
  oText: string;
  statusBg: string;
  statusText: string;
  titleGradient: string;
  logTitleText: string;
  logActive: string;
  logInactive: string;
  iconColor: string;
};

const themes: ThemeProps[] = [
  {
    name: "Retro Arcade",
    bg: "bg-gray-950",
    squareBg: "bg-gray-900",
    borderActive: "border-cyan-400/30",
    borderInactive: "border-gray-700",
    xText: "text-cyan-400",
    oText: "text-magenta-400",
    statusBg: "bg-cyan-900/50",
    statusText: "text-cyan-300",
    titleGradient: "bg-gradient-to-r from-cyan-400 to-magenta-500",
    logTitleText: "text-cyan-300",
    logActive: "bg-cyan-900 text-cyan-100 border border-cyan-400/50",
    logInactive: "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200",
    iconColor: "bg-gradient-to-r from-cyan-400 to-magenta-500",
  },
  {
    name: "Pastel Spring",
    bg: "bg-pink-100",
    squareBg: "bg-white",
    borderActive: "border-pink-300",
    borderInactive: "border-pink-200",
    xText: "text-rose-400",
    oText: "text-emerald-400",
    statusBg: "bg-pink-200",
    statusText: "text-pink-700",
    titleGradient: "bg-gradient-to-r from-rose-400 to-emerald-400",
    logTitleText: "text-pink-700",
    logActive: "bg-pink-300 text-white",
    logInactive: "bg-white text-pink-500 hover:bg-pink-200",
    iconColor: "bg-gradient-to-r from-rose-400 to-emerald-400",
  },
  {
    name: "Ocean Wave",
    bg: "bg-blue-100",
    squareBg: "bg-white",
    borderActive: "border-blue-300",
    borderInactive: "border-blue-200",
    xText: "text-blue-500",
    oText: "text-indigo-400",
    statusBg: "bg-blue-200",
    statusText: "text-blue-800",
    titleGradient: "bg-gradient-to-r from-blue-400 to-indigo-400",
    logTitleText: "text-blue-800",
    logActive: "bg-blue-300 text-white",
    logInactive: "bg-white text-blue-500 hover:bg-blue-200",
    iconColor: "bg-gradient-to-r from-blue-400 to-indigo-400",
  },
  {
    name: "Forest Night",
    bg: "bg-green-900",
    squareBg: "bg-green-800",
    borderActive: "border-lime-400/30",
    borderInactive: "border-green-700",
    xText: "text-lime-400",
    oText: "text-green-200",
    statusBg: "bg-green-800",
    statusText: "text-lime-300",
    titleGradient: "bg-gradient-to-r from-lime-300 to-green-400",
    logTitleText: "text-lime-300",
    logActive: "bg-green-700 text-lime-100 border border-lime-400/50",
    logInactive: "bg-green-600 text-green-300 hover:bg-green-500 hover:text-white",
    iconColor: "bg-gradient-to-r from-lime-300 to-green-400",
  },
];

export default function NeonCyber() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [themeIndex, setThemeIndex] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const theme = themes[themeIndex];

  function handleClick(i: number) {
    if (calculateWinner(currentSquares) || currentSquares[i]) return;
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
  }

  const winner = calculateWinner(currentSquares);
  const status = winner
    ? `🎉 Winner: ${winner}`
    : currentSquares.every(Boolean)
    ? "🤝 It's a draw!"
    : `Next Player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className={`min-h-screen p-4 flex flex-col items-center justify-center relative ${theme.bg}`}>
      <div className="absolute top-4 right-4 flex gap-2">
        {themes.map((t, i) => (
          <button
            key={i}
            onClick={() => setThemeIndex(i)}
            className={`w-6 h-6 rounded-full transition-all ${t.iconColor} 
            ${themeIndex === i ? "ring-2 ring-white ring-offset-2" : "opacity-80 hover:opacity-100"}`}
            aria-label={`Select ${t.name} theme`}
            title={t.name}
          />
        ))}
      </div>

      <h1
        className={`text-5xl font-extrabold mb-8 text-transparent bg-clip-text ${theme.titleGradient}`}
      >
        TIC TAC THEMES
      </h1>

      <div
        className={`text-xl mb-6 px-6 py-3 rounded-full font-mono ${theme.statusBg} ${theme.statusText}`}
      >
        {status}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-12 p-4 rounded-lg shadow-2xl">
        {currentSquares.map((val, i) => (
          <Square
            key={i}
            value={val}
            onSquareClick={() => handleClick(i)}
            theme={theme}
          />
        ))}
      </div>

      <div className="w-full max-w-md p-4 rounded-lg shadow-xl">
        <h2 className={`text-lg font-mono mb-3 flex items-center gap-2 ${theme.logTitleText}`}>
          <span>⏤⏤⏤</span> MOVEMENT LOG <span>⏤⏤⏤</span>
        </h2>
        <ol className="grid grid-cols-3 gap-2">
          {history.map((_, i) => (
            <li key={i}>
              <button
                onClick={() => jumpTo(i)}
                className={`w-full px-3 py-2 text-sm font-mono rounded-sm transition-all
                ${i === currentMove ? theme.logActive : theme.logInactive}`}
              >
                {i === 0 ? "BOOT" : `#${i}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
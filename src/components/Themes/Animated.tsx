"use client";
import { useState } from "react";
import { calculateWinner } from "@/lib/CalculateWinner";

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
  pixelBorder: string;
};

const themes: ThemeProps[] = [
  {
    name: "Retro Arcade",
    bg: "bg-gray-950",
    squareBg: "bg-gray-900",
    borderActive: "border-cyan-400/30",
    borderInactive: "border-gray-700",
    xText: "text-yellow-300",
    oText: "text-red-500",
    statusBg: "bg-cyan-900/50",
    statusText: "text-cyan-300",
    titleGradient: "text-yellow-300",
    logTitleText: "text-cyan-300",
    logActive: "bg-cyan-900 text-cyan-100 border border-cyan-400/50",
    logInactive:
      "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200",
    iconColor: "bg-gradient-to-r from-cyan-400 to-magenta-500",
    pixelBorder:
      "border-4 border-t-gray-400 border-l-gray-400 border-r-gray-800 border-b-gray-800",
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
    titleGradient: "text-pink-500",
    logTitleText: "text-pink-700",
    logActive: "bg-pink-300 text-white",
    logInactive: "bg-white text-pink-500 hover:bg-pink-200",
    iconColor: "bg-gradient-to-r from-rose-400 to-emerald-400",
    pixelBorder:
      "border-4 border-t-pink-300 border-l-pink-300 border-r-pink-500 border-b-pink-500",
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
    titleGradient: "text-blue-600",
    logTitleText: "text-blue-800",
    logActive: "bg-blue-300 text-white",
    logInactive: "bg-white text-blue-500 hover:bg-blue-200",
    iconColor: "bg-gradient-to-r from-blue-400 to-indigo-400",
    pixelBorder:
      "border-4 border-t-blue-300 border-l-blue-300 border-r-blue-500 border-b-blue-500",
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
    titleGradient: "text-lime-300",
    logTitleText: "text-lime-300",
    logActive: "bg-green-700 text-lime-100 border border-lime-400/50",
    logInactive:
      "bg-green-600 text-green-300 hover:bg-green-500 hover:text-white",
    iconColor: "bg-gradient-to-r from-lime-300 to-green-400",
    pixelBorder:
      "border-4 border-t-green-400 border-l-green-400 border-r-green-700 border-b-green-700",
  },
];

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
      className={`w-20 h-20 text-4xl font-bold pixel-font
      ${
        value
          ? "cursor-default"
          : "cursor-pointer hover:brightness-110 active:scale-95"
      }
      ${value === "X" ? theme.xText : theme.oText}
      ${theme.squareBg} ${theme.pixelBorder}`}
      onClick={onSquareClick}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

export default function AnimatedGame() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [themeIndex, setThemeIndex] = useState(0);

  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);
  const theme = themes[themeIndex];

  const status = winner
    ? `🏆 Winner: ${winner}`
    : currentSquares.every(Boolean)
    ? "😮 Draw!"
    : `🕹️ Next Player: ${xIsNext ? "X" : "O"}`;

  function handleClick(i: number) {
    if (currentSquares[i] || winner) return;
    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move: number) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((_, move) => move);

  return (
    <div
      className={`min-h-screen ${theme.bg} p-4 flex flex-col items-center`}
      style={{ imageRendering: "pixelated" }}
    >
      <div className="absolute top-4 right-4 flex gap-2">
        {themes.map((t, i) => (
          <button
            key={i}
            onClick={() => setThemeIndex(i)}
            className={`w-6 h-6 rounded-sm transition-all ${t.iconColor} 
            ${
              themeIndex === i
                ? "ring-2 ring-white ring-offset-2"
                : "opacity-80 hover:opacity-100"
            }`}
            aria-label={`Select ${t.name} theme`}
            title={t.name}
            style={{ imageRendering: "pixelated" }}
          />
        ))}
      </div>

      <h1
        className={`text-5xl pixel-font mb-2 mt-8 text-outline ${theme.titleGradient}`}
      >
        TIC TAC TOE
      </h1>

      <div
        className={`pixel-font mb-6 px-6 py-2 text-xl 
        ${
          winner
            ? "bg-red-500 text-yellow-300"
            : theme.statusBg + " " + theme.statusText
        }
        ${theme.pixelBorder}`}
      >
        {status}
      </div>

      <div
        className={`grid grid-cols-3 gap-0 mb-8 bg-black p-1 ${theme.pixelBorder}`}
      >
        {currentSquares.map((value, i) => (
          <Square
            key={i}
            value={value}
            onSquareClick={() => handleClick(i)}
            theme={theme}
          />
        ))}
      </div>

      <div className={`w-full max-w-xs bg-black p-3 ${theme.pixelBorder}`}>
        <h2 className={`pixel-font ${theme.logTitleText} text-lg mb-2`}>
          MOVES
        </h2>
        <ol className="space-y-1">
          {moves.map((_, i) => (
            <li key={i}>
              <button
                onClick={() => jumpTo(i)}
                className={`w-full text-left px-3 py-1 pixel-font
                ${i === currentMove ? theme.logActive : theme.logInactive}`}
              >
                {i === 0 ? "▶ NEW GAME" : `▶ MOVE ${i}`}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

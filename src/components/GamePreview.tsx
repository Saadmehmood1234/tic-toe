"use client";
import Link from "next/link";

interface GamePreviewProps {
  theme?: {
    xColor?: string;
    oColor?: string;
    xBg?: string;
    oBg?: string;
    borderColor?: string;
  };
  cta?: {
    text: string;
    href: string;
    className?: string;
  };
  description?: {
    main: string;
    secondary: string;
  };
}

export default function GamePreview({
  theme = {
    xColor: "text-magenta-400",
    oColor: "text-cyan-400",
    xBg: "bg-magenta-500/20",
    oBg: "bg-cyan-500/20",
    borderColor: "border-cyan-400/30"
  },
  cta = {
    text: "Play Default Theme →",
    href: "/game",
    className: "bg-gradient-to-r from-cyan-500 to-magenta-600 hover:opacity-90"
  },
  description = {
    main: "Get ready to experience Tic-Tac-Toe like never before! Choose your favorite theme and challenge yourself or a friend in this timeless strategy game.",
    secondary: "Featuring modern animations, game history tracking, and multiple visual themes to suit your mood."
  }
}: GamePreviewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <p className="text-lg mb-6">{description.main}</p>
        <p className="text-lg mb-8">{description.secondary}</p>
        <Link
          href={cta.href}
          className={`inline-block px-8 py-3 text-lg font-bold rounded-lg transition-all shadow-lg hover:shadow-cyan-500/30 ${cta.className}`}
        >
          {cta.text}
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="relative w-64 h-64 grid grid-cols-3 gap-2 p-3 bg-gray-800 rounded-lg border border-gray-700 shadow-inner">
          {Array(9).fill(null).map((_, i) => (
            <div
              key={i}
              className={`flex items-center justify-center text-2xl font-bold rounded-sm ${
                i === 4
                  ? `${theme.xBg} ${theme.xColor}`
                  : i % 2 === 0
                  ? `${theme.oBg} ${theme.oColor}`
                  : "bg-gray-700"
              }`}
            >
              {i === 4 ? "X" : i % 3 === 0 ? "O" : ""}
            </div>
          ))}
          <div className={`absolute inset-0 border-2 rounded-lg pointer-events-none ${theme.borderColor}`} />
        </div>
      </div>
    </div>
  );
}
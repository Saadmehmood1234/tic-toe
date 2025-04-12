"use client";
import Link from "next/link";
import { useState } from "react";
import GamePreview from "@/components/GamePreview";
import { themes } from "@/lib/DATA/theme";

export default function HomePage() {
  const [hoveredTheme, setHoveredTheme] = useState<number | null>(null);
  
  const features = [
    {
      icon: "🔄",
      title: "Move History",
      desc: "Jump back to any previous move",
    },
    {
      icon: "🎨",
      title: "Multiple Themes",
      desc: "Five unique visual experiences",
    },
    {
      icon: "⚡",
      title: "Smooth Animations",
      desc: "Delightful interactive elements",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 p-8">
      <header className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">
          TIC-TAC-TOE EXTREME
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          The classic game reimagined with stunning themes, smooth animations,
          and endless fun!
        </p>
      </header>

      <main className="max-w-6xl mx-auto">
        <section className="mb-20 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-3xl font-bold mb-4 text-cyan-400">
            Welcome Player!
          </h2>

          <GamePreview
            description={{
              main: "Get ready to experience Tic-Tac-Toe like never before! Choose your favorite theme and challenge yourself or a friend in this timeless strategy game.",
              secondary:
                "Featuring modern animations, game history tracking, and multiple visual themes to suit your mood.",
            }}
          />
        </section>

        <section aria-labelledby="theme-selection-heading">
          <h2 
            id="theme-selection-heading"
            className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500"
          >
            Choose Your Theme
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {themes.map((theme) => (
              <article
                key={theme.id}
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  hoveredTheme === theme.id
                    ? "border-cyan-400 scale-105"
                    : "border-gray-700"
                } ${theme.bg} shadow-xl`}
                onMouseEnter={() => setHoveredTheme(theme.id)}
                onMouseLeave={() => setHoveredTheme(null)}
                aria-label={`${theme.name} theme`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-20 ${theme.colors.join(
                    " "
                  )}`}
                  aria-hidden="true"
                />
                <div className="relative z-10 p-6 h-full">
                  <h3 className={`text-2xl font-bold mb-3 ${theme.nameColor}`}>
                    {theme.name}
                  </h3>
                  <p className="text-gray-300 mb-6">{theme.desc}</p>
                  <div className="flex justify-center mb-4" aria-hidden="true">
                    <div className="grid grid-cols-3 gap-1 w-32 h-32">
                      {Array(9)
                        .fill(null)
                        .map((_, i) => (
                          <div
                            key={i}
                            className={`flex items-center justify-center text-sm font-bold ${
                              i === 4
                                ? theme.id === 2
                                  ? "text-yellow-400"
                                  : theme.id === 3
                                  ? "text-amber-500"
                                  : "text-cyan-400"
                                : i % 2 === 0
                                ? theme.id === 2
                                  ? "text-red-500"
                                  : theme.id === 3
                                  ? "text-emerald-400"
                                  : "text-magenta-400"
                                : "bg-gray-700/30"
                            }`}
                          >
                            {i === 4 ? "X" : i % 3 === 0 ? "O" : ""}
                          </div>
                        ))}
                    </div>
                  </div>
                  <Link
                    href={{
                      pathname: "/game",
                      query: { theme: theme.id },
                    }}
                    className={`inline-block w-full text-center px-6 py-2 rounded-lg border-2 font-mono transition-all ${theme.btnClass}`}
                    aria-label={`Play with ${theme.name} theme`}
                    prefetch={false}
                  >
                    Play {theme.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="features-heading" className="mt-20 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700">
          <h2 id="features-heading" className="text-3xl font-bold mb-8 text-center text-cyan-400">
            Game Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <article
                key={i}
                className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-cyan-400/50 transition-colors"
              >
                <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-magenta-400">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.desc}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-20 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>Created with Next.js, TypeScript, and Tailwind CSS</p>
        <p className="mt-2">© {new Date().getFullYear()} Tic-Tac-Toe Extreme</p>
      </footer>
    </div>
  );
}
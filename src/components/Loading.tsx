"use client";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-950 to-gray-900">
      <div className="relative w-32 h-32 mb-8">
        {/* Animated XO grid */}
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div 
              key={i}
              className="bg-gray-800 rounded-sm flex items-center justify-center"
            >
              <span className={`text-xl font-bold ${
                i % 3 === 0 ? 'text-cyan-400' : 
                i % 3 === 1 ? 'text-magenta-400' : 
                'text-yellow-400'
              } opacity-70`}>
                {i % 2 === 0 ? 'X' : 'O'}
              </span>
            </div>
          ))}
        </div>
        
        {/* Animated highlight */}
        <div className="absolute inset-0 border-2 border-cyan-400 rounded-sm animate-ping opacity-20"></div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">
          Loading Tic-Tac-Toe
        </h2>
        <p className="text-gray-400 mb-6">Preparing your gaming experience...</p>
        
        {/* Progress bar with framer-motion */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: ["0%", "100%", "0%"],
              marginLeft: ["0%", "0%", "100%"]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>
    </div>
  );
}
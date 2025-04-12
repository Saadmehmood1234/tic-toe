export type ThemeProps = {
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
  
export const themes: ThemeProps[] = [
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
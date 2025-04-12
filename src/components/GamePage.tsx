"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import NeonCyber from "@/components/Themes/NeonCyber";
import RetroArcadeGame from "@/components/Themes/Arcade";
import NatureForestGame from "@/components/Themes/Forest";
import MidnightGalaxyGame from "./Themes/MidnightGalaxyGame";
import CyberpunkGame from "./Themes/CyberpunkGame";
import PastelDreamGame from "./Themes/PastelDreamGame";
import NeonGlowGame from "./Themes/NeonGlowGame";
import QuantumGlassGame from "./Themes/QuantumGlassGame";
import PastelPlaygroundGame from "./Themes/PastelPlaygroundGame";
import NeonGradientGame from "./Themes/NeonGradientGame";
import AnimatedGame from "./Themes/Animated";
import Loading from "./Loading";

function GameContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  const renderTheme = () => {
    switch (theme) {
      case "1":
        return <NeonCyber />;
      case "2":
        return <RetroArcadeGame />;
      case "3":
        return <NatureForestGame />;
      case "4":
        return <MidnightGalaxyGame />;
      case "5":
        return <CyberpunkGame />;
      case "6":
        return <PastelDreamGame />;
      case "7":
        return <NeonGlowGame />;
      case "8":
        return <QuantumGlassGame />;
      case "9":
        return <PastelPlaygroundGame />;
      case "10":
        return <NeonGradientGame />;
      case "11":
        return <AnimatedGame />;
      default:
        return <NeonCyber />;
    }
  };

  return <div>{renderTheme()}</div>;
}

export default function GamePage() {
  return (
    <Suspense fallback={<Loading />}>
        
      <GameContent />
    </Suspense>
  );
}

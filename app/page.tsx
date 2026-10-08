import { Hero } from "@/components/sections/Hero";
import { Somos } from "@/components/sections/Somos";
import { Fazemos } from "@/components/sections/Fazemos";
import { Reel } from "@/components/sections/Reel";

export default function Home() {
  return (
    <>
      <Hero />
      <Somos />
      <Fazemos />
      <Reel />
    </>
  );
}
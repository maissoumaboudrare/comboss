"use client";
import { Hero } from "./molecules/_components/Hero";
import { Spacing } from "./atoms/_components/commons/Spacing";
import { Characters } from "./molecules/_components/Characters";
import SliderHero from "./atoms/_components/SliderHero";

export default function Home() {
  return (
    <main className="flex-grow">
      <Spacing size="xs" />
      <SliderHero />
      <Spacing size="sm" />
      <Hero />
      <Spacing size="md" />
      <Characters />
      <Spacing size="md" />
    </main>
  );
}

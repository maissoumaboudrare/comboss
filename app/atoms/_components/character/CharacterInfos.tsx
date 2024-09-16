/* eslint-disable @next/next/no-img-element */
"use client";
import { useCallback, useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Section } from "../commons/Section";
import { fetchAPI } from "@/lib/utils";
import { CharacterProfile } from "@/types/character";


export const CharacterInfos = ({ character }: { character: CharacterProfile }) => {
  const [stats, setStats] = useState<{
    numberOfCombos: number;
    numberOfLikes: number;
  }>({ numberOfCombos: 0, numberOfLikes: 0 });

  const fetchCharacterStats = useCallback(async () => {
    try {
      const response = await fetchAPI(`/api/stats/${character.characterID}`, {
        method: "GET",
      });
      setStats(response);
    } catch (error) {
      console.error("Error fetching character stats:", error);
    }
  }, [character.characterID]);

  useEffect(() => {
    fetchCharacterStats();

    const interval = setInterval(() => {
      fetchCharacterStats();
    }, 300000); // 5mins

    return () => clearInterval(interval);
  }, [fetchCharacterStats]);

  return (
    <Section className="sticky top-[86px] flex flex-col gap-3 pl-0 m-0">
      <div className="flex items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            {character.name}
          </h2>
          <div className="rounded-md overflow-hidden w-full">
            <img
              className="object-cover"
              src={character.avatar}
              alt={character.name}
            />
          </div>
          <p className="text-xs text-muted-foreground">{character.story}</p>
        </div>
      </div>
      <Separator className="mt-3" />
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">Character Information</h3>
        <ul className="my-6 ml-3 list-disc text-xs text-muted-foreground [&>li]:mt-2">
          <li>Vitality: {character.vitality}</li>
          <li>Type: {character.type}</li>
          <li>Effective range: {character.effectiveRange}</li>
          <li>Ease of use: {character.easeOfUse}</li>
          <li>Nb of Combos: {stats.numberOfCombos}</li>
          <li>Nb of Likes: {stats.numberOfLikes}</li>
        </ul>
      </div>
    </Section>
  );
};

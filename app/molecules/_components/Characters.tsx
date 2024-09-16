"use client";
import { useEffect, useState } from "react";
import { CharacterCard } from "@/app/atoms/_components/character/CharacterCard";
import { Section } from "@/app/atoms/_components/commons/Section";
import { fetchCharacters } from "@/utils/api";
import { Character } from "@/types/character";

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, []);

  return (
    <Section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {isLoading ? (
        <div className="col-span-full flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
      ) : (
        characters.map((character) => (
          <CharacterCard
            key={character.characterID}
            id={character.characterID}
            name={character.name}
            src={character.thumbnail}
          />
        ))
      )}
    </Section>
  );
};

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

type Character = {
  characterID: number;
  name: string;
  thumbnail: string;
};

type CharactersSelectboxProps = {
  characters: Character[];
  onChange: (characterID: number) => void;
};

export function CharactersSelectbox({
  characters,
  onChange,
}: CharactersSelectboxProps) {
  const handleSelectChange = (characterName: string) => {
    const selectedChar = characters.find((char) => char.name === characterName);

    if (selectedChar) {
      onChange(selectedChar?.characterID);
    }
  };

  return (
    <Select onValueChange={handleSelectChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Your combo for whom?" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Street fighters</SelectLabel>
          {characters.map((character) => (
            <SelectItem
              className="flex"
              key={character.characterID}
              value={character.name}
            >
              <div className="flex items-center gap-2">
                <Image
                  className="flex inline-flex rounded-full w-6 h-6"
                  src={character.thumbnail}
                  alt={character.name}
                  width={24}
                  height={24}
                />

                <span className="flex inline-flex">{character.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

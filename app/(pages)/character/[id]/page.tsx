import { Separator } from "@/components/ui/separator";
import { CharacterInfos } from "@/app/atoms/_components/character/CharacterInfos";
import { Combos } from "@/app/molecules/_components/Combos";
import { Section } from "@/app/atoms/_components/commons/Section";
import { fetchAPI } from "@/lib/utils";

export const dynamic = 'force-dynamic'

type Character = {
  characterID: number;
  name: string;
  avatar: string;
  story: string;
  vitality: number;
  type: string;
  effectiveRange: string;
  easeOfUse: string;
  numberOfCombos: number;
  numberOfLikes: number;
  numberOfLovers: number;
};

const Character = async ({ params }: { params: { id: string } }) => {
  // console.log("Received params 🔥:", params);
  const fetchCharacter = async (id: number): Promise<Character> => {
    // console.log("Fetching character with ID 🔥:", id);
    return await fetchAPI(`/api/characters/${id}`, {
      method: "GET",
    });
  };

  try {
    const id = Number(params.id);
    // console.log("Parsed ID 🔥:", id);
    if (isNaN(id)) {
      throw new Error("Invalid character ID");
    }
    const character = await fetchCharacter(Number(params.id));

    return (
      <main>
        <Section className="grid md:grid-cols-[250px_1px_1fr] gap-4">
          <div className="relative">
            <CharacterInfos character={character} />
          </div>

          <Separator orientation="vertical" className="hidden md:block" />
          <Separator
            orientation="horizontal"
            className="block md:hidden my-4"
          />

          <Combos characterID={character.characterID} />
        </Section>
      </main>
    );
  } catch (error) {
    console.error("Error rendering character page:", error);
    return <div>Error loading character data. Please try again later.</div>;
  }
};

export default Character;

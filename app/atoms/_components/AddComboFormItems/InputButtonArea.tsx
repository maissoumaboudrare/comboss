"use client";
import { TextAlignLeftIcon } from "@radix-ui/react-icons";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";

type ComboAreaProps = {
  onInputAdd: (inputName: string, inputSrc: string) => void;
  onNewLineAdd: () => void;
};

//? changer l'url des inputs envoyés ?

export function InputButtonArea({ onInputAdd, onNewLineAdd }: ComboAreaProps) {
  const handleAddInput = (name: string, src: string) => {
    onInputAdd(name, src);
  };
  return (
    <ToggleGroup className="flex flex-wrap justify-start" type="single">
      {INPUTS_KEYS.map(({ value, url, alt }, index) => (
        <ToggleGroupItem
          key={index}
          className="overflow-hidden p-2"
          value={value}
          aria-label={`Toggle ${value}`}
          onClick={() => handleAddInput(value, url)}
        >
          <Image className="w-6" src={url} alt={alt} width={24} height={24} />
        </ToggleGroupItem>
      ))}

      <ToggleGroupItem
        className="overflow-hidden p-2"
        value="return"
        aria-label="return line"
        onClick={onNewLineAdd}
      >
        <TextAlignLeftIcon className="h-6 w-6" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

type InputsKeysProps = {
  value: string;
  alt: string;
  src: string;
  url: string;
};

export const INPUTS_KEYS: InputsKeysProps[] = [
  {
    value: "d",
    alt: "Down direction",
    src: "/assets/form/inputs/directions/key-d.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-d.png",
  },
  {
    value: "u",
    alt: "Top direction",
    src: "/assets/form/inputs/directions/key-u.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-u.png",
  },
  {
    value: "dc",
    alt: "Hold down direction",
    src: "/assets/form/inputs/directions/key-dc.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-dc.png",
  },
  {
    value: "dl",
    alt: "Down corner left direction",
    src: "/assets/form/inputs/directions/key-dl.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-dl.png",
  },
  {
    value: "dr",
    alt: "Down corner right direction",
    src: "/assets/form/inputs/directions/key-dr.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-dr.png",
  },
  {
    value: "l",
    alt: "Left direction",
    src: "/assets/form/inputs/directions/key-l.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-l.png",
  },
  {
    value: "lc",
    alt: "Hold left direction",
    src: "/assets/form/inputs/directions/key-lc.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-lc.png",
  },
  {
    value: "r",
    alt: "Right direction",
    src: "/assets/form/inputs/directions/key-r.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-r.png",
  },
  {
    value: "360",
    alt: "360 circle direction",
    src: "/assets/form/inputs/directions/key-circle.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/directions/key-circle.png",
  },
  {
    value: "HK",
    alt: "Heavy kick",
    src: "/assets/form/inputs/kicks/icon_kick_h.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/kicks/icon_kick_h.png",
  },
  {
    value: "LK",
    alt: "Light kick",
    src: "/assets/form/inputs/kicks/icon_kick_l.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/kicks/icon_kick_l.png",
  },
  {
    value: "MK",
    alt: "Medium kick",
    src: "/assets/form/inputs/kicks/icon_kick_m.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/kicks/icon_kick_m.png",
  },
  {
    value: "K",
    alt: "OD kick",
    src: "/assets/form/inputs/kicks/icon_kick.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/kicks/icon_kick.png",
  },
  {
    value: "HP",
    alt: "Heavy punch",
    src: "/assets/form/inputs/punches/icon_punch_h.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/punches/icon_punch_h.png",
  },
  {
    value: "LP",
    alt: "Light punch",
    src: "/assets/form/inputs/punches/icon_punch_l.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/punches/icon_punch_l.png",
  },
  {
    value: "MP",
    alt: "Medium punch",
    src: "/assets/form/inputs/punches/icon_punch_m.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/punches/icon_punch_m.png",
  },
  {
    value: "P",
    alt: "OD punch",
    src: "/assets/form/inputs/punches/icon_punch.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/punches/icon_punch.png",
  },
  {
    value: "N",
    alt: "Neutral",
    src: "/assets/form/inputs/specials/key-nutral.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key-nutral.png",
  },
  {
    value: "plus",
    alt: "chainning move",
    src: "/assets/form/inputs/specials/key-plus.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key-plus.png",
  },
  {
    value: "s1",
    alt: "Super art level 1",
    src: "/assets/form/inputs/specials/s1.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/s1.png",
  },
  {
    value: "s2",
    alt: "Super art level 2",
    src: "/assets/form/inputs/specials/s2.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/s2.png",
  },
  {
    value: "s3",
    alt: "Super art level 3",
    src: "/assets/form/inputs/specials/s3.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/s3.png",
  },
  {
    value: "or",
    alt: "Alternative",
    src: "/assets/form/inputs/specials/key-or.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key-or.png",
  },
  {
    value: "DI",
    alt: "Drive impact",
    src: "/assets/form/inputs/specials/key_drive-impact.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_drive-impact.png",
  },
  {
    value: "DP",
    alt: "During drive parry",
    src: "/assets/form/inputs/specials/key_drive-parry.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_drive-parry.png",
  },
  {
    value: "cancel",
    alt: "While connecting with a special-cancelable move",
    src: "/assets/form/inputs/specials/key_cancel_move.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_cancel_move.png",
  },
  {
    value: "C",
    alt: "Counter",
    src: "/assets/form/inputs/specials/key_counter.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_counter.png",
  },
  {
    value: "DR",
    alt: "Drive rush",
    src: "/assets/form/inputs/specials/key_drive-rush.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_drive-rush.png",
  },
  {
    value: "fjump",
    alt: "During foward jump",
    src: "/assets/form/inputs/specials/key_foward-jump.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_foward-jump.png",
  },
  {
    value: "H",
    alt: "Hold the button to change effect",
    src: "/assets/form/inputs/specials/key_hold.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_hold.png",
  },
  {
    value: "jump",
    alt: "During neutral jump",
    src: "/assets/form/inputs/specials/key_jump.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_jump.png",
  },
  {
    value: "near",
    alt: "When near opponent",
    src: "/assets/form/inputs/specials/key_near_opponent.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_near_opponent.png",
  },
  {
    value: "PC",
    alt: "Punish counter",
    src: "/assets/form/inputs/specials/key_punish_counter.png",
    url: "https://raw.githubusercontent.com/maissoumaboudrare/comboss-frontend/main/public/assets/form/inputs/specials/key_punish_counter.png",
  },
];

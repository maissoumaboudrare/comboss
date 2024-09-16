"use client";
import React, { ChangeEvent } from "react";
import { Checkbox } from "@/components/ui/checkbox";

type PositionsCheckboxProps = {
  selectedPositions: { positionName: string }[];
  onChange: (position: string) => void;
};

export function PositionsCheckbox({
  selectedPositions,
  onChange,
}: PositionsCheckboxProps) {
  const handlePositionChange = (position: string, checked: string | boolean) => {
  if (checked) {
    onChange(position);
  } else {
    onChange(position);
  }
};

  return (
    <div className="w-full flex flex-col gap-3 md:flex-row md:gap-3 md:justify-between">
      <div className="flex items-center gap-2">
        <Checkbox
          id="midscreen"
          value="midscreen"
          checked={selectedPositions.some((pos) => pos.positionName === "midscreen")}
          onCheckedChange={(checked) => handlePositionChange("midscreen", checked as boolean)}
        />
        <label
          htmlFor="midscreen"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-flex"
        >
          Midscreen
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="corner"
          value="corner"
          checked={selectedPositions.some((pos) => pos.positionName === "corner")}
          onCheckedChange={(checked) => handlePositionChange("corner", checked as boolean)}
        />
        <label
          htmlFor="corner"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-flex"
        >
          Corner
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="jump"
          value="jump"
          checked={selectedPositions.some((pos) => pos.positionName === "jump")}
          onCheckedChange={(checked) => handlePositionChange("jump", checked as boolean)}
        />
        <label
          htmlFor="jump"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-flex"
        >
          Jump
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox
          id="anti-air"
          value="anti-air"
          checked={selectedPositions.some((pos) => pos.positionName === "anti-air")}
          onCheckedChange={(checked) => handlePositionChange("anti-air", checked as boolean)}
        />
        <label
          htmlFor="anti-air"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 inline-flex"
        >
          Anti-air
        </label>
      </div>
    </div>
  );
}

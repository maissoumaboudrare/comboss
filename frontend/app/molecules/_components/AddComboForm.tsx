/* eslint-disable react/no-unescaped-entities */
"use client";
import { useRouter } from "next/navigation";
import { fetchAPI } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { CustomIcon } from "../../atoms/_components/icons/CustomIcons";
import { CharactersSelectbox } from "../../atoms/_components/AddComboFormItems/CharactersSelectbox";
import { PositionsCheckbox } from "../../atoms/_components/AddComboFormItems/PositionsCheckbox";
import { InputButtonArea } from "../../atoms/_components/AddComboFormItems/InputButtonArea";
import { ComboPreview } from "../../atoms/_components/AddComboFormItems/ComboPreview";
import { Input } from "@/components/ui/input";

import { toast, Bounce } from "react-toastify";
import { useCombos } from "@/context/ComboContext";
import { Character } from "@/types/character";
import { addCombo, fetchCharacters } from "@/utils/api";

const comboSchema = z.object({
  comboName: z
    .string()
    .min(1, "Combo name is required")
    .max(50, "Combo name must not exceed 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Combo name can only contain letters and spaces"),
  characterID: z
    .number()
    .min(1, { message: "Character selection is required" }),
  positions: z
    .array(
      z.object({
        positionName: z.string(),
      })
    )
    .min(1, { message: "At least one position is required" }),
  inputs: z
    .array(
      z.array(
        z.object({
          inputName: z.string(),
          inputSrc: z.string(),
        })
      )
    )
    .min(1, "At least one line of inputs is required")
    .max(10, { message: "Combo can have a maximum of 10 lines" })
    .refine((lines) => lines.every((line) => line.length <= 8), {
      message: "Each line must have 1-8 inputs",
      path: ["inputs"],
    }),
  videoURL: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type ComboFormValues = z.infer<typeof comboSchema>;

export function AddComboForm() {
  const { fetchAndSetCombos } = useCombos();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    watch,
    setError,
  } = useForm<ComboFormValues>({
    resolver: zodResolver(comboSchema),
    defaultValues: {
      comboName: "",
      characterID: undefined,
      positions: [],
      inputs: [[]],
      videoURL: undefined,
    },
  });

  const [characters, setCharacters] = useState<Character[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCharactersAvatar = async () => {
      try {
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (error) {
        console.error("Error fetching characters avatar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharactersAvatar();
  }, []);

  const handleCharacterChange = (characterID: number) => {
    setValue("characterID", characterID, { shouldValidate: true });
  };

  const handlePositionChange = (position: string) => {
    const currentPositions = getValues("positions") || [];
    if (currentPositions.some((pos) => pos.positionName === position)) {
      setValue(
        "positions",
        currentPositions.filter((pos) => pos.positionName !== position)
      );
    } else {
      setValue("positions", [...currentPositions, { positionName: position }], {
        shouldValidate: true,
      });
    }
  };

  const addInputToLine = (inputName: string, inputSrc: string) => {
    const currentLines = getValues("inputs");
    const currentLineIndex = currentLines.length - 1;
    if (currentLines[currentLineIndex].length < 8) {
      currentLines[currentLineIndex].push({ inputName, inputSrc });
      setValue("inputs", currentLines, { shouldValidate: true });
    }
  };

  const addNewLine = () => {
    const currentLines = getValues("inputs");
    if (currentLines.length < 10) {
      setValue("inputs", [...currentLines, []], { shouldValidate: true });
    }
  };

  const resetPreview = () => {
    setValue("inputs", [[]], { shouldValidate: true });
  };

  const convertToEmbedUrl = (url: string) => {
    const urlObj = new URL(url);
    const videoID = urlObj.searchParams.get("v");
    return `https://www.youtube.com/embed/${videoID}`;
  };

  const onSubmit = async (data: ComboFormValues) => {
    if (
      data.inputs.length === 0 ||
      data.inputs.every((line) => line.length === 0)
    ) {
      setError("inputs", {
        type: "manual",
        message: "At least one input is required",
      });
      return;
    }

    const videoURL = data.videoURL
      ? convertToEmbedUrl(data.videoURL)
      : undefined;

    try {
      const comboData = {
        combo: {
          characterID: data.characterID,
          comboName: data.comboName,
          videoURL: videoURL,
        },
        positions: data.positions,
        inputs: data.inputs,
      };

      await addCombo(comboData);

      toast.success("Combo added successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      reset();
      setIsOpen(false);
      fetchAndSetCombos(data.characterID);
    } catch (error) {
      toast.error("Error adding combo!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      console.error("Error adding combo:", error);
    }
  };

  const positions = watch("positions");
  const inputs = watch("inputs");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="size-8 p-0">
          <CustomIcon
            className="inline text-foreground"
            name="addCombo"
            size={24}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded scrollbar-track-rounded">
        <DialogHeader>
          <DialogTitle>
            Add your best Combo{" "}
            <span className="inline-flex rotate-90">🥊</span>
          </DialogTitle>
          <DialogDescription>
            Here, edit your combo inputs and set the execution conditions.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-8 py-4">
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="comboName" className="text-right">
                Combo Name:
              </Label>
              <Controller
                name="comboName"
                control={control}
                render={({ field }) => (
                  <Input placeholder="Black Mamba" {...field} />
                )}
              />
              {errors.comboName && (
                <p className="text-red-500">{errors.comboName.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="character" className="text-right">
                Choose the fighter's combo:
              </Label>
              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <CharactersSelectbox
                  characters={characters}
                  onChange={handleCharacterChange}
                />
              )}
              {errors.characterID && (
                <p className="text-red-500">{errors.characterID.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="position" className="text-right">
                Select position:
              </Label>
              <PositionsCheckbox
                selectedPositions={positions}
                onChange={handlePositionChange}
              />
              {errors.positions && (
                <p className="text-red-500">{errors.positions.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="videoUrl" className="text-right">
                Video URL:
              </Label>
              <Controller
                name="videoURL"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="https://www.youtube.com/watch?v=example"
                  />
                )}
              />
              {errors.videoURL && (
                <p className="text-red-500">{errors.videoURL.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start gap-3">
              <Label htmlFor="combo" className="text-right">
                Type your awesome combo:
              </Label>
              <InputButtonArea
                onInputAdd={addInputToLine}
                onNewLineAdd={addNewLine}
              />
              {errors.inputs && (
                <p className="text-red-500">{errors.inputs.message}</p>
              )}

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    👇 Combo preview 👇
                  </span>
                </div>
              </div>
              <ComboPreview inputs={inputs} />
            </div>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button type="button" variant={"secondary"} onClick={resetPreview}>
              Reset Preview
            </Button>
            <Button type="submit">Send Combo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

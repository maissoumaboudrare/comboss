"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CustomIcon } from "../icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { Combo } from "@/types/combo";

type ComboCardProps = {
  combo: Combo;
  isAuthenticated: boolean;
  user: any;
  handleToggleLike: (comboID: number, isLiked: boolean) => void;
  handleToggleFavorite: (comboID: number, isFavorite: boolean) => void;
  handleDeleteCombo: (comboID: number) => void;
  handleOpenVideoDialog: (videoURL: string | undefined) => void;
};

const ComboCard = ({
  combo,
  isAuthenticated,
  user,
  handleToggleLike,
  handleToggleFavorite,
  handleDeleteCombo,
  handleOpenVideoDialog,
}: ComboCardProps) => {
  return (
    <Card className="w-full h-auto bg-gradient-to-t from-zinc-900">
      <CardHeader className="flex flex-row p-2.5 gap-3 items-center relative justify-between">
        <div className="flex gap-2">
          <Avatar className="cursor-pointer">
            <AvatarImage className="object-cover" src={combo?.avatar} />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
          <div className="flex flex-col !mt-0">
            <CardTitle className="text-sm tracking-wide">
              @{combo.username}
            </CardTitle>
            <CardDescription className="text-xs">
              {combo.positions.map((pos) => `${pos}`).join(" | ")}
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-col items-center gap-0 text-xs relative mr-2">
          <CustomIcon
            className="inline text-foreground cursor-pointer"
            name="heart"
            size={24}
            fill={combo.isLiked ? "red" : "gray"}
            onClick={() => handleToggleLike(combo.comboID, combo.isLiked)}
          />
          <span className="text-muted-foreground text-[10px] top-[45px] left-0 z-10">
            ({combo.likeCount})
          </span>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-2.5 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
        {Object.values(
          combo.inputs.reduce((acc, input) => {
            const lineIndex = input.lineOrder;
            if (!acc[lineIndex]) {
              acc[lineIndex] = [];
            }
            acc[lineIndex].push(input);
            return acc;
          }, {} as { [key: number]: { inputName: string; inputSrc: string; lineOrder: number; inputOrder: number }[] })
        ).map((line, lineIndex, lines) => (
          <div key={lineIndex}>
            <div className="flex space-x-2">
              {line.map((input, inputIndex) => (
                <Image
                  key={inputIndex}
                  src={input.inputSrc}
                  alt={input.inputName}
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              ))}
            </div>
            {lineIndex < lines.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="flex p-2">
        <div className="flex items-center w-full justify-between">
          <div className="flex gap-2">
            {isAuthenticated && (
              <Button
                variant={combo.isFavorite ? "default" : "outline"}
                className="size-8 p-0 group"
                onClick={() =>
                  handleToggleFavorite(combo.comboID, combo.isFavorite)
                }
              >
                <CustomIcon
                  className="inline text-foreground group-hover:fill-yellow-300"
                  name="favorite"
                  size={24}
                  fill={combo.isFavorite ? "yellow" : "gray"}
                />
              </Button>
            )}
            {combo.videoURL && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="size-8 p-0 group"
                    onClick={() => handleOpenVideoDialog(combo.videoURL)}
                  >
                    <CustomIcon
                      className="inline text-foreground group-hover:fill-white"
                      name="video"
                      size={24}
                      fill="gray"
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Combo Video</DialogTitle>
                  </DialogHeader>
                  {combo.videoURL && (
                    <iframe
                      width="100%"
                      height="315"
                      src={combo.videoURL}
                      title="YouTube video player"
                      style={{ border: 0 }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </DialogContent>
              </Dialog>
            )}
          </div>
          <div className="flex">
            {isAuthenticated && combo.userID === user?.userID && (
              <Button
                variant={"ghost"}
                onClick={() => handleDeleteCombo(combo.comboID)}
                className="px-2"
              >
                <CustomIcon
                  className="inline text-foreground"
                  name="trash"
                  size={24}
                  fill="red"
                />
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ComboCard
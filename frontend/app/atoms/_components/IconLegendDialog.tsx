"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CustomIcon } from "@/app/atoms/_components/icons/CustomIcons";
import { Button } from "@/components/ui/button";
import { INPUTS_KEYS } from "./AddComboFormItems/InputButtonArea";
import Image from "next/image";

export const IconLegendDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="size-8 p-0">
          <CustomIcon
            className="inline text-foreground"
            name="info"
            size={25}
          
                  fill="#fff"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded scrollbar-track-rounded">
        <DialogHeader>
          <DialogTitle>Icon Legend</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 p-4">
          {INPUTS_KEYS.map(({ alt, url }, index) => (
            <div key={index}>
              <div className="flex items-center gap-4">
              <Image src={url} alt={alt} className="w-8 h-8" width={32} height={32} />
                <span>{alt}</span>
              </div>
              {index < INPUTS_KEYS.length - 1 && (
                <Separator className="my-2" />
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

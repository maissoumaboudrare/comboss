"use client"
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const ComboCardEmpty = () => {
  return (
    <Card className="w-full h-auto bg-gradient-to-t from-zinc-900">
      <CardHeader className="flex flex-row p-2.5 gap-3 items-center relative justify-between">
        <div className="flex gap-2">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://avatars.githubusercontent.com/u/84064061?v=4" />
            <AvatarFallback>X</AvatarFallback>
          </Avatar>
          <div className="flex flex-col !mt-0">
            <CardTitle className="text-sm tracking-wide">
              Let&apos;s add your best combo ever ! 🚀
            </CardTitle>
            <CardDescription className="text-xs">
              Join us and enjoy !
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-2.5 overflow-x-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-muted">
        <Image
          src="/assets/others/no-combos-yet.webp"
          alt="Gif"
          width={500}
          height={300}
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  );
};

export default ComboCardEmpty;
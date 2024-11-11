"use client";

import { cn } from "@/lib/utils";
import GridPattern from "@/components/ui/grid-pattern";
import { Progress } from "../ui/progress";

interface GridHeaderProps {
  title: string;
}

export default function GridHeader({ title }: GridHeaderProps) {
  return (
    <div className="flex w-full h-[40%] items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <div className="flex flex-col items-center justify-center p-20 gap-4">
        <p className="z-10 whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter text-black dark:text-white">
          {title.toUpperCase()}
        </p>

        <Progress value={22} className="w-full" />
        <p className="text-sm text-muted-foreground mt-2">
          You've completed 33% of all available questions.
        </p>
      </div>

      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
        )}
      />
    </div>
  );
}

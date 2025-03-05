import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/magicui/grid-pattern";

export function GridPatternBg({children}) {
  return (
    <div className="relative flex h-[100vh] bg-zinc-800 items-center justify-center overflow-hidden bg-background">
      <GridPattern
        width={30}
        height={30}
        x={-1}
        y={-1}
        strokeDasharray={"4 2"}
        className={"[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]"}
      />
      <div className="w-full h-[98vh]">
      {children}
      </div>
    </div>
  );
}

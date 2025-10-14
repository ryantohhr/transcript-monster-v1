import { Skeleton } from "./ui/skeleton";

export default function TranscriptHistorySkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          className="h-[100px] flex items-center space-x-3 border-t-2 p-5"
          key={index}
        >
          <Skeleton className="h-[67.5px] w-[120px] rounded-xl" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </>
  );
}

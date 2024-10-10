// components/skeletons/TheLoading.tsx
import { TheSkeletonCard } from "./TheSkeletonCard";

export default function TheLoading() {
  return (
    <div className="h-[80vh] w-full p-4 pt-10">
      <div className="hidden md:grid md:grid-cols-1 md:gap-12">
        {[...Array(4)].map((_, idx) => (
          <TheSkeletonCard key={idx} />
        ))}
      </div>
    </div>
  );
}

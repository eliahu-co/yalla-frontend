"use client";

import { useRouter } from "next/navigation";
import Button from "./Comp/Button";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState: React.FC<EmptyState> = ({
    title,
    subtitle,
    showReset
}) => {
    const router = useRouter();

  return (
    <div className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
    ">
        <div className="text-2xl font-bold">Nothing matches your search...</div>
        <div className="font-light text-neutral-500 mt-2 mb-6">
          Try removing some of your filters!
        </div>
        <div className="w-40 mt-1">
            {showReset && (
                <Button
                    outline
                    label="Remove all filters"
                    onClick={ () => router.push('/')}
                />
            )}
            
        </div>
    </div>
  )
}

export default EmptyState
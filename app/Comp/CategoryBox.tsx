"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import useSearchParams from "../hooks/useSearchParams";
import queryString from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  description?: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const { category, dates, location, setCategory } = useSearchParams();

  const handleClick = useCallback(() => {
    const newCategory = category === label ? "" : label;
    setCategory(newCategory);

    const newParams = {
      ...(newCategory && { category: newCategory }),
      ...(dates && { dates }),
      ...(location && { location }),
    };

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: newParams,
      },
      { skipNull: true }
    );

    router.push(url);
    
  }, [category, label, setCategory, dates, location, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex
      flex-col
      items-center
      justify-center
      gap-2
      p-3
      border-b-2
      hover:text-neutral-800
      transition
      cursor-pointer
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      <Icon size={26} />
      <p className="text-xs font-small text-center">{label}</p>
    </div>
  );
};

export default CategoryBox;

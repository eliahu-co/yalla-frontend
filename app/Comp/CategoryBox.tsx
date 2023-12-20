"use client";

import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
import useSearchParams from "../hooks/useSearchParams";
import queryString from "query-string";
import EventCategory, {iconMapping} from "../events/[eventId]/EventCategory";
interface CategoryBoxProps {
  icon: string;
  label: string;
  description?: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon,
  label,
  selected,
}) => {
  const Icon = iconMapping[icon];
  const router = useRouter();
  const { category, startDate, endDate, location, setCategory } = useSearchParams();

  const handleClick = useCallback(() => {
    const newCategory = category === label ? "" : label;
    setCategory(newCategory);

    const newParams = {
      ...(newCategory && { category: newCategory }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
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
    
  }, [icon, label, setCategory, startDate, endDate, location, router]);

  return (
    <div
      onClick={handleClick}
      className={`
      flex
      flex-row
      m-1
      border-b-[2px]
      hover:border-purple-400
      hover:text-purple-800
      items-center
      justify-center
      p-1
      transition
      cursor-pointer
      relative
      ${selected ? "border-b-purple-800" : "border-transparent"}
      ${selected ? "text-purple-800" : "text-neutral-400"}
      `}
    >
      {Icon && (
        <div className="relative">
          <div className={` border-2 border-white p-1 ${selected ? 'border-2 border-purple-800' : ''}`}>
            <Icon size={20} />
          </div>
        </div>
      )}
      <p className="text-xs font-light text-left pl-3">{label}</p>
    </div>
  );
};

export default CategoryBox;

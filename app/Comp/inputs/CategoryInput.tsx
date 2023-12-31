"use client";
import { IconType } from "react-icons";

interface CategoryInputProps {
    icon:IconType,
    label: string,
    selected?: boolean,
    onClick: (value: string) => void
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon,
    label,
    selected,
    onClick
}) => {
  return (
    <div
    onClick={() => onClick(label)}
    className={`
    border-2
    p-4
    flex
    flex-col
    gap-3
    sm:h-28
    transition
    cursor-pointer
    ${ selected ? 'border-purple-800' : 'border-neutral-600'}
    ${ selected ? 'text-purple-800' : 'text-neutral-600'}
    `}
    >
        <Icon size={20} />
        <div className="font-semibold">
            {label}
        </div>
   </div>
  )
}

export default CategoryInput
'use client'

interface MenuItemProps {
    onClick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onClick, label
}) => {
  return (
    <div onClick={onClick}
    className="
    first:border-t-0
    last:border-b-0
    px-4 py-3 transition
    border-t-[1px] border-b-[1px] border-white
    hover:border-purple-600
    hover:text-purple-900
    font-semibold">
       {label}
        </div>
  )
}

export default MenuItem
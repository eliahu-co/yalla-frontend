"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
        onClick={onClick}
        disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        hover:opacity-80
        transition
        w-full
        border-[2px]
        ${outline ? "bg-white" : "bg-purple-500"}
        ${outline ? "border-black" : "border-purple-900"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-2"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-[1px]"}
    `}
    >
      {Icon && (
        <Icon
          className="
            absolute
            left-4
            top-3"
        />
      )}
      {label}{" "}
    </button>
  );
};

export default Button;

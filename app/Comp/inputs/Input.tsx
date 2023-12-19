"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type: string;
  disabled: boolean;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  options?: string[];
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  options,
}) => {
  if (type === "checkbox" && options) {
    return (
      <fieldset
        className="
      w-full relative"
      >
        <legend
          className="
      text-gray-400
      absolute
      text-md
      duration-150
      transform
      -translate-y-3
      top-5
      left-4
      z-10
      origin-[0]
      "
        >
          {label}
        </legend>
        <div
          className="flex 
      flex-row 
      gap-4 
      flex-wrap
      w-full
      peer
      p-4
      pt-12
      font-light
      bg-white
      border-2
      outline-none
      transition
      border-neutral-300
      "
        >
          {options.map((option) => (
            <label
              key={option}
              className={`
                flex
                items-center
                text-gray-400
                text-md
                transform 
                -translate-y-3 
                pl-2
                `}
            >
              <input
                type="checkbox"
                value={"true"}
                {...register(`${id}.${option}`, { required })}
                disabled={disabled}
                className="
                    mr-3
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    "
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (type === "textarea") {
    return (
      <div
        className="
    w-full relative"
      >
        <textarea
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=""
          className={`
        w-full
        peer
        p-4
        pt-6
        font-light
        bg-white
        border-2
        outline-none
        transition
        disabled:opacity-70
        disabled:cursor-not-allowed
        ${errors[id] ? "border-red-500" : "border-neutral-300"}
        ${errors[id] ? "focus:border-rose-600" : "focus:border-black"}
        h-36 max-h-36 whitespace-pre-wrap
      `}
        />
        <label
          className={`
      absolute
      text-md
      duration-150
      transform
      -translate-y-3
      top-5
      left-4
      z-10
      origin-[0]
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:transform-t-0
      peer-focus:scale-75
      peer-focus:translate-y-[-1rem]
      ${errors[id] ? "text-rose-600" : "text-gray-400"}
      `}
        >
          {label}
        </label>
      </div>
    );
  }
  return (
    <div
      className="
    w-full relative"
    >
      <input
        id={id}
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`
      w-full
      peer
      p-4
      pt-6
      font-light
      bg-white
      border-2
      outline-none
      transition
      disabled:opacity-70
      disabled:cursor-not-allowed
      ${errors[id] ? "border-red-500" : "border-neutral-300"}
      ${errors[id] ? "focus:border-rose-600" : "focus:border-black"}
      `}
      />
      <label
        className={`
      absolute
      text-md
      duration-150
      transform
      -translate-y-3
      top-5
      left-4
      z-10
      origin-[0]
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:transform-t-0
      peer-focus:scale-75
      peer-focus:translate-y-[-1rem]
      ${errors[id] ? "text-rose-600" : "text-gray-400"}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;

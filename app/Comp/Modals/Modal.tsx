"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
import { useOnClickOutside } from "usehooks-ts";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled: boolean;
  actionLabel: string;
  secondaryLabel?: string;
  secondaryAction?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  secondaryLabel,
  secondaryAction,
}) => {
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 400);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  const handleClickOutside = useCallback(() => {
      if (disabled) {
        return;
      }
        handleClose();
      }, [disabled, handleClose]);

  useOnClickOutside(ref, handleClickOutside);

  if (!isOpen) {
    return null;
  }

  return (
    <div
    // onClick={handleClickOutside}
      className="
        justify-center
        items-center
        flex
        overflow-x-hidden
        overflow-y-hidden
        inset-0
        fixed
        z-50
        outline-none
        focus:outline-none
        bg-neutral-800/70
        "
    >
      <div
        className="
    relative
    w-full
    md:w-4/6
    lg:w-3/6
    xl:w-2/5
    h-full
    mx-auto
    my-6
    lg:h-auto
    md:h-auto
    "
    
      >
        <div
          className={`
        translate
        duration-400
        h-full
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}`}
        >
          <div
            ref={ref}
            className="
            translate
            h-full
            md:h-[80vh]
            lg:h-[80vh]
            border-0
            rounded-lg
            shadow-lg
            relative
            w-full
            flex
            flex-col
            overflow-y-auto
            bg-white
            outline-none
            focus:outline-none
            "
          >
            <div
              className="
            flex
            items-center
            p-6
            rounded-t
            justify-center
            relative
            border-b-[1px]"
            >
              <button
                onClick={handleClose}
                className="
                p-1
                border-0
                hover:opacity-70
                transition
                absolute
                left-9"
              >
                <IoMdClose size={20} />
              </button>
              <div
                className="
              font-semibold text-lg"
              >
                {title}
              </div>
            </div>
            <div
              className="
            p-6
            relative
            flex-auto"
            >
              {body}
            </div>
            <div
              className="
          flex flex-col
          p-6
          gap-2"
            >
              <div
                className="
            flex flex-row
            items-center
            gap-4
            w-full"
              >
                {secondaryAction && secondaryLabel && (
                    <Button label={secondaryLabel}
                    disabled={disabled}
                    onClick={handleSecondaryAction} />
                )} 
                
                <Button label={actionLabel}
                disabled={disabled}
                onClick={handleSubmit} />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

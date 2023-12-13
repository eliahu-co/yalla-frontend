"use client";

import { useCallback, useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "./Avatar";
import MenuItem from "./MenuItem";

import useEventModal from "../hooks/useEventModal";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";


interface UserMenuProps {
  currentUser?: any | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const RegisterModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const EventModal = useEventModal();
  const ref = useRef(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  useOnClickOutside(ref, event => {
    const isMenuButton = buttonRef.current && buttonRef.current.contains(event.target as Node);
    if (!isMenuButton) {
      setIsOpen(false);
    }
  });

  const createEvent = useCallback(() => {
    if (!currentUser) {
      LoginModal.onOpen();
    }
    EventModal.onOpen();
  }, [currentUser, LoginModal]);

  return (
    <div className="relative">
      <div
        className="flex flex-row
        items-center gap-3"
      >
        <div
          onClick={createEvent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer"
        >
          Create an event
        </div>
        <div
        ref={buttonRef}
          onClick={toggleOpen}
          className="
            p-4 
            md:py-1 
            md:px-2
            border-[1px]
            border-neutral-200
            flex 
            flex-row
            items-center
            gap-3 
            rounded-full 
            cursor-pointer
            hover:shadow-md 
            transition"
        >
          <AiOutlineMenu />
          <div className="
          hidden 
          md:block
          ">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="
                absolute rounded-xl
                shadow-md
                w-[40px]
                md:w-3/4 
                bg-white 
                overflow-hidden
                right-0 
                top-12 
                text-sm
                min-w-[200px]  
              ">
          <div
            className="
                    flex flex-col cursor-pointer"
          >
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="My events" />
                <MenuItem onClick={() => {}} label="My favorites" />
                <MenuItem onClick={() => {}} label="Events hosted by me" />
                <MenuItem onClick={EventModal.onOpen} label="Create an event" />
                <hr />
                <MenuItem onClick={() => {}} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={LoginModal.onOpen} label="Login" />
                <MenuItem onClick={RegisterModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

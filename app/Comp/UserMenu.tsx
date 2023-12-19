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
      return LoginModal.onOpen();
    }
    EventModal.onOpen();
  }, [currentUser, LoginModal]);

  return (
    <div className="relative">
      <div
        className="flex flex-row
        items-center gap-3 items-stretch"
      >
        <div
          onClick={createEvent}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            border-black
            py-3
            px-4
            hover:text-purple-900
            hover:border-purple-600
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
            border-black
            flex 
            flex-row
            items-center
            gap-3 
            cursor-pointer
            hover:shadow-purple
            hover:text-purple-900
            hover:border-purple-600
            transition"
        >
          <AiOutlineMenu  className="hover:text-purple-600" />
          <div className="
          hidden 
          md:block
          rounded-full
          ">
            <Avatar src={currentUser?.imageUrl} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={ref}
          className="
                absolute
                shadow-purple
                w-[40px]
                border-[1px]
                border-black
                md:w-3/4 
                bg-white 
                overflow-hidden
                right-0 
                top-14
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
                <hr className="border-t-1 "/>
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

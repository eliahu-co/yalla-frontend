"use client";

import { BiSearch } from "react-icons/bi";
import useSearchModal from "../hooks/useSearchModal";

const Search = () => {

  const SearchModal = useSearchModal();


  return (
    <div
    onClick={SearchModal.onOpen}
      className="
    w-full
    md:w-auto
    shadow-sm
    cursor-pointer
    h-12
    flex
    flex-row
    group
    "
    >
    <div
    className="
    border-t-[2px]
    border-b-[2px]
    border-l-[2px]
    group-hover:border-purple-600
    transition
    w-full
    flex
    flex-row
    "
      
    >
      <div
        className="
        flex flex-row items-center justify-between w-full  "
      >
        <div
          className="
            text-sm
            font-semibold
            px-6
            "
        >
          Anywhere
        </div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            text-center
            flex-1"
        >
          Any Day
        </div>
        <div
          className="
            text-sm
            pl-6 pr-2
            text-gray-600
            flex flex-row
            items-center
            gap-3"
        >
          <div className="hidden sm:block">Invite Friends</div>
        </div>
        
      </div>
      
    </div>
    <div className="h-full flex px-3 justify-center items-center text-white bg-purple-600 border-[2px] border-purple-600 ">
    <div className="border-purple-900">
      <BiSearch size={20} />
    </div>
  </div>
  </div>
  );
};

export default Search;

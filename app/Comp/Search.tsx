"use client";

import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div
      className="
    group
    border-[2px]
    w-full
    md:w-auto
    transition
    shadow-sm
    hover:border-purple-600
    cursor-pointer
    h-12
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
            gap-3">
                <div className="hidden sm:block">
                Invite Friends
                </div>
                

        </div>
        <div className="h-full flex px-3 justify-center items-center text-white bg-purple-600 group-hover:border-t-0 group-hover:border-r-0 group-hover:border-b-0">
                    <BiSearch size={20} />
                </div>
      </div>
      
    </div>
  );
};

export default Search;

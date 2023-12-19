import React from "react";
import Container from "./Container";
import { Logo } from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

function Navbar() {
  return (
    <div className="fixed w-full z-10 shadow-sm bg-white">
      <div className="
      py-4 
      border-b-[2px]
      border-black
      ">
        <Container>
          <div
            className="
          flex
          flex-row
          items-center
          justify-between
          gap-3
          md:gap-0"
          >
            <Logo />
            <Search />
            <UserMenu currentUser={false} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
}

export default Navbar;

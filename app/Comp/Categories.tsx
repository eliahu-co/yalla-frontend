"use client";

import React from "react";
import Container from "./Container";
import { categoriesData } from "../data/categoriesData";
import CategoryBox from "./CategoryBox";
import { usePathname } from "next/navigation";
import useSearchParams from "../hooks/useSearchParams";

const Categories = () => {
  const params = useSearchParams();
  const selCategory = params.category;
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {categoriesData.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={selCategory === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

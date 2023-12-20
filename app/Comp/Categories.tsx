"use client";

import React, { useEffect } from "react";
import Container from "./Container";
import { categoriesData } from "../data/categoriesData";
import CategoryBox from "./CategoryBox";
import { usePathname } from "next/navigation";
import useSearchParams from "../hooks/useSearchParams";
import useCategories from "../hooks/useCategories";
import getAllCategories from "./actions/getEventById";
import { iconMapping } from "../events/[eventId]/EventCategory";


//const Categories = () => {
  const Categories: React.FC = () => {
  const params = useSearchParams();
  const selCategory = params.category;
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  const { categories, setCategories } = useCategories();

  useEffect(() => {
    if (categories && categories.length === 0) {
      getAllCategories()
        .then(data => {
          setCategories(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [categories, setCategories]);

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
        {categoriesData.map((category) => {
          const Icon = iconMapping[category.icon];
          return(
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={selCategory === category.label}
          />
         );
        })};
      </div>
    </Container>
    );
};

export default Categories;

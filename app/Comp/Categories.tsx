"use client";

import React, { useEffect, useState } from "react";
import Container from "./Container";
import { categoriesData } from "../data/categoriesData";
import CategoryBox from "./CategoryBox";
import { usePathname } from "next/navigation";
import useSearchParams from "../hooks/useSearchParams";
import useCategories from "../hooks/useCategories";
import getAllCategories from "./actions/getEventById";
import { iconMapping } from "../events/[eventId]/EventCategory";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


//const Categories = () => {
  const Categories: React.FC = () => {
  const params = useSearchParams();
  const selCategory = params.category;
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  const { categories, setCategories } = useCategories();

  const [visibleCategoryIndex, setVisibleCategoryIndex] = useState(0);

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

  const handleLeftArrowClick = () => {
    setVisibleCategoryIndex(Math.max(visibleCategoryIndex - 1, 0));
  };

  const handleRightArrowClick = () => {
    setVisibleCategoryIndex(Math.min(visibleCategoryIndex + 1, categoriesData.length - 1));
  };

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
        <div className="cursor-pointer" onClick={handleLeftArrowClick}>
          <FaArrowLeft size={20} />
        </div>

        {categoriesData.slice(visibleCategoryIndex, visibleCategoryIndex + 5).map((category) => {
          const Icon = iconMapping[category.icon];
          return(
          <CategoryBox
            key={category.label}
            label={category.label}
            icon={category.icon}
            selected={selCategory === category.label}
          />
         )
        })}

        <div className="cursor-pointer" onClick={handleRightArrowClick}>
          <FaArrowRight size={20}/>
        </div>
      </div>
    </Container>
    );
};

export default Categories;

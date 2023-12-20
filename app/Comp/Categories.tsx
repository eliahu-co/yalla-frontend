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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMainPage) {
    return null;
  }

  const handleLeftArrowClick = () => {
    setVisibleCategoryIndex(Math.max(visibleCategoryIndex - 1, 0));
  };

  const handleRightArrowClick = () => {
    setVisibleCategoryIndex(Math.min(visibleCategoryIndex + 1, categoriesData.length - 1));
  };

  const numCategories = windowWidth <= 1078 ? 3 : 8;

  return (
    <Container>
      <div
        className="
          pt-2
          pb-2
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
          relative
        "
        style={{position: 'relative'}}
      >
        <div className="cursor-pointer" onClick={handleLeftArrowClick}>
          <FaArrowLeft size={25} />
        </div>

        {categoriesData.slice(visibleCategoryIndex, visibleCategoryIndex + numCategories).map((category) => {
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
          <FaArrowRight size={25}/>
        </div>
      </div>
    </Container>
    );
};

export default Categories;

"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { SearchManufacturer } from ".";
import { manufacturers } from "@/constants";
import { SearchBarProps } from "@/types";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
  <button type="submit" className={`-ml-3 z-10  ${otherClasses}`}>
    <Image
      src={"/magnifying-glass.svg"}
      alt="magnifying glass"
      className="object-contain"
      width={40}
      height={40}
    />
  </button>
);

const SearchBar = ({ setManufacturer, setModel }: SearchBarProps) => {
  const [searchManufacturer, setSearchManufacturer] = useState("");
  const [searchModel, setSearchModel] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchModel === "" && searchManufacturer === "") {
      alert("Please fill in the search bar");
    }
    // updateSearchParams(
    //   searchModel.toLowerCase(),
    //   searchManufacturer.toLowerCase()
    // );
    setManufacturer(searchManufacturer);
    setModel(searchModel);
  };

  const updateSearchParams = (
    searchModel: string,
    searchManufacturer: string
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchModel) {
      searchParams.set("searchModel", searchModel);
    } else {
      searchParams.delete("searchModel");
    }

    if (searchManufacturer) {
      searchParams.set("searchManufacturer", searchManufacturer);
    } else {
      searchParams.delete("searchManufacturer");
    }

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          selected={searchManufacturer}
          setSelected={setSearchManufacturer}
        />
        <SearchButton otherClasses={"sm:hidden"} />
      </div>
      <div className="searchbar__item">
        <Image
          src={"/model-icon.png"}
          alt="model icon"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4"
        />
        <input
          type="text"
          name="model"
          value={searchModel}
          onChange={(e) => setSearchModel(e.target.value)}
          placeholder="Tiguan"
          className="searchbar__input"
        />
        <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;

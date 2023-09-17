"use client";
import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";
import { CustomButton } from ".";
import { updateSearchParams } from "@/utils";

const ShowMore = ({ pageNumber, isNext, setLimit }: ShowMoreProps) => {
  const router = useRouter();
  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 10;
    // const newPathname = updateSearchParams("limit", `${newLimit}`);
    // router.push(newPathname);
    setLimit(newLimit);
  };
  return (
    <div className="w-full flex-center mt-10 gap-5">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;

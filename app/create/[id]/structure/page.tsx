import { createCategory } from "@/app/actions";
import CreationFooter from "@/app/components/CreationFooter";
import SelectCategory from "@/app/components/SelectCategory";
import React from "react";

const StructurePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 mx-auto ">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Wich of these best describe your Home!
        </h2>
      </div>
      <form action={createCategory}>
        <input hidden name="homeId" value={params.id} />
        <SelectCategory />
        <CreationFooter />
      </form>
    </>
  );
};

export default StructurePage;

import { Button } from "@/components/ui/button";
import React from "react";
import SubmitButtons from "./SubmitButtons";
import Link from "next/link";

const CreationFooter = () => {
  return (
    <div className="fixed w-full border-t h-24 bottom-0 bg-white z-10">
      <div className="flex justify-between items-center mx-auto px-5 lg:px-10 h-full">
        <Button size="lg" variant="secondary" asChild>
          <Link href="/">Cancle</Link>
        </Button>
        <SubmitButtons />
      </div>
    </div>
  );
};

export default CreationFooter;

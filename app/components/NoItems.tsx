import { File } from "lucide-react";
import React from "react";

interface IappProps {
  title: string;
  description: string;
}
const NoItems = ({ description, title }: IappProps) => {
  return (
    <div className="flex flex-col min-h-[400px] items-center justify-center rounded-md border-2 border-dashed p-8 text-center animate-in fade-in-50 mt-10">
      <div className="size-20 flex items-center justify-center bg-primary/10 rounded-full">
        <File className="size-10 text-primary" />
      </div>
      <h2 className="text-xl font-semibold mt-6">{title}</h2>
      <p className="mt-2 text-center text-sm text-muted-foreground leading-6">
        {description}
      </p>
    </div>
  );
};

export default NoItems;

"use client";
import React, { useState } from "react";
import { categoryItems } from "../lib/filteritems";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SelectCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  return (
    <div className="grid grid-cols-4 mt-10 gap-8 w-3/5 mx-auto mb-36">
      <input hidden name="categoryName" value={selectedCategory as string} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={cn(
              selectedCategory === item.name ? "border-primary" : ""
            )}
            onClick={() => setSelectedCategory(item.name)}
          >
            <CardHeader>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={32}
                width={32}
              />
              <CardTitle className="font-medium">{item.title}</CardTitle>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SelectCategory;

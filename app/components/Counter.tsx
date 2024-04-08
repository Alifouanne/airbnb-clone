"use client";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

const Counter = ({ name }: { name: string }) => {
  const [number, setNumber] = useState<number>(0);
  const increase = () => {
    setNumber((prevnumber) => prevnumber + 1);
  };
  const decrease = () => {
    if (number > 0) {
      setNumber((prevnumber) => prevnumber - 1);
    }
  };
  return (
    <div className="flex items-center gap-x-4">
      <input type="hidden" name={name} value={number} />
      <Button size="icon" variant="outline" type="button" onClick={decrease}>
        <Minus className="size-4 text-primary" />
      </Button>
      <p className="font-medium text-lg">{number}</p>
      <Button size="icon" variant="outline" type="button" onClick={increase}>
        <Plus className="size-4 text-primary" />
      </Button>
    </div>
  );
};

export default Counter;

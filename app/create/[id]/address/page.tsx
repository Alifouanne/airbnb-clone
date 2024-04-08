"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";
import { useCountries } from "../../../lib/getCountries";
import Map from "@/app/components/Map";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import CreationFooter from "@/app/components/CreationFooter";
import { createLocation } from "@/app/actions";
const AddressPage = ({ params }: { params: { id: string } }) => {
  const { gelAllCountries } = useCountries();
  const [LocationValue, setLocationValue] = useState("");
  const LazyMap = dynamic(() => import("@/app/components/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[50vh] w-full" />,
  });
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
          Where is your home located?
        </h2>
      </div>
      <form action={createLocation}>
        <input type="hidden" name="homeId" value={params.id} />
        <input type="hidden" name="country" value={LocationValue} />
        <div className="w-3/5 mx-auto mb-36">
          <div className="mb-5">
            <Select required onValueChange={(value) => setLocationValue(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Countries</SelectLabel>
                  {gelAllCountries().map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.flag}
                      {country.label}/{country.region}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <LazyMap location={LocationValue} />
        </div>
        <CreationFooter />
      </form>
    </>
  );
};

export default AddressPage;

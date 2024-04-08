import { CreateDescription } from "@/app/actions";
import Counter from "@/app/components/Counter";
import CreationFooter from "@/app/components/CreationFooter";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const DescriptionPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 mx-auto ">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as posible
        </h2>
      </div>
      <form action={CreateDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="w-3/5 mx-auto flex flex-col mt-10 gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title" className="text-primary">
              Title
            </Label>
            <Input
              name="title"
              required
              placeholder="Short and simple..."
              type="text"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="description" className="text-primary">
              Description
            </Label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="price" className="text-primary">
              Price
            </Label>
            <Input
              name="price"
              required
              type="number"
              placeholder="Price per night in USD"
              min={10}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="image" className="text-primary">
              Image
            </Label>
            <Input name="image" required type="file" />
          </div>
          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium text-primary">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests do you want?
                  </p>
                </div>
                <Counter name="guests" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium text-primary">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many rooms do you have?
                  </p>
                </div>
                <Counter name="rooms" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="font-medium text-primary">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many bathrooms do you have?
                  </p>
                </div>
                <Counter name="bathrooms" />
              </div>
            </CardHeader>
          </Card>
        </div>
        <CreationFooter />
      </form>
    </>
  );
};

export default DescriptionPage;

"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "../../components/ui/button";
import { Heart, LoaderCircle } from "lucide-react";
const SubmitButtons = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button size="lg">
          <LoaderCircle className="size-6 animate-spin mr-2" /> Wait
        </Button>
      ) : (
        <Button size="lg" type="submit">
          Next
        </Button>
      )}
    </>
  );
};

export const AddToFavoriteButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          size="icon"
          variant="outline"
          disabled
          className="bg-primary-foreground"
        >
          <LoaderCircle className="size-4 animate-spin " />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="outline"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="size-4" />
        </Button>
      )}
    </>
  );
};

export const DeleteFromFavorite = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          size="icon"
          variant="outline"
          disabled
          className="bg-primary-foreground"
        >
          <LoaderCircle className="size-4 animate-spin " />
        </Button>
      ) : (
        <Button
          size="icon"
          variant="outline"
          className="bg-primary-foreground"
          type="submit"
        >
          <Heart className="size-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
};

export const ReservationSubmit = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-full">
          <LoaderCircle className="size-4 animate-spin mr2" /> Please wait...
        </Button>
      ) : (
        <Button type="submit" className="w-full">
          Make a Reservation
        </Button>
      )}
    </>
  );
};

export default SubmitButtons;

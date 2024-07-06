"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { updateProfile } from "@/lib/actions";
import { toast } from "sonner";

function InputCard({ title, description, inputType, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsUpdating(true);
    let res = "";
    if (inputType === "text") {
      res = await updateProfile({ name: value });
    } else {
      res = await updateProfile({ password: value });
    }

    if (res) toast.info(res.message);

    setIsUpdating(false);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder={`Your ${title}`}
            type={inputType}
            defaultValue={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={inputType === "email" || isUpdating}
          />
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex justify-end">
          <Button disabled={inputType === "email" || isUpdating} type="submit">
            Save
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default InputCard;

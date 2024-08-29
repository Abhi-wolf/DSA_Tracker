"use client";

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  console.log(error);
  return (
    <main className="flex min-h-[80vh] md:min-h-[50vh] justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold text-red-500">
        Something went wrong!
      </h1>
      <p className="text-lg text-red-400">{error.message}</p>

      <Button onClick={reset}>Try again</Button>
    </main>
  );
}

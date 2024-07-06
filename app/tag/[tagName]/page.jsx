import { auth } from "@/auth";
import ActiveLink from "@/components/ActiveLink";
import ByTopic from "@/components/ByTopic";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({ params }) {
  const { tagName } = params;
  const session = await auth();

  if (!session) return redirect("/login");

  return (
    <div className="w-full flex flex-col gap-6 md:gap-12 p-8 md:p-12">
      <div className="flex flex-col gap-4">
        <h3 className="text-foreground text-2xl md:text-4xl italic font-semibold">
          Topic&apos;s
        </h3>

        <ActiveLink tagName={tagName} />
      </div>

      <ByTopic tagName={tagName} />
    </div>
  );
}

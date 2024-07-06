import { auth } from "@/auth";
import ByTags from "@/components/ByTags";
import ByTopic from "@/components/ByTopic";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col gap-20 p-10 md:p-24 ">
      <div className="w-full flex flex-col gap-8 ">
        <h3 className="text-foreground text-2xl md:text-3xl italic font-semibold">
          Sheet&apos;s
        </h3>
        <ByTags />
      </div>
      <div className="w-full flex flex-col gap-8 ">
        <h3 className="text-foreground text-2xl md:text-3xl italic font-semibold">
          Topic&apos;s
        </h3>
        <ByTopic />
      </div>
    </main>
  );
}

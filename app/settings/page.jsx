import { auth } from "@/auth";
import InputCard from "@/components/InputCard";
import Spinner from "@/components/Spinner";
import { getUser } from "@/lib/fetchService";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function page() {
  const session = await auth();

  if (!session) return redirect("/login");

  const user = await getUser();

  return (
    <section className="flex flex-col w-full items-center gap-8 px-4 py-4 md:px-16 md:py-8">
      <h1 className="self-start text-2xl font-semibold underline decoration-wavy underline-offset-2">
        Settings
      </h1>
      <Suspense fallback={<Spinner />}>
        <div className="flex flex-col gap-6 w-[90%] md:w-[80%] lg:w-[60%] ">
          <InputCard
            title="Name"
            description="Name entered shown here will be used every where inside this application"
            inputType="text"
            defaultValue={user?.name}
          />
          <InputCard
            title="Email"
            description="Email entered shown here will be used every where inside this application"
            inputType="email"
            defaultValue={user?.email}
          />
          <InputCard
            title=" Password"
            description="Enter password to change old password"
            inputType="password"
            defaultValue={user?.password}
          />
        </div>
      </Suspense>
    </section>
  );
}

export default page;

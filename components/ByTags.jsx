import { getTags } from "@/lib/fetchService";
import Link from "next/link";
import { Suspense } from "react";
import Spinner from "./Spinner";

async function ByTags() {
  const tags = await getTags();

  return (
    <ul className="w-full grid grid-cols-4 gap-6 ">
      <Suspense fallback={<Spinner />}>
        {tags.map((tag) => (
          <Link
            href={`/tag/${tag.tag}`}
            key={tag.tag}
            className="p-4 md:p-8 border-4 border-secondary flex flex-col gap-2 md:gap-4 font-semibold rounded-lg hover:border-gray-500 cursor-pointer"
          >
            <h2 className="text-primary text-xl">{tag.tag}</h2>
            <p className="text-primary ">
              No of Question&apos;s :{" "}
              <span className="text-green-400 font-bold">{tag._count}</span>
            </p>
          </Link>
        ))}
      </Suspense>
    </ul>
  );
}

export default ByTags;

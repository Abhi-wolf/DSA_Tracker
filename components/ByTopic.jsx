import { getTopics } from "@/lib/fetchService";
import Link from "next/link";
import { Suspense } from "react";
import Spinner from "./Spinner";

async function ByTopic({ tagName }) {
  const data = await getTopics(tagName);

  return (
    <ul className="w-full grid grid-cols-4 gap-6 ">
      <Suspense fallback={<Spinner />}>
        {data.map((topic) => (
          <Link
            href={`${tagName ? `/tag/${tagName}/` : "/topic/"}${topic.topic}`}
            key={topic.topic}
            className=" p-4 md:p-6 border-4 border-secondary flex flex-col gap-2 md:gap-4 font-semibold rounded-lg hover:border-gray-500 cursor-pointer"
          >
            <h2 className="text-primary text-xl">Topic : {topic.topic}</h2>
            <p className="text-primary ">
              No of Question&apos;s :{" "}
              <span className="text-green-400 font-bold">{topic._count}</span>
            </p>
          </Link>
        ))}
      </Suspense>
    </ul>
  );
}

// href={`${tagName ? `/tag/${tagName}` : ""}/topic/${topic.topic}`}

export default ByTopic;

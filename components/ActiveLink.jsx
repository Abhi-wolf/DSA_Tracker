"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ActiveLink({ topicName, tagName }) {
  const pathName = usePathname();

  return (
    <div className="flex gap-2 text-xl">
      <Link
        href="/"
        className={`${pathName === "/" ? "underline" : ""} hover:text-primary`}
      >
        /Home
      </Link>
      {tagName ? (
        <div className="flex gap-2">
          <Link href={`/tag/${tagName}`}>
            /
            <span
              className={`${
                pathName === `/tag/${tagName}`
                  ? "underline text-green-500 decoration-wavy underline-offset-1"
                  : ""
              } hover:text-primary`}
            >
              {tagName}
            </span>
          </Link>

          {topicName && (
            <Link href={`/topic/${topicName}`}>
              /
              <span
                className={`${
                  pathName === `/tag/${tagName}/${topicName}`
                    ? "underline text-green-500 decoration-wavy underline-offset-1"
                    : ""
                } hover:text-primary`}
              >
                {topicName}
              </span>
            </Link>
          )}
        </div>
      ) : (
        <Link href={`/topic/${topicName}`}>
          /
          <span
            className={`${
              pathName === `/topic/${topicName}`
                ? "underline text-green-500 decoration-wavy underline-offset-1"
                : ""
            } hover:text-primary`}
          >
            {topicName}
          </span>
        </Link>
      )}
    </div>
  );
}

export default ActiveLink;

import { auth } from "@/auth";
import ActiveLink from "@/components/ActiveLink";
import { QuestionTable } from "@/components/QuestionTable";
import Spinner from "@/components/Spinner";
import { getBookMarks, getQuestionsByTopic } from "@/lib/fetchService";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

export default async function page({ params }) {
  const { topicName } = params;
  const session = await auth();

  if (!session) return redirect("/login");

  const [questions, bookmarks] = await Promise.all([
    getQuestionsByTopic(topicName),
    getBookMarks(),
  ]);

  return (
    <section className="mt-8 px-2 md:px-16 flex flex-col gap-6 md:gap-12 ">
      <ActiveLink topicName={topicName} />
      <Suspense fallback={<Spinner />}>
        <QuestionTable questions={questions} bookmarks={bookmarks} />
      </Suspense>
    </section>
  );
}

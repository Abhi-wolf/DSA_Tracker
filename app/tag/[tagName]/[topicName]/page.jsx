import { auth } from "@/auth";
import ActiveLink from "@/components/ActiveLink";
import { QuestionTable } from "@/components/QuestionTable";
import Spinner from "@/components/Spinner";
import { getBookMarks, getQuestionsByTopic } from "@/lib/fetchService";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function page({ params }) {
  const { tagName, topicName } = params;
  const session = await auth();

  if (!session) return redirect("/login");

  const [questions, bookmarks] = await Promise.all([
    getQuestionsByTopic(topicName, tagName),
    getBookMarks(),
  ]);

  return (
    <section className="mt-8 md:px-16 ">
      <div className="flex flex-col gap-6 md:gap-12">
        <ActiveLink tagName={tagName} topicName={topicName} />
        <Suspense fallback={<Spinner />}>
          <QuestionTable questions={questions} bookmarks={bookmarks} />
        </Suspense>
      </div>
    </section>
  );
}

export default page;

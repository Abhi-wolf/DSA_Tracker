import { getAttempts, getNotes } from "@/lib/fetchService";
import Row from "./Row";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Suspense } from "react";
import Spinner from "./Spinner";

export async function QuestionTable({ questions, bookmarks }) {
  const [attempts, notes] = await Promise.all([getAttempts(), getNotes()]);

  return (
    <Table>
      <TableCaption className="mb-4">
        {questions[0].topic
          ? questions[0].topic
          : "Data Structure and Algorithm "}{" "}
        Questions
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Level</TableHead>
          <TableHead className=" flex justify-center items-center">
            Bookmark
          </TableHead>
          <TableHead>Problem</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Link 2</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <Suspense fallback={<Spinner />}>
          {questions.map((question) => (
            <Row
              question={question}
              key={question.id}
              bookmarks={bookmarks}
              attempts={attempts}
              notes={notes}
            />
          ))}
        </Suspense>
      </TableBody>
    </Table>
  );
}

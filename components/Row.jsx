"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { TableCell, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotsVerticalIcon,
} from "@radix-ui/react-icons";
import { bookMarkQuestion, updateStatus } from "@/lib/actions";
import AddNotes from "./AddNotes";
import { toast } from "sonner";

function IsBookMarked(id, bookmarks) {
  return bookmarks.some((bookmark) => bookmark.questionId == id);
}

function AttemptStatus(id, attempts) {
  const attempt = attempts.find((a) => a.questionId === id);

  return attempt ? attempt.status : "not_done";
}

const Row = ({ question, bookmarks, attempts, notes }) => {
  const [status, setStatus] = useState(AttemptStatus(question.id, attempts));
  const [isBookmarked, setIsBookmarked] = useState(
    IsBookMarked(question.id, bookmarks)
  );

  const handleChangeStatus = async (value) => {
    setStatus(value);
    // console.log(value);

    const res = await updateStatus({
      id: question.id,
      status: value,
      tag: question.tag,
      topic: question.topic,
    });

    if (res) {
      toast.info(res.message);
    }
  };

  const handleBookMark = async () => {
    setIsBookmarked(!isBookmarked);

    const res = await bookMarkQuestion({
      id: question.id,
      tag: question.tag,
      topic: question.topic,
    });

    if (res) toast.info(res.message);
  };

  return (
    <TableRow key={question.id}>
      <TableCell className="font-medium">
        <Badge>Easy</Badge>
      </TableCell>

      <TableCell className=" flex justify-center items-center">
        <button onClick={handleBookMark}>
          {isBookmarked ? (
            <BookmarkFilledIcon className="text-yellow-400 size-4 md:size-5" />
          ) : (
            <BookmarkIcon className="size-4 md:size-5" />
          )}
        </button>
      </TableCell>
      <TableCell>{question?.problem}</TableCell>
      <TableCell>
        <Badge
          className={`${
            status === "done"
              ? "bg-green-500"
              : status === "not_done"
              ? "bg-red-500"
              : "bg-yellow-500"
          } hover:${
            status === "done"
              ? "bg-green-500"
              : status === "not_done"
              ? "bg-red-500"
              : "bg-yellow-500"
          }`}
        >
          {status}
        </Badge>
      </TableCell>
      <TableCell>
        <a
          href={`${question?.url}`}
          target="_blank"
          className="hover:underline underline-offset-2 decoration-primary decoration-2 hover:text-primary"
        >
          URL1
        </a>
      </TableCell>
      <TableCell>
        <a
          href={`${question?.url2}`}
          target="_blank"
          className="hover:underline underline-offset-2 decoration-primary decoration-2 hover:text-primary"
        >
          URL2
        </a>
      </TableCell>

      <TableCell>
        <AddNotes
          id={question.id}
          tag={question.tag}
          topic={question.topic}
          notes={notes}
        />

        {/* <Dialog>
          <DialogTrigger asChild>
            <Pencil2Icon />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Note&apos;s</DialogTitle>
              <DialogDescription>
                Write your note here. Click save when you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4" onSubmit={submitNotes}>
              <Textarea
                placeholder="Type your note here."
                id="note"
                rows={6}
                required
                onChange={(e) => setNote(e.target.value)}
              />
              <Button type="submit">Save changes</Button>
            </form>
          </DialogContent>
        </Dialog> */}
      </TableCell>
      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {/* <Button variant="outline">Open</Button> */}
            <DotsVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={status}
              onValueChange={handleChangeStatus}
            >
              <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="not_done">
                Not Done
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="attempted">
                Attempted
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default Row;

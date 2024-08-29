"use client";

import {
  DesktopIcon,
  ReaderIcon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { useCreateBlockNote } from "@blocknote/react";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { deleteNote } from "@/lib/actions";
import { useRouter } from "next/navigation";

const truncateHTML = (html, limit) => {
  return html.length > limit ? `${html.substring(0, limit)}...` : html;
};

function NoteCard({ note }) {
  const router = useRouter();
  const [htmlDoc, setHTMLDoc] = useState("");
  const [htmlDocToPrint, setHTMLDocToPrint] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const printRef = useRef(); // Reference for the printable component

  const editor = useCreateBlockNote({
    initialContent: JSON.parse(note.content),
  });

  useEffect(() => {
    if (editor) {
      const convertToHTML = async () => {
        const htmlDoc = await editor.blocksToHTMLLossy(editor.document);
        const truncatedDoc = truncateHTML(htmlDoc, 300);
        setHTMLDoc(truncatedDoc);
        setHTMLDocToPrint(htmlDoc);
      };

      convertToHTML();
    }
  }, [editor]);

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleDeleteNote = async () => {
    setIsDeleting(true);
    await deleteNote({ id: note.questionId });
    setIsDeleting(false);
  };

  return (
    <>
      <Card className="w-[350px] flex flex-col justify-between">
        <CardHeader>
          <CardTitle>{note?.question?.problem}</CardTitle>
          <CardDescription>{note?.question?.topic}</CardDescription>
        </CardHeader>

        <CardContent className="max-h-[150px] text-gray-500">
          {htmlDoc ? <div dangerouslySetInnerHTML={{ __html: htmlDoc }} /> : ""}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => router.push(`/notes/${note.id}`)}
          >
            <ReaderIcon />
          </Button>
          <Button variant="secondary" onClick={handlePrint}>
            <DesktopIcon />
          </Button>
          <Button
            size="icon"
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDeleteNote}
          >
            {!isDeleting ? (
              <TrashIcon />
            ) : (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Hidden component that will be used for printing */}
      <div className="hidden">
        <div
          ref={printRef}
          dangerouslySetInnerHTML={{ __html: htmlDocToPrint }}
          style={{ padding: "20px" }}
        />
      </div>
    </>
  );
}

export default NoteCard;

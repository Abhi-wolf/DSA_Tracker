"use client";

import { Pencil2Icon, ReloadIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Suspense, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { addNote, deleteNote } from "@/lib/actions";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { removeFromLocalStorage, saveToLocalStorage } from "@/lib/localStorage";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

function AddNotes({ id, tag, topic, notes }) {
  // const [note, setNote] = useState(findNotes(id, notes));
  const [note, setNote] = useState("");
  const [isOpen, onClose] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function findNotes() {
      setIsUpdating(true);
      const note = notes.find((n) => n.questionId === id);
      if (note) {
        const req = await JSON.parse(note.content);

        setNote(note ? req : "");
        saveToLocalStorage(req, id);
      }
    }

    findNotes();
    setIsUpdating(false);
  }, [id]);

  const submitNotes = async (event) => {
    event.preventDefault();

    setIsUpdating(true);

    const error = await addNote({ id, tag, topic, note });
    if (error) {
      toast.error("Something wrong happened");
    } else {
      toast.success("Note added successfully");
    }
    setIsUpdating(false);
    onClose();
  };

  const handleDeleteNote = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    await deleteNote({ id });
    removeFromLocalStorage(id);
    setNote("");
    setIsUpdating(false);
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogTrigger asChild>
        <Pencil2Icon className={`${note && "text-red-600 "} `} />
      </DialogTrigger>
      <DialogContent className="min-w-[80vw] h-[80vh] border-2 border-green-600">
        <DialogHeader>
          <DialogTitle>Note&apos;s</DialogTitle>
          <DialogDescription>
            Write your note here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <Editor id={id} data={note} setNote={setNote} editable={!isUpdating} />
        <DialogFooter className="fixed bottom-1 right-3">
          <Button onClick={handleDeleteNote} disabled={isUpdating || !note}>
            Delete
          </Button>
          <Button onClick={submitNotes} disabled={isUpdating}>
            {isUpdating && (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            )}

            {!isUpdating && "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNotes;

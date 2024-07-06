"use client";

import { Pencil2Icon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { addNote } from "@/lib/actions";
import { toast } from "sonner";

function findNotes(id, notes) {
  const note = notes.find((n) => n.questionId === id);
  return note ? note.content : "";
}

function AddNotes({ id, tag, topic, notes }) {
  const [note, setNote] = useState(findNotes(id, notes));
  const [isOpen, onClose] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const submitNotes = async (event) => {
    event.preventDefault();

    setIsUpdating(true);

    const error = await addNote({ id, tag, topic, note });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Note added successfully");
    }
    setIsUpdating(false);
    onClose();
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
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
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button type="submit" disabled={isUpdating}>
            Save changes
          </Button>
        </form>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddNotes;

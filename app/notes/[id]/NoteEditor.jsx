"use client";
import Editor from "@/components/NewNoteEditor";
import { Button } from "@/components/ui/button";
import { updateNote } from "@/lib/actions";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "sonner";

function NoteEditor({ data, id }) {
  const [note, setNote] = useState(JSON.parse(data));
  const [editable, setEditable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSave = async (event) => {
    event.preventDefault();

    setIsUpdating(true);

    const error = await updateNote({ id, note });
    if (error) {
      toast.error("Something wrong happened");
    } else {
      toast.success("Note saved successfully");
    }
    setIsUpdating(false);
    setEditable(false);
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex gap-4 justify-end ">
        {editable && (
          <Button
            variant="outline"
            className="py-1 px-4 rounded-2xl "
            disabled={isUpdating}
            onClick={() => setEditable(false)}
          >
            Cancel
          </Button>
        )}
        {editable ? (
          <Button
            variant="secondary"
            className="py-1 px-6 rounded-2xl bg-green-300"
            onClick={handleSave}
            disabled={isUpdating}
          >
            {isUpdating && (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            )}

            {!isUpdating && "Save"}
          </Button>
        ) : (
          <Button
            variant="secondary"
            className="py-1 px-6 rounded-2xl "
            onClick={() => setEditable(true)}
            disabled={isUpdating}
          >
            Edit
          </Button>
        )}
      </div>
      <Editor
        data={note}
        id={id}
        editable={editable}
        setNote={setNote}
        setEditable={setEditable}
      />
    </div>
  );
}

export default NoteEditor;

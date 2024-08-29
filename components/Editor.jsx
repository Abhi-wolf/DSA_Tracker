"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useEffect, useMemo, useState } from "react";

import { uploadFile } from "@/lib/firebaseUpload";

import { saveToLocalStorage, getFromLocalStorage } from "@/lib/localStorage";
import { BlockNoteEditor } from "@blocknote/core";

export default function Editor({ id, data, setNote, editable }) {
  const [content, setContent] = useState(data ? data : "loading");

  useEffect(() => {
    getFromLocalStorage(id).then((con) => {
      if (con) setContent(con);
      else {
        if (data) setContent(data);
        else setContent("");
      }
    });
  }, [id]);

  const editor = useMemo(() => {
    if (content === "loading") {
      return undefined;
    }

    return BlockNoteEditor.create({
      initialContent: content,
      uploadFile,
    });
  }, [content]);

  if (editor === undefined) return "Loading content";

  return (
    <div className="min-w-full h-[64vh] overflow-y-auto border-2 ">
      <BlockNoteView
        editable={editable}
        editor={editor}
        formattingToolbar={true}
        onChange={() => {
          saveToLocalStorage(editor.document, id);
          // setNote(JSON.stringify(editor.document));
          setNote(editor.document);
        }}
      />
    </div>
  );
}
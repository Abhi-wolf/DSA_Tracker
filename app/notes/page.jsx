import NoteCard from "@/components/NoteCard";
import Spinner from "@/components/Spinner";
import { getNotes } from "@/lib/fetchService";
import { Suspense } from "react";

async function Page() {
  const notes = await getNotes();

  return (
    <div className=" w-full  p-4 md:p-8 flex flex-wrap gap-4">
      <Suspense fallback={<Spinner />}>
        {notes.map((note) => (
          <NoteCard note={note} key={note.id} />
        ))}
      </Suspense>
    </div>
  );
}

export default Page;

import { getNote } from "@/lib/fetchService";
import NoteEditor from "./NoteEditor";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

async function Page({ params }) {
  const note = await getNote({ id: params.id });

  return (
    <div className="w-full  ">
      <Suspense fallback={<Spinner />}>
        <NoteEditor id={note.id} data={note.content} />
      </Suspense>
    </div>
  );
}

export default Page;

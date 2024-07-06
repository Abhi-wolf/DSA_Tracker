"use client";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { logoutUser } from "@/lib/actions";

export function SignOutBtn() {
  async function handleLogout(e) {
    e.preventDefault();
    const toastId = toast.loading("Logging out");

    const error = await logoutUser();

    if (!error || error == "NEXT_REDIRECT") {
      toast.success("Logged out Successfully", {
        id: toastId,
      });
    } else {
      console.log(error);
      toast.error(error, {
        id: toastId,
      });
    }
  }

  return (
    <form onSubmit={(e) => handleLogout(e)}>
      <Button variant="destructive" type="submit">
        Sign Out
      </Button>
    </form>
  );
}

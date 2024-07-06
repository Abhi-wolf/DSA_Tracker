import { auth } from "@/auth";
import Link from "next/link";
import { SignOutBtn } from "./SignOutBtn";
import { ThemeToggle } from "./ThemeToggle";
import { ProfileToggle } from "./ProfileToggle";
import { Button } from "./ui/button";

async function Header() {
  const session = await auth();

  return (
    <header className="w-full h-[100px]  flex justify-between items-center px-1 md:px-4 bg-accent shadow-lg shadow-slate-400">
      <Link
        href="/"
        className="text-2xl md:text-3xl italic text-violet-500 font-semibold"
      >
        Crack{" "}
        <span className="underline decoration-wavy underline-offset-1 text-violet-700">
          DSA
        </span>
      </Link>

      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          {session && <ProfileToggle />}

          <div>
            {session ? (
              <SignOutBtn />
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;

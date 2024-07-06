import Link from "next/link";
import Search from "./Search";

function SecondHeader() {
  return (
    <div className="w-full flex justify-between items-center px-2 md:px-4 py-2 border-2 border-red-500">
      <div className="flex items-center gap-8 justify-between">
        <Link
          href="/account/dashboard"
          className="font-semibold text-xl italic transition-all duration-300 hover:text-primary"
        >
          Dashboard
        </Link>
        <Link
          href="/account/settings"
          className="font-semibold text-xl italic  transition-all duration-300 hover:text-primary"
        >
          Settings
        </Link>
      </div>
      {/* search */}
      <Search />
    </div>
  );
}

export default SecondHeader;

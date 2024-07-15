import { CircleUser } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <div className="shadow-md sticky">
      <div className="container_main py-3 flex items-center justify-between">
        <Link href="/">Logo</Link>
        <SearchInput />
        <div className="flex items-center gap-5">
          <Link href="/profile">Profile</Link>
          <Link href="/login">
            <Button variant="ghost" className="flex gap-2 items-center">
              <CircleUser />
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

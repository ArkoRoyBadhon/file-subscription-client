"use client";
import { CircleUser } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchInput from "./SearchInput";
import { useAppSelector } from "@/redux/hook";
import { usePathname } from 'next/navigation'

const Header = () => {
  const { token } = useAppSelector((state) => state.auth);
  const pathname = usePathname()


  console.log("path", pathname);
  
  return (
    <div className="shadow-md sticky">
      <div className="container_main py-3 flex items-center justify-between">
        <Link href="/">Logo</Link>
        <SearchInput />
        <div className="flex items-center gap-5 text-primaryTxt">
          
          {token ? (
            <>
            <Link className={`font-semibold ${pathname === "/product" && "text-btnColor"}`} href="/product">Products</Link>
            <Link className={`font-semibold ${pathname.startsWith('/profile') && "text-btnColor"}`} href="/profile">Profile</Link>
            </>
          ) : (
            <Link className="font-medium" href="/login">
              <Button variant="ghost" className="flex gap-2 items-center">
                <CircleUser />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

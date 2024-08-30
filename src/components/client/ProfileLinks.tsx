"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";
import { clearUser } from "@/redux/features/auth/auth.slice";

const ProfileLinks = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const links = [
    {
      path: "/profile",
      name: "Profile",
    },
    {
      path: "/profile/status",
      name: "Status",
    },
    {
      path: "/profile/subscribe",
      name: "Subscription Plans",
    },
    {
      path: "/profile/my-collection",
      name: "My collections",
    },
    {
      path: "/profile/my-download",
      name: "My downloads",
    },
    {
      path: "/",
      name: "Logout",
    },
  ];
  return (
    <>
      {links.map((link: any, idx: number) => (
        <Link key={idx} href={link.path}>
          <Button
            variant={pathname === link.path ? "default" : "ghost"}
            className="w-full"
            onClick={() => link.name === "Logout" && dispatch(clearUser()) }
          >
            {link.name}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default ProfileLinks;

"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const ProfileLinks = () => {
  const pathname = usePathname();
  const links = [
    {
      path: "/profile",
      name: "Profile",
    },
    {
      path: "/profile/settings",
      name: "Settings",
    },
    {
      path: "/profile/my-collection",
      name: "My collections",
    },
    {
      path: "/profile/my-download",
      name: "My downloads",
    },
  ];
  return (
    <>
      {links.map((link: any, idx: number) => (
        <Link key={idx} href={link.path}>
          <Button
            variant={pathname === link.path ? "default" : "ghost"}
            className=""
          >
            {link.name}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default ProfileLinks;

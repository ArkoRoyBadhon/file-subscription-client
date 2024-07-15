import Link from "next/link";

const Header = () => {
  return (
    <div className="shadow-md sticky">
      <div className="container_main py-4 lg:py-5 flex items-center justify-between">
        <Link href="/">Logo</Link>
        <div className="flex items-center gap-5">
          <Link href="/profile">Profile</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sing Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

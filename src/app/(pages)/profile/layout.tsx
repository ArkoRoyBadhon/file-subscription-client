import Link from "next/link";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container_main grid grid-cols-1 lg:grid-cols-10 gap-5 py-5 h-[calc(100vh-65px)]">
      <div className="lg:col-span-3 border p-5 flex lg:flex-col gap-2 rounded-md">
        <Link href="/profile">Profie</Link>
        <Link href="/settings">Settings</Link>
        <Link href="/subscriptions">Subscriptions</Link>
      </div>
      <div className="lg:col-span-7 border p-5 rounded-md">{children}</div>
    </div>
  );
};

export default ProfileLayout;

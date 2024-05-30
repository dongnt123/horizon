import Image from "next/image";
import { redirect } from "next/navigation";

import Sidebar from "./_components/Sidebar";
import MobileNavbar from "./_components/MobileNavbar";
import { getLoggedInUser } from "@/lib/actions/user.action";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {

  const loggedInUser = await getLoggedInUser();
  if (!loggedInUser) redirect('/sign-in');

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedInUser} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="Horizon" />
          <div className="a">
            <MobileNavbar user={loggedInUser} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
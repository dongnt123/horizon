"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { sidebarLinks } from "@/constants";
import Footer from "./Footer";
import PlaidLink from "@/app/(auth)/_components/PlaidLink";

const Sidebar = ({ user }: { user: User }) => {

  const pathName = usePathname();

  return (
    <section className="sidebar">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Horizon" className="size-[24px] max-xl:size-14" />
          <h1 className="sidebar-logo">Horizon</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive = pathName === item.route || pathName.startsWith(`${item.route}/`);
          return (
            <Link key={item.label} href={item.route} className={cn("sidebar-link", { "bg-bank-gradient": isActive })}>
              <div className="relative size-6">
                <Image src={item.imgURL} alt={item.label} fill className={cn({ "brightness-[3] invert-0": isActive })} />
              </div>
              <p className={cn("sidebar-label flex flex-1", { "!text-white": isActive })}>
                {item.label}
              </p>
            </Link>
          )
        })}
        <PlaidLink user={user} />
      </nav>
      <Footer user={user} />
    </section>
  )
}

export default Sidebar;
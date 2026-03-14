"use client";
import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b md:border-b-0 md:border-r border-primary-900">
      <ul className="flex flex-row md:flex-col gap-1 md:gap-2 h-full text-sm md:text-lg overflow-x-auto">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-2 px-3 md:py-3 md:px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-2 md:gap-4 font-semibold text-primary-200 whitespace-nowrap ${pathname === link.href ? "bg-primary-900" : ""}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="md:mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;

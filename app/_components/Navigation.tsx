import Link from "next/link";
import { headers } from "next/headers";
import { auth } from "@/app/_lib/auth";

export default async function Navigation(): Promise<JSX.Element> {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  console.log(session);
  return (
    <nav className="z-10 text-sm sm:text-base md:text-xl">
      <ul className="flex gap-4 sm:gap-8 md:gap-16 items-center">
        <li>
          {
            <Link
              href="/cabins"
              className="hover:text-accent-400 transition-colors"
            >
              Cabins
            </Link>
          }
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={session.user.image}
                className="h-8 rounded-full "
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span className="hidden sm:inline">Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

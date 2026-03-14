import { auth } from "../_lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Guest Area",
};

export default async function Page(): Promise<JSX.Element> {
  const session = await auth.api.getSession({
    headers: headers(),
  });
  const firstName = session?.user?.name?.split(" ").at(0);
  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}

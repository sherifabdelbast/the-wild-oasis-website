import Link from "next/link";
import { stripe } from "@/app/_lib/stripe";

export default async function Page({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id;
  let paid = false;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      paid = session.payment_status === "paid";
    } catch {
      paid = false;
    }
  }

  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        {paid
          ? "Thank you for your reservation!"
          : "Something went wrong with your payment"}
      </h1>
      <p className="text-lg text-primary-300">
        {paid
          ? "Your payment was successful. We look forward to hosting you!"
          : "Please try again or contact support."}
      </p>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}

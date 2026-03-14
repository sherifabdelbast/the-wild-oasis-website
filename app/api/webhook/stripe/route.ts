import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/_lib/stripe";
import { supabase } from "@/app/_lib/supabase";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      await supabase
        .from("bookings")
        .update({ isPaid: true, status: "confirmed" })
        .eq("id", Number(bookingId));
    }
  }

  return NextResponse.json({ received: true });
}

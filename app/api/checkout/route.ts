import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/app/_lib/stripe";
import { getAuthSession } from "@/app/_lib/auth";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { bookingId, cabinName, totalPrice, numNights } = await request.json();

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Cabin ${cabinName}`,
            description: `${numNights} night${numNights > 1 ? "s" : ""} stay`,
          },
          unit_amount: Math.round(totalPrice * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    metadata: {
      bookingId: String(bookingId),
    },
    success_url: `${request.nextUrl.origin}/cabins/thankyou?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${request.nextUrl.origin}/account/reservations`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}

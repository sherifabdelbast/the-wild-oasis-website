import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { cabinId: string } }) {
  const { cabinId } = params;
  try {
    const id = Number(cabinId);
    const [cabin, bookedDates] = await Promise.all([
      getCabin(id),
      getBookedDatesByCabinId(id),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (error) {
    console.log(error);
    return Response.json("Cabin could not be found");
  }
}

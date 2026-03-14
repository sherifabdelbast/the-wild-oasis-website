"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import type { DateRange } from "@/app/_lib/types";
import { useReservation } from "./ReservationContext";

function ReservationReminder() {
  const { range, resetRange } = useReservation();
  if (!range.from || !range.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-3 px-4 sm:py-5 sm:px-8 rounded-2xl sm:rounded-full bg-accent-500 text-primary-800 text-sm sm:text-base font-semibold shadow-xl shadow-slate-900 flex gap-4 sm:gap-8 items-center w-[90%] sm:w-auto max-w-lg sm:max-w-none">
      <p>
        <span>👋</span> Don&apos;f forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}

export default ReservationReminder;

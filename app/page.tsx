import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png"

export default function Page(): JSX.Element {
  return (
      <main className="mt-10 sm:mt-16 md:mt-24">
      <Image src={bg} fill className="object-cover object-top" quality={80} placeholder="blur" alt="Mountains and forests with two cabins" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-primary-50 mb-6 sm:mb-8 md:mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-6 py-4 sm:px-8 sm:py-6 text-primary-800 text-base sm:text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}

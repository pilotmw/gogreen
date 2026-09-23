import Link from "next/link";
import { Leaf } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-[#f5f9f6] py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(187,247,208,0.4),transparent_70%)]" />
      </div>
      <div className="relative mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <p
          aria-hidden="true"
          className="text-7xl font-black tracking-tight text-primary/15 sm:text-8xl"
        >
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <Leaf aria-hidden="true" className="h-5 w-5" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Page error:", error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12 bg-zinc-50">
      <div className="w-full max-w-md text-center">
        <div className="inline-block w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 mb-6" />
        <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
        <p className="text-zinc-600 mb-6 text-sm">
          We hit an unexpected error. The issue has been logged.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 rounded-lg bg-black text-white font-medium hover:bg-zinc-800"
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="px-5 py-2 rounded-lg border border-zinc-300 font-medium hover:bg-zinc-50"
          >
            Back to dashboard
          </a>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50">
      <aside className="md:w-72 md:min-h-screen bg-white border-r border-zinc-200 p-4 md:overflow-y-auto md:fixed md:left-0 md:top-0">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <span className="inline-block w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600" />
            Verdhana AI
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs px-2 py-1 rounded border border-zinc-200 hover:bg-zinc-100"
          >
            Logout
          </button>
        </div>
        <p className="text-xs uppercase tracking-wide text-zinc-500 mb-2 px-2">
          Specialists
        </p>
        <nav className="space-y-1">
          {PRODUCTS.map((p) => (
            <Link
              key={p.slug}
              href={`/dashboard/${p.slug}`}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-100 text-sm"
            >
              <span className="text-xs font-mono px-1.5 py-0.5 rounded bg-zinc-100">
                {p.emoji}
              </span>
              <span className="truncate">{p.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 md:ml-72">{children}</main>
    </div>
  );
}

import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function DashboardHome() {
  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold">Welcome 👋</h1>
      <p className="text-zinc-600 mt-2">
        Pick a specialist from the sidebar, or start with the most popular ones below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {PRODUCTS.map((p) => (
          <Link
            key={p.slug}
            href={`/dashboard/${p.slug}`}
            className="p-5 rounded-xl border border-zinc-200 bg-white hover:shadow-md hover:border-violet-300 transition"
          >
            <div className="text-3xl mb-3">{p.emoji}</div>
            <h3 className="font-semibold mb-1">{p.name}</h3>
            <p className="text-sm text-zinc-600">{p.short}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

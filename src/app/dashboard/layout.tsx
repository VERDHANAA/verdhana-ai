import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const specialists = [
  { slug: "copywriter", name: "Copywriter", icon: "✍️", color: "yellow" as const },
  { slug: "analis-pasar", name: "Analis Pasar", icon: "📊", color: "green" as const },
  { slug: "strategi-konten", name: "Strategi Konten", icon: "🎯", color: "pink" as const },
  { slug: "social-media", name: "Social Media", icon: "📱", color: "blue" as const },
  { slug: "seo-specialist", name: "SEO Specialist", icon: "🔍", color: "purple" as const },
  { slug: "email-marketer", name: "Email Marketer", icon: "📧", color: "yellow" as const },
  { slug: "ads-manager", name: "Ads Manager", icon: "💰", color: "green" as const },
  { slug: "brand-strategist", name: "Brand Strategist", icon: "🎨", color: "pink" as const },
  { slug: "video-scriptwriter", name: "Video Scriptwriter", icon: "🎬", color: "blue" as const },
  { slug: "pr-specialist", name: "PR Specialist", icon: "📣", color: "purple" as const },
  { slug: "data-analyst", name: "Data Analyst", icon: "📈", color: "yellow" as const },
  { slug: "customer-success", name: "Customer Success", icon: "🤝", color: "green" as const },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFAF3] flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r-2 border-black bg-white flex-col min-h-screen shrink-0">
        <div className="p-5 border-b-2 border-black">
          <Link href="/" className="text-xl font-black">
            Verdhana<span className="text-[#FF6B00]">AI</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 px-2">Specialists</p>
          {specialists.map((s) => (
            <Link
              key={s.slug}
              href={`/dashboard/${s.slug}`}
              className="flex items-center gap-2.5 px-3 py-2 rounded-[5px] text-sm font-semibold hover:bg-[#FFFAF3] hover:border-2 hover:border-black transition-all group"
            >
              <span>{s.icon}</span>
              <span>{s.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t-2 border-black">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-8 h-8 rounded-[5px] border-2 border-black bg-[#FDC800] flex items-center justify-center font-black text-xs">
              U
            </div>
            <div>
              <p className="font-bold text-xs">User</p>
              <p className="text-gray-500 text-xs">Pro Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="border-b-2 border-black bg-[#FFFAF3] px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="md:hidden text-sm font-bold border-2 border-black px-3 py-1 rounded-[5px] shadow-[2px_2px_0px_#000]">← Tools</Link>
            <Badge color="green" className="text-xs">● Online</Badge>
          </div>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <span className="text-gray-600">Token: <strong>4.230 / 5.000</strong></span>
            <span className="text-gray-600">Generasi hari ini: <strong>12</strong></span>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

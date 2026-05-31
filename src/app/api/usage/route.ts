import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll: () => cookieStore.getAll() } }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ remaining: 10, polishRemaining: 1 });

    const today = new Date().toISOString().slice(0, 10);
    const { count } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", `${today}T00:00:00`);

    const used = count ?? 0;

    const { count: polishCount } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("was_polished", true)
      .gte("created_at", `${today}T00:00:00`);

    const polishUsed = polishCount ?? 0;
    return NextResponse.json({
      remaining: Math.max(0, 10 - used),
      polishRemaining: Math.max(0, 1 - polishUsed),
      used,
    });
  } catch {
    return NextResponse.json({ remaining: 10, polishRemaining: 1 });
  }
}

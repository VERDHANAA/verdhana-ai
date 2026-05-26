import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DAILY_LIMIT = 10;
const FREE_POLISH_LIMIT = 1;

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const { count: totalCount } = await supabase
      .from("generations")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfDay.toISOString());

    const { count: polishedCount } = await supabase
      .from("generations")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("was_polished", true)
      .gte("created_at", startOfDay.toISOString());

    const used = totalCount || 0;
    const polishedUsed = polishedCount || 0;

    return NextResponse.json({
      used,
      limit: DAILY_LIMIT,
      remaining: Math.max(0, DAILY_LIMIT - used),
      polishUsed: polishedUsed,
      polishLimit: FREE_POLISH_LIMIT,
      polishRemaining: Math.max(0, FREE_POLISH_LIMIT - polishedUsed),
      plan: "free",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}

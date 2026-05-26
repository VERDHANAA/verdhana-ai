import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(req: NextRequest) {
  // Verify cron secret (Vercel sets this automatically)
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();

    // Yesterday's date range (UTC)
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    yesterday.setUTCHours(0, 0, 0, 0);

    const today = new Date(yesterday);
    today.setUTCDate(today.getUTCDate() + 1);

    const dateStr = yesterday.toISOString().split("T")[0];

    // Count generations yesterday
    const { count: totalGen } = await supabase
      .from("generations")
      .select("id", { count: "exact", head: true })
      .gte("created_at", yesterday.toISOString())
      .lt("created_at", today.toISOString());

    // Count polished yesterday
    const { count: polished } = await supabase
      .from("generations")
      .select("id", { count: "exact", head: true })
      .eq("was_polished", true)
      .gte("created_at", yesterday.toISOString())
      .lt("created_at", today.toISOString());

    // Average quality score
    const { data: scoreRows } = await supabase
      .from("generations")
      .select("quality_score")
      .not("quality_score", "is", null)
      .gte("created_at", yesterday.toISOString())
      .lt("created_at", today.toISOString());

    const avgScore = scoreRows && scoreRows.length > 0
      ? scoreRows.reduce((sum, r) => sum + (r.quality_score || 0), 0) / scoreRows.length
      : null;

    // Count users (total + new)
    const { count: totalUsers } = await supabase
      .from("generations")
      .select("user_id", { count: "exact", head: true });

    // Upsert summary
    const { error } = await supabase
      .from("daily_summaries")
      .upsert(
        {
          date: dateStr,
          total_users: totalUsers || 0,
          new_users: 0, // computed below
          total_generations: totalGen || 0,
          total_polished: polished || 0,
          avg_quality_score: avgScore,
          errors: 0,
        },
        { onConflict: "date" }
      );

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      date: dateStr,
      summary: {
        total_generations: totalGen,
        total_polished: polished,
        avg_quality_score: avgScore,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

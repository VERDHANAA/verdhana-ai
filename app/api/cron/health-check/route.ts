import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createServiceClient();

    // Last hour's data
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const { count: generations } = await supabase
      .from("generations")
      .select("id", { count: "exact", head: true })
      .gte("created_at", oneHourAgo.toISOString());

    const { data: recentRows } = await supabase
      .from("generations")
      .select("quality_score")
      .not("quality_score", "is", null)
      .gte("created_at", oneHourAgo.toISOString());

    const avgScore = recentRows && recentRows.length > 0
      ? recentRows.reduce((s, r) => s + (r.quality_score || 0), 0) / recentRows.length
      : null;

    const status: any = {
      ok: true,
      checked_at: new Date().toISOString(),
      last_hour_generations: generations || 0,
      last_hour_avg_quality: avgScore,
      alerts: [],
    };

    // Simple anomaly checks
    if (avgScore !== null && avgScore < 6) {
      status.ok = false;
      status.alerts.push(`Low quality detected: avg score ${avgScore.toFixed(1)}`);
    }

    return NextResponse.json(status);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

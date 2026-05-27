import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";

export async function GET() {
  try {
    const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase().trim();
    if (!ADMIN_EMAIL) {
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email?.toLowerCase().trim() !== ADMIN_EMAIL) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const service = createServiceClient();

    const now = new Date();
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: todayCount } = await service
      .from("generations")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfDay.toISOString());

    const { count: monthCount } = await service
      .from("generations")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString());

    const { count: allTimeCount } = await service
      .from("generations")
      .select("id", { count: "exact", head: true });

    // Use auth.users for accurate user count (not just users who generated)
    const { data: authData } = await service.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    const totalUsers = authData?.users?.length || 0;

    const { count: polishedToday } = await service
      .from("generations")
      .select("id", { count: "exact", head: true })
      .eq("was_polished", true)
      .gte("created_at", startOfDay.toISOString());

    const { data: scoreRows } = await service
      .from("generations")
      .select("quality_score")
      .not("quality_score", "is", null)
      .gte("created_at", startOfDay.toISOString());

    const avgScoreToday = scoreRows && scoreRows.length > 0
      ? scoreRows.reduce((sum, r) => sum + (r.quality_score || 0), 0) / scoreRows.length
      : null;

    const { count: fallbackToday } = await service
      .from("generations")
      .select("id", { count: "exact", head: true })
      .gt("fallback_count", 0)
      .gte("created_at", startOfDay.toISOString());

    const { data: specialistData } = await service
      .from("generations")
      .select("product_slug")
      .gte("created_at", sevenDaysAgo.toISOString());

    const specialistCount: Record<string, number> = {};
    (specialistData || []).forEach((r) => {
      specialistCount[r.product_slug] = (specialistCount[r.product_slug] || 0) + 1;
    });
    const topSpecialists = Object.entries(specialistCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([slug, count]) => ({ slug, count }));

    const { data: dailySummaries } = await service
      .from("daily_summaries")
      .select("*")
      .gte("date", sevenDaysAgo.toISOString().split("T")[0])
      .order("date", { ascending: false });

    const { data: recent } = await service
      .from("generations")
      .select("id, product_slug, model, actual_model, quality_score, was_polished, fallback_count, created_at")
      .order("created_at", { ascending: false })
      .limit(10);

    const estimatedCostToday = (todayCount || 0) * 0.0001 + (polishedToday || 0) * 0.0002;
    const estimatedCostMonth = (monthCount || 0) * 0.0001;

    return NextResponse.json({
      summary: {
        users_total: totalUsers,
        gens_today: todayCount || 0,
        gens_month: monthCount || 0,
        gens_alltime: allTimeCount || 0,
        polish_today: polishedToday || 0,
        avg_quality_today: avgScoreToday,
        fallback_today: fallbackToday || 0,
        cost_today_usd: estimatedCostToday,
        cost_month_usd: estimatedCostMonth,
      },
      top_specialists: topSpecialists,
      daily_summaries: dailySummaries || [],
      recent: recent || [],
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

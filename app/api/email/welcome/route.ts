import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { sendEmail, welcomeEmailHtml } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const name = user.user_metadata?.name || user.email.split("@")[0];

    // 1. Send welcome email to new user
    const welcomeSend = await sendEmail({
      to: user.email,
      subject: "Welcome to Verdhana AI",
      html: welcomeEmailHtml(name),
    });

    // 2. Send admin notification (fire and forget)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && adminEmail !== user.email) {
      // Count total users
      const service = createServiceClient();
      const { count } = await service
        .from("generations")
        .select("user_id", { count: "exact", head: true });

      const signupTime = new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
        dateStyle: "medium",
        timeStyle: "short",
      });

      sendEmail({
        to: adminEmail,
        subject: `🎉 Verdhana AI: New user signed up!`,
        html: `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a;">

<h2 style="margin: 0 0 16px; font-size: 18px;">🎉 New user signed up!</h2>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
  <tr>
    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Email</td>
    <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: 500;">${user.email}</td>
  </tr>
  <tr>
    <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Time (WIB)</td>
    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${signupTime}</td>
  </tr>
  <tr>
    <td style="padding: 10px 0; color: #666;">Total generations</td>
    <td style="padding: 10px 0;">${count || 0}</td>
  </tr>
</table>

<a href="https://verdhanaai.com/admin"
   style="display: inline-block; background: #1a1a1a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 14px;">
  Open Admin Dashboard
</a>

<p style="font-size: 12px; color: #999; margin-top: 24px;">Verdhana AI automated notification</p>
</body>
</html>`,
      }).catch(() => {}); // fire and forget, don't block response
    }

    if (!welcomeSend.success) {
      return NextResponse.json({ error: welcomeSend.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

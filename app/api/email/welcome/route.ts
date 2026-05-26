import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, welcomeEmailHtml } from "@/lib/emails";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const name = user.user_metadata?.name || user.email.split("@")[0];

    const send = await sendEmail({
      to: user.email,
      subject: "Welcome to Verdhana AI",
      html: welcomeEmailHtml(name),
    });

    if (!send.success) {
      return NextResponse.json({ error: send.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendEmail, resultEmailHtml } from "@/lib/emails";
import { getProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  try {
    const { slug, result } = await req.json();
    if (!slug || !result) {
      return NextResponse.json({ error: "Missing slug or result" }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const product = getProduct(slug);
    const productName = product?.name || "Marketing Copy";

    const send = await sendEmail({
      to: user.email,
      subject: `Your ${productName} from Verdhana AI`,
      html: resultEmailHtml(productName, result),
    });

    if (!send.success) {
      return NextResponse.json({ error: send.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

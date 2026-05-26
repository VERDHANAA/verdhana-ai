// Resend email helpers

const RESEND_URL = "https://api.resend.com/emails";

type EmailParams = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export async function sendEmail({ to, subject, html, from }: EmailParams) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not set");
    return { success: false, error: "Email service not configured" };
  }

  const sender = from || "Verdhana AI <hello@verdhanaai.com>";

  try {
    const res = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to,
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Resend error:", errText);
      return { success: false, error: errText };
    }

    const data = await res.json();
    return { success: true, id: data.id };
  } catch (e: any) {
    console.error("Email send error:", e);
    return { success: false, error: e.message };
  }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

export function welcomeEmailHtml(name: string) {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">

<div style="background: linear-gradient(to right, #7c3aed, #2563eb); width: 40px; height: 40px; border-radius: 8px; margin-bottom: 24px;"></div>

<h1 style="font-size: 22px; margin: 0 0 16px;">Welcome to Verdhana AI</h1>

<p>Hi ${name || "there"},</p>

<p>Thanks for joining. You now have access to 12 AI marketing specialists trained to write copy that doesn't sound like AI.</p>

<p><strong>What you can do:</strong></p>

<ul style="padding-left: 20px;">
  <li>Generate 10 pieces of marketing copy per day</li>
  <li>Try our AI Polish feature once per day (Pro feature, free sample)</li>
  <li>Choose from Facebook Ads, TikTok, Instagram, Email, Landing Pages, and 7 more</li>
</ul>

<p style="margin-top: 24px;">
  <a href="https://verdhana-ai.vercel.app/dashboard" 
     style="display: inline-block; background: #1a1a1a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">
    Open Dashboard
  </a>
</p>

<p style="font-size: 13px; color: #666; margin-top: 32px;">
  Need help? Reply to this email.
</p>

<p style="font-size: 13px; color: #666;">
  — Verdhana AI
</p>

</body>
</html>
  `.trim();
}

export function resultEmailHtml(productName: string, result: string) {
  // Escape HTML in result
  const safeResult = result
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");

  return `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">

<div style="background: linear-gradient(to right, #7c3aed, #2563eb); width: 40px; height: 40px; border-radius: 8px; margin-bottom: 24px;"></div>

<h1 style="font-size: 20px; margin: 0 0 16px;">${productName} — Your Result</h1>

<p style="color: #666; font-size: 14px;">Generated on ${new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>

<div style="background: #fafafa; border: 1px solid #e5e5e5; border-radius: 8px; padding: 20px; margin: 20px 0; font-family: -apple-system, sans-serif; font-size: 15px;">
${safeResult}
</div>

<p style="margin-top: 24px;">
  <a href="https://verdhana-ai.vercel.app/dashboard" 
     style="display: inline-block; background: #1a1a1a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 500;">
    Generate More
  </a>
</p>

<p style="font-size: 13px; color: #666; margin-top: 32px;">
  — Verdhana AI
</p>

</body>
</html>
  `.trim();
}

export function adminDailyReportHtml(stats: {
  date: string;
  total_generations: number;
  total_polished: number;
  avg_quality_score: number | null;
  total_users: number;
}) {
  const score = stats.avg_quality_score
    ? stats.avg_quality_score.toFixed(1) + "/10"
    : "N/A";

  return `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1a1a1a; line-height: 1.6;">

<h1 style="font-size: 20px; margin: 0 0 8px;">Verdhana AI — Daily Report</h1>
<p style="color: #666; font-size: 14px; margin: 0 0 24px;">${stats.date}</p>

<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
  <tr>
    <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong>Total generations</strong></td>
    <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">${stats.total_generations}</td>
  </tr>
  <tr>
    <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong>AI Polish used</strong></td>
    <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">${stats.total_polished}</td>
  </tr>
  <tr>
    <td style="padding: 12px 0; border-bottom: 1px solid #eee;"><strong>Avg quality score</strong></td>
    <td style="padding: 12px 0; border-bottom: 1px solid #eee; text-align: right;">${score}</td>
  </tr>
  <tr>
    <td style="padding: 12px 0;"><strong>Total registered users</strong></td>
    <td style="padding: 12px 0; text-align: right;">${stats.total_users}</td>
  </tr>
</table>

<p style="font-size: 13px; color: #666;">
  Generated by Verdhana AI cron job
</p>

</body>
</html>
  `.trim();
}

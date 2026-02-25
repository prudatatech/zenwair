// Supabase Edge Function — send-welcome
// Deploy: npx supabase functions deploy send-welcome
// Docs: https://supabase.com/docs/guides/functions

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = "Zenwair <hello@zenwair.com>"; // change to your verified domain

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
        return new Response("ok", {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
            },
        });
    }

    try {
        const { email } = await req.json();
        if (!email) return new Response(JSON.stringify({ error: "no email" }), { status: 400 });

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: FROM_EMAIL,
                to: [email],
                subject: "You're on the Zenwair waitlist ✦",
                html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <style>
    body { background:#0d0d0d; margin:0; padding:0; font-family:'Georgia',serif; }
    .wrap { max-width:520px; margin:48px auto; background:#fff; border-radius:16px; overflow:hidden; }
    .header { background:#111; padding:40px 48px 32px; text-align:center; }
    .header img { height:72px; }
    .body { padding:44px 48px 36px; }
    h1 { font-size:2rem; color:#111; margin:0 0 12px; font-weight:400; }
    p  { font-size:1rem; color:#6b6860; line-height:1.8; margin:0 0 20px; }
    .pill { display:inline-block; padding:12px 32px; border-radius:999px; background:#111; color:#fff; font-size:0.8rem; letter-spacing:0.1em; text-transform:uppercase; text-decoration:none; }
    .footer { background:#f4f2ef; padding:20px 48px; text-align:center; font-size:0.75rem; color:#bbb; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div style="font-family:sans-serif;font-size:1.6rem;letter-spacing:0.18em;color:#fff;font-weight:700;">ZENWAIR</div>
      <div style="font-size:0.75rem;color:rgba(255,255,255,0.4);letter-spacing:0.12em;margin-top:6px;">STAY CALM · STAY ZEN</div>
    </div>
    <div class="body">
      <h1>You're on the list ✦</h1>
      <p>
        <em>Thank you for contacting Zenwair.</em><br/>
        We're handcrafting something beautiful — slow, deliberate Indian fashion made for the unhurried soul.
      </p>
      <p>
        We'll reach out the moment we go live with your exclusive early-access invite and founding member perks.
      </p>
      <p style="text-align:center">
        <a class="pill" href="https://www.instagram.com/zenwair?igsh=anlmOGlvNGllcm54">
          Follow on Instagram
        </a>
      </p>
    </div>
    <div class="footer">© 2025 Zenwair · Made with love in India</div>
  </div>
</body>
</html>`,
            }),
        });

        const data = await res.json();
        return new Response(JSON.stringify(data), {
            status: res.status,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
            status: 500,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
    }
});

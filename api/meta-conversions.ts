import type { VercelRequest, VercelResponse } from "@vercel/node";

type MetaEventName = "PageView" | "Contact" | "Lead";

type MetaConversionsRequestBody = {
  event_name: MetaEventName;
  event_id: string;
  event_source_url?: string;
  fbp?: string;
  fbc?: string;
};

function getClientIp(req: VercelRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0]?.trim();
  }

  if (Array.isArray(forwardedFor)) {
    return forwardedFor[0];
  }

  return undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  const testEventCode = process.env.META_TEST_EVENT_CODE;

  if (!pixelId || !accessToken) {
    return res.status(500).json({
      error: "Meta Pixel ID or Access Token is missing.",
    });
  }

  try {
    const body = req.body as MetaConversionsRequestBody;

    if (!body?.event_name || !body?.event_id) {
      return res.status(400).json({
        error: "event_name and event_id are required.",
      });
    }

    const userAgent = req.headers["user-agent"];
    const clientIpAddress = getClientIp(req);

    const payload = {
      data: [
        {
          event_name: body.event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: body.event_id,
          action_source: "website",
          event_source_url: body.event_source_url,
          user_data: {
            client_ip_address: clientIpAddress,
            client_user_agent: userAgent,
            fbp: body.fbp,
            fbc: body.fbc,
          },
        },
      ],
      ...(testEventCode ? { test_event_code: testEventCode } : {}),
    };

    const metaResponse = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await metaResponse.json();

    if (!metaResponse.ok) {
      return res.status(metaResponse.status).json({
        error: "Meta Conversions API request failed.",
        details: result,
      });
    }

    return res.status(200).json({
      success: true,
      meta: result,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error while sending Meta event.",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}
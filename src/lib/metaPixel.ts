declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

type MetaEventName = "PageView" | "Contact" | "Lead";

function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;

  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const target = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return target ? decodeURIComponent(target.split("=")[1]) : undefined;
}

function generateEventId(eventName: MetaEventName) {
  return `${eventName}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export async function sendMetaEvent(eventName: MetaEventName) {
  if (typeof window === "undefined") return;

  const eventId = generateEventId(eventName);
  const eventSourceUrl = window.location.href;

  if (typeof window.fbq === "function") {
    window.fbq("trackSingle", "4539639952958853", eventName, {}, { eventID: eventId });
  }

  try {
    await fetch("/api/meta-conversions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: eventSourceUrl,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      }),
    });
  } catch (error) {
    console.warn("Erro ao enviar evento para a API de Conversões da Meta:", error);
  }
}
import { useMutation } from "@tanstack/react-query";

export interface ContactFormBody {
  name: string;
  phone: string;
  email: string;
  reason?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}

async function submitContact(data: ContactFormBody): Promise<ContactFormResponse> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error ?? "Erro ao enviar contato.");
  }

  return payload;
}

export function useSubmitContact() {
  return useMutation({
    mutationKey: ["submitContact"],
    mutationFn: ({ data }: { data: ContactFormBody }) => submitContact(data),
  });
}

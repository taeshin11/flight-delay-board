export function trackEvent(event: string, data?: Record<string, string>) {
  const url = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (!url) return;
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      timestamp: new Date().toISOString(),
      ...data,
    }),
  }).catch(() => {});
}

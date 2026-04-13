import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export function proxy(request: Parameters<typeof handleI18n>[0]) {
  return handleI18n(request);
}

export const config = {
  matcher: ["/", "/(en|ko|ja|zh|es|fr|de|pt)/:path*"],
};

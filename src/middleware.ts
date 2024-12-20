import {
  clerkMiddleware,
  createRouteMatcher,
  ClerkMiddlewareAuth,
} from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isProtected = createRouteMatcher([
  "/dashboard",
  "/invoices/:invoiceId",
  "/invoices/new",
]);

export default clerkMiddleware(
  async (auth: ClerkMiddlewareAuth, request: NextRequest) => {
    if (isProtected(request)) await auth.protect();
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

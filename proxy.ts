import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server";
import { NextResponse } from "next/server";

const VALID_USER = "admin";
const VALID_PASS = process.env.PREVIEW_PASSWORD!;

function isAuthenticated(request: Request): boolean {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;
  const [user, pass] = atob(auth.slice(6)).split(":");
  return user === VALID_USER && pass === VALID_PASS;
}

export default convexAuthNextjsMiddleware((request) => {
  if (!isAuthenticated(request)) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="ViralDishes Preview"' },
    });
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

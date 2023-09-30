export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/api"],
  // matcher: ["/((?!register|api|login).*)"],
};
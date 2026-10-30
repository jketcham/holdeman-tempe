import { defineEnvVars } from "@sveltejs/kit/env";

// Optional so a missing secret disables admin login instead of failing app startup.
// Code that reads them must treat an empty/undefined value as "not configured".
export const variables = defineEnvVars({
  ADMIN_PASSWORD: {
    schema: (value) => value || undefined,
    description: "Password for the /admin dashboard",
  },
  ADMIN_SESSION_SECRET: {
    schema: (value) => value || undefined,
    description: "Value of the admin_session cookie that grants access to /admin",
  },
});

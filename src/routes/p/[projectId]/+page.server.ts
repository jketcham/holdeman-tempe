import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const { projectId } = params;
  throw redirect(301, `/projects/${projectId}`);
};

import { createTRPCRouter } from "../init";
import { linksRouter } from "./links";

export const appRouter = createTRPCRouter({
  links: linksRouter,
});

export type AppRouter = typeof appRouter;

import { Application } from "jsr:@oak/oak/application";
import { Router } from "jsr:@oak/oak/router";
import { routeStaticFilesFrom, routeIndexHTMLFrom } from "./util/routeStaticFilesFrom.ts";

export const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(routeStaticFilesFrom([
  `${Deno.cwd()}/client/dist`,
  `${Deno.cwd()}/client/public`,
]));
app.use(routeIndexHTMLFrom(
  `${Deno.cwd()}/client/dist/`,
));
if (import.meta.main) {
  console.log("Server listening on port http://localhost");
  await app.listen({ port: 80, hostname: "0.0.0.0" });
}
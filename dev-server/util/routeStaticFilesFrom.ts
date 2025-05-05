import { Next } from "jsr:@oak/oak/middleware";
import { Context } from "jsr:@oak/oak/context";

// Configure static site routes so that we can serve
// the Vite build output and the public folder
export function routeStaticFilesFrom(staticPaths: string[]) {
  return async (context: Context<Record<string, object>>, next: Next) => {
    for (const path of staticPaths) {
      try {
        await context.send({ root: path, index: "index.html" });
        return;
      } catch {
        continue;
      }
    }
    await next();
  };
}

export function routeIndexHTMLFrom(htmlPath: string) {
  return async (context: Context<Record<string, object>>, next: Next) => {
    try {
      await context.send({ root: htmlPath, path: "index.html" });
      return;
    } catch {

    }
    await next();
  };
}

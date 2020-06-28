import { Application, Context } from "https://deno.land/x/oak/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://deno.land/x/view_engine/mod.ts";

import { APP_HOST, APP_PORT } from "./config.ts";
import { Client } from "https://deno.land/x/mysql/mod.ts";
import router from "./controller/index.ts";

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();
const app = new Application();

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

app.use(async (ctx: any, next) => {
  ctx.client = await new Client().connect({
    hostname: "127.0.0.1",
    username: "root",
    db: "deno_database",
    poolSize: 10, // connection limit
    password: "root",
  })
  await next()
})

app.use(viewEngine(oakAdapter,ejsEngine));
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${APP_PORT}...`);

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});

await app.listen(`${APP_HOST}:${APP_PORT}`);
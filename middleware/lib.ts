import { Client } from "https://deno.land/x/mysql/mod.ts";

class middleWareController {
  static async conn (ctx: any) {
    return await new Client().connect({
      hostname: "127.0.0.1",
      username: "root",
      db: "deno_database",
      poolSize: 10, // connection limit
      password: "root",
    })
  }
}

export default middleWareController
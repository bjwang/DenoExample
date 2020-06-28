// import { Response } from "https://deno.land/x/oak/mod.ts";
// import { renderFile } from 'https://deno.land/x/dejs/mod.ts';

const { cwd } = Deno;

export default async (ctx: any) => {
  await ctx.client.execute(`DROP TABLE IF EXISTS users`);
  await ctx.client.execute(`
    CREATE TABLE users (
      id int(11) NOT NULL AUTO_INCREMENT,
      name varchar(100) NOT NULL,
      created_at timestamp not null default current_timestamp,
      PRIMARY KEY (id)
    ) DEFAULT CHARSET=utf8;
  `);
  const _data = {
    title: 'home',
    content: 'home_content',
    listData: [{
      name: 'john',
      age: 23
    }, {
      name: 'Tom',
      age: 19
    }]
  }
  // await ctx.client.execute(`INSERT INTO users(name) values(?)`, [
  //   'manyuanrong', 'manyuanrong1',
  // ]);
  await ctx.client.execute(`INSERT INTO users(name) VALUES('manyuanrong1')`)
  await ctx.client.close();
  ctx.render(`${cwd()}/views/home.ejs`, _data)
};
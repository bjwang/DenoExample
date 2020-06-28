// import { Response, RouteParams } from "https://deno.land/x/oak/mod.ts";

// export const about =  async ({ response }: { response: Response }) => {
//   response.body = "About!";
// };

// export const detail = async ({ response, params }: { response: Response, params: RouteParams }) => {
//   const _id = params.id;
//   response.body = `About detail! ${_id}`;
// };
import { getQuery } from "https://deno.land/x/oak/helpers.ts";

class aboutController {
  static async Index(ctx: any) {
    ctx.response.body = 'About!'
  }

  static async Detail(ctx: any) {
    const _id = ctx.params.id;
    const paramsValue =  getQuery(ctx, { mergeParams: true });
    const _name = paramsValue.name || '';
    // console.log('ctx.detail', ctx.request.header)
    ctx.response.body = `About detail! ${_id} - ${_name}`
  }
}

export default aboutController
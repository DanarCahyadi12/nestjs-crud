import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (datas: string[] | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!datas) return user;
    const result: object = {};
    datas.forEach((key) => {
      result[key] = user[key];
    });
    return result;
  },
);

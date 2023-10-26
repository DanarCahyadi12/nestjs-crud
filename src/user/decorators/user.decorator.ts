import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (datas: string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (datas.length === 0) return user;
    const result: object = {};
    datas.forEach((key) => {
      result[key] = user[key];
    });
    return result;
  },
);

import { ExecutionContext } from '@nestjs/common';

export const User = (context: ExecutionContext, ...datas: string[]) => {
  const req = context.switchToHttp().getRequest();
  const user = req.UserController;
  if (datas.length === 0) return user;
  const result: object = {};
  datas.forEach((key) => {
    result[key] = user[key];
  });

  return result;
};

import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user)
    return request.user ?? null;
  }
);

export const CurrentProfile = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) throw new BadRequestException(['Falha na autenticação do usuário'])
    console.log(request.user.profile)
    return request.user.profile ?? null;
  }
);
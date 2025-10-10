import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthTokenType } from 'src/auth/interfaces/payload-auth.interface';

export const CurrentUser = createParamDecorator(
  (data: AuthTokenType | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    
    if (!data) {
      return request.user;
    }
    
    return request.user[data];
  },
);
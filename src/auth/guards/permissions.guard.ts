import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/common/decorator/permissions.decorator';
import { PerfilService } from 'src/perfil/perfil.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private perfilService: PerfilService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions) {
      return true; // Se não há permissões requeridas, permite acesso
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.perfilId) {
      throw new ForbiddenException('Usuário sem permissões necessárias');
    }

    // Busca o perfil com as permissões
    const perfil = await this.perfilService.findOne(user.perfilId);

    if (!perfil) {
      throw new ForbiddenException('Usuário sem permissões necessárias');
    }

    // Verifica se o usuário tem pelo menos uma das permissões necessárias
    const hasPermission = requiredPermissions.some(permission =>
      perfil.permissions.includes(permission)
    );

    if (hasPermission) return true;

    throw new ForbiddenException(
      'Você não tem permissão para acessar este recurso'
    );
  }
}
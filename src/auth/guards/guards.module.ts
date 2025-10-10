import { Module } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { PerfilModule } from 'src/perfil/perfil.module';

@Module({
  imports: [PerfilModule],
  providers: [PermissionsGuard],
  exports: [PermissionsGuard],
})
export class GuardsModule {}
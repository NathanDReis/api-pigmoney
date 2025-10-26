import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  // UseGuards 
} from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
// import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
// import { Permissions } from 'src/common/decorator/permissions.decorator';

// @UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  // @Permissions('admin', 'perfil')
  create(@Body() createPerfilDto: CreatePerfilDto) {
    return this.perfilService.create(createPerfilDto);
  }

  @Get()
  // @Permissions('admin', 'perfil')
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(':id')
  // @Permissions('admin', 'perfil')
  findOne(@Param('id') id: string) {
    return this.perfilService.findOne(id);
  }

  @Patch(':id')
  // @Permissions('admin', 'perfil')
  update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
    return this.perfilService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  // @Permissions('admin', 'perfil')
  remove(@Param('id') id: string) {
    return this.perfilService.remove(id);
  }

  @Patch('restore/:id')
  // @Permissions('admin')
  restore(@Param('id') id: string) {
    return this.perfilService.restore(id);
  }

  @Delete('hardDelete/:id')
  // @Permissions('admin')
  hardDelete(@Param('id') id: string) {
    return this.perfilService.hardDelete(id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PerfilService } from './perfil.service';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('perfil')
export class PerfilController {
  constructor(private readonly perfilService: PerfilService) {}

  @Post()
  create(@Body() createPerfilDto: CreatePerfilDto) {
    return this.perfilService.create(createPerfilDto);
  }

  @Get()
  findAll() {
    return this.perfilService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perfilService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerfilDto: UpdatePerfilDto) {
    return this.perfilService.update(id, updatePerfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perfilService.remove(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.perfilService.restore(id);
  }

  @Delete('hardDelete/:id')
  hardDelete(@Param('id') id: string) {
    return this.perfilService.hardDelete(id);
  }
}

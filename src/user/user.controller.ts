import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findOne(@CurrentUser('userId') userId: string) {
    return this.userService.findOne(userId);
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(
    @CurrentUser('userId') userId: string, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@CurrentUser('userId') userId: string) {
    return this.userService.remove(userId);
  }

  @Patch('restore/:id')
  @UseGuards(JwtAuthGuard)
  restore(@Param('id') id: string) {
    return this.userService.restore(id);
  }

  @Delete('hardDelete/:id')
  @UseGuards(JwtAuthGuard)
  hardDelete(@Param('id') id: string) {
    return this.userService.hardDelete(id);
  }
}

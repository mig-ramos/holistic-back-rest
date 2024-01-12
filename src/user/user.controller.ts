import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user';
import { UpdatePatchUserDTO } from './dto/update-patcht-user';
import { UserService } from './user.service';
import { ParamId } from '../decorators/param-id.decorator';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';
// import { LogInterceptor } from '../interceptors/log.interceptor';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
// @UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseInterceptors(LogInterceptor)
  @UseGuards(ThrottlerGuard) // Pode sobrescrever o padrao (new hrottlerGuard({}) )
  @Post()
  // async create(@Body() body: CreateUserDTO) {
  async create(
    @Body() { email, name, password, birthAt, role }: CreateUserDTO,
  ) {
    return this.userService.create({ email, name, password, birthAt, role });
  }

  @Get()
  async list() {
    return this.userService.list();
  }

  @Get(':id')
  // Decorator personalizado posso substituir todos param id
  async show(@ParamId() id: number) {
    console.log({ id });
    return this.userService.show(id);
  }

  @Put(':id')
  async update(
    @Body() data: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updateParcial(
    @Body() data: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards
} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ operationId: "createUser", description: "Create a user" })
  @ApiBadRequestResponse({ description: "Error trying to create a user" })
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Get('/findUsers')
  @ApiOperation({ operationId: "findUser", description: "Find al users" })
  @ApiBadRequestResponse({ description: "Error trying to find users" })
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get('findUserId/:id')
  @ApiOperation({ operationId: "findUserByID", description: "Find user by ID" })
  @ApiBadRequestResponse({ description: "Error trying to find the user" })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('findUserEmail/:email')
  @ApiOperation({ operationId: "findUserByEmail", description: "Find user by Email" })
  @ApiBadRequestResponse({ description: "Error trying to find the user" })
  findByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email);
  }

  @Patch('updateUser/:id')
  @ApiOperation({ operationId: "updateUser", description: "Update user" })
  @ApiBadRequestResponse({ description: "Error trying to update the user" })
  update(@Param('id') id: string, @Body() newUser: UpdateUserDto) {
    return this.userService.update(id, newUser);
  }

  @Delete('deleteUser/:id')
  @ApiOperation({ operationId: "deleteUser", description: "Delete user" })
  @ApiBadRequestResponse({ description: "Error trying to delete the user" })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}

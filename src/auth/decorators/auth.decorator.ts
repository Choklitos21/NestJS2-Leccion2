import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserRoleGuard } from '../guards/user-role.guard';
import {RoleProtected} from "../../user/decorators/role-protected.decorator";
import {UserRoles} from "../../utils/enums/enum-roles.enum";

export function Auth(...roles: UserRoles[]) {
    return applyDecorators(
        RoleProtected(...roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
}
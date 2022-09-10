import { SetMetadata } from '@nestjs/common';
import {UserRoles} from "../../utils/enums/enum-roles.enum";

export const RoleProtected = (...args: UserRoles[]) => SetMetadata('roles', args);

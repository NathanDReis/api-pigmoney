import { SetMetadata } from "@nestjs/common";

export const PERMISSIONS_KEY = 'permissions';

type permissionsType = 'user' | 'perfil' | 'admin'

export const Permissions = (...permissions: permissionsType[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
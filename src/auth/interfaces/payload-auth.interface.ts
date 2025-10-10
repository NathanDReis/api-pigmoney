export interface AuthToken {
  sub: string;
  email: string;
  perfil: string;
}

export interface AuthResult {
  userId: string;
  email: string;
  perfilId: string;
}

export type AuthTokenType = "userId" | "email" | "perfilId"
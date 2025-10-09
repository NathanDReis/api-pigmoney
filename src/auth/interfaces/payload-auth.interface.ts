export interface PayloadAuthToken {
  sub: string;
  email: string;
  perfil: string;
}

export interface PayloadAuthResult {
  userId: string;
  email: string;
  perfilId: string;
}
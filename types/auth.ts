export interface AuthCredentials {
  email: string;
  password: string;
}

export interface PasswordResetPayload {
  email: string;
}

export interface AuthActionResult {
  error: string | null;
}

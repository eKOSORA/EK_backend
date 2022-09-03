export interface DefaultResponse {
  code: string;
  message?: string;
  token?: string;
}

export interface LoginResponse extends DefaultResponse {
  id?: string;
}

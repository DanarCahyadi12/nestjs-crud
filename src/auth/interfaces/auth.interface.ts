export interface ResponseAuth {
  status: string;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}

export interface UserPayload {
  sub: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

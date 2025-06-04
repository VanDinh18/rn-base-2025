export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  username: string;
};

export type LoginRequest = {
  username: string;
  password: string;
};

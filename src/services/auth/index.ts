import { dummyClient } from '../client';

import { LoginRequest, LoginResponse } from './types';

function login(params: LoginRequest) {
  return dummyClient.post<LoginResponse>('/auth/login', {
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 30,
  });
}

export { login };

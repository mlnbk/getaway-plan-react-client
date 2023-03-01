import { applySnapshot, types } from 'mobx-state-tree';

import { LoginParameters, User } from '../types';
import { apiService } from '../Utils/APIService';

const UserStore = types
  .model({
    token: types.string,
  })
  .volatile((self) => ({
    user: new User(),
  }))
  .actions((self) => ({
    async login({ email, password }: LoginParameters) {
      const tokenResponse = await apiService.post('auth/login', {
        email,
        password,
      });
      if (tokenResponse) {
        this.setToken(tokenResponse.access_token);
        const userResponse = await apiService.get('/user/me');
        if (userResponse) {
          this.setUser(userResponse);
        } else {
          throw new Error('Error while loggin in. Please try again later!');
        }
      } else {
        throw new Error('Error while loggin in. Please try again later!');
      }
    },
    reset() {
      applySnapshot(self, { token: '' });
    },
    setUser(user: User) {
      self.user = user;
    },
    setToken(token: string) {
      self.token = token;
    },
  }))
  .views((self) => ({
    get authenticated() {
      return self.token.length > 0;
    },
  }));
export const userStore = UserStore.create({ token: '' });

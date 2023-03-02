import {
  applySnapshot,
  onAction,
  onPatch,
  onSnapshot,
  types,
} from 'mobx-state-tree';

import { LoginParameters, Role } from '../types';
import { apiService } from '../Utils/APIService';

const UserModel = types.model('User', {
  email: types.string,
  name: types.string,
  profilePic: types.string,
  roles: types.array(types.enumeration('role', Object.keys(Role))),
});

let initialState = {
  token: '',
  user: UserModel.create({
    email: '',
    name: '',
    profilePic: '',
    roles: [],
  }),
};

const UserStore = types
  .model({
    token: types.maybeNull(types.string),
    user: types.maybeNull(UserModel),
  })
  .actions((self) => ({
    async login({ email, password }: LoginParameters) {
      const tokenResponse = await apiService.post('auth/login', {
        email,
        password,
      });
      if (!tokenResponse) {
        throw new Error('Error while loggin in. Please try again later!');
      }
      this.setToken(tokenResponse.access_token);
      await this.getProfile();
    },
    async getProfile() {
      const userResponse = await apiService.get('/user/me');
      if (!userResponse) {
        throw new Error('Error while loggin in. Please try again later!');
      }
      this.setUser(userResponse);
    },
    logout() {
      this.reset();
    },
    reset() {
      applySnapshot(self, {});
    },
    setUser(user: any) {
      self.user = UserModel.create(user);
    },
    setToken(token: string) {
      self.token = token;
    },
  }))
  .views((self) => ({
    get authenticated() {
      return self.token && self.token.length > 0;
    },
  }));

const foundItem = localStorage.getItem('userStore');
if (foundItem) {
  const foundState = JSON.parse(foundItem);
  if (UserStore.is(foundState)) {
    initialState = foundState as any;
  }
}
export const userStore = UserStore.create(initialState);

onSnapshot(userStore, (snapshot) => {
  localStorage.setItem('userStore', JSON.stringify(snapshot));
});

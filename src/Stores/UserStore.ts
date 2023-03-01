import { types } from 'mobx-state-tree';
import { User } from '../types';

const UserStore = types
  .model({})
  .volatile((self) => ({
    user: new User(),
  }))
  .actions((self) => ({
    setUser(user: User) {
      self.user = user;
    },
  }));

export const userStore = UserStore.create({});

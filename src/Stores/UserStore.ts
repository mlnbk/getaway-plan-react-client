import { applySnapshot, types } from 'mobx-state-tree';
import { User } from '../types';
import { StringWithLength } from './util';

const UserStore = types
  .model({})
  .volatile((self) => ({
    token: StringWithLength.create({ value: '' }),
    user: new User(),
  }))
  .actions((self) => ({
    reset() {
      applySnapshot(self, {});
    },
    setUser(user: User) {
      self.user = user;
    },
  }))
  .views((self) => ({
    get authenticated() {
      return self.token.length > 0;
    },
  }));
export const userStore = UserStore.create({});

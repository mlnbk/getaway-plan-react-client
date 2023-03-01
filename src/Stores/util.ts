import { types } from 'mobx-state-tree';

export const StringWithLength = types
  .model({
    value: types.string,
  })
  .views((self) => ({
    get length() {
      return self.value.length;
    },
  }));

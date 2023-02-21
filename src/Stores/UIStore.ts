import { types } from 'mobx-state-tree';

const UIStore = types
  .model({
    darkMode: types.boolean,
  })
  .actions((self) => ({
    toggleDarkMode() {
      self.darkMode = !self.darkMode;
      document.body.style.colorScheme = 'light';
      console.log(self.darkMode);
    },
  }));

export const uiStore = UIStore.create({
  darkMode: true,
});

import { types } from 'mobx-state-tree';

const UIStore = types
  .model({
    darkMode: types.boolean,
  })
  .actions((self) => ({
    setDarkMode(isDark: boolean) {
      self.darkMode = isDark;
    },
    toggleDarkMode() {
      self.darkMode = !self.darkMode;
      document.body.style.colorScheme = 'light';
    },
  }));

export const uiStore = UIStore.create({
  darkMode: true,
});

import { types } from 'mobx-state-tree';
import { SpinnerColor } from '../types';

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
  }))
  .views((self) => ({
    get spinnerColor() {
      return self.darkMode ? SpinnerColor.dark : SpinnerColor.light;
    },
  }));

export const uiStore = UIStore.create({
  darkMode: true,
});

import { types } from 'mobx-state-tree';

import { SpinnerColor } from '@types';

const UIStore = types
  .model({
    darkMode: types.boolean,
    isAddTripModalOpen: types.boolean,
    isDeleteTripModalOpen: types.boolean,
    selectedTrip: types.maybe(types.string),
  })
  .actions((self) => ({
    setDarkMode(isDark: boolean) {
      self.darkMode = isDark;
    },
    setIsAddTripModalOpen(open: boolean) {
      self.isAddTripModalOpen = open;
    },
    setIsDeleteTripModalOpen(open: boolean) {
      self.isDeleteTripModalOpen = open;
    },
    setSelectedTrip(id?: string) {
      self.selectedTrip = id;
    },
    toggleDarkMode() {
      self.darkMode = !self.darkMode;
    },
  }))
  .views((self) => ({
    get spinnerColor() {
      return self.darkMode ? SpinnerColor.light : SpinnerColor.dark;
    },
  }));

export const uiStore = UIStore.create({
  darkMode: true,
  isAddTripModalOpen: false,
  isDeleteTripModalOpen: false,
});

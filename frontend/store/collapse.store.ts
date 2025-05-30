import {defineStore} from 'pinia';

export const useCollapseStore = defineStore('collapse', {
  state: () => ({
    isCollapsedState: true, // State nomini o'zgartiramiz
  }),
  actions: {
    toggleCollapse() {
      this.isCollapsedState = !this.isCollapsedState;
    },
  },
  getters: {
    isCollapsed: (state) => state.isCollapsedState, // Getter nomi o'zgarmaydi
  },
});

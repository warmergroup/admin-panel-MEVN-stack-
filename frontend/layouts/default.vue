<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCollapseStore } from '~/store/collapse.store';

const collapseStore = useCollapseStore();
const isCollapsed = computed(() => collapseStore.isCollapsed);

// Ekran o‘lchamini aniqlash
const isMobile = ref(false);
const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 1024;
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);
});
</script>

<template>
  <div class="">
    <LayoutsNavbar />

    <!-- Sidebar -->
    <layoutsSidebar
      :class="isCollapsed ? 'translate-x-[-120%]' : 'translate-x-0'"
      class="sidebar"
      @click.stop
    />

    <!-- Sectionga bosilsa sidebar yopiladi (faqat mobilda) -->
    <section
      :class="{ 'lg:px-3': isCollapsed, 'lg:ml-72 md:mr-3': !isCollapsed }"
      class="mt-20 transition-all duration-300 section-height overflow-hidden relative bg-blue-50 dark:bg-gray-800 rounded-md p-2"
      @click="() => {
        if (isMobile && !isCollapsed) {
          collapseStore.toggleCollapse();
        }
      }"
    >
      <slot />
    </section>
  </div>
</template>

<style scoped>
.sidebar {
  @apply transform transition-transform duration-300;
}

.section-height {
  height: calc(100vh - 100px);
}
</style>

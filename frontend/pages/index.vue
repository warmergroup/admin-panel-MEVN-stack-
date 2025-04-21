<script setup lang="ts">
import {useGetProductStatistics} from '~/query/product/getProductStatistics';
import {useGetCategoryStatistics} from '~/query/category/getCategoryStatistics';
import {useGetImageStatistics} from '~/query/images/getImagesStatistiks';
import {useGetCategorysQuery} from "~/query/category/getCategorys";

const {} = useGetCategorysQuery()
useHead({title: 'Dashboard | Admin Panel'});

const statistics = ref([
  {
    key: 'products',
    title: 'Mahsulotlar',
    data: useGetProductStatistics(),
    style: '#0f0;',
  },
  {
    key: 'categories',
    title: 'Kategoriyalar',
    data: useGetCategoryStatistics(),
    style: '#f00;',
  },
  {
    key: 'images',
    title: 'Rasmlar',
    data: useGetImageStatistics(),
    style: '#0ff;',
  }
]);

</script>

<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold text-center mb-6">Dashboard</h1>
    <div v-if="statistics.some(stat => stat.data.error)" class="mb-4">
      <SharedAlert :message="extractErrorMessage(statistics.find(stat => stat.data.error)?.data.error)"/>
    </div>
    <div
      class="card-container mx-auto overflow-y-auto h-[65vh] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      <SharedBlurCard v-for="stat in statistics">
        <div class="card-content rounded-md  w-full h-full">
          <h1 class="text-2xl font-semibold">{{ stat.title }}</h1>
          <p>Jami: {{ stat.data.data?.total }} ta</p>
          <h3 class="text-base font-semibold">yangi qo'shilganlar</h3>
          <p>Oxirgi 3 kun:
            <UBadge :label=" stat.data.data?.lastThreeDays" variant="subtle" />
            ta</p>
          <p>Oxirgi 24 soat: {{stat.data.data?.lastTwentyFourHours}} ta</p>
        </div>
      </SharedBlurCard>
      <SharedBlurCard>
        <UiStorageUsage/>
      </SharedBlurCard>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  flex-wrap: wrap;

}
</style>

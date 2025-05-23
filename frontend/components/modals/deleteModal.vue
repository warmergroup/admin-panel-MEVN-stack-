<script setup lang="ts">
import {useConfirm} from '~/hooks/use-confirm';
import {useMutation} from '@tanstack/vue-query';
import {extractErrorMessage} from '~/utils/formUtils';
import $api from '~/http/api';

const props = defineProps({
  modalType: String,
  title: String,
  entityId: String,
  deleteEndpoint: String,
  removeEntity: Function,
});

const confirm = useConfirm();
const toast = useToast();

const isOpen = computed({
  get: () => confirm.isOpen && confirm.modalType === props.modalType,
  set: (value) => (confirm.isOpen = value),
});

const {mutate, error, isPending} = useMutation({
  mutationKey: [`delete-${props.deleteEndpoint}`],
  mutationFn: async () => {
    if (!props.entityId) throw new Error(`${props.title} mavjud emas!`);
    const {data} = await $api.delete(`/${props.deleteEndpoint}/delete/${props.entityId}`);
    return data;
  },
  onSuccess: () => {
    props.removeEntity(props.entityId);
    confirm.onClose();
    toast.add({
      title: `${props.title} o'chirildi`,
      icon: 'bx:icon-deleted',
      color: 'red',
    });
  },
});

const onClose = () => {
  confirm.onClose();
};

const onDelete = () => {
  mutate();
};
</script>

<template>
  <UModal v-model="isOpen">
    <UCard class="p-4 flex flex-col gap-2">
      <div v-if="error">
        <SharedAlert :message="extractErrorMessage(error)"/>
      </div>
      <div>
        <h1 class="text-xl font-bold">Ushbu {{ title }} ni o'chirishga aminmisiz?</h1>
        <UDivider/>
        <p>Agar uni o'chirsangiz, ma'lumotlar bazasidan butunlay o'chib ketadi.</p>
      </div>
      <template #footer>
        <div class="w-1/2 grid grid-cols-2 gap-2">
          <UButton label="Bekor qilish" color="blue" variant="outline" :disabled="isPending" @click="onClose"/>
          <UButton label="O'chirish" color="red" @click="onDelete" :loading="isPending"/>
        </div>
      </template>
    </UCard>
  </UModal>
</template>
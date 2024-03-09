<template>
  <Modal />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { checkConnection } from '@/service/api-service'
checkConnection()

import { titleStore } from '@/stores/titleStore';
titleStore.startClock()
</script>

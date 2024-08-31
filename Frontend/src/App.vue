<template>
  <Modal />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Modal from '@/components/Modal.vue'
import { checkConnection } from '@/service/api-service'
import { onMounted } from 'vue'

checkConnection()

import { titleStore } from '@/stores/titleStore';
titleStore.startClock()

onMounted(() => {
  addEventListener('resize', setSize)
  setSize()
})

function setSize() {
  /**
   * Leveraging JavaScript for handling screen orientation instead of media queries
   * to gain more customization and flexibility. This approach provides finer control
   * over mobile size transitions between portrait and landscape.
   * 
   * While media queries could handle this, they may require excessive use of `!important`
   * to override styles, leading to potential conflicts and maintenance issues.
   */
  const width = window.innerWidth;
  const height = window.innerHeight;
  document.documentElement.dataset.mobile = width <= 900;
  document.documentElement.dataset.rotation = height > width ? 'portrait' : 'landscape';
}
</script>
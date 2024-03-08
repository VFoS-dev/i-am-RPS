<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { checkConnection } from '@/service/api-service'
checkConnection()

import { titleStore } from '@/stores/titleStore';
titleStore.startClock()
</script>

<style scoped lang="less">

</style>

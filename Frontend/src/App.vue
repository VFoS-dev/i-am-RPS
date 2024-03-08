<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { checkConnection } from '@/service/api-service'
checkConnection()
</script>

<style scoped lang="less">

</style>

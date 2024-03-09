<template>
    <div class="container">
        <JoinView />
        <IAm />
        <CreateView />
    </div>
</template>

<script setup>
import JoinView from './JoinView.vue';
import CreateView from './CreateView.vue';
import IAm from '@/components/IAm.vue';
</script>

<style scoped lang="less">
.container {
    display: flex;
    min-width: 100dvw;
    min-height: 100dvh;
    justify-content: space-around;
    align-items: center;
}
</style>
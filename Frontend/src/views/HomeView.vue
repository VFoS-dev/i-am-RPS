<template>
    <div class="container">
        <JoinModal />
        <IAm />
        <CreateModal />
    </div>
</template>

<script setup>
import JoinModal from '@/components/JoinModal.vue';
import CreateModal from '@/components/CreateModal.vue';
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
<template>
    <div class="turn-container">
        asdf
    </div>
</template>

<script setup>
import { gameData } from '@/stores/gameData';
import { gameIAm } from '@/service/api-service'
</script>

<style scoped lang="less">
.turn-container {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
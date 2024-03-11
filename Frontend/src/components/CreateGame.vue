<template>
    <button @click="startGame">
        Start Game
    </button>
</template>

<script setup>
import { startGame } from '@/service/api-service';
</script>

<style scoped lang="less">
button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}
</style>
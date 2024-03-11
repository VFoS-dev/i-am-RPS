<template>
    <div class="game-container" :class="[gameData.game.state, `player${gameData.connection.player}`]">
        <Player :playerId="1" />
        <CreateGame class="lobby-only host-only" />
        <Player :playerId="2" />
        <YourMove class="your-turn" />
    </div>
</template>

<script setup>
import Player from '@/components/Player.vue'
import CreateGame from '@/components/CreateGame.vue'
import YourMove from '@/components/YourMove.vue'
import { gameData } from '@/stores/gameData';
import { onMounted } from 'vue';
import router from '@/router';

onMounted(() => {
    if (!Object.keys(gameData.connection).length) {
        router.push({ name: 'home' })
    }
})
</script>

<style scoped lang="less">
.game-container {
    display: flex;
    flex-direction: row;
    height: 100dvh;
}
</style>
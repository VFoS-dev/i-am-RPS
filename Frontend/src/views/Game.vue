<template>
    <div class="game-container" :class="[gameData.game.state, `player${gameData.connection.player}`]">
        <Player :playerId="1" @swapCharacters="handleChange" />
        <CreateGame class="lobby-only" />
        <Player :playerId="2" @swapCharacters="handleChange" />
        <YourMove class="your-turn" />
    </div>
</template>

<script setup>
import Player from '@/components/Player.vue'
import CreateGame from '@/components/CreateGame.vue'
import YourMove from '@/components/YourMove.vue'
import { gameData } from '@/stores/gameData';

</script>

<style scoped lang="less">
.game-container {
    display: flex;
    flex-direction: row;
    height: 100dvh;
}
</style>
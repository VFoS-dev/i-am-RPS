<template>
    <div class="game-container" :class="[gameData.game.state, `player${gameData.connection.player}`]">
        <Player :playerNumber="1" :gameState="gameState" />
        <StartGame v-if="isHost && bothPlayers && gameState.lobby" />
        <Player :playerNumber="2" :gameState="gameState" />
        <YourMove v-if="yourTurn" />
    </div>
</template>

<script setup>
import Player from '@/components/Player.vue'
import StartGame from '@/components/StartGame.vue'
import YourMove from '@/components/YourMove.vue'
import { gameData } from '@/stores/gameData';
import { onMounted, computed } from 'vue';
import router from '@/router';

onMounted(() => {
    if (!Object.keys(gameData.connection).length) {
        router.push({ name: 'home' })
    }
})

const isHost = computed(() => gameData.connection.player == 1)

const gameState = computed(() => ({
    [{
        lobby: 'lobby',
        turn_player1: `turn${isHost.value ? 'Yours' : 'Opponent'}`,
        turn_player2: `turn${isHost.value ? 'Opponent' : 'Yours'}`,
        roundEnd: 'roundEnd',
        results: 'results',
    }[gameData.game.state]]: true
}))


const yourTurn = computed(() => {
    const { connection: { player }, game: { state } } = gameData
    return state == `turn_player${player}`
})

const bothPlayers = computed(() => {
    const { player1, player2 } = gameData.game
    return player1 && !player1.disconnected
        && player2 && !player2.disconnected
})
</script>

<style scoped lang="less">
.game-container {
    display: flex;
    flex-direction: row;
    height: 100dvh;
}
</style>
<template>
    <div class="game-container" :class="[state, `player${gameData.connection.player}`]">
        <Player :playerNumber="1" :gameState="gameState" />
        <GameButton v-if="isHost && bothPlayers && gameState.lobby" @onClick="startGame">
            Start Game
        </GameButton>
        <GameButton v-if="gameState.results" @onClick="gameData.clearAll">
            Go Home
        </GameButton>
        <Reason :style="{ opacity: gameData.game.history?.length ?? 0 }" />
        <PlayersTurn v-if="gameState.gameplay" :number="gameState.number">
            {{ yourTurn ? "Your Turn" : "Opponent's Turn" }}
        </PlayersTurn>

        <Player :playerNumber="2" :gameState="gameState" />
        <YourMove v-if="yourTurn && !gameData.promptSubmitted" />
    </div>
</template>

<script setup>
import { startGame } from '@/service/api-service';
import Player from '@/components/Player.vue'
import GameButton from '@/components/GameButton.vue'
import PlayersTurn from '@/components/PlayersTurn.vue'
import YourMove from '@/components/YourMove.vue'
import Reason from '@/components/Reason.vue';
import { gameData } from '@/stores/gameData';
import { onMounted, computed } from 'vue';
import router from '@/router';

onMounted(() => {
    if (!Object.keys(gameData.connection).length) {
        router.push({ name: 'home' })
    }
})

const isHost = computed(() => gameData.connection.player == 1)

const gameState = computed(() => {
    const { state } = gameData?.game ?? {};
    const [, number] = state.split('turn_player')
    return {
        [{
            lobby: 'lobby',
            turn_player1: `turn${isHost.value ? 'Yours' : 'Opponent'}`,
            turn_player2: `turn${isHost.value ? 'Opponent' : 'Yours'}`,
            roundEnd: 'roundEnd',
            results: 'results',
        }[state]]: true,
        gameplay: state?.includes('turn'),
        number,
    }
})

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
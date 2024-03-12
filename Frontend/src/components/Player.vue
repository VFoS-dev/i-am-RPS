<template>
    <div class="player"
        :class="[{ left: 1 == props.playerNumber, disconnected: playerDisconnected }, `player${props.playerNumber}`]">
        <div v-if="playerActive" class="player-iAm">
            <p v-if="player.iAm?.prompt">I am: <strong>{{ player.iAm?.prompt }}</strong></p>
        </div>
        <div class="player-health">
            <PlayerHealth :maxHealth="player.maxHealth" :health="player.health" :playerActive="playerActive">
                {{ player.playerName }}
            </PlayerHealth>
            <div class="player-options" v-if="playerActive">
                <ImageButtons v-if="isHost && gameState.lobby && !isYou" svg="kick" @onClick="kickPlayer" />
                <ImageButtons v-if="isYou" svg="swap" @onClick="changeDefaultImage" />
                <ImageButtons v-if="isYou" svg="leave" @onClick="leaveGame" />
            </div>
        </div>
        <div class="player-image" :class="{ hasImage: player.iAm?.image }">
            <GameCode v-if="!playerActive" :code="gameData.game?.code" />
            <img :src="selectedImage" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { gameData } from '@/stores/gameData';
import { changeDefaultImage, gameKickPlayer, leaveGame } from '@/service/api-service'
import ImageButtons from '@/components/ImageButtons.vue'
import PlayerHealth from '@/components/PlayerHealth.vue'
import GameCode from '@/components/GameCode.vue'

const props = defineProps({
    playerNumber: Number
})

const isHost = ref(false)
const isYou = ref(false)
const playerDisconnected = ref(true)
const playerIcon = ref(Math.ceil(Math.random() * 12))
const playerActive = ref(false)

const gameState = computed(() => ({
    [{
        lobby: 'lobby',
        turn_player1: `turn${isHost.value ? 'Yours' : 'Opponent'}`,
        turn_player2: `turn${isHost.value ? 'Opponent' : 'Yours'}`,
        roundEnd: 'roundEnd',
        results: 'results',
    }[gameData.game.state]]: true
}))

const player = computed(() => {
    const player = gameData.game[`player${props.playerNumber}`] ?? {}

    playerDisconnected.value = player.disconnected
    playerActive.value = player.playerName

    return player;
})

const connection = computed(() => {
    const connection = gameData.connection
    isHost.value = connection.player == 1
    isYou.value = connection.player == props.playerNumber

    return connection;
})

const selectedImage = computed(() => {
    if (!playerActive.value) return

    if (player.value.iAm?.image) return player.value.iAm.image

    return `/images/players/${player.value?.defaultImage ?? playerIcon}.png`
})

function kickPlayer() {
    const { socketId } = gameData.game[`player${props.playerNumber}`]
    gameKickPlayer(socketId)
}
</script>

<style scoped lang="less">
.player {
    position: relative;
    width: 50vw;
    height: 100%;
    flex-grow: 1;
    overflow: hidden;

    &.left {
        border-right: 1px solid black;

        .player-image:not(.hasImage) {
            img {
                scale: -1 1;
                transform: translate(50%, -50%);
            }
        }

    }

    .player-image {

        display: flex;
        z-index: 0;
        position: absolute;
        top: 50%;
        left: 50%;

        img {
            z-index: -1;
            transform: translate(-50%, -50%);
            position: absolute;
        }
    }
}

.disconnected .player-image {
    opacity: .25;
}

.player-iAm {
    z-index: 1;
    position: absolute;
    width: 100%;
    top: 10%;
    display: flex;
    justify-content: center;
}

.player-health {
    position: absolute;
    bottom: 10%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: gray;
    z-index: 1;
}

.player-options {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: .5rem;
    margin-bottom: .5rem;
    bottom: 100%;
}
</style>
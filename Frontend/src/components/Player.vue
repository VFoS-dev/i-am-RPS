<template>
    <div class="player" :class="[{ left: 1 == props.playerId }, `player${props.playerId}`]">
        <div class="temp">
            {{ player }}
            <br />
            {{ gameData.game.code }}
        </div>
        <div v-if="playerActive" class="player-iAm">
            <p v-if="player.iAm?.prompt">I am: <strong>{{ player.iAm?.prompt }}</strong></p>
        </div>
        <div v-if="playerActive" class="player-health">
            <div class="health-container" :style="`--width:${healthPercent}%;`">
                <h1> {{ player.playerName }} </h1>
            </div>
        </div>
        <div class="player-image">
            <button @click="kickPlayer" class="image-buttons opponent lobby-only host-only">Kick Player</button>
            <button @click="swapCharacter" class="image-buttons yours lobby-only">Swap Image</button>
            <img :src="selectedImage" />
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { gameData } from '@/stores/gameData';

import { changeDefaultImage, gameKickPlayer } from '@/service/api-service'
const props = defineProps({
    playerId: Number
})

const playerIcon = ref(Math.ceil(Math.random() * 12))
const player = computed(() => {
    return gameData.game[`player${props.playerId}`] ?? {}
})
const playerActive = computed(() => {
    return player.value.playerName && !player.value.disconnected
})
const healthPercent = computed(() => {
    const { health, maxHealth } = player.value
    return 100 * health / maxHealth
})
const selectedImage = computed(() => {
    if (!playerActive.value) return

    if (player.value.iAm?.image) return player.iAm.image

    return `/images/players/${player.value?.defaultImage ?? playerIcon}.png`
})

function kickPlayer() {
    const { socketId } = gameData.game[`player${props.playerId}`]
    gameKickPlayer(socketId)
}

function swapCharacter() {
    changeDefaultImage()
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

        .player-image {
            img {
                scale: -1 1;
                transform: translate(50%, -50%);
            }

        }

        .health-container,
        .health-container h1 {
            scale: -1 1;
        }

        .health-container h1 {
            transform: skew(-40deg);
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

.player-iAm {
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

.health-container {
    --width: 100%;
    height: 30px;
    width: 60%;
    position: relative;
    transform: skew(-40deg);
    background-color: black;
    box-shadow: 0 0 7px black;

    h1 {
        font-size: 30px;
        position: absolute;
        top: 50%;
        translate: 25px -50%;
        transform: skew(40deg);
        color: grey;
        z-index: 2;
    }

    &::before,
    &::after {
        content: '';
        height: 100%;
        position: absolute;
        width: var(--width);
    }

    &::after {
        background-color: white;
        z-index: 1;
    }

    &::before {
        background-color: red;
        transition: width .125s .25s ease-out;
    }
}
</style>
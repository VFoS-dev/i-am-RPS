<template>
    <div class="health-container" :class="{ noPlayer: !playerActive }" :style="`--width:${healthPercent}%;`">
        <h1>
            <slot> ??? </slot>
        </h1>
    </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
    maxHealth: { type: Number, default: 5 },
    health: Number,
    playerActive: Boolean,
})

const healthPercent = computed(() => {
    const { health, maxHealth } = props
    const percent = 100 * health / maxHealth
    if (isNaN(percent)) {
        return 0
    }
    return percent
})
</script>

<style scoped lang="less">
.health-container {
    --width: 0%;
    height: 30px;
    width: 60%;
    position: relative;
    transform: skew(-40deg);
    background-color: black;
    box-shadow: 0 0 7px black;

    &.noPlayer {
        opacity: .25;

        &::before,
        &::after {
            transition: none !important;
        }
    }

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

.left {

    .health-container,
    .health-container h1 {
        scale: -1 1;
    }

    .health-container h1 {
        transform: skew(-40deg);
    }
}

.disconnected .health-container {
    opacity: .25;
}

.lobby {
    .health-container::after {
        transition: width .2s ease-out;
    }
}
</style>
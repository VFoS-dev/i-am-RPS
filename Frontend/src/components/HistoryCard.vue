<template>
    <div class="flash-back" :winner="props.winner">
        <div class="only-mobile">{{ player1 }}</div>
        <div>{{ reason }}</div>
        <div class="only-mobile">{{ player2 }}</div>
        <div class="prompt">
            <div>{{ player1 }}</div>
            <div>{{ player2 }}</div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    player1: String,
    player2: String,
    winner: String,
    reason: String,
})
</script>

<style scoped lang="less">
.flash-back {
    overflow: hidden;
    background-color: gray;
    position: relative;
    border-radius: 3rem;
    border: 1px black solid;
    --left-color: transparent;
    --right-color: transparent;
    padding: 1rem;
    color: white;

    &>div {
        position: relative;
        z-index: 2;
    }

    &::before,
    &::after {
        content: '';
        position: absolute;
        top: 0;
        height: 100%;
        width: 50%;
    }

    &::after {
        right: 0;
        background: linear-gradient(to left, var(--right-color), transparent);
    }

    &::before {
        left: 0;
        background: linear-gradient(to left, transparent, var(--left-color));
    }

    &[winner="player1"] {
        --left-color: blue;
        border-top-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    &[winner="player2"] {
        --right-color: blue;
        border-bottom-left-radius: 0;
        border-top-right-radius: 0;
    }

    &[winner="draw"] {
        --left-color: rgb(228, 213, 130);
        --right-color: rgb(228, 213, 130);
        color: black;
    }
}

.prompt {
    font-size: .65rem;
    display: flex;
    gap: .5rem;
    padding: .2rem 2rem 0;

    &>div {
        text-align: center;
        width: 50%;

    }
}

:root[data-mobile="true"][data-rotation="portrait"] {
    .flash-back {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        &::after,
        &::before {
            width: 100%;
            height: 33%;
        }

        &::after {
            top: unset;
            bottom: 0;
            background: linear-gradient(to top, var(--right-color), transparent);
        }

        &::before {
            background: linear-gradient(to top, transparent, var(--left-color));
        }
    }

    .prompt {
        display: none;
    }
}
</style>
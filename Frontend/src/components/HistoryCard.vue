<template>
    <div class="flash-back" :winner="props.winner">
        <div class="prompts">
            <div>{{ player1 }}</div>
            <div>{{ player2 }}</div>
        </div>
        <div>{{ reason }}</div>
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
    border-radius: 100vw;
    border: 1px black solid;
    --left-color: transparent;
    --right-color: transparent;
    padding: .5rem;
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
    }

    &[winner="player2"] {
        --right-color: blue;
    }

    &[winner="draw"] {
        --left-color: gold;
        --right-color: gold;
    }
}

.prompts {
    margin-bottom: .5rem;

    &>div {
        display: inline-block;
        width: 50%;
        text-align: center;
    }
}
</style>
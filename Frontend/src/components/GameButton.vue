<template>
    <button @click="() => emits('onClick')">
        <div>
            <slot> Start Game </slot>
        </div>
    </button>
</template>

<script setup>
import { defineEmits } from 'vue';
const emits = defineEmits(['onClick'])
</script>

<style scoped lang="less">
button {
    --border: 7px rgba(34, 58, 34, 0.555) solid;
    --left: 30%;
    --top: 25%;
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 1rem;
    background-color: rgba(12, 187, 12, 0.082);
    transform: translate(-50%, -50%);
    z-index: 2;
    border-radius: 100%;

    &::after,
    &::before {
        position: absolute;
        content: "";
        width: 100%;
        height: 40%;
        border-top: var(--border);
        border-bottom: var(--border);
        transform-origin: center;
        translate: -50% -50%;
        rotate: -45deg;
        transform: skew(-45deg);
        z-index: -1;
        filter: drop-shadow(0 0 3px rgb(43, 71, 40)) drop-shadow(0 0 10px rgba(111, 160, 105, 0.623));
        border-radius: 25px;
    }

    &::after {
        left: calc(50% - var(--left));
        top: calc(50% - var(--top));
    }

    &::before {
        left: calc(50% + var(--left));
        top: calc(50% + var(--top));
    }

    div {
        z-index: 1;
        background-color: rgb(60, 71, 58);
        padding: .5rem;
        box-shadow: 0 0 1rem green, 0 0 10px rgba(68, 255, 11, 0.685);
        border: double rgb(91, 201, 91) 5px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        padding: .5rem .5rem;
        text-shadow: 0 0 7px rgb(68, 255, 11);
        border-radius: 100%;
    }
}
</style>
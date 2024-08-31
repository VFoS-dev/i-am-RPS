<template>
    <button @click="selectImage" class="image" :style="`--url:url(${props.src});`" @mouseleave="onBlur"
        @mouseover="onHover">
        <img :src="props.src" class="inner-image" />
        <div class="backdrop"></div>
    </button>
</template>

<script setup>
import { defineEmits } from 'vue'
import { gameData } from '@/stores/gameData';
const emits = defineEmits(['selectImage'])
const props = defineProps({
    src: String
})

const selectImage = () => emits('selectImage', props.src)
const onBlur = () => gameData.selectionOut(props.src)
const onHover = () => gameData.selectionOver(props.src)
</script>

<style scoped lang="less">
.image {
    border: 1px solid white;
    box-shadow: 0 0 7px black;
    --aspect: 1.778;
    --x: calc(var(--size) * var(--aspect));
    --y: var(--size);
    flex-grow: 10;
    display: inline-block;
    min-width: calc(var(--x)/2);
    height: calc(var(--y)/ 2);
    position: relative;
    overflow: hidden;
    transition: height .7s, min-width .7s;
    overflow: hidden;

    border-radius: 40% 0 40% 0;
    background-color: var(--background-color);
    background-size: cover;
    background-image: var(--url);
    background-repeat: no-repeat;
    background-position: center;
    backdrop-filter: blur(10px);

    &:hover {
        min-width: var(--x);
        height: var(--y);
    }

    &:not(&:hover) .selection {
        display: none;
    }
}

.inner-image,
.backdrop {
    top: 0;
    left: 0;
    position: absolute;
    height: 100%;
    max-width: 100%;
}

.inner-image {
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
    background-size: contain;
    background-color: rgba(0, 0, 0, 0.336);
    z-index: 0;
}

.backdrop {
    width: 100%;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.247);
    backdrop-filter: blur(10px);
}

.selection {
    pointer-events: all;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: none;
    background: white;
    box-shadow: 0 0 7px black;
    z-index: 1;

    &:hover {
        background-color: green;
    }
}
</style>
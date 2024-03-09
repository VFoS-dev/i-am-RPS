<template>
    <div class="decor-container" :style="styles">
        <slot></slot>
        <div class="decor top left"></div>
        <div class="decor top right"></div>
        <div class="decor bottom left"></div>
        <div class="decor bottom right"></div>
    </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
const props = defineProps({
    cardColor: String,
    gap: String,
    size: String,
    borderColor: String,
})

const styles = computed(() => {
    const { cardColor, gap, size, borderColor } = props;
    let style = ''

    if (cardColor) style += `--card-color:${cardColor};`
    if (gap) style += `--gap:${gap};`
    if (size) style += `--size:${size};`
    if (borderColor) style += `--border-color:${borderColor};`

    return style;
})
</script>

<style scoped lang="less">
.decor-container {
    --card-color: gray;
    --gap: 5px;
    --size: 3rem;
    --border-color: white;
    height: fit-content;
    background-color: var(--card-color);
    padding: 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: inset 1px 1px var(--border-color),
        inset -1px -1px var(--border-color);

    .decor {
        position: absolute;
        width: var(--size);
        height: var(--size);
        border-radius: 100%;
        background-color: var(--background-color);
        border: var(--border-color) 1px solid;

        &::after {
            border: var(--border-color) 1px solid;
            content: '';
            width: calc(var(--size) / 2 - var(--gap));
            height: calc(var(--size) / 2 - var(--gap));
            background-color: var(--card-color);
            display: block;
            position: absolute;
        }

        &.top.left::after {
            border-bottom-right-radius: 100%;
        }

        &.top.right::after {
            border-bottom-left-radius: 100%;
        }

        &.bottom.left::after {
            border-top-right-radius: 100%;
        }

        &.bottom.right::after {
            border-top-left-radius: 100%;
        }

        &.top {
            top: calc(-1*var(--size) / 2);
            border-top: none;

            &::after {
                top: 50%;
            }
        }

        &.bottom {
            bottom: calc(-1*var(--size) / 2);
            border-bottom: none;

            &::after {
                bottom: 50%;
            }
        }

        &.left {
            left: calc(-1*var(--size) / 2);
            border-left: none;

            &::after {
                left: 50%;
            }
        }

        &.right {
            right: calc(-1*var(--size) / 2);
            border-right: none;

            &::after {
                right: 50%;
            }
        }
    }
}
</style>
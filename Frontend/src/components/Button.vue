<template>
    <button :class="{ [`feather-${props.feather}`]: true, [`side-${props.side}`]: true }" :type="props.type"
        @click="handleClick">
        <slot></slot>
    </button>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue'
const emits = defineEmits(['onClick'])
const props = defineProps({
    type: String,
    feather: { type: String, default: 'right' },
    side: { type: String, default: 'right' },
})

const handleClick = () => emits('onClick')
</script>

<style scoped lang="less">
button {
    &.feather-right {
        border-top-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
    }

    &.feather-left {
        border-bottom-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }

    &.side-right {
        margin-right: 5px;
        --dir: 1;
    }

    &.side-left {
        margin-left: 5px;
        --dir: -1;
    }

    background-color: white;

    padding: .5rem;
    width: max-content;
    margin-bottom: 5px;

    box-shadow: calc(var(--dir) * 5px) 5px 0 black;
    transition: translate .25s,
    box-shadow .25s;

    &:is(:hover, :focus) {
        translate: calc(var(--dir) * 2px) 2px;
        box-shadow: calc(var(--dir) * 3px) 3px 0 black;
    }

    &:active {
        translate: calc(var(--dir) * 5px) 5px;
        box-shadow: 0px 0px 0 black;
    }
}
</style>
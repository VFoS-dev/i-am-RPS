<template>
    <button :style="`--src:url(/svg/${props.svg}.svg)`" @click="emits('onClick')">
        <slot></slot>
    </button>
</template>

<script setup>
const emits = defineEmits(['onClick'])
const props = defineProps({
    svg: String
})
</script>

<style scoped lang="less">
button {
    width: 30px;
    height: 30px;

    background-image: var(--src);
    background-position: center;
    background-color: rgba(255, 255, 255, 0.486);
    border: none;
    background-size: cover;
    position: relative;
}
</style>
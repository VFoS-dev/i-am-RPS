<template>
    <label>
        <span>
            <slot></slot>
        </span>
        <input ref="input" type="checkbox" :checked="isChecked" @change="handleChange" />
        <button @click="handleClick">{{ isChecked }}</button>
    </label>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const emits = defineEmits(['onChange'])
const props = defineProps({
    checked: Boolean,
    placeholder: String,
    id: String,
})
const input = ref();
const isChecked = ref(props.checked);
const handleChange = ({ target: { checked } }) => {
    isChecked.value = checked
    emits('onChange', { target: { id: props.id, value: checked } })
};
const handleClick = () => input.value.click()
</script>

<style scoped lang="less">
button {
    padding: 0;
    border: 0;
    background-color: unset;
    font-size: 1rem;
}

label {
    cursor: pointer;
    position: relative;
    transition: padding-top .2s;
    border-bottom: black 1px solid;

    padding: .5rem;
    padding-left: 0;
    width: calc(100% - .5rem);
    display: flex;
    justify-content: space-between;

    span {
        font-size: 1rem;
        display: block;
        top: .5rem;
        transition: scale .2s;
        transform-origin: top left;
        pointer-events: none;
    }

    &.active {
        padding-top: 1rem;

        span {
            scale: .75;
        }
    }
}

input {
    display: none;
}
</style>
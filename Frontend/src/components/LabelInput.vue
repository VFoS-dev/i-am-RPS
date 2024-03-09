<template>
    <label :class="{ active }">
        <span>
            <slot></slot>
        </span>
        <input ref="input" v-bind="props" @focus="handleFocus" @blur="handleBlur" @keyup="handleChange"
            @change="handleChange" />
    </label>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
const emits = defineEmits(['onChange'])
const props = defineProps({
    type: String,
    placeholder: String,
    maxlength: String,
    minlength: String,
    max: String,
    min: String,
    id: String,
    autocomplete: String
})
const active = ref(false);
const input = ref();
const handleFocus = () => active.value = true;
const handleBlur = () => !input.value.value && (active.value = false);
const handleChange = () => emits('onChange', { target: input.value });
</script>

<style scoped lang="less">
label {
    position: relative;
    transition: padding-top .2s;

    span {
        font-size: 1rem;
        position: absolute;
        display: block;
        top: .5rem;
        transition: scale .2s;
        transform-origin: top left;
        pointer-events: none;
    }

    &.active:not(&:has(input[type='number'])) {
        padding-top: 1rem;

        span {
            scale: .75;
        }
    }
}

input {
    width: calc(100% - 1rem);
    padding: .5rem;
    background-color: unset;
    border: unset;
    border-bottom: black 1px solid;
    outline: unset;
    font-size: 1rem;

    &:not(&[type='number']):focus::placeholder {
        color: transparent;
    }

    &[type='number'],
    &::placeholder {
        transition: color .25s;
        text-align: right;
        color: black;
    }
}
</style>
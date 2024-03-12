<template>
    <InsetCircles class="card">
        <h1>Game Code</h1>
        <div class="code">
            {{ code }}
        </div>
        <div class="buttons">
            <ImageButtons svg="copy" @onClick="copyCode" />
            <ImageButtons :svg="show ? 'show' : 'hide'" @onClick="toggleShow" />
        </div>
    </InsetCircles>
</template>

<script setup>
import { computed, ref } from 'vue'
import ImageButtons from './ImageButtons.vue';
import InsetCircles from './InsetCircles.vue';
const props = defineProps({
    code: String
})

const show = ref(false)
const hidden = computed(() => props.code?.split('').map(a => '*').join(''))
const code = computed(() => show.value ? props.code : hidden.value)
const toggleShow = () => show.value = !show.value
const copyCode = () => navigator.clipboard.writeText(props.code)
</script>

<style scoped lang="less">
.card {
    --card-color: green;
    --gap: 5px;
    --size: 4rem;

    transform: translate(-50%, -50%);

    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 1.5rem;
    background-color: white;
    gap: .5rem;

    .code {
        display: flex;
        justify-content: center;
        font-size: 2rem;
        background-color: lightgray;
        padding: .2rem;
    }

    .buttons {
        display: flex;
        justify-content: space-around;
    }
}
</style>
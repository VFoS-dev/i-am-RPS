<template>
    <div class="turn-container">
        <div ref="imageSlider" class="images-container state" :class="{ show: images?.length }">
            <ImageSelection v-for="url of images" :src="url" @selectImage="submitMove" />
            <div class="backdrop"></div>
        </div>
        <form class="input state" :class="{ show: !images?.length }" @submit="ImageSearch">
            <h1>What are you?</h1>
            <LabelInput class="white" @onChange="handleChange" required="true">I am:</LabelInput>
        </form>
    </div>
</template>

<script setup>
import { gameData } from '@/stores/gameData';
import { gameIAm, googleImageSearch } from '@/service/api-service'
import { computed, onMounted, ref } from 'vue'
import ImageSelection from '@/components/ImageSelection.vue'
import LabelInput from '@/components/LabelInput.vue'
import { dragSlide } from '@/_helper/dragSlide'

const images = computed(() => gameData.images ?? [])
const imageSlider = ref()
const query = ref("")
const dragging = ref(false);
function ImageSearch(e) {
    e.preventDefault();
    googleImageSearch(query.value)
}

function submitMove(url) {
    if (dragging.value) return;
    console.log(dragging.value);

    gameData.clearImages()
    gameIAm(query.value, url)
    query.value = ''
}

const handleChange = ({ target: { value } }) => query.value = value

onMounted(() => {
    dragSlide(imageSlider.value, canClick)
})

function canClick(_dragging) {
    console.log('here', dragging.value, _dragging);

    if (dragging.value === _dragging) return
    dragging.value = _dragging;
}
</script>

<style scoped lang="less">
.turn-container {
    z-index: 3;
    position: fixed;
    width: 100%;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);

    .state {
        transition: opacity .5s;
        position: absolute;
        top: 0%;

        &:not(.show) {
            display: none;
        }
    }


    .input {
        width: 100%;
        min-height: 120px;
        padding: 1rem 0;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 0px 30px black;
        border-top: 1px white solid;
        border-bottom: 1px white solid;
        overflow: hidden;
        background-color: #333a339f;
        color: white;
        box-shadow: 0px 0px 30px black;
        gap: 1rem;
        transform: translateY(-50%);

        input {
            width: 400px;
            max-width: 80vw;
        }
    }

    .images-container {
        --size: max(50vmin, 300px);
        display: flex;
        max-width: 100vw;
        align-items: center;
        overflow-x: auto;
        gap: 1rem;
        position: relative;
        cursor: grab;

        &::-webkit-scrollbar {
            display: none;
        }

        .backdrop {
            position: fixed;
            height: calc(.55 * var(--size));
            width: 100vw;
            top: 50%;
            transform: translateY(-50%);
            z-index: -1;
            background-color: rgba(120, 176, 185, 0.247);
            pointer-events: none;
            border-top: 1px white solid;
            border-bottom: 1px white solid;
            box-shadow: 0px 0px 30px black;
        }

        &::before,
        &::after {
            content: "";
            position: fixed;
            height: calc(.55 * var(--size));
            top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            z-index: 2;
            width: 1px;
            box-shadow: 0 0 20px black;
        }

        &::after {
            right: 0;
        }

        &::before {
            left: 0;
        }
    }
}

:root[data-mobile="true"] {
    .turn-container {
        top: 50%;
    }
}
</style>
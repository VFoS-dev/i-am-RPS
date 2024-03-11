<template>
    <div class="turn-container">
        <div class="images-Container state" :class="{ show: images?.length }">
            <ImageSelection v-for="url of images" :src="url" @selectImage="submitMove" />
        </div>
        <form class="state" :class="{ show: !images?.length }" @submit="ImageSearch">
            <h4>I am</h4>
            <input ref="imageInput" required />
        </form>
    </div>
</template>

<script setup>
import { gameData } from '@/stores/gameData';
import { gameIAm, googleImageSearch } from '@/service/api-service'
import { computed, ref } from 'vue'
import ImageSelection from '@/components/ImageSelection.vue'
const imageInput = ref()

const images = computed(() => gameData.images ?? [])

function ImageSearch(e) {
    e.preventDefault();
    googleImageSearch(imageInput.value.value)
}

function submitMove(url) {
    gameData.clearImages()
    gameIAm(imageInput.value.value, url)
    imageInput.value.value = ''
}
</script>

<style scoped lang="less">
.turn-container {
    z-index: 3;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);

    .state:not(.show) {
        display: none;
    }
}
</style>
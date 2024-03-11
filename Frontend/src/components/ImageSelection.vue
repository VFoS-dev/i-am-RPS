<template>
    <div class="image" @click="selectImage">
        <img :src="props.src">
    </div>
</template>

<script setup>
import { defineEmits } from 'vue'
const emits = defineEmits(['selectImage'])
const props = defineProps({
    src: String
})

const selectImage = () => emits('selectImage', props.src)
</script>

<style scoped lang="less">
.image {
    img {}
}
</style>
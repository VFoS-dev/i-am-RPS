<template>
    <ImageButtons class="history" svg="history" :class="{ show }" @onClick="handleClick">
        <div class="dropdown">
            <HistoryCard :key="history.count" v-bind="history[0]" />
        </div>
    </ImageButtons>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { clickOff } from '@/_helper/misc'
import { gameData } from '@/stores/gameData';
import ImageButtons from '@/components/ImageButtons.vue'
import HistoryCard from '@/components/HistoryCard.vue'

const show = ref(false)
const count = ref(gameData.game.history?.length ?? 0)
const history = computed(() => gameData.game.history)

watch(() => gameData.game.history, () => {
    if (history.value.length != count.value) {
        show.value = true;
        count.value = history.value.length;
        clickOff(show)
    }
})

function handleClick() {
    show.value = !show.value
    if (show.value) {
        clickOff(show)
    }
}
</script>

<style scoped lang="less">
.history {
    z-index: 4;
    position: absolute;
    top: 30%;
    right: 50%;
    transform: translateX(50%);

    &:not(.show) .dropdown {
        opacity: 0;
    }

    .dropdown {
        transition: opacity .25s;
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: min(700px, 50vw);
        height: 20vh;
    }
}
</style>
<template>
    <div class="container" :state="state">
        <JoinModal @changeState="toggleState" state="join" />
        <IAm />
        <CreateModal @changeState="toggleState" state="create" />
    </div>
</template>

<script setup>
import JoinModal from '@/components/JoinModal.vue';
import CreateModal from '@/components/CreateModal.vue';
import IAm from '@/components/IAm.vue';
import { gameData } from '@/stores/gameData';
import { ref, onMounted } from 'vue';

onMounted(gameData.clearAll)

const state = ref('join')
function toggleState() {
    state.value = {
        join: 'create',
        create: 'join',
    }[state.value] ?? 'join'
}
</script>

<style scoped lang="less">
.container {
    display: flex;
    min-width: 100dvw;
    min-height: 100dvh;
    justify-content: space-evenly;
    align-items: center;
}

@media (min-width: 901px) {
    ::v-deep button.nav {
        display: none;
    }
}

@media (max-width: 900px) {
    .container[state='join']>[state='create'] {
        display: none;
    }

    .container[state='create']>[state='join'] {
        display: none;
    }
}
</style>
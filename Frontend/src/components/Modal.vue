<template>
    <div class="modal-container" id="modal-close" :class="{ hasModals }" @click="CloseModal">
        <div class="modal">
            <h1>{{ modal.title }} </h1>
            <p>{{ modal.message }}</p>
        </div>
    </div>
</template>

<script setup>
import { modalData } from '@/stores/modalData'
import { computed } from 'vue'
const hasModals = computed(() => !!modalData.modals.length)
const modal = computed(() => modalData.modals[0] ?? {})

const CloseModal = ({ target }) => target.id == "modal-close" && modalData.remove()
</script>

<style scoped lang="less">
.modal-container {
    z-index: 25;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-top: 1px white solid;
        border-bottom: 1px white solid;
        overflow: hidden;
        height: 0px;
        max-height: 200px;
        width: 0px;
        background-color: #3a33339f;
        color: white;
        box-shadow: 0px 0px 30px black;
        gap: 1.5rem;

        :is(h1, p) {
            margin: 0
        }
    }

    &:not(.hasModals) {
        cursor: auto;
        pointer-events: none;

        .modal {
            transition: height 0.25s, width 0.5s .125s, opacity 0.125s;
        }
    }

    &.hasModals {
        pointer-events: all;
        cursor: pointer;

        .modal {
            transition: width 0.25s, height 0.5s .125s, opacity 0.125s;
            cursor: auto;
            width: 100vw;
            height: 30dvh;
        }
    }
}
</style>
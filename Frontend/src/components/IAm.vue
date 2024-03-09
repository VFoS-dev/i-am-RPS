<template>
    <div class="iAm-container" :class="titleStore.current">
        <div class="position rock">
            <div class="choice"></div>
        </div>
        <div class="position paper">
            <div class="choice"></div>
        </div>
        <div class="position scissors">
            <div class="choice"></div>
        </div>
        <div class="position infinite">
            <div class="choice"></div>
        </div>
    </div>
</template>

<script setup>
import { titleStore } from '@/stores/titleStore';

</script>

<style scoped lang="less">
.iAm-container {
    --rock-color: #0000;
    --paper-color: #0000;
    --scissors-color: #0000;
    --default-color: #0000;
    --selected-color: #c4c4c471;

    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    position: absolute;
    transition: background .5s;

    &.rock {
        background: conic-gradient(#c4c4c471 0deg, #0000 60deg, #0000 300deg, #c4c4c471 360deg);
        --rock-color: #c4c4c471;
    }

    &.paper {
        --paper-color: #c4c4c471;

        background: conic-gradient(#0000 60deg, #c4c4c471 120deg, #0000 180deg);
    }

    &.scissors {
        --scissors-color: #c4c4c471;

        background: conic-gradient(#0000 180deg, #c4c4c471 240deg, #0000 300deg);
    }
}

.position {
    position: absolute;
    transform-origin: center;

    .choice {
        width: 70px;
        height: 70px;
        background-repeat: no-repeat;
        background-size: 50px;
        background-position: center;
        border-radius: 100%;
        border: 5px solid black;
    }

    &.infinite .choice {
        background-image: url('/images/infinite.png');
    }

    &.rock {
        translate: 0 -30dvh;

        .choice {
            background-image: url('/images/rock.png');
        }
    }

    &.paper {
        translate: 25.9807dvh 15dvh;

        .choice {
            background-image: url('/images/paper.png');
        }
    }

    &.scissors {
        translate: -25.9807dvh 15dvh;

        .choice {
            background-image: url('/images/scissors.png');
        }
    }
}
</style>
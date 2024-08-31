<template>
    <div class="iAm-container" :class="classes">
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
            <div class="choice">
                <div class="color-match"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { titleStore } from '@/stores/titleStore';
import { computed } from 'vue'

const classes = computed(() => {
    const { current, last } = titleStore
    return `${last} ${current == last}`
})
</script>

<style scoped lang="less">
.color-match {
    border: none !important;
    background-color: transparent;
    transition: background-color .5s;
    width: 100% !important;
    height: 100% !important;
    border-radius: 100%;
    background-image: url('/images/infinite.png');
}

.iAm-container {
    --default-color: var(--background-color);
    --selected: transparent;
    --selected-color: var(--background-color);

    top: 0;
    left: 0;
    min-width: 100vw;
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 0;
    position: fixed;
    transition: background-color .75s;
    background-color: var(--selected-color);

    &.infinite {
        background: radial-gradient(circle at center, var(--selected) 0%, var(--default-color) 25%);
        --selected-color: white;

        .infinite .choice {
            background-color: var(--selected-color);
        }
    }

    &.rock {
        background: conic-gradient(var(--selected) 0deg, var(--default-color) 60deg, var(--default-color) 300deg, var(--selected) 360deg);
        --selected-color: blue;

        .rock .choice {
            background-color: var(--selected-color);
        }
    }

    &.paper {
        background: conic-gradient(var(--default-color) 60deg, var(--selected) 120deg, var(--default-color) 180deg);
        --selected-color: green;

        .paper .choice {
            background-color: var(--selected-color);
        }
    }

    &.scissors {
        background: conic-gradient(var(--default-color) 180deg, var(--selected) 240deg, var(--default-color) 300deg);
        --selected-color: red;

        .scissors .choice {
            background-color: var(--selected-color);
        }
    }

    &.true {
        .color-match {
            background-color: var(--selected-color) !important;
        }

        background-color: var(--selected-color);
    }
}

.position {
    position: absolute;
    transform-origin: center;
    --distance: clamp(225px, 40vmin, 45vmax);

    .color-match,
    .choice {
        width: 70px;
        height: 70px;
        background-repeat: no-repeat;
        background-size: 50px;
        background-position: center;
        border-radius: 100%;
        border: 5px solid black;
        transition: background-color .25s;
    }

    &.infinite .choice {
        transition: background-image .5s;
        animation: rainbow 7s linear infinite;
    }

    &.rock {
        translate: calc(cos(-90deg) * var(--distance)) calc(sin(-90deg) * var(--distance));

        .choice {
            background-image: url('/images/rock.png');
        }
    }

    &.paper {
        translate: calc(cos(30deg) * var(--distance)) calc(sin(30deg) * var(--distance));

        .choice {
            background-image: url('/images/paper.png');
        }
    }

    &.scissors {
        translate: calc(cos(150deg) * var(--distance)) calc(sin(150deg) * var(--distance));

        .choice {
            background-image: url('/images/scissors.png');
        }
    }
}

@keyframes rainbow {
    0% {
        background-color: red;
    }

    33% {
        background-color: green;
    }

    66% {
        background-color: blue;
    }

    100% {
        background-color: red;
    }
}
</style>
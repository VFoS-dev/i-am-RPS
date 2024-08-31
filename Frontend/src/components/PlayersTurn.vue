<template>
    <div class="turn-container">
        <div class="turn-indicator">
            <h1 class="t-boarder">
                <slot></slot>
            </h1>
            <img class="pointer" src="/svg/arrow.svg" />
        </div>
    </div>
</template>

<style scoped lang="less">
.turn-container {
    pointer-events: none;
    position: absolute;
    height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &[number="1"] .pointer {
        rotate: -135deg;
    }

    &[number="2"] .pointer {
        rotate: 45deg;
    }
}

.turn-indicator {
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
        color: white;
    }

    .pointer {
        transform-origin: center;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: rotate .2s;
    }
}

:root[data-mobile="true"][data-rotation="portrait"] {
    h1 {
        text-wrap: nowrap;
    }

    img {
        display: none;
    }
}
</style>
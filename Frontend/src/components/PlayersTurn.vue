<template>
    <div class="turn-indicator">
        <h1>
            <slot></slot>
        </h1>
        <img class="pointer" src="/svg/arrow.svg" />
    </div>
</template>

<style scoped lang="less">
.turn-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

    &[number="1"] .pointer {
        rotate: -135deg;
    }

    &[number="2"] .pointer {
        rotate: 45deg;
    }
}
</style>
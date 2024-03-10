<template>
    <InsetCircles class="modal" size="4rem" cardColor="white">
        <h1>Join Game</h1>
        <form @submit="handleSubmit">
            <LabelInput @onChange="handleChange" id="playerName" maxlength="25">
                Player Name
            </LabelInput>
            <LabelInput @onChange="handleChange" id="gameCode" autocomplete="false">
                Game Code
            </LabelInput>
            <div class="button-left">
                <Button type="submit" side="left" feather="left">Join</Button>
            </div>
        </form>
    </InsetCircles>
</template>

<script setup>
import InsetCircles from '@/components/InsetCircles.vue'
import LabelInput from '@/components/LabelInput.vue'
import Button from '@/components/Button.vue'
import { ref } from 'vue'
import { gameJoin } from '@/service/api-service'

const values = ref({
    playerName: '',
    gameCode: '',
})

function handleChange({ target: { id, value } }) {
    values.value[id] = value
}

function handleSubmit(e) {
    e.preventDefault();
    const { gameCode, playerName } = values.value

    gameJoin(gameCode, playerName)
}
</script>

<style scoped lang="less">
h1 {
    text-align: center;
}

form,
.modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.button-left {
    display: flex;
    justify-content: end;
}
</style>
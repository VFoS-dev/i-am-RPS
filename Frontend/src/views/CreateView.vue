<template>
    <div class="container">
        <InsetCircles class="modal" size="4rem" cardColor="white">
            <h1>Host Game</h1>
            <form @submit="handleSubmit">
                <LabelInput @onChange="handleChange" id="playerName" maxlength="25">
                    Player Name
                </LabelInput>
                <LabelInput @onChange="handleChange" id="health" type="number" placeholder="5" max='20' min="1">
                    Player Health
                </LabelInput>
                <LabelCheckbox @onChange="handleChange" id="explicit" :checked="false">
                    Allow Explicit Images
                </LabelCheckbox>
                <Button type="submit">Create</Button>
            </form>
        </InsetCircles>
    </div>
</template>

<script setup>
import InsetCircles from '@/components/InsetCircles.vue'
import LabelInput from '@/components/LabelInput.vue'
import LabelCheckbox from '@/components/LabelCheckbox.vue'
import Button from '@/components/Button.vue'
import { ref } from 'vue'

const values = ref({
    playerName: '',
    health: 5,
    explicit: false
})

function handleChange({ target: { id, value } }) {
    if (id == 'health' && !value) {
        value = 5
    }
    values.value[id] = value
    console.log(values.value);
}

function handleSubmit(e) {
    e.preventDefault();

    console.log(e);
}
</script>

<style scoped lang="less">
h1 {
    text-align: center;
}

.container {
    min-height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
}

form,
.modal {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
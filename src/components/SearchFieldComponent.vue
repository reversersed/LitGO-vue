<script lang="ts" setup>
import { ref } from "vue";
import "../assets/variables.css";

const state = ref<{
    showBackground: boolean,
}>({
    showBackground: false
});

const onFocus = () => {
    state.value.showBackground = true;
}

</script>


<template>
    <div class="fool-background" v-if="state.showBackground" @click="state.showBackground = false">

    </div>
    <div class="search-wrapper">
        <input placeholder="Искать на LitGO" type="text" name="" id="" v-on:focus="onFocus">
        <button>Найти</button>
    </div>
</template>

<style scoped>
.fool-background {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    background-color: rgba(0, 0, 0, 0.253);
    z-index: 1;
}

.search-wrapper {
    z-index: 10000000;
    background-color: #ffffff;
    border: 2px solid var(--shadow-background-color);
    border-radius: 10px;
    display: flex;
    align-items: center;
    
}

.search-wrapper input {
    z-index: 10000000;
    border: 0px;
    outline: hidden;
    outline: transparent;
    padding: 10px;
    border-radius: 10px;
    min-width: 300px;
    flex: 1;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: var(--accent-color);
    line-height: 22px;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
}

button {
    z-index: 10000000;
    height: 100%;
    width: 100px;
    border: 0px;
    background-color: var(--shadow-background-color);
    color: var(--main-text-color);
    padding: 14px;
    border-radius: 5px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    cursor: pointer;
}

button:hover {
    z-index: 10000000;
    background-color: var(--main-background-color);
    border-radius: 7px;
}
</style>
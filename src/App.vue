<script lang="ts" setup>
import { smartDesignAssiant } from 'smart-design-assiant';
import 'smart-design-assiant/dist/style.css';
import Demo from '@/components/foo/Demo.vue';
</script>

<template>
    <div class="smart_design_lib">
        <smartDesignAssiant :js-component="Demo"></smartDesignAssiant>
    </div>
</template>
<style lang="less">
#app {
    width: 100vw;
    height: 100vh;
    background-color: #010b34;
    .smart_design_lib {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
}
</style>

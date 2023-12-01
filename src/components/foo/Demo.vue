<template>
    <div class="text-red">
        {{ count }}
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
    containerWidth: {
        type: Number,
        default: 100,
    },
    containerHeight: {
        type: Number,
        default: 42,
    },
});

const count = ref(123);
</script>
<style lang="less" scoped>
</style>

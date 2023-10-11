<template>
    <div class="text-red">
        <Abc></Abc>
    </div>
</template>
<script lang="tsx" setup>
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
const Abc = () => {
    return <div>{ count.value }</div>;
};
</script>
<style lang="less" scoped>
</style>

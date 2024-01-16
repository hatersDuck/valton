<template>
    <li>
        <button
            :href="info.link"
            :class="{
                'flex': show,
                'items-center': show,
                'grid': !show,
                'justify-items-center': !show,
                'p-2': true,
                'rounded-lg': true,
                'w-full': true,
                'hover:bg-info/50': true,
            }"
        >
            <img class="w-8 h-8" :src="info.svg" />
            <span :class="{'ms-3':show}">{{ info.title }}</span>
        </button>
    </li>
</template>


<script>
export default {
    props: {
        show: Boolean,
        info: Object,
    },
    data() {
        return {
            svg: "",
        };
    },
    async mounted() {},
};
</script>
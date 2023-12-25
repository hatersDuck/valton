<template>
    <div class="bg-default">
        <TheHeader :login="login" @changeLogin="changeLogin" ref="header"></TheHeader>
        <TheBody :login="login"></TheBody>
    </div>
</template>

<script setup>
</script>

<script>
export default {
    data() {
        return {
            login: false,
        };
    },
    methods: {
        changeLogin(login) {
            this.login = login;
        },
    },
};
</script>

<style>

</style>
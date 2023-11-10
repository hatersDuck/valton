<template>
    <div>
        <LazyProfileCard :name="name" :address="addr" :description="description"></LazyProfileCard>
        <LazyFilterCard></LazyFilterCard>
    </div>
</template>

<script setup>
const name = "User"
const addr = "UQBmzW4wYlFW0tiBgj5sP1CgSlLdYs-VpjPWM7oPYPYWQBqW"
const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ratione vero saepe aspernatur asperiores tempora, odit debitis unde, quibusdam omnis"
</script>
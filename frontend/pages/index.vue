<template>
    <img src="https://sun9-13.userapi.com/impf/PlaPxrUPjxDuc1tJ6jTySQiXnpcB-CCPYzzMrw/lwUJ5bVHXko.jpg?size=1920x768&quality=96&crop=0,0,1920,768&sign=99ae7e076585acd3954042de03248af3&c_uniq_tag=bQ59E3jm788hjAxEOErfv3-uI0n8PCjML2mj5yIQH8I&type=helpers"
        alt="banner"
        class="w-full h-52 object-cover">
    <div class="flex justify-center gap-5 mt-10 px-10">
        <div class="flex-col">
            <LazyProfileCard :description="description" :address="addr" :name="name" />
            <LazyFilterCard class="mt-5" />
        </div>
        <div class="flex-col ml-10">
            <LazyTheTabs :tabs="tabs"></LazyTheTabs>
            <div class="flex gap-5 flex-wrap mt-5">
                <div v-for="nft in nfts" :key="nft.name">
                    <LazyNftCard :collection="nft.collection" :name="nft.name" :price="nft.price" :image="nft.image" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const nfts = [
    {
        'collection': "Savelich every day",
        'name': 'Savelich #432',
        'price': 0.01,
        'image': 'https://otvet.imgsmail.ru/download/302520682_893fa9d4213534f010f429611dc3a02e_800.jpg',
        'onSale': true,
        'inFavorites': true,

    },
    {
        'collection': "Savelich every day",
        'name': 'Savelich #432',
        'price': 0.01,
        'image': 'https://otvet.imgsmail.ru/download/302520682_893fa9d4213534f010f429611dc3a02e_800.jpg'
    },
    {
        'collection': "Savelich every day",
        'name': 'Savelich #432',
        'price': 0.01,
        'image': 'https://otvet.imgsmail.ru/download/302520682_893fa9d4213534f010f429611dc3a02e_800.jpg'
    },
    {
        'collection': "Savelich every day",
        'name': 'Savelich #432',
        'price': 0.01,
        'image': 'https://otvet.imgsmail.ru/download/302520682_893fa9d4213534f010f429611dc3a02e_800.jpg'
    },
    {
        'collection': "Savelich every day",
        'name': 'Savelich #432',
        'price': 0.01,
        'image': 'https://otvet.imgsmail.ru/download/302520682_893fa9d4213534f010f429611dc3a02e_800.jpg'
    },
    {
        'collection': "Savelich every day",
        'name': 'Savelich #432',
        'price': 0.01,
        'image': 'https://otvet.imgsmail.ru/download/302520682_893fa9d4213534f010f429611dc3a02e_800.jpg'
    },
]

const tabs = [
    {
        "name": "Owned",
        "counter": 5
    },
    {
        "name": "On sale",
        "counter": 0
    },
    {
        "name": "Favorites",
        "counter": 0
    },
    {
        "name": "Collections",
        "counter": 2
    }
]

const name = "User"
const addr = "UQBmzW4wYlFW0tiBgj5sP1CgSlLdYs-VpjPWM7oPYPYWQBqW"
const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ratione vero saepe aspernatur asperiores tempora, odit debitis unde, quibusdam omnis"
</script>
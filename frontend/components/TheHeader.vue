<template>
    <header class="bg-gray-900 py-4">
        <div class="container mx-auto flex items-center justify-between">
            <!-- Logo&Name -->
            <div class="flex items-center space-x-4 hover:cursor-pointer">
                <div class="h-10 w-10 rounded-full bg-sky-400"></div>
                <h1 class="text-white text-2xl font-semibold">Valton</h1>
            </div>

            <!-- Search -->
            <div class="mx-4">
                <input type="text"
                    class="py-2 px-4 w-96 bg-gray-800 border border-gray-700 rounded-md text-white focus:ring-0 focus:border-none focus:bg-transparent "
                    placeholder="Search for collections, NFTs, etc." />
            </div>

            <!-- Navigation Links -->
            <nav class="space-x-4 text-gray-400 font-bold">
                <a href="#" class=" hover:text-gray-200">Explore</a>
                <a href="#" class=" hover:text-gray-200">Sell</a>
                <a href="#" class=" hover:text-gray-200">Collections</a>
            </nav>

            <!-- connect wallet -->
            <button class="bg-white text-gray-900 py-2 px-6 rounded-md hover:bg-gray-200">
                Connect wallet
            </button>
        </div>
    </header>
</template>
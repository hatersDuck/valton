<template>
    <header class="bg-gray-900 py-4">
      <div class="container mx-auto flex flex-wrap items-center justify-between px-4 sm:px-0">
        <!-- Logo&Name -->
        <div class="flex items-center space-x-4 hover:cursor-pointer">
          <div class="h-10 w-10 rounded-full bg-sky-400"></div>
          <h1 class="text-white text-2xl font-semibold">Valton</h1>
        </div>
  
        <!-- Search - Adjust width and margin on smaller screens -->
        <div class="mt-4 w-full hidden md:block sm:mt-0 sm:mx-4 sm:w-auto">
          <input type="text"
            class="py-2 px-4 w-full sm:w-96 bg-gray-800 border border-gray-700 rounded-md text-white transition-all focus:ring-0 focus:outline-none focus:bg-gray-900"
            placeholder="Search for collections, NFTs, etc." />
        </div>
  
        <!-- Navigation Links - Hide on smaller screens, show as dropdown or different layout -->
        <nav class="hidden sm:flex space-x-4 text-gray-400 font-bold">
          <a href="#" class="hover:text-gray-200">Explore</a>
          <a href="#" class="hover:text-gray-200">Sell</a>
          <a href="#" class="hover:text-gray-200">Collections</a>
        </nav>
  
        <!-- Connect wallet - Adjust padding and text size on smaller screens -->
        <button class="mt-4 sm:mt-0 bg-white text-gray-900 py-2 px-6 rounded-md hover:bg-gray-200 text-sm sm:text-base">
          Connect wallet
        </button>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
    // Component logic here
  }
  </script>
  
  <style>
  /* Custom styles if needed */
  </style>
  
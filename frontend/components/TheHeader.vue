<template>
  <div class="navbar bg-base-100 md:px-10">
    <div class="navbar-start">
      <div class="flex items-center">
        <div class="h-7 w-7 bg-sky-400 rounded-full"></div>
        <a class="btn btn-ghost text-xl">Valton</a>
      </div>
    </div>

    <input type="text" placeholder="Search for collections, NFTs, etc."
      class="hidden md:block input input-bordered w-full max-w-xs" />

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        <li><a>Explore</a></li>
        <li><a>Sell</a></li>
        <li><a>Collections</a></li>
      </ul>
    </div>

    <div class="navbar-end">
      <a class="btn btn-primary bg-white text-black">Connect wallet</a>
    </div>
  </div>
</template>
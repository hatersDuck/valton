
import type { mergeProps } from 'vue';
<template>
    <div class="flex-col w-1/3 bg-gray-800 rounded-xl px-5 py-5">
        <div class="flex items-center">
            <img class="w-20 h-20 rounded-full object-cover"
                src="https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcTlFppQFm4VCK-UlCGwBXMWBW1BSM0v_KDxVwXZgEO-4slA_Bq23-4OUg_Lg2ONXc2D"
                alt="avatar">
            <div class="flex flex-col ml-5">
                <h1 class="text-white text-xl mb-1">{{ name }}</h1>
                <div class="text-white bg-gray-700 px-16 py-2 rounded-xl">
                    <p>{{ display_address }}</p>
                </div>
            </div>
        </div>
        <div class="text-gray-400 font-light mt-5">
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['description', 'name', 'address'])

function shortenString(str, headLength = 3, tailLength = 3) {
  if (str.length > headLength + tailLength) {
    return str.slice(0, headLength) + 
           '...' + 
           str.slice(-tailLength); 
  } else {
    return str;
  }
}

const display_address = shortenString(props.address)
</script>
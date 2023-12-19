<template>
  <div class="card w-96 bg-neutral/40 shadow-xl">
    <div class="card-body">
      <div class="flex">
        <div class="w-20 h-20 bg-primary rounded-full"></div>
        <div class="flex-col ml-4">
          <h2 class="card-title font-bold text-xl">{{ name }}</h2>
          <button @click="copyAddr" class="btn btn-neutral mt-2">{{ display_address }}</button>
        </div>
      </div>
      <p class="mt-5 font-light">{{ description }}</p>
    </div>
  </div>
</template> 
  
<script setup>
const props = defineProps({
  description: String,
  name: String,
  address: String
});


function shortenString(str, headLength = 3, tailLength = 3) {
  if (str.length > headLength + tailLength) {
    return str.slice(0, headLength) +
      '...' +
      str.slice(-tailLength);
  } else {
    return str;
  }
}

const display_address = ref(shortenString(props.address));

const copyAddr = async () => {
  await navigator.clipboard.writeText(props.address)
  display_address.value = "Copied"
  setTimeout(() => {
    display_address.value = shortenString(props.address);
  }, 1000);
}
</script>
  
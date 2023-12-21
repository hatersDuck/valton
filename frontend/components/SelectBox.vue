<template>
    <Listbox v-model="selectedElement">
        <div class="relative mt-2">
            <ListboxButton
                class="relative w-full cursor-pointer rounded-xl bg-transparent text-white border-2 transition-all hover:border-sky-400 border-gray-500 py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm">
                <span class="block truncate text-base">{{ selectedElement }}</span>
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-50 ease-in" leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    <ListboxOption v-slot="{ active, selected }" v-for="price in elements" :key="price"
                        :value="price" as="template" class="cursor-pointer font-bold text-base">
                        <li :class="[
                            active ? 'bg-gray-500 text-white' : 'text-white',
                            'relative cursor-default select-none py-2 pl-10 pr-4',
                        ]">
                            <span :class="[
                                selected ? 'font-medium' : 'font-normal',
                                'block truncate',
                            ]">{{ price }}</span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-400">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </transition>
        </div>
    </Listbox>
</template>
  
<script setup>
import { defineProps } from 'vue';
import { ref } from 'vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
    elements: Array,
});

const elements = props.elements

const selectedElement = ref(elements[0])
</script>
 
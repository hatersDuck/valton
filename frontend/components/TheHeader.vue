<template>
    <div>
        <nav class="bg-default">
            <div class="mx-auto px-2 mt-2.5">
                <div class="relative flex h-12 items-center justify-between">
                    <div
                        class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
                    >
                        <div class="flex flex-1 justify-center items-center">
                            <img
                                class="h-16 w-16"
                                src="https://cdn2.iconfinder.com/data/icons/letters-and-numbers-1/32/lowercase_letter_v_blue-1024.png"
                                alt="Valton"
                            />
                            <form>
                                <label
                                    for="default-search"
                                    class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                                    >Search</label
                                >
                                <div class="relative">
                                    <input
                                        type="search"
                                        id="default-search"
                                        class="p-3 w-96 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search for collections, NFTs, etc."
                                        required
                                    />
                                    <button
                                        type="submit"
                                        class="text-white absolute end-2.5 bottom-1.5 bg-slate-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                                    >
                                        /
                                    </button>
                                </div>
                            </form>
                            <div class="flex space-x-4 px-4">
                                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                                <a
                                    href="#"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                    aria-current="page"
                                    >Collections</a
                                >
                                <a
                                    href="#"
                                    class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                    >Mint</a
                                >
                                <div class="dropdown dropdown-hover mt-1">
                                    <a
                                        href="#"
                                        tabindex="0"
                                        role="button"
                                        class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                        >Create</a
                                    >
                                    <ul
                                        tabindex="0"
                                        class="dropdown-content z-[1] menu p-2 shadow bg-neutral rounded-box w-52"
                                    >
                                        <li>
                                            <a onclick="my_modal_1.showModal()"
                                                >Create Insurance</a
                                            >
                                        </li>
                                        <li><a>Create Collection</a></li>
                                        <li><a>Create NFT</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="absolute inset-y-0 flex items-center pr-2 right-24"
                    >
                        <div
                            v-if="login"
                            class="bg-blue-600 rounded-full w-12 h-12 mr-5"
                        ></div>
                        <div v-if="!login" class="relative ml-3">
                            <button @click="connect" id="ton-connect"></button>
                        </div>

                        <button
                            v-if="login"
                            type="button"
                            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span class="absolute -inset-1.5"></span>
                            <svg
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
        <dialog id="my_modal_1" class="modal">
            <div class="modal-box">
                <h3 class="font-bold text-lg">Create Insurance</h3>

                <form
                    class="mt-5"
                    method="dialog"
                >
                    <p>Collection of contract addresses*</p>
                    <input
                        type="text"
                        v-model="insuranceAddress"
                        placeholder="Type here"
                        class="input input-bordered input-info w-full max-w-xs"
                    />

                    <div class="modal-action">
                        <button class="btn mr-5">Close</button>
                        <button
                            @click="createInsurance"
                            class="btn btn-primary"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    props: {
        login: Boolean,
    },
    data() {
        return {
            tonConnect: null,
            insuranceAddress: "",
        };
    },
    async mounted() {
        const tonConnect = new TON_CONNECT_UI.TonConnectUI({
            manifestUrl: "https://valton.fun/tonconnect-manifest.json",
            buttonRootId: "ton-connect",
        });
        await tonConnect.connectionRestored;

        this.$emit("changeLogin", tonConnect.connected);

        tonConnect.setConnectRequestParameters({
            state: "loading",
        });

        this.tonConnect = tonConnect;
    },
    methods: {
        async connect() {
            if (!this.login) {
                const { data } = await useMyFetch(
                    "auth/ton-proof/generatePayload"
                );

                const tonProofPayload = data._value;

                if (tonProofPayload) {
                    this.tonConnect.setConnectRequestParameters({
                        state: "ready",
                        value: { tonProof: tonProofPayload },
                    });
                }
            }
        },
        async createTransaction(messages) {
            this.tonConnect.sendTransaction({
                validUntil: Math.floor(Date.now() / 1000) + 60,
                messages: messages,
            });
        },
        validateAddress(event) {
            if (!this.insuranceAddress) {
                event.preventDefault();
                alert("Please enter an address before submitting.");
            } else {
                this.createInsurance();
            }
        },
        async createInsurance() {
            const responce = await useMyFetch("transactions/create/insurance", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address: this.tonConnect.account.address,
                    mainnet:
                        this.tonConnect.account.chain === "-3" ? false : true,
                    initInfo: {
                        nft_collection_address: this.insuranceAddress,
                    },
                }),
            });
            console.log(responce);
            const { data } = responce;
            if (data && data._rawValue.messages) {
                // Извлекаем массив сообщений
                const messages = data._rawValue.messages;
                console.log(data._rawValue);
                console.log(messages);
                this.tonConnect.sendTransaction({
                    validUntil: Math.floor(Date.now() / 1000) + 60,
                    messages: messages,
                });
            } else {
                console.log("Неверный формат данных в ответе.");
            }
        },
    },
});
</script>

<style>
</style>
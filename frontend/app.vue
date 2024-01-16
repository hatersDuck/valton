<template>
    <NuxtLayout :tonConnect="tonConnect">
        <NuxtPage />
    </NuxtLayout>
</template>


<script>
import { defineComponent } from "@vue/composition-api";
import { TonConnectUI } from "@tonconnect/ui";

export default defineComponent({
    data() {
        return {
            tonConnect: null,
        };
    },
    async mounted() {
        const tonConnect = new TonConnectUI({
            manifestUrl: "https://valton.fun/tonconnect-manifest.json",
        });

        tonConnect.setConnectRequestParameters({
            state: "loading",
        });
        
        const { data } = await useMyFetch("auth/ton-proof/generatePayload");

        const tonProofPayload = data._value;

        if (tonProofPayload) {
            tonConnect.setConnectRequestParameters({
                state: "ready",
                value: { tonProof: tonProofPayload },
            });
        }

        this.tonConnect = tonConnect;
    },
});
</script>

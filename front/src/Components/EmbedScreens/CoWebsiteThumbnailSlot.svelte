<script lang="typescript">
    import { onMount } from "svelte";

    import { ICON_URL } from "../../Enum/EnvironmentVariable";
    import { highlightedEmbedScreen } from "../../Stores/EmbedScreensStore";
    import type { CoWebsite } from "../../WebRtc/CoWebsiteManager";
    import { coWebsiteManager } from "../../WebRtc/CoWebsiteManager";

    export let index: number;
    export let coWebsite: CoWebsite;

    let icon: HTMLImageElement;

    let state = coWebsite.state;

    onMount(() => {
        if (coWebsite) {
            const coWebsiteUrl = coWebsite.iframe.src;
            const urlObject = new URL(coWebsiteUrl);
            icon.src = `${ICON_URL}/icon?url=${coWebsiteUrl}&size=64..96..256`;
            icon.alt = urlObject.hostname;
        }
    });

    async function toggleHighlightEmbedScreen() {
        if ($state === "asleep") {
            await coWebsiteManager.loadCoWebsite(coWebsite);
        }

        highlightedEmbedScreen.toggleHighlight({
            type: "cowebsite",
            embed: coWebsite,
        });
        coWebsiteManager.resizeAllIframes();
    }

    function noDrag() {
        return false;
    }
</script>

<div
    id={"cowebsite-thumbnail-" + index}
    class="cowebsite-thumbnail nes-container is-rounded nes-pointer"
    class:asleep={$state === "asleep"}
    class:loading={$state === "loading"}
    class:ready={$state === "ready"}
    on:click={toggleHighlightEmbedScreen}
>
    <img class="cowebsite-icon noselect nes-pointer" bind:this={icon} on:dragstart|preventDefault={noDrag} alt="" />
</div>

<style lang="scss">
    .cowebsite-thumbnail {
        padding: 0;
        background-color: rgba(#000000, 0.6);
        margin-left: 1%;
        margin-right: 2%;
        margin-top: auto;
        margin-bottom: auto;

        .cowebsite-icon {
            width: 50px;
            height: 50px;
            object-fit: cover;
        }

        &.asleep {
            filter: grayscale(100%);
            --webkit-filter: grayscale(100%);
        }

        &.loading {
            animation: 2500ms ease-in-out 0s infinite alternate backgroundLoading;
        }

        @keyframes backgroundLoading {
            0% {
                background-color: rgba(#000000, 0.6);
            }

            100% {
                background-color: #25598e;
            }
        }
    }
</style>

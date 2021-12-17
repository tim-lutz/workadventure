<script lang="typescript">
    import { coWebsiteThumbails } from "../../Stores/CoWebsiteStore";
    import CoWebsiteThumbnail from "./CoWebsiteThumbnailSlot.svelte";
</script>

{#if $coWebsiteThumbails.length > 0}
    <div id="cowebsite-thumbnail-container">
        {#each [...$coWebsiteThumbails.values()] as coWebsite, index (coWebsite.iframe.id)}
            <CoWebsiteThumbnail {index} {coWebsite} />
        {/each}
    </div>
{/if}

<style lang="scss">
    #cowebsite-thumbnail-container {
        pointer-events: all;
        height: 12%;
        overflow-x: auto;
        display: flex;
    }
</style>

<script lang="typescript">
    import { hasEmbedScreen } from "../Stores/EmbedScreensStore";
    import { emoteMenuStore } from "../Stores/EmoteStore";
    import { gameOverlayVisibilityStore } from "../Stores/GameOverlayStoreVisibility";
    import { requestVisitCardsStore } from "../Stores/GameStore";
    import { layoutManagerActionVisibilityStore } from "../Stores/LayoutManagerStore";
    import { menuIconVisiblilityStore, menuVisiblilityStore } from "../Stores/MenuStore";
    import CameraControls from "./CameraControls.svelte";
    import EmbedScreensContainer from "./EmbedScreens/EmbedScreensContainer.svelte";
    import EmoteMenu from "./EmoteMenu/EmoteMenu.svelte";
    import LayoutActionManager from "./LayoutActionManager/LayoutActionManager.svelte";
    import Menu from "./Menu/Menu.svelte";
    import MenuIcon from "./Menu/MenuIcon.svelte";
    import MyCamera from "./MyCamera.svelte";
    import VisitCard from "./VisitCard/VisitCard.svelte";
</script>

<div id="main-layout">
    <aside id="main-layout-left-aside">
        {#if $menuIconVisiblilityStore}
            <MenuIcon />
        {/if}
    </aside>

    <section id="main-layout-main">
        {#if $requestVisitCardsStore}
            <VisitCard visitCardUrl={$requestVisitCardsStore} />
        {/if}

        {#if $emoteMenuStore}
            <div>
                <EmoteMenu />
            </div>
        {/if}

        {#if $menuVisiblilityStore}
            <div>
                <Menu />
            </div>
        {/if}

        {#if hasEmbedScreen}
            <EmbedScreensContainer />
        {/if}
    </section>

    <section id="main-layout-baseline">
        {#if $layoutManagerActionVisibilityStore}
            <div>
                <LayoutActionManager />
            </div>
        {/if}

        {#if $gameOverlayVisibilityStore}
            <div>
                <MyCamera />
                <CameraControls />
            </div>
        {/if}
    </section>
</div>

<style lang="scss">
    #main-layout {
        display: grid;
        grid-template-columns: 7% 93%;
        grid-template-rows: 80% 20%;

        &-baseline {
            grid-column: 1/3;
        }
    }

    @media (max-aspect-ratio: 1/1) {
        #main-layout {
            grid-template-columns: 15% 85%;
        }
    }

    @media only screen and (max-aspect-ratio: 0.7/1), only screen and (max-aspect-ratio: 0.7/1) {
        #main-layout {
            grid-template-columns: 20% 80%;
        }
    }
</style>

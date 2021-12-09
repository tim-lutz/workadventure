<script lang="typescript">
    import type { Game } from "../Phaser/Game/Game";
    import { audioManagerVisibilityStore } from "../Stores/AudioManagerStore";
    import { chatVisibilityStore } from "../Stores/ChatStore";
    import { customCharacterSceneVisibleStore } from "../Stores/CustomCharacterStore";
    import { errorStore } from "../Stores/ErrorStore";
    import { helpCameraSettingsVisibleStore } from "../Stores/HelpCameraSettingsStore";
    import { loginSceneVisibleStore } from "../Stores/LoginSceneStore";
    import { enableCameraSceneVisibilityStore } from "../Stores/MediaStore";
    import { warningContainerStore } from "../Stores/MenuStore";
    import { selectCharacterSceneVisibleStore } from "../Stores/SelectCharacterStore";
    import { selectCompanionSceneVisibleStore } from "../Stores/SelectCompanionStore";
    import { showReportScreenStore, userReportEmpty } from "../Stores/ShowReportScreenStore";
    import { banMessageVisibleStore } from "../Stores/TypeMessageStore/BanMessageStore";
    import { textMessageVisibleStore } from "../Stores/TypeMessageStore/TextMessageStore";
    import AudioManager from "./AudioManager/AudioManager.svelte";
    import Chat from "./Chat/Chat.svelte";
    import CustomCharacterScene from "./CustomCharacterScene/CustomCharacterScene.svelte";
    import EnableCameraScene from "./EnableCamera/EnableCameraScene.svelte";
    import HelpCameraSettingsPopup from "./HelpCameraSettings/HelpCameraSettingsPopup.svelte";
    import LoginScene from "./Login/LoginScene.svelte";
    import MainLayout from "./MainLayout.svelte";
    import ReportMenu from "./ReportMenu/ReportMenu.svelte";
    import SelectCharacterScene from "./selectCharacter/SelectCharacterScene.svelte";
    import SelectCompanionScene from "./SelectCompanion/SelectCompanionScene.svelte";
    import AdminMessage from "./TypeMessage/BanMessage.svelte";
    import TextMessage from "./TypeMessage/TextMessage.svelte";
    import ErrorDialog from "./UI/ErrorDialog.svelte";
    import WarningContainer from "./WarningContainer/WarningContainer.svelte";

    export let game: Game;
</script>

{#if $loginSceneVisibleStore}
    <div class="scrollable">
        <LoginScene {game} />
    </div>
{:else if $selectCharacterSceneVisibleStore}
    <div>
        <SelectCharacterScene {game} />
    </div>
{:else if $customCharacterSceneVisibleStore}
    <div>
        <CustomCharacterScene {game} />
    </div>
{:else if $selectCompanionSceneVisibleStore}
    <div>
        <SelectCompanionScene {game} />
    </div>
{:else if $enableCameraSceneVisibilityStore}
    <div class="scrollable">
        <EnableCameraScene {game} />
    </div>
{:else}
    <MainLayout />

    {#if $chatVisibilityStore}
        <Chat />
    {/if}

    {#if $banMessageVisibleStore}
        <div>
            <AdminMessage />
        </div>
    {/if}

    {#if $textMessageVisibleStore}
        <div>
            <TextMessage />
        </div>
    {/if}

    {#if $showReportScreenStore !== userReportEmpty}
        <div>
            <ReportMenu />
        </div>
    {/if}

    {#if $audioManagerVisibilityStore}
        <div>
            <AudioManager />
        </div>
    {/if}

    {#if $helpCameraSettingsVisibleStore}
        <div>
            <HelpCameraSettingsPopup />
        </div>
    {/if}

    {#if $warningContainerStore}
        <WarningContainer />
    {/if}

    {#if $errorStore.length > 0}
        <div>
            <ErrorDialog />
        </div>
    {/if}
{/if}

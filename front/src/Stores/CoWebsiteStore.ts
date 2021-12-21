import { derived, get, writable } from "svelte/store";
import type { CoWebsite, CoWebsiteState } from "../WebRtc/CoWebsiteManager";
import { highlightedEmbedScreen } from "./EmbedScreensStore";

function createCoWebsiteStore() {
    const { subscribe, set, update } = writable(Array<CoWebsite>());

    set(Array<CoWebsite>());

    return {
        subscribe,
        add: (coWebsite: CoWebsite, position?: number) => {
            if (position || position === 0) {
                update((currentArray) => {
                    if (position === 0) {
                        return [coWebsite, ...currentArray];
                    } else if (currentArray.length > position) {
                        const test = [...currentArray.splice(position, 0, coWebsite)];
                        return [...currentArray.splice(position, 0, coWebsite)];
                    }

                    return [...currentArray, coWebsite];
                });
                return;
            }

            update((currentArray) => [...currentArray, coWebsite]);
        },
        remove: (coWebsite: CoWebsite) => {
            update((currentArray) => [
                ...currentArray.filter((currentCoWebsite) => currentCoWebsite.iframe.id !== coWebsite.iframe.id),
            ]);
        },
        empty: () => {
            set(Array<CoWebsite>());
        },
    };
}

export const coWebsites = createCoWebsiteStore();

export const coWebsitesNotAsleep = derived([coWebsites], ([$coWebsites]) =>
    $coWebsites.filter((coWebsite) => get(coWebsite.state) !== "asleep")
);

export const coWebsiteThumbails = derived(
    [coWebsites, highlightedEmbedScreen],
    ([$coWebsites, highlightedEmbedScreen]) =>
        $coWebsites.filter((coWebsite, index) => {
            if (index === 0) {
                return false;
            }

            return (
                !highlightedEmbedScreen ||
                highlightedEmbedScreen.type !== "cowebsite" ||
                (highlightedEmbedScreen.type === "cowebsite" &&
                    highlightedEmbedScreen.embed.iframe.id !== coWebsite.iframe.id)
            );
        })
);

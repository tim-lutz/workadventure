import * as tg from "generic-type-guard";
import { GameRoomPolicyTypes } from "_Model/PusherRoom";
import { isCharacterTexture } from "./CharacterTexture";
import { isAny, isNumber } from "generic-type-guard";
import {isMucRoomDefinition} from "./MucRoomDefinitionInterface";

/*const isNumericEnum =
    <T extends { [n: number]: string }>(vs: T) =>
    (v: any): v is T =>
        typeof v === "number" && v in vs;*/



export const isMapDetailsData = new tg.IsInterface()
    .withProperties({
        roomSlug: tg.isOptional(tg.isString), // deprecated
        mapUrl: tg.isString,
        policy_type: isNumber, //isNumericEnum(GameRoomPolicyTypes),
        tags: tg.isArray(tg.isString),
        groupId: tg.isUnion(tg.isString, tg.isNull),
        textures: tg.isArray(isCharacterTexture),
        contactPage: tg.isUnion(tg.isString, tg.isUndefined),
        authenticationMandatory: tg.isUnion(tg.isBoolean, tg.isNull),
        iframeAuthentication: tg.isUnion(tg.isString, tg.isNull),
        mucRooms: tg.isArray(isMucRoomDefinition)
    })
    .get();

export type MapDetailsData = tg.GuardedType<typeof isMapDetailsData>;

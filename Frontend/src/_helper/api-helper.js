import { fn } from "./misc";

export function handleAPI({ sCallback = fn, eCallback = fn } = {}) {
    return ({ error, success, ...rem } = {}) => {
        if (success) sCallback(rem)
        if (error) eCallback(rem)
    }
}
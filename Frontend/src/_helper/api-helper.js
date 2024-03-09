import { fn } from "./misc";

export function handleAPI({ onSuccess = fn, onError = fn } = {}) {
    return ({ error, success, ...rem } = {}) => {
        if (success) onSuccess(rem)
        if (error) onError(rem)
    }
}
import { writable } from "svelte/store"


const isAuthModalOn = writable(false);
const showIdWarnModal = writable(false);

export {
    isAuthModalOn,
    showIdWarnModal
}
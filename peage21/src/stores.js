import { writable } from "svelte/store"


const isAuthModalOn = writable(false);

export {
    isAuthModalOn
}
import { defineStore } from 'pinia';
import pinia from './piniaInstance';

const useModalDataStore = defineStore('modalData', {
    state: () => ({ modals: [] }),
    actions: {
        add(message, title) {
            this.modals.push({ message, title, })
        },
        remove() {
            this.modals = this.modals.shift()
        }
    }
});

export const modalData = useModalDataStore(pinia);
import { defineStore } from 'pinia';
import pinia from './piniaInstance';

const useModalDataStore = defineStore('modalData', {
    state: () => ({ modals: [] }),
    actions: {
        push(message = '', title = '') {
            this.modals.push({ message, title, })
        },
        add({ message = '', title = '' }) {
            this.push(message, title)
        },
        remove() {
            this.modals = this.modals.shift()
        }
    }
});

export const modalData = useModalDataStore(pinia);
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
            const [d, ...modals] = this.modals ?? [];
            this.modals = modals
        }
    }
});

export const modalData = useModalDataStore(pinia);
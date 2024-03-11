import { defineStore } from 'pinia';
import pinia from './piniaInstance';
import { reconnect } from '@/service/api-service';
import router from '@/router';

const sName = 'PRSgame'
const useGameDataStore = defineStore('gameData', {
    state: () => {
        const prevousGame = sessionStorage.getItem(sName);
        if (prevousGame) {
            setTimeout(reconnect, 0)
            return JSON.parse(prevousGame)
        }
        return { connection: {}, game: {}, images: [], }
    },
    actions: {
        clearAll() {
            this.connection = {}
            this.game = {}
            this.images = []
            sessionStorage.removeItem(sName)
            router.push({ name: 'home' })
        },
        clearImages() {
            this.images = []
        },
        setConnection(connection) {
            this.connection = { ...this.connection, ...connection, }
            this.saveGame()
        },
        setGame(game) {
            this.game = { ...this.game, ...game, }
            this.saveGame()
            router.push({ name: 'game' })
        },
        setImages({ images = [] }) {
            this.images = [this.images, images].flat()
        },
        saveGame() {
            sessionStorage.setItem(sName, JSON.stringify({
                connection: this.connection,
                game: this.game
            }))
        },
    }
});

export const gameData = useGameDataStore(pinia);
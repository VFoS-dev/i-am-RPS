import { defineStore } from 'pinia';
import pinia from './piniaInstance';
import { reconnect } from '@/service/api-service';

const sName = 'PRSgame'
const useGameDataStore = defineStore('gameData', {
    state: () => {
        const prevousGame = sessionStorage.getItem(sName);
        if (prevousGame) {
            setTimeout(reconnect, 0)
            return JSON.parse(prevousGame)
        }
        return { connection: {}, game: {} }
    },
    actions: {
        clearAll() {
            this.connection = {}
            this.game = {}
            sessionStorage.removeItem(sName)
        },
        setConnection(connection) {
            this.connection = { ...this.connection, ...connection, }
            this.saveGame()
        },
        setGame(game) {
            this.game = { ...this.game, ...game, }
            this.saveGame()
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
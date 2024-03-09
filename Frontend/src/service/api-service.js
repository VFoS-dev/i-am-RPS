import { env } from "@/_helper/env";
import { handleAPI } from '@/_helper/api-helper'
import { io } from "socket.io-client";
import { modalData } from '@/stores/modalData'
import { gameData } from '@/stores/gameData'

const API = env('VITE_API', 'http://localhost:3000')
const socket = io(API);

socket.on('gameUpdated', (res) => {
    gameData.setGame(res)
    // reroute to game
})
socket.on('notify', modalData.add)
socket.on('kickFromLobby', () => {
    gameData.clearAll()
    modalData.push('Kicked from lobby', 'Alert')
})

export async function checkConnection() {
    try {
        await fetch(API)
    } catch (error) {
        modalData.push('Unable to connect to server', 'Server Error')
    }
}

export async function reconnect() {
    socket.emit('game_reconnect', gameData.connection, handleAPI({
        onError: (res) => {
            modalData.add(res)
            gameData.clearAll()
            // reroute to home
        }
    }))
}

export async function gameCreate(health, explicit) {
    socket.emit('game_create', { health, explicit }, handleAPI({
        onError: modalData.add,
        onSuccess: gameData.setConnection,
    }))
}

export async function gameJoin(gameCode) {
    socket.emit('game_join', { gameCode }, handleAPI({
        onError: modalData.add,
        onSuccess: gameData.setConnection,
    }))
}

export async function gameKickPlayer(playerId) {
    const gameId = gameData.game?.id
    socket.emit('game_kickPlayer', { gameId, playerId }, handleAPI({
        onError: modalData.add,
    }))
}

export async function gameIAm(prompt, image) {
    const gameId = gameData.game?.id
    socket.emit('game_iAm', { gameId, prompt, image }, handleAPI({
        onError: modalData.add,
    }))
}

export async function startGame() {
    const gameId = gameData.game?.id
    socket.emit('game_start', { gameId }, handleAPI({
        onError: modalData.add,
    }))
}

export async function googleImageSearch() {
    socket.emit('google_imageSearch', { gameId }, handleAPI({
        onError: modalData.add,
        onSuccess: gameData.setImages
    }))
}
import { env } from "@/_helper/env";
import { handleAPI } from '@/_helper/api-helper'
import { io } from "socket.io-client";
import { modalData } from '@/stores/modalData'
import { gameData } from '@/stores/gameData'

const API = env('VITE_API', 'http://localhost:3000')
const socket = io(API);

socket.on('gameUpdated', gameData.setGame)
socket.on('notify', modalData.add)
socket.on('kickFromLobby', () => {
    socket.emit('game_leave', gameData.connection, handleAPI({
        onSuccess: () => {
            gameData.clearAll()
            modalData.push('Kicked from lobby', 'Alert')
        }
    }))
})

export async function checkConnection() {
    try {
        await fetch(API)
    } catch (error) {
        modalData.push('Unable to connect to server', 'Server Error')
    }
}

export async function changeDefaultImage() {
    socket.emit('game_defaultImage', gameData.connection, handleAPI({
        onError: modalData.add,
    }))
}

export async function reconnect() {
    socket.emit('game_reconnect', gameData.connection, handleAPI({
        onSuccess: gameData.setConnection,
        onError: (res) => {
            modalData.add(res)
            gameData.clearAll()
        },
    }))
}

export async function gameCreate(health, explicit, playerName) {
    socket.emit('game_create', { health, explicit, playerName }, handleAPI({
        onError: modalData.add,
        onSuccess: gameData.setConnection,
    }))
}

export async function gameJoin(gameCode, playerName) {
    socket.emit('game_join', { gameCode, playerName }, handleAPI({
        onError: modalData.add,
        onSuccess: gameData.setConnection,
    }))
}

export async function gameKickPlayer(playerSocketId) {
    const gameId = gameData.game?.id
    socket.emit('game_kickPlayer', { gameId, playerSocketId }, handleAPI({
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
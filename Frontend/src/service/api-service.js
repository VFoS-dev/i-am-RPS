import { env } from "@/_helper/env";
import { handleAPI } from '@/_helper/api-helper'
import { io } from "socket.io-client";
import { modalData } from '@/stores/modalData'

const API = env('VITE_API', 'http://localhost:3000')
const socket = io(API);

socket.on('gameUpdated', gameUpdated)
socket.on('notify', notify)
socket.on('kickFromLobby', kickFromLobby)
socket.on('connect', function (e) {
    console.log(socket.id)
});

const gameId = 1 // fix later

export async function checkConnection() {
    try { await (await fetch(API)).json() }
    catch (error) { modalData.push('Unable to connect to server', 'Server Error') }
}

function notify(data) {
    console.log('notify', data)
}

function kickFromLobby(data) {
    console.log('kickFromLobby', data)
}

function gameUpdated(data) {
    console.log('gameUpdated', data);
}

export async function gameCreate() {
    socket.emit('game_create', {}, handleAPI({
        eCallback: modalData.add,
    }))
}

export async function gameJoin(gameCode) {
    socket.emit('game_join', { gameCode }, handleAPI({
        eCallback: modalData.add,
    }))
}

export async function gameKickPlayer(playerId) {
    socket.emit('game_kickPlayer', { gameId, playerId }, handleAPI({
        eCallback: modalData.add,
    }))
}

export async function gameIAm(prompt, image) {
    socket.emit('game_iAm', { gameId, prompt, image }, handleAPI({
        eCallback: modalData.add,
    }))
}

export async function startGame() {
    socket.emit('game_start', { gameId }, handleAPI({
        eCallback: modalData.add,
    }))
}

export async function googleImageSearch() {
    socket.emit('google_imageSearch', {}, handleAPI({
        eCallback: modalData.add,
    }))
}
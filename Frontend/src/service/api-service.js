import { env } from "@/_helper/env";
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
    catch (error) { modalData.add('Unable to connect to server', 'Server Error') }
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
    socket.emit('game_create', {}, HandleAPIGame)
}

export async function gameJoin(gameCode) {
    socket.emit('game_join', { gameCode }, HandleAPIGame)
}

export async function gameKickPlayer(playerId) {
    socket.emit('game_kickPlayer', { gameId, playerId }, HandleAPIGame)
}

export async function gameIAm(prompt, image) {
    socket.emit('game_iAm', { gameId, prompt, image }, HandleAPIGame)
}

export async function startGame() {
    socket.emit('game_start', { gameId }, HandleAPIGame)
}

export async function googleImageSearch() {
    socket.emit('google_imageSearch', {}, HandleAPIGoogle)
}

function HandleAPIGame({ error, success, ...rem } = {}) {
    if (error && (rem.message + rem.title)) {
        const { message, title } = rem
        modalData.add(message, title)
    }

    if (success) {
        console.log('success', rem);
    }
}

function HandleAPIGoogle({ error, success, ...rem } = {}) {
    if (error && (rem.message + rem.title)) {
        const { message, title } = rem
        modalData.add(message, title)
    }

    if (success) {
        console.log('success', rem);
    }
}
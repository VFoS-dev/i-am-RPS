import { env } from "@/_helper/env";
import { io } from "socket.io-client";
const API = env('VITE_API', 'http://localhost:3000')
const socket = io(API);

socket.on('gameUpdated', gameUpdated)

export async function gameUpdated(data) {
    console.log(data);
}

export async function gameCreate() {
    socket.emit('game_create', {}, (e) => { console.log(e) })
}
gameCreate()

export async function gameJoin(gameCode) {
    socket.emit('game_join', { gameCode }, HandleAPIGame)
}

export async function gameIAm() {
    socket.emit('game_iAm', {}, HandleAPIGame)
}

export async function gameKickPlayer() {
    socket.emit('game_kickPlayer', {}, HandleAPIGame)
}

export async function googleImageSearch() {
    socket.emit('google_imageSearch', {}, HandleAPIGoogle)
}

export async function checkConnection() {
    const data = await (await fetch(API)).json()
    if (!data.success) {
        console.error('Api failed to connect');
    }
}

function HandleAPIGame({ error, success, ...rem } = {}) {
    if (error) {
        console.log('error', rem);
    }

    if (success) {
        console.log('success', rem);
    }
}

function HandleAPIGoogle({ error, success, ...rem } = {}) {
    if (error) {
        console.log('error', rem);
    }

    if (success) {
        console.log('success', rem);
    }
}
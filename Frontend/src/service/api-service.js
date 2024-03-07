import { env } from "@/_helper/env";
import { io } from "socket.io-client";
const API = env('VITE_API', 'http://localhost:3000')
const socket = io(API);

export async function checkConnection() {
    const data = await fetch(API).json()
    console.log(data);
}
import { env } from "@/_helper/env";
import { io } from "socket.io-client";

const socket = io(env('API', 'https://localhost:3000'));
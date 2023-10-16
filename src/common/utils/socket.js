import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === "production" ? undefined : undefined;

export const socket = io(URL);
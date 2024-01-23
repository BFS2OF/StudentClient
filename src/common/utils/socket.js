import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === "production" ? "https://openday.gnmyt.dev/" : undefined;

export const socket = io(URL);
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { API_URL } from "../constants";

export const useSocket = (onNovoResultado) => {
    const socketRef = useRef(null);

    useEffect(() => {
        const socket = io(API_URL, { transports: ["websocket", "polling"] });
        socketRef.current = socket;

        socket.on("connect", () => console.log("✅ Conectado ao servidor via socket"));
        socket.on("novo_resultado", onNovoResultado);

        return () => {
            socket.off("novo_resultado", onNovoResultado);
            if (socket.connected) socket.disconnect();
        };
    }, [onNovoResultado]);

    return socketRef.current;
};

import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhZDY1MzNjYi03YTEwLTQ1MzctYTZlZi0xODMzZjkwYTZiMjEiLCJpYXQiOjE3ODg2NDc3NDV9.FyUDt4EUaw4WZySzIcMOaSJdbm1E9_2myqPMOgsNvtI`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}
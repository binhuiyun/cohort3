import { WebSocket, WebSocketServer } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
//let allSockets:WebSocket[] =[];
wss.on('connection', function connection(ws) {
    // allSockets.push(ws);
    console.log("user conected");
    ws.on("message", (message) => {
        console.log("message received " + message.toString());
        if (message.toString() === "ping") {
            ws.send("pong");
        }
        // for (let i=0; i< allSockets.length; i++){
        //   const s = allSockets[i];
        //   s?.send(message.toString()+": sent from ws server");
        // }
    });
    // ws.on('error', console.error);
    // ws.on('message', function message(data, isBinary) {
    //   wss.clients.forEach(function each(client) {
    //     if (client.readyState === WebSocket.OPEN) {  
    //       client.send(data, { binary: isBinary });
    //     }
    //   });
    // });
});
//# sourceMappingURL=index.js.map
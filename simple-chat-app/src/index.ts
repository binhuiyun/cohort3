import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

interface Room {
    sockets: WebSocket[]
} 

const rooms: Record<string, Room> = {}
// room1: {
//   sockets:[ws1, ws2]},
// room2: { sockets:[ws2,ws3]}


wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data:string) {
    const parsedData = JSON.parse(data);
    if (parsedData.type == "join-room"){
        const room =parsedData.room;
        if(!rooms[room]){
            rooms[room] = {
                sockets:[]
            }
        }
        rooms[room].sockets.push(ws);
        console.log(`joined room:${room}, total sockets: ${rooms[room].sockets.length}` )

    }
       if (parsedData.type == "chat") {
           const room =parsedData.room;
            console.log(`chat to room:${room}, sending to ${rooms[room]?.sockets.length} sockets` )
           rooms[room]?.sockets.forEach(socket => socket.send(data))
  }
  });


});
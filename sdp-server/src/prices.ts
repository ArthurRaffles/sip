import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';

const app = express();

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });


wss.on('connection', (ws: WebSocket) => {

    let connected = true;
    //connection is up, let's add a simple simple event
    ws.on('message', (ticker: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', ticker);
       //  ws.send(`Hello, you sent -> ${ticker}`);

        setInterval(() => {
            if (connected) {
                ws.send(JSON.stringify( {
                    ticker,
                    price: (Math.random() *100).toFixed(4),
                    timestamp: Date.now
                }));
            }

        }, 1000);
    });

    ws.on('close', (code: number, reason: string)=>{
        connected = false;
        console.log('closing..');
    });
    //send immediatly a feedback to the incoming connection    
    ws.send('Hi there, I am a WebSocket server');
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

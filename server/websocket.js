const ws = require('ws');

const wss = new ws.Server({
    port: 3000,
}, () => console.log('Server is running on port 3000'));


wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message);
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)   
                break;
        } 
    })
})

function broadcastMessage(message) {
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(message));
    })
}



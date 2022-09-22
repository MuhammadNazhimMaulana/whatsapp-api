const express = require('express');
const qrcode = require('qrcode');
const http = require('http');
const { Server }  = require('socket.io');

// WA Web
const { Client, LocalAuth } = require('whatsapp-web.js');

// Env
require('dotenv').config();

// Server and Express Config
const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Method       : GET /
// Access       : public
// Description  : Tampilan Awal
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: __dirname + "/public" })
})


// const { Client, Location, List, Buttons, LocalAuth} = require('./index');

// Use the saved values
const client = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth()
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

// Save session values to the file upon successful auth
client.on('authenticated', () => {
    console.log('Authentucated')
});
 

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

// Socket .io
io.on('connection', (socket) => {
    console.log('Klien Terkoneksi...');
    socket.emit('messages', 'Hello dari server');
});

// Qr Code
client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    io.emit('messages', 'qr');
    qrcode.toDataURL(qr, (err, url) => {
        io.emit('messages', url);
    });
});

// Port
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})
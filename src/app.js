const express = require('express');
const qrcode = require('qrcode-terminal');
const http = require('http');
const { Server }  = require('socket.io');

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

const { Client, LocalAuth } = require('whatsapp-web.js');
// const { Client, Location, List, Buttons, LocalAuth} = require('./index');

const client = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth()
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    qrcode.generate(qr, {small: true});
});
// Socket .io
io.on('connection', (socket) => {
    console.log('Klien Terkoneksi...');
    socket.on('join', function(data) {
      console.log(data);
      socket.emit('messages', 'Hello dari server');
    });
});

// Port
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})
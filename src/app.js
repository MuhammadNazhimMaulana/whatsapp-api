const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const fs = require('fs')
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

// Setup ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

// Use ExpressLayout
app.use(expressLayouts);

app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }))

// Variable for checking
let userStatus = 'online';

// Tampilan Awal
app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main',
        title: 'Halaman Home'
    });
});

// Use the saved values
const client = new Client({
    puppeteer: { headless: true },
    authStrategy: new LocalAuth()
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

// Ketika Auth Berhasil
client.on('authenticated', () => {
    // Setting New Variable Value
    userStatus = 'Authenticated';

    // Sending Information
    console.log('Authenticated');
    io.emit('messages', 'Authenticated');
});

// Ketika Logout via hp
client.on('disconnected', () => {
    // Setting New Variable Value
    userStatus = 'online';

    // Information That Log out is happened
    io.emit('messages', 'Keluar');

    // delete directory recursively
    fs.rm('./.wwebjs_auth/session/Default/Local Storage', { recursive: true }, err => {
        if (err) {
            throw err
        }
    
        console.log(`dihapus is deleted!`)
    });
});
 

client.on('auth_failure', msg => {
    // Fired if session restore was unsuccessful
    console.error('AUTHENTICATION FAILURE', msg);
});

client.on('ready', () => {
    console.log('READY');
});

// On Message
client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('Ini Sisa kirim pesan via api');
	}
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
        io.emit('qrcode', url);
    });
});

// Seperate Route
const message_route = require('./api/routes/message-route');
app.use('/message', (req, res, next) => {
    // Prepating client
    req.data_client = client;

    // Adding user status
    req.status = userStatus;
    next();
},message_route);

// Port
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})
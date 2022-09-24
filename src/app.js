const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
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

// On Message
client.on('message', message => {
	if(message.body === '!ping') {
		message.reply('Jawaban');
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

// Port
const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})
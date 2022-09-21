const express = require('express');
const qrcode = require('qrcode-terminal');

// Env
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { Client} = require('whatsapp-web.js');
// const { Client, Location, List, Buttons, LocalAuth} = require('./index');

const client = new Client({
    puppeteer: { headless: true }
});

client.initialize();

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message);
});

client.on('qr', (qr) => {
    // NOTE: This event will not be fired if a session is specified.
    qrcode.generate(qr, {small: true});
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Jalan di http://localhost:${PORT}`)
})
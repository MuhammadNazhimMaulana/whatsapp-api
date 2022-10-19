// Helper
const ResponseBulider = require('../helpers/responseBuilder');

// Message Media
const { MessageMedia } = require('whatsapp-web.js');
class MessageController{

    // Get Contact
    contacts = async (req, res) => {
        try {
            const client = req.data_client;

            // Getting Contacts
            const contacts = await client.getContacts()
            return ResponseBulider.success(res, contacts);

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

    // Get Contact BY id
    findContact = async (req, res) => {
        try {
            const client = req.data_client;
            const id = req.body.ContactId._serialized;

            // Getting Contact
            const contact = await client.getContactById(id)
            return ResponseBulider.success(res, contact);
            
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }
    
    // Getting All chats
    chats = async (req, res) => {
        try {
            const client = req.data_client;
            
            // Getting Contacts
            const chats = await client.getChats()
            return ResponseBulider.success(res, chats);
            
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }
    
    // Finding one chat
    findChat = async (req, res) => {
        try {
            const client = req.data_client;
            const id = req.body.ChatId._serialized;

            // Getting Contacts
            const chat = await client.getChatById(id)
            return ResponseBulider.success(res, chat);

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

    // First Sending Data
    store = async (req, res) => {
        try {
            const { phone, message } = req.body;
            const client = req.data_client;

            // Checking Phone Number
            if(!phone){
                // Return 
                return ResponseBulider.error(res, 422, "Nomor Hp Tidak Boleh Kosong");   
            }

            // Getting id of number
            const number_details = await client.getNumberId(phone);

            // Sending message
            if (number_details) { // send message
                const result = await client.sendMessage(number_details._serialized, message)
                return ResponseBulider.success(res, result);
            } else {
                return ResponseBulider.error(res, 422, 'Nomor Yang Dimasukkan tidak ditemukan'); 
            }
            
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

    // First Sending Data with picture
    storePicture = async (req, res) => {
        try {
            const { phone, message, picture } = req.body;
            const client = req.data_client;

            // Checking Phone Number
            if(!phone){
                // Return 
                return ResponseBulider.error(res, 422, "Nomor Hp Tidak Boleh Kosong");   
            }

            // Getting id of number
            const number_details = await client.getNumberId(phone);

            // Sending message
            if (number_details) {
                // Preparing Media (using url)
                const media = await MessageMedia.fromUrl(picture);

                const result = await client.sendMessage(number_details._serialized, media, {caption: message})
                return ResponseBulider.success(res, result);
            } else {
                return ResponseBulider.error(res, 422, 'Nomor Yang Dimasukkan tidak ditemukan'); 
            }
            
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }


}

module.exports = MessageController
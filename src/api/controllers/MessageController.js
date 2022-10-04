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
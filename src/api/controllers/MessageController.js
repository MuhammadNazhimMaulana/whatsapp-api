// Helper
const ResponseBulider = require('../helpers/responseBuilder');

class MessageController{

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


}

module.exports = MessageController
// Helper
const ResponseBulider = require('../helpers/responseBulider');

class MessageController{

    // First Sending Data
    index = async (req, res) => {
        try {
            const { phoneNumber, message } = req.body;

            // Checking Phone Number
            if(!phoneNumber){
                // Return 
                return ResponseBulider.error(res, 422, "Nomor Hp Tidak Boleh Kosong");   
            }

            return ResponseBulider.success(res, message);
        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }


}

module.exports = MessageController
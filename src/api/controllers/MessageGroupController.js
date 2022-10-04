// Helper
const ResponseBulider = require('../helpers/responseBuilder');

// Message Media
const { MessageMedia } = require('whatsapp-web.js');
class MessageGroupController{

    // Sending Group Chat
    groupChat = async (req, res) => {
        try {
            const { group_name, message} = req.body;
            const client = req.data_client;

            // Getting chat
            await client.getChats().then(async (chats) => {
                const grup = chats.find((chat) => chat.name === group_name);

                // Sending Message
                const pesan = await grup.sendMessage(message)
                return ResponseBulider.success(res, pesan);

            });

        } catch (error) {
            // If Error
            return ResponseBulider.error(res, 500, error.message); 
        }
    }

}

module.exports = MessageGroupController
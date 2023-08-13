
// Message Reply
index = (message) => {
    try {
        // Check Message
        if(message.body === '!test') {
            message.reply('Halo Banh');
        }else if(message.body === 'zim'){
            message.reply('Ada apa nih tiba-tiba memanggil mas bro?');
        }else{
            // message.reply('Tunggu dia muncul ya mas bro');
            console.log("other");
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    index
}
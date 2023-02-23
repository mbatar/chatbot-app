const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['en'] });
async function trainChatBotIA() {
    return new Promise(async (resolve, reject) => {
        manager.addDocument('en', 'goodbye for now', 'greetings.bye');
        manager.addDocument('en', 'bye bye take care', 'greetings.bye');
        manager.addDocument('en', 'okay see you later', 'greetings.bye');
        manager.addDocument('en', 'bye for now', 'greetings.bye');
        manager.addDocument('en', 'i must go', 'greetings.bye');
        manager.addDocument('en', 'hello', 'greetings.hello');
        manager.addDocument('en', 'hi', 'greetings.hello');
        manager.addDocument('en', 'howdy', 'greetings.hello');
        manager.addAnswer('en', 'greetings.bye', 'Till next time');
        manager.addAnswer('en', 'greetings.bye', 'see you soon!');
        manager.addAnswer('en', 'greetings.hello', 'Hey there!');
        manager.addAnswer('en', 'greetings.hello', 'Greetings!');
        await manager.train();
        manager.save();
        console.log("AI has been trainded")
        resolve(true);
    })
}
async function generateResponseAI(qsm) {
    return new Promise(async (resolve, reject) => {
        response = await manager.process('en', qsm);
        resolve(response);
    })
}
const connectWebSocket = (io) => {
    io.on('connection', function (socket) {
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log("New user joined!")
        });
        socket.on('new-msg', async function (data) {
            let response = await generateResponseAI(data.msg);
            io.to(data.room).emit('send-msg-response', response.answer !== undefined
                ? response.answer : "I am sorry, I don't understand :( ");
        })
    });
}
module.exports = {
    connectWebSocket,
    trainChatBotIA
}
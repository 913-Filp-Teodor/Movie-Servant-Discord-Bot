module.exports = {
    name: 'ping',
    description: 'N/a',
    execute(message, args) {
        message.channel.send("Pong.");
    }
}
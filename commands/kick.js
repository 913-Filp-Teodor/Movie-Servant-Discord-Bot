module.exports = {
    name: 'kick',
    description: 'N/a',
    execute(message, args) {
        const taggedUser = message.mentions.users.first();

        if (!message.mentions.users.size)
            return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}>`);
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    }

}

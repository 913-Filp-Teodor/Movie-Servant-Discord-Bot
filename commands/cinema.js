const getMovies = require('./web_scraping/cinemacity');

module.exports = {
    name: 'cinema',
    description: 'N/a',
    execute(message, args) {
        var dateString = "";
        var now = new Date();
        var month = "";
        var day = "";
        if (args.includes('today')) {
            month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : now.getMonth();
            day = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
        } else if (args.includes('tomorrow')) {
            var tomorrow = new Date();
            tomorrow.setDate(now.getDate() + 1);
            month = tomorrow.getMonth() + 1 < 10 ? "0" + (tomorrow.getMonth() + 1) : tomorrow.getMonth();
            day = tomorrow.getDate() < 10 ? "0" + tomorrow.getDate() : tomorrow.getDate();
        }

        dateString = [now.getFullYear(), month, day].join('-');
        message.channel.send("Hold on, getting movies from Cinemacity..");
        setTimeout(() => {
            message.channel.send("This might take a while");
        }, 2500);

        getMovies(dateString, (movies => movies.forEach(movie => {
            let name = movie.name;
            let link = movie.link;
            let reply = `Movie name: ${name}\n`;
            reply += "Schedule: ";
            reply += movie.hours.join(', ');

            reply += `\n${link}`;

            message.channel.send(reply);

        })));
    }
}
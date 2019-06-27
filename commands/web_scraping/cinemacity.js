var phantom = require('phantom');
var cheerio = require('cheerio');
var _ph, _page;

function scrap(html, callback) {
    var $ = cheerio.load(html);
    let movies = [];
    ($('.movie-row').each(function () {
        $('.qb-movie-link', this).each(function () {
            movies.push({
                link: $(this).attr('href'),
                name: "",
                hours: []
            });
        });
        // handle movie names
        $('h4', this).each(function () {
            movies[movies.length - 1].name = $(this).text();
        });
        // handle hours
        let orar = $(this).find('.btn-sm').text();
        for (let i = 0; i < orar.length; i += 5) {
            let result = "";
            for (let j = 0; j < 5; j++) {
                result += orar[i + j];
            }
            movies[movies.length - 1].hours.push(result);
        }
    }));

    callback(movies);
};

module.exports = function (date, cb) {
    phantom
        .create()
        .then(ph => {
            _ph = ph;
            return _ph.createPage();
        })
        .then(page => {
            _page = page;
            return _page.open(`https://www.cinemacity.ro/cinemas/cluj-iulius-mall/1803#/buy-tickets-by-cinema?in-cinema=1803&at=${date}&view-mode=list`);
        })
        .then(status => {
            return _page.property('content');
        })
        .then(content => {
            _page.close();
            _ph.exit();
            return scrap(content, cb);
        })
        .catch(e => console.log(e));
}
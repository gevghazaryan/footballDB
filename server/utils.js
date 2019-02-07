const options_col = require('./options.js')

function parsingTeamGames(htmlPage,year) {

    let options = options_col[`options_${year}`]

    const $ = htmlPage;

    let json = [];

    $('a').filter('.tooltip2').children('span').each((index, anchor) => {

        let match = {}

        //getting match date

        match.date = options.getDate(anchor)

        //getting hometeam and awayteam

        let firstDiv = anchor.children[1];
        let secondDiv = anchor.children[3];

        match.ht = options.getHomeTeam(anchor)
        match.at = options.getAwayTeam(anchor)

        //getting all goals scored during match

        match.goals = options.getMathGoals(anchor);

        json.push(match)

    })

    return json

}

module.exports = parsingTeamGames

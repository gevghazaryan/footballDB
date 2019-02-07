const fs = require('fs');

function parse(country) {

    fs.readFile(`../${country}/schedule.txt`,'utf-8',function(err,data){
        if(err) {
            console.log('there is error',err)
        } else {
            let games = data
                .split('\n')
                .map((game) => {
                    console.log(game)
                    game = game.split('\t');
                    let day = game[0].match(/\d+/gi)[0]
                    let month = game[0].match(/\S\w+$/gi)[0]
                    let teams = game[2].split('-').map(team => team.trim())
                    let ht = teams[0];
                    let at = teams[1];
                    return {date: `2019-${month}-${day}`,ht,at}
                })
            fs.writeFile(`../${country}/schedule.json`,JSON.stringify(games),function(err) {
                if(err) {
                    console.log(`error is ${err}`)
                }
            })
        }
    })

}

parse('italy');

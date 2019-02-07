/*  ================================
    this script meant to parse team ids from soccerstats website
    ================================*/

const request = require('request');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const fs = require('fs')

function parseandWriteIds(league) {

    const options = {
        url: `https://www.soccerstats.com/latest.asp?league=${league}`,
        transform: function(body) {
            return cheerio.load(body)
        }
    }
    
    rp(options)
        .then(function($){
            let hrefs = []
            $('.seven.columns #btable').find('a').each(function() {
                let str = $(this).attr('href').trim()
                let game = str.match(/(\d+)-(.+)$/i)
                if(game !== null) {
                    let teamName = game[2];
                    let id = game[1]
                    hrefs.push({id,teamName})
                }
            })
            fs.writeFile(`../${league}/ids.json`,JSON.stringify(hrefs),(err) => {
                if(err) {
                    console.log(err)
                }
            })
        })
    
}

parseandWriteIds('france')

const request = require('request');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const fs = require('fs');

const parsingTeamGames = require('./utils.js');

const leaguePage = 'https://www.soccerstats.com/latest.asp?league='
const league = 'england';
const year = '2013';

const options = {
  uri: leaguePage + league + '_' + year,
  transform: function (body) {
    return cheerio.load(body);
  }
};

rp(options)
  .then(function ($) {

    let teamLinks = [];

    $('#btable').find('a').each((index, link) => {

      if (link.attribs.href.match(/^team.asp/gi) !== null) {

        teamLinks.push(encodeURI(link.attribs.href))

      }
    })
    console.log(teamLinks)

    return Promise.all(teamLinks.map(link =>
      rp({
        uri: 'https://www.soccerstats.com/' + link,
        transform: function (body) {
          return cheerio.load(body);
        }
      })
    ))
  })
  .then(pages => {

    let pagesCombined = pages
      .reduce((acc, page) =>
        acc
          .concat(parsingTeamGames(page,year)), []);

    fs.writeFile(`./${league}/${year}.json`, JSON.stringify(pagesCombined), err => {
      console.log(err)
    })

    // [() => fsp.open('./pages.json'),file.append(pagesCombined)].reduce((a,b) => b(),Promise.resolve())

  })
  .catch(err => { console.log('error is: ', err) })
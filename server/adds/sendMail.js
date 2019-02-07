const sendmail = require('nodemailer');

const request = require('request');
const rp = require('request-promise-native');
const cheerio = require('cheerio');
const moment = require('moment');

const teams = require('./ids')
const fs = require('fs');

const m = {
    country: ['spain'],
    mail: 'mushobenne@gmail.com'
}

const g = {
    country: ['england'],
    mail: 'drugonme@yandex.ru'
}

function sendingLinks(user, html) {

    var transporter = sendmail.createTransport({
        service: 'yandex',
        auth: {
            user: 'smartbet2018@yandex.ru',
            pass: 'smartbet18'
        }
    });

    const mailOptions = {
        from: 'smartbet2018@yandex.ru', // sender address
        to: user.mail, // list of receivers
        subject: 'Subject of your email', // Subject line
        html: html// plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

}

function createHtml(hrefs) {
    let arrayOfLists = hrefs.map((item) => `<li>${item}</li>`)
    let ul = `<ul>${arrayOfLists.join('')}</ul>`
    let headline = `<h1>Here is list of upcoming matches</h1>`
    let date = `<p>data of games: <b>${moment().format()}</b></p>`
    return `${headline}\n${date}\n${ul}`
}

function findNextDayMatches(league) {
    let nextDay = moment().add(1,'d');
    fs.readFile(`../${league}/schedule.json`,'utf8',function(err,data) {
        if(err) {
            console.log('there is error',err)
        } else  {
            let nextDayMatches = JSON.parse(data).filter(game => moment(game.date).isSame(nextDay,'d'));
            console.log(nextDay)
            console.log('=======')
            console.log(nextDayMatches)
            fs.readFile(`../${league}/ids.json`,'utf8',function(err,data) {
                let beginingOfHref = `https://www.soccerstats.com/h2h.asp?league=${league}&`
                let idAndTeams = JSON.parse(data);
                let hrefs = nextDayMatches.map(match => {
                    let ht = match.ht.toLowerCase().replace(/\s+/gi,'-');
                    let at = match.at.toLowerCase().replace(/\s+/gi,'-');
                    console.log(ht,match.at.toLowerCase(),at)
                    let htId = idAndTeams.filter(item => item.teamName == ht)[0].id;
                    let atId = idAndTeams.filter(item => item.teamName == at)[0].id;
                    return `${beginingOfHref}t1id=${htId}&t2id=${atId}&ly=2019`

                })
                sendingLinks(m,createHtml(hrefs))
            })
        }
    })
}

findNextDayMatches('italy')
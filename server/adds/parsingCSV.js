const parse = require('csv').parse;
const assert = require('assert');
let output = [];
const fs = require('fs');
const Datastore = require('nedb');
const db = new Datastore({filename: '../db/games.db'});
const moment = require('moment');

// let stream = fs.createReadStream('../england/2013.csv',{encoding: 'utf-8'});

// stream.on('close',() => {console.log('close')});
// stream.on('data',function(data,err) {
//     console.log(data)
// })

const parser = parse({
    delimiter: ',',
    // to_line: 5,
    columns: true
})

parser.on('readable',function(){
    let record;
    while(record = parser.read()) {
        output.push(record)
    }
})

parser.on('error',function(err,data){
    if(err) {
        console.log('error',err.message);
        console.error(err)
        console.log(data)
    }
})

// parser.on('end',function() {
//     output = output.map(item => {
//         let date = item.Date.split('/')
//         date = moment().year('20' + date[2]).month(date[1]).day(date[0]);
//         return date
//     })

//     db.loadDatabase(function(err){
//         if(err) {
//             console.log(err)
//         } else {
//             console.log('there is no error');
//             db.find({ht: 'Aston Villa'}).sort('date').exec(function(err,docs) {
//                 docs.forEach(item => {console.log(item)})
//             })
//         }
//     })
// })

fs.createReadStream('../england/2013.csv').pipe(parser)

parser.on('end',function() {
    fs.readFile('../england/2013.txt','utf-8',function(err,data) {
        let teams = data.split('\n').map(item => item.trim().split('-'));
        let teamsMap = new Map();
        teams.forEach(item => {teamsMap.set(item[1],item[0])}); 
        
        output = output.map(item => {
            let date = item.Date.split('/');
            item.HomeTeam = teamsMap.get(item.HomeTeam);
            item.AwayTeam = teamsMap.get(item.AwayTeam);
            date = moment().year('20' + date[2]).month(date[1]).day(date[0]);
            item.Date = date;
            return item
        })

        db.loadDatabase(function(err) {
            if(err) {
                console.log('there is error during loading database')
                console.log('error is: ',err.message)
                console.log('end of message')
            } else {
                output.forEach((item,index) => {
                    db.update({ht: item.HomeTeam,at: item.AwayTeam,season: 2013},
                        {$set: {hthg: item.HTHG,
                            htag: item.HTAG,
                            fthg: item.FTHG,
                            ftag: item.FTAG,
                            htr: item.HTR,
                            ftr: item.FTR,
                            hs: item.HS,
                            as: item.AS,
                            hst: item.HST,
                            ast: item.AST,
                            hc: item.HC,
                            ac: item.AC,
                        }},
                        {
                            upsert: false
                        },
                        function() {

                        })
                    // db.find({ht: item.HomeTeam,at: item.AwayTeam,season: 2013},function(err,data) {
                    //     console.log('csv item',item)                        
                    //     console.log('db',data)
                    //     console.log('db goald',data[0].goals)
                    //     console.log('csv goals',item.FTHG,item.FTAG)
                    // });
                })
            }
        })       
    })
})


const Datastore = require('nedb');
const db = new Datastore({filename: '../db/games.db'});
const fs = require('fs');

console.log('hello');
console.log('we are starting to execute script')

db.loadDatabase(function (err) {    // Callback is optional
    if(err) {
        console.log(err)
    } else {
        console.log('no err')
        fs.readFile('../england/2013.json',function(err,data){
            if(err) {
                console.log('err',err)
            } else {
                let dataToJson = JSON.parse(data);
                dataToJson = dataToJson.map(item => {
                    item.country = 'England';
                    item.league = 'Premier League';
                    item.season = 2013
                    return item
                })
                dataToJson = dataToJson.reduce((acc,a,index) => {
                    let repeat = acc.every(b => !(a.at == b.at && a.ht == b.ht && a.season == b.season))

                        if(repeat) {
                            acc.push(a)
                        }
                        return acc

                },[])
                db.insert(dataToJson,function(err) {
                    console.log(err)
                })
            }
        })
    }
  });


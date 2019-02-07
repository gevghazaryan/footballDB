const Datastore = require('nedb');
const db = new Datastore({filename: '../db/games.db'});
const http = require('http');

console.log('hello');
console.log('we are starting to execute script')

db.loadDatabase(function (err) {
    if(err) {
        console.log(err)
    } else {
        db.find({},function(err,data) {
            if(err) {
                console.log(err)
            } else {
                data.forEach(function(item) {
                    console.log(item)
                })
            }
        })
    }
}) 


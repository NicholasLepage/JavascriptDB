//jshint esversion: 6
const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

const name = process.argv[2];

function lookUp (name, result) {

  const numResult = result.length;

  console.log(`Found ${numResult} person(s) by the name '${name}':` );

  for (var i = 0; i < result.length; i++) {
    console.log(`- ${[i + 1]}: ${name} ${result[i].last_name}, born '${result[i].birthdate}'`);
  }
}

let saves = [];

console.log("Searching ...");

knex('test_db').select('*').from('famous_people').where('first_name', name).then(function(result) {
  saves = result;
  lookUp(name, saves);
}).finally(function(){
  knex.destroy();
});
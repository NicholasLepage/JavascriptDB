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

// Grabs the 3 inputs from the CLI
const firstName = process.argv[2];
const lastName = process.argv[3];
const birth_Date = process.argv[4];

// Insert new famous people
knex.insert(
  [{first_name: firstName,
    last_name: lastName,
    birthdate: birth_Date}])
  .into('famous_people')
  .then()
  .finally(function(){
    knex.destroy();
  });
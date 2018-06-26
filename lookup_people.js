//jshint esversion: 6
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const name = process.argv[2];

function lookUp (name, result) {
  const numResult = result.rows.length;
  console.log(`Found ${numResult} person(s) by the name '${name}':` );

  for (var i = 0; i < result.rows.length; i++) {
    console.log(`- ${[i + 1]}: ${name} ${result.rows[i].last_name}, born '${result.rows[i].birthdate}'`);
  }
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching...");
  client.query(`SELECT * FROM famous_people WHERE first_name = '${name}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    lookUp(name,result);

    client.end();
  });
});
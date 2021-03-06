const { createConnection } = require('mysql');

const client = createConnection ({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Maythe4thbewithyou!',
  database: 'playlistdb',
});

client.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${client.threadId}`);
  client.end();
});

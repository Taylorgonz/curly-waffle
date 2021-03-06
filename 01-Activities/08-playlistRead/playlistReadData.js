const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Maythe4thbewithyou!',
  database: 'playlistdb',
});

const queryAllSongs = () => {
  connection.query('SELECT * FROM songs', (err, res) => {
    if (err) throw err;
    res.forEach(({ id, title, artist, genre }) => {
      console.log(`${id} | ${title} | ${artist} | ${genre}`)
    });
    console.log('--------------------------------------')
  });
}


const queryPopSongs = (genre) => {
  const query = connection.query(
    'SELECT * FROM songs WHERE genre=?',
    [genre],
    (err, res) => {
      if (err) throw err;
      res.forEach(({ id, title, artist, genre }) => {
        console.log(`${id} | ${title} | ${artist} | ${genre}`)
      })
      console.log(query.sql);
      connection.end();
    });
};

const deleteSongs = () => {
  console.log("Deleting all pop songs ...\n");
  connection.query( 
    "DELETE FROM songs WHERE ?",
    {
      genre: "pop"
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} songs deleted!\n`)
      queryAllSongs();
      queryPopSongs();
    }
    )
}



const updateSong = () => {
  console.log("Updating Shovels & Rope title... \n")
  const query = connection.query(
    'UPDATE songs SET ? WHERE ?',
    [
      {
        title: "El Paso",
      },
      {
        artist: "Shovels & Rope",
      }
    ],
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} song updated!\n`)
      deleteSongs();
    }
  )
  console.log(query.sql);
}

const createSong = () => {
  console.log("Inserting a new song ...\n");
  const query = connection.query(
    'INSERT INTO songs SET ?',
    {
      title: 'Black Tea',
      artist: 'Ruffin',
      genre: 'indie',
    },
    (err, res) => {
      if (err) throw err;
      console.log(`${res.affectedRows} song created!!\n`)
      updateSong();
    }
  )
}

connection.connect((err) => {
  if (err) throw err;
  console.log(`connected as id ${connection.threadId}`);
  createSong();
});

// app.get("/songs/:genre", (res, req) )
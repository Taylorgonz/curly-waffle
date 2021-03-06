const { createConnection } = require('mysql');
const inquirer = require('inquirer');

const client = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Maythe4thbewithyou!',
    database: 'top_songsdb'
});

const searchArtist = () => {
    inquirer
        .prompt(
            {
                message: "What artist would you like to search",
                name: "artist",
                type: "input",
            }
        ).then((answers) => {
            client.query(
                'SELECT a.year, a.album, a.position, s.artist, s.title FROM top5000 s INNER JOIN topalbums a ON (a.artist = s.artist and a.year = s.year) WHERE a.? ORDER BY a.year, s.position',
                [
                    {
                        artist: answers.artist
                    }
                ],
                (err,res) => {
                    if (err) throw err;
                    res.forEach(({position, album, year, title, artist }, i) => {
                        const num = i + 1;
                    console.log(`${num}) Year: ${year} || Album Position: ${position} || Artist: ${artist} || Song: ${title} ||Album: ${album} `)
                    })

                }
            )
            client.end();
        })
}



client.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${client.threadId}\n`);
    searchArtist();
});
const { createConnection } = require('mysql');
const inquirer = require('inquirer');

const client = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Maythe4thbewithyou!',
    database: 'top_songsdb'
});

const startSearch = () => {
    inquirer
        .prompt([
            {
                message: 'What would you like to do?',
                name: 'action',
                type: 'list',
                choices: [
                    'Find songs by artist',
                    'Find all artists who appear more than once',
                    'Find data within a specific range',
                    'Search for a specific song',
                    'exit',
                ],
            }
        ]).then((answers) => {
            switch (answers.action) {
                case 'Find songs by artist':
                    findArtists();
                    break;

                case 'Find all artists who appear more than once':
                    multiSearch();

                    break;
                case 'Find data between a specific range':
                    rangeSearch();
                    break;
                case 'Find all artists who appear more than once':
                    multiSearch();
                    break;

            }
        })

}


const findArtists = () => {
    inquirer
        .prompt({
            name: 'artist',
            type: 'input',
            message: "What artist would you like to search for?",
        }).then(answers => {
            client.query(
                'SELECT * FROM top5000 WHERE ?',
                {
                    artist: answers.artist
                },
                (err, res) => {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    res.forEach(({ position, title, artist, year }) => {
                        console.log(`${position} | ${title} | ${artist} | ${year}`)
                    });
                    startSearch();
                })
        })
};

const rangeSearch = () => {
    inquirer
        .prompt([
            {
                name: 'start',
                type: 'input',
                message: "Enter starting position",
                validate(value) {
                    if (isNAN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
            {
                name: 'end',
                type: 'input',
                message: "Enter ending position",
                validate(value) {
                    if (isNAN(value) === false) {
                        return true;
                    }
                    return false;
                },
            },
        ]).then((answers) => {
            client.query = (
                'SELECT position, song, artist, year FROM top5000 WHERE position BETWEEN ? AND ?',
                [{
                    position: answers.start
                },
                {
                    position: answers.endD
                }
                ],
                (err, res) => {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    res.forEach(({ position, title, artist, year }) =>
                        console.log(`${position} | ${title} | ${artist} | ${year}`)
                    )
                    startSearch();
                });
        })
}

const multiSearch = () => {
    const query =
        'SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1';
    client.query(query, (err, res) => {
        if (err) throw err;
        res.forEach(({ artist }) => console.log(artist));
        startSearch();
    })
}



client.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${client.threadId}\n`);
    startSearch();
});
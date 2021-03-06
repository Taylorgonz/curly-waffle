const { createConnection } = require('mysql');
const inquirer = require('inquirer');

const client = createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Maythe4thbewithyou!',
    database: 'GreatBaydb'
});

const postQuestions = () => {
    inquirer
        .prompt([
            {
                message: "What is the Item you would like to submit?",
                type: "input",
                name: "itemInput"
            },
            {
                message: "What category would you like to place your auction in?",
                type: "input",
                name: "categoryInput"
            },
            {
                message: "What would you like your starting bid to be?",
                type: "input",
                name: "bidInput",

            }

        ]).then(answers => {
                createItem(answers);
        })
}


// inititail question set 
// ----------------------------------------

const initQuestion = () => {
    inquirer
        .prompt([
            {
                message: "Would you like to [POST] and auction or [BID] on an auction?",
                type: 'list',
                name: 'prompt',
                choices: ["POST", "BID", "DONE"]

            }
        ]).then(answers => {
            if (answers.prompt === "POST") {
                postQuestions();
            } else if (answers.prompt === "BID") {
                bidQuestions();
            } else {
                client.end();
            }
        })
}


// BID QUESTIONS
// -----------------------------------------------
const bidQuestions = () => {
    client.query("SELECT * FROM auctions", (err, res) => {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    message: "What is the Item would you like to place a bid on?",
                    type: "rawlist",
                    name: "choice",
                    choices() {
                        const choiceArray = [];
                        res.forEach(({ item_name }) => {
                            choiceArray.push(item_name);
                        })
                        return choiceArray;
                    }
                },
                {
                    message: "How much would you like to bid?",
                    type: "input",
                    name: "bid"
                },

            ]).then((answers) => {
                let chosenItem;
                res, forEach((item) => {
                    if (item.item_name === answers.choice) {
                        chosenItem = item;
                    }
                })
            });
        if (chosenItem.highest_bid < parseInt(answers > bid)) {
            client.query(
                'UPDATE auctions SET ? WHERE ?',
                [
                    {
                        highest_bid: answers.bid
                    },
                    {
                        id: chosenItem.id,
                    }
                ],
                (err) => {
                    if (err) throw err;
                    console('Bid placed succesfully!');
                    initQuestion();
                }
            )
        }
    })
}




const createItem = (answers) => {
    console.log(`Creating new auction item...\n`)
    const query = client.query(
        'INSERT INTO auctions SET ?',
        {
            item_name: answers.itemInput,
            category: answers.categoryInput,
            starting_bid: answers.bidInput,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} Item created!\n`);
            // Call updateProduct AFTER the INSERT completes
            initQuestion();
        }
    )
}



client.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${client.threadId}`)
    initQuestion();

})

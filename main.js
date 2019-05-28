//Load the required libs
const express = require('express');

//Tunables
const PORT = parseInt(process.argv[2] || process.env.APP_PORT || 3000);

//Create an instance of express
const app = express();

app.get('/', function (req, resp) {
    resp.status(200);

    resp.type('text/html');

    resp.send('<h2>The base html page</h2>')
  })


app.get('/image/imagefile/:filename', (req, resp) => {
    resp.status(200);
    //MIME type
    resp.type('image/png');
    //Return file
    resp.sendFile(__dirname + '/image/'+ req.params);
})

app.get('/numbers', (req, resp) => {
    resp.status(200);
    //MIME type
    resp.type('image/jpg');
    //Return file
    resp.sendFile(__dirname + '/numbers/number'+ getRandomInt(30) +'.jpg');
})


app.get('/toto', (req, resp) => {
    resp.status(200);
    //MIME type
    resp.type('text/html');


    var listOfNumbers = new Array(-1,-1,-1,-1,-1,-1);

    var j = 0, x;

   while(true) { 
        let k = getRandomInt(30);
        x = 0;
        for(x=0; x < listOfNumbers.length; x++)
        {
            if( listOfNumbers[x] == k)
            {
                break;
            }
            else
            {
                if(x > j | x == j )
                {
                    listOfNumbers[j] = k;
                    j++;
                    break;                
                }
            }
        }

        if(j > listOfNumbers.length - 1)
        {
            break;
        }
    }

    console.info(`${listOfNumbers[0]}`);
    console.info(`${listOfNumbers[1]}`);

    resp.send(`<h2>The Winning numbers are:</h2>     
    <img src = "/numbers/number${listOfNumbers[0]}.jpg" width="100">    
    <img src = "/numbers/number${listOfNumbers[1]}.jpg" width="100">
    <img src = "/numbers/number${listOfNumbers[2]}.jpg" width="100"> 
    <img src = "/numbers/number${listOfNumbers[3]}.jpg" width="100">  
    <img src = "/numbers/number${listOfNumbers[4]}.jpg" width="100"> 
    <img src = "/numbers/number${listOfNumbers[5]}.jpg" width="100">`);
})

app.use(express.static(__dirname));


app.use((req, resp) => {
    resp.status(404);
    resp.type('text/html');
    resp.send(`<h2>Cannot find ${req.originalUrl} </h2>`)
})

//start the server
app.listen(PORT, () => {
    console.info(`Application started at ${new Date()} on port ${PORT}`);
});


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
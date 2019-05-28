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
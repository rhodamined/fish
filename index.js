// modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // init express app
const port = process.env.PORT || 3003; 

app.use(express.static('dist'));
app.use(bodyParser.json());

const StateMachine = require('./server/state');

/*---------------------------*/
/* SERVER                    */
/*---------------------------*/

app.get('/', async (req, res) => {
  // for whatever reason this isn't working?
  console.log('get/');
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});

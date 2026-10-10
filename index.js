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
  console.log('get/');
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});


// update state with fish state from client
let state = [];

// write current status; size; location
app.post('/update/:fishNum/:status/:size/:location', async (req, res) => {
  
  let fishNum = req.params.fishNum;
  let status = req.params.status;
  let size = parseInt(req.params.size);
  let location = req.params.location;
  console.log('index.js /update fishNum: ' + fishNum + ' status: ' + status + ' size: ' + size + ' location: ' + location);

  // add to buffer
  state[fishNum] = {
    status: status,
    size: size,
    location: location
  };

  res.send('Success: updated ' + status + ': ' + size + ' - ' + location);
});

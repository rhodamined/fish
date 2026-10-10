// modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // init express app
const port = process.env.PORT || 3003; 

app.use(express.static('dist'));
app.use(bodyParser.json());

// database 
const sheets = require('./server/google_sheets');

// game state
// in format of [{status, size, location}] for each fish, where index is the fish 1-4
let state = [{}, {}, {}, {}]; // initialize state for 4 fish; index 0 stays blank
let hasStateHasChanged = false; // flag to track if state has changed since last write to Google Sheets


// IIFE: UPDATING
// On spin up, ping gsheet and pull entire gamestate every 2 seconds
(async function () {

	setInterval(async function () {
    // console.log('interval');

    if (hasStateHasChanged) {
      console.log('state has changed, writing to gsheet');
      await sheets.writeStateToGSheet(state);
      hasStateHasChanged = false; // reset flag after writing to gsheet
    }

	}, 1000);
})();
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



// write current status; size; location
app.post('/update/:fishNum/:status/:size/:location', async (req, res) => {
  
  let fishNum = req.params.fishNum;
  let status = req.params.status;
  let size = parseInt(req.params.size);
  let location = req.params.location;
  console.log('index.js /update fishNum: ' + fishNum + ' status: ' + status + ' size: ' + size + ' location: ' + location);

  // update state
  state[fishNum-1] = {
    fish: fishNum,
    status: status,
    size: size,
    location: location
  };

  hasStateHasChanged = true; // set flag to indicate state has changed
  console.log(state);
  res.send('Success: updated ' + status + ': ' + size + ' - ' + location);
});

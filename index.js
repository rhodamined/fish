// modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // init express app
const port = process.env.PORT || 3003;

app.use(express.static('dist'));
app.use(bodyParser.json());

// database
const sheets = require('./server/google_sheets');
const dashboardRouter = require('./server/dashboard');
const { createGameState } = require('./server/state');

// game state
const state = createGameState(4);

(async function () {
	setInterval(async function () {
    if (state.hasChanged()) {
      console.log('state has changed, writing to gsheet');
      await sheets.writeStateToGSheet(state.getState());
      state.clearDirty();
    }
	}, 1000);
})();

/*---------------------------*/
/* SERVER                    */
/*---------------------------*/

// dist html for twee build
app.get('/', async (req, res) => {
  console.log('get/');
  res.sendFile(__dirname + '/index.html');
});

// dashboard routes
app.use('/', dashboardRouter);

// app listen
app.listen(port, () => {
  console.log('listening on port ' + port);
});


/* ----- READ -----*/

app.get('/state', async (req, res) => {
  res.json(state.getState());
});

app.get('/state/:fishNum', async (req, res) => {
  const fish = state.getFish(req.params.fishNum);
  if (!fish) {
    return res.status(404).json({ error: 'Fish not found' });
  }

  return res.json(fish);
});


/* ----- WRITE -----*/

// write current status; size; location
app.post('/update/:fishNum/:status/:size/:location', async (req, res) => {
  const fishNum = Number(req.params.fishNum);
  const status = req.params.status;
  const size = Number.parseInt(req.params.size, 10);
  const location = req.params.location;

  console.log('index.js /update fishNum: ' + fishNum + ' status: ' + status + ' size: ' + size + ' location: ' + location);

  const updatedFish = state.updateFish(fishNum, {
    fish: fishNum,
    status,
    size: Number.isFinite(size) ? size : 0,
    location
  });

  console.log(updatedFish);
  res.send('Success: updated ' + status + ': ' + size + ' - ' + location);
});

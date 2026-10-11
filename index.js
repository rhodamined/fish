// modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express(); // init express app
const port = process.env.PORT || 3003;

app.use(express.static('dist'));
app.use(bodyParser.json());

const dashboardRouter = require('./server/dashboard');
const { createGameState } = require('./server/state');

// game state
const state = createGameState(4);
state.resetToDefaults();
console.log('game state initialized to default values in memory');

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

app.post('/reset-state', async (req, res) => {
  const resetState = state.resetToDefaults();
  res.json({ ok: true, state: resetState });
});

app.post('/reset', async (req, res) => {
  return res.redirect(307, '/reset-state');
});


/* ----- WRITE -----*/

// write current status; size; location
app.post('/update/:fishNum/:status/:size/:location', async (req, res) => {
  const fishNum = Number(req.params.fishNum);
  const status = req.params.status;
  const size = Number.parseInt(req.params.size, 10);
  const location = req.params.location;
  const trash = 'none';

  console.log('index.js /update fishNum: ' + fishNum + ' status: ' + status + ' size: ' + size + ' location: ' + location + ' trash: ' + trash);

  const updatedFish = state.updateFish(fishNum, {
    fish: fishNum,
    status,
    size: Number.isFinite(size) ? size : 0,
    location,
    trash
  });

  console.log(updatedFish);
  res.send('Success: updated ' + status + ': ' + size + ' - ' + location + ' - ' + trash);
});

// write current status; size; location; trash
app.post('/update/:fishNum/:status/:size/:location/:trash', async (req, res) => {
  const fishNum = Number(req.params.fishNum);
  const status = req.params.status;
  const size = Number.parseInt(req.params.size, 10);
  const location = req.params.location;
  const trash = typeof req.params.trash === 'string' && req.params.trash.length > 0
    ? decodeURIComponent(req.params.trash)
    : 'none';

  console.log('index.js /update fishNum: ' + fishNum + ' status: ' + status + ' size: ' + size + ' location: ' + location + ' trash: ' + trash);

  const updatedFish = state.updateFish(fishNum, {
    fish: fishNum,
    status,
    size: Number.isFinite(size) ? size : 0,
    location,
    trash
  });

  console.log(updatedFish);
  res.send('Success: updated ' + status + ': ' + size + ' - ' + location + ' - ' + trash);
});

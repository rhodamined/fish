// modules
const express = require('express');

dotenv.config();
const app = express(); // init express app
const port = process.env.PORT || 3003; 

app.use(express.static('dist'));
app.use(bodyParser.json());

/*---------------------------*/
/* SERVER                    */
/*---------------------------*/

app.get('/', async (req, res) => {
  // for whatever reason this isn't working?
  res.sendFile(__dirname + 'index.html');
});

const path = require('path');
const express = require('express');

const router = express.Router();
const dashboardDir = path.join(__dirname, '../dashboard');

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(dashboardDir, 'index.html'));
});

router.get('/dashboard/styles.css', (req, res) => {
  res.sendFile(path.join(dashboardDir, 'styles.css'));
});

router.get('/dashboard/app.js', (req, res) => {
  res.sendFile(path.join(dashboardDir, 'app.js'));
});

module.exports = router;

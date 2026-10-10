const path = require('path');
const express = require('express');

const router = express.Router();
const dashboardDir = path.join(__dirname, '../dashboard');
const fishDashboardDir = path.join(__dirname, '../dashboard-fish');
const locationDashboardDir = path.join(__dirname, '../dashboard-location');

router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(dashboardDir, 'index.html'));
});

router.get('/dashboard/styles.css', (req, res) => {
  res.sendFile(path.join(dashboardDir, 'styles.css'));
});

router.get('/dashboard/app.js', (req, res) => {
  res.sendFile(path.join(dashboardDir, 'app.js'));
});

router.get('/dashboard-fish', (req, res) => {
  res.sendFile(path.join(fishDashboardDir, 'index.html'));
});

router.get('/dashboard-fish/styles.css', (req, res) => {
  res.sendFile(path.join(fishDashboardDir, 'styles.css'));
});

router.get('/dashboard-fish/app.js', (req, res) => {
  res.sendFile(path.join(fishDashboardDir, 'app.js'));
});

router.get('/dashboard-fish/src/:file', (req, res) => {
  res.sendFile(path.join(fishDashboardDir, 'src', req.params.file));
});

router.get('/dashboard-location', (req, res) => {
  res.sendFile(path.join(locationDashboardDir, 'index.html'));
});

router.get('/dashboard-location/styles.css', (req, res) => {
  res.sendFile(path.join(locationDashboardDir, 'styles.css'));
});

router.get('/dashboard-location/app.js', (req, res) => {
  res.sendFile(path.join(locationDashboardDir, 'app.js'));
});

router.get('/dashboard-location/src/:file', (req, res) => {
  res.sendFile(path.join(locationDashboardDir, 'src', decodeURIComponent(req.params.file)));
});

module.exports = router;

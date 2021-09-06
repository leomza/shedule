"use strict";

var express = require('express');

var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(express["static"]('public')); //Route (I import the routes of activities)

var activityRoute = require('./routes/routeActivity');

var clientRoute = require('./routes/routeClients');

var projectRoute = require('./routes/routeProjects');

var taskRoute = require('./routes/routeTasks');

var calendarRoute = require('./routes/routeCalendar'); //Use of that Routes that I imported


app.use('/activity', activityRoute);
app.use('/clients', clientRoute);
app.use('/projects', projectRoute);
app.use('/tasks', taskRoute);
app.use('/calendar', calendarRoute);
app.listen(port, function () {
  console.log("Listening on port: ".concat(port));
});
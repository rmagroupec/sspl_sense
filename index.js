const { json } = require('body-parser');
const express = require('express');
const bodyparser = require('body-parser');
const cors =  require('cors');
var app = express();
app.use(cors());

console.log("working project ");

// image
app.use('/farmer-image', express.static('farmer/image'));
//router
const travellingExpanse = require('./src/vendor/travelling_expanse');
const admin = require('./src/vendor/farmerVisit');
const PartyVisit = require('./src/vendor/partyVisit');
const MileageClaim = require('./src/vendor/mileage_claim');

app.use(bodyparser.json());
app.use('/api/v1',admin);
app.use('/api/v1',travellingExpanse);
app.use('/api/v1',PartyVisit);
app.use('api/v1', MileageClaim);
app.listen(3000);
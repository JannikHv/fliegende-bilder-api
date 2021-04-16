require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { getGeoDistance } = require('src/utils');
const { databaseService } = require('src/services');

const {
  PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env;

global.db = require('knex')({
  client: 'mysql',
  connection: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/sights', async (req, res) => {
  const lat = parseFloat(req.query.lat);
  const long = parseFloat(req.query.long);
  const radius = parseFloat(req.query.radius);

  let sights = await databaseService.getSights();

  /** Filter by radius if requested */
  if (lat && long && radius) {
    sights = sights.filter((sight) => getGeoDistance(lat, long, sight.lat, sight.long) <= radius);
  }

  return res.json(sights);
});

app.get('/sights/:id/images', async (req, res) => {
  const { id: sight_id } = req.params;

  const images = await databaseService.getImages({ sight_id });

  return res.json(images);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
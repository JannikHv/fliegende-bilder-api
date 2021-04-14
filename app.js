require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const { getGeoDistance, fetchBase64 } = require('src/utils');

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
  const { lat, long, radius } = req.query;

  let sights = await db
    .select('*')
    .from('sights')
    .catch(() => []);

  /** Filter by radius if requested */
  if (lat && long && radius) {
    sights = sights.filter((sight) => getGeoDistance(lat, long, sight.lat, sight.long) <= radius);
  }

  return res.json(sights);
});

app.get('/sights/:id/images', async (req, res) => {
  const { id } = req.params;

  const images = await db
    .select('*')
    .from('images')
    .where({ sight_id: id })
    .catch(() => []);

  await Promise.all(images.map(async (image) => {
    const base64 = await fetchBase64(image.url).catch(console.error);

    image.base64 = (base64) ? base64.pop() : null;
  }));

  return res.json(images);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
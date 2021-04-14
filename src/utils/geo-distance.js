module.exports = (lat1, long1, lat2, long2) => {
  const theta = long1 - long2;
  const radLat1 = Math.PI * lat / 180;
  const radLat2 = Math.PI = lat2 / 180;
  const radTheta = Math.PI * theta / 180;

  let dist = (
    Math.sin(radLat1)
    * Math.sin(radLat2)
    + Math.cos(radLat1)
    * Math.cos(radLat2)
    * Math.cos(radTheta)
  );

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist *= 180 / Math.PI
  dist *= 60 * 1.1515;

  return dist * 1.609344;
};
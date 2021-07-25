// import request from "request"; NAO FUNCIONA NO NODE APARENTEMENTE
const request = require("request");
const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidmluaWYwMCIsImEiOiJja3JlaWNidW41bmZ3MnZtdHJsYjJqZGE5In0.66Mi4MDTsRi2jvJf5Bq9dQ&limit=1`;
  // o body ali usa sintaxe de destructuring do objeto q retorna do json
  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      cb("Unable to connect to location services!", undefined);
    } else if (features.length === 0) {
      cb("Unnable to find location. Try another search.", undefined);
    } else {
      cb(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geocode;

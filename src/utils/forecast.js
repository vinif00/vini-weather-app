// import request from "request"; NAO FUNCIONA NO NODE APARENTEMENTE
const request = require("request");

const forecast = (long, lat, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=92684a8c34435db82ab535d7cf0fc08d&query=${lat},${long}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb("Could not connect", undefined);
    } else if (body.error) {
      cb("Misspelled bro", undefined);
    } else {
      cb(undefined, {
        visibility: body.current.visibility,
        temperature: body.current.temperature,
        precipitation: body.current.precip,
        feelslike: body.current.feelslike,
        location: body.location.name,
      });
    }
  });
};

module.exports = forecast;

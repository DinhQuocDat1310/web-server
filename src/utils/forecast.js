const request = require("request");

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// const forecast = (latitude, longitude, callback) => {
//   const urlForecast = `http://api.weatherstack.com/current?access_key=ea5459afbbdb86fce068dac9cd59e2b0&query=${latitude},${longitude}&units=f`;
//   request({ url: urlForecast, json: true }, (error, response) => {
//     if (error) {
//       callback("Unable to connect with the networking.", undefined);
//     } else if (response.body.error) {
//       callback("Please request another search.", undefined);
//     } else {
//       const data = response.body;
//       callback(undefined, {
//         temperature: data.current.temperature,
//         feelslike: data.current.feelslike,
//       });
//     }
//   });
// };

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ea5459afbbdb86fce068dac9cd59e2b0&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to networking!", undefined);
    } else if (body.error) {
      callback("Please request another search!", undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;

// const inputLocation = (argv) => {
//   if (argv === "") {
//     return console.log("Input wrong location. Try another one!");
//   }
//   geocode(argv, (error, data) => {
//     if (error) {
//       return console.log(error);
//     }
//     forecast(data.latitude, data.longitude, (forecastError, forecastData) => {
//       console.log("Error", forecastError);
//       console.log(data.location);
//       console.log(
//         "It is currently " +
//           forecastData.temperature +
//           " degrees out. It feel like " +
//           forecastData.feelslike +
//           " degrees out."
//       );
//     });
//   });
// };

// module.exports = {
//   inputLocation: inputLocation,
// };

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
//   return ip;

// });

// fetchCoordsByIP(fetchMyIP(), (error, coords)=> {
//   if(error) {
//     console.log(error);
//     return;
//   }

//   console.log("This is the GeoLocation: ", coords)
//   return coords;
// });

// const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };
// fetchISSFlyOverTimes(exampleCoords, (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }

//   console.log("This is the flyOver times: ", data);
//   return data;
// });
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, flyOver) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(flyOver);
});

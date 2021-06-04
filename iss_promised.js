const request = require('request-promise-native');
//const { nextISSTimesForMyLocation } = require('./iss');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  let latitude = JSON.parse(body).latitude;
  let longitude = JSON.parse(body).longitude;
  return request(`http://api.open-notify.org/iss/v1/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function() {
return fetchMyIP()
.then(fetchCoordsByIP)
.then(fetchISSFlyOverTimes)
.then((data) => {
  const { response } = JSON.parse(data);
  return response;
});
}

module.exports = { nextISSTimesForMyLocation };
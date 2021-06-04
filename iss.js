const request = require('request');
const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(null, ip);
    //console.log(typeof ip);


  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {

      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching GeoLocation. ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    let latitude = data.latitude;
    let longitude = data.longitude;

    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  
  const url = `http://api.open-notify.org/iss/v1/?lat=40.027435&lon=-105.251945`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching. ${body}`;
      callback(Error(msg), null);
      return;
    }
    let flyOver = JSON.parse(body);
    callback(null, flyOver.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if(error){
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if(error){
        callback(error, null);
        return;
      }
     
      fetchISSFlyOverTimes(coords, (error, flyOver) => {
        if(error){
          callback(error, null);
          return;
        }
        callback(null, flyOver);
      })

    })
  })


};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
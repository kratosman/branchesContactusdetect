var spanDistance = document.querySelector('.spanDistance');
var coords = document.querySelector('.coords');
var nearBranch = document.querySelector('.nearBranch');

// a = sin2(dlat/2) + cos(lat1) * cos(lat2) * sin2(dlon/2);
// HAVIRSINES FORMULA 
function calculateDistance(lat1,lat2, lon1, lon2) {
    var R = 1.29;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);

    var a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.tan(Math.sqrt(a), Math.sqrt(1-a));

    var distance = R * c;

    return distance;

}

function deg2rad(deg) {
    return deg * (Math.PI/180); 
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var latitudeDCSA = 14.7051606
        var longtitudeDCSA = 121.0779283;
        var distance = calculateDistance(latitude, latitudeDCSA, longitude, longtitudeDCSA);
        
        spanDistance.innerHTML = distance;        
        coords.innerHTML = `
            Latitude: ${latitude}
            Longitude: ${longitude}
        `;


        var radius = 1;

        if (distance <= radius) {
            nearBranch.innerHTML = "You are near to the fairview branch";
        } else {
            nearBranch.innerHTML = "you are too far";
        }


    //    console.log("from my location to Datamex 1.29 km (4,223.94 ft)");
    })
}

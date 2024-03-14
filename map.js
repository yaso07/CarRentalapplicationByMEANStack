// // Inside the initMap function
 
// var map = new google.maps.Map(document.getElementById("map"), {
//   center: { lat: 37.7749, lng: -122.4194 }, // Default map center
//   zoom: 12, // Adjust the zoom level as needed
// });


// // Set the source and destination
// var directionsService = new google.maps.DirectionsService();
// var directionsDisplay = new google.maps.DirectionsRenderer();
// directionsDisplay.setMap(map);

// var request = {
//   origin: "San Francisco, CA", // Your source address or coordinates
//   destination: "Los Angeles, CA", // Your destination address or coordinates
//   travelMode: "DRIVING", // You can use DRIVING, WALKING, BICYCLING, or TRANSIT
// };

// directionsService.route(request, function (result, status) {
//   if (status === "OK") {
//     directionsDisplay.setDirections(result);
//   }
// });

// // Get the user's current location
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function (position) {
//     var userLocation = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude,
//     };

//     var userMarker = new google.maps.Marker({
//       position: userLocation,
//       map: map,
//       title: "Current Location",
//     });
//   });
// }

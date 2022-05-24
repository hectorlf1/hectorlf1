// Displaying mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiaGVjdG9ybGYxIiwiYSI6ImNsMnhzc21mcTB5bmgzbG12OGE0ZGlqb2MifQ.VVqNVbN7GXKKZEC5Cbnb_Q';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-71.104081,42.365554],
    zoom: 12
});
// running function and getting coordinates
async function run(){
    // get bus data    
	const locations = await getBusLocations();
	// init locationsArr and reset after loop
	locationsArr = [];
	getBusLocations().then(returned => {for (let i = 0; i < returned.length; i++) {
		locationsLongLat = [returned[i].attributes.longitude,returned[i].attributes.latitude]
		locationsArr.push(locationsLongLat);
	}}).then(addBusMarkers);
}
// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}
// Adding markers for buses
function addBusMarkers() {
	currentMarkers = [];
	locationsArr.map((location,index) => {
		let popup = new mapboxgl.Popup()
 		.setText(`Bus # ${index + 1}`)
		.setMaxWidth('min-content')
  		.addTo(map);
		let marker = new mapboxgl.Marker()
		.setLngLat([location[0],location[1]])
		.addTo(map)
		.setPopup(popup)
		currentMarkers.push(marker)
	});
return currentMarkers
}
// Removing previous markers
function clearBusMarkers(){
if (currentMarkers !== null) {
	for (let i = 0; i < currentMarkers.length; i++) {
		currentMarkers[i].remove();
	}
}}
// Refresh bus locations
function refreshBusLocations() {
	clearBusMarkers();
	run();
}
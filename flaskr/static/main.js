
// initialize the map
let map = L.map('mapid').setView([49.28, -122.9], 12);
// load a tile layer
L.tileLayer('http://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
{attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

let myRenderer = L.canvas({padding:0.5});
//random bench info
let randomBench = [49.280084, -122.935067]
let benchPhoto = "<img src = 'https://images.pexels.com/photos/395087/pexels-photo-395087.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=75&w=126'></img>"
let popupContent = L.popup({maxWidth:"auto"}).setContent(`
<p> Burnaby Mountain Bench </p>
<p> Here's the view: ${benchPhoto} </p>
<a href = http://maps.google.com/maps?q=${randomBench[0]},${randomBench[1]}> Visit this place! </a>
`)
//marker for the random bench
L.circleMarker(randomBench, {renderer:myRenderer}).addTo(map).bindPopup(popupContent)

let url = `${document.URL}/benches`
let resp = fetch(url,{mode:'cors'}).then(response => response.json()).then(data => {
    for (let i = 0; i < data.length; i++){
        L.circleMarker([data[i]["lat"],data[i]["long"]]).addTo(map)
        console.log([data[i]["lat"],data[i]["long"]])
    }
})

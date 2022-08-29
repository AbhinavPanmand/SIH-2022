document.addEventListener("DOMContentLoaded", () => {
    let myForm = document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      document.querySelector('#map').scrollIntoView({
        behavior: 'smooth'
      });
      form.reset();
    })
  });
  
  mapboxgl.accessToken = '';
  
  navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
    enableHighAccuracy: true
  })
  
  function successLocation(position) {
    setUpMap([position.coords.longitude, position.coords.latitude]);
    console.log([position.coords.longitude, position.coords.latitude]);
  }
  
  function errorLocation() {
    setUpMap([36.817223, -1.286389])
  }
  
  function setUpMap(center) {
    const map = new mapboxgl.Map({
      container: 'map',
      style: '',
      center: center,
      zoom: 15
    })
  
    //adds direction plugin
    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }),
      'top-left'
    );
  
    const marker = new mapboxgl.Marker({
        color: "#ff0000",
        draggable: true
      }).setLngLat([36.9011852, -1.318583])
      .addTo(map);
  
    //adds zoom and rotate controls
    const navControls = map.addControl(new mapboxgl.NavigationControl());
  }
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
    setUpMap([42.901234, -5.764882])
  }
  
  function setUpMap(center) {
    const map = new mapboxgl.Map({
      container: 'map',
      style: '',
      zoom: 20,
      center: center
    })
  
    map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken
      }),
    );
  
    const marker = new mapboxgl.Marker({
        color: "#ff0000",
        draggable: true
      }).setLngLat([42.901234, -5.764882])
      .addTo(map);

    const navControls = map.addControl(new mapboxgl.NavigationControl());
  }
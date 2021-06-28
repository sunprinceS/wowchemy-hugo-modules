/*************************************************
 *  Wowchemy
 *  https://github.com/wowchemy/wowchemy-hugo-themes
 *
 *  Wowchemy Maps
 **************************************************/

// Initialize Google Maps or OpenStreetMap via Leaflet.
function initMap() {
  if ($('#map').length) {
    let map_provider = $('#map-provider').val();
    let init_lat = $('#map-init-lat').val();
    let init_lng = $('#map-init-lng').val();
    let zoom = parseInt($('#map-zoom').val());
    let address = $('#map-dir').val();
    let api_key = $('#map-api-key').val();
    let num_markers = parseInt($('#map-num-markers').val());
    let popup_options = {
      'className': 'custom-map'
    };
    let popup_template = "<img class = 'bg' src='{IMG}' alt='Featured Photo' /><h5 class='title'>{TITLE}</h5>  <p >{DESC}</p> <span class='fas fa-calendar-alt date'> {DATE}</span>";

    if (map_provider === 'google') {
      let map = new GMaps({
        div: '#map',
        lat: lat,
        lng: lng,
        zoom: zoom,
        zoomControl: true,
        zoomControlOpt: {
          style: 'SMALL',
          position: 'TOP_LEFT',
        },
        streetViewControl: false,
        mapTypeControl: false,
        gestureHandling: 'cooperative',
      });

      map.addMarker({
        lat: lat,
        lng: lng,
        click: function () {
          let url = 'https://www.google.com/maps/place/' + encodeURIComponent(address) + '/@' + lat + ',' + lng + '/';
          window.open(url, '_blank');
        },
        title: address,
      });
    } else {
      let map = new L.map('map', { "tap": false }).setView([init_lat, init_lng], zoom);
      if (map_provider === 'mapbox' && api_key.length) {
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
          attribution:
            'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
          id: 'mapbox/streets-v11',
          accessToken: api_key,
        }).addTo(map);
      } else {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);
      }
      let markers = L.markerClusterGroup();
      for (let idx = 0; idx < num_markers; idx++) {
        let lat = $('#marker' + idx + '-lat').val();
        let lng = $('#marker' + idx + '-lng').val();
        let title = $('#marker' + idx + '-title').val();
        let img = $('#marker' + idx + '-img').val();
        let date = $('#marker' + idx + '-date').val();
        let desc = $('#marker' + idx + '-desc').val() || "";
        let content = popup_template.replace("{TITLE}", title).replace("{IMG}", img).replace("{DESC}", desc).replace("{DATE}", date);
        markers.addLayer(L.marker([lat, lng]).bindPopup(content, popup_options));
      }
      map.addLayer(markers);
      /*
      let marker = L.marker([lat, lng]).addTo(map);
      let url = lat + ',' + lng + '#map=' + zoom + '/' + lat + '/' + lng + '&layers=N';
      marker.bindPopup(
        address +
          '<p><a href="https://www.openstreetmap.org/directions?engine=osrm_car&route=' +
          url +
          '">Routing via OpenStreetMap</a></p>',
      );
      */
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialise street maps if necessary.
  initMap();
});

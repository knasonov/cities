const map = L.map('map').setView([60, 90], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// guess possible coordinate column names
const latKeys = ['lat', 'latitude', 'y', 'geo_lat'];
const lonKeys = ['lon', 'lng', 'longitude', 'x', 'geo_lon'];

function findCoord(row, keys) {
  for (const k of keys) {
    if (row[k]) return parseFloat(row[k]);
  }
  return undefined;
}

function rowToTooltip(row) {
  const region = row.region || '';
  const city = row.city || '';
  const pop = row.population || '';
  return `<strong>region</strong>: ${region}<br/>` +
         `<strong>city</strong>: ${city}<br/>` +
         `<strong>population</strong>: ${pop}`;
}

const entries = [];

function applyFilter() {
  const minVal = parseInt(document.getElementById('min-pop').value) || 0;
  const maxInput = document.getElementById('max-pop').value;
  const maxVal = maxInput === '' ? Infinity : parseInt(maxInput);
  entries.forEach(e => {
    const pop = parseInt(e.row.population) || 0;
    if (pop >= minVal && pop <= maxVal) {
      if (!map.hasLayer(e.marker)) {
        e.marker.addTo(map);
      }
    } else {
      if (map.hasLayer(e.marker)) {
        map.removeLayer(e.marker);
      }
    }
  });
}

d3.csv('city.csv').then(data => {
  data.forEach(row => {
    const lat = findCoord(row, latKeys);
    const lon = findCoord(row, lonKeys);
    if (!isNaN(lat) && !isNaN(lon)) {
      const marker = L.circleMarker([lat, lon], {
        radius: 4,
        color: 'blue',
        fillColor: 'blue',
        fillOpacity: 0.7
      });
      marker.bindTooltip(rowToTooltip(row), {direction: 'top', sticky: true});
      entries.push({marker, row});
    }
  });
  applyFilter();
  document.getElementById('min-pop').addEventListener('input', applyFilter);
  document.getElementById('max-pop').addEventListener('input', applyFilter);
});

const map = L.map('map').setView([60, 90], 3);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// guess possible coordinate column names
const latKeys = ['lat', 'latitude', 'y'];
const lonKeys = ['lon', 'lng', 'longitude', 'x'];

function findCoord(row, keys) {
  for (const k of keys) {
    if (row[k]) return parseFloat(row[k]);
  }
  return undefined;
}

function rowToTooltip(row) {
  return Object.entries(row)
    .map(([k, v]) => `<strong>${k}</strong>: ${v}`)
    .join('<br/>');
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
      }).addTo(map);
      marker.bindTooltip(rowToTooltip(row), {direction: 'top', sticky: true});
    }
  });
});

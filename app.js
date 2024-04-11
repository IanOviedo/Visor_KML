// Crear el mapa
var map = L.map('map').setView([0, 0], 2); // Vista inicial

// Agregar la capa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Cargar el archivo KML y centrar el mapa en la ubicación del KML
omnivore.kml('Mapa.kml')
    .on('ready', function() {
        // Obtener los límites del KML
        var bounds = this.getBounds();

        // Centrar el mapa en los límites del KML
        map.fitBounds(bounds);
    })
    .on('click', function(event) {
        // Obtener la información del polígono
        var properties = event.layer.feature.properties;

        // Filtrar los campos que no tengan el valor 0 ni '0.0'
        var filteredProperties = {};
        for (var key in properties) {
            if (properties.hasOwnProperty(key) && properties[key] !== 0 && properties[key] !== '0.0') {
                filteredProperties[key] = properties[key];
            }
        }

        // Construir el contenido HTML con la información del polígono
        var popupContent = '<div>';
        for (var key in filteredProperties) {
            if (filteredProperties.hasOwnProperty(key)) {
                popupContent += '<strong>' + key + ':</strong> ' + filteredProperties[key] + '<br>';
            }
        }
        popupContent += '</div>';

        // Mostrar la información del polígono en un popup
        event.layer.bindPopup(popupContent).openPopup();
    })
    .addTo(map);

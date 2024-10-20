function startMap() {

    var hasMap = document.querySelector('#map');
    if (hasMap) {
        var mapContacts;
        ymaps.ready(init);
        function init() {
            mapContacts = new ymaps.Map('map', {
                center: [59.936423, 30.263722],
                zoom: 9,
                controls: ['zoomControl'] // Отключаем все элементы управления
            });

            var objectsMapContacts = new ymaps.ObjectManager();

            objectsMapContacts.objects.options.set('iconLayout', 'default#image');
            objectsMapContacts.objects.options.set('iconImageHref', 'images/icons/Map_marker.svg');
            objectsMapContacts.objects.options.set('iconImageSize', [36, 36]);
            objectsMapContacts.objects.options.set('iconImageOffset', [-18, -18]);
            objectsMapContacts.objects.options.set('hideIconOnBalloonOpen', false);

            mapContacts.geoObjects.add(objectsMapContacts);
            objectsMapContacts.add(listObjectsMapContacts);

            mapContacts.behaviors.disable('scrollZoom'); //запрет прокрутки по скроллу        
        }

        var listObjectsMapContacts = {
            "type": "FeatureCollection",
            "features": [
                { "type": "Feature", "id": 0, "geometry": { "type": "Point", "coordinates": [59.808432, 30.164493] }, "properties": { "balloonContentHeader": "<b>Таллинский</b>", "balloonContentBody": "<h4>Таллинское шоссе, д. 157, лит. А</h4>" } },
                { "type": "Feature", "id": 1, "geometry": { "type": "Point", "coordinates": [59.810464, 30.317988] }, "properties": { "balloonContentHeader": "<b>Пулково</b>", "balloonContentBody": "<h4>Стартовая ул., 5А</h4>" } },
                { "type": "Feature", "id": 2, "geometry": { "type": "Point", "coordinates": [59.997149, 30.248971] }, "properties": { "balloonContentHeader": "<b>Лахта</b>", "balloonContentBody": "<h4>ул. Оптиков, 3А</h4>" } },
                { "type": "Feature", "id": 3, "geometry": { "type": "Point", "coordinates": [60.094053, 30.254423] }, "properties": { "balloonContentHeader": "<b>Выборгский</b>", "balloonContentBody": "<h4>Выборгское шоссе, 352A</h4>" } }
            ]
        };
    }
    
}
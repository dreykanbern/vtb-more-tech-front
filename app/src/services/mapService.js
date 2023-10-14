import axios from 'axios';

export default {
    async findPoints(store) {
        const { latitude, longitude, radius } = store.location;
        const type = store.type;
        const response = await axios.post('https://api.vtb-light-fire.ru/Points/FindPoints', {
            latitude,
            longitude,
            radius,
            parameters: {
                type,
                sericeIds: []
            }
        });
        console.log(response.data)
        return response.data; // возвращаем весь ответ
    },

    addPointsToMap(map, data) {
        // Обрабатываем каждый массив в данных
        Object.values(data).forEach(points => {
            points.forEach(point => {
                var myGeoObject = new ymaps.GeoObject({
                    geometry: {
                        type: "Point",
                        coordinates: [point.latitude, point.longitude]
                    },
                    properties: {
                        hintContent: point.name,
                        balloonContentHeader: point.name,
                        balloonContentBody: point.address
                    }
                }, {
                    preset: "islands#redDotIcon",
                    draggable: true
                });

                map.geoObjects.add(myGeoObject);
            });
        });
    }
};
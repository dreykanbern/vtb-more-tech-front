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
        // Проверяем, определены ли данные
        if (!data) {
            console.error(`Data is undefined or null: ${data}`);
            return;
        }

        // Обрабатываем каждый массив в данных
        Object.entries(data).forEach(([key, points]) => {
            // Если массив не пустой, обрабатываем его точки
            if (points.length > 0) {
                points.forEach(point => {
                    // Если поле name отсутствует, используем стандартное значение
                    let name = point.name;
                    if (!name) {
                        name = (key === 'atms') ? 'Банкомат ВТБ' : 'Отделение ВТБ';
                    }

                    var myGeoObject = new ymaps.GeoObject({
                        geometry: {
                            type: "Point",
                            coordinates: [point.latitude, point.longitude]
                        },
                        properties: {
                            hintContent: name,
                            balloonContentHeader: name,
                            balloonContentBody: point.address
                        }
                    }, {
                        preset: "islands#redDotIcon",
                        draggable: true
                    });

                    map.geoObjects.add(myGeoObject);
                });
            }
        });
    }
};
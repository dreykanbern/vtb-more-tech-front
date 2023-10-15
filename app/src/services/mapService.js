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

    convertPointsToFeatures(data) {
        const features = [];

        // Обрабатываем каждый массив в данных
        Object.entries(data).forEach(([key, points]) => {
            // Если массив не пустой, обрабатываем его точки
            if (points.length > 0) {
                points.forEach((point, index) => {
                    // Если поле name отсутствует, используем стандартное значение
                    let name = point.name;
                    if (!name) {
                        name = (key === 'atms') ? 'Банкомат ВТБ' : 'Отделение ВТБ';
                    }

                    features.push({
                        type: 'Feature',
                        id: index,
                        geometry: {
                            type: 'Point',
                            coordinates: [point.latitude, point.longitude]
                        },
                        properties: {
                            hintContent: name,
                            balloonContentHeader: name,
                            balloonContentBody: point.address
                        }
                    });
                });
            }
        });

        return features;
    }
};
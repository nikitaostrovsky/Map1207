var targetCoords;

ymaps.ready(function () {

    // Координаты, к которым будем строить маршруты.
    // Укажите здесь, к примеру, координаты вашего офиса.
	targetCoords = [50.765605, 37.685284]; 	//Бомонка
	
	navigator.geolocation.watchPosition(createRoute, function () {alert('Ошибка при определении координат устройства!');});

    function clearSourcePoint () {
        if (sourcePoint) {
            myMap.geoObjects.remove(sourcePoint);
            sourcePoint = null;
        }
    }

    function clearRoute () {
        myMap.geoObjects.remove(currentRoute);
        currentRoute = currentRoutingMode = null;
    }
    
    function createRoute (position) {
		window.targetCoords = [position.coords.latitude, position.coords.longitude];
		
		var fromCoords = [55.751374, 37.618826];	//Кремль
		
	// Инициализируем карту.
    var myMap = new ymaps.Map('map', {
            center: window.targetCoords,
            zoom: 11,
            controls: []
        }, {
            // Ограничиваем количество результатов поиска.
            searchControlResults: 1,

            // Отменяем автоцентрирование к найденным адресам.
            searchControlNoCentering: true,

            // Разрешаем кнопкам нужную длину.
            buttonMaxWidth: 150
        }),

    // Метка для конечной точки маршрута.
        targetPoint = new ymaps.Placemark(window.targetCoords, { iconContent: 'Target point' }, { preset: 'islands#redStretchyIcon' }),

    // Получаем ссылки на нужные элементы управления.
        searchControl = myMap.controls.get('searchControl'),								
        geolocationControl = myMap.controls.get('geolocationControl'),

    // Метка для начальной точки маршрута.
        sourcePoint = new ymaps.Placemark(fromCoords, { iconContent: 'SourcePoint' }, { preset: 'islands#redStretchyIcon' }),

    // Переменные, в которых будут храниться ссылки на текущий маршрут.
        currentRoute;

    // Добавляем конечную и начальную точки на карту. 									//вывод шариков на карту
    myMap.geoObjects.add(targetPoint);
    //myMap.geoObjects.add(sourcePoint);


    // Создаём маршрут нужного типа из начальной в конечную точку.
    currentRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [sourcePoint, targetPoint],
        params: { routingMode: 'auto'}
    }, {
        boundsAutoApply: true
    });

    // Добавляем маршрут на карту.
    myMap.geoObjects.add(currentRoute);
    //alert(currentRoute.properties.getPropertyValue("duration"));
    alert(currentRoute.properties.get("type"));
    }
});

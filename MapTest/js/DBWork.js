window.onload = function () {
	
	var baseName = "AlarmDB";
	var storeName = "AlarmsTable";
	var db = openDatabase(baseName, '1.0', 'AlarmDatabase', 2*1024*1024);
	if (!db) {
		alert("Ошибка при подключении к БД!");
	}
	db.transaction(function (tx) {
		tx.executeSql('CREATE TABLE IF NOT EXIST ' + storeName + ' (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, task BOOLEAN, geo BOOLEAN)', [], null, onError);
		
		tx.executeSql('INSERT INTO ' + storeName + '(date, task, geo) VALUES (?,?,?)', [new Date(), true, false], null, onError);
	});
	
	
	function onError(e) {
		alert("Ошибка при работе с таблицей: " + e.message);
	}

};

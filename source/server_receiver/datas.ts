//импорт базы данных
import { DBase, getDB } from "../config/xcore/dbase/DBase"
import { time_to_datetime, dateTimeToSQL } from "../config/xcore/dbase/DateStr"

export class ServerData {

    data_str: string;
    s_ind: number;
    data_arr: Array<string>;
    db: DBase;

    check: boolean;

    constructor(_data_str: string, _s_ind: number) {
        this.data_str = _data_str;
        this.s_ind = _s_ind;
        this.data_arr = [];
        this.db = getDB();
    }

    async Run() {

        //console.log("IM HERE")
        try {
            console.log(this.s_ind, "\x1b[0m >> " + this.data_str);
            //разбираем строку формата csv
            var dt_arr_0 = this.data_str.split(",");
          
            for (var d in dt_arr_0) {
                if (dt_arr_0[d].trim() != '') {
                    this.data_arr.push(dt_arr_0[d].trim());
                }
            }
            

            //Ошибка данных для парсера
            if (this.data_arr.length <= 2) {
                console.log(this.s_ind, "\x1b[31m >>", this.data_str);
                return;
            }

            //Парсер данных 
            //time 
            var TIME = time_to_datetime(this.data_arr[1]);
            this.data_arr[0] = "-";
            this.data_arr[1] = "-";

            //number 
            var NUMBER = null;
            var NUMBER_I = this.data_arr.indexOf("Number");
            this.data_arr[NUMBER_I] = "-";
            if (NUMBER_I > 0) {
                NUMBER = (this.data_arr[NUMBER_I + 1]).trim();
            }
            this.data_arr[NUMBER_I + 1] = "-";

            //akb 
            var AKB = null;
            var AKB_I = this.data_arr.indexOf("AKB");
            this.data_arr[AKB_I] = "-";
            if (AKB_I > 0) {
                AKB = (this.data_arr[AKB_I + 1]).trim();
            }
            this.data_arr[AKB_I + 1] = "-";

            //sensors
            var SENSORS = [];
            var SENSORS_I = this.data_arr.indexOf("Sensors");
            this.data_arr[SENSORS_I] = "-";
            if (SENSORS_I > 0) {
                for (var d in this.data_arr) {
                    if (this.data_arr[d].trim() !== '-' && !isNaN(Number(this.data_arr[d].trim()))) { SENSORS.push(Number(this.data_arr[d].trim())); }
                    else { if (this.data_arr[d].trim() !== '-') SENSORS.push("---"); }
                }
            }

            /*console.log(" ВРЕМЯ ", TIME);
            console.log(" НОМЕР УСТРОЙСТВА ",NUMBER);
            console.log(" ЗАРЯД УСТРОЙСТВА " ,AKB);
            console.log("Данные с сенсеров ", SENSORS);*/

            //ошибки парсера данных 
            var errors = false;
            var info_err = "";
            if (TIME == null) {
                info_err += "ВРЕМЯ НЕ СООТВЕТСВУЕТ ФОРМАТУ ";
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str  + "', 'ВРЕМЯ НЕ СООТВЕТСВУЕТ ФОРМАТУ ')");
                errors = true;
            }
            if (NUMBER == null) {
                info_err += "ДАННОГО УСТРОЙСТВА НЕТ В БАЗЕ ДАННЫХ ";
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str  + "', 'ДАННОГО УСТРОЙСТВА НЕТ В БАЗЕ ДАННЫХ ')");
                errors = true;
            }
            if (AKB == null) {
                info_err += "УРОВЕНЬ ЗАРЯДА НЕ СООТВЕТСТВУЕТ ФОРМАТУ ИЛИ ОТСУТСТВУЕТ "
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str  + "', 'УРОВЕНЬ ЗАРЯДА НЕ СООТВЕТСТВУЕТ ФОРМАТУ ИЛИ ОТСУТСТВУЕТ ')");
                errors = true;
            }
            if (SENSORS.length < 1) {
                info_err += "ДАННЫХ ПО СЕНСЕРАМ НА УСТРОЙСТВЕ НЕТ "
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str  + "', 'ДАННЫХ ПО СЕНСЕРАМ НА УСТРОЙСТВЕ НЕТ ')");
                errors = true;
            }
            if (SENSORS.indexOf("---") >= 0) {
                info_err += "ОШИБКА ДАННЫХ НА СЕНСОРАХ (ПРОВЕРЬТЕ КАК ПЕРЕДАЕТ УСТРОЙСТВО); ";
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str  + "', 'ОШИБКА ДАННЫХ НА СЕНСОРАХ (ПРОВЕРЬТЕ КАК ПЕРЕДАЕТ УСТРОЙСТВО); ')");
                errors = true;
            }
            if (NUMBER == "1111") {
                info_err += "УСТРОЙСТВО РАБОТАЕТ НЕ ИСПРАВНО "
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str  + "', 'УСТРОЙСТВО РАБОТАЕТ НЕ ИСПРАВНО ')");
                errors = true;
            }
            if (errors) {
                console.log(this.s_ind, "\x1b[35m", this.data_str, info_err);
                return;
            }

            //Сохранение в базу данных
            await this.saveSqlData(TIME, NUMBER, SENSORS, AKB, this.data_str);
        }
        catch
        { 
            info_err += "ПРОИЗОШЛА ФАТАЛЬНАЯ ОШИБКА"
        }



    }

    async saveSqlData(time: string, number: string, sensors: (string | number)[], akb: string, data_str: string) {

        try{
        var errors = false;
        var err_info = '';
        //получаем устройства для проверки с полученными данными 
        //var query_devs = await this.pg_pool.Query({text:"SELECT * FROM devs WHERE number = $1", values: [number]});
        var query_devs = await this.db.query("SELECT * FROM devs WHERE number = '" + number + "'");


        //Если устройство отсутствует в базе данных
        if (query_devs.rows.length === 0) {
            console.log("ДАННОЕ УСТРОЙСТВО ОТСУТСВУЕТ В БАЗЕ ДАННЫХ");
            await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + data_str + "', 'ДАННОЕ УСТРОЙСТВО ОТСУТСВУЕТ В БАЗЕ ДАННЫХ')");
            errors = true;
        }


        //  console.log("Сенсеров в бд", query_devs[0].sensors["s"].length);
        //если устройство есть в бд
        if (errors === false) {

            //console.log(query_devs[0].sensors["s"].length," ", sensors.length);

            //Если количество переданных данных больше чем в базе данных
            if (query_devs.rows[0].sensors["s"].length < sensors.length) {
                // console.log("ПРИНЯТО БОЛЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ(ВОЗМОЖНА ПОТЕРЯ ДАННЫХ)");
                err_info = "ПРИНЯТО БОЛЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ(ВОЗМОЖНА ПОТЕРЯ ДАННЫХ)";
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + data_str + "', 'ПРИНЯТО БОЛЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ(ВОЗМОЖНА ПОТЕРЯ ДАННЫХ)')");
                errors = true;
            }
            //Если количество переданных данных меньше чем в базе данных
            if (query_devs.rows[0].sensors["s"].length > sensors.length) {
                //console.log("ПРИНЯТО МЕНЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ");
                err_info = "ПРИНЯТО МЕНЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ";
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + data_str + "', 'ПРИНЯТО МЕНЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ')");
                errors = true;
            }

            if (errors) {
                console.log(err_info);
                console.log("\x1b[33m", data_str, err_info);
            }

            //время сервера
            //var srv_time = new Date().getFullYear() +"-"+ new Date().getMonth() +"-"+ new Date().getDate()+" "+new Date().getHours() + ":" + new Date().getMinutes() +":"+ new Date().getSeconds();

            var srv_time = dateTimeToSQL(new Date(Date.now()));

            //json для глубины и данных 
            var obj = query_devs.rows[0].sensors["s"];

            //console.log("ДАТЧИКОВ", obj.length);


            //создание json с глубиной и данными по сенсерам
            var s = '{"s":[';
            for (var i = 0; i < obj.length; i++) {
                if (i !== obj.length - 1) {
                    if (sensors.length > i) { s += '{"depth":"' + obj[i].depth + '", "data":"' + sensors[i] + '"},' }
                    else { s += '{"depth":"' + obj[i].depth + '", "data":"0.0"},' }
                }
                else {
                    if (sensors.length > i) { s += '{"depth":"' + obj[i].depth + '", "data":"' + sensors[i] + '"}' }
                    else { s += '{"depth":"' + obj[i].depth + '", "data":"0.0"}' }
                }
            }
            s += ']}';

            //console.log("JSON TO SQL ", s);
            //сохранение сессии в бд

            var sess_data_sql = await this.db.query("INSERT INTO dev_sess (time_dev, time_srv, dev_number, dev_id, level_akb, sess_data) VALUES ('" + time + "', '" + srv_time + "', '" + query_devs.rows[0].number + "', " + query_devs.rows[0].id + ", " + akb + ", '" + s + "') RETURNING id");

            //console.log(sess_data_sql.rows);

            if (sess_data_sql.rows[0].id === 0 || sess_data_sql === null || sess_data_sql === undefined) {
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + data_str + "', 'НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ')");
                console.log("\x1b[33m", data_str, 'НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ');
            }

            console.log("\x1b[32m ДАННЫЕ УСПЕШНО ЗАПИСАНЫ")
        }
    }
    catch{console.log("\x1b[31m	ПРОИЗОШЛА ФАТАЛЬНАЯ ОШИБКА ПРИ ЗАПИСИ ДАННЫХ В БД СТАРОЙ ПРОШИВКИ")}

    }


}
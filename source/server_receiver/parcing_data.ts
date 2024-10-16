import { DBase, getDB } from "../config/xcore/dbase/DBase"
import { time_to_datetime, dateTimeToSQL } from "../config/xcore/dbase/DateStr"

import * as fs from 'fs';
import * as path from 'path';

export class ParcingData {


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
        try {
            console.log("Парсинг данных старой прошивки");
            var logsPath = path.join(__dirname, '..', '..', 'logs');
            //месяц + 1  тк начало начинается с 0
            var month = new Date().getMonth() + 1;
            //Название файла лога 
            var fileName = 'log ' + new Date().getFullYear() + '.' + month + '.' + new Date().getDate() + '.txt';
            //Время записи лога 
            var time_log = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + '| ';



            //Разбор строки формата csv 
            var dt_arr_0 = this.data_str.split(",");

            //Убирание пустых значений
            for (var d in dt_arr_0) {
                if (dt_arr_0[d].trim() !== '') { this.data_arr.push(dt_arr_0[d].trim()); }
            }

            //В случае если данных менее чем 2 шт 
            if (this.data_arr.length <= 2) {
                console.log("\x1b[33m" + this.s_ind, "\x1b[31m >>", this.data_str, "Ошибка в данных для парсера");
                return;
            }

            //Парсер данных
            //Время
            var TIME = time_to_datetime(this.data_arr[1]);
            this.data_arr[0] = "-";
            this.data_arr[1] = "-";

            //Номер косы
            var NUMBER = null;
            var NUMBER_I = this.data_arr.indexOf("Number");
            this.data_arr[NUMBER_I] = "-";
            if (NUMBER_I > 0) {
                NUMBER = (this.data_arr[NUMBER_I + 1]).trim();
            }
            this.data_arr[NUMBER_I + 1] = "-";

            //Заряд аккумулятора 
            var AKB = null;
            var AKB_I = this.data_arr.indexOf("AKB");
            this.data_arr[AKB_I] = "-";
            if (AKB_I > 0) {
                AKB = (this.data_arr[AKB_I + 1]).trim();
            }
            this.data_arr[AKB_I + 1] = "-";

            //Температура с датчиков
            var SENSORS = [];
            var SENSORS_I = this.data_arr.indexOf("Sensors");
            this.data_arr[SENSORS_I] = "-";
            if (SENSORS_I > 0) {
                for (var d in this.data_arr) {
                    if (this.data_arr[d].trim() !== '-' && !isNaN(Number(this.data_arr[d].trim()))) { SENSORS.push(Number(this.data_arr[d].trim())); }
                    else { if (this.data_arr[d].trim() !== '-') SENSORS.push("---"); }
                }
            }


            // console.log(" ВРЕМЯ ", TIME);
            // console.log(" НОМЕР УСТРОЙСТВА ",NUMBER);
            // console.log(" ЗАРЯД УСТРОЙСТВА " ,AKB);
            // console.log(" ДАННЫЕ С СЕНСЕРОВ ", SENSORS.length);


            //Проверка на ошибки в парсинге 
            var error = false;
            var info_err = "";
            if (TIME == null) {
                info_err += "ВРЕМЯ НЕ СООТВЕТСВУЕТ ФОРМАТУ; ";
                error = true;
            }
            if (NUMBER == null) {
                info_err += "ОШИБКА В ПАРСИНГЕ ОТСТВУЕТ УСТРОЙСТВО; ";
                error = true;
            }
            if (AKB == null) {
                info_err += "ОШИБКА В ПАРСИНГЕ УРОВЕНЬ ЗАРЯДА НЕ СООТВЕТСТВУЕТ ФОРМАТУ ИЛИ ОТСУТСТВУЕТ; "
                error = true;
            }
            if (SENSORS.length < 1) {
                info_err += "ОШИБКА В ПАРСИНГЕ ДАННЫХ ПО СЕНСЕРАМ НА УСТРОЙСТВЕ НЕТ; "
                error = true;
            }
            if (SENSORS.indexOf("---") >= 0) {
                info_err += "ОШИБКА В ПАРСИНГЕ ОШИБКА ДАННЫХ НА СЕНСОРАХ (ПРОВЕРЬТЕ КАК ПЕРЕДАЕТ УСТРОЙСТВО); ";
                error = true;
            }
            if (NUMBER == "1111") {
                info_err += "УСТРОЙСТВО РАБОТАЕТ НЕ ИСПРАВНО; "
                error = true;
            }

            //Если есть ошибка в парсинге записываем в логи
            if (error === true) {
                console.log("\x1b[33m" + this.s_ind + "  - \x1b[31m" + info_err + "\x1b[37m");
                await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', '" + info_err + " ')");
                //Запись логов в файл 
                fs.appendFile(path.join(logsPath, fileName), time_log + this.data_str + "|" + info_err + '\n', 'utf-8', function (err) { });
                fs.appendFile(path.join(logsPath, fileName), '________________________________________________________________________________\n', 'utf-8', function (err) { });


            }
            //Если ошибки нет 
            else {

                //Делаем запрос в БД для проверки на наличие устройства
                var query_devs = await this.db.query("SELECT * FROM devs WHERE number = '" + NUMBER + "'");
                //Если устройство отсутствует в базе данных
                if (query_devs.rows.length === 0) {
                    info_err += "ОШИБКА ПРИ ЗАПИСИ ДАННЫХ ДАННОГО УСТРОЙСТВА НЕТ В БАЗЕ ДАННЫХ;";
                    error = true;
                }

                //Если устройство отсутствует записываем в логи
                if (error === true) {
                    console.log("\x1b[33m" + this.s_ind + "  - \x1b[31m" + info_err + "\x1b[37m");
                    await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', '" + info_err + " ')");
                    //Запись логов в файл 
                    fs.appendFile(path.join(logsPath, fileName), time_log + this.data_str + "|" + info_err + '\n', 'utf-8', function (err) { });
                    fs.appendFile(path.join(logsPath, fileName), '________________________________________________________________________________\n', 'utf-8', function (err) { });
                }
                //Если устройство есть то идем дальше 
                else {
                    //Если количество переданных данных больше чем в базе данных
                    if (query_devs.rows[0].sensors["s"].length < SENSORS.length) {
                        info_err += "ВНИМАНИЕ ПРИНЯТО БОЛЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ(ВОЗМОЖНА ПОТЕРЯ ДАННЫХ)";
                        error = true;
                    }
                    //Если количество переданных данных меньше чем в базе данных
                    if (query_devs.rows[0].sensors["s"].length > SENSORS.length) {
                        info_err += "ВНИМАНИЕ ПРИНЯТО МЕНЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ";
                        error = true;
                    }
                    //Если есть отличие в датчиках выводим информацию без записи в логи
                    if (error === true) {
                        console.log("\x1b[33m" + this.s_ind + "  - \x1b[33m" + this.data_str, info_err);
                    }

                    //время сервера
                    var srv_time = dateTimeToSQL(new Date(Date.now()));

                    //json для глубины и данных 
                    var obj = query_devs.rows[0].sensors["s"];

                    //Создание JSON с глубиной и данными по сенсерам
                    var s = '{"s":[';
                    for (var i = 0; i < obj.length; i++) {
                        if (i !== obj.length - 1) {
                            if (SENSORS.length > i) { s += '{"depth":"' + obj[i].depth + '", "data":"' + SENSORS[i] + '"},' }
                            else { s += '{"depth":"' + obj[i].depth + '", "data":"0.0"},' }
                        }
                        else {
                            if (SENSORS.length > i) { s += '{"depth":"' + obj[i].depth + '", "data":"' + SENSORS[i] + '"}' }
                            else { s += '{"depth":"' + obj[i].depth + '", "data":"0.0"}' }
                        }
                    }
                    s += ']}';


                    //Делаем запись по сессии в базу данных с возвращением id для проверки
                    var sess_data_sql = await this.db.query("INSERT INTO dev_sess (time_dev, time_srv, dev_number, dev_id, level_akb, sess_data) VALUES ('" +
                        TIME + "', '" + srv_time + "', '" + query_devs.rows[0].number + "', " + query_devs.rows[0].id + ", " + AKB + ", '" + s + "') RETURNING id");

                    //Если не записалось 
                    if (sess_data_sql.rows[0].id === 0 || sess_data_sql === null || sess_data_sql === undefined) {
                        await this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + this.data_str + "', 'ВНИМАНИЕ ОШИБКА В ЗАПИСИ ДАННЫХ В БАЗУ ДАННЫХ НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ')");
                        console.log("\x1b[33m" + this.s_ind + "  - \x1b[33m", this.data_str, 'ВНИМАНИЕ НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ');
                    }
                    else { console.log("\x1b[33m" + this.s_ind + "  -\x1b[32m ДАННЫЕ УСПЕШНО ЗАПИСАНЫ"); }
                }

            }
            return;

        } catch {
            console.log("\x1b[33m" + this.s_ind + "  - ПРОИЗОШЛА ФАТАЛЬНАЯ ОШИБКА ПАРСИНГА ДАННЫХ ИЛИ ЗАПИСИ В БД");

        }


    }

}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerData_Error = void 0;
var DBase_1 = require("../config/xcore/dbase/DBase");
var DateStr_1 = require("../config/xcore/dbase/DateStr");
var ServerData_Error = (function () {
    function ServerData_Error(_data_str, _s_ind) {
        this.data_str = _data_str;
        this.s_ind = _s_ind;
        this.data_arr = [];
        this.db = (0, DBase_1.getDB)();
    }
    ServerData_Error.prototype.Run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dt_arr_0, d, TIME, NUMBER, NUMBER_I, AKB, AKB_I, ERROR, ERROR_I, SENSORS, SENSORS_I, d, errors, info_err, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 16, , 17]);
                        console.log(this.s_ind, "\x1b[0m >> " + this.data_str);
                        dt_arr_0 = this.data_str.split(",");
                        for (d in dt_arr_0) {
                            if (dt_arr_0[d].trim() != '') {
                                this.data_arr.push(dt_arr_0[d].trim());
                            }
                        }
                        if (this.data_arr.length <= 2) {
                            console.log(this.s_ind, "\x1b[31m >>", this.data_str);
                            return [2];
                        }
                        TIME = (0, DateStr_1.time_to_datetime)(this.data_arr[1]);
                        this.data_arr[0] = "-";
                        this.data_arr[1] = "-";
                        NUMBER = null;
                        NUMBER_I = this.data_arr.indexOf("Number");
                        this.data_arr[NUMBER_I] = "-";
                        if (NUMBER_I > 0) {
                            NUMBER = (this.data_arr[NUMBER_I + 1]).trim();
                        }
                        this.data_arr[NUMBER_I + 1] = "-";
                        AKB = null;
                        AKB_I = this.data_arr.indexOf("AKB");
                        this.data_arr[AKB_I] = "-";
                        if (AKB_I > 0) {
                            AKB = (this.data_arr[AKB_I + 1]).trim();
                        }
                        this.data_arr[AKB_I + 1] = "-";
                        ERROR = null;
                        ERROR_I = this.data_arr.indexOf("Error");
                        this.data_arr[ERROR_I] = "-";
                        if (ERROR_I > 0) {
                            ERROR = (this.data_arr[ERROR_I + 1]).trim();
                        }
                        this.data_arr[ERROR_I + 1] = "-";
                        SENSORS = [];
                        SENSORS_I = this.data_arr.indexOf("Sensors");
                        this.data_arr[SENSORS_I] = "-";
                        if (SENSORS_I > 0) {
                            for (d in this.data_arr) {
                                if (this.data_arr[d].trim() !== '-' && !isNaN(Number(this.data_arr[d].trim()))) {
                                    SENSORS.push(Number(this.data_arr[d].trim()));
                                }
                                else {
                                    if (this.data_arr[d].trim() !== '-')
                                        SENSORS.push("---");
                                }
                            }
                        }
                        errors = false;
                        info_err = "";
                        if (!(TIME == null)) return [3, 2];
                        info_err += "ВРЕМЯ НЕ СООТВЕТСВУЕТ ФОРМАТУ ";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', 'ВРЕМЯ НЕ СООТВЕТСВУЕТ ФОРМАТУ ')")];
                    case 1:
                        _b.sent();
                        errors = true;
                        _b.label = 2;
                    case 2:
                        if (!(NUMBER == null)) return [3, 4];
                        info_err += "ДАННОГО УСТРОЙСТВА НЕТ В БАЗЕ ДАННЫХ ";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', 'ДАННОГО УСТРОЙСТВА НЕТ В БАЗЕ ДАННЫХ ')")];
                    case 3:
                        _b.sent();
                        errors = true;
                        _b.label = 4;
                    case 4:
                        if (!(AKB == null)) return [3, 6];
                        info_err += "УРОВЕНЬ ЗАРЯДА НЕ СООТВЕТСТВУЕТ ФОРМАТУ ИЛИ ОТСУТСТВУЕТ ";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', 'УРОВЕНЬ ЗАРЯДА НЕ СООТВЕТСТВУЕТ ФОРМАТУ ИЛИ ОТСУТСТВУЕТ ')")];
                    case 5:
                        _b.sent();
                        errors = true;
                        _b.label = 6;
                    case 6:
                        if (!(ERROR == 'y')) return [3, 8];
                        info_err += "В ТЕРМОКОСЕ ПРИСУТСТВУЮТ ОТКЛОНЕНИЯ ОТ НОРМЫ (ПРОВЕРТЕ ДАННЫЕ ТЕРМОКОСЫ)";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', 'В ТЕРМОКОСЕ ПРИСУТСТВУЮТ ОТКЛОНЕНИЯ ОТ НОРМЫ (ПРОВЕРТЕ ДАННЫЕ ТЕРМОКОСЫ) ')")];
                    case 7:
                        _b.sent();
                        errors = true;
                        _b.label = 8;
                    case 8:
                        if (!(SENSORS.length < 1)) return [3, 10];
                        info_err += "ДАННЫХ ПО СЕНСЕРАМ НА УСТРОЙСТВЕ НЕТ ";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', 'ДАННЫХ ПО СЕНСЕРАМ НА УСТРОЙСТВЕ НЕТ ')")];
                    case 9:
                        _b.sent();
                        errors = true;
                        _b.label = 10;
                    case 10:
                        if (!(SENSORS.indexOf("---") >= 0)) return [3, 12];
                        info_err += "ОШИБКА ДАННЫХ НА СЕНСОРАХ (ПРОВЕРЬТЕ КАК ПЕРЕДАЕТ УСТРОЙСТВО); ";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', 'ОШИБКА ДАННЫХ НА СЕНСОРАХ (ПРОВЕРЬТЕ КАК ПЕРЕДАЕТ УСТРОЙСТВО); ')")];
                    case 11:
                        _b.sent();
                        errors = true;
                        _b.label = 12;
                    case 12:
                        if (!(NUMBER == "1111")) return [3, 14];
                        info_err += "УСТРОЙСТВО РАБОТАЕТ НЕ ИСПРАВНО ";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', 'УСТРОЙСТВО РАБОТАЕТ НЕ ИСПРАВНО ')")];
                    case 13:
                        _b.sent();
                        errors = true;
                        _b.label = 14;
                    case 14:
                        if (errors) {
                            console.log(this.s_ind, "\x1b[35m", this.data_str, info_err);
                            return [2];
                        }
                        return [4, this.saveSqlData(TIME, NUMBER, SENSORS, AKB, this.data_str)];
                    case 15:
                        _b.sent();
                        return [3, 17];
                    case 16:
                        _a = _b.sent();
                        info_err += "ПРОИЗОШЛА ФАТАЛЬНАЯ ОШИБКА ";
                        return [3, 17];
                    case 17: return [2];
                }
            });
        });
    };
    ServerData_Error.prototype.saveSqlData = function (time, number, sensors, akb, data_str) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, err_info, query_devs, srv_time, obj, s, i, sess_data_sql, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 12, , 13]);
                        errors = false;
                        err_info = '';
                        return [4, this.db.query("SELECT * FROM devs WHERE number = '" + number + "'")];
                    case 1:
                        query_devs = _b.sent();
                        if (!(query_devs.rows.length === 0)) return [3, 3];
                        console.log("ДАННОЕ УСТРОЙСТВО ОТСУТСВУЕТ В БАЗЕ ДАННЫХ");
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + data_str + "', 'ДАННОЕ УСТРОЙСТВО ОТСУТСВУЕТ В БАЗЕ ДАННЫХ')")];
                    case 2:
                        _b.sent();
                        errors = true;
                        _b.label = 3;
                    case 3:
                        if (!(errors === false)) return [3, 11];
                        if (!(query_devs.rows[0].sensors["s"].length < sensors.length)) return [3, 5];
                        err_info = "ПРИНЯТО БОЛЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ(ВОЗМОЖНА ПОТЕРЯ ДАННЫХ)";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + data_str + "', 'ПРИНЯТО БОЛЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ(ВОЗМОЖНА ПОТЕРЯ ДАННЫХ)')")];
                    case 4:
                        _b.sent();
                        errors = true;
                        _b.label = 5;
                    case 5:
                        if (!(query_devs.rows[0].sensors["s"].length > sensors.length)) return [3, 7];
                        err_info = "ПРИНЯТО МЕНЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ";
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + data_str + "', 'ПРИНЯТО МЕНЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ')")];
                    case 6:
                        _b.sent();
                        errors = true;
                        _b.label = 7;
                    case 7:
                        if (errors) {
                            console.log(err_info);
                            console.log("\x1b[33m", data_str, err_info);
                        }
                        srv_time = (0, DateStr_1.dateTimeToSQL)(new Date(Date.now()));
                        obj = query_devs.rows[0].sensors["s"];
                        s = '{"s":[';
                        for (i = 0; i < obj.length; i++) {
                            if (i !== obj.length - 1) {
                                if (sensors.length > i) {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"' + sensors[i] + '"},';
                                }
                                else {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"0.0"},';
                                }
                            }
                            else {
                                if (sensors.length > i) {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"' + sensors[i] + '"}';
                                }
                                else {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"0.0"}';
                                }
                            }
                        }
                        s += ']}';
                        return [4, this.db.query("INSERT INTO dev_sess (time_dev, time_srv, dev_number, dev_id, level_akb, sess_data) VALUES ('" + time + "', '" + srv_time + "', '" + query_devs.rows[0].number + "', " + query_devs.rows[0].id + ", " + akb + ", '" + s + "') RETURNING id")];
                    case 8:
                        sess_data_sql = _b.sent();
                        if (!(sess_data_sql.rows[0].id === 0 || sess_data_sql === null || sess_data_sql === undefined)) return [3, 10];
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + data_str + "', 'НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ')")];
                    case 9:
                        _b.sent();
                        console.log("\x1b[33m", data_str, 'НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ');
                        _b.label = 10;
                    case 10:
                        console.log("\x1b[32m ДАННЫЕ УСПЕШНО ЗАПИСАНЫ");
                        _b.label = 11;
                    case 11: return [3, 13];
                    case 12:
                        _a = _b.sent();
                        console.log("\x1b[31m	ПРОИЗОШЛА ФАТАЛЬНАЯ ОШИБКА ПРИ ЗАПИСИ ДАННЫХ В БД НОВОЙ ПРОШИВКИ");
                        return [3, 13];
                    case 13: return [2];
                }
            });
        });
    };
    return ServerData_Error;
}());
exports.ServerData_Error = ServerData_Error;
//# sourceMappingURL=datas_error.js.map
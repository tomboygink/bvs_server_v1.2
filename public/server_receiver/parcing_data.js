"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.ParcingData = void 0;
var DBase_1 = require("../config/xcore/dbase/DBase");
var DateStr_1 = require("../config/xcore/dbase/DateStr");
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var ParcingData = (function () {
    function ParcingData(_data_str, _s_ind) {
        this.data_str = _data_str;
        this.s_ind = _s_ind;
        this.data_arr = [];
        this.db = (0, DBase_1.getDB)();
    }
    ParcingData.prototype.Run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var logsPath, month, fileName, time_log, dt_arr_0, d, TIME, NUMBER, NUMBER_I, AKB, AKB_I, SENSORS, SENSORS_I, d, error, info_err, query_devs, srv_time, obj, s, i, sess_data_sql, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        console.log("Парсинг данных старой прошивки");
                        logsPath = path.join(__dirname, '..', '..', 'logs');
                        month = new Date().getMonth() + 1;
                        fileName = 'log ' + new Date().getFullYear() + '.' + month + '.' + new Date().getDate() + '.txt';
                        time_log = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + '| ';
                        dt_arr_0 = this.data_str.split(",");
                        for (d in dt_arr_0) {
                            if (dt_arr_0[d].trim() !== '') {
                                this.data_arr.push(dt_arr_0[d].trim());
                            }
                        }
                        if (this.data_arr.length <= 2) {
                            console.log("\x1b[33m" + this.s_ind, "\x1b[31m >>", this.data_str, "Ошибка в данных для парсера");
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
                        error = false;
                        info_err = "";
                        if (TIME == null) {
                            info_err += "ВРЕМЯ НЕ СООТВЕТСВУЕТ ФОРМАТУ; ";
                            error = true;
                        }
                        if (NUMBER == null) {
                            info_err += "ОШИБКА В ПАРСИНГЕ ОТСТВУЕТ УСТРОЙСТВО; ";
                            error = true;
                        }
                        if (AKB == null) {
                            info_err += "ОШИБКА В ПАРСИНГЕ УРОВЕНЬ ЗАРЯДА НЕ СООТВЕТСТВУЕТ ФОРМАТУ ИЛИ ОТСУТСТВУЕТ; ";
                            error = true;
                        }
                        if (SENSORS.length < 1) {
                            info_err += "ОШИБКА В ПАРСИНГЕ ДАННЫХ ПО СЕНСЕРАМ НА УСТРОЙСТВЕ НЕТ; ";
                            error = true;
                        }
                        if (SENSORS.indexOf("---") >= 0) {
                            info_err += "ОШИБКА В ПАРСИНГЕ ОШИБКА ДАННЫХ НА СЕНСОРАХ (ПРОВЕРЬТЕ КАК ПЕРЕДАЕТ УСТРОЙСТВО); ";
                            error = true;
                        }
                        if (NUMBER == "1111") {
                            info_err += "УСТРОЙСТВО РАБОТАЕТ НЕ ИСПРАВНО; ";
                            error = true;
                        }
                        if (!(error === true)) return [3, 2];
                        console.log("\x1b[33m" + this.s_ind + "  - \x1b[31m" + info_err + "\x1b[37m");
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', '" + info_err + " ')")];
                    case 1:
                        _b.sent();
                        fs.appendFile(path.join(logsPath, fileName), time_log + this.data_str + "|" + info_err + '\n', 'utf-8', function (err) { });
                        fs.appendFile(path.join(logsPath, fileName), '________________________________________________________________________________\n', 'utf-8', function (err) { });
                        return [3, 9];
                    case 2: return [4, this.db.query("SELECT * FROM devs WHERE number = '" + NUMBER + "'")];
                    case 3:
                        query_devs = _b.sent();
                        if (query_devs.rows.length === 0) {
                            info_err += "ОШИБКА ПРИ ЗАПИСИ ДАННЫХ ДАННОГО УСТРОЙСТВА НЕТ В БАЗЕ ДАННЫХ;";
                            error = true;
                        }
                        if (!(error === true)) return [3, 5];
                        console.log("\x1b[33m" + this.s_ind + "  - \x1b[31m" + info_err + "\x1b[37m");
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('ERROR', '" + this.data_str + "', '" + info_err + " ')")];
                    case 4:
                        _b.sent();
                        fs.appendFile(path.join(logsPath, fileName), time_log + this.data_str + "|" + info_err + '\n', 'utf-8', function (err) { });
                        fs.appendFile(path.join(logsPath, fileName), '________________________________________________________________________________\n', 'utf-8', function (err) { });
                        return [3, 9];
                    case 5:
                        if (query_devs.rows[0].sensors["s"].length < SENSORS.length) {
                            info_err += "ВНИМАНИЕ ПРИНЯТО БОЛЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ(ВОЗМОЖНА ПОТЕРЯ ДАННЫХ)";
                            error = true;
                        }
                        if (query_devs.rows[0].sensors["s"].length > SENSORS.length) {
                            info_err += "ВНИМАНИЕ ПРИНЯТО МЕНЬШЕ ДАННЫХ С СЕНСЕРОВ, ЧЕМ В БАЗЕ ДАННЫХ";
                            error = true;
                        }
                        if (error === true) {
                            console.log("\x1b[33m" + this.s_ind + "  - \x1b[33m" + this.data_str, info_err);
                        }
                        srv_time = (0, DateStr_1.dateTimeToSQL)(new Date(Date.now()));
                        obj = query_devs.rows[0].sensors["s"];
                        s = '{"s":[';
                        for (i = 0; i < obj.length; i++) {
                            if (i !== obj.length - 1) {
                                if (SENSORS.length > i) {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"' + SENSORS[i] + '"},';
                                }
                                else {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"0.0"},';
                                }
                            }
                            else {
                                if (SENSORS.length > i) {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"' + SENSORS[i] + '"}';
                                }
                                else {
                                    s += '{"depth":"' + obj[i].depth + '", "data":"0.0"}';
                                }
                            }
                        }
                        s += ']}';
                        return [4, this.db.query("INSERT INTO dev_sess (time_dev, time_srv, dev_number, dev_id, level_akb, sess_data) VALUES ('" +
                                TIME + "', '" + srv_time + "', '" + query_devs.rows[0].number + "', " + query_devs.rows[0].id + ", " + AKB + ", '" + s + "') RETURNING id")];
                    case 6:
                        sess_data_sql = _b.sent();
                        if (!(sess_data_sql.rows[0].id === 0 || sess_data_sql === null || sess_data_sql === undefined)) return [3, 8];
                        return [4, this.db.query("INSERT INTO info_log (msg_type, log, info) VALUES ('WARNING', '" + this.data_str + "', 'ВНИМАНИЕ ОШИБКА В ЗАПИСИ ДАННЫХ В БАЗУ ДАННЫХ НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ')")];
                    case 7:
                        _b.sent();
                        console.log("\x1b[33m" + this.s_ind + "  - \x1b[33m", this.data_str, 'ВНИМАНИЕ НЕ МОГУ СОЗДАТЬ СЕСИИЮ ДЛЯ ПРИЕМА ДАННЫХ');
                        return [3, 9];
                    case 8:
                        console.log("\x1b[33m" + this.s_ind + "  -\x1b[32m ДАННЫЕ УСПЕШНО ЗАПИСАНЫ");
                        _b.label = 9;
                    case 9: return [2];
                    case 10:
                        _a = _b.sent();
                        console.log("\x1b[33m" + this.s_ind + "  - ПРОИЗОШЛА ФАТАЛЬНАЯ ОШИБКА ПАРСИНГА ДАННЫХ ИЛИ ЗАПИСИ В БД");
                        return [3, 11];
                    case 11: return [2];
                }
            });
        });
    };
    return ParcingData;
}());
exports.ParcingData = ParcingData;
//# sourceMappingURL=parcing_data.js.map
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerReceiver = void 0;
var net_1 = __importDefault(require("net"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var config_json_1 = __importDefault(require("../config/config.json"));
var parcing_data_1 = require("./parcing_data");
var parcing_new_data_1 = require("./parcing_new_data");
var ServerReceiver = (function () {
    function ServerReceiver() {
        this.debug = true;
        this.timeout = 10000;
        this.host = config_json_1.default.server_receiver_config.host;
        this.port = config_json_1.default.server_receiver_config.port;
        this.server = net_1.default.createServer();
        this.scount = 0;
    }
    ServerReceiver.prototype.startServer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dir, logsPath;
            var _this = this;
            return __generator(this, function (_a) {
                dir = 'logs';
                logsPath = path.join(__dirname, '..', '..', 'logs');
                if (!fs.existsSync(dir)) {
                    console.log("Создаю папку логов");
                    fs.mkdirSync(dir);
                }
                this.server.maxConnections = 200;
                this.server.on('connection', function (socket) { return __awaiter(_this, void 0, void 0, function () {
                    var s_ind;
                    var _this = this;
                    return __generator(this, function (_a) {
                        socket.setTimeout(this.timeout);
                        socket.on('timeout', function () {
                            if (_this.debug) {
                                console.log("Время ожидания вышло");
                            }
                            if (!socket.connecting) {
                                return;
                            }
                            socket.end();
                        });
                        s_ind = this.scount;
                        this.scount++;
                        if (this.scount > 10000)
                            this.scount = 0;
                        socket.on('error', function (err) {
                            console.log("\x1b[31m Ошибка ", err);
                            socket.end();
                        });
                        socket.on('close', function () {
                            if (_this.debug)
                                console.log(s_ind, ' - Клиент закрыл сокет');
                            if (!socket.connecting)
                                socket.end();
                        });
                        socket.on('data', function (data) {
                            var month = new Date().getMonth() + 1;
                            var fileName = 'log ' + new Date().getFullYear() + '.' + month + '.' + new Date().getDate() + '.txt';
                            if (!fs.existsSync(path.join(logsPath, fileName))) {
                                console.log('Создаю файл лога с сегодняшней датой');
                                fs.createWriteStream(path.join(logsPath, fileName), 'utf-8');
                            }
                            var time_log = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + '| ';
                            var data_str = Buffer.from(data).toString().trim();
                            if (data_str.length > 500) {
                                console.log("\x1b[33m" + s_ind + " << \x1B[37m " + data_str);
                                data_str = data_str.substr(0, 500);
                                socket.write('505', function () { if (_this.debug)
                                    console.log("\x1b[33m" + s_ind + " >> !505!"); });
                                socket.end();
                            }
                            else {
                                if (data_str[0] + data_str[1] + data_str[2] + data_str[3] + data_str[4] === ',Time' ||
                                    data_str[0] + data_str[1] === '10' ||
                                    data_str[1] + data_str[2] + data_str[3] + data_str[4] === 'TEST') {
                                    fs.appendFile(path.join(logsPath, fileName), time_log + data_str + '\n', 'utf-8', function (err) { });
                                    fs.appendFile(path.join(logsPath, fileName), '________________________________________________________________________________\n', 'utf-8', function (err) { });
                                    console.log("\x1b[33m" + s_ind + " << \x1B[37m " + data_str);
                                    if (data_str.length < 1) {
                                        socket.write('25', function () { if (_this.debug)
                                            console.log("\x1b[33m" + s_ind + " >> \x1B[37m!25!"); });
                                        return;
                                    }
                                    if (data_str === "10") {
                                        socket.write('30', function () { if (_this.debug)
                                            console.log("\x1b[33m" + s_ind + " >> \x1B[37m 10 -> !30!"); });
                                        return;
                                    }
                                    if (data_str.trim() === ',TEST') {
                                        socket.write('TEST - OK', function () { if (_this.debug)
                                            console.log("\x1b[33m" + s_ind + " >>\x1B[37m TEST -> !TEST - OK!"); });
                                        return;
                                    }
                                    socket.write('20', function () { if (_this.debug)
                                        console.log("\x1b[33m" + s_ind + " >> \x1B[37m !20!"); });
                                    if (data_str.includes('Error')) {
                                        var new_parcing = new parcing_new_data_1.ParcingNewData(data_str, s_ind);
                                        new_parcing.Run();
                                    }
                                    else {
                                        var parcing = new parcing_data_1.ParcingData(data_str, s_ind);
                                        parcing.Run();
                                    }
                                    socket.end();
                                }
                                else {
                                    console.log("\x1b[33m" + s_ind + " << \x1b[31mПопытка взлома");
                                    socket.end();
                                }
                            }
                        });
                        return [2];
                    });
                }); });
                this.server.listen(this.port, this.host, function () {
                    console.log("Слушаю порт ", _this.port, "\nГотов к приему данных");
                });
                return [2];
            });
        });
    };
    return ServerReceiver;
}());
exports.ServerReceiver = ServerReceiver;
var server = new ServerReceiver();
server.startServer();
//# sourceMappingURL=main.js.map
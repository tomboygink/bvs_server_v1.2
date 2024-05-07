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
exports.Router = void 0;
var User_1 = require("../config/xcore/dbase/User");
var Org_1 = require("../config/xcore/dbase/Org");
var Jobs_1 = require("../config/xcore/dbase/Jobs");
var DevsGroups_1 = require("../config/xcore/dbase/DevsGroups");
var Devs_1 = require("../config/xcore/dbase/Devs");
var SchemeSvg_1 = require("../config/xcore/dbase/SchemeSvg");
var DevSess_1 = require("../config/xcore/dbase/DevSess");
function Router(body) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, _a, u, user_sess_code, u, o, j, u, u, dg, svg, d, ds;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(body);
                    res = {
                        cmd: '',
                        error: '',
                        data: [],
                        user_sess_code: ''
                    };
                    _a = body.cmd;
                    switch (_a) {
                        case 'get_UserByAuth': return [3, 1];
                        case 'get_UserBySessionCode': return [3, 6];
                        case 'get_Org': return [3, 11];
                        case 'get_Jobs': return [3, 13];
                        case 'set_NewUser': return [3, 15];
                        case 'set_UpdateUserData': return [3, 17];
                        case 'get_DevsGroups': return [3, 19];
                        case 'get_SchemeSvg': return [3, 21];
                        case 'get_Devs': return [3, 23];
                        case 'get_LastDevSess': return [3, 25];
                    }
                    return [3, 27];
                case 1:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.insertSessionCode()];
                case 2:
                    user_sess_code = _b.sent();
                    console.log(user_sess_code);
                    if (!(user_sess_code === undefined)) return [3, 3];
                    res.cmd = body.cmd;
                    res.error = 'Данного пользователя не сушествует или введены неверные данные';
                    res.data = null;
                    res.user_sess_code = '';
                    return [3, 5];
                case 3: return [4, u.selectUser()];
                case 4:
                    data = _b.sent();
                    res.cmd = body.cmd;
                    res.error = null;
                    res.data = data;
                    res.user_sess_code = user_sess_code;
                    _b.label = 5;
                case 5: return [3, 28];
                case 6:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.selectUser()];
                case 7:
                    data = _b.sent();
                    if (!(data.length === 0 || data[0] === undefined)) return [3, 9];
                    res.cmd = body.cmd;
                    res.error = 'Данного кода сессии не существует или закончилось время использования кода';
                    res.data = null;
                    res.user_sess_code = '';
                    return [4, u.deleteSessionCode()];
                case 8:
                    _b.sent();
                    return [3, 10];
                case 9:
                    res.cmd = body.cmd;
                    res.error = null;
                    res.data = data;
                    res.user_sess_code = body.sess_code;
                    _b.label = 10;
                case 10: return [3, 28];
                case 11:
                    o = new Org_1.Org(body.args, body.sess_code);
                    return [4, o.selectOrg()];
                case 12:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении данных организации';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 28];
                case 13:
                    j = new Jobs_1.Jobs(body.args, body.sess_code);
                    return [4, j.selectJobs()];
                case 14:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении данных должности';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 28];
                case 15:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.insertUser()];
                case 16:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Ошибка добавления пользователя, проверте данные и убедитесь что пользователя с данным логином не существет";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    _b.label = 17;
                case 17:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.updateUser()];
                case 18:
                    data = _b.sent();
                    return [3, 28];
                case 19:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.selectDevsGroups()];
                case 20:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении данных о группе';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 28];
                case 21:
                    svg = new SchemeSvg_1.SchemeSvg(body.args, body.sess_code);
                    return [4, svg.selectSchemeSVG()];
                case 22:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении SVG-схемы возможно она отсутствует';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 28];
                case 23:
                    d = new Devs_1.Devs(body.args, body.sess_code);
                    return [4, d.selectDevs()];
                case 24:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении данных устройства';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 28];
                case 25:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.selectLastDevSess()];
                case 26:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении последней переданной сессии или данные отсутствуют';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 28];
                case 27:
                    {
                        res.cmd = body.cmd;
                        res.error = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \"".concat(body.cmd, "\" \u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u0430");
                        res.data = [],
                            res.user_sess_code = body.sess_code;
                    }
                    _b.label = 28;
                case 28: return [2, JSON.stringify(res)];
            }
        });
    });
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map
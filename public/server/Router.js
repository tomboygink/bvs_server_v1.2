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
var DevVerif_1 = require("../config/xcore/dbase/DevVerif");
var ThermalWell_1 = require("../config/xcore/dbase/ThermalWell");
function Router(body) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data, _a, u, user_sess_code, u, o, o, o, j, j, j, u, u, u, dg, dg, dg, svg, svg, d, d, d, ds, ds, ds, ds, ds, dv, dv, tw, tw, tw, u, u, u, u, u;
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
                        case 'set_Org': return [3, 13];
                        case 'set_ChangeOrg': return [3, 15];
                        case 'get_Job': return [3, 17];
                        case 'set_Job': return [3, 19];
                        case 'set_ChangeJob': return [3, 21];
                        case 'set_User': return [3, 23];
                        case 'get_AllUsers': return [3, 25];
                        case 'set_UpdateUserData': return [3, 27];
                        case 'get_DevsGroups': return [3, 29];
                        case 'set_DevsGroups': return [3, 31];
                        case 'set_UpdateDevsGroups': return [3, 33];
                        case 'get_SchemeSvg': return [3, 35];
                        case 'set_SchemeSvg': return [3, 37];
                        case 'get_Devs': return [3, 39];
                        case 'set_Devs': return [3, 41];
                        case 'set_ChangeDevs': return [3, 43];
                        case 'get_LastDevSess': return [3, 44];
                        case 'set_ControlDevSess': return [3, 46];
                        case 'set_deleteControlDevSess': return [3, 48];
                        case 'get_ControlDevSess': return [3, 50];
                        case 'get_DevSess': return [3, 52];
                        case 'set_DevVerif': return [3, 54];
                        case 'get_DevVerif': return [3, 55];
                        case 'set_ThermalWell': return [3, 56];
                        case 'set_ChangeThermalWell': return [3, 57];
                        case 'get_ThermalWell': return [3, 58];
                        case 'set_ActMail': return [3, 59];
                        case 'set_MailCode': return [3, 61];
                        case 'set_ForgPass': return [3, 63];
                        case 'set_Pass': return [3, 65];
                        case 'deleteCookie': return [3, 67];
                    }
                    return [3, 68];
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
                case 5: return [3, 69];
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
                case 10: return [3, 69];
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
                    return [3, 69];
                case 13:
                    o = new Org_1.Org(body.args, body.sess_code);
                    return [4, o.insertOrg()];
                case 14:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в добавлении новой организации';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 15:
                    o = new Org_1.Org(body.args, body.sess_code);
                    return [4, o.updateOrg()];
                case 16:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка при изменении данных организации';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 17:
                    j = new Jobs_1.Jobs(body.args, body.sess_code);
                    return [4, j.selectJob()];
                case 18:
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
                    return [3, 69];
                case 19:
                    j = new Jobs_1.Jobs(body.args, body.sess_code);
                    return [4, j.insertJob()];
                case 20:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в добавлении новой должности';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 21:
                    j = new Jobs_1.Jobs(body.args, body.sess_code);
                    return [4, j.updateJob()];
                case 22:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка при изменении данных должности';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 23:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.insertUser()];
                case 24:
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
                    return [3, 69];
                case 25:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.selectAllUser()];
                case 26:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении всех пользователей';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 27:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.updateUser()];
                case 28:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка при изменении данных пользователя';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 29:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.selectDevsGroups()];
                case 30:
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
                    return [3, 69];
                case 31:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.insertDevsGroup()];
                case 32:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в добавлении новой группы';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 33:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.updateDevsGroup()];
                case 34:
                    data = _b.sent();
                    if (data === false) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в обновлении данных группы/подгруппы или включенных в группы устройствах';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 35:
                    svg = new SchemeSvg_1.SchemeSvg(body.args, body.sess_code);
                    return [4, svg.selectSchemeSVG()];
                case 36:
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
                    return [3, 69];
                case 37:
                    svg = new SchemeSvg_1.SchemeSvg(body.args, body.sess_code);
                    return [4, svg.newUpdateSchemeSVG()];
                case 38:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка при добавлении/обновлении схемы группы';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 39:
                    d = new Devs_1.Devs(body.args, body.sess_code);
                    return [4, d.selectDevs()];
                case 40:
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
                    return [3, 69];
                case 41:
                    d = new Devs_1.Devs(body.args, body.sess_code);
                    return [4, d.insertDevs()];
                case 42:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в добавлении нового устройства';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 43:
                    {
                        d = new Devs_1.Devs(body.args, body.sess_code);
                        data = d.updateDevs();
                        if (data === null || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = 'Ошибка в обновлении данных устройства';
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                        else {
                            res.cmd = body.cmd;
                            res.error = null;
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                    }
                    return [3, 69];
                case 44:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.selectLastDevSess()];
                case 45:
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
                    return [3, 69];
                case 46:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.insertControlDevSess()];
                case 47:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в добавлении нового устройства';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 48:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.deleteControlDevSess()];
                case 49:
                    data = _b.sent();
                    if (data === false) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка при удалении контрольной сессии ';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 50:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.selectControlDevSess()];
                case 51:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении контрольной сессии или она отсутствует';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 52:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.selectDevSess()];
                case 53:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в получении сессий за установленный период';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 54:
                    {
                        dv = new DevVerif_1.DevVerif(body.args, body.sess_code);
                        data = dv.insertDevVerif();
                        if (data.length === 0 || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = 'Ошибка при установки поверочного интервала устроства';
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                        else {
                            res.cmd = body.cmd;
                            res.error = null;
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                    }
                    return [3, 69];
                case 55:
                    {
                        dv = new DevVerif_1.DevVerif(body.args, body.sess_code);
                        data = dv.selectDevVerif();
                        if (data.length === 0 || data[0] === undefined) {
                            res.cmd = body.cmd;
                            res.error = 'Ошибка при получении поверочного интервала устройства или оно отсутствует';
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                        else {
                            res.cmd = body.cmd;
                            res.error = null;
                            res.data = data;
                            res.user_sess_code = body.sess_code;
                        }
                    }
                    return [3, 69];
                case 56:
                    {
                        tw = new ThermalWell_1.ThermalWell(body.args, body.sess_code);
                        data = tw.insertThermalWell();
                        if (data.length === 0 || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = 'Ошибка при добавлении термоскважины';
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                        else {
                            res.cmd = body.cmd;
                            res.error = null;
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                    }
                    return [3, 69];
                case 57:
                    {
                        tw = new ThermalWell_1.ThermalWell(body.args, body.sess_code);
                        data = tw.updateThremalWell();
                        if (data === null || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = 'Ошибка в обновлении данных термоскважины';
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                        else {
                            res.cmd = body.cmd;
                            res.error = null;
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                    }
                    return [3, 69];
                case 58:
                    {
                        tw = new ThermalWell_1.ThermalWell(body.args, body.sess_code);
                        data = tw.selectThermalWell();
                        if (data.length === 0 || data[0] === undefined) {
                            res.cmd = body.cmd;
                            res.error = 'Ошибка при получении термометрических скважин группы';
                            res.data = null;
                            res.user_sess_code = body.sess_code;
                        }
                        else {
                            res.cmd = body.cmd;
                            res.error = null;
                            res.data = data;
                            res.user_sess_code = body.sess_code;
                        }
                    }
                    return [3, 69];
                case 59:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.sencConfirmMail()];
                case 60:
                    _b.sent();
                    return [3, 69];
                case 61:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.updateMail()];
                case 62:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = 'Ошибка в обновлении данных email';
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    _b.label = 63;
                case 63:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.sendForgPassMail()];
                case 64:
                    data = _b.sent();
                    if (data === false) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Такого email не существует/email не активирован/проверте введенные данные или обратитесть к администратору системы";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 65:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.updatePassRePass()];
                case 66:
                    data = _b.sent();
                    if (data === false) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = "Произошла ошибка при смене пароля";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 69];
                case 67:
                    {
                        u = new User_1.User(body.args, body.sess_code);
                        u.deleteSessionCode();
                        res.cmd = body.cmd;
                        res.code = null;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 69];
                case 68:
                    {
                        res.cmd = body.cmd;
                        res.error = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \"".concat(body.cmd, "\" \u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u0430");
                        res.data = [],
                            res.user_sess_code = body.sess_code;
                    }
                    _b.label = 69;
                case 69: return [2, JSON.stringify(res)];
            }
        });
    });
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map
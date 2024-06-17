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
        var res, data, _a, u, user_sess_code, u, o, o, o, j, j, j, u, u, u, dg, dg, dg, dg, svg, svg, d, d, d, ds, ds, ds, ds, ds, dv, dv, tw, tw, tw, u, u, u, u, u;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(body);
                    res = {
                        cmd: "",
                        error: "",
                        data: [],
                        user_sess_code: "",
                    };
                    _a = body.cmd;
                    switch (_a) {
                        case "check": return [3, 1];
                        case "get_UserByAuth": return [3, 2];
                        case "get_UserBySessionCode": return [3, 7];
                        case "get_Org": return [3, 12];
                        case "set_Org": return [3, 14];
                        case "set_ChangeOrg": return [3, 16];
                        case "get_Job": return [3, 18];
                        case "set_Job": return [3, 20];
                        case "set_ChangeJob": return [3, 22];
                        case "set_User": return [3, 24];
                        case "get_AllUsers": return [3, 26];
                        case "set_UpdateUserData": return [3, 28];
                        case "get_DevsGroups": return [3, 30];
                        case "get_AllDevsGroups": return [3, 32];
                        case "set_DevsGroups": return [3, 34];
                        case "set_UpdateDevsGroups": return [3, 36];
                        case "get_SchemeSvg": return [3, 38];
                        case "set_SchemeSvg": return [3, 40];
                        case "get_Devs": return [3, 42];
                        case "set_Devs": return [3, 44];
                        case "set_ChangeDevs": return [3, 46];
                        case "get_LastDevSess": return [3, 47];
                        case "set_ControlDevSess": return [3, 49];
                        case "set_deleteControlDevSess": return [3, 51];
                        case "get_ControlDevSess": return [3, 53];
                        case "get_DevSess": return [3, 55];
                        case "set_DevVerif": return [3, 57];
                        case "get_DevVerif": return [3, 58];
                        case "set_ThermalWell": return [3, 59];
                        case "set_ChangeThermalWell": return [3, 60];
                        case "get_ThermalWell": return [3, 61];
                        case "set_ActMail": return [3, 62];
                        case "set_MailCode": return [3, 64];
                        case "set_ForgPass": return [3, 66];
                        case "set_Pass": return [3, 68];
                        case "deleteCookie": return [3, 70];
                    }
                    return [3, 71];
                case 1:
                    {
                        res.cmd = body.cmd;
                        res.code = null;
                        res.data = "ok";
                        res.error = null;
                    }
                    return [3, 72];
                case 2:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.insertSessionCode()];
                case 3:
                    user_sess_code = _b.sent();
                    console.log(user_sess_code);
                    if (!(user_sess_code === undefined)) return [3, 4];
                    res.cmd = body.cmd;
                    res.error =
                        "Данного пользователя не сушествует или введены неверные данные";
                    res.data = null;
                    res.user_sess_code = "";
                    return [3, 6];
                case 4: return [4, u.selectUser()];
                case 5:
                    data = _b.sent();
                    res.cmd = body.cmd;
                    res.error = null;
                    res.data = data;
                    res.user_sess_code = user_sess_code;
                    _b.label = 6;
                case 6: return [3, 72];
                case 7:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.selectUser()];
                case 8:
                    data = _b.sent();
                    if (!(data.length === 0 || data[0] === undefined)) return [3, 10];
                    res.cmd = body.cmd;
                    res.error =
                        "Данного кода сессии не существует или закончилось время использования кода";
                    res.data = null;
                    res.user_sess_code = "";
                    return [4, u.deleteSessionCode()];
                case 9:
                    _b.sent();
                    return [3, 11];
                case 10:
                    res.cmd = body.cmd;
                    res.error = null;
                    res.data = data;
                    res.user_sess_code = body.sess_code;
                    _b.label = 11;
                case 11: return [3, 72];
                case 12:
                    o = new Org_1.Org(body.args, body.sess_code);
                    return [4, o.selectOrg()];
                case 13:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении данных организации";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 14:
                    o = new Org_1.Org(body.args, body.sess_code);
                    return [4, o.insertOrg()];
                case 15:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в добавлении новой организации";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 16:
                    o = new Org_1.Org(body.args, body.sess_code);
                    return [4, o.updateOrg()];
                case 17:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка при изменении данных организации";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 18:
                    j = new Jobs_1.Jobs(body.args, body.sess_code);
                    return [4, j.selectJob()];
                case 19:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении данных должности";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 20:
                    j = new Jobs_1.Jobs(body.args, body.sess_code);
                    return [4, j.insertJob()];
                case 21:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в добавлении новой должности";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 22:
                    j = new Jobs_1.Jobs(body.args, body.sess_code);
                    return [4, j.updateJob()];
                case 23:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка при изменении данных должности";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 24:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.insertUser()];
                case 25:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error =
                            "Ошибка добавления пользователя, проверте данные и убедитесь что пользователя с данным логином не существет";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 72];
                case 26:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.selectAllUser()];
                case 27:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении всех пользователей";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 28:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.updateUser()];
                case 29:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка при изменении данных пользователя";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 30:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.selectDevsGroups()];
                case 31:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении данных о группе";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 32:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.selectAllDevsGroups()];
                case 33:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении данных о группе";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 34:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.insertDevsGroup()];
                case 35:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в добавлении новой группы";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 36:
                    dg = new DevsGroups_1.DevsGroups(body.args, body.sess_code);
                    return [4, dg.updateDevsGroup()];
                case 37:
                    data = _b.sent();
                    if (data === false) {
                        res.cmd = body.cmd;
                        res.error =
                            "Ошибка в обновлении данных группы/подгруппы или включенных в группы устройствах";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 38:
                    svg = new SchemeSvg_1.SchemeSvg(body.args, body.sess_code);
                    return [4, svg.selectSchemeSVG()];
                case 39:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении SVG-схемы возможно она отсутствует";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 40:
                    svg = new SchemeSvg_1.SchemeSvg(body.args, body.sess_code);
                    return [4, svg.newUpdateSchemeSVG()];
                case 41:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка при добавлении/обновлении схемы группы";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 42:
                    d = new Devs_1.Devs(body.args, body.sess_code);
                    return [4, d.selectDevs()];
                case 43:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении данных устройства";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 44:
                    d = new Devs_1.Devs(body.args, body.sess_code);
                    return [4, d.insertDevs()];
                case 45:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в добавлении нового устройства";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 46:
                    {
                        d = new Devs_1.Devs(body.args, body.sess_code);
                        data = d.updateDevs();
                        if (data === null || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = "Ошибка в обновлении данных устройства";
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
                    return [3, 72];
                case 47:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.selectLastDevSess()];
                case 48:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error =
                            "Ошибка в получении последней переданной сессии или данные отсутствуют";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 49:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.insertControlDevSess()];
                case 50:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в добавлении нового устройства";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 51:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.deleteControlDevSess()];
                case 52:
                    data = _b.sent();
                    if (data === false) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка при удалении контрольной сессии ";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 53:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.selectControlDevSess()];
                case 54:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error =
                            "Ошибка в получении контрольной сессии или она отсутствует";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 55:
                    ds = new DevSess_1.DevSess(body.args, body.sess_code);
                    return [4, ds.selectDevSess()];
                case 56:
                    data = _b.sent();
                    if (data.length === 0 || data[0] === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в получении сессий за установленный период";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = data;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 57:
                    {
                        dv = new DevVerif_1.DevVerif(body.args, body.sess_code);
                        data = dv.insertDevVerif();
                        if (data.length === 0 || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = "Ошибка при установки поверочного интервала устроства";
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
                    return [3, 72];
                case 58:
                    {
                        dv = new DevVerif_1.DevVerif(body.args, body.sess_code);
                        data = dv.selectDevVerif();
                        if (data.length === 0 || data[0] === undefined) {
                            res.cmd = body.cmd;
                            res.error =
                                "Ошибка при получении поверочного интервала устройства или оно отсутствует";
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
                    return [3, 72];
                case 59:
                    {
                        tw = new ThermalWell_1.ThermalWell(body.args, body.sess_code);
                        data = tw.insertThermalWell();
                        if (data.length === 0 || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = "Ошибка при добавлении термоскважины";
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
                    return [3, 72];
                case 60:
                    {
                        tw = new ThermalWell_1.ThermalWell(body.args, body.sess_code);
                        data = tw.updateThremalWell();
                        if (data === null || data === undefined) {
                            res.cmd = body.cmd;
                            res.error = "Ошибка в обновлении данных термоскважины";
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
                    return [3, 72];
                case 61:
                    {
                        tw = new ThermalWell_1.ThermalWell(body.args, body.sess_code);
                        data = tw.selectThermalWell();
                        if (data.length === 0 || data[0] === undefined) {
                            res.cmd = body.cmd;
                            res.error = "Ошибка при получении термометрических скважин группы";
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
                    return [3, 72];
                case 62:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.sencConfirmMail()];
                case 63:
                    _b.sent();
                    return [3, 72];
                case 64:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.updateMail()];
                case 65:
                    data = _b.sent();
                    if (data === null || data === undefined) {
                        res.cmd = body.cmd;
                        res.error = "Ошибка в обновлении данных email";
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    _b.label = 66;
                case 66:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.sendForgPassMail()];
                case 67:
                    data = _b.sent();
                    if (data === false) {
                        res.cmd = body.cmd;
                        res.code = body.sess_code;
                        res.data = null;
                        res.error =
                            "Такого email не существует/email не активирован/проверте введенные данные или обратитесть к администратору системы";
                    }
                    else {
                        res.cmd = body.cmd;
                        res.error = null;
                        res.data = null;
                        res.user_sess_code = body.sess_code;
                    }
                    return [3, 72];
                case 68:
                    u = new User_1.User(body.args, body.sess_code);
                    return [4, u.updatePassRePass()];
                case 69:
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
                    return [3, 72];
                case 70:
                    {
                        u = new User_1.User(body.args, body.sess_code);
                        u.deleteSessionCode();
                        res.cmd = body.cmd;
                        res.code = null;
                        res.data = null;
                        res.error = null;
                    }
                    return [3, 72];
                case 71:
                    {
                        res.cmd = body.cmd;
                        res.error = "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \"".concat(body.cmd, "\" \u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043D\u0430");
                        (res.data = []), (res.user_sess_code = body.sess_code);
                    }
                    _b.label = 72;
                case 72: return [2, JSON.stringify(res)];
            }
        });
    });
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map
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
exports.DevsGroups = exports.DevsGroupsEntity = void 0;
var DBase_1 = require("./DBase");
var DevsGroupsEntity = (function () {
    function DevsGroupsEntity() {
        this.id = 0;
        this.parent_id = 0;
        this.g_name = "";
        this.latitude = "";
        this.longitude = "";
        this.org_id = 0;
        this.ord_num = 0;
        this.deleted = false;
        this.g_info = "";
    }
    return DevsGroupsEntity;
}());
exports.DevsGroupsEntity = DevsGroupsEntity;
var DevsGroups = (function () {
    function DevsGroups(_args, _sess_code) {
        this.db = (0, DBase_1.getDB)();
        this.args = _args;
        this.sess_code = _sess_code;
    }
    DevsGroups.prototype.selectDevsGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, dg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM devs_groups WHERE parent_id = " + this.args.parent_id)];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        for (dg in db_response.rows) {
                            result.push(db_response.rows[dg]);
                        }
                        return [2, result];
                }
            });
        });
    };
    DevsGroups.prototype.selectAllDevsGroups = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, dg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM devs_groups")];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        for (dg in db_response.rows) {
                            result.push(db_response.rows[dg]);
                        }
                        return [2, result];
                }
            });
        });
    };
    DevsGroups.prototype.insertDevsGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("INSERT INTO devs_groups(parent_id, g_name, latitude, longitude, org_id, ord_num, deleted, g_info)" +
                            "VALUES(" +
                            this.args.parent_id +
                            ", '" +
                            this.args.g_name +
                            "', '" +
                            this.args.latitude +
                            "', '" +
                            this.args.longitude +
                            "', " +
                            this.args.id_org +
                            ", 0, " +
                            this.args.deleted +
                            ", '" +
                            this.args.g_info +
                            "') RETURNING id")];
                    case 1:
                        db_response = _a.sent();
                        return [4, this.db.query("INSERT INTO scheme_svg (id_devs_groups, svg) VALUES (" + db_response.rows[0].id + ", \'\')")];
                    case 2:
                        _a.sent();
                        return [2, db_response.rows];
                }
            });
        });
    };
    DevsGroups.prototype.updateDevsGroup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, i, data_dev, j, data_well, j, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 16, , 17]);
                        return [4, this.db.query("UPDATE devs_groups SET parent_id =" +
                                this.args.parent_id +
                                ", g_name = \'" +
                                this.args.g_name +
                                "\', latitude = \'" +
                                this.args.latitude +
                                "\', longitude = \'" +
                                this.args.longitude +
                                "\', org_id = " +
                                this.args.org_id +
                                ", deleted = " +
                                this.args.deleted +
                                ", g_info = \'" +
                                this.args.g_info +
                                "\' WHERE id = " +
                                this.args.id)];
                    case 1:
                        _b.sent();
                        return [4, this.db.query("with recursive temp1 (id, parent_id, g_name, latitude, longitude, org_id, ord_num, deleted, g_info, path) " +
                                "as (select t1.id, t1.parent_id, t1.g_name, t1.latitude, t1.longitude, t1.org_id, t1.ord_num, t1.deleted, t1.g_info, cast (t1.g_name as varchar (50)) as path " +
                                "from devs_groups t1 where id = " +
                                this.args.id +
                                " union " +
                                "select t2.id, t2.parent_id, t2.g_name, t2.latitude, t2.longitude, t2.org_id, t2.ord_num, t2.deleted, t2.g_info, cast (temp1.path || '->'|| t2.g_name as varchar(50)) " +
                                "from devs_groups t2 inner join temp1 on (temp1.id = t2.parent_id)) " +
                                "select * from temp1")];
                    case 2:
                        data = _b.sent();
                        i = 0;
                        _b.label = 3;
                    case 3:
                        if (!(i < data.rows.length)) return [3, 15];
                        return [4, this.db.query("UPDATE devs_groups SET org_id = " +
                                this.args.org_id +
                                ", deleted = " +
                                this.args.deleted +
                                " WHERE id = " +
                                data.rows[i].id)];
                    case 4:
                        _b.sent();
                        return [4, this.db.query("SELECT * FROM Devs WHERE group_dev_id=" +
                                data.rows[i].id +
                                " order by number asc")];
                    case 5:
                        data_dev = _b.sent();
                        j = 0;
                        _b.label = 6;
                    case 6:
                        if (!(j < data_dev.rows.length)) return [3, 9];
                        return [4, this.db.query("UPDATE Devs SET " +
                                "deleted = " +
                                this.args.deleted +
                                " WHERE id=" +
                                data_dev.rows[j].id)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        j++;
                        return [3, 6];
                    case 9: return [4, this.db.query("SELECT * FROM skvazhiny WHERE group_id = " + data.rows[i].id)];
                    case 10:
                        data_well = _b.sent();
                        j = 0;
                        _b.label = 11;
                    case 11:
                        if (!(j < data_well.rows.length)) return [3, 14];
                        return [4, this.db.query("UPDATE skvazhiny SET org_id =" +
                                this.args.org_id +
                                " WHERE id = " +
                                data_well.rows[j].id)];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13:
                        j++;
                        return [3, 11];
                    case 14:
                        i++;
                        return [3, 3];
                    case 15: return [2, true];
                    case 16:
                        _a = _b.sent();
                        return [2, false];
                    case 17: return [2];
                }
            });
        });
    };
    return DevsGroups;
}());
exports.DevsGroups = DevsGroups;
//# sourceMappingURL=DevsGroups.js.map
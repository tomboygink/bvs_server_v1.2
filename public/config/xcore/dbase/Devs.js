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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Devs = exports.DevsEntity = void 0;
var DBase_1 = require("./DBase");
var DevsEntity = (function () {
    function DevsEntity() {
        this.id = 0;
        this.group_dev_id = 0;
        this.number = "";
        this.name = "";
        this.latitude = "";
        this.longitude = "";
        this.sensors = "";
        this.deleted = false;
        this.info = "";
        this.period_sess = 0;
    }
    return DevsEntity;
}());
exports.DevsEntity = DevsEntity;
var Devs = (function () {
    function Devs(_args, _sess_code) {
        this.db = (0, DBase_1.getDB)();
        this.args = _args;
        this.sess_code = _sess_code;
    }
    Devs.prototype.selectDevById = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM devs WHERE id = " + this.args.id)];
                    case 1:
                        db_response = _a.sent();
                        return [2, db_response.rows];
                }
            });
        });
    };
    Devs.prototype.selectDevs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, d;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM devs WHERE group_dev_id = " + this.args.group_dev_id + " ORDER BY number ASC")];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        for (d in db_response.rows) {
                            result.push(db_response.rows[d]);
                        }
                        return [2, result];
                }
            });
        });
    };
    Devs.prototype.selectAllDevs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM devs ORDER BY number ASC")];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        result = __spreadArray([], db_response.rows, true);
                        return [2, result];
                }
            });
        });
    };
    Devs.prototype.insertDevs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("INSERT INTO devs(group_dev_id, number, name, latitude, longitude, sensors, deleted, info, period_sess) " +
                            "VALUES (" +
                            this.args.group_dev_id +
                            ", '" +
                            this.args.number +
                            "', '" +
                            this.args.name +
                            "', '" +
                            this.args.latitude +
                            "', '" +
                            this.args.longitude +
                            "', '" +
                            this.args.sensors +
                            "', " +
                            this.args.deleted +
                            ", '" +
                            this.args.info +
                            "', " +
                            this.args.period_sess +
                            ") RETURNING id")];
                    case 1:
                        db_response = _a.sent();
                        return [2, db_response.rows];
                }
            });
        });
    };
    Devs.prototype.insertManyDevs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("INSERT INTO devs(group_dev_id, number, name, latitude, longitude, sensors, deleted, info, period_sess) VALUES \n      ".concat(this.args.map(function (item) {
                            return " ('".concat(item.group_dev_id, "', '").concat(item.number, "','").concat(item.name, "', '").concat(item.latitude, "', '").concat(item.longitude, "', '").concat(item.sensors, "', ").concat(item.deleted, ", '").concat(item.info, "', '").concat(item.period_sess, "')");
                        }), "\n       RETURNING id"))];
                    case 1:
                        db_response = _a.sent();
                        return [2, db_response.rows];
                }
            });
        });
    };
    Devs.prototype.updateDevs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("select * from devs where number = '" + this.args.number + "' ")];
                    case 1:
                        data = _a.sent();
                        if (!(data.rows[0] === undefined || data.rows[0].id === this.args.id)) return [3, 5];
                        return [4, this.db.query("UPDATE devs SET group_dev_id = " +
                                this.args.group_dev_id +
                                ", number = '" +
                                this.args.number +
                                "', name = '" +
                                this.args.name +
                                "', latitude = '" +
                                this.args.latitude +
                                "', " +
                                "longitude = '" +
                                this.args.longitude +
                                "', sensors = '" +
                                this.args.sensors +
                                "', deleted = " +
                                this.args.deleted +
                                ", info = '" +
                                this.args.info +
                                "', period_sess = " +
                                this.args.period_sess +
                                " WHERE id = " +
                                this.args.id +
                                " RETURNING id")];
                    case 2:
                        db_response = _a.sent();
                        return [4, this.db.query("UPDATE control_dev_sess SET dev_number = '" +
                                this.args.number +
                                "' WHERE dev_id = " +
                                this.args.id +
                                "")];
                    case 3:
                        _a.sent();
                        return [4, this.db.query("UPDATE dev_sess SET dev_number = '" +
                                this.args.number +
                                "' WHERE dev_id=" +
                                this.args.id +
                                "")];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        db_response.rows = [];
                        _a.label = 6;
                    case 6: return [2, db_response.rows];
                }
            });
        });
    };
    return Devs;
}());
exports.Devs = Devs;
//# sourceMappingURL=Devs.js.map
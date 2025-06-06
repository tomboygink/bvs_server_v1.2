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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevSess = exports.DevSessEntity = void 0;
var DBase_1 = require("./DBase");
var DateStr_1 = require("./DateStr");
var DevSessEntity = (function () {
    function DevSessEntity() {
        this.id = 0;
    }
    return DevSessEntity;
}());
exports.DevSessEntity = DevSessEntity;
var DevSess = (function () {
    function DevSess(_args, _sess_code) {
        this.db = (0, DBase_1.getDB)();
        this.args = _args;
        this.sess_code = _sess_code;
    }
    DevSess.prototype.selectLastDevSess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, lds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM dev_sess WHERE dev_number = '" +
                            this.args.dev_number +
                            "' order by id desc limit 1;")];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        for (lds in db_response.rows) {
                            result.push(db_response.rows[lds]);
                        }
                        return [2, result];
                }
            });
        });
    };
    DevSess.prototype.selectAllLastDevSess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, lds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("WITH test AS (SELECT *, ROW_NUMBER() OVER(PARTITION BY dev_number ORDER BY time_dev desc) as rn FROM dev_sess) SELECT * FROM test WHERE rn = 1")];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        for (lds in db_response.rows) {
                            result.push(db_response.rows[lds]);
                        }
                        return [2, result];
                }
            });
        });
    };
    DevSess.prototype.insertControlDevSess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("INSERT INTO control_dev_sess (dev_sess_id, dev_id, dev_number) " +
                            "VALUES (" +
                            this.args.dev_sess_id +
                            ", " +
                            this.args.dev_id +
                            ", " +
                            this.args.dev_number +
                            ") RETURNING id")];
                    case 1:
                        db_response = _a.sent();
                        return [2, db_response.rows];
                }
            });
        });
    };
    DevSess.prototype.selectControlDevSess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, cds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT dev_sess.* from dev_sess INNER JOIN control_dev_sess " +
                            "ON dev_sess.id = control_dev_sess.dev_sess_id WHERE control_dev_sess.dev_number = '" +
                            this.args.dev_number +
                            "'")];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        for (cds in db_response.rows) {
                            result.push(db_response.rows[cds]);
                        }
                        return [2, result];
                }
            });
        });
    };
    DevSess.prototype.selectDevSess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var start_date, end_date, db_response, result, ds, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!(this.args.sess_period_start !== '')) return [3, 2];
                        start_date = (0, DateStr_1.dateTimeToSQL)(new Date(this.args.sess_period_start));
                        end_date = (0, DateStr_1.dateTimeToSQL)(new Date(this.args.sess_period_end));
                        return [4, this.db.query("SELECT * FROM dev_sess WHERE dev_number = '" +
                                this.args.dev_number +
                                "' AND time_dev >= '" +
                                start_date +
                                "' AND " +
                                "time_dev<= '" +
                                end_date +
                                "' order by time_dev asc")];
                    case 1:
                        db_response = _b.sent();
                        result = new Array();
                        for (ds in db_response.rows) {
                            result.push(db_response.rows[ds]);
                        }
                        return [2, result];
                    case 2: return [2, []];
                    case 3: return [3, 5];
                    case 4:
                        _a = _b.sent();
                        return [2, []];
                    case 5: return [2];
                }
            });
        });
    };
    DevSess.prototype.deleteControlDevSess = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.db.query("DELETE FROM control_dev_sess WHERE dev_sess_id = ('" +
                                this.args.id +
                                "')")];
                    case 1:
                        _b.sent();
                        return [2, true];
                    case 2:
                        _a = _b.sent();
                        return [2, false];
                    case 3: return [2];
                }
            });
        });
    };
    return DevSess;
}());
exports.DevSess = DevSess;
//# sourceMappingURL=DevSess.js.map
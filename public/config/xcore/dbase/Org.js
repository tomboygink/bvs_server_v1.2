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
exports.Org = exports.OrgsEntity = void 0;
var DBase_1 = require("./DBase");
var OrgsEntity = (function () {
    function OrgsEntity() {
        this.id = 0;
        this.name = '';
        this.full_name = '';
        this.inn = "";
        this.address = "";
        this.latitude = "";
        this.longitude = "";
        this.info = "";
    }
    return OrgsEntity;
}());
exports.OrgsEntity = OrgsEntity;
var Org = (function () {
    function Org(_args, _sess_code) {
        this.db = (0, DBase_1.getDB)();
        this.args = _args;
        this.sess_code = _sess_code;
    }
    Org.prototype.selectOrg = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, o;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db_response = {};
                        if (!(this.args.id_org === undefined)) return [3, 2];
                        return [4, this.db.query("SELECT * FROM orgs")];
                    case 1:
                        db_response = _a.sent();
                        return [3, 4];
                    case 2: return [4, this.db.query("SELECT * FROM orgs WHERE id = " + this.args.id_org)];
                    case 3:
                        db_response = _a.sent();
                        _a.label = 4;
                    case 4:
                        result = new Array();
                        for (o in db_response.rows) {
                            result.push(db_response.rows[o]);
                        }
                        return [2, result];
                }
            });
        });
    };
    return Org;
}());
exports.Org = Org;
//# sourceMappingURL=Org.js.map
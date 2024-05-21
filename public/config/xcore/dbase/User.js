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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UsersEntity = void 0;
var DBase_1 = require("./DBase");
var crypto_1 = __importDefault(require("crypto"));
var config_json_1 = __importDefault(require("../../config.json"));
var DateStr_1 = require("./DateStr");
var nodemailer_1 = __importDefault(require("nodemailer"));
var UsersEntity = (function () {
    function UsersEntity() {
        this.id = 0;
        this.login = "";
        this.family = "";
        this.name = "";
        this.father = "";
        this.email = "";
        this.id_org = 0;
        this.id_job = 0;
        this.roles_ids = {};
        this.act_mail = false;
        this.deleted = false;
        this.info = "";
    }
    return UsersEntity;
}());
exports.UsersEntity = UsersEntity;
var User = (function () {
    function User(_args, _sess_code) {
        this.transporter = nodemailer_1.default.createTransport({
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: "noreplay@burvodstroy45.ru",
                pass: "RPWH8qhtD0YpY21sWWjY",
            },
        });
        this.db = (0, DBase_1.getDB)();
        this.args = _args;
        this.sess_code = _sess_code;
    }
    User.prototype.insertSessionCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pass, db_response, date, id_q, id, sess;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pass = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.password)
                            .digest("hex");
                        return [4, this.db.query("SELECT id FROM users WHERE login = '" +
                                this.args.login +
                                "' and password = '" +
                                pass +
                                "'")];
                    case 1:
                        db_response = _a.sent();
                        if (!(db_response.rows.length !== 0)) return [3, 4];
                        date = new Date();
                        date.setDate(date.getDate() + 15);
                        return [4, this.db.query("SELECT max(id) FROM sessions")];
                    case 2:
                        id_q = _a.sent();
                        id = 0;
                        if (id_q.rows[0].max === null) {
                            id++;
                        }
                        else {
                            id = parseInt(id_q.rows[0].max) + 1;
                        }
                        sess = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(id +
                            "_" +
                            (0, DateStr_1.dateTimeToSQL)(date) +
                            "_" +
                            db_response.rows[0].selectiduser)
                            .digest("hex");
                        return [4, this.db.query("INSERT INTO sessions (id, uid, expires, created_at, sess_code, sess_data) " +
                                "VALUES (" +
                                id +
                                ", " +
                                db_response.rows[0].id +
                                ", '" +
                                (0, DateStr_1.dateTimeToSQL)(date) +
                                "', '" +
                                (0, DateStr_1.dateTimeToSQL)(new Date(Date.now())) +
                                "', '" +
                                sess +
                                "', '{\"data\":[]}')")];
                    case 3:
                        _a.sent();
                        return [2, sess];
                    case 4: return [2];
                }
            });
        });
    };
    User.prototype.deleteSessionCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("DELETE FROM sessions WHERE sess_code = '" + this.args.code + "'")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    User.prototype.selectUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, pass, time_for_exit, result, u;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db_response = {};
                        if (!(this.args.code === undefined)) return [3, 2];
                        pass = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.password)
                            .digest("hex");
                        return [4, this.db.query("SELECT " +
                                "id, login, family, name, father, email, org_id as id_org," +
                                "job_title_id as id_job, roles_ids, act_mail, deleted, info FROM users WHERE login ='" +
                                this.args.login +
                                "' and password = '" +
                                pass +
                                "'")];
                    case 1:
                        db_response = _a.sent();
                        return [3, 6];
                    case 2: return [4, this.db.query("SELECT expires FROM sessions WHERE sess_code = '" +
                            this.args.code +
                            "'")];
                    case 3:
                        time_for_exit = _a.sent();
                        if (!(time_for_exit.rows[0] !== undefined &&
                            time_for_exit.rows[0].expires >= new Date(Date.now()))) return [3, 5];
                        return [4, this.db.query("SELECT " +
                                "users.id, users.login, users.family, users.name, " +
                                "users.father, users.email, users.org_id as id_org," +
                                "users.job_title_id as id_job, users.roles_ids, " +
                                "users.act_mail, users.deleted, users.info FROM users INNER JOIN sessions ON " +
                                "users.id=sessions.uid WHERE sessions.sess_code = '" +
                                this.args.code +
                                "'")];
                    case 4:
                        db_response = _a.sent();
                        return [3, 6];
                    case 5:
                        console.log("Время авторизации вышло");
                        _a.label = 6;
                    case 6:
                        result = new Array();
                        for (u in db_response.rows) {
                            result.push(db_response.rows[u]);
                        }
                        return [2, result];
                }
            });
        });
    };
    User.prototype.insertUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var checkUser, pass, mail_code, re_pass_code, access, db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.selectUser()];
                    case 1:
                        checkUser = _a.sent();
                        if (!(checkUser.length === 0)) return [3, 3];
                        pass = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.password)
                            .digest("hex");
                        mail_code = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.login + "_" + this.args.email)
                            .digest("hex");
                        re_pass_code = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.login + "_" + pass)
                            .digest("hex");
                        access = "";
                        if (this.args.user_r === false && this.args.user_w === false) {
                            access = '{"roles":[1]}';
                        }
                        if (this.args.user_r === true && this.args.user_w === false) {
                            access = '{"roles":[1]}';
                        }
                        if (this.args.user_r === false && this.args.user_w === true) {
                            access = '{"roles":[1,2]}';
                        }
                        if (this.args.user_r === true && this.args.user_w === true) {
                            access = '{"roles":[1,2]}';
                        }
                        return [4, this.db.query("INSERT INTO users (login, password, family, name, father, telephone, " +
                                "email, org_id, job_title_id, roles_ids, user_data, mail_code, act_mail, re_password_code, " +
                                "deleted, deleted_date, created_at, info) VALUES ('" +
                                this.args.login +
                                "', '" +
                                pass +
                                "', '" +
                                this.args.family +
                                "', '" +
                                this.args.name +
                                "', '" +
                                this.args.father +
                                "', '---', '" +
                                this.args.email +
                                "', " +
                                this.args.id_org +
                                ", " +
                                this.args.id_jobs +
                                ", '" +
                                access +
                                "', '{\"user_data\":[]}', '" +
                                mail_code +
                                "', false , '" +
                                re_pass_code +
                                "', false, null, '" +
                                (0, DateStr_1.dateTimeToSQL)(new Date(Date.now())) +
                                "','" +
                                this.args.info +
                                "') RETURNING id")];
                    case 2:
                        db_response = _a.sent();
                        return [2, db_response.rows];
                    case 3: return [2];
                }
            });
        });
    };
    User.prototype.selectAllUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, result, u;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT * FROM users")];
                    case 1:
                        db_response = _a.sent();
                        result = new Array();
                        for (u in db_response.rows) {
                            result.push(db_response.rows[u]);
                        }
                        return [2, result];
                }
            });
        });
    };
    User.prototype.updateUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, checkMail, mail_code, checkMailandPass, pass, re_pass_code, mail_code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db_response = {};
                        if (!(this.args.password === undefined)) return [3, 5];
                        return [4, this.db.query("SELECT email FROM users WHERE id =" + this.args.id)];
                    case 1:
                        checkMail = _a.sent();
                        return [4, this.db.query("UPDATE users SET family = '" +
                                this.args.family +
                                "', name ='" +
                                this.args.name +
                                "', father = '" +
                                this.args.father +
                                "'," +
                                " info = '" +
                                this.args.info +
                                "' WHERE id = " +
                                this.args.id +
                                "RETURNING id")];
                    case 2:
                        db_response = _a.sent();
                        if (!(checkMail.rows[0].email !== this.args.email)) return [3, 4];
                        mail_code = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.login + "_" + this.args.email)
                            .digest("hex");
                        return [4, this.db.query("UPDATE users SET email = '" +
                                this.args.email +
                                "', mail_code = '" +
                                mail_code +
                                "' , act_mail = false WHERE id = " +
                                this.args.id)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3, 11];
                    case 5: return [4, this.db.query("SELECT email, password FROM users WHERE id =" + this.args.id)];
                    case 6:
                        checkMailandPass = _a.sent();
                        return [4, this.db.query("UPDATE users SET family = '" +
                                this.args.family +
                                "', name ='" +
                                this.args.name +
                                "', father = '" +
                                this.args.father +
                                "'," +
                                " info = '" +
                                this.args.info +
                                "', deleted = " +
                                this.args.deleted +
                                " WHERE id = " +
                                this.args.id +
                                "RETURNING id")];
                    case 7:
                        db_response = _a.sent();
                        if (!(checkMailandPass.rows[0].pass !== this.args.password &&
                            this.args.password !== "")) return [3, 9];
                        pass = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.password)
                            .digest("hex");
                        re_pass_code = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.login + "_" + pass)
                            .digest("hex");
                        return [4, this.db.query("UPDATE users SET password = '" +
                                pass +
                                "', re_password_code = '" +
                                re_pass_code +
                                "' WHERE id = " +
                                this.args.id)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!(checkMailandPass.rows[0].email !== this.args.email)) return [3, 11];
                        mail_code = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.login + "_" + this.args.email)
                            .digest("hex");
                        return [4, this.db.query("UPDATE users SET email = '" +
                                this.args.email +
                                "', mail_code = '" +
                                mail_code +
                                "' , act_mail = false WHERE id = " +
                                this.args.id)];
                    case 10:
                        _a.sent();
                        _a.label = 11;
                    case 11: return [2, db_response.rows];
                }
            });
        });
    };
    User.prototype.sencConfirmMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var a;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        a = "";
                        a = crypto_1.default
                            .createHmac("sha256", config_json_1.default.crypto_code)
                            .update(this.args.login + "_" + this.args.email)
                            .digest("hex");
                        return [4, this.transporter.sendMail({
                                from: "noreplay@bvs45.ru",
                                to: this.args.email,
                                subject: "Activate mail",
                                html: 'This message was sent from bvs_server to activate mail. <h1><a href="http://' +
                                    config_json_1.default.server_config.host +
                                    ":" +
                                    config_json_1.default.server_config.port +
                                    "/confirm_mail?code= " +
                                    a +
                                    '">Click this link</a></h1>',
                            })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    User.prototype.updateMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT login, email FROM users INNER JOIN sessions ON users.id = sessions.uid WHERE sess_code = \'" + this.args.sess_code + "\'")];
                    case 1:
                        db_response = _a.sent();
                        code = crypto_1.default.createHmac('sha256', config_json_1.default.crypto_code).update(db_response.rows[0].login + "_" + db_response.rows[0].email).digest('hex');
                        return [4, this.db.query("UPDATE users SET mail_code = \'" + code + "\', act_mail = true WHERE " +
                                "login = (SELECT login from USERS inner join sesssions on sessions.uid = users.id WHERE sess_code = \'" + this.args.sess_code + "\') RETERNING id")];
                    case 2:
                        db_response = _a.sent();
                        return [2, db_response.rows];
                }
            });
        });
    };
    User.prototype.sendForgPassMail = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.db.query("SELECT re_password_code, act_mail FROM users WHERE email= \'" + this.args.email + "\'")];
                    case 1:
                        db_response = _a.sent();
                        if (!(db_response.rows[0].act_mail === true)) return [3, 3];
                        return [4, this.transporter.sendMail({
                                from: "noreplay@bvs45.ru",
                                to: this.args.email,
                                subject: "Forgot password",
                                html: 'This message was sent from bvs_server to reset your password. <h1><a href="http://' +
                                    config_json_1.default.server_config.host +
                                    ":" +
                                    config_json_1.default.server_config.port +
                                    "/forgot_pass?code= " +
                                    db_response.rows[0].re_password_code +
                                    '">Click this link</a></h1>',
                            })];
                    case 2:
                        _a.sent();
                        return [2, true];
                    case 3: return [2, false];
                }
            });
        });
    };
    User.prototype.updatePassRePass = function () {
        var pass = crypto_1.default.createHmac('sha256', config_json_1.default.crypto_code).update(this.args.new_password).digest('hex');
        var re_pass_code = crypto_1.default.createHmac('sha256', config_json_1.default.crypto_code).update(this.args.login + "_" + pass).digest('hex');
        var db_response = this.args.query("SELECT re_password_code FROM users WHERE login =\'" + this.args.login + "\'");
        if (db_response.rows[0].re_password_code === this.args.code) {
            db_response = this.db.query("UPDATE users SET re_password_code = \'" + re_pass_code + "\', password = \'" + pass + "\' WHERE login = \'" + this.args.login + "\'");
            return true;
        }
        else {
            return false;
        }
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map
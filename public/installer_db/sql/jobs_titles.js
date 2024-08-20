"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insert_jt_admin = exports.jobs_titles_table = void 0;
exports.jobs_titles_table = {
    sql: "\n    DROP TABLE IF EXISTS jobs_titles;\n    CREATE TABLE jobs_titles (\n        id              BIGSERIAL NOT NULL PRIMARY KEY,\n        org_id          BIGINT DEFAULT(0),\n        name            VARCHAR(250) DEFAULT(''),\n        created_at      TIMESTAMP DEFAULT(CURRENT_TIMESTAMP),\n        info            TEXT DEFAULT('')\n    );\n\n    COMMENT ON TABLE jobs_titles IS '\u0414\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438';\n    COMMENT ON COLUMN jobs_titles.org_id IS '\u041F\u0440\u0438\u0432\u044F\u0437\u043A\u0430 \u043F\u043E \u043F\u043E\u043B\u044E \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438 \u0438\u0437 \u0442\u0430\u0431\u043B\u0438\u0446\u044B ORGS';\n    COMMENT ON COLUMN jobs_titles.name IS '\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u0438';\n    COMMENT ON COLUMN jobs_titles.created_at IS '\u0412\u0440\u0435\u043C\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0437\u0430\u043F\u0438\u0441\u0438';\n    COMMENT ON COLUMN jobs_titles.info IS '\u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435';\n    ",
    args: new Array()
};
exports.insert_jt_admin = {
    sql: "INSERT INTO jobs_titles (org_id, name, created_at, info) VALUES ($1,$2,$3,$4)",
    args: [1, "Администратор", new Date(Date.now()), '']
};
//# sourceMappingURL=jobs_titles.js.map